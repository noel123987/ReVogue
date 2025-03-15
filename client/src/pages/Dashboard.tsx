import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { API_ENDPOINTS } from "@/lib/constants";
import { User, Product, Order, WishlistItem } from "@/lib/types";
import { formatPrice, getOptimizedImageUrl, formatCO2 } from "@/lib/utils";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Heart,
  BarChart3,
  Package,
  Clock,
  ArrowUpRight,
  Settings,
  Leaf,
  UserCircle2,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { ROUTES } from "@/lib/constants";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user data
  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: [API_ENDPOINTS.AUTH.ME],
  });

  // Fetch orders
  const { data: orders, isLoading: isLoadingOrders } = useQuery<Order[]>({
    queryKey: [API_ENDPOINTS.ORDERS.BASE],
    enabled: !!user,
  });

  // Fetch products for sellers
  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: [`${API_ENDPOINTS.PRODUCTS.BASE}?sellerId=${user?.id}`],
    enabled: !!user && user.role === "seller",
  });

  // Fetch wishlist
  const { data: wishlist, isLoading: isLoadingWishlist } = useQuery<WishlistItem[]>({
    queryKey: [API_ENDPOINTS.WISHLIST.BASE],
    enabled: !!user,
  });

  // Calculate sustainability impact
  const calculateTotalSustainabilityImpact = () => {
    if (!orders) return 0;
    let total = 0;
    orders.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          if (item.product) {
            total += item.product.sustainabilityImpact;
          }
        });
      }
    });
    return total;
  };

  if (isLoadingUser) {
    return (
      <>
        <Navbar />
        <main className="bg-neutral-lightest py-12 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-light rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-40 bg-neutral-light rounded"></div>
                <div className="h-40 bg-neutral-light rounded"></div>
                <div className="h-40 bg-neutral-light rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="bg-neutral-lightest py-12 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
              <UserCircle2 className="h-16 w-16 text-neutral-dark mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
              <p className="text-neutral-dark mb-6">
                Please sign in to access your dashboard and manage your ReVogue account.
              </p>
              <ButtonLink href={ROUTES.LOGIN} className="bg-primary hover:bg-primary-dark text-white w-full">
                Sign In
              </ButtonLink>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-neutral-lightest py-12 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold font-poppins mb-2">My Dashboard</h1>
              <p className="text-neutral-dark">
                Welcome back, {user.fullName || user.username}
              </p>
            </div>
            {user.role === "seller" && (
              <ButtonLink
                href={ROUTES.SELL_UPLOAD}
                className="mt-4 md:mt-0 bg-primary hover:bg-primary-dark text-white"
              >
                + List New Item
              </ButtonLink>
            )}
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              {user.role === "seller" && (
                <TabsTrigger value="listings">My Listings</TabsTrigger>
              )}
              <TabsTrigger value="impact">Sustainability Impact</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Orders
                    </CardTitle>
                    <ShoppingBag className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingOrders ? (
                        <div className="h-8 w-16 bg-neutral-light animate-pulse rounded"></div>
                      ) : (
                        orders?.length || 0
                      )}
                    </div>
                    <p className="text-xs text-neutral-dark mt-1">
                      Lifetime purchases
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Wishlist Items
                    </CardTitle>
                    <Heart className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingWishlist ? (
                        <div className="h-8 w-16 bg-neutral-light animate-pulse rounded"></div>
                      ) : (
                        wishlist?.length || 0
                      )}
                    </div>
                    <p className="text-xs text-neutral-dark mt-1">
                      Saved for later
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      CO₂ Saved
                    </CardTitle>
                    <Leaf className="h-4 w-4 text-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingOrders ? (
                        <div className="h-8 w-16 bg-neutral-light animate-pulse rounded"></div>
                      ) : (
                        formatCO2(calculateTotalSustainabilityImpact())
                      )}
                    </div>
                    <p className="text-xs text-neutral-dark mt-1">
                      Your positive impact
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Your most recent purchases and rentals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingOrders ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="h-16 bg-neutral-light animate-pulse rounded"
                          ></div>
                        ))}
                      </div>
                    ) : orders && orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between p-3 bg-neutral-lightest rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="bg-primary-light/10 p-2 rounded-full mr-3">
                                {order.orderType === "rental" ? (
                                  <Clock className="h-5 w-5 text-primary" />
                                ) : (
                                  <Package className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">
                                  Order #{order.id}
                                </div>
                                <div className="text-sm text-neutral-dark">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">
                                {formatPrice(order.totalAmount)}
                              </div>
                              <Badge
                                variant={
                                  order.status === "completed"
                                    ? "outline"
                                    : order.status === "cancelled"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-neutral-dark">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-neutral-light" />
                        <p>You haven't placed any orders yet.</p>
                        <ButtonLink
                          href={ROUTES.SHOP}
                          variant="link"
                          className="mt-2"
                        >
                          Start shopping
                        </ButtonLink>
                      </div>
                    )}

                    {orders && orders.length > 0 && (
                      <ButtonLink
                        href="#"
                        variant="link"
                        className="mt-4 flex items-center justify-center text-primary"
                        onClick={() => setActiveTab("orders")}
                      >
                        View all orders
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </ButtonLink>
                    )}
                  </CardContent>
                </Card>

                {user.role === "seller" ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <span>Sales Analytics</span>
                          <Badge className="ml-2 bg-secondary text-white">
                            Seller
                          </Badge>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        Performance overview of your listings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoadingProducts ? (
                        <div className="space-y-4">
                          <div className="h-40 bg-neutral-light animate-pulse rounded"></div>
                        </div>
                      ) : products && products.length > 0 ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-neutral-lightest p-4 rounded-lg">
                              <div className="text-sm text-neutral-dark">
                                Active Listings
                              </div>
                              <div className="text-2xl font-bold mt-1">
                                {
                                  products.filter(
                                    (p) => p.status === "available"
                                  ).length
                                }
                              </div>
                            </div>
                            <div className="bg-neutral-lightest p-4 rounded-lg">
                              <div className="text-sm text-neutral-dark">
                                Total Revenue
                              </div>
                              <div className="text-2xl font-bold mt-1">
                                {formatPrice(
                                  products
                                    .filter((p) => p.status === "sold")
                                    .reduce((sum, p) => sum + p.price, 0)
                                )}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Recent Listings</h4>
                            <div className="space-y-3">
                              {products.slice(0, 3).map((product) => (
                                <div
                                  key={product.id}
                                  className="flex items-center justify-between bg-neutral-lightest p-3 rounded-lg"
                                >
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 rounded overflow-hidden mr-3">
                                      <img
                                        src={getOptimizedImageUrl(
                                          product.imageUrl,
                                          100
                                        )}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <div className="font-medium line-clamp-1">
                                        {product.name}
                                      </div>
                                      <div className="text-xs text-neutral-dark">
                                        {product.category} · {product.size}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold">
                                      {formatPrice(product.price)}
                                    </div>
                                    <Badge
                                      variant={
                                        product.status === "available"
                                          ? "secondary"
                                          : "outline"
                                      }
                                      className="text-xs"
                                    >
                                      {product.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <ButtonLink
                            href="#"
                            variant="link"
                            className="flex items-center justify-center text-primary"
                            onClick={() => setActiveTab("listings")}
                          >
                            Manage all listings
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                          </ButtonLink>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-neutral-dark">
                          <BarChart3 className="h-12 w-12 mx-auto mb-3 text-neutral-light" />
                          <p>You haven't listed any items for sale yet.</p>
                          <ButtonLink
                            href={ROUTES.SELL_UPLOAD}
                            variant="link"
                            className="mt-2"
                          >
                            List your first item
                          </ButtonLink>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Items</CardTitle>
                      <CardDescription>Items on your wishlist</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoadingWishlist ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map((item) => (
                            <div
                              key={item}
                              className="h-16 bg-neutral-light animate-pulse rounded"
                            ></div>
                          ))}
                        </div>
                      ) : wishlist && wishlist.length > 0 ? (
                        <div className="space-y-4">
                          {wishlist.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-3 bg-neutral-lightest rounded-lg"
                            >
                              <div className="flex items-center">
                                <div className="h-12 w-12 rounded overflow-hidden mr-3">
                                  {item.product && (
                                    <img
                                      src={getOptimizedImageUrl(
                                        item.product.imageUrl,
                                        100
                                      )}
                                      alt={item.product.name}
                                      className="h-full w-full object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium line-clamp-1">
                                    {item.product?.name || "Product"}
                                  </div>
                                  <div className="text-xs text-neutral-dark">
                                    {item.product?.brand} ·{" "}
                                    {item.product?.size}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">
                                  {item.product
                                    ? formatPrice(item.product.price)
                                    : "$0.00"}
                                </div>
                                <div className="text-xs text-neutral-dark">
                                  Added{" "}
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-neutral-dark">
                          <Heart className="h-12 w-12 mx-auto mb-3 text-neutral-light" />
                          <p>Your wishlist is empty.</p>
                          <ButtonLink
                            href={ROUTES.SHOP}
                            variant="link"
                            className="mt-2"
                          >
                            Discover products
                          </ButtonLink>
                        </div>
                      )}

                      {wishlist && wishlist.length > 0 && (
                        <ButtonLink
                          href="#"
                          variant="link"
                          className="mt-4 flex items-center justify-center text-primary"
                          onClick={() => setActiveTab("wishlist")}
                        >
                          View all saved items
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </ButtonLink>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    Track all your purchases and rentals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingOrders ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-20 bg-neutral-light animate-pulse rounded"
                        ></div>
                      ))}
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-neutral-light rounded-lg overflow-hidden"
                        >
                          <div className="bg-neutral-lightest p-4 flex justify-between items-center">
                            <div>
                              <div className="font-medium">Order #{order.id}</div>
                              <div className="text-sm text-neutral-dark">
                                Placed on{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">
                                {formatPrice(order.totalAmount)}
                              </div>
                              <Badge
                                variant={
                                  order.status === "completed"
                                    ? "outline"
                                    : order.status === "cancelled"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="text-sm font-medium mb-2">
                              Order Items
                            </h4>
                            {order.items && order.items.length > 0 ? (
                              <div className="space-y-3">
                                {order.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between"
                                  >
                                    <div className="flex items-center">
                                      {item.product && (
                                        <div className="h-10 w-10 rounded overflow-hidden mr-3">
                                          <img
                                            src={getOptimizedImageUrl(
                                              item.product.imageUrl,
                                              100
                                            )}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                      )}
                                      <div>
                                        <div className="font-medium">
                                          {item.product?.name || "Product"}
                                        </div>
                                        <div className="text-xs text-neutral-dark">
                                          Qty: {item.quantity}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="font-medium">
                                      {formatPrice(item.price)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-neutral-dark">
                                No items found for this order.
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-neutral-dark">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-neutral-light" />
                      <p>You haven't placed any orders yet.</p>
                      <ButtonLink
                        href={ROUTES.SHOP}
                        variant="link"
                        className="mt-2"
                      >
                        Start shopping
                      </ButtonLink>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist</CardTitle>
                  <CardDescription>Items you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingWishlist ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className="h-60 bg-neutral-light animate-pulse rounded"
                        ></div>
                      ))}
                    </div>
                  ) : wishlist && wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="border border-neutral-light rounded-lg overflow-hidden"
                        >
                          {item.product && (
                            <>
                              <div className="relative h-48">
                                <img
                                  src={getOptimizedImageUrl(
                                    item.product.imageUrl,
                                    400
                                  )}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-2 left-2">
                                  <Badge className="bg-secondary text-white">
                                    CO₂ saved:{" "}
                                    {formatCO2(item.product.sustainabilityImpact)}
                                  </Badge>
                                </div>
                              </div>
                              <div className="p-4">
                                <h4 className="font-medium mb-1">
                                  {item.product.name}
                                </h4>
                                <div className="flex justify-between items-center mb-3">
                                  <div className="text-sm text-neutral-dark">
                                    {item.product.brand} · {item.product.size}
                                  </div>
                                  <div className="font-semibold">
                                    {formatPrice(item.product.price)}
                                  </div>
                                </div>
                                <ButtonLink
                                  href={ROUTES.PRODUCT_DETAIL(item.product.id)}
                                  className="w-full bg-primary hover:bg-primary-dark text-white"
                                >
                                  View Product
                                </ButtonLink>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-neutral-dark">
                      <Heart className="h-12 w-12 mx-auto mb-3 text-neutral-light" />
                      <p>Your wishlist is empty.</p>
                      <ButtonLink
                        href={ROUTES.SHOP}
                        variant="link"
                        className="mt-2"
                      >
                        Discover products
                      </ButtonLink>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Seller Listings Tab */}
            {user.role === "seller" && (
              <TabsContent value="listings">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>My Listings</CardTitle>
                      <CardDescription>
                        Manage your product listings
                      </CardDescription>
                    </div>
                    <ButtonLink
                      href={ROUTES.SELL_UPLOAD}
                      className="bg-primary hover:bg-primary-dark text-white"
                    >
                      + Add New Listing
                    </ButtonLink>
                  </CardHeader>
                  <CardContent>
                    {isLoadingProducts ? (
                      <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <div
                            key={index}
                            className="h-20 bg-neutral-light animate-pulse rounded"
                          ></div>
                        ))}
                      </div>
                    ) : products && products.length > 0 ? (
                      <div className="space-y-4">
                        {products.map((product) => (
                          <div
                            key={product.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-neutral-light rounded-lg"
                          >
                            <div className="flex items-center mb-3 sm:mb-0">
                              <div className="h-16 w-16 rounded overflow-hidden mr-4">
                                <img
                                  src={getOptimizedImageUrl(
                                    product.imageUrl,
                                    200
                                  )}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-neutral-dark mb-1">
                                  {product.brand} · {product.size} ·{" "}
                                  {product.category}
                                </div>
                                <div className="font-semibold text-primary">
                                  {formatPrice(product.price)}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                              <Badge
                                variant={
                                  product.status === "available"
                                    ? "secondary"
                                    : product.status === "sold"
                                    ? "outline"
                                    : "default"
                                }
                              >
                                {product.status}
                              </Badge>
                              <div className="flex gap-2 w-full sm:w-auto">
                                <ButtonLink
                                  href={ROUTES.PRODUCT_DETAIL(product.id)}
                                  variant="outline"
                                  className="text-sm flex-1 sm:flex-none"
                                >
                                  View
                                </ButtonLink>
                                <ButtonLink
                                  href="#"
                                  variant="outline"
                                  className="text-sm flex-1 sm:flex-none"
                                >
                                  Edit
                                </ButtonLink>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-neutral-dark">
                        <Package className="h-12 w-12 mx-auto mb-3 text-neutral-light" />
                        <p>You haven't listed any items yet.</p>
                        <ButtonLink
                          href={ROUTES.SELL_UPLOAD}
                          variant="link"
                          className="mt-2"
                        >
                          Create your first listing
                        </ButtonLink>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Sustainability Impact Tab */}
            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <CardTitle>Your Sustainability Impact</CardTitle>
                  <CardDescription>
                    Track how your circular fashion choices are helping the planet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-primary/10 rounded-lg p-6 text-center">
                      <Leaf className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-3xl font-bold text-primary mb-1">
                        {formatCO2(calculateTotalSustainabilityImpact())}
                      </div>
                      <p className="text-sm text-neutral-dark">
                        Total CO₂ emissions saved
                      </p>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-6 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-secondary mx-auto mb-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0v8.5M11 9.5a1.5 1.5 0 0 1 3 0V13M14 7.5a1.5 1.5 0 0 1 3 0V13M5 13h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z" />
                      </svg>
                      <div className="text-3xl font-bold text-secondary mb-1">
                        {isLoadingOrders ? "..." : orders?.length || 0}
                      </div>
                      <p className="text-sm text-neutral-dark">
                        Items kept from landfill
                      </p>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-6 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-accent mx-auto mb-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 22h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2z" />
                        <path d="M5.45 10.1c4.17-3.57 10.93-3.57 15.1 0M2 10.5c5.46-4.92 14.54-4.92 20 0" />
                      </svg>
                      <div className="text-3xl font-bold text-accent mb-1">
                        4,600
                      </div>
                      <p className="text-sm text-neutral-dark">
                        Liters of water saved
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-neutral-light p-6 mb-8">
                    <h3 className="font-medium mb-4 text-center">
                      Sustainability Journey
                    </h3>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                            Progress
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-primary">
                            35%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-neutral-light">
                        <div
                          style={{ width: "35%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-medium">Beginner</div>
                        <div className="text-neutral-dark">0-10kg CO₂</div>
                      </div>
                      <div>
                        <div className="font-medium text-primary">
                          Contributor ✓
                        </div>
                        <div className="text-neutral-dark">10-50kg CO₂</div>
                      </div>
                      <div>
                        <div className="font-medium">Planet Protector</div>
                        <div className="text-neutral-dark">50+ kg CO₂</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">
                      Impact of Your Sustainable Choices
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-neutral-lightest p-4 rounded-lg">
                        <div className="flex items-start mb-2">
                          <div className="bg-secondary rounded-full p-1 mr-3 mt-1">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              CO₂ Savings Equivalent
                            </h4>
                            <p className="text-sm text-neutral-dark">
                              Your CO₂ savings are equivalent to planting{" "}
                              <span className="font-medium">3 trees</span> or
                              avoiding{" "}
                              <span className="font-medium">
                                47 miles of driving
                              </span>
                              .
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-neutral-lightest p-4 rounded-lg">
                        <div className="flex items-start mb-2">
                          <div className="bg-secondary rounded-full p-1 mr-3 mt-1">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">Water Conservation</h4>
                            <p className="text-sm text-neutral-dark">
                              You've helped save enough water to fill{" "}
                              <span className="font-medium">
                                29 bathtubs
                              </span>{" "}
                              by choosing pre-loved fashion.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-neutral-lightest p-4 rounded-lg">
                        <div className="flex items-start mb-2">
                          <div className="bg-secondary rounded-full p-1 mr-3 mt-1">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Reduced Fashion Waste
                            </h4>
                            <p className="text-sm text-neutral-dark">
                              You've kept{" "}
                              <span className="font-medium">
                                {isLoadingOrders ? "..." : orders?.length || 0}{" "}
                                items
                              </span>{" "}
                              out of landfills, extending their lifecycle and
                              reducing waste.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-neutral-dark block mb-1">
                            Username
                          </label>
                          <Input value={user.username} disabled />
                        </div>
                        <div>
                          <label className="text-sm text-neutral-dark block mb-1">
                            Email
                          </label>
                          <Input value={user.email} disabled />
                        </div>
                        <div>
                          <label className="text-sm text-neutral-dark block mb-1">
                            Full Name
                          </label>
                          <Input value={user.fullName || ""} disabled />
                        </div>
                        <div>
                          <label className="text-sm text-neutral-dark block mb-1">
                            Account Type
                          </label>
                          <Input
                            value={
                              user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)
                            }
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-light">
                      <h3 className="font-medium mb-4">Account Actions</h3>
                      <div className="space-y-4">
                        <ButtonLink
                          href={API_ENDPOINTS.AUTH.LOGOUT}
                          className="w-full bg-destructive text-white"
                        >
                          Logout
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
