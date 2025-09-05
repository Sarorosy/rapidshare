import React, { useEffect, useRef, useState } from "react";
import {
  FileText,
  ShieldCheck,
  Users,
  CheckCircle,
  ArrowUp,
  ChevronDown,
  FileQuestion,
  UserCheck,
  Target,
  Zap,
  Settings,
  Shield,
  Edit3,
  Upload,
  Clock,
  UserX,
  Database,
  Ban,
  HardDrive,
  FileWarning,
  BookOpen,
  Award,
} from "lucide-react";

const FileUploadInfo = ({ setReadInfo }) => {
  const primaryColor = "#1a8471";
  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const steps = [
    {
      icon: <FileText size={18} style={{ color: primaryColor }} />,
      title: "Why We Need Your Files",
      description: [
        <><div className="space-y-3 ml-2">
        <div className="flex gap-3 "><UserCheck className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" /> <div><div className="font-bold text-[14px]">Personalized Assistance</div> Helps our team understand your work thoroughly to provide tailored guidance.</div></div>
        <div className="flex gap-3 "><Target className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" /> <div><div className="font-bold text-[14px]">Accurate Feedback & Support </div> Enables precise suggestions, corrections, and improvements without compromising originality.</div></div>
        <div className="flex gap-3 "><Zap className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" /> <div><div className="font-bold text-[14px]">Streamlined Collaboration </div> Collaborate with multiple experts without unnecessary back-and-forth, saving time.</div></div>
        </div>
        </>
      ],
    },
    {
  icon: <FileText size={18} style={{ color: primaryColor }} />,
  title: "How to Use the Upload Platform",
  description: [
    <>
      <div className="space-y-3 ml-2">
        <div className="flex gap-3">
          <Upload className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Select Your File</div>
            Choose your documents (PDF, DOCX, XLSX, PPTX, images, etc).
          </div>
        </div>

        <div className="flex gap-3">
          <Edit3 className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Edit File Name (Optional)</div>
            Rename your file if needed before uploading.
          </div>
        </div>

        <div className="flex gap-3">
          <Clock className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Set Access Duration</div>
            Choose how long the file will be accessible (7, 15, 30, or 60 days).
          </div>
        </div>

        <div className="flex gap-3">
          <Shield className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Upload Securely</div>
            Click 'Upload' to send files encrypted for your protection.
          </div>
        </div>

        <div className="flex gap-3">
          <Settings className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Manage Later</div>
            You can update access duration or delete files anytime from your dashboard.
          </div>
        </div>
      </div>
    </>,
  ],
},
    {
  icon: <ShieldCheck size={18} style={{ color: primaryColor }} />,
  title: "Privacy & Security",
  description: [
    <>
      <div className="space-y-3 ml-2">
        <div className="flex gap-3">
          <ShieldCheck className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Confidentiality Guaranteed</div>
            Only authorized experts can access your files.
          </div>
        </div>

        <div className="flex gap-3">
          <Database className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Encrypted Storage</div>
            Advanced encryption ensures complete safety.
          </div>
        </div>

        <div className="flex gap-3">
          <UserX className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Limited Access</div>
            Files are never shared without consent.
          </div>
        </div>
      </div>
    </>,
  ],
}
,
    {
  icon: <CheckCircle size={18} style={{ color: primaryColor }} />,
  title: "Terms of Use",
  description: [
    <>
      <div className="space-y-3 ml-2">
        <div className="flex gap-3">
          <BookOpen className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Research & Thesis Assistance</div>
            Files are accessed only for research and thesis assistance.
          </div>
        </div>

        <div className="flex gap-3">
          <FileWarning className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Originality Required</div>
            Files must be original or properly cited; plagiarism is prohibited.
          </div>
        </div>

        <div className="flex gap-3">
          <HardDrive className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Backups Recommended</div>
            Maintain your own backups; we provide secure storage.
          </div>
        </div>

        <div className="flex gap-3">
          <Ban className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Restricted Content</div>
            Files violating terms or harmful content may be refused or removed.
          </div>
        </div>
      </div>
    </>,
  ],
}
,
    {
  icon: <Users size={18} style={{ color: primaryColor }} />,
  title: "Why Scholars Trust Us",
  description: [
    <>
      <div className="space-y-3 ml-2">
        <div className="flex gap-3">
          <UserCheck className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Expert Team</div>
            Experienced researchers, writers, and academic professionals.
          </div>
        </div>

        <div className="flex gap-3">
          <Award className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Proven Track Record</div>
            Hundreds of successful thesis completions worldwide.
          </div>
        </div>

        <div className="flex gap-3">
          <ShieldCheck className="w-3 h-3 text-green-800 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-[14px]">Secure & Transparent</div>
            Clear communication and total confidentiality at every step.
          </div>
        </div>
      </div>
    </>,
  ],
  footer:
    <div className="text-[15px]">Your work is precious, and so is your trust. Upload your files confidently and let us help you achieve academic excellence.</div>
}
,
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
    <div className=" space-y-8 text-gray-800 relative text-[13px]">
      {/* Header */}
      <div className="space-y-2 bg-white p-3">
        <h1 className="text-[20px] font-bold">
          Welcome to the <span  style={{ color: primaryColor }}>File Upload Portal</span>
        </h1>
        <p className="text-gray-600 text-[15px]">
          We understand that your thesis and research files are valuable and
          confidential. Our platform is designed to make your experience secure,
          simple, and trustworthy. Here's everything you need to know before
          uploading your documents.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-2 gap-4">
  {steps.map((step, index) => (
    <div
      key={index}
      className={`bg-white p-3 ${index === steps.length - 1 ? "col-span-2" : ""}`}
    >
      <div className="flex gap-2 items-end mb-3">
        <div
          className="w-7 h-7 rounded flex items-center justify-center font-bold text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {index + 1}
        </div>
        <h2 className="text-[16px] font-bold flex items-center gap-2">
          {step.title}
        </h2>
      </div>

      <ul className="list-none list-inside space-y-1 text-gray-700">
        {step.description.map((desc, i) => (
          <li key={i}>{desc}</li>
        ))}
      </ul>

      {step.footer && (
        <p className="mt-2 font-semibold text-gray-800">{step.footer}</p>
      )}
    </div>
  ))}
</div>


      {/* Bottom Button */}
      <div ref={bottomRef} className="flex justify-end my-4">
        <button
          onClick={() => {
            setReadInfo(true);
          }}
          className="px-2 py-1.5 rounded text-white font-semibold shadow-lg hover:opacity-90 transition text-[12px] leading-none"
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
          <ChevronDown size={18} style={{ color: primaryColor }} />
        </button>
      )}
    </div>
  );
};

export default FileUploadInfo;
