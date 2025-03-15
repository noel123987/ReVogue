import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import SellUpload from "@/pages/SellUpload";
import Dashboard from "@/pages/Dashboard";
import Sustainability from "@/pages/Sustainability";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/not-found";

// Import constants
import { ROUTES } from "@/lib/constants";

function Router() {
  return (
    <Switch>
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.SHOP} component={Shop} />
      <Route path={ROUTES.PRODUCT_DETAIL(':id')} component={ProductDetail} />
      <Route path={ROUTES.SELL_UPLOAD} component={SellUpload} />
      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route path={ROUTES.SUSTAINABILITY} component={Sustainability} />
      <Route path={ROUTES.ABOUT} component={About} />
      <Route path={ROUTES.CONTACT} component={Contact} />
      <Route path={ROUTES.LOGIN} component={Auth} />
      <Route path={ROUTES.REGISTER} component={Auth} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
