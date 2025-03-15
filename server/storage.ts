import { eq } from "drizzle-orm";
import { db } from "./db";
import { InsertUser, User, users } from "@shared/schema";
import { hash, compare } from "bcrypt";
import {
  products, type Product, type InsertProduct,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  wishlist, type Wishlist, type InsertWishlist
} from "@shared/schema";

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

export class SQLiteStorage implements IStorage {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await hash(insertUser.password, 10);
    const user = await this.db.insert(users).values({
      ...insertUser,
      password: hashedPassword,
    }).returning();
    return user[0];
  }
  async validatePassword(user: User, password: string): Promise<boolean> {
    return await compare(password, user.password);
  }

  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProducts(options?: {
    category?: string;
    maxPrice?: number;
    minPrice?: number;
    size?: string;
    brand?: string;
    sellerId?: number;
  }): Promise<Product[]> {
    let products = Array.from(this.products.values());

    if (options) {
      if (options.category) {
        products = products.filter(p => p.category === options.category);
      }
      if (options.maxPrice !== undefined) {
        products = products.filter(p => p.price <= options.maxPrice!);
      }
      if (options.minPrice !== undefined) {
        products = products.filter(p => p.price >= options.minPrice!);
      }
      if (options.size) {
        products = products.filter(p => p.size === options.size);
      }
      if (options.brand) {
        products = products.filter(p => p.brand === options.brand);
      }
      if (options.sellerId) {
        products = products.filter(p => p.sellerId === options.sellerId);
      }
    }

    return products;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const now = new Date();
    const product: Product = { ...insertProduct, id, createdAt: now };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct = { ...product, ...data };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.buyerId === userId);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const now = new Date();
    const order: Order = { ...insertOrder, id, createdAt: now };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Order item operations
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemIdCounter++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Wishlist operations
  async getWishlistByUserId(userId: number): Promise<Wishlist[]> {
    return Array.from(this.wishlistItems.values()).filter(item => item.userId === userId);
  }

  async addToWishlist(insertWishlist: InsertWishlist): Promise<Wishlist> {
    const id = this.wishlistIdCounter++;
    const now = new Date();
    const wishlistItem: Wishlist = { ...insertWishlist, id, createdAt: now };
    this.wishlistItems.set(id, wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(id: number): Promise<boolean> {
    if (!this.wishlistItems.has(id)) return false;
    return this.wishlistItems.delete(id);
  }

  // Initialize with sample data
  private initSampleData(): void {
    // Add sample user
    const user: User = {
      id: this.userIdCounter++,
      username: "demo_user",
      password: "password123",
      email: "demo@revogue.com",
      fullName: "Demo User",
      role: "buyer",
      createdAt: new Date()
    };
    this.users.set(user.id, user);

    const seller: User = {
      id: this.userIdCounter++,
      username: "demo_seller",
      password: "password123",
      email: "seller@revogue.com",
      fullName: "Demo Seller",
      role: "seller",
      createdAt: new Date()
    };
    this.users.set(seller.id, seller);

    // Add sample products
    const productData = [
      {
        name: "Vintage Denim Jacket",
        description: "Classic vintage denim jacket in excellent condition. Perfect for layering in any season.",
        price: 4500, // $45.00
        imageUrl: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8",
        category: "thrift",
        brand: "Levi's",
        size: "M",
        condition: "good",
        sustainabilityImpact: 8200, // 8.2kg CO2 saved
        sellerId: seller.id,
        status: "available"
      },
      {
        name: "Floral Summer Dress",
        description: "Beautiful floral dress perfect for summer occasions. Lightly worn with no visible signs of use.",
        price: 3800, // $38.00
        imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3",
        category: "thrift",
        brand: "Zara",
        size: "S",
        condition: "like new",
        sustainabilityImpact: 5400, // 5.4kg CO2 saved
        sellerId: seller.id,
        status: "available"
      },
      {
        name: "Wool Blend Coat",
        description: "Elegant wool blend coat, perfect for colder months. Very warm and stylish.",
        price: 8900, // $89.00
        imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae",
        category: "thrift",
        brand: "H&M",
        size: "L",
        condition: "good",
        sustainabilityImpact: 12800, // 12.8kg CO2 saved
        sellerId: seller.id,
        status: "available"
      },
      {
        name: "Vintage Leather Boots",
        description: "Classic leather boots with minimal wear. Very comfortable and durable.",
        price: 6200, // $62.00
        imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
        category: "thrift",
        brand: "Dr. Martens",
        size: "8",
        condition: "good",
        sustainabilityImpact: 7600, // 7.6kg CO2 saved
        sellerId: seller.id,
        status: "available"
      },
      {
        name: "Designer Evening Gown",
        description: "Elegant evening gown perfect for special occasions. Rent for your next formal event.",
        price: 12000, // $120.00 rental
        imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
        category: "rental",
        brand: "Gucci",
        size: "M",
        condition: "like new",
        sustainabilityImpact: 15000, // 15kg CO2 saved
        sellerId: seller.id,
        status: "available"
      },
      {
        name: "Upcycled Denim Tote Bag",
        description: "Handcrafted tote bag made from upcycled denim. Unique and sustainable accessory.",
        price: 3500, // $35.00
        imageUrl: "https://images.unsplash.com/photo-1548863227-3af567fc3b27",
        category: "upcycled",
        brand: "Handmade",
        size: "One Size",
        condition: "new",
        sustainabilityImpact: 5000, // 5kg CO2 saved
        sellerId: seller.id,
        status: "available"
      }
    ];

    productData.forEach(product => {
      const id = this.productIdCounter++;
      const now = new Date();
      this.products.set(id, { ...product, id, createdAt: now });
    });
  }
}

export const storage = new MemStorage();