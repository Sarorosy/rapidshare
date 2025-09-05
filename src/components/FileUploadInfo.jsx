import React, { useEffect, useRef, useState } from "react";
import {
  FileText,
  ShieldCheck,
  Users,
  CheckCircle,
  ArrowUp,
  ChevronDown,
  FileQuestion,
} from "lucide-react";

const FileUploadInfo = ({ setReadInfo }) => {
  const primaryColor = "#1a8471";
  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const steps = [
    {
      icon: <FileText className="w-6 h-6" style={{ color: primaryColor }} />,
      title: "Why We Need Your Files",
      description: [
        "Personalized Assistance – Helps our team understand your work thoroughly to provide tailored guidance.",
        "Accurate Feedback & Support – Enables precise suggestions, corrections, and improvements without compromising originality.",
        "Streamlined Collaboration – Collaborate with multiple experts without unnecessary back-and-forth, saving time.",
      ],
    },
    {
      icon: <FileText className="w-6 h-6" style={{ color: primaryColor }} />,
      title: "How to Use the Upload Platform",
      description: [
        "Select Your File – Choose your documents (PDF, DOCX, XLSX, PPTX, images, etc).",
        "Edit File Name (Optional) – Rename your file if needed before uploading.",
        "Set Access Duration – Choose how long the file will be accessible (7, 15, 30, or 60 days).",
        "Upload Securely – Click 'Upload' to send files encrypted for your protection.",
        "Manage Later – You can update access duration or delete files anytime from your dashboard.",
      ],
    },
    {
      icon: <ShieldCheck className="w-6 h-6" style={{ color: primaryColor }} />,
      title: "Privacy & Security",
      description: [
        "Confidentiality Guaranteed – Only authorized experts can access your files.",
        "Encrypted Storage – Advanced encryption ensures complete safety.",
        "Limited Access – Files are never shared without consent.",
      ],
    },
    {
      icon: <CheckCircle className="w-6 h-6" style={{ color: primaryColor }} />,
      title: "Terms of Use",
      description: [
        "Files are accessed only for research and thesis assistance.",
        "Files must be original or properly cited; plagiarism is prohibited.",
        "Maintain your own backups; we provide secure storage.",
        "Files violating terms or harmful content may be refused or removed.",
      ],
    },
    {
      icon: <Users className="w-6 h-6" style={{ color: primaryColor }} />,
      title: "Why Scholars Trust Us",
      description: [
        "Expert Team – Experienced researchers, writers, and academic professionals.",
        "Proven Track Record – Hundreds of successful thesis completions worldwide.",
        "Secure & Transparent – Clear communication and total confidentiality at every step.",
      ],
      footer:
        "Your work is precious, and so is your trust. Upload your files confidently and let us help you achieve academic excellence.",
    },
  ];

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
    <div className="max-w-4xl mx-auto p-6 space-y-12 text-gray-800 relative">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold" style={{ color: primaryColor }}>
          Welcome to the File Upload Portal
        </h1>
        <p className="text-gray-600">
          We understand that your thesis and research files are valuable and
          confidential. Our platform is designed to make your experience secure,
          simple, and trustworthy. Here's everything you need to know before
          uploading your documents.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                {index + 1}
              </div>
              {index !== steps.length - 1 && (
                <div className="w-px h-full bg-gray-300 mt-1"></div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
                {step.icon} {step.title}
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {step.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              {step.footer && (
                <p className="mt-2 font-semibold text-gray-800">
                  {step.footer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <div ref={bottomRef} className="flex justify-center my-12">
        <button
          onClick={() => {
            setReadInfo(true);
          }}
          className="px-6 py-2 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition"
          style={{ backgroundColor: primaryColor }}
        >
          Share Your Files →
        </button>
      </div>

      {/* Bouncing Chevron Down */}
      {!isAtBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce bg-white rounded-full p-2 shadow-lg z-50"
          style={{ border: `2px solid ${primaryColor}` }}
        >
          <ChevronDown className="w-6 h-6" style={{ color: primaryColor }} />
        </button>
      )}
    </div>
  );
};

export default FileUploadInfo;
