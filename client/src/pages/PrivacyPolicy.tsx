import { useEffect } from 'react';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-full bg-gray-50 overflow-y-scroll">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
        <p className="text-gray-600 mb-8 text-center">Last updated: September 8, 2024</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="mb-6 text-gray-700">
            At Miniplex, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you visit our website and use our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4 text-gray-700">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Personal information (name, email, phone number) when you create an account or make a booking</li>
            <li>Payment information processed securely through our payment processor</li>
            <li>Booking history and preferences</li>
            <li>Device and usage information, including IP address, browser type, and pages visited</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4 text-gray-700">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Process and manage your bookings</li>
            <li>Communicate with you about your account and bookings</li>
            <li>Improve our services and user experience</li>
            <li>Send promotional offers and updates (you can opt-out anytime)</li>
            <li>Ensure the security of our services</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Data Security</h2>
          <p className="mb-6 text-gray-700">
            We implement appropriate security measures to protect your personal information. However, no method of transmission 
            over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Third-Party Services</h2>
          <p className="mb-6 text-gray-700">
            We may use third-party services for payment processing, analytics, and other business operations. 
            These third parties have access to your information only to perform these tasks on our behalf.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Your Rights</h2>
          <p className="mb-4 text-gray-700">You have the right to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of your data</li>
            <li>Withdraw consent for data processing</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Children's Privacy</h2>
          <p className="mb-6 text-gray-700">
            Our services are not intended for individuals under the age of 13. We do not knowingly collect personal 
            information from children under 13.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Changes to This Policy</h2>
          <p className="mb-6 text-gray-700">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-blue-600 mt-2">
            Email: privacy@miniplex.com<br />
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
