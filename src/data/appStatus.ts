// App status configuration
export interface AppStatus {
  [key: string]: 'ready' | 'training' | 'construction';
}

export const appStatusConfig: AppStatus = {
  // AI-powered apps that are "in training"
  'sicksense': 'training', 
  'spark-spectrometer': 'training',
  
  // Other apps that are "under construction"
  'birdemon': 'construction',
  'mind-scope': 'construction',
  'dream-sync': 'construction',
  'soldierify': 'construction',
  'inkdividual': 'construction',
  'archive-box-scope': 'construction',
  'ar-graffiti': 'construction',
  'decision-lens': 'construction',
  'doggles': 'construction',
  'groove-boss': 'construction',
  'heads-up': 'construction',
  'lock-flute-3d': 'construction',
  'night-titanic': 'construction',
  'tapp-app': 'construction'
};

export const getAppStatus = (appId: string): 'ready' | 'training' | 'construction' => {
  return appStatusConfig[appId] || 'ready';
};
