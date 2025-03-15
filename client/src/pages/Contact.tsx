import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  PhoneCall,
  Instagram,
  Linkedin,
  Facebook,
  Twitter
} from "lucide-react";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  inquiryType: z.enum(["general", "seller", "upcycling", "partnership"], { 
    required_error: "Please select an inquiry type" 
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      inquiryType: "general",
    },
  });

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: (values: ContactFormValues) => {
      // In a real implementation, this would submit to an API endpoint
      // Simulating API call for demonstration
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. We'll respond shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Form submit handler
  const onSubmit = (values: ContactFormValues) => {
    submitMutation.mutate(values);
  };

  return (
    <>
      <Navbar />
      <main className="bg-neutral-lightest">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 font-poppins">Contact Us</h1>
              <p className="text-lg opacity-90">
                Have questions about sustainable fashion or need assistance with your ReVogue account? We're here to help!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-bold mb-6 font-poppins">Get in Touch</h2>
                  <p className="text-neutral-dark mb-8">
                    We'd love to hear from you! Whether you have a question about our platform, partnership opportunities, or need support, our team is ready to help.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-3 mr-4">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Our Office</h3>
                        <p className="text-neutral-dark text-sm">
                          123 Sustainable Way<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-3 mr-4">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email Us</h3>
                        <p className="text-neutral-dark text-sm">
                          <a href="mailto:hello@revogue.com" className="hover:text-primary">hello@revogue.com</a><br />
                          <a href="mailto:support@revogue.com" className="hover:text-primary">support@revogue.com</a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-3 mr-4">
                        <PhoneCall className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Call Us</h3>
                        <p className="text-neutral-dark text-sm">
                          <a href="tel:+12125551234" className="hover:text-primary">+1 (212) 555-1234</a><br />
                          Monday-Friday, 9am-6pm ET
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-3 mr-4">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Hours</h3>
                        <p className="text-neutral-dark text-sm">
                          Monday-Friday: 9am-6pm ET<br />
                          Saturday: 10am-4pm ET<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <h3 className="font-medium mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-neutral-light hover:bg-primary/10 transition-colors rounded-full p-3">
                      <Instagram className="h-5 w-5 text-primary" />
                    </a>
                    <a href="#" className="bg-neutral-light hover:bg-primary/10 transition-colors rounded-full p-3">
                      <Facebook className="h-5 w-5 text-primary" />
                    </a>
                    <a href="#" className="bg-neutral-light hover:bg-primary/10 transition-colors rounded-full p-3">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </a>
                    <a href="#" className="bg-neutral-light hover:bg-primary/10 transition-colors rounded-full p-3">
                      <Twitter className="h-5 w-5 text-primary" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="What is your message about?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="inquiryType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Inquiry Type</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="general" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        General Inquiry
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="seller" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        Seller Support
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="upcycling" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        Upcycling Partnerships
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="partnership" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        Business Partnership
                                      </FormLabel>
                                    </FormItem>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please provide details about your inquiry..."
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary-dark"
                          disabled={submitMutation.isPending}
                        >
                          {submitMutation.isPending ? (
                            "Sending Message..."
                          ) : (
                            <>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-poppins">Frequently Asked Questions</h2>
              <p className="text-neutral-dark">
                Find quick answers to common questions about ReVogue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-neutral-lightest p-6 rounded-lg">
                <h3 className="font-bold mb-2">How does the carbon footprint calculator work?</h3>
                <p className="text-neutral-dark text-sm">
                  Our calculator uses industry research to estimate the CO₂ savings of buying pre-loved or renting instead of buying new. We consider factors like production emissions, shipping, and material type.
                </p>
              </div>

              <div className="bg-neutral-lightest p-6 rounded-lg">
                <h3 className="font-bold mb-2">How do I list an item for sale?</h3>
                <p className="text-neutral-dark text-sm">
                  Create an account, go to "Sell/Upload," fill out the item details form, upload photos, and set your price. Our AI will help with category suggestions and price recommendations.
                </p>
              </div>

              <div className="bg-neutral-lightest p-6 rounded-lg">
                <h3 className="font-bold mb-2">What's the difference between selling and upcycling?</h3>
                <p className="text-neutral-dark text-sm">
                  Selling is listing your item as-is, while upcycling connects you with skilled artisans who can transform your item into something new and unique before selling.
                </p>
              </div>

              <div className="bg-neutral-lightest p-6 rounded-lg">
                <h3 className="font-bold mb-2">How does fashion rental work?</h3>
                <p className="text-neutral-dark text-sm">
                  Browse rental items, select your rental period, and complete checkout. The seller ships the item to you, and you return it using a provided shipping label when your rental period ends.
                </p>
              </div>

              <div className="bg-neutral-lightest p-6 rounded-lg">
                <h3 className="font-bold mb-2">What fees does ReVogue charge?</h3>
                <p className="text-neutral-dark text-sm">
                  We charge a 15% commission on sales and 10% on rentals. There are no listing fees or monthly charges. Upcycling commissions vary based on the complexity of the work.
                </p>
              </div>

              <div className="bg-neutral-lightest p-6 rounded-lg">
                <h3 className="font-bold mb-2">How do I become an upcycling partner?</h3>
                <p className="text-neutral-dark text-sm">
                  If you're a skilled artisan or designer, contact us through the form above with examples of your work and we'll review your application for our upcycling network.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-poppins">Visit Our Showroom</h2>
              <p className="text-neutral-dark">
                We have a physical location in New York City where you can experience sustainable fashion firsthand
              </p>
            </div>

            <div className="aspect-video bg-neutral-light rounded-lg overflow-hidden">
              {/* This would be a real map implementation in production */}
              <div className="w-full h-full flex items-center justify-center">
                <MapPin className="h-12 w-12 text-primary" />
                <p className="ml-2 text-lg font-medium">123 Sustainable Way, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
