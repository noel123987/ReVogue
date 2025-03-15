import { createClient } from '@supabase/supabase-js';
import { hash, compare } from "bcrypt";
import { InsertUser, User, InsertProduct, Product, InsertOrder, Order, InsertOrderItem, OrderItem, InsertWishlist, Wishlist } from "@shared/schema";

const supabase = createClient(
  'https://kfbdqivjolwncqasijbj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmYmRxaXZqb2x3bmNxYXNpamJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NTU4MTAsImV4cCI6MjA1NjEzMTgxMH0.VmZOuVL0DxSrWG88-aC5yuh8QmQhJ2vhKAFBqvcX34o'
);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validatePassword(user: User, password: string): Promise<boolean>;

  // Product operations
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(options?: {
    category?: string;
    maxPrice?: number;
    minPrice?: number;
    size?: string;
    brand?: string;
    sellerId?: number;
  }): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined>;

  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByUserId(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Order item operations
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;

  // Wishlist operations
  getWishlistByUserId(userId: number): Promise<Wishlist[]>;
  addToWishlist(wishlistItem: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(id: number): Promise<boolean>;
}

class SupabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const { data } = await supabase.from('users').select().eq('id', id).single();
    return data || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data } = await supabase.from('users').select().eq('username', username).single();
    return data || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await hash(insertUser.password, 10);
    const { data, error } = await supabase
      .from('users')
      .insert({ ...insertUser, password: hashedPassword })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return await compare(password, user.password);
  }

  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    const { data } = await supabase.from('products').select().eq('id', id).single();
    return data || undefined;
  }

  async getProducts(options?: {
    category?: string;
    maxPrice?: number;
    minPrice?: number;
    size?: string;
    brand?: string;
    sellerId?: number;
  }): Promise<Product[]> {
    let query = supabase.from('products').select();

    if (options) {
      if (options.category) {
        query = query.eq('category', options.category);
      }
      if (options.maxPrice !== undefined) {
        query = query.lte('price', options.maxPrice);
      }
      if (options.minPrice !== undefined) {
        query = query.gte('price', options.minPrice);
      }
      if (options.size) {
        query = query.eq('size', options.size);
      }
      if (options.brand) {
        query = query.eq('brand', options.brand);
      }
      if (options.sellerId) {
        query = query.eq('sellerId', options.sellerId);
      }
    }

    const { data } = await query;
    return data || [];
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(insertProduct)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return updatedProduct;
  }

  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    const { data } = await supabase.from('orders').select().eq('id', id).single();
    return data || undefined;
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    const { data } = await supabase.from('orders').select().eq('buyerId', userId);
    return data || [];
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert(insertOrder)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Order item operations
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    const { data } = await supabase.from('order_items').select().eq('orderId', orderId);
    return data || [];
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const { data, error } = await supabase
      .from('order_items')
      .insert(insertOrderItem)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Wishlist operations
  async getWishlistByUserId(userId: number): Promise<Wishlist[]> {
    const { data } = await supabase.from('wishlist').select().eq('userId', userId);
    return data || [];
  }

  async addToWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    const { data, error } = await supabase
      .from('wishlist')
      .insert(insertWishlist)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async removeFromWishlist(id: number): Promise<boolean> {
    const { error } = await supabase.from('wishlist').delete().eq('id', id);
    return !error;
  }
}

export const storage = new SupabaseStorage();