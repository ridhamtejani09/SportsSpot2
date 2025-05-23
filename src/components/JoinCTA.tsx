
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const JoinCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-sport-purple to-sport-purple-light">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
              Ready to Play? Join SportsSpot Today!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Create an account to book venues, join teams, and connect with other sports enthusiasts in Rajkot.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-sport-purple hover:bg-sport-purple-dark btn-effect px-8 py-6">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-2 border-sport-purple text-sport-purple hover:bg-sport-purple hover:text-white btn-effect px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCTA;
