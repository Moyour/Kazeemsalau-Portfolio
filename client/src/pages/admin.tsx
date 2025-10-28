import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
// Types are now defined in server/storage.ts - using any for now
type Project = any;
type BlogPost = any;
type Testimonial = any;
type ContactSubmission = any;
type InsertProject = any;
type InsertBlogPost = any;
type InsertTestimonial = any;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogImageUpload from "@/components/BlogImageUpload";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Edit, Plus, Save, X, FileText, Users, Mail, FolderOpen, Eye, EyeOff, ImageIcon, Type, List, Quote, LogOut } from "lucide-react";
import MarkdownContent from "@/components/markdown-content";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/lib/date-utils";


export default function Admin() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("projects");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<InsertProject>({
    title: "",
    description: "",
    category: "E-Learning",
    tools: [],
    imageUrl: "",
    caseStudyUrl: "",
    scormUrl: "",
    demoUrl: "",
    featured: false,
    challenge: "",
    solution: "",
    process: "",
    results: "",
  });
  const [blogFormData, setBlogFormData] = useState<InsertBlogPost>({
    title: "",
    excerpt: "",
    content: "",
    category: "Instructional Design",
    imageUrl: "",
    readTime: "",
    published: false,
  });
  const [testimonialFormData, setTestimonialFormData] = useState<InsertTestimonial>({
    name: "",
    role: "",
    company: "",
    content: "",
    avatarUrl: "",
    rating: "5",
    featured: false,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Sample projects for when database is empty
  const sampleProjects: Project[] = [
    {
      id: "sample-1",
      title: "Emotional Intelligence",
      description: "This course focuses on developing emotional intelligence, helping learners understand, manage, and leverage their emotions effectively. It emphasizes the connection between emotional awareness and better decision-making, resilience under pressure, and achieving meaningful success beyond technical skills or knowledge.",
      longDescription: "This comprehensive course covers all aspects of emotional intelligence including self-awareness, self-regulation, motivation, empathy, and social skills. Participants will explore real-life scenarios that strengthen their ability to respond thoughtfully and confidently in both personal and professional contexts.",
      category: "corporate",
      tools: ["Articulate Storyline", "Adobe Creative Suite"],
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      caseStudyUrl: "",
      scormUrl: "https://codvacreatives.com/demo/ei/story_html5.html",
      demoUrl: "",
      featured: false,
      challenge: "Many individuals struggle to recognize and regulate their emotions, especially in high-pressure situations, which can lead to poor decisions, strained relationships, and missed opportunities.",
      solution: "The course offers practical strategies, tools, and exercises to enhance emotional intelligence through interactive scenarios, reflective exercises, and guided insights.",
      process: "Learners progress through structured modules that combine theory with practical application, including understanding emotions, practicing self-awareness, and engaging in scenario-based exercises.",
      results: "Participants gain heightened emotional awareness, improved decision-making skills, and the ability to manage stress and interpersonal dynamics effectively.",
      createdAt: new Date().toISOString()
    },
    {
      id: "sample-2", 
      title: "The Fixer",
      description: "This training is designed as a special assignment where you step into the role of 'The Fixer,' tasked with addressing critical knowledge gaps in agency policy. Through immersive, scenario-based learning, you will sharpen decision-making skills, collaborate with colleagues, and apply policy knowledge to restore service delivery and boost organizational performance.",
      longDescription: "An interactive problem-solving course that puts you in the role of the key problem solver, leveraging your insight, professionalism, and decision-making ability to close policy gaps and rebuild confidence in agency operations.",
      category: "elearning",
      tools: ["Storyline", "Illustration", "Scenario Design"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      caseStudyUrl: "",
      scormUrl: "https://codvacreatives.com/demo/fixer/story_html5.html",
      demoUrl: "",
      featured: false,
      challenge: "Despite strong skills and reputation for excellence, recent downturns in service delivery have revealed significant policy knowledge gaps within the agency.",
      solution: "The program positions you as the key problem solver, leveraging your insight and decision-making ability to close policy gaps through practical tasks and collaboration exercises.",
      process: "Participants are guided through real-world challenges simulating agency operations, with each scenario demanding careful application of policy knowledge and strategic thinking.",
      results: "By completing the assignment, you reinforce your reputation as 'The Fixer' while the agency benefits from improved service delivery and stronger compliance.",
      createdAt: new Date().toISOString()
    },
    {
      id: "sample-3",
      title: "Business Writing", 
      description: "Strong business writing is more than putting words on a page — it's about influencing decisions, building credibility, and communicating with clarity. This course is designed to help professionals at all levels master the fundamentals of business writing, from crafting concise emails to developing persuasive reports.",
      longDescription: "A comprehensive course covering all aspects of professional business communication, from emails to reports, proposals, and executive summaries. You'll learn techniques for editing and refining your drafts to eliminate errors and enhance professionalism.",
      category: "corporate",
      tools: ["Articulate Storyline", "Content Design"],
      imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
      caseStudyUrl: "",
      scormUrl: "https://codvacreatives.com/demo/Businesswriting/story_html5.html",
      demoUrl: "",
      featured: true,
      challenge: "In today's fast-paced business environment, unclear or poorly written communication can cause misunderstandings, delays, and even damage professional relationships.",
      solution: "Our Business Writing course equips you with the tools and strategies to overcome these challenges, teaching you how to plan, structure, and refine your writing for maximum impact.",
      process: "This course takes you through a step-by-step journey to transform your writing, beginning with the foundations of effective communication and progressing to persuasive writing strategies.",
      results: "By the end of the course, you'll be able to write with confidence and precision in any business setting, projecting greater professionalism and enhancing your credibility.",
      createdAt: new Date().toISOString()
    }
  ];

  // Use sample projects if database is empty
  const displayProjects = projects.length > 0 ? projects : sampleProjects;

  
  const { data: blogPosts = [], isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
  
  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  const { data: contacts = [], isLoading: contactsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contacts"],
  });


  const createProjectMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      return await apiRequest("POST", "/api/projects", data);
    },
    onSuccess: () => {
      toast({ title: "Project created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      resetProjectForm();
    },
    onError: (error) => {
      toast({ title: "Error creating project", description: error.message, variant: "destructive" });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProject> }) => {
      return await apiRequest("PUT", `/api/projects/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Project updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      resetProjectForm();
    },
    onError: (error) => {
      toast({ title: "Error updating project", description: error.message, variant: "destructive" });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Project deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: (error) => {
      toast({ title: "Error deleting project", description: error.message, variant: "destructive" });
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      return await apiRequest("POST", "/api/blog-posts", data);
    },
    onSuccess: () => {
      toast({ title: "Blog post created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      resetBlogForm();
    },
    onError: (error) => {
      toast({ title: "Error creating blog post", description: error.message, variant: "destructive" });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertBlogPost> }) => {
      return await apiRequest("PUT", `/api/blog-posts/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Blog post updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      resetBlogForm();
    },
    onError: (error) => {
      toast({ title: "Error updating blog post", description: error.message, variant: "destructive" });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/blog-posts/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Blog post deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
    },
    onError: (error) => {
      toast({ title: "Error deleting blog post", description: error.message, variant: "destructive" });
    },
  });

  const createTestimonialMutation = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      return await apiRequest("POST", "/api/testimonials", data);
    },
    onSuccess: () => {
      toast({ title: "Testimonial created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      resetTestimonialForm();
    },
    onError: (error) => {
      toast({ title: "Error creating testimonial", description: error.message, variant: "destructive" });
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/testimonials/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Testimonial deleted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: (error) => {
      toast({ title: "Error deleting testimonial", description: error.message, variant: "destructive" });
    },
  });

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data: formData });
    } else {
      createProjectMutation.mutate(formData);
    }
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlogPost) {
      updateBlogMutation.mutate({ id: editingBlogPost.id, data: blogFormData });
    } else {
      createBlogMutation.mutate(blogFormData);
    }
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTestimonialMutation.mutate(testimonialFormData);
  };

  const resetProjectForm = () => {
    setEditingProject(null);
    setShowForm(false);
    setFormData({
      title: "",
      description: "",
      category: "E-Learning",
      tools: [],
      imageUrl: "",
      caseStudyUrl: "",
      scormUrl: "",
      demoUrl: "",
      featured: false,
      challenge: "",
      solution: "",
      process: "",
      results: "",
    });
  };

  const resetBlogForm = () => {
    setEditingBlogPost(null);
    setShowForm(false);
    setBlogFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Instructional Design",
      imageUrl: "",
      readTime: "",
      published: false,
    });
  };

  const resetTestimonialForm = () => {
    setEditingTestimonial(null);
    setShowForm(false);
    setTestimonialFormData({
      name: "",
      role: "",
      company: "",
      content: "",
      avatarUrl: "",
      rating: "5",
      featured: false,
    });
  };

  const startProjectEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
    setFormData({ ...project });
  };

  const startBlogEdit = (post: BlogPost) => {
    setEditingBlogPost(post);
    setShowForm(true);
    setBlogFormData({ ...post });
  };


  const isLoading = projectsLoading || blogLoading || testimonialsLoading || contactsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-teal-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Website Admin</h1>
              <p className="text-white/80">Complete content management system for your portfolio</p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-red-500/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="h-10 items-center justify-center rounded-md p-1 grid w-full grid-cols-5 bg-white/10 backdrop-blur-md border-white/20 text-[#ffffff]">
              <TabsTrigger value="projects" className="data-[state=active]:bg-white/20">
                <FolderOpen className="w-4 h-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="blog" className="data-[state=active]:bg-white/20 text-[#ffffff]">
                <FileText className="w-4 h-4 mr-2" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="data-[state=active]:bg-white/20">
                <Users className="w-4 h-4 mr-2" />
                Testimonials
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-white/20">
                <Mail className="w-4 h-4 mr-2" />
                Contact Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Projects Management</h2>
                <Button
                  onClick={() => {setShowForm(true); setActiveTab("projects")}}
                  className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600"
                  data-testid="button-add-project"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              {showForm && activeTab === "projects" && (
                <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {editingProject ? 'Edit Project' : 'Add New Project'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProjectSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white text-sm font-medium">Title</label>
                        <Input 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          data-testid="input-title"
                        />
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium">Category</label>
                        <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white mt-2" data-testid="select-category">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="elearning">E-Learning</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                            <SelectItem value="assessment">Assessment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium">Description</label>
                      <Textarea 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                        rows={4}
                        data-testid="textarea-description"
                      />
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium">Tools (comma-separated)</label>
                      <Input 
                        value={formData.tools?.join(', ') || ''}
                        onChange={(e) => setFormData({...formData, tools: e.target.value.split(',').map(t => t.trim()).filter(Boolean)})}
                        placeholder="Storyline 360, Adobe XD, React"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                        data-testid="input-tools"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white text-sm font-medium">Image URL</label>
                        <Input 
                          value={formData.imageUrl || ''}
                          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          data-testid="input-image-url"
                        />
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium">SCORM URL</label>
                        <Input 
                          value={formData.scormUrl || ''}
                          onChange={(e) => setFormData({...formData, scormUrl: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          data-testid="input-scorm-url"
                        />
                      </div>
                    </div>

                    {/* Project Detail Page Sections */}
                    <div className="space-y-4 border-t border-white/20 pt-6">
                      <h3 className="text-white text-lg font-semibold mb-4">Project Detail Page Content</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white text-sm font-medium">Challenge</label>
                          <Textarea 
                            value={formData.challenge || ''}
                            onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                            rows={4}
                            placeholder="Describe the challenge this project addressed..."
                            data-testid="textarea-challenge"
                          />
                        </div>

                        <div>
                          <label className="text-white text-sm font-medium">Solution</label>
                          <Textarea 
                            value={formData.solution || ''}
                            onChange={(e) => setFormData({...formData, solution: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                            rows={4}
                            placeholder="Explain the solution you implemented..."
                            data-testid="textarea-solution"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white text-sm font-medium">Process</label>
                          <Textarea 
                            value={formData.process || ''}
                            onChange={(e) => setFormData({...formData, process: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                            rows={4}
                            placeholder="Describe your design and development process..."
                            data-testid="textarea-process"
                          />
                        </div>

                        <div>
                          <label className="text-white text-sm font-medium">Results</label>
                          <Textarea 
                            value={formData.results || ''}
                            onChange={(e) => setFormData({...formData, results: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                            rows={4}
                            placeholder="Share the outcomes and impact..."
                            data-testid="textarea-results"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-between rounded-lg border border-white/20 p-4">
                      <div className="space-y-0.5">
                        <label className="text-white text-sm font-medium">Featured Project</label>
                        <div className="text-sm text-white/60">
                          Display this project prominently on the homepage
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        className="h-4 w-4"
                        data-testid="switch-featured"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                        className="bg-teal-dark hover:bg-teal-medium text-white"
                        data-testid="button-save"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {editingProject ? 'Update' : 'Create'} Project
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetProjectForm}
                        className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-red-500/5"
                        data-testid="button-cancel"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6">
                {displayProjects.length === 0 ? (
                  <Card className="bg-yellow-500/10 backdrop-blur-md border-yellow-500/20">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FolderOpen className="w-8 h-8 text-yellow-300" />
                      </div>
                      <h3 className="text-xl font-bold text-yellow-200 mb-2">No Projects Found</h3>
                      <p className="text-yellow-100/80 mb-4">
                        Your admin panel is empty because Railway's add endpoints are not working properly.
                      </p>
                      <div className="space-y-2 text-sm text-yellow-100/70">
                        <p><strong>Quick Fix:</strong> Add projects manually using the form above</p>
                        <p><strong>Alternative:</strong> Contact Railway support about the add-project endpoint</p>
                        <p><strong>Note:</strong> This is a known issue with Railway deployment</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  displayProjects.map((project) => (
                  <Card key={project.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                            {project.featured && (
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline" className="border-white/30 text-white/80">
                              {project.category}
                            </Badge>
                          </div>
                          <p className="text-white/80 mb-3">{project.description}</p>
                          {project.tools && project.tools.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.tools.map((tool: string, index: number) => (
                                <Badge key={index} variant="secondary" className="bg-white/10 text-white/90">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {project.scormUrl && (
                            <Badge className="bg-teal-dark/20 text-teal-light border-teal-dark/30">
                              Interactive Training Available
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startProjectEdit(project)}
                            className="border-blue-500/20 text-blue-300 hover:bg-blue-500/10 bg-blue-500/5"
                            data-testid={`button-edit-${project.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteProjectMutation.mutate(project.id)}
                            className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-red-500/5"
                            data-testid={`button-delete-${project.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="blog" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Blog Posts Management</h2>
                <Button
                  onClick={() => {setShowForm(true); setActiveTab("blog")}}
                  className="bg-teal-dark hover:bg-teal-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Blog Post
                </Button>
              </div>

              {showForm && activeTab === "blog" && (
                <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {editingBlogPost ? 'Edit Blog Post' : 'Add New Blog Post'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBlogSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white text-sm font-medium">Title</label>
                          <Input 
                            value={blogFormData.title}
                            onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Category</label>
                          <Select value={blogFormData.category} onValueChange={(value) => setBlogFormData({...blogFormData, category: value})}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Instructional Design">Instructional Design</SelectItem>
                              <SelectItem value="E-Learning">E-Learning</SelectItem>
                              <SelectItem value="Book Review">Book Review</SelectItem>
                              <SelectItem value="Personal-Development">Personal Development</SelectItem>
                              <SelectItem value="Case-Study">Case Study</SelectItem>
                              <SelectItem value="Learning Technology">Learning Technology</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-white text-sm font-medium">Excerpt</label>
                        <Textarea 
                          value={blogFormData.excerpt}
                          onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-white text-sm font-medium">Content (Markdown supported)</label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowPreview(!showPreview)}
                            className="border-teal-dark/30 text-teal-light hover:bg-teal-dark/10 bg-teal-dark/5"
                          >
                            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                            {showPreview ? 'Hide Preview' : 'Show Preview'}
                          </Button>
                        </div>

                        {/* Formatting Toolbar */}
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-2">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const textarea = document.querySelector('textarea[placeholder*="Write your blog content"]') as HTMLTextAreaElement;
                                if (textarea) {
                                  const start = textarea.selectionStart;
                                  const end = textarea.selectionEnd;
                                  const text = textarea.value;
                                  const newText = text.substring(0, start) + '![Image description](https://your-image-url.com/image.jpg)\n\n' + text.substring(end);
                                  setBlogFormData({...blogFormData, content: newText});
                                }
                              }}
                              className="text-blue-300 hover:bg-blue-500/10 h-8 border border-blue-500/20"
                            >
                              <ImageIcon className="w-4 h-4 mr-1" />
                              Image
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const textarea = document.querySelector('textarea[placeholder*="Write your blog content"]') as HTMLTextAreaElement;
                                if (textarea) {
                                  const start = textarea.selectionStart;
                                  const end = textarea.selectionEnd;
                                  const text = textarea.value;
                                  const newText = text.substring(0, start) + '## ' + text.substring(end);
                                  setBlogFormData({...blogFormData, content: newText});
                                }
                              }}
                              className="text-blue-300 hover:bg-blue-500/10 h-8 border border-blue-500/20"
                            >
                              <Type className="w-4 h-4 mr-1" />
                              Heading
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const textarea = document.querySelector('textarea[placeholder*="Write your blog content"]') as HTMLTextAreaElement;
                                if (textarea) {
                                  const start = textarea.selectionStart;
                                  const end = textarea.selectionEnd;
                                  const text = textarea.value;
                                  const newText = text.substring(0, start) + '- List item\n- List item\n' + text.substring(end);
                                  setBlogFormData({...blogFormData, content: newText});
                                }
                              }}
                              className="text-blue-300 hover:bg-blue-500/10 h-8 border border-blue-500/20"
                            >
                              <List className="w-4 h-4 mr-1" />
                              List
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const textarea = document.querySelector('textarea[placeholder*="Write your blog content"]') as HTMLTextAreaElement;
                                if (textarea) {
                                  const start = textarea.selectionStart;
                                  const end = textarea.selectionEnd;
                                  const text = textarea.value;
                                  const newText = text.substring(0, start) + '> Your quote here\n\n' + text.substring(end);
                                  setBlogFormData({...blogFormData, content: newText});
                                }
                              }}
                              className="text-blue-300 hover:bg-blue-500/10 h-8 border border-blue-500/20"
                            >
                              <Quote className="w-4 h-4 mr-1" />
                              Quote
                            </Button>
                          </div>
                          <div className="text-xs text-white/70 space-y-1">
                            <p><strong>Quick reference:</strong></p>
                            <p>**Bold** | *Italic* | [Link](url) | ![Image](url) | ## Heading | &gt; Quote</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {/* Editor */}
                          <div className={showPreview ? "lg:grid lg:grid-cols-2 lg:gap-4" : ""}>
                            <div>
                              <Textarea 
                                value={blogFormData.content}
                                onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                                placeholder="Write your blog content here using Markdown formatting..."
                                rows={showPreview ? 20 : 12}
                              />
                            </div>
                            
                            {/* Preview */}
                            {showPreview && (
                              <div className="bg-white rounded-lg p-6 max-h-96 overflow-y-auto">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Preview</h4>
                                <MarkdownContent content={blogFormData.content || "Start typing to see preview..."} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <BlogImageUpload
                          value={blogFormData.imageUrl}
                          onChange={(imageUrl) => setBlogFormData({...blogFormData, imageUrl})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white text-sm font-medium">Read Time</label>
                          <Input 
                            value={blogFormData.readTime || ''}
                            onChange={(e) => setBlogFormData({...blogFormData, readTime: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                            placeholder="e.g., 5 min read"
                          />
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-between rounded-lg border border-white/20 p-4">
                        <div className="space-y-0.5">
                          <label className="text-white text-sm font-medium">Publish Blog Post</label>
                          <div className="text-sm text-white/60">
                            Make this blog post visible on the blog page
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={blogFormData.published || false}
                          onChange={(e) => setBlogFormData({...blogFormData, published: e.target.checked})}
                          className="h-4 w-4"
                          data-testid="switch-published"
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-600 hover:to-purple-600 text-white">
                          <Save className="w-4 h-4 mr-2" />
                          {editingBlogPost ? 'Publish' : 'Create'} Blog Post
                        </Button>
                        <Button type="button" variant="outline" onClick={resetBlogForm} className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-red-500/5">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6">
                {blogLoading ? (
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-12 text-center">
                      <div className="text-white">Loading blog posts...</div>
                    </CardContent>
                  </Card>
                ) : blogPosts.length === 0 ? (
                  <Card className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-12 text-center">
                      <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">No blog posts yet</h3>
                      <p className="text-white/60 mb-4">Create your first blog post to get started</p>
                      <Button
                        onClick={() => {setShowForm(true); setActiveTab("blog")}}
                        className="bg-teal-dark hover:bg-teal-medium"
                        data-testid="button-create-first-blog"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create First Blog Post
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  blogPosts.map((post) => (
                    <Card key={post.id} className="bg-white/10 backdrop-blur-md border-white/20">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">{post.title}</h3>
                              <Badge variant="outline" className="border-white/30 text-white/80">
                                {post.category}
                              </Badge>
                              {post.published && (
                                <Badge className="bg-teal-dark/20 text-teal-light border-teal-dark/30">
                                  Published
                                </Badge>
                              )}
                            </div>
                            <p className="text-white/80 mb-3">{post.excerpt || "No excerpt provided"}</p>
                            <p className="text-white/60 text-sm">
                              Created: {formatDate(post.createdAt)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startBlogEdit(post)}
                              className="border-blue-500/20 text-blue-300 hover:bg-blue-500/10 bg-blue-500/5"
                              data-testid={`button-edit-blog-${post.id}`}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteBlogMutation.mutate(post.id)}
                              className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-red-500/5"
                              data-testid={`button-delete-blog-${post.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Testimonials Management</h2>
                <Button
                  onClick={() => {setShowForm(true); setActiveTab("testimonials")}}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </div>

              {showForm && activeTab === "testimonials" && (
                <Card className="mb-8 bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Add New Testimonial</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-white text-sm font-medium">Name</label>
                          <Input 
                            value={testimonialFormData.name}
                            onChange={(e) => setTestimonialFormData({...testimonialFormData, name: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          />
                        </div>
                        <div>
                          <label className="text-white text-sm font-medium">Role</label>
                          <Input 
                            value={testimonialFormData.role}
                            onChange={(e) => setTestimonialFormData({...testimonialFormData, role: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium">Company</label>
                        <Input 
                          value={testimonialFormData.company}
                          onChange={(e) => setTestimonialFormData({...testimonialFormData, company: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white text-sm font-medium">Testimonial Content</label>
                        <Textarea 
                          value={testimonialFormData.content}
                          onChange={(e) => setTestimonialFormData({...testimonialFormData, content: e.target.value})}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 mt-2"
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-600 hover:to-purple-600 text-white">
                          <Save className="w-4 h-4 mr-2" />
                          Create Testimonial
                        </Button>
                        <Button type="button" variant="outline" onClick={resetTestimonialForm} className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-red-500/5">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                            <Badge variant="outline" className="border-white/30 text-white/80">
                              {testimonial.role} at {testimonial.company}
                            </Badge>
                            {testimonial.featured && (
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <p className="text-white/80">{testimonial.content}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteTestimonialMutation.mutate(testimonial.id)}
                            className="border-red-500/20 text-red-300 hover:bg-red-500/10 bg-red-500/5"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>


            <TabsContent value="contacts" className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
              
              <div className="grid gap-6">
                {contacts.map((contact) => (
                  <Card key={contact.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{contact.firstName} {contact.lastName}</h3>
                            <Badge variant="outline" className="border-white/30 text-white/80">
                              {contact.email}
                            </Badge>
                            {contact.company && (
                              <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                                {contact.company}
                              </Badge>
                            )}
                          </div>
                          <p className="text-white/80 mb-3">{contact.message}</p>
                          <p className="text-white/60 text-sm">
                            Received: {formatDate(contact.createdAt)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}