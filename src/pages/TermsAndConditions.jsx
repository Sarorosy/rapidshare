import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

      <p>
        Below are terms of a legal agreement between you and Rapid Collaborate. Please read these “Terms of Use” before using this website. By accessing, browsing, or using this Web site, you acknowledge that you have read, understood, and agree to be bound by these terms and to comply with all applicable laws and regulations. If you do not agree to these terms, please do not use or visit this Web site.
      </p>

      <p>
        Rapid Collaborate may, without notice to you, at any time revise or update these Terms of Use and any other information contained in this Web site by updating this page. Rapid Collaborate may also make improvements or changes in the services or programs described in this site at any time without a prior notice.
      </p>

      <h2 className="text-2xl font-semibold mt-6">General</h2>
      <p>
        This site and all content in this site may not be copied, reproduced, republished, uploaded, posted, transmitted, distributed, or used for the creation of derivative works without obtaining written consent from Rapid Collaborate.
      </p>
      <p>
        Your failure to comply with the terms, conditions, and notices on this site will result in automatic termination of any rights granted to you, without prior notice, and you must immediately destroy all copies of downloaded materials in your possession or control. Rapid Collaborate does not grant you any express or implied rights or licenses under any trademarks, copyrights, or other proprietary or intellectual property rights. You may not copy any of the content from this site to other website or document published in public domain. Any sample work here does not guarantee or confirm that your work will be of the same standard.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Disclaimers</h2>
      <p>
        Information on this Web site is not guaranteed to be correct, latest, or complete, and this site may contain technical inaccuracies, incorrect formatting or typographical errors. Rapid Collaborate undertakes no responsibility for updating this site to keep information current or to ensure the accuracy or completeness of any posted information. As such, you should confirm the accuracy and completeness of all presented information before making any decision related to any services or other matters as presented in this site.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Indemnification</h2>
      <p>
        You understand and agree that you are personally responsible for your behaviour on the Site. You agree to indemnify, defend and hold harmless Rapid Collaborate, its subsidiaries, affiliated companies and websites, business partners, employees, agents, and any third-party information providers to the Service from and against all claims, losses, expenses, damages and costs (including, but not limited to, direct, incidental, consequential, exemplary and indirect damages), and reasonable attorneys’ fees, resulting from or arising out of your use, misuse, or inability to use the Site, the Service, or the Content, or any violation by you of this Agreement.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Disclaimer</h2>
      <p>
        USE OF THIS SITE IS AT YOUR SOLE RISK. ALL MATERIALS, INFORMATION, AND SERVICES ARE PROVIDED "AS IS," WITH NO WARRANTIES OR GUARANTEES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. WITHOUT LIMITATION, Rapid Collaborate MAKES NO WARRANTY OR GUARANTEE THAT THIS WEB SITE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Limitation of Liability</h2>
      <p>
        In no event shall Rapid Collaborate be liable for any damages whatsoever, including, but not limited to any direct, incidental, consequential, special, exemplary or other indirect damages arising out of:
      </p>
      <ul className="list-disc list-inside pl-4">
        <li>the use of or inability to use the site, the service, or the content,</li>
        <li>any transaction conducted through or facilitated by the site;</li>
        <li>any claim attributable to errors, omissions, or other inaccuracies in the site, the service and/or the content,</li>
        <li>unauthorized access to or alteration of your transmissions or data, or</li>
        <li>any other matter relating to the site, the service, or the content, even if Rapid Collaborate has been advised of the possibility of such damages.</li>
      </ul>
      <p>
        If you are dissatisfied with the site, the service, the content, or with the terms of use, your sole and exclusive remedy is to discontinue using the site.
      </p>
    </div>
  );
};

export default TermsAndConditions;
