import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Mail, Linkedin, MapPin, Download, Calendar, Send, X, Youtube, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { type InsertContact } from "../../server/storage";
import { apiRequest } from "@/lib/queryClient";

const projectTypes = [
  "eLearning Development",
  "Corporate Training", 
  "Learning Strategy",
  "Other"
];

export default function GetInTouch() {
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      projectType: "",
      message: "",
    },
  });


  const contactMutation = useMutation({
    mutationFn: (data: InsertContact) => apiRequest("POST", "/api/contact-submissions", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Form temporarily unavailable",
        description: "Please contact me directly via email or social media. I'll respond within 24 hours!",
        variant: "destructive",
        duration: 8000,
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400">
      {/* Header Section */}
      <section className="py-12 pt-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Let's make something great work together?
          </h1>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Ready to transform your training programs? Let's discuss how we can create engaging learning experiences that drive real results.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Contact Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Contact</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Quick Contact */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h4 className="text-xl font-semibold text-white mb-4">Quick contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-white/80" />
                    <a href="mailto:kazeem.salau@yahoo.com" className="text-white/90 hover:text-white transition-colors">
                      kazeem.salau@yahoo.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-white/80" />
                    <span className="text-white/90">United Kingdom</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h4 className="text-xl font-semibold text-white mb-4">Follow me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://x.com/themoyoursalau?s=21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                    title="Visit X profile"
                    data-testid="x-link"
                  >
                    <X className="h-6 w-6 text-white" />
                  </a>
                  <a
                    href="https://www.youtube.com/@moyoursalau"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                    title="Visit YouTube channel"
                    data-testid="youtube-link"
                  >
                    <Youtube className="h-6 w-6 text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kazeem-salau-164b1087/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                    title="Visit LinkedIn profile"
                    data-testid="linkedin-link"
                  >
                    <Linkedin className="h-6 w-6 text-white" />
                  </a>
                </div>
              </div>

              {/* Schedule Meeting */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-3 mx-auto shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Let's Create Magic!</h3>
                  <p className="text-white/80 text-xs max-w-xs">
                    Book a 30-minute call to discuss your project.
                  </p>
                </div>
                <a href="https://cal.com/kazeem-salau-c5t2nj/30min" target="_blank" rel="noopener noreferrer">
                  <Button 
                    className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 px-6 py-3 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    data-testid="schedule-call"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Let's talk. Have a project in mind?</h3>
                  <p className="text-white/80">We are committed to protecting your privacy. We will never collect information about you without your explicit consent.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">Your name*</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field}
                                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50"
                                data-testid="input-firstName"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">Last name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your last name" 
                                {...field}
                                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50"
                                data-testid="input-lastName"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">Your email address*</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="Your email address" 
                                {...field}
                                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="projectType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-medium">Your subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                              <FormControl>
                                <SelectTrigger className="bg-white/20 border-white/30 text-white focus:border-white/50 focus:ring-white/50" data-testid="select-projectType">
                                  <SelectValue
                                    placeholder="Your subject"
                                    className="text-white data-[placeholder]:text-white/60"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white/95 backdrop-blur-md border-white/30">
                                {projectTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Your message</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={6}
                              placeholder="Your message"
                              className="resize-none bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/50"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 font-semibold py-3"
                      disabled={contactMutation.isPending}
                      data-testid="submit-contact-form"
                    >
                      {contactMutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}