import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        Welcome to <strong>RapidShare</strong> by Ask Scope. By using our platform to share and upload files, you agree to the following terms and conditions:
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Usage Guidelines</h2>
      <p className="mb-4">
        Users can upload multiple files through a secure link after email verification. Each file must have a title and an access type: <strong>view-only</strong> or <strong>download</strong>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Access Type</h2>
      <p className="mb-4">
        - <strong>View-only</strong>: Files can be previewed but not downloaded.<br />
        - <strong>Download</strong>: Files can be downloaded and used as needed.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. File Expiry</h2>
      <p className="mb-4">
        Files will be automatically deleted <strong>60 days</strong> after upload. Deleted files go to a trash folder where they can be restored for up to <strong>30 days</strong>. After this period, files are permanently deleted.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Email Notifications</h2>
      <p className="mb-4">
        You will receive email alerts <strong>3 days</strong> before files are deleted from your storage or trash.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Prohibited Use</h2>
      <p className="mb-4">
        You may not upload files that are illegal, harmful, or violate copyright laws. Ask Scope reserves the right to suspend or terminate accounts involved in such activities.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update these terms at any time. Continued use of the platform after updates constitutes acceptance of the revised terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact</h2>
      <p className="mb-4">
        For questions or support, contact us via Ask Scope’s official communication channels.
      </p>
    </div>
  );
};

export default TermsOfService;
