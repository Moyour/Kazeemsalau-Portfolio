import { useState, useRef } from "react";

interface BlogImageUploadProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  className?: string;
}

export default function BlogImageUpload({ value, onChange, className = "" }: BlogImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = () => {
    setPreview(null);
    onChange('');
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
    setPreview(url || null);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Get auth token
      const token = localStorage.getItem('authToken');
      const headers: Record<string, string> = {};
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch('/api/upload/blog-image', {
        method: 'POST',
        headers,
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', response.status, errorText);
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();
      onChange(result.url);
      setPreview(result.url);
      
      // Return the URL for potential use in content
      return result.url;
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Failed to upload image: ${error.message || 'Please try again.'}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      
      {/* Drag and Drop Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-400 bg-blue-400/10' 
            : 'border-white/20 hover:border-white/40'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        {uploading ? (
          <div className="space-y-2">
            <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto"></div>
            <p className="text-white/80 text-sm">Uploading image...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-white/60">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-white/80 text-sm">
              <span className="font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-white/60 text-xs">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}
      </div>

      {/* Or use URL input */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-gray-900 text-white/60">OR</span>
        </div>
      </div>

      {/* URL Input */}
      <div className="space-y-3">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/60 text-sm"
          placeholder="Enter image URL or use upload above"
        />
        
        {/* Instructions */}
        <div className="bg-white/5 border border-white/20 rounded-lg p-3">
          <p className="text-white/80 text-xs mb-1">
            <strong>Alternative:</strong> Use existing images from <code className="bg-white/10 px-1 rounded">uploads/blog-images/</code>
          </p>
          <p className="text-white/60 text-xs">
            Example: <code className="bg-white/10 px-1 rounded">/uploads/blog-images/LTUK24.jpeg</code>
          </p>
        </div>
        
        {/* Image Preview */}
        {preview && (
          <div className="space-y-2">
            <div className="relative group">
              <img
                src={preview}
                alt="Blog preview"
                className="w-full h-48 object-cover rounded-lg border border-white/20"
                onError={() => {
                  // Hide preview if image fails to load
                  setPreview(null);
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
            
            {/* Markdown helper */}
            <div className="bg-white/5 border border-white/20 rounded-lg p-2">
              <p className="text-white/60 text-xs mb-1">Markdown for content:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white/10 px-2 py-1 rounded text-xs text-white/80 break-all">
                  ![](image alt text)
                </code>
                <button
                  type="button"
                  onClick={() => {
                    const markdown = `![](image alt text)`;
                    navigator.clipboard.writeText(markdown);
                    alert('Markdown copied to clipboard!');
                  }}
                  className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}