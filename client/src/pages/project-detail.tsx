import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Download, Play, Monitor, Sparkles, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@shared/schema";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-cream mb-4">Project Not Found</h1>
          <p className="text-cream/90 mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/portfolio">
            <Button>Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-cool-gray min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Back Navigation */}
        <Link href="/portfolio">
          <Button variant="ghost" className="mb-8" data-testid="back-to-portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-cream mb-6" data-testid="project-title">
            {project.title}
          </h1>
          <p className="text-xl text-cream/90 leading-relaxed mb-6" data-testid="project-description">
            {project.description}
          </p>
          
          {/* Tools Used */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tools?.map((tool: string, index: number) => (
              <Badge 
                key={index} 
                variant="secondary"
                data-testid={`project-tool-${index}`}
              >
                {tool}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.demoUrl && (
              <Button 
                asChild
                className="bg-lapis-lazuli text-cream hover:bg-lapis-lazuli/90"
                data-testid="demo-button"
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 h-4 w-4" />
                  View Demo
                </a>
              </Button>
            )}
            {project.caseStudyUrl && (
              <Button 
                variant="outline"
                asChild
                data-testid="case-study-button"
              >
                <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Case Study
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <div className="relative bg-almond/30 rounded-2xl overflow-hidden shadow-lg">
            <div className="aspect-video bg-almond/20">
              {project.imageUrl ? (
                <img 
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-fill rounded-2xl"
                  onError={(e) => {
                    // Debug: Image load error (remove in production)
                    e.currentTarget.style.display = 'none';
                    const fallbackDiv = e.currentTarget.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
                    if (fallbackDiv) {
                      fallbackDiv.style.display = 'flex';
                    }
                  }}
                  onLoad={() => {
                    // Debug: Image loaded successfully (remove in production)
                  }}
                  data-testid="project-image"
                />
              ) : null}
              <div 
                className={`fallback-placeholder w-full h-full flex items-center justify-center rounded-2xl ${project.imageUrl ? 'hidden' : 'flex'}`}
              >
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 text-slate-400 mx-auto" />
                  <p className="text-slate-500 font-medium text-lg">Project Preview</p>
                  <p className="text-slate-400 text-sm">Visual content coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Project Details */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-cream mb-4">Project Overview</h2>
          <p className="text-cream/90 leading-relaxed mb-8" data-testid="project-long-description">
            {project.longDescription || project.description}
          </p>

          {/* Project Sections */}
          {(project.challenge || project.solution || project.process || project.results) && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {project.challenge && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-cream mb-4">Challenge</h3>
                  <p className="text-cream/90" data-testid="project-challenge">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-cream mb-4">Solution</h3>
                  <p className="text-cream/90" data-testid="project-solution">
                    {project.solution}
                  </p>
                </div>
              )}
              {project.process && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-cream mb-4">Process</h3>
                  <p className="text-cream/90" data-testid="project-process">
                    {project.process}
                  </p>
                </div>
              )}
              {project.results && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-cream mb-4">Results</h3>
                  <p className="text-cream/90" data-testid="project-results">
                    {project.results}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Interactive Training Section */}
        {project.scormUrl && (
          <div className="border-t border-slate-200 pt-12 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-cream mb-4">Interactive Training Experience</h2>
              <p className="text-cream/90">Experience the actual learning content from this project</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center">
                <a
                  href={project.scormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block"
                >
                  <div className="relative bg-gray-600 rounded-full w-16 h-16 group-hover:scale-110 transition-all duration-300 shadow-2xl flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                </a>
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-cream font-bold text-2xl">Try Interactive Training</p>
                <p className="text-cream/80">Click the play button to experience the SCORM learning module</p>
                <div className="flex items-center justify-center gap-2 text-cream/70 text-sm mt-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Opens in new tab</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Projects */}
        <div className="border-t border-slate-200 pt-12">
          <h2 className="text-2xl font-bold text-cream mb-8 text-center">More Projects</h2>
          <div className="text-center">
            <Link href="/portfolio">
              <Button 
                variant="outline"
                className="border-lapis-lazuli text-lapis-lazuli hover:bg-lapis-lazuli hover:text-cream"
                data-testid="view-more-projects"
              >
                View All Projects
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
