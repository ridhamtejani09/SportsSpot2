
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Coffee, Car, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Define venue type
type Venue = {
  id: number;
  name: string;
  sport: string;
  address: string;
  price: string;
  slots: string[];
  facilities: string[];
  image: string;
};

const venues: Venue[] = [
  {
    id: 1,
    name: "Rajkot Turf Hub",
    sport: "Cricket",
    address: "Near Aji Dam, Rajkot",
    price: "₹1200/hr",
    slots: ["10 AM - 12 PM", "2 PM - 4 PM", "6 PM - 8 PM"],
    facilities: ["Café", "Parking", "Changing Rooms"],
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1470",
  },
  {
    id: 2,
    name: "Pickleball Arena",
    sport: "Pickleball",
    address: "Kalawad Road, Rajkot",
    price: "₹900/hr",
    slots: ["9 AM - 11 AM", "2 PM - 4 PM", "5 PM - 7 PM"],
    facilities: ["Sitting Area", "Equipment Rental", "Coaching"],
    image: "https://images.unsplash.com/photo-1627148347266-345a23f14fc6?q=80&w=1470",
  },
  {
    id: 3,
    name: "VolleyStar Grounds",
    sport: "Volleyball",
    address: "Ring Road, Rajkot",
    price: "₹1000/hr",
    slots: ["5 PM - 7 PM", "7 PM - 9 PM"],
    facilities: ["Café", "Parking", "Night Lights"],
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1507",
  },
];

const FeaturedVenues = () => {
  return (
    <section className="py-16 bg-sport-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            Featured Venues in Rajkot
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the best sports facilities in your city. Book instantly and get playing!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <Card key={venue.id} className="overflow-hidden shadow-lg card-hover border-0">
              <div className="h-48 overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold">{venue.name}</CardTitle>
                  <span className="text-lg font-semibold text-sport-purple">{venue.price}</span>
                </div>
                <CardDescription>
                  <div className="flex flex-col">
                    <span className="font-medium">{venue.sport}</span>
                    <span className="flex items-center text-gray-500 mt-1">
                      <MapPin size={16} className="mr-1" /> {venue.address}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2 flex items-center">
                    <Calendar size={16} className="mr-1 text-sport-purple" /> Available Slots
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {venue.slots.map((slot, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-50 text-sport-purple rounded-full text-xs">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {venue.facilities.map((facility, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs flex items-center">
                        {facility === "Café" && <Coffee size={12} className="mr-1" />}
                        {facility === "Parking" && <Car size={12} className="mr-1" />}
                        {facility === "Sitting Area" && <Users size={12} className="mr-1" />}
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-sport-purple hover:bg-sport-purple-dark btn-effect">
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/book">
            <Button variant="outline" className="border-2 border-sport-purple text-sport-purple hover:bg-sport-purple hover:text-white btn-effect px-6">
              View All Venues
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVenues;
