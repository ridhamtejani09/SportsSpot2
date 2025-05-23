
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

type TablesWithRelations = "venues" | "articles" | "bookings" | "events" | "profiles" | "teams";
type FilterOperator = "eq" | "neq" | "gt" | "lt" | "gte" | "lte" | "like" | "ilike";

interface UseSupabaseQueryOptions<T> {
  limit?: number;
  orderBy?: keyof T;
  ascending?: boolean;
  filter?: {
    column: keyof T;
    operator: FilterOperator;
    value: any;
  };
}

export function useSupabaseQuery<T>(
  tableName: TablesWithRelations,
  options: UseSupabaseQueryOptions<T> = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let query = supabase.from(tableName).select("*");

        if (options.filter) {
          const { column, operator, value } = options.filter;
          query = query.filter(column as string, operator, value);
        }

        if (options.orderBy) {
          query = query.order(options.orderBy as string, {
            ascending: options.ascending ?? false,
          });
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data: resultData, error: resultError } = await query;

        if (resultError) {
          setError(resultError);
        } else {
          setData(resultData as T[]);
        }
      } catch (err) {
        console.error("Error in useSupabaseQuery:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tableName, JSON.stringify(options)]);

  return { data, error, isLoading };
}

export default useSupabaseQuery;
