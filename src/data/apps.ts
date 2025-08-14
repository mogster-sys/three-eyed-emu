export interface AppData {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  features: string[];
  category: string;
  sourceImage: string; // The full poster/illustration
  icon?: string; // Generated unified icon (will be created)
}

export const apps: AppData[] = [
  {
    id: 'ar-graffiti',
    name: 'AR Graffiti',
    description: 'Create stunning augmented reality street art',
    fullDescription: 'Transform any surface into your canvas with AR Graffiti. Use cutting-edge augmented reality technology to create, share, and discover digital street art that exists in the real world.',
    features: ['3D AR Drawing Tools', 'Location-Based Art', 'Community Gallery', 'Real-time Collaboration'],
    category: 'Creativity',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/AR_Graffiti.png'
  },
  {
    id: 'birdemon',
    name: "Bird 'em on",
    description: 'Collect and battle mystical bird creatures',
    fullDescription: 'Enter a world where mystical birds with extraordinary powers await discovery. Collect, train, and battle unique bird creatures in this immersive adventure game.',
    features: ['Creature Collection', 'Turn-based Combat', 'Breeding System', 'Multiplayer Battles'],
    category: 'Gaming',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Birdémon.png'
  },
  {
    id: 'decision-lens',
    name: 'Decision Lens',
    description: 'AI-powered decision making assistant',
    fullDescription: 'Make better decisions with AI analysis of complex scenarios. Decision Lens breaks down tough choices into clear, actionable insights.',
    features: ['Scenario Analysis', 'Risk Assessment', 'Decision Trees', 'Outcome Prediction'],
    category: 'Productivity',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Decision_Making.png'
  },
  {
    id: 'doggles',
    name: 'Doggles',
    description: 'Smart AR glasses for your canine companion',
    fullDescription: 'Revolutionary augmented reality eyewear designed specifically for dogs. Enhance your pet\'s world with interactive displays and health monitoring.',
    features: ['Pet Health Monitoring', 'Interactive AR Games', 'Training Assistance', 'Lost Pet Tracking'],
    category: 'Pet Tech',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Doggles.png'
  },
  {
    id: 'dream-sync',
    name: 'Dream Sync',
    description: 'AI-powered dream journal and analysis',
    fullDescription: 'Capture, analyze, and understand your dreams like never before. Dream Sync uses advanced AI to help you decode the mysteries of your subconscious mind.',
    features: ['Dream Recording', 'Symbol Analysis', 'Pattern Recognition', 'Lucid Dream Training'],
    category: 'Wellness',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Dream%20Journal.png'
  },
  {
    id: 'groove-boss',
    name: 'Groove Boss',
    description: 'Master the art of rhythm and beats',
    fullDescription: 'Become the ultimate rhythm master with Groove Boss. Create, mix, and perform beats with professional-grade tools designed for mobile music production.',
    features: ['Beat Creation', 'Live Performance Mode', 'Collaboration Tools', 'Cloud Sync'],
    category: 'Music',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/groove%20boss.png'
  },
  {
    id: 'heads-up',
    name: 'Heads Up',
    description: 'Augmented reality heads-up display',
    fullDescription: 'Transform your smartphone into a powerful heads-up display. Get real-time information overlay for navigation, fitness, and productivity without looking down.',
    features: ['Navigation Overlay', 'Fitness Tracking', 'Notification Display', 'Voice Control'],
    category: 'AR/VR',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Heads_Up.png'
  },
  {
    id: 'inkdividual',
    name: 'Inkdividual',
    description: 'Personalized tattoo design and simulation',
    fullDescription: 'Design your perfect tattoo with AI assistance and see how it looks on your body before committing. Connect with top artists worldwide.',
    features: ['AI Design Assistant', 'Body Simulation', 'Artist Marketplace', 'Style Recommendations'],
    category: 'Lifestyle',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Inkdividual.png'
  },
  {
    id: 'lock-flute-3d',
    name: 'Lock, Flute and 3D',
    description: 'Immersive 3D music composition suite',
    fullDescription: 'Compose music in three-dimensional space with innovative tools that let you sculpt sound like never before. Perfect for film scoring and experimental music.',
    features: ['3D Audio Composition', 'Spatial Sound Design', 'Instrument Simulation', 'Export Options'],
    category: 'Music',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Lock_flute_and_3d.png'
  },
  {
    id: 'mind-scope',
    name: 'Mind Scope',
    description: 'Six-minute psychological insight scanner',
    fullDescription: 'Get deep psychological insights in just six minutes. Mind Scope uses advanced assessment techniques to provide accurate personality and mental health analysis.',
    features: ['Quick Assessment', 'Personality Analysis', 'Mental Health Insights', 'Progress Tracking'],
    category: 'Health',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/six_minute_xray.png'
  },
  {
    id: 'sicksense',
    name: 'SickSense',
    description: 'Early illness detection system',
    fullDescription: 'Detect potential health issues before symptoms appear using advanced biometric analysis and AI predictions. Your personal health guardian.',
    features: ['Biometric Monitoring', 'Early Detection', 'Health Predictions', 'Doctor Integration'],
    category: 'Health',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/SickSense.png'
  },
  {
    id: 'soldierify',
    name: 'Soldierify',
    description: 'Military-grade fitness and training',
    fullDescription: 'Train like a soldier with this comprehensive fitness and discipline app. Build mental toughness and physical strength with proven military methodologies.',
    features: ['Military Workouts', 'Mental Training', 'Progress Tracking', 'Community Challenges'],
    category: 'Fitness',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Soldierify.png'
  },
  {
    id: 'spark-spectrometer',
    name: 'Spark Spectrometer',
    description: 'Mobile material analysis tool',
    fullDescription: 'Turn your phone into a powerful spectrometer. Analyze materials, identify substances, and explore the molecular world around you.',
    features: ['Material Analysis', 'Substance Identification', 'Data Logging', 'Educational Content'],
    category: 'Science',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Sparktester.png'
  },
  {
    id: 'night-titanic',
    name: 'Night on the Titanic',
    description: 'Immersive historical simulation',
    fullDescription: 'Experience the final night aboard the Titanic in this historically accurate simulation. Make choices that could change history in this gripping interactive story.',
    features: ['Historical Accuracy', 'Multiple Endings', 'Character Interaction', 'Educational Content'],
    category: 'Education',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Titanic.png'
  },
  {
    id: 'tapp-app',
    name: 'Tapp App',
    description: 'Revolutionary tap-based interface',
    fullDescription: 'Control your digital world with intuitive tap gestures. Tapp App creates a new paradigm for mobile interaction with customizable tap patterns.',
    features: ['Gesture Recognition', 'Custom Patterns', 'App Integration', 'Accessibility Features'],
    category: 'Utility',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/Tapp%20App.png'
  },
  {
    id: 'threadgauge-ai',
    name: 'ThreadGauge AI',
    description: 'AI-powered fashion and textile analysis',
    fullDescription: 'Analyze fabric quality, predict fashion trends, and optimize textile production with cutting-edge AI technology designed for the fashion industry.',
    features: ['Fabric Analysis', 'Trend Prediction', 'Quality Assessment', 'Sustainability Metrics'],
    category: 'Fashion',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/ThreadGauge%20AI.png'
  },
  {
    id: 'archive-box-scope',
    name: 'ARchive Box-scope',
    description: 'X-ray vision for storage and organization',
    fullDescription: 'See through boxes and containers with AR technology. Perfect for organizing storage spaces, warehouses, and finding lost items instantly.',
    features: ['AR X-ray Vision', 'Inventory Tracking', 'Search Functionality', 'Organization Tools'],
    category: 'Utility',
    sourceImage: 'https://mogster-sys.github.io/three-eyed-emu-assets-/images/xray%20vision.png'
  }
];