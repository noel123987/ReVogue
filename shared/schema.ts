import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  role: text("role").default("buyer").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in cents
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // "thrift", "rental", "upcycled"
  brand: text("brand"),
  size: text("size"),
  condition: text("condition"), // "new", "like new", "good", "fair"
  sustainabilityImpact: integer("sustainability_impact").notNull(), // CO2 saved in grams
  sellerId: integer("seller_id").notNull(),
  status: text("status").default("available").notNull(), // "available", "sold", "rented"
  approvalStatus: text("approval_status").default("pending").notNull(), // "pending", "approved", "rejected"
  adminComment: text("admin_comment"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  buyerId: integer("buyer_id").notNull(),
  status: text("status").default("pending").notNull(), // "pending", "completed", "cancelled"
  totalAmount: integer("total_amount").notNull(), // in cents
  orderType: text("order_type").notNull(), // "purchase", "rental", "upcycle"
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull() // in cents
});

export const wishlist = pgTable("wishlist", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productId: integer("product_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true
}).partial({ email: true });

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  category: true,
  brand: true,
  size: true,
  condition: true,
  sustainabilityImpact: true,
  sellerId: true,
  status: true
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  buyerId: true,
  status: true,
  totalAmount: true,
  orderType: true
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productId: true,
  quantity: true,
  price: true
});

export const insertWishlistSchema = createInsertSchema(wishlist).pick({
  userId: true,
  productId: true
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type InsertWishlist = z.infer<typeof insertWishlistSchema>;
export type Wishlist = typeof wishlist.$inferSelect;
