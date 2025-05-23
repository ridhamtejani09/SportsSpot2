import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar as CalendarIcon, Clock, DollarSign, Filter, Search } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Venue, Booking, DbVenue, mapDbVenueToVenue } from "@/types/supabase";
import VenueFacilityIcons from "@/components/VenueFacilityIcons";
import { toast } from "sonner";

const BookVenue = () => {
  const { user } = useAuth();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [filterSport, setFilterSport] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch all venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('venues')
          .select('*')
          .eq('status', 'active');
        
        if (error) throw error;
        
        const mappedVenues: Venue[] = (data || []).map((venue: DbVenue) => 
          mapDbVenueToVenue(venue)
        );
        
        setVenues(mappedVenues);
        setFilteredVenues(mappedVenues);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVenues();
  }, []);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...venues];
    
    // Filter by sport
    if (filterSport !== "all") {
      filtered = filtered.filter(venue => 
        venue.sport.toLowerCase() === filterSport.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(venue => 
        venue.name.toLowerCase().includes(query) || 
        venue.address.toLowerCase().includes(query) ||
        venue.description?.toLowerCase().includes(query)
      );
    }
    
    setFilteredVenues(filtered);
  }, [filterSport, searchQuery, venues]);
  
  const openBookingDialog = (venue: Venue) => {
    setSelectedVenue(venue);
    setSelectedTimeSlot("");
    setBookingNotes("");
    setIsBookingOpen(true);
  };
  
  const handleBooking = async () => {
    if (!user) {
      toast.error("Please log in to book a venue");
      return;
    }
    
    if (!selectedVenue || !selectedDate || !selectedTimeSlot) {
      toast.error("Please select a date and time slot");
      return;
    }
    
    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      // Calculate amount (for demo purposes)
      const amount = selectedVenue.price;
      
      const bookingData = {
        venue_id: selectedVenue.id,
        user_id: user.id,
        date: formattedDate,
        time_slot: selectedTimeSlot,
        status: 'pending',
        amount,
        notes: bookingNotes || null
      };
      
      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);
      
      if (error) throw error;
      
      toast.success("Booking submitted successfully! Awaiting confirmation.");
      setIsBookingOpen(false);
    } catch (error: any) {
      console.error('Error creating booking:', error);
      toast.error(error.message || "Failed to create booking");
    }
  };
  
  // Get unique sports for filter
  const uniqueSports = Array.from(new Set(venues.map(venue => venue.sport)));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-sport-light">
        <section className="py-12 bg-gradient-to-b from-sport-purple to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-2">
              Book Your Venue
            </h1>
            <p className="text-purple-100 max-w-2xl">
              Find and book the perfect sports venue for your next game
            </p>
          </div>
        </section>
        
        <section className="py-8 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by name, location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter size={18} className="text-gray-500" />
                <Select 
                  value={filterSport} 
                  onValueChange={setFilterSport}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sports</SelectItem>
                    {uniqueSports.map((sport) => (
                      <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sport-purple"></div>
              </div>
            ) : filteredVenues.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredVenues.map((venue) => (
                  <Card key={venue.id} className="overflow-hidden shadow-lg border-0 hover:shadow-xl transition-all">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/5 h-60 md:h-auto">
                        <img
                          src={venue.image_url || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1936"}
                          alt={venue.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-3/5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{venue.name}</h3>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin size={14} className="mr-1" />
                              <span>{venue.address}</span>
                            </div>
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold mb-3">
                              {venue.sport}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-sport-purple">{venue.price}</div>
                            <div className="text-xs text-gray-500">per hour</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">{venue.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold text-sm mb-2">Facilities</h4>
                          <VenueFacilityIcons facilities={venue.facilities} />
                        </div>
                        
                        <Button 
                          onClick={() => openBookingDialog(venue)}
                          className="w-full bg-sport-purple hover:bg-sport-purple-dark"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No venues found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book {selectedVenue?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border mx-auto"
              />
            </div>
            
            {selectedVenue && (
              <div className="space-y-2">
                <Label>Select Time Slot</Label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedVenue.time_slots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={selectedTimeSlot === slot ? "default" : "outline"}
                      className={selectedTimeSlot === slot ? "bg-sport-purple hover:bg-sport-purple-dark" : ""}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      <Clock size={14} className="mr-2" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements or requests?"
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-1">
                <DollarSign size={18} className="text-sport-purple" />
                <span className="font-semibold">Total:</span>
              </div>
              <span className="text-lg font-bold">{selectedVenue?.price}</span>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsBookingOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-sport-purple hover:bg-sport-purple-dark"
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTimeSlot}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookVenue;
