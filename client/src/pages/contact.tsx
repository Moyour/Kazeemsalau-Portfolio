import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Mail, Linkedin, MapPin, Download, Calendar, Send, X, Youtube } from "lucide-react";
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

export default function Contact() {
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
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Let's Create Something Amazing
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Ready to transform your training programs? Let's discuss how we can create engaging learning experiences that drive real results.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <a
                      href="mailto:your.email@example.com"
                      className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors"
                      title="Send an email"
                      data-testid="email-link"
                    >
                      <Mail className="h-6 w-6 text-white" />
                    </a>
                    <a
                      href="https://x.com/themoyoursalau?s=21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors"
                      title="Visit X profile"
                      data-testid="x-link"
                    >
                      <X className="h-6 w-6 text-white" />
                    </a>
                    <a
                      href="https://www.youtube.com/@moyoursalau"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors"
                      title="Visit YouTube channel"
                      data-testid="youtube-link"
                    >
                      <Youtube className="h-6 w-6 text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kazeem-salau-164b1087/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-white/30 transition-colors"
                      title="Visit LinkedIn profile"
                      data-testid="linkedin-link"
                    >
                      <Linkedin className="h-6 w-6 text-white" />
                    </a>
                  </div>

                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline"
                    className="text-white bg-white/10 border-white/40 hover:bg-gradient-to-r hover:from-pink-400 hover:via-purple-500 hover:to-indigo-500 hover:text-white hover:border-transparent"
                    data-testid="download-resume"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/40 text-white bg-white/10 border-white/40 hover:bg-gradient-to-r hover:from-pink-400 hover:via-purple-500 hover:to-indigo-500 hover:text-white hover:border-transparent"
                    data-testid="schedule-call"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">First Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your first name" 
                              {...field}
                              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
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
                          <FormLabel className="text-white">Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your last name" 
                              {...field}
                              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                              data-testid="input-lastName"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Jonhdoe@youremail.com" 
                            {...field}
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
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
                        <FormLabel className="text-white">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger className="bg-white/20 border-white/30 text-[#ffffff]" data-testid="select-projectType">
                              <SelectValue
                                placeholder="Select project type"
                                className="text-white data-[placeholder]:text-white/60"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white/95 backdrop-blur-md">
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

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5}
                            placeholder="Tell me about your project..."
                            className="resize-none bg-white/20 border-white/30 text-white placeholder:text-white/60"
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
                    className="w-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 font-semibold"
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
      </section>
    </div>
  );
}