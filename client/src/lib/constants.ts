// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me"
  },
  PRODUCTS: {
    BASE: "/api/products",
    DETAIL: (id: number) => `/api/products/${id}`
  },
  ORDERS: {
    BASE: "/api/orders",
    DETAIL: (id: number) => `/api/orders/${id}`
  },
  WISHLIST: {
    BASE: "/api/wishlist",
    DETAIL: (id: number) => `/api/wishlist/${id}`
  }
};

// App routes
export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  PRODUCT_DETAIL: (id: number) => `/products/${id}`,
  SELL_UPLOAD: "/sell",
  DASHBOARD: "/dashboard",
  SUSTAINABILITY: "/sustainability",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register"
};

// Product categories
export const PRODUCT_CATEGORIES = [
  { label: "Thrifted Clothing", value: "thrift" },
  { label: "Fashion Rentals", value: "rental" },
  { label: "Upcycled Fashion", value: "upcycled" }
];

// Product sizes
export const PRODUCT_SIZES = [
  "XS", "S", "M", "L", "XL", "XXL", "One Size"
];

// Product conditions
export const PRODUCT_CONDITIONS = [
  { label: "New", value: "new" },
  { label: "Like New", value: "like new" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" }
];

// Price ranges for filtering
export const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 2500 },
  { label: "$25 - $50", min: 2500, max: 5000 },
  { label: "$50 - $100", min: 5000, max: 10000 },
  { label: "$100 - $200", min: 10000, max: 20000 },
  { label: "Over $200", min: 20000, max: null }
];

// Impact stats for homepage
export const IMPACT_STATS = [
  { value: "92M", label: "Tons of textile waste reduced" },
  { value: "45K", label: "Active circular fashion users" },
  { value: "120K", label: "Carbon emissions saved (tons)" }
];

// Featured categories
export const FEATURED_CATEGORIES = [
  {
    title: "Thrifted",
    subtitle: "Pre-loved fashion, renewed life",
    description: "Discover unique pre-owned pieces that tell stories while reducing environmental impact.",
    itemCount: "1,240+",
    image: "https://images.unsplash.com/photo-1608731267464-c0c889f5aa56"
  },
  {
    title: "Rental",
    subtitle: "Wear today, return tomorrow",
    description: "Rent designer and special occasion pieces at a fraction of the retail cost.",
    itemCount: "820+",
    image: "https://images.unsplash.com/photo-1493655161922-ef98929de9d8"
  },
  {
    title: "Upcycled",
    subtitle: "Reimagined with purpose",
    description: "Explore creatively transformed garments given new life through skilled redesign.",
    itemCount: "560+",
    image: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51"
  }
];

// Sustainability benefits
export const SUSTAINABILITY_BENEFITS = [
  {
    icon: "recycle",
    title: "Reduce Waste",
    description: "Extend the life of clothing and keep textiles out of landfills."
  },
  {
    icon: "droplet",
    title: "Save Water",
    description: "Reduce the 1,800 gallons of water used to make a single new pair of jeans."
  },
  {
    icon: "cloud",
    title: "Lower Emissions",
    description: "Cut the carbon footprint of your wardrobe by up to 82%."
  },
  {
    icon: "users",
    title: "Support Community",
    description: "Connect with like-minded individuals committed to sustainable fashion."
  }
];

// Seller benefits
export const SELLER_BENEFITS = [
  "Simple photo uploads with automatic AI tagging",
  "Smart pricing recommendations based on demand",
  "Shipping label generation and tracking",
  "Connect with upcycling partners for custom work"
];

// Testimonials
export const TESTIMONIALS = [
  {
    name: "Sarah K.",
    role: "Regular Thrifter",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    text: "I've saved nearly $2,000 this year buying thrifted fashion on ReVogue instead of new pieces. The quality is amazing and I love that each item has its carbon footprint savings displayed!",
    rating: 5
  },
  {
    name: "Marcus J.",
    role: "Fashion Renter",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    text: "Renting formal wear through ReVogue has been a game-changer. I get to wear designer suits for special occasions without the hefty price tag or closet space commitment.",
    rating: 4.5
  },
  {
    name: "Priya M.",
    role: "Upcycler",
    image: "https://images.unsplash.com/photo-1545912453-db258ca9b7b7",
    text: "I've turned my passion for upcycling into a side business through ReVogue. The platform connects me with people who appreciate sustainable, one-of-a-kind creations.",
    rating: 5
  }
];

// Theme colors for consistency
export const COLORS = {
  primary: {
    DEFAULT: '#2D6A4F',
    light: '#3B8467',
    dark: '#1E4535',
  },
  secondary: {
    DEFAULT: '#74C69D',
    light: '#95D5B2',
    dark: '#52B788',
  },
  accent: {
    DEFAULT: '#2D6A4F',
    light: '#3B8467',
    dark: '#1E4535',
  },
  neutral: {
    lightest: '#F8F9FA',
    light: '#E9ECEF',
    medium: '#CED4DA',
    dark: '#6C757D',
    darkest: '#343A40',
  }
};
