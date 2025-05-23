import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Venue, DbVenue, mapDbVenueToVenue } from "@/types/supabase";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const AdminPanel = () => {
  const { user } = useAuth();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [venueName, setVenueName] = useState("");
  const [venueSport, setVenueSport] = useState("");
  const [venueDescription, setVenueDescription] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venuePrice, setVenuePrice] = useState("");
  const [venueImageUrl, setVenueImageUrl] = useState("");
  const [venueFacilities, setVenueFacilities] = useState([
    { name: "WiFi", available: false },
    { name: "Changing Rooms", available: false },
    { name: "Parking", available: false },
    { name: "Equipment Rental", available: false },
    { name: "Floodlights", available: false },
  ]);
  const [venueTimeSlots, setVenueTimeSlots] = useState([
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
  ]);

  // Preset venues for quick addition
  const presetVenues = [
    {
      name: "Central Stadium",
      sport: "Football",
      address: "123 Main Street, Sportsville",
      price: "$120",
      description: "Professional football stadium with natural grass pitch",
      image_url: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1974",
      facilities: [
        { name: "Changing Rooms", available: true },
        { name: "Parking", available: true },
        { name: "Floodlights", available: true },
        { name: "Equipment Rental", available: false },
        { name: "WiFi", available: true },
      ],
      time_slots: [
        "09:00 - 11:00",
        "11:00 - 13:00",
        "13:00 - 15:00",
        "15:00 - 17:00",
        "17:00 - 19:00",
        "19:00 - 21:00",
      ],
      status: "active",
    },
    {
      name: "Tennis Center",
      sport: "Tennis",
      address: "45 Court Avenue, Sportsville",
      price: "$80",
      description: "Premium tennis courts with professional surfaces",
      image_url: "https://images.unsplash.com/photo-1622279457486-28f93deb45e6?q=80&w=2070",
      facilities: [
        { name: "Changing Rooms", available: true },
        { name: "Parking", available: true },
        { name: "Equipment Rental", available: true },
        { name: "Coaching", available: true },
        { name: "WiFi", available: true },
      ],
      time_slots: [
        "08:00 - 09:00",
        "09:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 14:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00",
        "17:00 - 18:00",
        "18:00 - 19:00",
        "19:00 - 20:00",
      ],
      status: "active",
    },
    {
      name: "Basketball Arena",
      sport: "Basketball",
      address: "78 Hoop Street, Sportsville",
      price: "$100",
      description: "Indoor basketball court with professional flooring",
      image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090",
      facilities: [
        { name: "Changing Rooms", available: true },
        { name: "Parking", available: true },
        { name: "Air Conditioning", available: true },
        { name: "Equipment Rental", available: true },
        { name: "Refreshments", available: true },
      ],
      time_slots: [
        "10:00 - 12:00",
        "12:00 - 14:00",
        "14:00 - 16:00",
        "16:00 - 18:00",
        "18:00 - 20:00",
        "20:00 - 22:00",
      ],
      status: "active",
    },
  ];

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Map the database venues to application venues
      const mappedVenues: Venue[] = (data || []).map((venue: DbVenue) => mapDbVenueToVenue(venue));
      setVenues(mappedVenues);
    } catch (error) {
      console.error('Error fetching venues:', error);
      toast.error("Failed to load venues");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPresetVenues = async () => {
    try {
      setIsLoading(true);
      
      // Convert the facilities and time_slots arrays to JSON strings for storage
      const venuesWithSerializedData = presetVenues.map(venue => ({
        ...venue,
        facilities: JSON.stringify(venue.facilities),
        time_slots: JSON.stringify(venue.time_slots)
      }));
      
      const { data, error } = await supabase
        .from('venues')
        .insert(venuesWithSerializedData)
        .select();
      
      if (error) throw error;
      
      toast.success("Preset venues have been added.");
      
      // Refresh venues
      fetchVenues();
    } catch (error: any) {
      console.error('Error adding preset venues:', error);
      toast.error(error.message || "Failed to add preset venues.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateVenue = async (venue: Venue) => {
    try {
      setIsLoading(true);
      
      // Convert the facilities and time_slots arrays to JSON strings for storage
      const venueWithSerializedData = {
        ...venue,
        facilities: JSON.stringify(venue.facilities),
        time_slots: JSON.stringify(venue.time_slots)
      };
      
      const { error } = await supabase
        .from('venues')
        .update(venueWithSerializedData)
        .eq('id', venue.id);
      
      if (error) throw error;
      
      toast.success("Venue has been updated successfully.");
      
      // Refresh venues
      fetchVenues();
    } catch (error: any) {
      console.error('Error updating venue:', error);
      toast.error(error.message || "Failed to update venue.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateVenue = async () => {
    if (!user) return;
    
    try {
      if (!venueName.trim() || !venueSport.trim() || !venueAddress.trim() || !venuePrice.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      const newVenue = {
        name: venueName,
        sport: venueSport,
        address: venueAddress,
        price: venuePrice,
        description: venueDescription,
        image_url: venueImageUrl,
        facilities: JSON.stringify(venueFacilities),
        time_slots: JSON.stringify(venueTimeSlots),
        status: "active"
      };
      
      const { data, error } = await supabase
        .from('venues')
        .insert([newVenue])
        .select();
      
      if (error) throw error;
      
      toast.success("Venue created successfully");
      
      if (data && data.length > 0) {
        const createdVenue = mapDbVenueToVenue(data[0] as DbVenue);
        setVenues(prev => [createdVenue, ...prev]);
        setIsCreateDialogOpen(false);
        resetForm();
      }
      
    } catch (error: any) {
      console.error('Error creating venue:', error);
      toast.error(error.message || "Failed to create venue");
    }
  };

  const toggleFacility = (index: number) => {
    const updatedFacilities = [...venueFacilities];
    updatedFacilities[index].available = !updatedFacilities[index].available;
    setVenueFacilities(updatedFacilities);
  };

  const resetForm = () => {
    setVenueName("");
    setVenueSport("");
    setVenueDescription("");
    setVenueAddress("");
    setVenuePrice("");
    setVenueImageUrl("");
    setVenueFacilities([
      { name: "WiFi", available: false },
      { name: "Changing Rooms", available: false },
      { name: "Parking", available: false },
      { name: "Equipment Rental", available: false },
      { name: "Floodlights", available: false },
    ]);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Admin Panel</CardTitle>
          <CardDescription>
            Manage venues and bookings for your sports platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Create New Venue
            </Button>
            <Button variant="outline" onClick={handleAddPresetVenues}>
              Add Preset Venues
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center">Loading venues...</div>
          ) : venues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <div key={venue.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-semibold">{venue.name}</h3>
                  <p className="text-gray-600">Sport: {venue.sport}</p>
                  <p className="text-gray-600">Address: {venue.address}</p>
                  <p className="text-gray-600">Price: {venue.price}</p>
                  <p className="text-gray-500 mt-2">
                    Status: {venue.status}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              No venues found. Create one to get started!
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create a New Venue</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new venue.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Venue Name
              </Label>
              <Input
                id="name"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sport" className="text-right">
                Sport
              </Label>
              <Input
                id="sport"
                value={venueSport}
                onChange={(e) => setVenueSport(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={venueAddress}
                onChange={(e) => setVenueAddress(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                value={venuePrice}
                onChange={(e) => setVenuePrice(e.target.value)}
                className="col-span-3"
                placeholder="e.g. $100 per hour"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                value={venueImageUrl}
                onChange={(e) => setVenueImageUrl(e.target.value)}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={venueDescription}
                onChange={(e) => setVenueDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Facilities</Label>
              <div className="col-span-3 space-y-2">
                {venueFacilities.map((facility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`facility-${index}`}
                      checked={facility.available}
                      onChange={() => toggleFacility(index)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={`facility-${index}`}>{facility.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleCreateVenue}>Create Venue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
