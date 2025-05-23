
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-sport-light">
        <section className="py-12 bg-gradient-to-b from-sport-purple to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-2">
              Terms of Service
            </h1>
            <p className="text-purple-100 max-w-2xl">
              Please read these terms carefully before using SportsSpot
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Acceptance of Terms</h2>
                  <p className="text-gray-600">
                    By accessing or using SportsSpot, you agree to be bound by these Terms of Service. If you do not agree to all the terms, please do not access or use our services.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">2. Use of Services</h2>
                  <p className="text-gray-600 mb-4">
                    SportsSpot provides a platform for users to discover, book, and pay for sports venues. When you book a venue through our platform, you enter into an agreement with the venue owner, not with SportsSpot.
                  </p>
                  <p className="text-gray-600">
                    You agree to use our services only for lawful purposes and in a manner that does not infringe the rights of any third party.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">3. Account Registration</h2>
                  <p className="text-gray-600 mb-4">
                    To use certain features of our services, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                  </p>
                  <p className="text-gray-600">
                    You agree to provide accurate and complete information when creating an account and to update your information to keep it accurate and current.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Booking and Cancellation</h2>
                  <p className="text-gray-600 mb-4">
                    When you make a booking through SportsSpot, you agree to pay the full amount specified. Cancellation policies vary by venue and are specified at the time of booking.
                  </p>
                  <p className="text-gray-600">
                    SportsSpot reserves the right to cancel bookings at its discretion, including but not limited to cases of suspected fraud, technical errors, or venue unavailability.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">5. Payment Terms</h2>
                  <p className="text-gray-600">
                    Payments for bookings are processed securely through our payment providers. By making a payment, you authorize us to charge the specified amount to your selected payment method.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">6. User Conduct</h2>
                  <p className="text-gray-600 mb-4">
                    You agree not to use our services to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Harass, abuse, or harm another person</li>
                    <li>Impersonate any person or entity</li>
                    <li>Engage in any fraudulent or illegal activity</li>
                    <li>Upload or transmit viruses or other malicious code</li>
                    <li>Interfere with the proper functioning of our services</li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">7. Limitation of Liability</h2>
                  <p className="text-gray-600">
                    SportsSpot is not liable for any injury, loss, or damage that may occur during the use of venues booked through our platform. Users participate in sports and activities at their own risk.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">8. Changes to Terms</h2>
                  <p className="text-gray-600">
                    SportsSpot reserves the right to modify these Terms of Service at any time. We will notify users of significant changes by updating the date at the top of this page or by other means as determined by SportsSpot.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">9. Contact Information</h2>
                  <p className="text-gray-600">
                    If you have any questions about these Terms of Service, please contact us at support@sportsspot.com.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Last updated: May 23, 2025
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
