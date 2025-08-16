import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/lib/types';

type App = Database['public']['Tables']['apps']['Row'];

export const useApps = () => {
  return useQuery({
    queryKey: ['apps'],
    queryFn: async () => {
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
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as App;
    },
    enabled: !!slug,
  });
};

export const useFeaturedApps = () => {
  return useQuery({
    queryKey: ['apps', 'featured'],
    queryFn: async () => {
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