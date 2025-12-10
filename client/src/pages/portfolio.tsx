import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Sparkles, ArrowRight, Target, Users, Brain, Zap, Calendar, ExternalLink, Filter, Monitor } from "lucide-react";
import { Project } from "../../../shared/schema";

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
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
    { id: "Digital", label: "Digital Learning", icon: Monitor },
    { id: "mobile", label: "Mobile Experiences", icon: Brain },
    { id: "Corporate", label: "Corporate Training", icon: Users },
    { id: "Game", label: "Gamified Learning", icon: Sparkles },
  ];

  const filteredProjects = projects.filter((project: Project) => {
    return activeFilter === "all" || project.category === activeFilter;
  });

  const impactStats = [
    { label: "Transform Learning", icon: Users },
    { label: "Exceed Expectations", icon: Target },
    { label: "Timely Delivery", icon: Calendar },
    { label: "Boost Results", icon: Brain },
  ];

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Interactive Cursor - Desktop only */}
      <div
        className="fixed w-8 h-8 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block will-change-transform"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transition: 'transform 0.1s ease-out',
          transform: hoveredProject ? 'scale(2)' : 'scale(1)'
        }}
      />
      {/* Hero Section - Dramatic Impact Statement */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background - Desktop only, reduced count */}
        <div className="absolute inset-0 hidden md:block">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white/10 rounded-full will-change-transform"
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
              <h1 className="text-7xl lg:text-9xl font-black text-black leading-[0.8] tracking-tighter">
                LEARNING
                <br />
                <span className="relative">
                  THAT
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-black rounded-full" />
                </span>
                <br />
                <span className="text-black">
                  TRANSFORMS
                </span>
              </h1>
              
              <p className="text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Professional eLearning development portfolio showcasing SCORM course development, Articulate Storyline & Rise projects, LMS integration, and custom digital learning solutions. Every project delivers measurable learning outcomes.
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
                <div key={index} className="relative group impact-stat-card">
                  <div className="absolute -inset-4 bg-black rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="relative bg-white backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200 group-hover:bg-gray-50 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500">
                    <div className="text-center space-y-4">
                      <stat.icon className="w-8 h-8 text-black mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
                      <div className="text-gray-700 font-medium text-sm group-hover:text-black group-hover:translate-y-0.5 transition-all duration-300">{stat.label}</div>
                    </div>
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
          .impact-stat-card {
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
          }
          .impact-stat-card * {
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
          }
        `}</style>
      </section>
      {/* Project Categories - Creative Filter */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-black mb-6">
              AREAS OF
              <br />
              <span className="text-gray-500">IMPACT</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Where innovation meets impact. I craft learning experiences that don't just teach—they transform minds, ignite passion, and drive extraordinary results that last.
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === "all"
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
              data-testid="filter-all"
            >
              Show All Projects
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`relative group cursor-pointer ${
                  activeFilter === category.id ? 'ring-2 ring-black' : ''
                }`}
                data-testid={`filter-${category.id}`}
              >
                <div className={`absolute -inset-4 bg-black rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
                  activeFilter === category.id ? 'opacity-50' : ''
                }`} />
                <div className={`relative bg-white backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200 group-hover:bg-gray-50 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500 ${
                  activeFilter === category.id ? 'bg-gray-100 border-black' : ''
                }`}>
                  <div className="text-center space-y-4">
                    <category.icon className={`w-8 h-8 text-black mx-auto group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 ${
                      activeFilter === category.id ? 'scale-110' : ''
                    }`} />
                    <div className={`font-medium text-sm group-hover:text-black group-hover:translate-y-0.5 transition-all duration-300 ${
                      activeFilter === category.id ? 'text-black font-bold' : 'text-gray-600'
                    }`}>{category.label}</div>
                  </div>
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
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-black mb-4">Projects Coming Soon!</h3>
              <p className="text-xl text-gray-600 mb-8">I'm currently working on some amazing projects that will be showcased here soon.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/get-in-touch"
                  className="bg-black text-white font-bold px-8 py-4 rounded-full hover:bg-black/90 transition-all duration-300 flex items-center gap-3 hover:scale-105 justify-center"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="bg-gray-100 border-2 border-gray-300 text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all duration-300 flex items-center gap-3 justify-center"
                >
                  Learn More About Me
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <p className="text-2xl text-gray-600">No projects in this category yet.</p>
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
                          <div className="w-3 h-3 bg-black rounded-full group-hover:scale-150 transition-transform duration-300" />
                          <span className="text-gray-600 text-sm uppercase tracking-wide font-medium">
                            {project.category?.replace('_', ' ') || 'Project'}
                          </span>
                        </div>
                        
                        <h3 className="text-4xl lg:text-5xl font-black text-black leading-tight group-hover:text-gray-600 transition-colors duration-300">
                          {project.title}
                        </h3>
                        
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                          {project.description}
                        </p>

                        {/* Tools/Technologies */}
                        {project.tools && project.tools.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {project.tools.map((tool: string, toolIndex: number) => (
                              <span 
                                key={toolIndex}
                                className="px-4 py-2 bg-black/10 backdrop-blur-md rounded-full text-black text-sm font-medium border border-gray-300/20"
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
                              className="group/btn bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-black/90 transition-all duration-300 flex items-center gap-3 hover:scale-105"
                            >
                              View Case Study
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                            
                            {project.scormUrl && (
                              <a
                                href={project.scormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-300 group/scorm"
                              >
                                <Monitor className="w-4 h-4 group-hover/scorm:scale-110 transition-transform" />
                                <span className="text-sm font-medium">Play SCORM Course</span>
                                <ExternalLink className="w-3 h-3 group-hover/scorm:translate-x-0.5 group-hover/scorm:-translate-y-0.5 transition-transform" />
                              </a>
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
                        <div className="absolute -inset-4 bg-black rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative bg-white backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-200 group-hover:bg-gray-50 transition-all duration-500">
                          <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                            {project.imageUrl ? (
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-fill rounded-2xl group-hover/visual:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  const fallbackDiv = e.currentTarget.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
                                  if (fallbackDiv) {
                                    fallbackDiv.style.display = 'flex';
                                  }
                                }}
                              />
                            ) : null}
                            <div
                              className={`fallback-placeholder w-full h-full flex items-center justify-center ${project.imageUrl ? 'hidden' : 'flex'}`}
                            >
                              <div className="text-center space-y-4">
                                <Sparkles className="w-12 h-12 text-gray-400 mx-auto" />
                                <p className="text-gray-600 font-medium">Project Preview</p>
                              </div>
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
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gray-50" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-6xl lg:text-7xl font-black text-black leading-tight">
                YOUR PROJECT
                <br />
                <span className="text-gray-600">
                  COULD BE NEXT
                </span>
              </h2>

              <p className="text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Ready to create learning experiences that your audience will remember,
                apply, and share? Let's build something transformational together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/get-in-touch"
                className="group bg-black text-white px-12 py-6 rounded-full font-bold text-lg hover:bg-black/90 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a
                href="/about"
                className="bg-gray-100 text-black px-12 py-6 rounded-full font-bold text-lg border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-all duration-300 hover:scale-105"
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
