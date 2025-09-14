import * as React from "react";
import { Download, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resume() {
  return (
    <div className="py-20 bg-gradient-to-br from-indigo-900 via-purple-600 via-pink-500 to-amber-400 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Resume
          </h1>
          <p className="text-xl text-white/90 leading-relaxed mb-8">
            Experienced Instructional Designer & Learning Experience Designer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/Kazeem_Salau_Resume.pdf" download>
              <Button
                className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                data-testid="download-resume"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Contact Information */}
          <div className="mb-12 p-8 bg-gray-50 rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Kazeem Salau</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-600">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-600" />
                <span>kazeem.salau@email.com</span>
              </div>
              <div className="flex ITEMS-center gap-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-600" />
                <span>kzeemsalau.com</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              I build learning that truly changes how people work.

              I have designed a wide range of training programs used across industries like sales, insurance, healthcare, and telecommunications. These programs have reached large audiences and delivered meaningful impact. Whether delivered in a blended format or as self paced learning, I create experiences that are practical, engaging, and aligned with business goals.

              I work closely with subject matter experts and business partners to ensure every course is relevant, clear, and focused on results.

              I bring complex ideas to life through interactive and user friendly design. My focus is always on helping people grow and supporting organizations through thoughtful and effective learning.
            </p>
          </div>

          {/* Core Competencies */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Core Competencies
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Design & Development</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Instructional Design (ADDIE, SAM)</li>
                  <li>• Learning Experience Design</li>
                  <li>• Curriculum Development</li>
                  <li>• Assessment Design</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Technology & Tools</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Articulate Storyline 360</li>
                  <li>• Adobe Creative Suite</li>
                  <li>• Camtasia</li>
                  <li>• Colossyan</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Research & Analysis</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Learning Analytics</li>
                  <li>• User Experience Research</li>
                  <li>• Performance Analysis</li>
                  <li>• Needs Assessment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Professional Experience
            </h3>
            <div className="space-y-8">
              {/* Job 1 */}
              <div className="border-l-4 border-purple-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-900">Instructional Designer/Operations Specialist</h4>
                  <span className="text-gray-500 font-medium">2022 - Present</span>
                </div>
                <p className="text-purple-600 font-medium mb-3">TM Forum | UK</p>
              
              </div>

              {/* Job 2 */}
              <div className="border-l-4 border-purple-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-900">Learning Manager</h4>
                  <span className="text-gray-500 font-medium">2019 - 2022</span>
                </div>
                <p className="text-purple-600 font-medium mb-3">Leadway Assurance | NIG</p>
                
              </div>

              {/* Job 3 */}
              <div className="border-l-4 border-purple-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-900">Learning Experience Designer</h4>
                  <span className="text-gray-500 font-medium">2017 - 2019</span>
                </div>
                <p className="text-purple-600 font-medium mb-3">Leadway Assurance | NIG</p>
                
              </div>

              
               {/* Job 3 */}
                <div className="border-l-4 border-purple-200 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h4 className="text-xl font-semibold text-gray-900">Instructional Designer </h4>
                    <span className="text-gray-500 font-medium">2017 - 2017</span>
                  </div>
                  <p className="text-purple-600 font-medium mb-3">Kotivu.NG | NIG</p>
                  
                </div>

              {/* Job 3 */}
              <div className="border-l-4 border-purple-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-900">Instructional Designer </h4>
                  <span className="text-gray-500 font-medium">2016 - 2016</span>
                </div>
                <p className="text-purple-600 font-medium mb-3">WorkforceGroup | NIG</p>

              </div>

              <div className="border-l-4 border-purple-200 pl-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-semibold text-gray-900">Graphic Designer </h4>
                  <span className="text-gray-500 font-medium">2014 - 2016</span>
                </div>
                <p className="text-purple-600 font-medium mb-3">WorkforceGroup | NIG</p>

              </div>
            </div>
            
          </div>

          

          {/* Education */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Education
            </h3>
            <div className="space-y-6">
              
              <div className="border-l-4 border-purple-200 pl-6">
                <h4 className="text-xl font-semibold text-gray-900">Bachelor of Science (B.S.)</h4>
                <p className="text-purple-600 font-medium">Computer Science </p>
               
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Education
            </h3>
            <div className="space-y-6">

              <div className="border-l-4 border-purple-200 pl-6">
                <h4 className="text-xl font-semibold text-gray-900">Professional Certificate in Instructional Design</h4>
                <p className="text-purple-600 font-medium">Digital Learning Institute </p>

              </div>

              
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-purple-200 pb-2">
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-purple-200 pl-6">
                <h4 className="text-xl font-semibold text-gray-900">Professional Certificate in Instructional Design</h4>
                <p className="text-purple-600 font-medium">Computer Science </p>

              </div>

              
              
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Professional Certifications</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional Certificate in Instructional Design</li>
                  <li>• User Experience: The Beginner's Guide (IxDF)</li>
                  <li>• The Complete Agile & Scrum Project Management Course (Udemy)</li>
                
                </ul>
              </div>
              <div>
                 <h4 className="font-semibold text-gray-800 mb-3">Professional Certifications</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Digital HR Strategy (AIHR)</li>
                  <li>• Project         Management Fundamentals (Udemy)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}