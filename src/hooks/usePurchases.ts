import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type Purchase = Database['public']['Tables']['purchases']['Row'];

export const usePurchases = (userId?: string) => {
  return useQuery({
    queryKey: ['purchases', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID required');
      
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          apps:app_id (
            id,
            name,
            thumbnail_url,
            price
          )
        `)
        .eq('user_id', userId)
        .eq('status', 'completed');
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useCreatePurchase = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (purchase: Database['public']['Tables']['purchases']['Insert']) => {
      const { data, error } = await supabase
        .from('purchases')
        .insert(purchase)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      toast({
        title: "Purchase Created",
        description: "Your purchase has been recorded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase.",
        variant: "destructive",
      });
    },
  });
};