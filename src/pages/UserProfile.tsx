import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, User, Key, History, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Booking, DbBooking, mapDbBookingToBooking } from "@/types/supabase";
import BookingDetails from "@/components/BookingDetails";
import { toast } from "sonner";

const UserProfile = () => {
  const { toast: toastHook } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) throw profileError;
        
        if (profile) {
          setProfileData({
            name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
            email: profile.email || user.email || '',
            phone: profile.phone || '',
          });
        }
        
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            venue:venues(*)
          `)
          .eq('user_id', user.id)
          .order('date', { ascending: false });
        
        if (bookingsError) throw bookingsError;
        
        const mappedBookings = (bookingsData || []).map((booking: DbBooking) => 
          mapDbBookingToBooking(booking)
        );
        setBookings(mappedBookings);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    setIsUpdating(true);
    
    try {
      const nameParts = profileData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ');
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone: profileData.phone,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toastHook({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toastHook({
        title: "Update Failed",
        description: error.message || "There was a problem updating your profile.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toastHook({
        title: "Passwords don't match",
        description: "Your new password and confirm password must match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });
      
      if (error) throw error;
      
      toastHook({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error('Error changing password:', error);
      toastHook({
        title: "Password Change Failed",
        description: error.message || "There was a problem changing your password.",
        variant: "destructive"
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user?.id);
      
      if (error) throw error;
      
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' } 
            : booking
        )
      );
      
      toast("Booking cancelled successfully", {
        description: "You have successfully cancelled your booking",
        duration: 3000
      });
    } catch (error: any) {
      console.error('Error cancelling booking:', error);
      toast("Failed to cancel booking", {
        description: error.message || "An error occurred",
        variant: "destructive"
      });
    }
  };
  
  const openBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsBookingDetailsOpen(true);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-sport-light">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sport-purple"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-sport-light">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
            <Link to="/login">
              <Button className="bg-sport-purple hover:bg-sport-purple-dark">Login</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-sport-light">
        <section className="py-12 bg-gradient-to-b from-sport-purple to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-2">
              My Profile
            </h1>
            <p className="text-purple-100 max-w-2xl">
              Manage your account details, booking history, and preferences.
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/4">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-sport-purple flex items-center justify-center text-white text-3xl font-bold mb-3">
                      {profileData.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <h2 className="text-xl font-semibold">{profileData.name}</h2>
                    <p className="text-gray-600">{profileData.email}</p>
                  </div>
                  
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Bookings:</span>
                      <span className="font-medium">{bookings.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upcoming Bookings:</span>
                      <span className="font-medium">{
                        bookings.filter(b => 
                          (b.status === "confirmed" || b.status === "pending") && 
                          new Date(b.date) >= new Date()
                        ).length
                      }</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Teams Joined:</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member Since:</span>
                      <span className="font-medium">{
                        new Date().toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        })
                      }</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/4">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                    <CardDescription>
                      View and update your account details, bookings, and security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="bookings">
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="bookings" className="flex items-center gap-1">
                          <History size={16} /> Bookings
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="flex items-center gap-1">
                          <User size={16} /> Profile
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center gap-1">
                          <Key size={16} /> Security
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="bookings" className="space-y-6">
                        <h3 className="text-lg font-semibold">Your Booking History</h3>
                        
                        {bookings.length > 0 ? (
                          <div className="space-y-4">
                            {bookings.map((booking) => (
                              <Card key={booking.id} className="overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                  <div className="p-4 md:p-6 flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-semibold text-lg">{booking.venue?.name || 'Venue'}</h4>
                                        <div className="flex items-center text-sm text-gray-600">
                                          <MapPin size={14} className="mr-1" />{booking.venue?.address || 'Address unavailable'}
                                        </div>
                                      </div>
                                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        booking.status === "confirmed" ? "bg-green-100 text-green-800" :
                                        booking.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                        booking.status === "completed" ? "bg-blue-100 text-blue-800" :
                                        "bg-red-100 text-red-800"
                                      }`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                      </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                                      <div>
                                        <span className="text-gray-600 block">Booking ID:</span>
                                        <span className="font-medium">{booking.id.substring(0, 8)}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600 block">Amount:</span>
                                        <span className="font-medium">{booking.amount}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Calendar size={14} className="mr-1 text-sport-purple" />
                                      <span>
                                        {new Date(booking.date).toLocaleDateString('en-US', {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric'
                                        })}, {booking.time_slot}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-row md:flex-col gap-2 p-4 bg-gray-50 justify-center">
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="text-gray-600 hover:text-gray-800"
                                      onClick={() => openBookingDetails(booking)}
                                    >
                                      View Details
                                    </Button>
                                    {(booking.status === "pending" || booking.status === "confirmed") && (
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300"
                                        onClick={() => handleCancelBooking(booking.id)}
                                      >
                                        Cancel
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
                            <Link to="/book">
                              <Button className="bg-sport-purple hover:bg-sport-purple-dark">
                                Book a Venue
                              </Button>
                            </Link>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="profile">
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold">Personal Information</h3>
                          
                          <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div className="grid w-full items-center gap-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input 
                                id="name" 
                                name="name"
                                value={profileData.name}
                                onChange={handleProfileChange}
                                placeholder="Enter your full name"
                              />
                            </div>
                            
                            <div className="grid w-full items-center gap-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input 
                                id="email" 
                                name="email"
                                type="email"
                                value={profileData.email}
                                onChange={handleProfileChange}
                                placeholder="Enter your email address"
                                disabled
                              />
                              <p className="text-xs text-gray-500">Email cannot be changed</p>
                            </div>
                            
                            <div className="grid w-full items-center gap-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input 
                                id="phone" 
                                name="phone"
                                value={profileData.phone}
                                onChange={handleProfileChange}
                                placeholder="Enter your phone number"
                              />
                            </div>
                            
                            <div className="pt-2">
                              <Button 
                                type="submit" 
                                className="bg-sport-purple hover:bg-sport-purple-dark"
                                disabled={isUpdating}
                              >
                                {isUpdating ? "Updating..." : "Update Profile"}
                              </Button>
                            </div>
                          </form>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="security">
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold">Change Password</h3>
                          
                          <form onSubmit={handlePasswordUpdate} className="space-y-4">
                            <div className="grid w-full items-center gap-2">
                              <Label htmlFor="currentPassword">Current Password</Label>
                              <Input 
                                id="currentPassword" 
                                name="currentPassword"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                placeholder="Enter your current password"
                                required
                              />
                            </div>
                            
                            <div className="grid w-full items-center gap-2">
                              <Label htmlFor="newPassword">New Password</Label>
                              <Input 
                                id="newPassword" 
                                name="newPassword"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                placeholder="Enter your new password"
                                required
                              />
                            </div>
                            
                            <div className="grid w-full items-center gap-2">
                              <Label htmlFor="confirmPassword">Confirm New Password</Label>
                              <Input 
                                id="confirmPassword" 
                                name="confirmPassword"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                placeholder="Confirm your new password"
                                required
                              />
                            </div>
                            
                            <div className="pt-2">
                              <Button 
                                type="submit" 
                                className="bg-sport-purple hover:bg-sport-purple-dark"
                                disabled={isChangingPassword}
                              >
                                {isChangingPassword ? "Updating..." : "Change Password"}
                              </Button>
                            </div>
                          </form>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      <BookingDetails 
        booking={selectedBooking}
        isOpen={isBookingDetailsOpen}
        onClose={() => setIsBookingDetailsOpen(false)}
        onCancel={handleCancelBooking}
      />
    </div>
  );
};

export default UserProfile;
