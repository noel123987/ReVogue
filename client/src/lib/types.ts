// Product Types
export type ProductCategory = "thrift" | "rental" | "upcycled";

export type ProductCondition = "new" | "like new" | "good" | "fair";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // in cents
  imageUrl: string;
  category: ProductCategory;
  brand?: string;
  size?: string;
  condition?: ProductCondition;
  sustainabilityImpact: number; // CO2 saved in grams
  sellerId: number;
  status: string;
  createdAt: string;
}

// User Types
export type UserRole = "buyer" | "seller" | "admin";

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  role: UserRole;
  createdAt: string;
}

// Order Types
export type OrderStatus = "pending" | "completed" | "cancelled";
export type OrderType = "purchase" | "rental" | "upcycle";

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number; // in cents
  product?: Product; // Optional joined product data
}

export interface Order {
  id: number;
  buyerId: number;
  status: OrderStatus;
  totalAmount: number; // in cents
  orderType: OrderType;
  createdAt: string;
  items?: OrderItem[]; // Optional joined items
}

// Wishlist Types
export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  product?: Product; // Optional joined product data
}

// Authentication Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email: string;
  fullName?: string;
  role?: UserRole; 
}

// Filter Types
export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  brand?: string;
  sellerId?: number;
}
