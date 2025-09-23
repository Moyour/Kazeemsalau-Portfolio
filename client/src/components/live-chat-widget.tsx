import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Simulate sending message
    toast({
      title: "Message Sent! 💬",
      description: "Thanks for reaching out! I'll get back to you within 24 hours.",
    });
    
    setMessage("");
    setIsMinimized(true);
  };

  const handleCallNow = () => {
    window.open("https://cal.com/kazeem-salau-c5t2nj/30min", "_blank");
  };

  const handleEmailNow = () => {
    window.open("mailto:kazeem@kazeemsalau.com?subject=Portfolio Inquiry", "_blank");
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 w-72 sm:w-80 md:w-96">
      <Card className="shadow-2xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <CardTitle className="text-xs sm:text-sm font-semibold">Live Chat</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-5 w-5 sm:h-6 sm:w-6 p-0"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-3 sm:p-4">
          {!isMinimized ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                  Hi! I'm Kazeem. How can I help you today?
                </p>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={handleCallNow}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-2 sm:p-3"
                >
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-green-600" />
                  <div>
                    <div className="font-medium text-xs sm:text-sm">Schedule a Call</div>
                    <div className="text-xs text-gray-500">Book a 30-min consultation</div>
                  </div>
                </Button>
                
                <Button
                  onClick={handleEmailNow}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-2 sm:p-3"
                >
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-blue-600" />
                  <div>
                    <div className="font-medium text-xs sm:text-sm">Send Email</div>
                    <div className="text-xs text-gray-500">Get a quick response</div>
                  </div>
                </Button>
              </div>
              
              <div className="border-t pt-2 sm:pt-3">
                <div className="flex space-x-1 sm:space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-8 sm:h-9 w-8 sm:w-9 p-0"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-3 sm:py-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Message sent successfully!</p>
              <Button
                onClick={() => setIsMinimized(false)}
                variant="outline"
                size="sm"
                className="text-xs h-7 sm:h-8"
              >
                Send Another Message
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
