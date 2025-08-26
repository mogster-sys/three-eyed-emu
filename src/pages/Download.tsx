import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { downloadService } from '@/services/downloadService';
import { useToast } from '@/hooks/use-toast';

export const DownloadPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [downloadInfo, setDownloadInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (token) {
      checkDownloadValidity();
    }
  }, [token]);

  const checkDownloadValidity = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const download = await downloadService.getDownloadByToken(token);
      
      if (!download) {
        setError('Invalid or expired download link');
        return;
      }

      // Check if download has expired
      const expiresAt = new Date(download.expires_at);
      if (expiresAt < new Date()) {
        setError('This download link has expired');
        return;
      }

      // Check if download limit reached
      if (download.download_count >= download.max_downloads) {
        setError(`Download limit reached (${download.max_downloads} downloads)`);
        return;
      }

      setDownloadInfo(download);
    } catch (err) {
      console.error('Error checking download:', err);
      setError('Error verifying download link');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!token) return;
    
    setDownloading(true);
    try {
      const downloadUrl = await downloadService.processDownload(token);
      
      if (downloadUrl) {
        // Trigger download
        window.open(downloadUrl, '_blank');
        
        toast({
          title: "Download Started",
          description: "Your download should begin shortly.",
          action: (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )
        });

        // Refresh download info
        await checkDownloadValidity();
      } else {
        throw new Error('Failed to process download');
      }
    } catch (err) {
      console.error('Download error:', err);
      toast({
        title: "Download Failed",
        description: "There was an error processing your download. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying download link...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Download Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <Button 
              className="w-full" 
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!downloadInfo) {
    return null;
  }

  const expiresAt = new Date(downloadInfo.expires_at);
  const hoursRemaining = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)));
  const downloadsRemaining = downloadInfo.max_downloads - downloadInfo.download_count;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/20">
      <Card className="max-w-lg w-full glassmorphic border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-glow">
            Download Your App
          </CardTitle>
          <CardDescription>
            Secure download link for your purchased application
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Download Info */}
          <div className="space-y-4 bg-card/50 p-4 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">App ID</span>
              <Badge variant="outline">{downloadInfo.app_id}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Downloads Remaining</span>
              <Badge 
                variant={downloadsRemaining <= 1 ? "destructive" : "secondary"}
                className="flex items-center gap-1"
              >
                <Download className="h-3 w-3" />
                {downloadsRemaining} / {downloadInfo.max_downloads}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Expires In</span>
              <Badge 
                variant={hoursRemaining <= 2 ? "destructive" : "secondary"}
                className="flex items-center gap-1"
              >
                <Clock className="h-3 w-3" />
                {hoursRemaining} hours
              </Badge>
            </div>
          </div>

          {/* Download Button */}
          <Button
            size="lg"
            className="w-full h-14 text-lg font-semibold glow-effect"
            onClick={handleDownload}
            disabled={downloading || downloadsRemaining === 0}
          >
            {downloading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing Download...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-3" />
                Download App ({downloadsRemaining} left)
              </>
            )}
          </Button>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-semibold">Installation Instructions:</p>
            <ul className="space-y-1 ml-4">
              <li>• For Android: Enable "Install from Unknown Sources" in Settings</li>
              <li>• For iOS: Follow the enterprise app installation guide</li>
              <li>• For Desktop: Run the installer with administrator privileges</li>
            </ul>
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p>
              This is a secure, verified download link. The file has been scanned 
              for malware and is safe to install.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};