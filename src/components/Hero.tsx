
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1473&auto=format&fit=crop" 
          alt="Sports turf at sunset" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-purple-900/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight mb-6"
                style={{
                  textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  transform: 'perspective(1000px) translateZ(20px)',
                  transformStyle: 'preserve-3d'
                }}
            >
              Play Your Game in <span className="text-purple-300">Rajkot!</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg"
               style={{
                 textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                 transform: 'perspective(1000px) translateZ(10px)',
                 transformStyle: 'preserve-3d'
               }}
            >
              Book turfs, pickleball courts, volleyball courts, and more in your city with ease. 
              Join teams, organize matches and enjoy your favorite sport.
            </p>
            <div className="flex flex-col sm:flex-row gap-4"
                 style={{
                   transform: 'perspective(1000px) translateZ(30px)',
                   transformStyle: 'preserve-3d'
                 }}
            >
              <Link to="/book">
                <Button 
                  size="lg" 
                  className="bg-sport-purple hover:bg-sport-purple-dark btn-effect shadow-lg shadow-purple-900/50 px-8 py-6 transform transition-all hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateX(5deg)',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 10px 25px -5px rgba(128, 90, 213, 0.4)'
                  }}
                >
                  Book Now
                </Button>
              </Link>
              <Link to="/events">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-sport-purple btn-effect px-8 py-6 transform transition-all hover:scale-105"
                  style={{
                    transform: 'perspective(1000px) rotateX(5deg)',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Explore Events
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative"
               style={{
                 transform: 'perspective(1000px) rotateY(-5deg) translateZ(50px)',
                 transformStyle: 'preserve-3d'
               }}
          >
            <div className="w-full h-[350px] md:h-[400px] lg:h-[450px] rounded-lg overflow-hidden shadow-2xl transform rotate-2 animate-float"
                 style={{
                   boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                   transform: 'perspective(1000px) rotateY(-5deg)',
                   transformStyle: 'preserve-3d'
                 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1511886929837-354984b71424?q=80&w=1470" 
                alt="Cricket players on field" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 hidden md:block"
                 style={{
                   transform: 'perspective(1000px) translateZ(70px)',
                   transformStyle: 'preserve-3d'
                 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <p className="text-sport-purple font-semibold">Instantly Book</p>
                <p className="text-sm text-gray-600">No waiting, just play!</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 hidden md:block"
                 style={{
                   transform: 'perspective(1000px) translateZ(40px)',
                   transformStyle: 'preserve-3d'
                 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <p className="text-sport-purple font-semibold">100+ Venues</p>
                <p className="text-sm text-gray-600">Find your perfect spot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
