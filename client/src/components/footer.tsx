import { Mail, X, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="mb-4 md:mb-0 text-sm sm:text-base">&copy; 2025 Kazeem Salau. All rights reserved.</p>
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href="mailto:kazeem@kazeemsalau.com"
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
              title="Send an email"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </a>
            <a
              href="https://x.com/themoyoursalau?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
              title="Visit X profile"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </a>
            <a
              href="https://www.youtube.com/@moyoursalau"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
              title="Visit YouTube channel"
            >
              <Youtube className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </a>
            <a
              href="https://linkedin.com/in/kazeem-salau-164b1087"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
              title="Visit LinkedIn profile"
            >
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
