import { ArrowRight, FolderOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-purple-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-brand-slate leading-tight">
                Hi, I'm <span className="text-brand-purple">Kazeem</span>.
              </h1>
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed">
                I specialize in creating high-impact learning solutions that drive engagement and support performance across corporate and tech environments.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-brand-purple text-white rounded-full text-sm font-medium">
                Instructional Design
              </span>
              <span className="px-4 py-2 bg-brand-purple text-white rounded-full text-sm font-medium">
                Learning Experience Design
              </span>
              <span className="px-4 py-2 bg-slate-200 text-slate-700 rounded-full text-sm font-medium">
                Design Thinking
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio">
                <Button 
                  size="lg" 
                  className="bg-brand-purple hover:bg-purple-600 text-white"
                  data-testid="view-work-button"
                >
                  <FolderOpen className="mr-2 h-5 w-5" />
                  View My Work
                </Button>
              </Link>
              <Link href="/get-in-touch">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                  data-testid="contact-button"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern instructional design workspace" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="hero-image"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-brand-purple/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
