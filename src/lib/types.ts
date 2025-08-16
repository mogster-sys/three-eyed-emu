export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      apps: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          thumbnail_url: string | null
          screenshots: Json
          features: Json
          app_store_links: Json
          price: number
          featured: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          thumbnail_url?: string | null
          screenshots?: Json
          features?: Json
          app_store_links?: Json
          price?: number
          featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          thumbnail_url?: string | null
          screenshots?: Json
          features?: Json
          app_store_links?: Json
          price?: number
          featured?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string | null
          app_id: string | null
          stripe_payment_id: string | null
          amount: number | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          app_id?: string | null
          stripe_payment_id?: string | null
          amount?: number | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          app_id?: string | null
          stripe_payment_id?: string | null
          amount?: number | null
          status?: string | null
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          company: string | null
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company?: string | null
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string | null
          message?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}