import { useEffect } from 'react';
import Footer from '../components/Footer';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-full bg-gray-50 overflow-y-scroll">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h1>
        <p className="text-gray-600 mb-8 text-center">Last updated: September 8, 2024</p>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="mb-6 text-gray-700">
            Welcome to Miniplex! These Terms of Service ("Terms") govern your access to and use of the Miniplex website, 
            mobile applications, and services (collectively, the "Service"). By accessing or using our Service, you agree to be 
            bound by these Terms and our Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Account Registration</h2>
          <p className="mb-4 text-gray-700">To use certain features of our Service, you must register for an account. You agree to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Be responsible for all activities that occur under your account</li>
            <li>Immediately notify us of any unauthorized use of your account</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Booking and Payments</h2>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>All ticket prices are in the local currency and inclusive of applicable taxes</li>
            <li>Payments must be made in full at the time of booking</li>
            <li>We accept various payment methods as indicated during checkout</li>
            <li>Prices are subject to change without notice</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Refund and Cancellation Policy</h2>
          <p className="mb-4 text-gray-700">
            Tickets are non-refundable except in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Event cancellation by the venue or organizer</li>
            <li>Technical issues preventing access to the event</li>
            <li>Other circumstances at our sole discretion</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. User Conduct</h2>
          <p className="mb-4 text-gray-700">You agree not to:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Use the Service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Use automated means to access the Service without our permission</li>
            <li>Impersonate any person or entity</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Intellectual Property</h2>
          <p className="mb-6 text-gray-700">
            All content on the Service, including text, graphics, logos, and software, is the property of Miniplex or its 
            licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, 
            or create derivative works without our prior written permission.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="mb-6 text-gray-700">
            To the maximum extent permitted by law, Miniplex shall not be liable for any indirect, incidental, special, 
            consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, 
            or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of the Service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Changes to Terms</h2>
          <p className="mb-6 text-gray-700">
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes through 
            the Service or by other means. Your continued use of the Service after such modifications constitutes your 
            acceptance of the modified Terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Governing Law</h2>
          <p className="mb-6 text-gray-700">
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Miniplex 
            operates, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="text-blue-600 mt-2">
            Email: legal@miniplex.com<br />
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;