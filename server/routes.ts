import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import { 
  insertUserSchema, 
  insertProductSchema, 
  insertOrderSchema, 
  insertOrderItemSchema,
  insertWishlistSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
  // Middleware to ensure user is authenticated
  const ensureAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.session && 'userId' in req.session) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // *** USER ROUTES ***
  
  // Register new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userInput = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userInput.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userInput);
      // Don't send password back in response
      const { password, ...userWithoutPassword } = user;
      
      // Set user session
      req.session.userId = user.id;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  // Login user
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || !(await storage.validatePassword(user, password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Set user session
      req.session.userId = user.id;
      
      // Don't send password back in response
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Logout user
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  // Get current user
  app.get("/api/auth/me", async (req, res) => {
    try {
      // If no user is logged in, return null instead of error
      if (!req.session || !req.session.userId) {
        return res.status(200).json(null);
      }
      
      const userId = req.session.userId as number;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password back in response
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // *** PRODUCT ROUTES ***
  
  // Admin middleware
  const ensureAdmin = async (req: Request, res: Response, next: Function) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  };

  // Get pending products (admin only)
  app.get("/api/admin/pending-products", ensureAdmin, async (req, res) => {
    try {
      const products = await storage.getProducts({ approvalStatus: "pending" });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Approve/reject product (admin only)
  app.patch("/api/admin/products/:id/approval", ensureAdmin, async (req, res) => {
    try {
      const { approvalStatus, adminComment } = req.body;
      const productId = parseInt(req.params.id);
      
      if (!["approved", "rejected"].includes(approvalStatus)) {
        return res.status(400).json({ message: "Invalid approval status" });
      }

      const product = await storage.updateProduct(productId, {
        approvalStatus,
        adminComment,
        status: approvalStatus === "approved" ? "available" : "pending"
      });

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Get all products with optional filtering
  app.get("/api/products", async (req, res) => {
    try {
      const filters: {
        category?: string;
        maxPrice?: number;
        minPrice?: number;
        size?: string;
        brand?: string;
        sellerId?: number;
      } = {};
      
      if (req.query.category) filters.category = req.query.category as string;
      if (req.query.maxPrice) filters.maxPrice = parseInt(req.query.maxPrice as string);
      if (req.query.minPrice) filters.minPrice = parseInt(req.query.minPrice as string);
      if (req.query.size) filters.size = req.query.size as string;
      if (req.query.brand) filters.brand = req.query.brand as string;
      if (req.query.sellerId) filters.sellerId = parseInt(req.query.sellerId as string);
      
      const products = await storage.getProducts({
        ...filters,
        approvalStatus: "approved",
        status: "available"
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Get single product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Create new product
  app.post("/api/products", ensureAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      
      // Format the data to match the database schema
      const productData = {
        name: req.body.name,
        description: req.body.description,
        price: parseInt(req.body.price),
        image_url: req.body.imageUrl,
        category: req.body.category,
        sustainability_impact: parseInt(req.body.sustainabilityImpact),
        seller_id: userId,
        status: "available",
        approval_status: "pending",
        // Optional fields
        brand: req.body.brand || null,
        size: req.body.size || null,
        condition: req.body.condition || null,
        admin_comment: null
      };

      // Create the product in the database
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      console.error('Error in product creation:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }
      res.status(500).json({ message: "Server error creating product" });
    }
  });

  // Update product
  app.patch("/api/products/:id", ensureAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const productId = parseInt(req.params.id);
      
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      if (product.sellerId !== userId) {
        return res.status(403).json({ message: "Not authorized to update this product" });
      }
      
      const updatedProduct = await storage.updateProduct(productId, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // *** ORDER ROUTES ***
  
  // Get user orders
  app.get("/api/orders", ensureAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const orders = await storage.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Get single order with items
  app.get("/api/orders/:id", ensureAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const orderId = parseInt(req.params.id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      const order = await storage.getOrder(orderId);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      if (order.buyerId !== userId) {
        return res.status(403).json({ message: "Not authorized to view this order" });
      }
      
      const orderItems = await storage.getOrderItems(orderId);
      
      res.json({
        ...order,
        items: orderItems
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Create new order
  app.post("/api/orders", ensureAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      
      const orderInput = insertOrderSchema.parse({
        ...req.body,
        buyerId: userId
      });
      
      const { items } = req.body;
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order must contain at least one item" });
      }
      
      const order = await storage.createOrder(orderInput);
      
      // Create order items
      const orderItems = await Promise.all(
        items.map(item => storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      );
      
      res.status(201).json({
        ...order,
        items: orderItems
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  // *** WISHLIST ROUTES ***
  
  // Get user wishlist
  app.get("/api/wishlist", ensureAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      const wishlistItems = await storage.getWishlistByUserId(userId);
      
      // Get full product details for each wishlist item
      const wishlistWithProducts = await Promise.all(
        wishlistItems.map(async item => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product
          };
        })
      );
      
      res.json(wishlistWithProducts);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Add item to wishlist
  app.post("/api/wishlist", ensureAuthenticated, async (req, res) => {
    try {
      const userId = req.session.userId as number;
      
      const wishlistInput = insertWishlistSchema.parse({
        ...req.body,
        userId
      });
      
      // Check if product exists
      const product = await storage.getProduct(wishlistInput.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const wishlistItem = await storage.addToWishlist(wishlistInput);
      
      res.status(201).json({
        ...wishlistItem,
        product
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  // Remove item from wishlist
  app.delete("/api/wishlist/:id", ensureAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid wishlist item ID" });
      }
      
      const removed = await storage.removeFromWishlist(id);
      
      if (!removed) {
        return res.status(404).json({ message: "Wishlist item not found" });
      }
      
      res.status(200).json({ message: "Item removed from wishlist" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
