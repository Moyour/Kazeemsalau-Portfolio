import { Mail, X, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="mb-4 md:mb-0">&copy; 2025 Kazeem Salau. All rights reserved.</p>
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="mailto:your.email@example.com"
              className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
              title="Send an email"
            >
              <Mail className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://x.com/themoyoursalau?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
              title="Visit X profile"
            >
              <X className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://www.youtube.com/@moyoursalau"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
              title="Visit YouTube channel"
            >
              <Youtube className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/kazeem-salau"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
              title="Visit LinkedIn profile"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
