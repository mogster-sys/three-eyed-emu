import { useState, useEffect } from 'react';
import { ArrowLeft, Brain, Construction, CheckCircle, Eye, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { apps } from '@/data/apps';
import { appStatusConfig, getAppStatus } from '@/data/appStatus';
import { AppStatusBadge } from '@/components/AppStatusBadge';

const ControlPanel = () => {
  const [statusConfig, setStatusConfig] = useState(appStatusConfig);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateAppStatus = (appId: string, status: 'ready' | 'training' | 'construction') => {
    setStatusConfig(prev => ({
      ...prev,
      [appId]: status
    }));
    setHasChanges(true);
  };

  const saveChanges = () => {
    // In a real app, this would update the database
    // For now, we'll just show a success message
    toast({
      title: "Changes Saved",
      description: "App status configuration has been updated.",
    });
    setHasChanges(false);
  };

  const getStatusStats = () => {
    const stats = { ready: 0, training: 0, construction: 0 };
    Object.values(statusConfig).forEach(status => {
      stats[status]++;
    });
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-deep to-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft size={16} />
              Back to Apps
            </Button>
            <div>
              <h1 className="text-3xl font-bold">App Control Panel</h1>
              <p className="text-muted-foreground">Manage app status and watermarks</p>
            </div>
          </div>
          
          {hasChanges && (
            <Button onClick={saveChanges} className="gap-2">
              <Save size={16} />
              Save Changes
            </Button>
          )}
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="text-green-500" size={24} />
              <div>
                <p className="font-semibold">{stats.ready}</p>
                <p className="text-sm text-muted-foreground">Ready</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Brain className="text-amber-500" size={24} />
              <div>
                <p className="font-semibold">{stats.training}</p>
                <p className="text-sm text-muted-foreground">In Training</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Construction className="text-orange-500" size={24} />
              <div>
                <p className="font-semibold">{stats.construction}</p>
                <p className="text-sm text-muted-foreground">Under Construction</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Eye className="text-blue-500" size={24} />
              <div>
                <p className="font-semibold">{apps.length}</p>
                <p className="text-sm text-muted-foreground">Total Apps</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apps Grid */}
        <Card>
          <CardHeader>
            <CardTitle>App Status Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-4">
                    <img 
                      src={app.sourceImage} 
                      alt={app.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{app.name}</h3>
                      <p className="text-sm text-muted-foreground">{app.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <AppStatusBadge status={statusConfig[app.id] || 'ready'} />
                    <Select
                      value={statusConfig[app.id] || 'ready'}
                      onValueChange={(value: 'ready' | 'training' | 'construction') => 
                        updateAppStatus(app.id, value)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="training">In Training</SelectItem>
                        <SelectItem value="construction">Under Construction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ControlPanel;