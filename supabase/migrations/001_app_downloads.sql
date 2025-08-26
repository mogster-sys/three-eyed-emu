-- Create app_downloads table for managing download links and tracking
CREATE TABLE IF NOT EXISTS app_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  app_id UUID REFERENCES apps(id) ON DELETE CASCADE,
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  download_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  download_url TEXT,
  file_path TEXT, -- Storage path in Supabase bucket
  expires_at TIMESTAMP WITH TIME ZONE,
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 5, -- Limit downloads per purchase
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_downloaded_at TIMESTAMP WITH TIME ZONE
);

-- Create app_versions table to track different versions of apps
CREATE TABLE IF NOT EXISTS app_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  app_id UUID REFERENCES apps(id) ON DELETE CASCADE,
  version_number TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Path in storage bucket
  file_size BIGINT,
  file_type TEXT, -- apk, exe, dmg, etc.
  platform TEXT, -- android, ios, windows, mac, linux
  release_notes TEXT,
  min_os_version TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(app_id, version_number, platform)
);

-- Add columns to apps table for download management
ALTER TABLE apps ADD COLUMN IF NOT EXISTS current_version TEXT DEFAULT '1.0.0';
ALTER TABLE apps ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS file_size BIGINT;
ALTER TABLE apps ADD COLUMN IF NOT EXISTS platforms JSONB DEFAULT '["android", "ios", "web"]'::jsonb;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_app_downloads_user_id ON app_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_app_downloads_app_id ON app_downloads(app_id);
CREATE INDEX IF NOT EXISTS idx_app_downloads_token ON app_downloads(download_token);
CREATE INDEX IF NOT EXISTS idx_app_downloads_expires_at ON app_downloads(expires_at);
CREATE INDEX IF NOT EXISTS idx_app_versions_app_id ON app_versions(app_id);
CREATE INDEX IF NOT EXISTS idx_app_versions_active ON app_versions(is_active);

-- Row Level Security Policies
ALTER TABLE app_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_versions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own downloads
CREATE POLICY "Users can view own downloads" ON app_downloads
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create downloads after purchase
CREATE POLICY "Users can create downloads after purchase" ON app_downloads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own download records
CREATE POLICY "Users can update own downloads" ON app_downloads
  FOR UPDATE USING (auth.uid() = user_id);

-- Public can view active app versions
CREATE POLICY "Public can view active app versions" ON app_versions
  FOR SELECT USING (is_active = true);

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(download_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE app_downloads 
  SET 
    download_count = download_count + 1,
    last_downloaded_at = NOW()
  WHERE id = download_id;
  
  UPDATE apps 
  SET download_count = download_count + 1
  WHERE id = (SELECT app_id FROM app_downloads WHERE id = download_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if download is valid
CREATE OR REPLACE FUNCTION is_download_valid(token TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  download app_downloads;
BEGIN
  SELECT * INTO download FROM app_downloads 
  WHERE download_token = token;
  
  IF download IS NULL THEN
    RETURN FALSE;
  END IF;
  
  IF download.expires_at < NOW() THEN
    RETURN FALSE;
  END IF;
  
  IF download.download_count >= download.max_downloads THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;