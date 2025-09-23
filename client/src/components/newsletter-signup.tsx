import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle, Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would integrate with your newsletter service (Mailchimp, ConvertKit, etc.)
      console.log("Newsletter signup:", email);
      
      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "Successfully Subscribed! 🎉",
        description: "Thank you for joining my newsletter. You'll receive updates about my latest projects and insights.",
      });
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-200/20 to-emerald-200/20 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Welcome Aboard! 🎉</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              You're now part of an exclusive community of developers and designers. 
              Check your email for a special welcome message!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-200 p-8 shadow-2xl">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-200/15 to-purple-200/15 rounded-full translate-y-16 -translate-x-16"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-pink-200/10 to-purple-200/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Join the <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Inner Circle</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              Get exclusive access to my latest projects, design insights, and career opportunities. 
              No spam, just pure value.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:via-indigo-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Subscribing...
                </>
              ) : (
                <>
                  <span>Join the Community</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-full border-2 border-white"></div>
              </div>
              <span>500+ developers already joined</span>
            </div>
            <p className="text-xs text-gray-400">
              Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
