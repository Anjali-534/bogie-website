import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Bogie",
  description:
    "How Bogie AI Technologies Pvt. Ltd. collects, uses, discloses, and protects your information across the Bogie website and mobile apps, for Riders, Customers, and Driver Partners.",
  alternates: { canonical: "https://bogie.in/privacy-policy" },
};

const PRIVACY_EMAIL = "privacy@bogie.in";
const SUPPORT_EMAIL = "support@bogie.in";
const DRIVER_SUPPORT_EMAIL = "driver-support@bogie.in";

function MailLink({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:text-primary-dark"
    >
      {address}
    </a>
  );
}

type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "what-we-collect",
    title: "1. What We Collect",
    content: (
      <>
        <h3 className="text-sm font-bold text-neutral-900">
          From Riders/Customers
        </h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
          <li>Name, profile photo, mobile number, email address</li>
          <li>Home and saved addresses</li>
          <li>
            Demographic information such as postcode/pincode, preferences,
            and interests
          </li>
          <li>
            Booking details, transaction history, and billing/invoice
            information to process requests and auto-complete future
            transactions
          </li>
          <li>
            Device information (model, OS version), app usage patterns,
            crash logs, and performance data
          </li>
          <li>
            Precise or approximate location data, collected in the
            foreground of the app from the time a Service is requested
            until it is completed, used to enable pickup/drop accuracy,
            safety features, fraud prevention, and receipt generation
          </li>
          <li>
            Information relevant to surveys, promotions, or customer
            support interactions
          </li>
          <li>App install/uninstall data where relevant to fraud prevention</li>
        </ul>

        <h3 className="mt-5 text-sm font-bold text-neutral-900">
          From Driver Partners
        </h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
          <li>
            Name, profile picture, mobile number, email address, and
            location details
          </li>
          <li>
            KYC and vehicle documents: Aadhaar, PAN, Driving Licence (DL),
            Registration Certificate (RC), insurance, pollution
            certificate, and other documents evidencing the fitness of the
            vehicle to provide Services
          </li>
          <li>Bank account and/or UPI details for payouts</li>
          <li>
            Background check and identity verification information,
            including driving history or criminal record (where legally
            permitted), which may be collected via an authorised
            third-party verification vendor on our behalf
          </li>
          <li>
            Call and SMS masking details generated while providing
            Services to Riders
          </li>
          <li>
            Where a Driver Partner opts into the referral program and
            provides consent, selected contact(s) from their device&apos;s
            contact list — used solely to send the referral invite, never
            shared with any third party
          </li>
          <li>
            Location data throughout an active trip, which may be linked
            to the associated Rider&apos;s account even where the Rider has
            not independently enabled location sharing, to enable receipt
            generation and support
          </li>
        </ul>

        <p className="mt-5 text-sm leading-relaxed text-neutral-700">
          You may request to review the information you have provided at
          any time, and we will correct or amend any information found to
          be inaccurate or deficient. We do not retain personal data for
          longer than is required for the purpose for which it was
          collected, or as required under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "what-we-do",
    title: "2. What We Do With the Information We Gather",
    content: (
      <>
        <p className="text-sm leading-relaxed text-neutral-700">
          We use your information to understand your needs and provide
          better Service, specifically to:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
          <li>
            Enable you to use the Bogie Apps and carry out obligations
            arising from any contract between you and us
          </li>
          <li>
            Allow you to initiate and complete bookings and transactions
            on the Bogie Apps
          </li>
          <li>Match Riders with nearby available Driver Partners</li>
          <li>Manage your account and inform your usage of the Bogie Apps</li>
          <li>
            Process payments for Services availed and perform related
            functions
          </li>
          <li>
            Respond to your queries, reviews, and comments, and provide
            customer support
          </li>
          <li>
            Communicate important notices, booking confirmations, and
            Service changes
          </li>
          <li>Track order/booking status and Service provision</li>
          <li>Improve app performance, reliability, and features</li>
          <li>Detect and prevent fraud</li>
          <li>Comply with applicable law</li>
          <li>Any other purpose with your specific consent</li>
        </ul>

        <p className="mt-5 text-sm leading-relaxed text-neutral-700">
          We may periodically send promotional emails, SMS, or make voice
          calls about new Services, offers, or information we believe may
          interest you, using the contact details you have provided. We
          may also use your information for market research purposes,
          contacting you by email, SMS, voice call, or in-app
          notification.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          You may opt out of promotional communications at any time in
          accordance with the Telecom Commercial Communications Customer
          Preference Regulations (TCCCPR), 2018, by writing to{" "}
          <MailLink address={PRIVACY_EMAIL} /> or using the unsubscribe
          option provided in the communication.
        </p>
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium leading-relaxed text-emerald-700">
          NOT used for: selling your data to advertisers, non-Bogie
          profiling, or unauthorized sharing.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "3. Third-Party Services We Use",
    content: (
      <>
        <p className="text-sm leading-relaxed text-neutral-700">
          We work with the following categories of third-party providers,
          each processing only the data necessary for their function,
          under their own privacy terms:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
          <li>
            <span className="font-semibold text-neutral-900">
              Razorpay
            </span>{" "}
            — payment processing for ride/delivery fares and driver
            payouts. Card and bank details are entered directly with
            Razorpay; Bogie does not store your card number, CVV, or full
            bank credentials.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">
              Google Firebase
            </span>{" "}
            — app analytics and crash reporting, used to diagnose issues
            and improve app reliability.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">
              Google Maps Platform / Ola Maps
            </span>{" "}
            — map rendering, route directions, and address search, used
            to calculate routes and locate pickup/drop points.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">
              Cloud storage providers
            </span>{" "}
            — secure storage of Driver Partner KYC documents, booking
            records, and Bogie Tracker shipment data.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">
              Authorised background-verification vendors
            </span>{" "}
            — for Driver Partner identity and history checks prior to
            onboarding.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "location-data",
    title: "4. Location Data",
    content: (
      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
        <li>
          Collected in the foreground of the app, from the time a Service
          is requested until it is completed
        </li>
        <li>
          Shared with the assigned Driver Partner during the booking only,
          and with the Rider to enable live trip tracking
        </li>
        <li>Location history is retained for 90 days</li>
        <li>
          Disabling location access will prevent core app functionality
          (booking, tracking, fare calculation)
        </li>
        <li>
          We do not collect location data while the app is closed or
          running in the background, except where a live-tracking feature
          is actively in use for an ongoing trip and you have been
          separately notified and given the opportunity to consent to
          that specific use
        </li>
      </ul>
    ),
  },
  {
    id: "security",
    title: "5. Security",
    content: (
      <>
        <p className="text-sm leading-relaxed text-neutral-700">
          We are committed to keeping your information secure. To prevent
          unauthorized access or disclosure, we maintain physical,
          electronic, and managerial safeguards consistent with the
          Digital Personal Data Protection Act, 2023 (DPDP Act) and
          applicable IT Rules, including:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
          <li>TLS 1.3 encryption for all data in transit</li>
          <li>Passwords stored as bcrypt hashes — never in plain text</li>
          <li>Documents and KYC data stored in encrypted cloud storage</li>
          <li>Bank and UPI details stored with bank-grade encryption</li>
          <li>Regular security audits</li>
          <li>
            Breach notification within 72 hours, as required under the
            DPDP Act
          </li>
          <li>Access restricted to authorised personnel only</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          We do not retain information for longer than reasonably required
          for the purpose of our Services or as mandated by applicable
          Indian law. You are required to keep your account credentials
          and any data you obtain via the Bogie Apps strictly
          confidential.
        </p>
      </>
    ),
  },
  {
    id: "disclosure",
    title: "6. Disclosure",
    content: (
      <>
        <p className="text-sm leading-relaxed text-neutral-700">
          We may disclose certain personally identifiable information to
          third parties in the following circumstances:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
          <li>
            <span className="font-semibold text-neutral-900">
              Between users:
            </span>{" "}
            If you are a Driver Partner, we may share your name, phone
            number, vehicle details, and profile picture with the Rider
            you are serving, and vice versa, solely to enable the Service.
            Phone numbers are masked — neither party sees the other&apos;s
            real number.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">
              Vendors, consultants, and business partners:
            </span>{" "}
            including payment processing entities, cloud hosting
            providers, and marketing partners, under contracts requiring
            them to safeguard your data and use it only to support our
            Services.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">
              Behavioural analytics and personalisation:
            </span>{" "}
            to improve and tailor your experience on the Bogie Apps.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">
              Government or law enforcement agencies:
            </span>{" "}
            only where legally required, for RTO/police compliance, or in
            good-faith efforts to detect or prevent fraud, identity theft,
            or other illegal activity.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">
              Parent, subsidiary, or affiliate entities:
            </span>{" "}
            for internal business purposes.
          </li>
          <li>
            <span className="font-semibold text-neutral-900">
              Merger, acquisition, or restructuring:
            </span>{" "}
            we reserve the right to transfer information in connection
            with any sale, merger, or restructuring of our business or
            assets, subject to the receiving party being bound by
            equivalent privacy commitments.
          </li>
        </ul>
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium leading-relaxed text-emerald-700">
          We NEVER sell your personal data for advertising purposes.
        </p>
      </>
    ),
  },
  {
    id: "deletion",
    title: "7. Deletion of Information",
    content: (
      <>
        <p className="text-sm leading-relaxed text-neutral-700">
          Upon your deletion of your Bogie account, or on receipt of a
          written request from you, we will delete your personal
          information, except where retention is necessary for safety,
          security, fraud prevention, legal compliance, enforcement of our
          rights, or other legitimate business requirements (e.g.
          GST-related booking records, driver document retention under
          the Motor Vehicles Act).
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          Certain data — including geo-location, trip, or transaction
          history — may be retained where legally or operationally
          required, even after account deletion, per the retention
          periods in Section 8.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          Requests for deletion of your personal information may be sent
          to <MailLink address={PRIVACY_EMAIL} />. Please note that upon
          deletion, we may no longer be able to provide Services for which
          that information was required.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "8. Data Retention",
    content: (
      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
        <li>
          <span className="font-semibold text-neutral-900">
            Active account data:
          </span>{" "}
          retained while your account is active
        </li>
        <li>
          <span className="font-semibold text-neutral-900">
            Booking history:
          </span>{" "}
          3 years (GST compliance)
        </li>
        <li>
          <span className="font-semibold text-neutral-900">
            Driver documents:
          </span>{" "}
          as required under RTO regulations
        </li>
        <li>
          <span className="font-semibold text-neutral-900">
            Location history:
          </span>{" "}
          90 days
        </li>
        <li>
          <span className="font-semibold text-neutral-900">
            Deleted accounts:
          </span>{" "}
          data purged within 30 days, except where legally required to
          retain it
        </li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "9. Your Rights (DPDP Act, 2023)",
    content: (
      <>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
          <li>Right to access your personal data</li>
          <li>Right to correct inaccurate data</li>
          <li>Right to erase your data</li>
          <li>Right to know how your data is used</li>
          <li>Right to withdraw consent at any time</li>
          <li>Right to nominate a representative</li>
          <li>Right to file a grievance</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          To exercise any of these rights, email{" "}
          <MailLink address={PRIVACY_EMAIL} /> — we respond within 7
          working days.
        </p>
      </>
    ),
  },
  {
    id: "withdrawal",
    title: "10. Withdrawal or Non-Provision of Data",
    content: (
      <p className="text-sm leading-relaxed text-neutral-700">
        You have the option not to provide the data or information we
        seek to collect. You may also withdraw consent previously given
        to Bogie at any time by writing to{" "}
        <MailLink address={PRIVACY_EMAIL} />. In such cases, Bogie
        reserves the option not to provide any Service for which the
        withheld information was required.
      </p>
    ),
  },
  {
    id: "prohibited-activities",
    title: "11. Prohibited Activities",
    content: (
      <>
        <p className="text-sm leading-relaxed text-neutral-700">
          As per Rule 3(1)(b) of the Information Technology (Intermediary
          Guidelines and Digital Media Ethics Code) Rules, 2021, you shall
          not host, display, upload, modify, publish, transmit, store,
          update, or share any information that:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-700">
          <li>belongs to another person and to which you have no right</li>
          <li>
            is defamatory, obscene, pornographic, paedophilic, invasive of
            another&apos;s privacy (including bodily privacy), insulting
            or harassing on the basis of gender, libellous, racially or
            ethnically objectionable, or relates to or encourages money
            laundering or gambling
          </li>
          <li>is harmful to a child</li>
          <li>
            infringes any patent, trademark, copyright, or other
            proprietary right
          </li>
          <li>violates any law currently in force</li>
          <li>
            deceives or misleads recipients about the origin of a message,
            or is knowingly and intentionally false or misleading
          </li>
          <li>impersonates another person</li>
          <li>
            threatens the unity, integrity, defence, security, or
            sovereignty of India, or public order, or incites the
            commission of a cognizable offence
          </li>
          <li>
            contains a virus or any code designed to interrupt, destroy,
            or limit the functionality of a computer resource
          </li>
          <li>
            is patently false and published with intent to mislead or
            harass a person or entity for financial gain, or to cause
            injury
          </li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          Non-compliance may result in suspension or termination of access
          to the Bogie Apps, and/or removal of the non-compliant content,
          at our discretion.
        </p>
      </>
    ),
  },
  {
    id: "cookies-local-storage",
    title: "12. Cookies & Local Storage",
    content: (
      <>
        <p className="text-sm leading-relaxed text-neutral-700">
          <span className="font-semibold text-neutral-900">
            Essential (cannot be disabled):
          </span>{" "}
          session token, saved addresses, active booking state.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          <span className="font-semibold text-neutral-900">
            Analytics (clearable):
          </span>{" "}
          anonymised usage statistics, crash reports.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          A cookie is a small file placed on your device to help us
          understand traffic patterns and improve the Bogie website.
          Cookies do not give us access to your device or any information
          beyond what you choose to share. You can decline cookies via
          your browser settings; this may limit some website
          functionality. No advertising cookies are used, and there is no
          cross-app tracking. Clear via: Settings → Clear App Data
          (in-app) or your browser settings (web).
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          See our full{" "}
          <a
            href="/cookies"
            className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:text-primary-dark"
          >
            Cookie Policy
          </a>{" "}
          for a category-by-category breakdown.
        </p>
      </>
    ),
  },
  {
    id: "links-to-other-websites",
    title: "13. Links to Other Websites",
    content: (
      <p className="text-sm leading-relaxed text-neutral-700">
        The Bogie website or Apps may contain links to third-party
        websites of interest. Once you leave our platform via such a
        link, we have no control over that website and are not
        responsible for its content or privacy practices. We encourage
        you to review the privacy policy of any third-party site you
        visit.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "14. Children's Privacy",
    content: (
      <p className="text-sm leading-relaxed text-neutral-700">
        Bogie is not intended for users under 18. We do not knowingly
        collect data from minors. If you believe a minor has registered on
        Bogie, please contact <MailLink address={PRIVACY_EMAIL} />{" "}
        immediately.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "15. Contact Us",
    content: (
      <p className="text-sm leading-relaxed text-neutral-700">
        If you have questions regarding this Privacy Policy, or wish to
        report a breach of it, please contact us at{" "}
        <MailLink address={SUPPORT_EMAIL} />, or for Driver
        Partner-specific queries, <MailLink address={DRIVER_SUPPORT_EMAIL} />.
      </p>
    ),
  },
  {
    id: "grievance-officer",
    title: "16. Grievance Officer",
    content: (
      <>
        <p className="text-sm leading-relaxed text-neutral-700">
          In accordance with the Information Technology Act, 2000, and
          the rules framed thereunder, the details of the Grievance
          Officer are as follows:
        </p>
        <div className="mt-4 rounded-xl bg-neutral-50 px-5 py-4 text-sm leading-relaxed text-neutral-700">
          <p className="font-semibold text-neutral-900">Anil Aggarwal</p>
          <p>Designation: Data Protection Officer</p>
          <p>Bogie AI Technologies Pvt. Ltd.</p>
          <p>16/534 Joshi Road, Karol Bagh, New Delhi-110005, India</p>
          <p>
            Email: <MailLink address={PRIVACY_EMAIL} />
          </p>
          <p>Response time: Within 7 working days</p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                <ShieldCheck size={14} />
                Privacy Policy
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Your privacy, spelled out.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                This Privacy Policy sets out how Bogie AI Technologies
                Pvt. Ltd. uses and protects any information that you give
                Bogie when you use the Bogie website and/or mobile
                applications, for Riders/Customers and Driver Partners
                alike.
              </p>
              <p className="mt-3 text-sm font-medium text-neutral-500">
                Effective Date: June 1, 2026 &nbsp;|&nbsp; Last Updated:
                August 22, 2026
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
                <div className="flex flex-col gap-4 text-sm leading-relaxed text-neutral-700">
                  <p>
                    This Privacy Policy is an electronic record between
                    you and Bogie under the Information Technology Act,
                    2000, together with the rules framed thereunder from
                    time to time.
                  </p>
                  <p>
                    Your privacy matters to Bogie AI Technologies Pvt.
                    Ltd. (the &quot;Company&quot;, &quot;we&quot;,
                    &quot;Bogie&quot;, or &quot;us&quot;).
                  </p>
                  <p>
                    This Privacy Policy (&quot;Policy&quot;) describes the
                    policies and procedures on the collection, use,
                    disclosure, and protection of your information when
                    you use our website located at{" "}
                    <a
                      href="https://bogie.in/"
                      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:text-primary-dark"
                    >
                      https://bogie.in/
                    </a>
                    , or the Bogie mobile applications for Riders and
                    Driver Partners (collectively, &quot;Bogie
                    Apps&quot;), and is applicable, without limitation, to
                    Riders, Customers, Driver Partners, and Bogie Tracker
                    (B2B logistics dispatch) users.
                  </p>
                  <p>
                    The terms &quot;you&quot; and &quot;your&quot; refer
                    to any user of the Bogie Apps, including any
                    Enterprise/Tracker Customer or person authorized by
                    such a customer. The term &quot;Services&quot; refers
                    to any service offered by Bogie on the Bogie Apps or
                    otherwise, including cab, truck, ambulance, and parcel
                    delivery services, and B2B dispatch tracking through
                    Bogie Tracker. This Policy is to be read together with
                    the applicable Terms of Service and Driver Partner
                    Terms and Conditions.
                  </p>
                  <p>
                    Bogie is committed to ensuring your privacy is
                    protected. Should we ask you to provide information by
                    which you can be identified when using the Bogie
                    Apps, you can be assured it will only be used in
                    accordance with this Policy.
                  </p>
                  <p>
                    By using the Bogie Apps and Services, you agree and
                    consent to the collection, transfer, use, storage,
                    disclosure, and sharing of your information as
                    described in this Policy. If you do not agree with
                    this Policy, please do not use or access the Bogie
                    Apps.
                  </p>
                  <p>
                    Bogie may update this Policy from time to time. We
                    will notify you of material changes via in-app
                    notification and/or email, and update the &quot;Last
                    Updated&quot; date above. Please check this page
                    periodically.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              {SECTIONS.map((section, i) => (
                <AnimatedSection key={section.id} delay={i * 0.03}>
                  <div
                    id={section.id}
                    className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8"
                  >
                    <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                      {section.title}
                    </h2>
                    <div className="mt-4 border-t border-neutral-100 pt-4">
                      {section.content}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <p className="mt-10 text-center text-xs text-neutral-500">
              © 2026 Bogie AI Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
