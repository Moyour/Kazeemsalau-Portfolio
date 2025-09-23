import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
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
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to the Newsletter!</h3>
            <p className="text-gray-600 text-sm">
              You're all set! Check your email for a confirmation message.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm sm:max-w-md mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader className="text-center px-4 sm:px-6 pt-6">
        <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-purple-100">
          <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
        </div>
        <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
          Stay Updated
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600 px-2">
          Get notified about my latest projects, insights, and opportunities. No spam, just valuable content.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm sm:text-base"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-sm sm:text-base h-10 sm:h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                <span className="hidden sm:inline">Subscribing...</span>
                <span className="sm:hidden">Subscribing...</span>
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Subscribe to Newsletter</span>
                <span className="sm:hidden">Subscribe</span>
              </>
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-3 px-2">
          Join 500+ developers who get my weekly insights
        </p>
      </CardContent>
    </Card>
  );
}
