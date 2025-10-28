import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Sparkles, Monitor } from "lucide-react";
import aboutMeImage from "../assets/about-me.png";
import testiImage from "../assets/Tes4.jpg";
// import type { Project } from "@/../../shared/schema";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  // Fetch projects from portfolio
  const { data: projects = [], isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ['/api/projects'],
  });

  // Debug: Projects logged (remove in production)

  // Get the first project as featured (you can change this logic)
  const featuredProject = projects && projects.length > 0 ? projects[0] : null;

  const testimonials = [
    {
      word: "TALENTED",
      name: "Ruby",
      title: "Global Talent Leader",
      quote: "Kazeem is a highly talented instructional designer and eLearning developer who consistently delivers exceptional results. I wholeheartedly recommend Kazeem for any project or role that requires top-notch eLearning development and instructional design skills.",
    },
    {
      word: "DEDICATED",
      name: "Habeeb",
      title: "Senior HR Analyst",
      quote: "Kazeem is a good leader. He is a good communicator, a listener, dedicated to his work and a teacher. He is always ensuring everyone around him gets better.",
    },
    {
      word: "MASTERY",
      name: "Damilola",
      title: "Senior Software Developer",
      quote: "Kazeem is the best Product Designer I have ever worked with in my career.",
    },
  ];

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Floating background particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cool-gray"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center hidden lg:flex">
          <img
            src={aboutMeImage}
            alt="Kazeem Salau - Professional eLearning Developer and Instructional Designer specializing in SCORM course development, Articulate Storyline, and Rise courses"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="relative z-10 px-8 lg:px-16 py-20 flex items-center min-h-screen pt-32">
          <div className="max-w-2xl">
            <h1 className="text-[15vw] lg:text-[12vw] xl:text-[10vw] font-black leading-[0.8] tracking-tighter mb-8 text-cream drop-shadow-2xl">
              FOR<br />
              <span className="text-cream">
                LEARNING
              </span>
              <br />
              DESIGN
            </h1>
            <div className="text-cream text-xl lg:text-2xl font-bold tracking-wide mb-4">
              KAZEEM SALAU
            </div>
            <div className="w-20 h-1.5 bg-cream rounded-full mb-8"></div>
            <p className="text-xl lg:text-2xl leading-relaxed mb-12 text-cream/90 font-light">
              Professional eLearning Developer and Instructional Designer specializing in SCORM course development, Articulate Storyline & Rise courses, LMS integration, and custom digital learning solutions. I create engaging, interactive learning experiences that drive results.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" style={{ backgroundImage: `url(${testiImage})` }} />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 space-y-32">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card text-center">
              <h2 className="text-8xl lg:text-9xl font-black text-white/10 tracking-wider" aria-label={`Testimonial about ${t.word.toLowerCase()} work`}>{t.word}</h2>
              <blockquote className="text-2xl lg:text-3xl leading-relaxed text-gray-300 my-6">
                "{t.quote}"
              </blockquote>
              <div className="text-xl font-bold text-white">{t.name}</div>
              <div className="text-lg text-white/80">{t.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Project Section */}
      <section ref={projectsRef} className="py-32 bg-cool-gray relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-cream mb-8 drop-shadow-lg">
              Featured eLearning Project
            </h2>
            <p className="text-xl text-cream/90 leading-relaxed max-w-3xl mx-auto">
              Professional SCORM course development and Articulate Storyline projects that deliver measurable learning outcomes.
            </p>
          </div>

          {/* Loading State */}
          {projectsLoading && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-12 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-8 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-20 bg-white/20 rounded animate-pulse"></div>
                  <div className="flex gap-3">
                    <div className="h-8 w-24 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="h-8 w-20 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="h-8 w-16 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl h-80 animate-pulse"></div>
              </div>
            </div>
          )}

          {/* Featured Project Card */}
          {!projectsLoading && featuredProject && (
            <div className="project-card bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Info */}
                <div className="space-y-6">
                  <div className="text-sm uppercase tracking-widest text-white/70 font-semibold">
                    {featuredProject.category || "Featured Work"}
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {featuredProject.title}
                  </h3>
                  <p className="text-xl text-white/90 leading-relaxed">{featuredProject.description}</p>
                  {featuredProject.tools && featuredProject.tools.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {featuredProject.tools.map((tool: string, idx: number) => (
                        <span key={idx} className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium text-white border border-white/30">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link href={`/portfolio/${featuredProject.id}`}>
                    <Button className="mt-6 bg-lapis-lazuli text-cream font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-lapis-lazuli/90">
                      View Case Study <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Right: Image */}
                <div className="bg-white/10 rounded-2xl p-8 h-80 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  {featuredProject.imageUrl ? (
                    <img
                      src={featuredProject.imageUrl}
                      alt={featuredProject.title}
                      className="w-full h-full object-fill rounded-2xl"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="text-white/60 text-lg flex items-center gap-2">
                      <Monitor className="w-8 h-8" />
                      Project Visual
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* No Projects State */}
          {!projectsLoading && (!projects || projects.length === 0) && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-16 border border-white/20 text-center">
              <div className="text-white/60 text-xl mb-4">No projects available</div>
              <Link href="/portfolio">
                <Button className="bg-teal-dark text-white px-6 py-3 rounded-full hover:bg-teal-medium">
                  View All Projects
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-black text-center">
        <h2 className="text-6xl lg:text-7xl font-bold text-white mb-16 leading-tight">
          Let's Start a<br />Conversation
        </h2>
        <p className="text-2xl lg:text-3xl text-gray-300 mb-16 leading-relaxed">
          Drop me a message, let's make something learners will love.
        </p>
        <div className="flex justify-center gap-8">
          <Link href="/get-in-touch">
                <Button className="bg-lapis-lazuli text-cream px-12 py-6 rounded-full text-xl font-semibold hover:bg-lapis-lazuli/90">
              Get In Touch 
            </Button>
          </Link>
          <Link href="/portfolio">
                <Button className="bg-lapis-lazuli text-cream px-12 py-6 rounded-full text-xl font-semibold hover:bg-lapis-lazuli/90">
              View Portfolio
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
