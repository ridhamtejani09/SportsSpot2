import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  participants: string;
}

const EventsSection = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [registrationStatus, setRegistrationStatus] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true })
          .limit(2);
          
        if (error) {
          throw error;
        }
        
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = (eventId: string, eventTitle: string) => {
    if (!user) {
      toast.error("Please log in to register for events");
      return;
    }
    
    // Simulate registration
    setRegistrationStatus(prev => ({
      ...prev,
      [eventId]: true
    }));
    
    toast.success(`Successfully registered for ${eventTitle}!`);
  };

  return (
    <section className="py-16 bg-sport-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join sports tournaments, training sessions, and competitions in Rajkot
          </p>
        </div>
        
        <div className="space-y-8">
          {events.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              No events found. Please check back later!
            </div>
          ) : (
            events.map((event) => (
              <Card key={event.id} className="overflow-hidden shadow-lg border-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-56 md:h-auto">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3 flex flex-col">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} className="text-sport-purple" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} className="text-sport-purple" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} className="text-sport-purple" />
                          <span>{event.participants}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Button
                        onClick={() => handleRegister(event.id, event.title)}
                        disabled={registrationStatus[event.id]}
                        className={`${
                          registrationStatus[event.id] 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "bg-sport-purple hover:bg-sport-purple-dark"
                        } btn-effect`}
                      >
                        {registrationStatus[event.id] ? "Registered" : "Register Now"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/events">
            <Button variant="outline" className="border-2 border-sport-purple text-sport-purple hover:bg-sport-purple hover:text-white btn-effect px-6">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
