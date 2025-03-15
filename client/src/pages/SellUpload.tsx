import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PRODUCT_CATEGORIES, PRODUCT_CONDITIONS, PRODUCT_SIZES, API_ENDPOINTS } from "@/lib/constants";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Camera, Tag, ArrowUp, Leaf, Sparkles, CheckCircle2 } from "lucide-react";

// Form validation schema
const sellFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),
  category: z.string().min(1, { message: "Please select a category" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  size: z.string().min(1, { message: "Please select a size" }),
  condition: z.string().min(1, { message: "Please select the condition" }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
  sustainabilityImpact: z.coerce.number().min(1, { message: "Sustainability impact is required" }),
});

type SellFormValues = z.infer<typeof sellFormSchema>;

const SellUpload = () => {
  const { toast } = useToast();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isAiTagging, setIsAiTagging] = useState(false);

  // Initialize form
  const form = useForm<SellFormValues>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      category: "",
      brand: "",
      size: "",
      condition: "",
      imageUrl: "",
      sustainabilityImpact: 0,
    },
  });

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: (values: SellFormValues) => {
      // Convert price to cents
      const priceInCents = Math.round(values.price * 100);
      // Convert sustainability impact to grams
      const sustainabilityImpactInGrams = Math.round(values.sustainabilityImpact * 1000);
      
      return apiRequest("POST", API_ENDPOINTS.PRODUCTS.BASE, {
        ...values,
        price: priceInCents,
        sustainabilityImpact: sustainabilityImpactInGrams,
        status: "available"
      });
    },
    onSuccess: () => {
      toast({
        title: "Product Listed",
        description: "Your item has been successfully listed for sale.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was an error listing your product. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Form submit handler
  const onSubmit = (values: SellFormValues) => {
    submitMutation.mutate(values);
  };

  // Simulate AI tagging
  const simulateAiTagging = () => {
    if (!form.getValues("imageUrl")) {
      toast({
        title: "Image Required",
        description: "Please upload an image first for AI tagging.",
        variant: "destructive",
      });
      return;
    }

    setIsAiTagging(true);
    // Simulate delay for AI processing
    setTimeout(() => {
      // Only apply AI suggestions if fields are empty
      if (!form.getValues("brand")) form.setValue("brand", "Vintage Collection");
      if (!form.getValues("category")) form.setValue("category", "thrift");
      if (!form.getValues("condition")) form.setValue("condition", "good");
      if (!form.getValues("sustainabilityImpact")) form.setValue("sustainabilityImpact", 8.2);
      
      toast({
        title: "AI Tagging Complete",
        description: "We've filled in some suggestions based on your image.",
      });
      setIsAiTagging(false);
    }, 1500);
  };

  // Simulate image upload
  const simulateImageUpload = () => {
    setIsImageUploading(true);
    // Simulate delay for image upload
    setTimeout(() => {
      form.setValue("imageUrl", "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8");
      setIsImageUploading(false);
      toast({
        title: "Image Uploaded",
        description: "Your image has been successfully uploaded.",
      });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="bg-neutral-lightest py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold font-poppins mb-2">Sell or Rent Your Fashion Items</h1>
              <p className="text-neutral-dark">
                List your pre-loved items, rent out special pieces, or showcase your upcycled creations.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>
                  Provide information about the fashion item you're listing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <div className="bg-primary/5 rounded-lg p-6 mb-4">
                        <div className="flex items-center mb-4">
                          <div className="bg-primary rounded-full p-2 mr-3">
                            <Camera className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="font-medium">Upload Photos</h3>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image URL</FormLabel>
                              <div className="flex items-center gap-2">
                                <FormControl>
                                  <Input placeholder="Enter image URL or upload" {...field} />
                                </FormControl>
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={simulateImageUpload}
                                  disabled={isImageUploading}
                                >
                                  {isImageUploading ? "Uploading..." : "Upload"}
                                </Button>
                              </div>
                              <FormDescription>
                                Add a clear image of your item to attract buyers
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {form.watch("imageUrl") && (
                          <div className="mt-4 relative rounded-md overflow-hidden w-full max-w-[300px] h-[200px]">
                            <img 
                              src={form.watch("imageUrl")} 
                              alt="Product preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Item Information</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-primary border-primary"
                          onClick={simulateAiTagging}
                          disabled={isAiTagging}
                        >
                          <Sparkles className="mr-2 h-4 w-4" />
                          {isAiTagging ? "AI Processing..." : "AI Smart Tagging"}
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Vintage Denim Jacket" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price ($)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="0.00" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your item, including any notable features or flaws" 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {PRODUCT_CATEGORIES.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                      {category.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="size"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Size</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select size" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {PRODUCT_SIZES.map((size) => (
                                    <SelectItem key={size} value={size}>
                                      {size}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Condition</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {PRODUCT_CONDITIONS.map((condition) => (
                                    <SelectItem key={condition.value} value={condition.value}>
                                      {condition.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="brand"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Brand</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Levi's, H&M, Handmade" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sustainabilityImpact"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sustainability Impact (kg CO₂ saved)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  step="0.1"
                                  placeholder="e.g. 8.2"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="flex items-center text-secondary">
                                <Leaf className="h-3 w-3 mr-1" />
                                Estimated carbon savings compared to new
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-neutral-lightest p-4 rounded-lg">
                      <h3 className="font-medium flex items-center mb-2">
                        <Tag className="h-4 w-4 mr-2 text-primary" />
                        Price Recommendation
                      </h3>
                      <p className="text-sm text-neutral-dark mb-2">
                        Based on similar items in our marketplace:
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="border border-neutral-light rounded p-2">
                          <div className="text-sm font-medium">Min</div>
                          <div className="text-primary text-lg font-semibold">$32</div>
                        </div>
                        <div className="border border-primary bg-primary/5 rounded p-2">
                          <div className="text-sm font-medium">Recommended</div>
                          <div className="text-primary text-lg font-semibold">$45</div>
                        </div>
                        <div className="border border-neutral-light rounded p-2">
                          <div className="text-sm font-medium">Max</div>
                          <div className="text-primary text-lg font-semibold">$62</div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-dark"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? (
                        "Submitting..."
                      ) : (
                        <>
                          <ArrowUp className="mr-2 h-4 w-4" />
                          List Item
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-medium text-center mb-4">Why Sell on ReVogue?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 rounded-full p-3 mb-3">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">Simple Listing</h4>
                  <p className="text-sm text-neutral-dark">AI-powered photo recognition makes listing quick and easy</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 rounded-full p-3 mb-3">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">No Hidden Fees</h4>
                  <p className="text-sm text-neutral-dark">Transparent pricing with no surprises or membership fees</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 rounded-full p-3 mb-3">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">Eco Impact</h4>
                  <p className="text-sm text-neutral-dark">Track your personal contribution to reducing fashion waste</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SellUpload;
