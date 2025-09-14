import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BlogCard from "@/components/blog-card";
// Type is now defined in server/storage.ts - using any for now
type BlogPost = any;
import testiImage from "../assets/Tes4.jpg";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: blogPosts = [], isLoading, error } = useQuery({
    queryKey: ["/api/blog-posts", searchTerm],
    queryFn: async () => {
      const url = new URL("/api/blog-posts", window.location.origin);
      if (searchTerm) {
        url.searchParams.set("search", searchTerm);
      }
      
      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      const data = await res.json();
      // Filter for published posts and ensure we always return an array
      const publishedPosts = Array.isArray(data) ? data.filter((post: any) => post.published) : [];
      return publishedPosts;
    },
  });

  // Server-side filtering is now handled in the API
  const filteredPosts = blogPosts;

  return (
    <div className="py-20 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Blog & Insights
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Thoughts on instructional design trends, learning technology, and creating effective educational experiences
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white" data-section="white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:ring-gray-400"
                data-testid="blog-search"
              />
            </div>
          </div>
          
          {/* Blog Posts List - Medium Style */}
          {error ? (
            <div className="text-center py-12">
              <p className="text-lg text-red-600">
                Unable to load blog posts. Please try again later.
              </p>
            </div>
          ) : isLoading ? (
            <div className="max-w-4xl mx-auto space-y-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="flex items-center gap-4">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="w-40 h-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                {searchTerm ? `No articles found matching "${searchTerm}".` : "No articles found."}
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-12">
              {filteredPosts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Results Count */}
          {!isLoading && blogPosts.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-500">
                {searchTerm 
                  ? `Showing ${filteredPosts.length} of ${blogPosts.length} articles matching "${searchTerm}"`
                  : `Showing ${filteredPosts.length} articles`
                }
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
