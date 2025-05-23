
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  participants: string;
}

const AllEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });
          
        if (error) {
          throw error;
        }
        
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-sport-light">
        <section className="py-12 bg-gradient-to-b from-sport-purple to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-2">
              Sports Events
            </h1>
            <p className="text-purple-100 max-w-2xl">
              Discover upcoming tournaments, training sessions, and sports events in Rajkot
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sport-purple"></div>
              </div>
            ) : events.length > 0 ? (
              <div className="space-y-8">
                {events.map((event) => (
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No events found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllEvents;
