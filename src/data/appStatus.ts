// App status configuration
export interface AppStatus {
  [key: string]: 'ready' | 'training' | 'construction' | 'hardware-construction' | 'diy-project';
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
  // 'soldierify': 'ready', // Site is live at soldierify.net
  'archive-box-scope': 'construction',
  'ar-graffiti': 'construction',
  'decision-lens': 'construction',
  'doggles': 'construction',
  'groove-boss': 'construction',
  // 'heads-up': 'ready', // Live on Google Play + flippinheadsup.com
  'lock-flute-3d': 'diy-project',
  'pirateify': 'construction',
  'mythify': 'construction',
  'knightify': 'construction',
  'night-titanic': 'construction',
  'tapp-app': 'construction',
  'tidymind': 'construction',
  'mindhaus': 'construction',
  'voicefocus-youtube': 'construction',
  // 'affect-atlas': live at affectatlas.com
  // 'kitty-purrception-ar': live at purrtechnine.com
  'canny-recollection': 'construction',
  'threadgauge': 'training'
};

export const getAppStatus = (appId: string): 'ready' | 'training' | 'construction' | 'hardware-construction' | 'diy-project' => {
  return appStatusConfig[appId] || 'ready';
};
