
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "default", // Changed from "success" to "default"
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-b from-sport-purple to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-purple-100 max-w-2xl">
              Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out directly.
            </p>
          </div>
        </section>
        
        <section className="py-16 bg-sport-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-montserrat font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      placeholder="Enter your full name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="Enter your email address" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      placeholder="Enter your phone number" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="message">Your Message</Label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5} 
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                      placeholder="Tell us what you need help with"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-sport-purple hover:bg-sport-purple-dark btn-effect"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-montserrat font-bold mb-6">Contact Information</h2>
                <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <MapPin size={24} className="mr-4 text-sport-purple flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">Address</h3>
                        <address className="not-italic text-gray-600">
                          SportsSpot HQ<br />
                          Race Course Road, Near Aaji Dam<br />
                          Rajkot, Gujarat 360001
                        </address>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Phone size={24} className="mr-4 text-sport-purple flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">Phone</h3>
                        <p className="text-gray-600">+91 98765 43210</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Mail size={24} className="mr-4 text-sport-purple flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <p className="text-gray-600">support@sportsspot.in</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock size={24} className="mr-4 text-sport-purple flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg">Working Hours</h3>
                        <p className="text-gray-600">Monday - Saturday: 9 AM - 8 PM</p>
                        <p className="text-gray-600">Sunday: 10 AM - 6 PM</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-xl overflow-hidden h-64">
                  <iframe 
                    title="SportsSpot Location"
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59520.38737892788!2d70.73915069235474!3d22.29333974187372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1683611739410!5m2!1sen!2sin" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
