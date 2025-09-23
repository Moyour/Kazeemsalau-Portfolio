import { useState } from "react";
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResumeUploaderProps {
  onUploadComplete: (parsedData: any) => void;
}

export function ResumeUploader({ onUploadComplete }: ResumeUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus('error');
      setStatusMessage('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus('error');
      setStatusMessage('File size must be less than 5MB.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/resumes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to parse resume');
      }

      const parsedData = await response.json();
      setUploadStatus('success');
      setStatusMessage('Resume parsed successfully!');
      onUploadComplete(parsedData);
      
    } catch (error) {
      setUploadStatus('error');
      setStatusMessage('Failed to parse resume. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${dragOver ? 'border-purple-400 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        <div className="flex flex-col items-center space-y-4">
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="text-gray-600">Parsing your resume...</p>
            </>
          ) : (
            <>
              <FileText className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Upload Your Resume
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Drop your resume here or click to browse
                </p>
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                />
                <Button
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  disabled={isUploading}
                >
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </label>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {uploadStatus !== 'idle' && (
        <Alert className={`mt-4 ${uploadStatus === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          {uploadStatus === 'success' ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={uploadStatus === 'success' ? 'text-green-800' : 'text-red-800'}>
            {statusMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <p>Supported formats: PDF, DOC, DOCX, TXT</p>
        <p>Maximum file size: 5MB</p>
      </div>
    </div>
  );
}