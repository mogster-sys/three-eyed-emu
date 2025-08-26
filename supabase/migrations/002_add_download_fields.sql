-- Simple migration to add download management fields to existing tables
-- This works with your existing Supabase structure

-- Add download-related columns to apps table (if they don't exist)
ALTER TABLE apps ADD COLUMN IF NOT EXISTS file_url TEXT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS file_size BIGINT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS version TEXT DEFAULT '1.0.0';
ALTER TABLE apps ADD COLUMN IF NOT EXISTS platforms JSONB DEFAULT '["android", "ios", "web"]'::jsonb;

-- Add download tracking to purchases table (if they don't exist)
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS download_url TEXT;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS download_token TEXT;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS download_expires_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS max_downloads INTEGER DEFAULT 5;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_purchases_download_token ON purchases(download_token);

-- Simple function to check if a download is valid
CREATE OR REPLACE FUNCTION check_download_validity(p_token TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  purchase purchases;
BEGIN
  -- Get purchase by token
  SELECT * INTO purchase FROM purchases 
  WHERE download_token = p_token
  LIMIT 1;
  
  -- Check if found
  IF purchase IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if expired
  IF purchase.download_expires_at IS NOT NULL AND purchase.download_expires_at < NOW() THEN
    RETURN FALSE;
  END IF;
  
  -- Check download limit
  IF purchase.download_count >= COALESCE(purchase.max_downloads, 5) THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download(p_token TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE purchases 
  SET download_count = COALESCE(download_count, 0) + 1
  WHERE download_token = p_token;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;