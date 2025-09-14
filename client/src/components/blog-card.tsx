import { Link } from "wouter";
import { BlogPost } from "@shared/schema";
import { Clock, MessageCircle, Star } from "lucide-react";
import { formatShortDate } from "@/lib/date-utils";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Mock author data - in a real app this would come from the post data
  const author = {
    name: "Kazeem Salau",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=32&h=32",
    verified: true
  };

  // Mock engagement data
  const engagement = {
    claps: Math.floor(Math.random() * 1000) + 100,
    comments: Math.floor(Math.random() * 50) + 5,
    readTime: post.readTime || `${Math.floor(Math.random() * 10) + 3} min read`
  };

  return (
    <article className="group border-b border-gray-200 pb-8 last:border-b-0" data-testid={`blog-card-${post.id}`}>
      <div className="flex items-start gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-3">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 font-medium">{author.name}</span>
            {author.verified && (
              <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
            <Link 
              href={`/blog/${post.id}`}
              data-testid={`blog-title-${post.id}`}
              className="hover:underline"
            >
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 text-lg leading-relaxed line-clamp-2" data-testid={`blog-excerpt-${post.id}`}>
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-1 text-gray-500">
              <Star className="w-4 h-4" />
              <span className="text-sm">{formatShortDate(post.createdAt)}</span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="text-sm font-medium text-gray-700">{post.category || 'Design'}</span>
              <span className="text-gray-400 mx-2">•</span>
              <Clock className="w-4 h-4" />
              <span className="text-sm">{engagement.readTime}</span>
            </div>
          </div>
        </div>

        {/* Optional Image */}
        {post.imageUrl && (
          <div className="flex-shrink-0">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-40 h-32 object-cover rounded-lg"
              data-testid={`blog-image-${post.id}`}
            />
          </div>
        )}
      </div>
    </article>
  );
}
