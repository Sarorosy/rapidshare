import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  FileCheck2,
} from "lucide-react";


const faqs = [
  {
    question: "What file formats do you accept?",
    answer:
      "We accept a wide variety of file formats including PDF, DOCX, XLSX, PPTX, TXT, RTF, and common image formats (JPG, PNG, GIF). If you have a different format, please contact us to verify compatibility.",
  },
  {
    question: "What is the maximum file size limit?",
    answer:
      "The maximum file size limit is 100MB per file. For larger files, we recommend compressing them or splitting into smaller sections. Contact us if you need assistance with large files.",
  },
  {
    question: "How secure is my uploaded data?",
    answer:
      "Your files are protected with enterprise-grade encryption during upload and storage. Only authorized experts assigned to your project can access your files. We never share your data with third parties without explicit consent.",
  },
  {
    question: "Can I delete my files after uploading?",
    answer:
      "Yes, you can delete your files anytime from your dashboard. You can also modify access duration or update file permissions. Once deleted, files are permanently removed from our servers within 24 hours.",
  },
  {
    question: "How long does it take to receive feedback?",
    answer:
      "Initial feedback typically arrives within 24-48 hours for most documents. Complex research papers or lengthy documents may take 3-5 days. You'll receive email notifications when feedback is ready.",
  },
  {
    question: "What if I need to upload multiple files?",
    answer:
      "You can upload multiple files for the same project. Each file can be assigned the same access duration and will be reviewed as part of your complete submission. Consider organizing related files in folders before uploading.",
  },
  {
    question: "Do you provide plagiarism checking?",
    answer:
      "Yes, we include plagiarism checking as part of our review process. We use industry-standard tools to ensure originality and provide detailed reports highlighting any potential issues with proper citation recommendations.",
  },
  {
    question: "What happens if my file access expires?",
    answer:
      "When file access expires, the file becomes inaccessible to our experts but remains in your dashboard for 7 additional days. You can extend access duration or download the file during this grace period. After that, files are permanently deleted.",
  },
];

const FileUploadInfo = ({ setReadInfo }) => {
   const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const bottomRef = useRef(null);

  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsAtBottom(entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );

    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, []);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Why We Need Your Files Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl  p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We Need Your Files</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Understanding your work thoroughly allows us to provide the most effective and personalized assistance for your academic journey.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Assistance</h3>
                <p className="text-gray-600">Helps our team understand your work thoroughly to provide tailored guidance.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <FileCheck2 className="text-purple-600 w-6 h-6 " />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Feedback & Support</h3>
                <p className="text-gray-600">Enables precise suggestions, corrections, and improvements without compromising originality.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Streamlined Collaboration</h3>
                <p className="text-gray-600">Collaborate with multiple experts without unnecessary back-and-forth, saving time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl  p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Upload Platform</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Follow these simple steps to securely upload your files and get started with our expert assistance.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Your File</h3>
                <p className="text-sm text-gray-600">Choose your documents (PDF, DOCX, XLSX, PPTX, images, etc).</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Edit File Name</h3>
                <p className="text-sm text-gray-600">Rename your file if needed before uploading (Optional).</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Access Duration</h3>
                <p className="text-sm text-gray-600">Choose how long the file will be accessible (7, 15, 30, or 60 days).</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Securely</h3>
                <p className="text-sm text-gray-600">Click 'Upload' to send files encrypted for your protection.</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                  <span className="text-red-600 font-bold">5</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Later</h3>
                <p className="text-sm text-gray-600">You can update access duration or delete files anytime from your dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>
              <p className=" max-w-2xl mx-auto">Your data security and privacy are our top priorities. We implement industry-leading protection measures.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Confidentiality Guaranteed</h3>
                <p className="">Only authorized experts can access your files.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Encrypted Storage</h3>
                <p className="">Advanced encryption ensures complete safety.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Limited Access</h3>
                <p className="">Files are never shared without consent.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms of Use Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl  p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Use</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Please review these important guidelines to ensure the best experience and maintain academic integrity.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Research & Thesis Assistance</h3>
                  <p className="text-gray-600">Files are accessed only for research and thesis assistance.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Originality Required</h3>
                  <p className="text-gray-600">Files must be original or properly cited; plagiarism is prohibited.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Backups Recommended</h3>
                  <p className="text-gray-600">Maintain your own backups; we provide secure storage.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Restricted Content</h3>
                  <p className="text-gray-600">Files violating terms or harmful content may be refused or removed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Scholars Trust Us Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 ">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Why Scholars Trust Us</h2>
              <p className=" max-w-2xl mx-auto">Join thousands of successful scholars who have achieved their academic goals with our expert support and guidance.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                <p className="">Experienced researchers, writers, and academic professionals.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
                <p className="">Hundreds of successful thesis completions worldwide.</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Transparent</h3>
                <p className="">Clear communication and total confidentiality at every step.</p>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section className="mb-16">
      <div className="bg-white rounded-2xl  p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get quick answers to the most common questions about our file upload
            and assistance process.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Question */}
              <button
                className="w-full flex items-center justify-between bg-gray-50 px-6 py-4 text-left hover:bg-gray-100 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 py-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

        

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your work is precious, and so is your trust. Upload your files confidently and let us help you achieve academic excellence.
            </p>
            <div  ref={bottomRef}>
            <button 
              onClick={() => { setReadInfo(true); }} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold text-[15px] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Upload Your Files Now
            </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FileUploadInfo;
