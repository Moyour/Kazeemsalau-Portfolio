import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, Users, TrendingUp, ExternalLink } from "lucide-react";
import aboutMeImage from "../assets/about-me.png";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ['/api/projects'],
  });

  const featuredProject = projects && projects.length > 0 ? projects[0] : null;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden relative">
      {/* Custom Cursor */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="w-full h-full bg-black rounded-full opacity-80"></div>
      </div>

      {/* Hero Section - Ultra Creative */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left: Massive Typography */}
            <div className="lg:col-span-7 space-y-8">
              <div
                className="space-y-2"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <div className="text-sm font-bold tracking-[0.3em] text-black uppercase mb-6 animate-fade-in">
                  ✦ Learning Experience Design
                </div>

                <h1 className="text-[15vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter relative">
                  <span className="block text-black relative">
                    CRAFT
                  </span>
                  <span className="block text-black">
                    EPIC
                  </span>
                  <span className="block text-black">
                    LEARNING
                  </span>
                </h1>

                <div className="flex items-center gap-4 pt-4">
                  <div className="h-0.5 w-20 bg-black"></div>
                  <p className="text-lg text-gray-600 font-medium">Kazeem Salau</p>
                </div>
              </div>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                Award-winning <span className="font-semibold text-black">Instructional Designer</span> crafting
                immersive SCORM courses and digital experiences that transform how people learn.
              </p>

              <div className="flex flex-wrap gap-4 pt-6">
                <Button
                  asChild
                  className="group bg-black hover:bg-black/90 text-white px-10 py-7 rounded-full text-lg font-semibold shadow-2xl hover:shadow-black/20 hover:scale-105 transition-all duration-300"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Link href="/portfolio">
                    <span className="relative z-10">Explore Work</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="group border-2 border-black/20 text-black hover:border-black hover:text-black px-10 py-7 rounded-full text-lg font-semibold backdrop-blur-sm bg-white/50 hover:bg-white/80 transition-all duration-300"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Link href="/about">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    About Me
                  </Link>
                </Button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-8 max-w-xl">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-black">50+</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider">Projects</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-black">10K+</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider">Learners</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-black">98%</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right: 3D Image Card */}
            <div className="lg:col-span-5 relative">
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 0.01 - 10}deg) rotateX(${-(mousePosition.y * 0.01 - 10)}deg) translateZ(${scrollY * -0.2}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <img
                  src={aboutMeImage}
                  alt="Kazeem Salau"
                  className="w-full h-[600px] object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-black/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section - Bento Grid */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <div className="text-sm font-bold tracking-[0.3em] text-black uppercase mb-4">
              ✦ Core Expertise
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-black mb-6">
              What I Bring to
              <br />
              <span className="text-black">
                Your Vision
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {/* Large Card */}
            <div className="md:col-span-4 md:row-span-2 bg-black rounded-3xl p-12 text-white relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 mb-6 text-white" />
                <h3 className="text-3xl font-bold mb-4">SCORM Development</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Industry-standard e-learning modules built with Articulate Storyline & Rise.
                  Full LMS integration, interactive assessments, and engaging multimedia experiences.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Storyline 360', 'Rise', 'SCORM 1.2/2004', 'xAPI'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Small Cards */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-black/50 transition-all duration-300 hover:shadow-2xl">
              <Users className="w-10 h-10 text-black mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">UX Design</h3>
              <p className="text-gray-600 text-sm">Learner-centered interfaces</p>
            </div>

            <div className="md:col-span-2 bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-black/50 transition-all duration-300 hover:shadow-2xl">
              <TrendingUp className="w-10 h-10 text-black mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Analytics</h3>
              <p className="text-gray-600 text-sm">Data-driven insights</p>
            </div>

            {/* Medium Cards */}
            <div className="md:col-span-3 bg-black/10 rounded-3xl p-8 border-2 border-black/20 hover:border-black/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-3">Instructional Design</h3>
              <p className="text-gray-600">ADDIE, SAM, and agile methodologies for effective learning experiences</p>
            </div>

            <div className="md:col-span-3 bg-black/10 rounded-3xl p-8 border-2 border-black/20 hover:border-black/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-3">Custom Solutions</h3>
              <p className="text-gray-600">Tailored learning platforms and interactive web experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase - Magazine Style */}
      <section className="py-32 relative z-10 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-20">
            <div>
              <div className="text-sm font-bold tracking-[0.3em] text-black uppercase mb-4">
                ✦ Featured Work
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-black">
                Featured
                <br />
                <span className="text-black">
                  Project
                </span>
              </h2>
            </div>
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="hidden md:flex border-2 border-black text-black hover:bg-black hover:text-white px-8 py-6 rounded-full font-semibold group"
              >
                View All
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {projectsLoading && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200">
                <div className="h-96 bg-gray-200 animate-pulse"></div>
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {!projectsLoading && featuredProject && (
            <div className="max-w-4xl mx-auto">
              <Link href={`/portfolio/${featuredProject.id}`}>
                <div className="group bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-black/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
                  <div className="relative h-96 bg-gray-100 overflow-hidden">
                    {featuredProject.imageUrl ? (
                      <img
                        src={featuredProject.imageUrl}
                        alt={featuredProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-black/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg flex items-center gap-2">
                        View Project <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                  <div className="p-10 space-y-4">
                    <div className="text-xs font-bold tracking-wider text-black uppercase">
                      {featuredProject.category || 'E-Learning'}
                    </div>
                    <h3 className="text-3xl font-bold text-black group-hover:text-black transition-colors">
                      {featuredProject.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {featuredProject.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {!projectsLoading && (!projects || projects.length === 0) && (
            <div className="bg-white rounded-3xl p-16 border-2 border-gray-200 text-center">
              <Sparkles className="w-16 h-16 text-black mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-black mb-4">Amazing Projects Coming Soon</h3>
              <p className="text-gray-600 mb-8">Currently crafting exceptional learning experiences</p>
              <Button asChild className="bg-black hover:bg-black/90 text-white px-8 py-6 rounded-full">
                <Link href="/get-in-touch">Get In Touch</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Split Design */}
      <section className="relative z-10 overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left: Content */}
          <div className="bg-black text-white p-12 lg:p-20 flex items-center">
            <div className="max-w-xl">
              <div className="text-sm font-bold tracking-[0.3em] text-white/60 uppercase mb-6">
                ✦ Let's Collaborate
              </div>
              <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Ready to Create
                <br />
                <span className="text-gray-300">Epic Learning?</span>
              </h2>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                Let's discuss your vision and craft an extraordinary learning experience together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-white hover:bg-gray-100 text-black px-10 py-7 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 transition-all"
                >
                  <Link href="/get-in-touch">
                    Start a Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-10 py-7 rounded-full text-lg font-semibold"
                >
                  <Link href="/portfolio">
                    View Portfolio
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Image with overlay */}
          <div className="relative h-[500px] lg:h-auto bg-gray-100">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-center space-y-8">
                <div className="text-black text-6xl lg:text-8xl font-black">
                  50+
                </div>
                <div className="text-gray-700 text-xl tracking-wider">
                  SUCCESSFUL PROJECTS
                </div>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <div className="text-black text-4xl font-bold">10K+</div>
                    <div className="text-gray-600 text-sm">Learners</div>
                  </div>
                  <div>
                    <div className="text-black text-4xl font-bold">98%</div>
                    <div className="text-gray-600 text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
