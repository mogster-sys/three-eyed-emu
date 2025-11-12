// Import GitHub assets
import arGraffiti from '@/assets/apps/AR_Graffiti.png';
import archive from '@/assets/apps/ARchive.png';
import birdemon from '@/assets/apps/Birdémon.png';
import decisionMaking from '@/assets/apps/Decision_Making.png';
import doggles from '@/assets/apps/Doggles.png';
import screwLoose from '@/assets/apps/Got-a-screw-loose.png';
import headsUp from '@/assets/apps/Heads_Up.png';
import inkdividual from '@/assets/apps/Inkdividual.png';
import lockFlute3d from '@/assets/apps/Lock_flute_and_3d.png';
import sickSense from '@/assets/apps/SickSense.png';
import sparkTester from '@/assets/apps/SparkTester.png';
import titanic from '@/assets/apps/Titanic.png';
import dreamJournal from '@/assets/apps/dreamjournal.png';
import grooveBoss from '@/assets/apps/grooveboss.png';
import sixMinuteXray from '@/assets/apps/six_minute_xray.png';
import soldierify from '@/assets/apps/soldierify.png';
import tappFlow from '@/assets/apps/tapp-flow.png';
import tidyMind from '@/assets/apps/TidyMind.png';
import purrTrack9 from '@/assets/apps/PurrTrack_9.png';
import mindHause from '@/assets/apps/FirstPersonOrganizer.png';
import voiceFocus from '@/assets/apps/YouTubeDeannoyingizer.png';

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
    id: 'archive-box-scope',
    name: 'ARchive box-scope',
    description: 'AR powered AI enhanced personal database and organizer',
    fullDescription: 'Augmented reality interface driving a personal database, hold up your phone and ai recognises pre-registered closed containers to reveal and list their contents, as entered into the database or identified by object recognition to populate the database, has some sharing features for trusted sharing, but basically for when you forget where you put something, originally conceived like a x ray for boxes I forgot what was in as I rummaged for the lost thing.',
    features: ['AR Container Recognition', 'Database Management', 'Object Recognition', 'Inventory Tracking'],
    category: 'Utility/ personal database/ organizer',
    sourceImage: archive
  },
  {
    id: 'birdemon',
    name: 'Birdemon',
    description: 'Bird identification with Pokémon-style gameplay',
    fullDescription: 'Discover and identify Australia\'s incredible bird diversity with detailed descriptions, field guide plates, ai enhanced visual and song identification features, with a twist, a built-in Pokémon style game, collect conservation points by sharing geotagged, undisturbed sightings of birds in urban areas.',
    features: ['Bird Identification', 'Field Guide', 'AI Recognition', 'Conservation Game'],
    category: 'Utility/ game/ reference and identification manual',
    sourceImage: birdemon
  },
  {
    id: 'decision-lens',
    name: 'Decision lens',
    description: 'Systematic decision making support system',
    fullDescription: 'An app to systematically helps make decisions based on a Eisenhauer matrix, and NASAs TLDX system, assessing a tasks mental demand, temporal demand, performance, effort and frustration, and swot analysis, with a coin toss as a last resort.',
    features: ['Eisenhauer Matrix', 'NASA TLDX System', 'SWOT Analysis', 'Decision Trees'],
    category: 'Productivity/ Decision Support/ Task & Time Management/ Possibly Business & Strategy Tools',
    sourceImage: decisionMaking
  },
  {
    id: 'doggles',
    name: 'Doggles',
    description: 'See the world through your dogs eyes, breed specific k9 emulator',
    fullDescription: 'See the world through the eyes of your K9 companion, with breed specific features such as visual field, not all dogs can see the TV, or the red tennis ball, find out if your dog\'s behaviours could be breed specific differences in vision.',
    features: ['Breed-Specific Vision', 'Visual Field Simulation', 'Color Perception', 'Behavior Analysis'],
    category: 'Utility/ Dog-vision',
    sourceImage: doggles
  },
  {
    id: 'dream-sync',
    name: 'Dream Sync – dream journal',
    description: 'Voice-to-image dream journaling',
    fullDescription: 'Dictate or write your dream on waking, converted into a generated image of your dream to store alongside the text generated from the speech, forming into an indexable journal.',
    features: ['Voice Recording', 'AI Image Generation', 'Dream Analysis', 'Searchable Journal'],
    category: 'Wellbeing/ visual sleep journal',
    sourceImage: dreamJournal
  },
  {
    id: 'groove-boss',
    name: 'groove boss',
    description: 'Bluetooth headphone proximity triggered musical greeting, get noticed entering their frame with your boss tune',
    fullDescription: 'like a doorbell or greeting between users of the app wearing Bluetooth headphones, plays a personized musical greeting or tune when in proximity, get noticed by arriving with your boss tune, also a impromptu flash mob silent disco.',
    features: ['Proximity Detection', 'Musical Greetings', 'Silent Disco', 'Personalized Tunes'],
    category: 'Bluetooth headphones proximity music sharing',
    sourceImage: grooveBoss
  },
  {
    id: 'heads-up',
    name: 'Heads Up on the flip',
    description: 'Beautiful coin collection, virtual random toss',
    fullDescription: 'An elegant collection of historic coins from different eras and civilizations. Perfect for making decisions, settling debates, or simply enjoying beautifully animated coin tosses with authentic physics.',
    features: ['Historic Coins', 'Realistic Physics', 'Decision Making', 'Coin Collection'],
    category: 'Virtual random Coin toss',
    sourceImage: headsUp
  },
  {
    id: 'inkdividual',
    name: 'Inkdividual',
    description: 'Individual personality type art generator',
    fullDescription: 'A Myers Briggs style personality questioner linked to a prompt generator to produce unique digital art, also linked to printing services for unique personalized designs for phone cases, t shirts, cards, placemats, Colouring books etc.',
    features: ['Personality Assessment', 'AI Art Generation', 'Print Services', 'Custom Designs'],
    category: 'Generate art based on Myers Briggs style personality',
    sourceImage: inkdividual
  },
  {
    id: 'lock-flute-3d',
    name: 'Lock, flute and 3d',
    description: '3D print private secure access control flute, shareable physical digital device opening',
    fullDescription: 'Using a 3d printer, print a small flute encoding distinct microtones, to distribute (as a keychain or necklace) to unlock any capable digital device, secure sharable access control.',
    features: ['3D Printing', 'Microtone Encoding', 'Access Control', 'Secure Authentication'],
    category: 'Security flute',
    sourceImage: lockFlute3d
  },
  {
    id: 'mind-scope',
    name: 'Mind Scope',
    description: 'Rapid psychological profiling system based on agency training',
    fullDescription: 'An app based on a system of rapid profiling, used by various three letter agencies to classify people based on body language, nonverbal signals everybody leaks that reveal everything about a person.',
    features: ['Body Language Analysis', 'Nonverbal Signals', 'Rapid Profiling', 'Behavioral Classification'],
    category: 'Utility/ entertainment',
    sourceImage: sixMinuteXray
  },
  {
    id: 'sicksense',
    name: 'Sick sense',
    description: 'AI assisted car and travel motion sickness prediction system',
    fullDescription: 'Using your smartphones sensors and machine learning, get a heads up on when your kids going to puke, it might take a few goes to gather the evidence,then the app can work two ways, letting you know to drive more slowly or when your kids looking a little green it might be time to pull over.',
    features: ['Motion Sensing', 'Machine Learning', 'Predictive Alerts', 'Driving Assistance'],
    category: 'Ai car sickness',
    sourceImage: sickSense
  },
  {
    id: 'soldierify',
    name: 'Soldierify',
    description: 'Be a historical warrior by photo transformation, digital and printable art',
    fullDescription: 'Drop a photo and it puts your face on soldier selecting from historic warriors on parade, or in battle or after, you can use the image as digital art in its own right or send it to printify and get your likeness as a poster of yourself as let\'s say a roman legionary, or Mongol or Zulu or US marine or British redcoat, etc, a great gift for father\'s day.',
    features: ['Face Mapping', 'Historic Warriors', 'Print Services', 'Digital Art'],
    category: 'Entertainment/ art and decoration',
    sourceImage: soldierify
  },
  {
    id: 'spark-spectrometer',
    name: 'Spark spectrometer',
    description: 'Smartphone spark spectrometer for metal identification',
    fullDescription: 'Sparky, turns your smartphone into an improvised but accurate spark spectrometer useful at the workshop level, solving a common problem is not being able to identify metals to be joined by welding. By filming a brief stream of sparks from a grind wheel, accurate carbon content for steels and additional alloys, able to determine composition of all common engineering metals, trained from known samples using advanced machine learning algorithms.',
    features: ['Spark Analysis', 'Metal Identification', 'Carbon Content', 'Welding Assistance'],
    category: 'Tool/ utility/ alloy identifier',
    sourceImage: sparkTester
  },
  {
    id: 'night-titanic',
    name: 'Night on the Titanic',
    description: 'Historical survival horror simulation',
    fullDescription: 'With both an arcade and historically accurate mode, spend a night on the titanic, as she sinks. Would you make to the lifeboats to survive or rearrange the deckchairs, find out as you spawn as one of Titanic\'s passengers immediately after colliding with the iceberg.',
    features: ['Historical Accuracy', 'Survival Gameplay', 'Multiple Modes', 'Character Interaction'],
    category: 'Game historical survival/ horror.',
    sourceImage: titanic
  },
  {
    id: 'tapp-app',
    name: 'Tapp app',
    description: 'Avatar-assisted EFT tapping therapy',
    fullDescription: 'A avatar assisted delivery method for EFT (emotional freedom technique) or tapping routines, the app is designed with features and for use by practitioners of this unreasonably effective therapy, bit hard to explain but actually works well assisting anxiety, anger, insomnia,',
    features: ['EFT Therapy', 'Avatar Guidance', 'Anxiety Relief', 'Sleep Improvement'],
    category: 'Wellbeing/ therapy',
    sourceImage: tappFlow
  },
  {
    id: 'ar-graffiti',
    name: 'Augmented Graffiti (AR graffiti)',
    description: 'Geotagged graffiti, tag Augmented reality private messages',
    fullDescription: 'Geotagged graffiti or messages can be left in the manner of a cold war spy dead drop or modern geocache, only retrievable and visible by another user of the app attending the same location the message was made, only unlockable through a secure augmented reality interface, only viewable at the site. Keep your messages private, tag the joint without getting arrested, if you don\'t mind looking daft pretending your phones a spray can. (still works just type on a keyboard.)',
    features: ['Geotagged Messages', 'AR Interface', 'Location-Based', 'Private Messaging'],
    category: 'Entertainment/ social media',
    sourceImage: arGraffiti
  },
  {
    id: 'tidymind',
    name: 'TidyMind',
    description: 'ADHD-friendly decluttering companion with AI coaching',
    fullDescription: 'Point your phone at the chaos and get judgment-free guidance to reclaim your space. Our AI coach helps you decide what stays, what goes, and where things belong, with coaching styles from gentle encouragement to tough love tailored to how your ADHD brain actually works.',
    features: ['Smart Object Recognition', 'Personalized ADHD Coach', 'Location Suggestion System', 'Visual Time Management'],
    category: 'ADHD Productivity / Organization',
    sourceImage: tidyMind
  },
  {
    id: 'purrtrack-9',
    name: 'PurrTrack 9',
    description: 'AI-powered smart collar protecting native wildlife',
    fullDescription: 'Cats kill 1.4 billion native animals yearly in Australia, and bells don\'t always work. PurrTrack 9 uses accelerometers and sensors to detect stalking behavior in real-time, triggering deterrents (sound/vibration/light) and alerting your phone when your cat hunts. Prevention over punishment—keep native birds alive while your cat stays safe.',
    features: ['Real-time Stalking Detection', 'Smart Deterrent System', 'Learn about the secret life of your cat', 'Smart Home Integration'],
    category: 'Pet Tech / Wildlife Conservation',
    sourceImage: purrTrack9
  },
  {
    id: 'mindhaus',
    name: 'MindHause',
    description: 'Your world becomes your memory palace',
    fullDescription: 'An interactive first person organizer, position your tasks in a virtual space that is your own house or palace or castle to leverage spatial memory for task organization. Tasks, ideas, and reminders appear as objects inside beautifully rendered rooms, with appointments mapped to real-world locations, open a door to see where you\'re going to be tomorrow, images from Google Earth. Toggle instantly between immersive first-person world and sleek list view.',
    features: ['Geo-Spatial Memory Rooms', 'Instant Classic Mode Toggle', 'Behavioral Flow System', 'Adaptive Aesthetic Themes'],
    category: 'Spatial Productivity / AR Organizer',
    sourceImage: mindHause
  },
  {
    id: 'voicefocus-youtube',
    name: 'VoiceFocus for YouTube',
    description: 'Replace YouTube audio with your preferred voice for better focus',
    fullDescription: 'Replace distracting YouTube audio with a more tolerable voice of your choosing or your own cloned voice. Perfect for educational content with speech patterns, background music, or vocal styles that distract from learning. Works entirely in your browser using YouTube\'s native captions—100% private, on-device processing with no subscriptions.',
    features: ['Your Voice or a voice of your choosing', '100% Private On-Device', 'No Ongoing Costs', 'Enhanced Learning Focus'],
    category: 'Productivity / Accessibility',
    sourceImage: voiceFocus
  }
];