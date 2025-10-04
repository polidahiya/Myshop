import React from "react";

export default function PrivacyPolicy() {
  // ✅ Easy to edit main variables
  const siteName = "A2Z";
  const contactEmail = "polidahiya830@gmail.com";
  const lastUpdated = "October 2025";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Privacy Policy — {siteName}
      </h1>
      <p className="text-sm text-gray-500 text-center mb-10">
        Last Updated: {lastUpdated}
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to {siteName}. We respect your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, and safeguard your data when you use our website or
          services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <p>
          We collect only the information you provide to us directly — such as
          your name, email address, and store details — when you create an
          account or upload products.
        </p>
        <p className="mt-2">
          We do <strong>not</strong> collect or process any payment or financial
          data on our platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To create and manage your online store.</li>
          <li>To display your products to customers.</li>
          <li>To improve our platform’s functionality and security.</li>
          <li>
            To show relevant ads through Google Ads and other ad networks.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          4. Data Storage and Security
        </h2>
        <p>
          We use trusted cloud providers with industry-standard encryption and
          security practices to store and protect your data. Your data is stored
          securely in managed cloud databases and content delivery systems.
        </p>
        <p className="mt-2">
          We take reasonable steps to prevent unauthorized access, disclosure,
          or misuse of your information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Cookies and Ads</h2>
        <p>
          We may use cookies and similar technologies to personalize your
          experience and show relevant advertisements via Google Ads. You can
          control cookie settings through your browser preferences.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Data Sharing</h2>
        <p>
          We do not sell or rent your personal information. We may share limited
          data with trusted service providers who help us operate the platform,
          such as cloud hosting and analytics services, under strict privacy
          agreements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
        <p>
          You may request deletion or correction of your personal information by
          contacting us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          . We will respond to your request in a reasonable time frame.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          8. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically. The latest version
          will always be available on this page with the “Last Updated” date.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or how we handle
          your data, please contact us at{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-blue-600 hover:underline"
          >
            {contactEmail}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
