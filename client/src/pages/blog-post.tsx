import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
// Type is now defined in server/storage.ts - using any for now
type BlogPost = any;
import MarkdownContent from "@/components/markdown-content";
import { formatDate } from "@/lib/date-utils";

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", id],
    queryFn: async () => {
      const res = await fetch(`/api/blog-posts/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch blog post');
      }
      return res.json();
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
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

  if (error || !post) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-brand-slate mb-4">
            Article Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Navigation */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8" data-testid="back-to-blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <Badge className="mb-4" data-testid="post-category">
            {post.category}
          </Badge>
          <h1
            className="text-4xl lg:text-5xl font-bold text-brand-slate mb-6"
            data-testid="post-title"
          >
            {post.title}
          </h1>
          <p
            className="text-xl text-slate-600 leading-relaxed mb-6"
            data-testid="post-excerpt"
          >
            {post.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex items-center text-slate-500 space-x-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span data-testid="post-date">
                {formatDate(post.createdAt)}
              </span>
            </div>
            {post.readTime && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span data-testid="post-read-time">{post.readTime}</span>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="mb-12">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              data-testid="post-image"
            />
          </div>
        )}

        {/* Article Content */}
        <article data-testid="post-content">
          <MarkdownContent content={post.content} />
        </article>

        {/* Article Footer */}
        <footer className="border-t border-slate-200 pt-12 mt-12">
          <div className="text-center">
            <h3 className="text-xl font-bold text-brand-slate mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-slate-600 mb-6">
              Check out more insights on instructional design and learning
              technology.
            </p>
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
                data-testid="more-articles-button"
              >
                Read More Articles
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
