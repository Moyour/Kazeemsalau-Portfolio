import { Brain, Heart, Sparkles, ArrowRight, Play, Star, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import aboutMeImage from "../assets/about-me.png";

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newActiveSection = Math.floor(scrollPosition / windowHeight);
      setActiveSection(newActiveSection);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const beliefs = [
    {
      title: "Learning is Transformation",
      description: "Not information transfer, but profound change in how people think, feel, and act.",
      emotion: "Wonder",
      icon: Brain,
      color: "from-purple-400 via-pink-400 to-rose-400"
    },
    {
      title: "Empathy Drives Design", 
      description: "Every learner carries hopes, fears, and dreams. Great design honors their humanity.",
      emotion: "Connection",
      icon: Heart,
      color: "from-purple-400 via-indigo-400 to-pink-400"
    },
    {
      title: "Stories Shape Reality",
      description: "The most powerful learning happens when we weave knowledge into narratives that resonate.",
      emotion: "Inspiration",
      icon: Sparkles,
      color: "from-amber-400 via-orange-400 to-pink-400"
    }
  ];

  const learnerTypes = [
    { type: "The Skeptical Executive", challenge: "Prove value in 30 seconds", approach: "Data-driven storytelling" },
    { type: "The Overwhelmed Employee", challenge: "No time for training", approach: "Micro-moments of brilliance" },
    { type: "The Curious Creator", challenge: "Wants depth and exploration", approach: "Interactive discovery paths" },
    { type: "The Practical Implementer", challenge: "Just tell me what to do", approach: "Clear, actionable frameworks" }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen overflow-x-hidden">
      
      {/* Interactive Cursor Effect */}
      <div 
        className="fixed w-6 h-6 bg-white/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Hero Section - Emotional Introduction */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Content Side */}
            <div className="space-y-12">
              <div 
                className="space-y-8"
                style={{
                  transform: isLoaded ? 'translateY(0) rotateX(0deg)' : 'translateY(50px) rotateX(10deg)',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                }}
              >
                <div className="relative">
                  <h1 className="text-7xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter">
                    I DESIGN
                    <br />
                    <span className="relative">
                      MOMENTS
                      <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full" />
                    </span>
                    <br />
                    <span className="text-white/40">OF CLARITY</span>
                  </h1>
                </div>
                
                <div className="max-w-lg space-y-6">
                  <p className="text-2xl text-white/90 leading-relaxed font-light">
                    Professional eLearning Developer and Instructional Designer specializing in SCORM course development, Articulate Storyline & Rise courses, LMS integration, and custom digital learning solutions. I create engaging, interactive learning experiences that drive measurable results.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-5 h-5 text-white ml-1" />
                    </div>
                    <div>
                      <p className="text-white font-medium">That's what I create.</p>
                      <p className="text-white/70 text-sm">Learning experiences that transform lives.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side with Creative Frame */}
            <div className="relative">
              <div 
                className="relative"
                style={{
                  transform: isLoaded ? 'translateY(0) scale(1) rotateY(0deg)' : 'translateY(30px) scale(0.95) rotateY(-10deg)',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
                }}
              >
                {/* Creative Frame */}
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-3xl blur-xl opacity-30" />
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20">
                    <img 
                      src={aboutMeImage}
                      alt="Kazeem Salau - Professional eLearning Developer and Instructional Designer specializing in SCORM course development, Articulate Storyline, and Rise courses"
                      className="w-full h-auto rounded-2xl"
                      data-testid="about-portrait"
                    />
                    <div className="absolute top-8 right-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full p-3">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs - Emotional Journey */}
      <section className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              WHAT I
              <br />
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                BELIEVE
              </span>
            </h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Design for learning is more than beautiful slides or sleek interfaces. It’s about shaping experiences that connect with people, spark curiosity, and turn knowledge into real-world skills that stick.
            </p>
          </div>
          
          <div className="space-y-20">
            {beliefs.map((belief, index) => (
              <div 
                key={index}
                className="group relative"
                style={{
                  transform: `translateX(${index % 2 === 0 ? '-20px' : '20px'})`,
                  opacity: 0,
                  animation: `slideIn 1s ease-out ${0.5 + index * 0.3}s forwards`
                }}
              >
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div className="lg:col-span-8 space-y-6">
                        <div className="space-y-4">
                          <div className={`inline-block px-6 py-2 bg-gradient-to-r ${belief.color} rounded-full text-white font-bold text-sm uppercase tracking-wide`}>
                            {belief.emotion}
                          </div>
                          <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                            {belief.title}
                          </h3>
                          <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                            {belief.description}
                          </p>
                        </div>
                      </div>
                      <div className="lg:col-span-4 flex justify-center">
                        <div className={`w-32 h-32 bg-gradient-to-r ${belief.color} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                          <belief.icon className="w-16 h-16 text-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="lg:col-span-4 flex justify-center order-2 lg:order-1">
                        <div className={`w-32 h-32 bg-gradient-to-r ${belief.color} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                          <belief.icon className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
                        <div className="space-y-4 text-right">
                          <div className={`inline-block px-6 py-2 bg-gradient-to-r ${belief.color} rounded-full text-white font-bold text-sm uppercase tracking-wide`}>
                            {belief.emotion}
                          </div>
                          <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                            {belief.title}
                          </h3>
                          <p className="text-xl text-white/80 leading-relaxed max-w-2xl ml-auto">
                            {belief.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes slideIn {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </section>

      {/* The Humans I Design For */}
      <section className="py-32 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              THE HUMANS
              <br />
              <span className="text-white/50">I DESIGN FOR</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Every learner is a universe of complexity. Understanding their reality is where great design begins.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {learnerTypes.map((learner, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold text-white">{learner.type}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wide font-medium mb-2">Their Challenge</p>
                      <p className="text-lg text-white/90 italic">"{learner.challenge}"</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-white/60 uppercase tracking-wide font-medium mb-2">My Approach</p>
                      <p className="text-lg text-white font-medium">{learner.approach}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Emotional */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                READY TO
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  TRANSFORM
                </span>
                <br />
                LEARNING?
              </h2>
              
              <p className="text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Let's create learning experiences that don't just inform—they 
                <span className="font-bold"> inspire</span>, 
                <span className="italic"> engage</span>, and 
                <span className="underline decoration-pink-400"> transform</span>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/get-in-touch"
                className="group bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white px-12 py-6 rounded-full font-bold text-lg hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
              >
                Let's Create Magic
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a 
                href="/portfolio"
                className="bg-white/10 text-white px-12 py-6 rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
              >
                See the Impact
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
