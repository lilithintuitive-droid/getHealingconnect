import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import {
  generateContactPageMetaTags,
  updateDancingButterflyMetaTags
} from "@/lib/dancingbutterfly-seo";

// Form type that matches the lead schema
type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  message: string;
  budgetRange?: string;
  timeline?: string;
};

// Enhanced validation schema with additional client-side rules
const contactFormSchema = insertLeadSchema.extend({
  message: insertLeadSchema.shape.message.min(20, "Please provide at least 20 characters describing your project"),
  email: insertLeadSchema.shape.email.email("Please enter a valid email address"),
});

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // SEO optimization for Contact page
  useEffect(() => {
    const metaTags = generateContactPageMetaTags();
    updateDancingButterflyMetaTags(metaTags);
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      budgetRange: "",
      timeline: "",
    },
  });

  const submitLeadMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit form");
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you within 24 hours.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitLeadMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Thank You!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your message has been received. I'll review your project requirements and get back to you within 24 hours with a detailed proposal.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              data-testid="button-send-another"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Let's Build Something Amazing Together
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your business with a custom web application? 
              Tell me about your project and let's discuss how I can help you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>
                    Please provide as much detail as possible about your project requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your full name"
                                  {...field}
                                  data-testid="input-name"
                                />
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
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="your@email.com"
                                  type="email"
                                  {...field}
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company/Organization</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your company name (optional)"
                                {...field}
                                data-testid="input-company"
                              />
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
                            <FormLabel>Project Summary *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Briefly describe your project goals and what you're looking to achieve..."
                                className="resize-none min-h-[100px]"
                                {...field}
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="budgetRange"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget Range</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-budget">
                                    <SelectValue placeholder="Select your budget range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="25-150">$25 - $150 (Small fixes/updates)</SelectItem>
                                  <SelectItem value="800-2000">$800 - $2,000 (Medium projects)</SelectItem>
                                  <SelectItem value="1500-3500">$1,500 - $3,500 (Complex applications)</SelectItem>
                                  <SelectItem value="custom">Custom/Enterprise</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Timeline</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger data-testid="select-timeline">
                                    <SelectValue placeholder="When do you need this completed?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="asap">ASAP (Rush job)</SelectItem>
                                  <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                                  <SelectItem value="1month">Within 1 month</SelectItem>
                                  <SelectItem value="2-3months">2-3 months</SelectItem>
                                  <SelectItem value="flexible">Flexible</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={submitLeadMutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {submitLeadMutation.isPending ? "Sending..." : "Send Project Details"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Get In Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">hello@dancingbutterfly.dev</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Remote Worldwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Initial Review</p>
                        <p className="text-sm text-muted-foreground">I'll review your project details and requirements</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Detailed Proposal</p>
                        <p className="text-sm text-muted-foreground">You'll receive a comprehensive proposal with timeline and pricing</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-primary">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Project Kickoff</p>
                        <p className="text-sm text-muted-foreground">Once approved, we'll start bringing your vision to life</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}