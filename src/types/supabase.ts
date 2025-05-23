import { Json } from "@/integrations/supabase/types";
import { parseJsonFacilities, parseJsonTimeSlots, parseJsonArray } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
}

export interface Venue {
  id: string;
  name: string;
  sport: string;
  address: string;
  price: string;
  description: string | null;
  image_url: string | null;
  facilities: Facility[];
  time_slots: string[];
  created_at: string;
  status: string;
}

export interface DbVenue {
  id: string;
  name: string;
  sport: string;
  address: string;
  price: string;
  description: string | null;
  image_url: string | null;
  facilities: Json;
  time_slots: Json;
  created_at: string;
  status: string;
}

export const mapDbVenueToVenue = (dbVenue: DbVenue): Venue => {
  return {
    ...dbVenue,
    facilities: parseJsonFacilities(dbVenue.facilities),
    time_slots: parseJsonTimeSlots(dbVenue.time_slots),
  };
};

export interface Facility {
  name: string;
  available: boolean;
}

export interface Booking {
  id: string;
  venue_id: string;
  user_id: string;
  date: string;
  time_slot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | string;
  amount: string;
  created_at: string;
  notes: string | null;
  venue?: Venue;
}

export interface DbBooking {
  id: string;
  venue_id: string;
  user_id: string;
  date: string;
  time_slot: string;
  status: string;
  amount: string;
  created_at: string;
  notes: string | null;
  venue?: DbVenue;
}

export const mapDbBookingToBooking = (dbBooking: DbBooking): Booking => {
  return {
    ...dbBooking,
    venue: dbBooking.venue ? mapDbVenueToVenue(dbBooking.venue) : undefined,
  };
};

export interface Team {
  id: string;
  name: string;
  sport: string;
  description: string | null;
  image_url: string | null;
  created_by: string;
  created_at: string;
  members: TeamMember[];
}

export interface DbTeam {
  id: string;
  name: string;
  sport: string;
  description: string | null;
  image_url: string | null;
  created_by: string;
  created_at: string;
  members: Json;
}

export const mapDbTeamToTeam = (dbTeam: DbTeam): Team => {
  return {
    ...dbTeam,
    members: parseJsonArray<TeamMember>(dbTeam.members),
  };
};

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  url: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  participants: string;
  created_at: string;
}
