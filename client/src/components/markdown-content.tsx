import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[]}
        rehypePlugins={[]}
        skipHtml={false}
        components={{
          // Customize heading styles
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-5">{children}</h3>
          ),
          
          // Customize paragraph styles
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">{children}</p>
          ),
          
          // Customize image styles
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt || ''}
              className="w-full max-w-4xl mx-auto rounded-lg shadow-md my-8 block"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                console.error('Failed to load image:', src);
              }}
            />
          ),
          
          // Customize list styles
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-lg leading-relaxed">{children}</li>
          ),
          
          // Customize blockquote styles
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-purple-500 pl-6 my-6 italic text-gray-700 bg-gray-50 py-4 rounded-r-lg">
              {children}
            </blockquote>
          ),
          
          // Customize code styles
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4">
                <code className="text-sm">{children}</code>
              </pre>
            );
          },
          
          // Customize link styles
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-purple-600 hover:text-purple-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          
          // Add horizontal rule styling
          hr: () => (
            <hr className="my-8 border-t border-gray-300" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}