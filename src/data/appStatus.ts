// App status configuration
export interface AppStatus {
  [key: string]: 'ready' | 'training' | 'construction';
}

export const appStatusConfig: AppStatus = {
  // AI-powered apps that are "in training"
  'birdemon': 'training',
  'sicksense': 'training', 
  'spark-spectrometer': 'training',
  'mind-scope': 'training',
  'dream-sync': 'training',
  'soldierify': 'training',
  'inkdividual': 'training',
  'archive-box-scope': 'training',
  
  // Other apps that are "under construction"
  'ar-graffiti': 'construction',
  'decision-lens': 'construction',
  'doggles': 'construction',
  'groove-boss': 'construction',
  'heads-up': 'ready',  // Changed to ready for testing
  'lock-flute-3d': 'construction',
  'night-titanic': 'construction',
  'tapp-app': 'construction'
};

export const getAppStatus = (appId: string): 'ready' | 'training' | 'construction' => {
  return appStatusConfig[appId] || 'ready';
};
