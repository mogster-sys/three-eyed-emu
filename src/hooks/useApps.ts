import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseAvailable } from '@/integrations/supabase/client';
import { Database } from '@/lib/types';

type App = Database['public']['Tables']['apps']['Row'];

export const useApps = () => {
  return useQuery({
    queryKey: ['apps'],
    queryFn: async () => {
      if (!isSupabaseAvailable || !supabase) {
        // Frontend-only mode: return empty array
        return [] as App[];
      }
      
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as App[];
    },
  });
};

export const useApp = (slug: string) => {
  return useQuery({
    queryKey: ['app', slug],
    queryFn: async () => {
      if (!isSupabaseAvailable || !supabase) {
        throw new Error('Backend not available');
      }
      
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as App;
    },
    enabled: !!slug && isSupabaseAvailable,
  });
};

export const useFeaturedApps = () => {
  return useQuery({
    queryKey: ['apps', 'featured'],
    queryFn: async () => {
      if (!isSupabaseAvailable || !supabase) {
        // Frontend-only mode: return empty array
        return [] as App[];
      }
      
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('featured', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as App[];
    },
  });
};