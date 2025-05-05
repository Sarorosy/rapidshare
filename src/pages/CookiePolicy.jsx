import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-sm text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <h1 className="text-2xl font-semibold mb-4">Cookie Policy</h1>

      <p className="mb-4">
        This Cookie Policy explains how Rapid Collaborate uses cookies and similar technologies when you visit our website.
      </p>

      <h2 className="text-lg font-semibold mb-2">What are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files stored on your device to help us enhance your experience, remember your preferences, and analyze site traffic.
      </p>

      <h2 className="text-lg font-semibold mb-2">How We Use Cookies</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To remember your login and settings</li>
        <li>To provide essential website functionality</li>
        <li>To gather analytics for performance improvement</li>
      </ul>

      <h2 className="text-lg font-semibold mb-2">Managing Cookies</h2>
      <p className="mb-4">
        You can control or disable cookies in your browser settings. However, some features of the site may not function properly without them.
      </p>

      <h2 className="text-lg font-semibold mb-2">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy occasionally. Please revisit this page to stay informed.
      </p>

      <p className="text-sm text-gray-600">
        For more information, please review our <span onClick={() => navigate('/terms-and-conditions')} className="text-blue-500 underline cursor-pointer">Terms of Use</span> and <span onClick={() => navigate('/privacy-policy')} className="text-blue-500 underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default CookiePolicy;
