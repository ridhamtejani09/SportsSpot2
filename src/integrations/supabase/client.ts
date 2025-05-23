
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kgvqqcutogodycrvhvpn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtndnFxY3V0b2dvZHljcnZodnBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzU4NTUsImV4cCI6MjA2MzUxMTg1NX0.kG9mgjWy3vyx9hLdV-3QosGIvRPXJm9k9cXixowUwBE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

// Utility functions to handle JSON parsing
export const parseJsonArray = <T>(jsonValue: unknown): T[] => {
  if (typeof jsonValue === 'string') {
    try {
      return JSON.parse(jsonValue) as T[];
    } catch (error) {
      return [] as T[];
    }
  } else if (Array.isArray(jsonValue)) {
    return jsonValue as T[];
  }
  return [] as T[];
};

export const parseJsonFacilities = (facilities: unknown): Facility[] => {
  return parseJsonArray<Facility>(facilities);
};

export const parseJsonTimeSlots = (timeSlots: unknown): string[] => {
  return parseJsonArray<string>(timeSlots);
};

// Type for Facility used in our app
export type Facility = {
  name: string;
  available: boolean;
};
