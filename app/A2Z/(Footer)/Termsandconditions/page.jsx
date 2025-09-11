import React from "react";

export default function TermsAndConditions({
  platformName = "Your Platform Name",
  lastUpdated = "August 31, 2025",
  jurisdiction = "India",
  courtLocation = "Gurugram, Haryana",
  supportEmail = "support@example.com",
  companyAddress = "123, Example Street, City, State, ZIP",
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last Updated: {lastUpdated}
        </p>
      </header>

      <section className="space-y-8">
        <p className="leading-relaxed">
          Welcome to <span className="font-semibold">{platformName}</span>. By
          accessing or using our website, services, or creating a store on our
          platform, you agree to be bound by the following Terms and Conditions.
          Please read them carefully before using our services.
        </p>

        {/* 1. Acceptance of Terms */}
        <section>
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p className="mt-3 leading-relaxed">
            By registering, creating a store, or listing products on{" "}
            <span className="font-semibold">{platformName}</span>, you agree to
            comply with these Terms and Conditions, as well as our Privacy
            Policy. If you do not agree, please discontinue using the platform.
          </p>
          <p className="mt-3 leading-relaxed">
            We reserve the right to update or modify these Terms at any time.
            Continued use of the platform after changes are posted will
            constitute your acceptance of the updated terms.
          </p>
        </section>

        {/* 2. Account Registration */}
        <section>
          <h2 className="text-xl font-semibold">2. Account Registration</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Users must create an account to access vendor/store features.
            </li>
            <li>
              All information provided must be accurate, complete, and up to
              date.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              login credentials and for all activity under your account.
            </li>
            <li>
              The platform reserves the right to suspend or terminate accounts
              that provide false information or violate these Terms.
            </li>
          </ul>
        </section>

        {/* 3. Store and Product Listings */}
        <section>
          <h2 className="text-xl font-semibold">
            3. Store and Product Listings
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Vendors may create stores and list products subject to our
              approval.
            </li>
            <li>
              All product details (description, price, images, specifications)
              must be accurate and not misleading.
            </li>
            <li>
              Prohibited items include illegal, counterfeit, stolen, or
              restricted goods.
            </li>
            <li>
              The platform reserves the right to edit, remove, or reject any
              listing at its discretion.
            </li>
          </ul>
        </section>

        {/* 4. Fees and Payments */}
        <section>
          <h2 className="text-xl font-semibold">4. Fees and Payments</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Use of certain services may be subject to fees (listing fees,
              transaction commissions, or subscriptions).
            </li>
            <li>
              Fees, if applicable, will be clearly communicated before being
              charged.
            </li>
            <li>
              Platform fees are generally{" "}
              <span className="italic">non-refundable</span>, unless stated
              otherwise.
            </li>
          </ul>
        </section>

        {/* 5. Transactions and Responsibilities */}
        <section>
          <h2 className="text-xl font-semibold">
            5. Transactions and Responsibilities
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              The platform acts as a facilitator between buyers and sellers.
            </li>
            <li>
              The seller is solely responsible for product quality, pricing,
              packaging, shipping, and warranty.
            </li>
            <li>
              The platform is not liable for disputes, fraud, delays, or damages
              caused by sellers or buyers.
            </li>
            <li>
              Buyers and sellers are encouraged to resolve disputes directly.
            </li>
          </ul>
        </section>

        {/* 6. Prohibited Activities */}
        <section>
          <h2 className="text-xl font-semibold">6. Prohibited Activities</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Selling counterfeit, illegal, harmful, or prohibited goods.</li>
            <li>
              Uploading content that is offensive, defamatory, or infringes
              intellectual property rights.
            </li>
            <li>
              Attempting to hack, disrupt, or misuse the platform in any way.
            </li>
          </ul>
        </section>

        {/* 7. Intellectual Property */}
        <section>
          <h2 className="text-xl font-semibold">7. Intellectual Property</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Vendors retain ownership of their content (store details, images,
              product descriptions).
            </li>
            <li>
              By listing on the platform, vendors grant us a non-exclusive,
              worldwide license to display, promote, and distribute their
              content as part of our services.
            </li>
            <li>
              All trademarks, logos, and branding of {platformName} remain the
              sole property of the platform.
            </li>
          </ul>
        </section>

        {/* 8. Privacy and Data Use */}
        <section>
          <h2 className="text-xl font-semibold">8. Privacy and Data Use</h2>
          <p className="mt-3 leading-relaxed">
            Our Privacy Policy explains how we collect, use, and protect your
            information. By using our platform, you consent to the collection
            and use of your data in accordance with our Privacy Policy.
          </p>
        </section>

        {/* 9. Limitation of Liability */}
        <section>
          <h2 className="text-xl font-semibold">9. Limitation of Liability</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              The platform provides services "as is" and does not guarantee
              uninterrupted or error-free operation.
            </li>
            <li>
              We are not responsible for losses arising from user disputes,
              fraudulent activity, product defects, delays, or damages.
            </li>
          </ul>
        </section>

        {/* 10. Termination of Accounts */}
        <section>
          <h2 className="text-xl font-semibold">10. Termination of Accounts</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              The platform may suspend or terminate accounts that violate these
              Terms.
            </li>
            <li>Users may also close their accounts at any time.</li>
            <li>
              Termination does not exempt users from paying outstanding fees or
              fulfilling obligations related to prior transactions.
            </li>
          </ul>
        </section>

        {/* 11. Governing Law and Dispute Resolution */}
        <section>
          <h2 className="text-xl font-semibold">
            11. Governing Law and Dispute Resolution
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              These Terms shall be governed by and construed in accordance with
              the laws of {jurisdiction}.
            </li>
            <li>
              Any disputes shall be subject to the exclusive jurisdiction of the
              courts of {courtLocation}.
            </li>
          </ul>
        </section>

        {/* 12. Contact Information */}
        <section>
          <h2 className="text-xl font-semibold">12. Contact Information</h2>
          <address className="mt-3 not-italic leading-relaxed">
            For any questions regarding these Terms, please contact us at:
            <br />
            📧{" "}
            <a href={`mailto:${supportEmail}`} className="underline">
              {supportEmail}
            </a>
            <br />
            📍 {companyAddress}
          </address>
        </section>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="leading-relaxed">
            <span className="font-semibold">Note:</span> This document is a
            general template. For complete legal compliance — especially
            regarding payments, taxes, and consumer protection — please seek
            advice from a qualified attorney in your jurisdiction.
          </p>
        </div>
      </section>
    </main>
  );
}
