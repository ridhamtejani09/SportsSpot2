
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Team, TeamMember, DbTeam, mapDbTeamToTeam } from "@/types/supabase";
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

const TeamHub = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamSport, setTeamSport] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Map the database teams to application teams
        const mappedTeams: Team[] = (data || []).map((team: DbTeam) => mapDbTeamToTeam(team));
        setTeams(mappedTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
        toast.error("Failed to load teams");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeams();
  }, [user]);

  const handleCreateTeam = async () => {
    if (!user) return;
    
    try {
      if (!teamName.trim() || !teamSport.trim()) {
        toast.error("Please enter team name and sport");
        return;
      }
      
      // Get the user's name from metadata
      const firstName = user.user_metadata?.first_name || '';
      const lastName = user.user_metadata?.last_name || '';
      const userName = `${firstName} ${lastName}`.trim();
      
      const newTeam = {
        name: teamName,
        sport: teamSport,
        description: teamDescription,
        created_by: user.id,
        members: JSON.stringify([
          {
            id: user.id, 
            name: userName || 'Team Member',
            role: "Owner"
          }
        ])
      };
      
      const { data, error } = await supabase
        .from('teams')
        .insert([newTeam])
        .select();
      
      if (error) throw error;
      
      toast.success("Team created successfully");
      
      if (data && data.length > 0) {
        const createdTeam = mapDbTeamToTeam(data[0] as DbTeam);
        setTeams((prev) => [createdTeam, ...prev]);
        setIsCreateDialogOpen(false);
        resetForm();
      }
      
    } catch (error: any) {
      console.error('Error creating team:', error);
      toast.error(error.message || "Failed to create team");
    }
  };

  const resetForm = () => {
    setTeamName("");
    setTeamSport("");
    setTeamDescription("");
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your Teams</CardTitle>
          <CardDescription>
            Manage and create your sports teams here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center">Loading teams...</div>
          ) : teams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div key={team.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-semibold">{team.name}</h3>
                  <p className="text-gray-600">Sport: {team.sport}</p>
                  <p className="text-gray-500">
                    Members: {team.members?.length || 0}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              No teams found. Create one to get started!
            </div>
          )}

          <Button onClick={() => setIsCreateDialogOpen(true)} className="mt-6">
            Create New Team
          </Button>
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a New Team</DialogTitle>
            <DialogDescription>
              Fill in the details below to create your team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Team Name
              </Label>
              <Input
                id="name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sport" className="text-right">
                Sport
              </Label>
              <Input
                id="sport"
                value={teamSport}
                onChange={(e) => setTeamSport(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleCreateTeam}>Create Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamHub;
