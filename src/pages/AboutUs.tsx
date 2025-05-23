
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-sport-light">
        <section className="py-12 bg-gradient-to-b from-sport-purple to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-2">
              About SportsSpot
            </h1>
            <p className="text-purple-100 max-w-2xl">
              Your one-stop solution for sports venue booking in Rajkot
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-6 text-gray-800">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2025, SportsSpot was born from a simple observation: finding and booking sports venues in Rajkot was unnecessarily complicated. Our founders, passionate sports enthusiasts themselves, wanted to create a seamless solution that connects players with venues.
                  </p>
                  <p>
                    What started as a small directory of cricket grounds has now expanded to include a variety of sports facilities including volleyball courts, pickleball arenas, and more across the city.
                  </p>
                  <p>
                    Today, SportsSpot is the leading sports venue booking platform in Rajkot, helping thousands of sports enthusiasts find and book their perfect playing spot with just a few clicks.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2069" 
                  alt="Sports team celebrating" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-5 -left-5 bg-sport-purple text-white p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-semibold">5000+</p>
                  <p className="text-sm">Happy Players</p>
                </div>
              </div>
            </div>
            
            <div className="mt-24">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-12 text-center text-gray-800">
                Our Mission & Values
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-sport-purple h-12 w-12 rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold">1</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Accessibility</h3>
                  <p className="text-gray-600">
                    We believe sports should be accessible to everyone. Our platform makes it easy to find affordable venues suited to all skill levels.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-sport-purple h-12 w-12 rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold">2</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Community</h3>
                  <p className="text-gray-600">
                    SportsSpot is more than a booking platform; it's a community of sports lovers who connect, compete, and celebrate together.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-sport-purple h-12 w-12 rounded-full flex items-center justify-center mb-6 text-white text-2xl font-bold">3</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Innovation</h3>
                  <p className="text-gray-600">
                    We continuously improve our platform with new features and venues to enhance the sporting experience for all our users.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-24">
              <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-12 text-center text-gray-800">
                Meet Our Team
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" 
                      alt="Team Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-800">Priya Sharma</h3>
                  <p className="text-sport-purple font-medium">CEO & Founder</p>
                </div>
                
                <div className="text-center">
                  <div className="mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" 
                      alt="Team Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-800">Rahul Patel</h3>
                  <p className="text-sport-purple font-medium">Head of Operations</p>
                </div>
                
                <div className="text-center">
                  <div className="mb-4 relative mx-auto w-40 h-40 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976" 
                      alt="Team Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-800">Maya Desai</h3>
                  <p className="text-sport-purple font-medium">Community Manager</p>
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

export default AboutUs;
