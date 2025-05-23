import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { setupAdminPrivileges } from '@/integrations/supabase/setupAdmin';
import { setupSampleData } from '@/integrations/supabase/setupSampleData';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminSetup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingUpData, setIsSettingUpData] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await setupAdminPrivileges(email);
      toast({
        title: "Success",
        description: "Admin privileges have been set up successfully.",
      });
      navigate('/admin');
    } catch (error: any) {
      console.error('Error setting up admin:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to set up admin privileges.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupSampleData = async () => {
    setIsSettingUpData(true);
    try {
      await setupSampleData();
      toast({
        title: "Success",
        description: "Sample data has been set up successfully.",
      });
    } catch (error: any) {
      console.error('Error setting up sample data:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to set up sample data.",
        variant: "destructive",
      });
    } finally {
      setIsSettingUpData(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-sport-light py-12">
        <div className="container max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-montserrat font-bold mb-2">Admin Setup</h1>
              <p className="text-gray-600">Set up admin privileges and sample data</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter user's email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sport-purple hover:bg-sport-purple-dark btn-effect"
                disabled={isLoading}
              >
                {isLoading ? "Setting up..." : "Setup Admin"}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t">
              <Button 
                onClick={handleSetupSampleData}
                className="w-full bg-green-600 hover:bg-green-700 btn-effect"
                disabled={isSettingUpData}
              >
                {isSettingUpData ? "Setting up sample data..." : "Setup Sample Data"}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminSetup; 