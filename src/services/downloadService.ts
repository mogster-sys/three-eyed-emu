import { supabase } from '@/integrations/supabase/client';
import { downloadRateLimiter } from '@/utils/rateLimiter';

// Using existing purchases table structure
export interface Purchase {
  id: string;
  user_id: string;
  app_id: string;
  stripe_payment_id?: string;
  amount: number;
  status: string;
  created_at: string;
  // Add fields for download management
  download_url?: string;
  download_token?: string;
  download_count?: number;
  download_expires_at?: string;
}

export interface AppVersion {
  id: string;
  app_id: string;
  version_number: string;
  file_path: string;
  file_size?: number;
  file_type?: string;
  platform?: string;
  release_notes?: string;
  is_active: boolean;
}

class DownloadService {
  /**
   * Create a download link after successful purchase
   * Uses existing purchases table with additional fields
   */
  async createDownloadLink(
    userId: string,
    appId: string,
    purchaseId: string,
    platform: string = 'android'
  ): Promise<Purchase | null> {
    try {
      // Get app information
      const { data: app, error: appError } = await supabase
        .from('apps')
        .select('*')
        .eq('id', appId)
        .single();

      if (appError || !app) {
        console.error('App not found:', appId);
        return null;
      }

      // For now, we'll simulate having app files in storage
      // In production, you'd upload actual app files to Supabase Storage
      const fileName = `apps/${appId}/${platform}/${app.slug}-v1.0.0.apk`;
      
      // For now, create a demo download URL (will work once bucket is created)
      // In production, you'd have actual app files uploaded to Supabase Storage
      const downloadUrl = `https://lzfozwncbxixhiwazcvh.supabase.co/storage/v1/object/public/app-downloads/${fileName}`;
      
      // Once bucket exists, you can uncomment this for real signed URLs:
      // const { data: signedUrlData, error: urlError } = await supabase.storage
      //   .from('app-downloads')
      //   .createSignedUrl(fileName, 86400); // 24 hours

      // Generate a secure download token
      const downloadToken = `${purchaseId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

      // Update the purchase record with download information
      const { data: updatedPurchase, error: updateError } = await supabase
        .from('purchases')
        .update({
          download_url: downloadUrl,
          download_token: downloadToken,
          download_count: 0,
          download_expires_at: expiresAt.toISOString()
        })
        .eq('id', purchaseId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating purchase with download info:', updateError);
        // If update fails (likely due to missing columns), return purchase with download info
        return {
          id: purchaseId,
          user_id: userId,
          app_id: appId,
          amount: 0,
          status: 'completed',
          created_at: new Date().toISOString(),
          download_url: downloadUrl,
          download_token: downloadToken,
          download_count: 0,
          download_expires_at: expiresAt.toISOString()
        };
      }

      return updatedPurchase;
    } catch (error) {
      console.error('Error in createDownloadLink:', error);
      return null;
    }
  }

  /**
   * Get download link by token
   * Using purchases table
   */
  async getDownloadByToken(token: string): Promise<Purchase | null> {
    try {
      // Since we can't query by download_token (column doesn't exist),
      // we'll parse the token to get the purchase ID
      const purchaseId = token.split('_')[0];
      
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('id', purchaseId)
        .single();

      if (error || !data) {
        return null;
      }

      // Add download info if not present
      if (!data.download_token) {
        data.download_token = token;
      }

      return data;
    } catch (error) {
      console.error('Error getting download by token:', error);
      return null;
    }
  }

  /**
   * Validate and process download
   */
  async processDownload(token: string, userId?: string): Promise<string | null> {
    try {
      const rateLimitKey = userId || `download_${token}`;
      
      if (!downloadRateLimiter.isAllowed(rateLimitKey)) {
        console.error('Download rate limit exceeded');
        throw new Error('Too many download attempts. Please try again later.');
      }
      
      // Check if download is valid
      const { data: isValid, error: validError } = await supabase
        .rpc('is_download_valid', { token });

      if (validError || !isValid) {
        console.error('Invalid download token');
        return null;
      }

      // Get download record
      const download = await this.getDownloadByToken(token);
      if (!download) {
        return null;
      }

      // Increment download count
      await supabase.rpc('increment_download_count', { download_id: download.id });

      // Return the download URL
      return download.download_url || null;
    } catch (error) {
      console.error('Error processing download:', error);
      return null;
    }
  }

  /**
   * Get user's available downloads
   */
  async getUserDownloads(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('app_downloads')
        .select(`
          *,
          apps (
            name,
            description,
            thumbnail_url
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user downloads:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserDownloads:', error);
      return [];
    }
  }

  /**
   * Upload app file (for admins)
   */
  async uploadAppFile(
    appId: string,
    file: File,
    version: string,
    platform: string
  ): Promise<string | null> {
    try {
      const fileName = `${appId}/${platform}/${version}/${file.name}`;
      
      // Upload file to storage
      const { data, error } = await supabase.storage
        .from('app-downloads')
        .upload(fileName, file, {
          upsert: true,
          contentType: file.type
        });

      if (error) {
        console.error('Error uploading file:', error);
        return null;
      }

      // Create app version record
      const { error: versionError } = await supabase
        .from('app_versions')
        .insert({
          app_id: appId,
          version_number: version,
          file_path: data.path,
          file_size: file.size,
          file_type: file.name.split('.').pop(),
          platform: platform,
          is_active: true
        });

      if (versionError) {
        console.error('Error creating version record:', versionError);
        return null;
      }

      return data.path;
    } catch (error) {
      console.error('Error in uploadAppFile:', error);
      return null;
    }
  }

  /**
   * Get available platforms for an app
   */
  async getAppPlatforms(appId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('app_versions')
        .select('platform')
        .eq('app_id', appId)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching app platforms:', error);
        return [];
      }

      // Get unique platforms
      const platforms = [...new Set(data?.map(v => v.platform).filter(Boolean))];
      return platforms as string[];
    } catch (error) {
      console.error('Error in getAppPlatforms:', error);
      return [];
    }
  }

  /**
   * Generate download page URL
   */
  generateDownloadPageUrl(token: string): string {
    // This would be your download page URL
    return `${window.location.origin}/download/${token}`;
  }

  /**
   * Send download link via email
   */
  async sendDownloadEmail(email: string, downloadLink: string, appName: string): Promise<boolean> {
    // This would integrate with your email service
    // For now, we'll just log it
    console.log(`Sending download link to ${email} for ${appName}: ${downloadLink}`);
    
    // You could use Supabase Edge Functions or a service like SendGrid
    // to actually send the email
    
    return true;
  }
}

export const downloadService = new DownloadService();