// App status configuration
export interface AppStatus {
  [key: string]: 'ready' | 'training' | 'construction' | 'hardware-construction';
}

export const appStatusConfig: AppStatus = {
  // AI-powered apps that are "in training"
  'sicksense': 'training',
  'spark-spectrometer': 'training',

  // Hardware products under construction
  'purrtrack-9': 'hardware-construction',

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
  'tapp-app': 'construction',
  'tidymind': 'construction',
  'mindhaus': 'construction',
  'voicefocus-youtube': 'construction'
};

export const getAppStatus = (appId: string): 'ready' | 'training' | 'construction' | 'hardware-construction' => {
  return appStatusConfig[appId] || 'ready';
};
