import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Download, Play, Monitor, Sparkles, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@shared/schema";
import { useState } from "react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [showScormEmbed, setShowScormEmbed] = useState(false);
  
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
          <h1 className="text-2xl font-bold text-brand-slate mb-4">Project Not Found</h1>
          <p className="text-slate-600 mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/portfolio">
            <Button>Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
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
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-slate mb-6" data-testid="project-title">
            {project.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-6" data-testid="project-description">
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
                className="bg-brand-purple hover:bg-purple-600"
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
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200">
              {project.imageUrl ? (
                <img 
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-2xl"
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
          <h2 className="text-2xl font-bold text-brand-slate mb-4">Project Overview</h2>
          <p className="text-slate-600 leading-relaxed mb-8" data-testid="project-long-description">
            {project.longDescription || project.description}
          </p>

          {/* Project Sections */}
          {(project.challenge || project.solution || project.process || project.results) && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {project.challenge && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-brand-slate mb-4">Challenge</h3>
                  <p className="text-slate-600" data-testid="project-challenge">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-brand-slate mb-4">Solution</h3>
                  <p className="text-slate-600" data-testid="project-solution">
                    {project.solution}
                  </p>
                </div>
              )}
              {project.process && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-brand-slate mb-4">Process</h3>
                  <p className="text-slate-600" data-testid="project-process">
                    {project.process}
                  </p>
                </div>
              )}
              {project.results && (
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-brand-slate mb-4">Results</h3>
                  <p className="text-slate-600" data-testid="project-results">
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
              <h2 className="text-2xl font-bold text-brand-slate mb-4">Interactive Training Experience</h2>
              <p className="text-slate-600">Experience the actual learning content from this project</p>
            </div>
            
            {showScormEmbed ? (
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-lg overflow-hidden border border-slate-300">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 rounded-lg p-2">
                        <Monitor className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Interactive Training Module</h3>
                        <p className="text-white/80 text-sm">Experience the actual learning content</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setShowScormEmbed(false)}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
                <div className="relative bg-white aspect-video">
                  <iframe
                    src={project.scormUrl}
                    title={`${project.title} - Interactive Training`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    data-testid="scorm-iframe"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-white">
                    Interactive content by {project.title}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-block">
                  <button
                    onClick={() => setShowScormEmbed(true)}
                    className="group relative"
                  >
                    <div className="absolute -inset-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-8 group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <PlayCircle className="w-20 h-20 text-white" />
                    </div>
                  </button>
                  <div className="mt-6 space-y-2">
                    <p className="text-slate-600 font-bold text-2xl">Try Interactive Training</p>
                    <p className="text-slate-500">Click the play button to experience the learning module</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Related Projects */}
        <div className="border-t border-slate-200 pt-12">
          <h2 className="text-2xl font-bold text-brand-slate mb-8 text-center">More Projects</h2>
          <div className="text-center">
            <Link href="/portfolio">
              <Button 
                variant="outline"
                className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
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
