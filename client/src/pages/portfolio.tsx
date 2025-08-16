import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Sparkles, ArrowRight, Target, Users, Brain, Zap, Calendar, ExternalLink, Filter, Monitor } from "lucide-react";
import { Project } from "@shared/schema";

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const categories = [
    { id: "all", label: "All Impact", icon: Target, count: projects.length },
    { id: "elearning", label: "Digital Learning", icon: Brain, count: projects.filter(p => p.category === "elearning").length },
    { id: "mobile", label: "Mobile Experiences", icon: Zap, count: projects.filter(p => p.category === "mobile").length },
    { id: "corporate", label: "Corporate Training", icon: Users, count: projects.filter(p => p.category === "corporate").length },
  ];

  const filteredProjects = projects.filter((project: Project) => {
    return activeFilter === "all" || project.category === activeFilter;
  });

  const impactStats = [
    { number: "150K+", label: "Learners Transformed", icon: Users },
    { number: "95%", label: "Satisfaction Rate", icon: Target },
    { number: "40+", label: "Projects Delivered", icon: Sparkles },
    { number: "85%", label: "Performance Improvement", icon: Brain },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen overflow-x-hidden">
      
      {/* Interactive Cursor */}
      <div 
        className="fixed w-8 h-8 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transition: 'all 0.1s ease-out',
          transform: hoveredProject ? 'scale(2)' : 'scale(1)'
        }}
      />

      {/* Hero Section - Dramatic Impact Statement */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          <div className="text-center space-y-16">
            
            {/* Main Title */}
            <div 
              className="space-y-8"
              style={{
                transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                opacity: isLoaded ? 1 : 0,
                transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
              }}
            >
              <h1 className="text-7xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter">
                LEARNING
                <br />
                <span className="relative">
                  THAT
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full" />
                </span>
                <br />
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  TRANSFORMS
                </span>
              </h1>
              
              <p className="text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                Every project tells a story of transformation. From confused to confident. 
                From overwhelmed to <span className="font-bold">empowered</span>. 
                From knowing to <span className="italic">doing</span>.
              </p>
            </div>

            {/* Impact Stats */}
            <div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
              style={{
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                opacity: isLoaded ? 1 : 0,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
              }}
            >
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center pointer-events-none select-none">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <stat.icon className="w-8 h-8 text-brand-slate mx-auto mb-4 transition-transform duration-300" />
                    <div className="text-3xl font-black text-brand-slate mb-2">{stat.number}</div>
                    <div className="text-slate-600 font-medium text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </section>

      {/* Project Categories - Creative Filter */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              AREAS OF
              <br />
              <span className="text-white/50">IMPACT</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Each domain requires unique approaches, but the goal remains the same: creating learning that sticks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`group text-left p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-105 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white border-transparent shadow-2xl'
                    : 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40'
                }`}
                data-testid={`filter-${category.id}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <category.icon className={`w-8 h-8 group-hover:scale-110 transition-transform duration-300 text-white`} />
                    <span className={`text-2xl font-black ${
                      activeFilter === category.id ? 'text-white' : 'text-white/40'
                    }`}>
                      {category.count}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold leading-tight text-white`}>
                    {category.label}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase - Storytelling Approach */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-20">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/10 h-64 rounded-3xl"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-white/40 mx-auto mb-6" />
              <p className="text-2xl text-white/60">No projects in this category yet.</p>
            </div>
          ) : (
            <div className="space-y-32">
              {filteredProjects.map((project: Project, index) => (
                <div 
                  key={project.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className={`grid lg:grid-cols-12 gap-16 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    
                    {/* Project Content */}
                    <div className={`lg:col-span-7 space-y-8 ${
                      index % 2 === 1 ? 'lg:col-start-6' : ''
                    }`}>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                          <span className="text-white/60 text-sm uppercase tracking-wide font-medium">
                            {project.category?.replace('_', ' ') || 'Project'}
                          </span>
                        </div>
                        
                        <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight group-hover:text-white/90 transition-colors duration-300">
                          {project.title}
                        </h3>
                        
                        <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                          {project.description}
                        </p>

                        {/* Tools/Technologies */}
                        {project.tools && project.tools.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {project.tools.map((tool, toolIndex) => (
                              <span 
                                key={toolIndex}
                                className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/20"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Call to Action */}
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-6">
                            <Link 
                              href={`/portfolio/${project.id}`}
                              className="group/btn bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full font-bold hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 flex items-center gap-3 hover:scale-105"
                            >
                              View Case Study
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                            
                            {project.scormUrl && (
                              <div className="flex items-center gap-2 text-green-400">
                                <Monitor className="w-4 h-4" />
                                <span className="text-sm font-medium">Interactive Training Available</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Visual */}
                    <div className={`lg:col-span-5 ${
                      index % 2 === 1 ? 'lg:col-start-1' : ''
                    }`}>
                      <div className="relative group/visual">
                        <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 group-hover:bg-white/10 transition-all duration-500">
                          <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center">
                            <div className="text-center space-y-4">
                              <Sparkles className="w-12 h-12 text-white/60 mx-auto" />
                              <p className="text-white/60 font-medium">Project Preview</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                YOUR PROJECT
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  COULD BE NEXT
                </span>
              </h2>
              
              <p className="text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Ready to create learning experiences that your audience will remember, 
                apply, and share? Let's build something transformational together.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/contact"
                className="group bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white px-12 py-6 rounded-full font-bold text-lg hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a 
                href="/about"
                className="bg-white/10 text-white px-12 py-6 rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
              >
                Learn My Process
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
