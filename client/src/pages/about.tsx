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
      color: "bg-black"
    },
    {
      title: "Empathy Drives Design",
      description: "Every learner carries hopes, fears, and dreams. Great design honors their humanity.",
      emotion: "Connection",
      icon: Heart,
      color: "bg-gray-600"
    },
    {
      title: "Stories Shape Reality",
      description: "The most powerful learning happens when we weave knowledge into narratives that resonate.",
      emotion: "Inspiration",
      icon: Sparkles,
      color: "bg-gray-500"
    }
  ];

  const learnerTypes = [
    { type: "The Skeptical Executive", challenge: "Prove value in 30 seconds", approach: "Data-driven storytelling" },
    { type: "The Overwhelmed Employee", challenge: "No time for training", approach: "Micro-moments of brilliance" },
    { type: "The Curious Creator", challenge: "Wants depth and exploration", approach: "Interactive discovery paths" },
    { type: "The Practical Implementer", challenge: "Just tell me what to do", approach: "Clear, actionable frameworks" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">

      {/* Interactive Cursor Effect - Desktop only */}
      <div
        className="fixed w-6 h-6 bg-black/30 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block will-change-transform"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Hero Section - Emotional Introduction */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background Elements - Desktop only, reduced count */}
        <div className="absolute inset-0 hidden md:block">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-black/10 rounded-full animate-pulse will-change-transform"
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
                  <h1 className="text-7xl lg:text-9xl font-black text-black leading-[0.8] tracking-tighter">
                    I DESIGN
                    <br />
                    <span className="relative">
                      MOMENTS
                      <div className="absolute -bottom-4 left-0 w-full h-1 bg-black rounded-full" />
                    </span>
                    <br />
                    <span className="text-gray-600">OF CLARITY</span>
                  </h1>
                </div>

                <div className="max-w-lg space-y-6">
                  <p className="text-2xl text-gray-700 leading-relaxed font-light">
                    Professional eLearning Developer and Instructional Designer specializing in SCORM course development, Articulate Storyline & Rise courses, LMS integration, and custom digital learning solutions. I create engaging, interactive learning experiences that drive measurable results.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-5 h-5 text-black ml-1" />
                    </div>
                    <div>
                      <p className="text-black font-medium">That's what I create.</p>
                      <p className="text-gray-600 text-sm">Learning experiences that transform lives.</p>
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
                  <div className="absolute -inset-4 bg-black rounded-3xl blur-xl opacity-10" />
                  <div className="relative bg-gray-100 backdrop-blur-sm rounded-3xl p-4 border border-gray-200">
                    <img
                      src={aboutMeImage}
                      alt="Kazeem Salau - Professional eLearning Developer and Instructional Designer specializing in SCORM course development, Articulate Storyline, and Rise courses"
                      className="w-full h-auto rounded-2xl"
                      data-testid="about-portrait"
                    />
                    <div className="absolute top-8 right-8 bg-white rounded-full p-3 border-2 border-black">
                      <Star className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs - Emotional Journey */}
      <section className="py-32 relative bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl lg:text-7xl font-black text-black mb-8 leading-tight">
              WHAT I
              <br />
              <span className="text-gray-700">
                BELIEVE
              </span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Design for learning is more than beautiful slides or sleek interfaces. It's about shaping experiences that connect with people, spark curiosity, and turn knowledge into real-world skills that stick.
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
                          <div className={`inline-block px-6 py-2 ${belief.color} rounded-full text-white font-bold text-sm uppercase tracking-wide`}>
                            {belief.emotion}
                          </div>
                          <h3 className="text-4xl lg:text-5xl font-black text-black leading-tight">
                            {belief.title}
                          </h3>
                          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                            {belief.description}
                          </p>
                        </div>
                      </div>
                      <div className="lg:col-span-4 flex justify-center">
                        <div className={`w-32 h-32 ${belief.color} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                          <belief.icon className="w-16 h-16 text-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="lg:col-span-4 flex justify-center order-2 lg:order-1">
                        <div className={`w-32 h-32 ${belief.color} rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                          <belief.icon className="w-16 h-16 text-white" />
                        </div>
                      </div>
                      <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
                        <div className="space-y-4 text-right">
                          <div className={`inline-block px-6 py-2 ${belief.color} rounded-full text-white font-bold text-sm uppercase tracking-wide`}>
                            {belief.emotion}
                          </div>
                          <h3 className="text-4xl lg:text-5xl font-black text-black leading-tight">
                            {belief.title}
                          </h3>
                          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl ml-auto">
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
      <section className="py-32 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-black mb-6">
              THE HUMANS
              <br />
              <span className="text-gray-600">I DESIGN FOR</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Every learner is a universe of complexity. Understanding their reality is where great design begins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {learnerTypes.map((learner, index) => (
              <div
                key={index}
                className="group bg-white backdrop-blur-md rounded-3xl p-8 border-2 border-gray-200 hover:border-black/50 transition-all duration-500 hover:scale-105"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-black rounded-full group-hover:scale-150 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold text-black">{learner.type}</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 uppercase tracking-wide font-medium mb-2">Their Challenge</p>
                      <p className="text-lg text-gray-700 italic">"{learner.challenge}"</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 uppercase tracking-wide font-medium mb-2">My Approach</p>
                      <p className="text-lg text-black font-medium">{learner.approach}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-black rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl lg:text-7xl font-black text-black mb-6 leading-tight">
              WHAT PEOPLE
              <br />
              <span className="text-gray-600">SAY</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by industry leaders and teams worldwide
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 - TALENTED */}
            <div className="group bg-gray-50 rounded-3xl p-8 hover:bg-white border-2 border-transparent hover:border-black transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-5xl font-black text-gray-200 group-hover:text-gray-300 transition-colors">
                    TALENTED
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed min-h-[200px]">
                    "Kazeem is a highly talented instructional designer and eLearning developer who consistently delivers exceptional results. I wholeheartedly recommend Kazeem for any project or role that requires top-notch eLearning development and instructional design skills."
                  </p>
                </div>

                <div className="pt-6 border-t-2 border-gray-200">
                  <p className="text-xl font-bold text-black mb-1">Ruby</p>
                  <p className="text-sm text-gray-600">Global Talent Leader</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - DEDICATED */}
            <div className="group bg-gray-50 rounded-3xl p-8 hover:bg-white border-2 border-transparent hover:border-black transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-5xl font-black text-gray-200 group-hover:text-gray-300 transition-colors">
                    DEDICATED
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed min-h-[200px]">
                    "Kazeem is a good leader. He is a good communicator, a listener, dedicated to his work and a teacher. He is always ensuring everyone around him gets better."
                  </p>
                </div>

                <div className="pt-6 border-t-2 border-gray-200">
                  <p className="text-xl font-bold text-black mb-1">Habeeb</p>
                  <p className="text-sm text-gray-600">Senior HR Analyst</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - MASTERY */}
            <div className="group bg-gray-50 rounded-3xl p-8 hover:bg-white border-2 border-transparent hover:border-black transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-5xl font-black text-gray-200 group-hover:text-gray-300 transition-colors">
                    MASTERY
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed min-h-[200px]">
                    "Kazeem is the best Product Designer I have ever worked with in my career."
                  </p>
                </div>

                <div className="pt-6 border-t-2 border-gray-200">
                  <p className="text-xl font-bold text-black mb-1">Damilola</p>
                  <p className="text-sm text-gray-600">Senior Software Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Emotional */}
      <section className="py-32 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black/10" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                READY TO
                <br />
                <span className="text-gray-400">
                  TRANSFORM
                </span>
                <br />
                LEARNING?
              </h2>

              <p className="text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Let's create learning experiences that don't just inform—they
                <span className="font-bold"> inspire</span>,
                <span className="italic"> engage</span>, and
                <span className="underline decoration-gray-400"> transform</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/get-in-touch"
                className="group bg-white text-black px-12 py-6 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
              >
                Let's Create Magic
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="/portfolio"
                className="bg-transparent text-white px-12 py-6 rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
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
