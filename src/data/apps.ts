// Import GitHub assets
import arGraffiti from '@/assets/apps/AR_Graffiti.png';
import archive from '@/assets/apps/ARchive.png';
import birdemon from '@/assets/apps/Birdemon.png';
import decisionMaking from '@/assets/apps/Decision_Making.png';
import doggles from '@/assets/apps/Doggles.png';
import screwLoose from '@/assets/apps/Got-a-screw-loose.png';
import headsUp from '@/assets/apps/FlippinHeadsUp.png';
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
import affectAtlas from '@/assets/apps/AffectAtlas.png';
import kittyPurrceptionAR from '@/assets/apps/KittyPurrceptionAR.png';
import cannyRecollection from '@/assets/apps/CannyRecollection.png';
import pirateifyBefore from '@/assets/apps/showcase/pirateify-before.jpg';
import pirateifyAfter from '@/assets/apps/showcase/pirateify-after.jpg';
import mythifyBefore from '@/assets/apps/showcase/mythify-before.jpg';
import mythifyAfter from '@/assets/apps/showcase/mythify-after.jpg';
import knightifyBefore from '@/assets/apps/showcase/knightify-before.jpg';
import knightifyAfter from '@/assets/apps/showcase/knightify-after.jpg';
import inkdividualBefore from '@/assets/apps/showcase/inkdividual-before.jpg';
import inkdividualAfter from '@/assets/apps/showcase/inkdividual-after.jpg';

// Nocturne Recorder marketing site — currently on a spare domain.
// Swap this single line when the permanent domain is ready.
const NOCTURNE_RECORDER_URL = 'https://flippinheadsup.online';

export interface AppData {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  features: string[];
  category: string;
  sourceImage: string; // The full poster/illustration
  icon?: string; // Generated unified icon (will be created)
  website?: string; // External website URL for the app
  websites?: { url: string; label: string }[]; // Multiple website links
  beforeImage?: string; // Before/after slider: before image
  afterImage?: string; // Before/after slider: after image
}

export const apps: AppData[] = [
  {
    id: 'archive-box-scope',
    name: 'ARchive box-scope',
    description: 'AR powered AI enhanced personal database and organizer',
    fullDescription: 'Augmented reality interface driving a personal database, hold up your phone and ai recognises pre-registered closed containers to reveal and list their contents, as entered into the database or identified by object recognition to populate the database, has some sharing features for trusted sharing, but basically for when you forget where you put something, originally conceived like a x ray for boxes I forgot what was in as I rummaged for the lost thing.',
    features: ['AR Container Recognition', 'Database Management', 'Object Recognition', 'Inventory Tracking'],
    category: 'Utility/ personal database/ organizer',
    sourceImage: archive,
    website: 'https://xraycontainervision.com'
  },
  {
    id: 'birdemon',
    name: 'Birdemon',
    description: 'Bird identification with Pokémon-style gameplay',
    fullDescription: 'Discover and identify Australia\'s incredible bird diversity with detailed descriptions, field guide plates, ai enhanced visual and song identification features, with a twist, a built-in Pokémon style game, collect conservation points by sharing geotagged, undisturbed sightings of birds in urban areas.',
    features: ['Bird Identification', 'Field Guide', 'AI Recognition', 'Conservation Game'],
    category: 'Utility/ game/ reference and identification manual',
    sourceImage: birdemon,
    website: 'https://birdemon.com'
  },
  {
    id: 'decision-lens',
    name: 'DecisionScope',
    description: 'Systematic decision making support system',
    fullDescription: 'An app to systematically helps make decisions based on a Eisenhauer matrix, and NASAs TLDX system, assessing a tasks mental demand, temporal demand, performance, effort and frustration, and swot analysis, with a coin toss as a last resort.',
    features: ['Eisenhauer Matrix', 'NASA TLDX System', 'SWOT Analysis', 'Decision Trees'],
    category: 'Productivity/ Decision Support/ Task & Time Management/ Possibly Business & Strategy Tools',
    sourceImage: decisionMaking
  },
  {
    id: 'doggles',
    name: 'MyDoggles',
    description: 'See the world through your dogs eyes, breed specific k9 emulator',
    fullDescription: 'See the world through the eyes of your K9 companion, with breed specific features such as visual field, not all dogs can see the TV, or the red tennis ball, find out if your dog\'s behaviours could be breed specific differences in vision.',
    features: ['Breed-Specific Vision', 'Visual Field Simulation', 'Color Perception', 'Behavior Analysis'],
    category: 'Utility/ Dog-vision',
    sourceImage: doggles,
    website: 'https://mydoggles.com'
  },
  {
    id: 'dream-sync',
    name: 'Nocturne Recorder – dream journal',
    description: 'Voice-to-image dream journaling',
    fullDescription: 'Dictate or write your dream on waking, converted into a generated image of your dream to store alongside the text generated from the speech, forming into an indexable journal.',
    features: ['Voice Recording', 'AI Image Generation', 'Dream Analysis', 'Searchable Journal'],
    category: 'Wellbeing/ visual sleep journal',
    sourceImage: dreamJournal,
    website: NOCTURNE_RECORDER_URL
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
    name: 'Flippin Heads Up',
    description: 'World coin collection, virtual toss and authentic Australian Two-Up',
    fullDescription: 'Your pocket-sized coin collection. Toss beautiful coins from around the world, make fair decisions instantly, and play authentic Australian Two-Up. Featuring 11+ world coins from US Quarter to ancient Greek Tetradrachm, realistic 3D flip physics, and a built-in Two-Up game with traditional ANZAC-themed aesthetic and rules — complete with Spinner, Kip, Ringie and "Come in Spinner!" No real money, just cultural heritage and fun.',
    features: ['World Coin Collection', 'Realistic 3D Physics', 'Australian Two-Up Game', 'A Glimpse of ANZAC Heritage for the New Generation'],
    category: 'Entertainment / Decision Making',
    sourceImage: headsUp,
    website: 'https://flippinheadsup.com'
  },
  {
    id: 'inkdividual',
    name: 'Inkdividual',
    description: 'Individual personality type art generator',
    fullDescription: 'A Myers Briggs style personality questioner incorporating Jung\'s hero journey, linked to a prompt generator to produce unique digital art, also linked to printing services for unique personalized designs for phone cases, t shirts, cards, placemats, Colouring books etc.',
    features: ['Personality Assessment', 'Jung\'s Hero Journey', 'AI Art Generation', 'Print Services'],
    category: 'Generate art based on Myers Briggs style personality',
    sourceImage: inkdividual,
    website: 'https://inkdividual.com.au',
    websites: [
      { url: 'https://inkdividual.com.au', label: 'Open Web App' },
      { url: 'https://inkdividual.org', label: 'About Inkdividual' }
    ],
    beforeImage: inkdividualBefore,
    afterImage: inkdividualAfter
  },
  {
    id: 'lock-flute-3d',
    name: 'Acoustic Keys',
    description: 'Lock, flute and 3d',
    fullDescription: 'Using a 3D printer, produce a small flute encoding distinct microtones to unlock any capable digital device — a shareable physical access token worn as a keychain or necklace. This project has been published as open research. If you\'re interested, the public GitHub repo contains everything you need to build it yourself: concept docs, CAD workflow, pitch detection and ML, a crypto layer, and annotated pseudocode examples.',
    features: ['3D Printing', 'Microtone Encoding', 'Access Control', 'Secure Authentication'],
    category: 'Security flute',
    sourceImage: lockFlute3d,
    website: 'https://github.com/mogster-sys/lock-flute-and-3d'
  },
  {
    id: 'mind-scope',
    name: 'Mind Scope',
    description: 'B2B rapid behavioural insight system for professional environments',
    fullDescription: 'A business-to-business behavioural insight tool built on established frameworks for reading body language and nonverbal communication. Designed for professional environments such as HR, recruitment, negotiation and customer service training. Only available on request to businesses with privacy and ethics policies.',
    features: ['Body Language Analysis', 'Nonverbal Communication', 'Professional Training', 'B2B Only'],
    category: 'B2B / Professional Tools',
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
    fullDescription: 'Drop a photo and it puts your face on soldier selecting from historic warriors on parade, or in battle or after, you can use the image as digital art in its own right or send it to printify and get your likeness as a poster of yourself as let\'s say a roman legionary, or Mongol or Zulu or US marine or British redcoat, etc, a great gift, birthday card or poster for father\'s day.',
    features: ['Face Mapping', 'Historic Warriors', 'Print Services', 'Digital Art'],
    category: 'Entertainment/ art and decoration',
    sourceImage: soldierify,
    website: 'https://soldierify.net'
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
    sourceImage: arGraffiti,
    website: 'https://augmentedgraffiti.com'
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
    sourceImage: purrTrack9,
    website: 'https://purrtracknine.com'
  },
  {
    id: 'mindhaus',
    name: 'MindHause',
    description: 'Turn organization into a game, your virtual house into a memory palace',
    fullDescription: 'An interactive first person organizer, position your tasks in a virtual space that is your own house or palace or castle to leverage spatial memory for task organization. Tasks, ideas, and reminders appear as objects inside beautifully rendered rooms, with appointments mapped to real-world locations, open a door to see where you\'re going to be tomorrow, images from Google Earth. Toggle instantly between immersive first-person world and sleek list view.',
    features: ['Geo-Spatial Memory Rooms', 'Instant Classic Mode Toggle', 'Behavioral Flow System', 'Adaptive Aesthetic Themes'],
    category: 'Spatial Productivity / AR Organizer',
    sourceImage: mindHause,
    website: 'https://mindhause.fun'
  },
  {
    id: 'voicefocus-youtube',
    name: 'VoiceFocus for YouTube',
    description: 'Replace YouTube audio with your preferred voice for better focus',
    fullDescription: 'Replace distracting YouTube audio with a more tolerable voice of your choosing or your own cloned voice. Perfect for educational content with speech patterns, background music, or vocal styles that distract from learning. Works entirely in your browser using YouTube\'s native captions—100% private, on-device processing with no subscriptions.',
    features: ['Your Voice or a voice of your choosing', '100% Private On-Device', 'No Ongoing Costs', 'Enhanced Learning Focus'],
    category: 'Productivity / Accessibility',
    sourceImage: voiceFocus
  },
  {
    id: 'affect-atlas',
    name: 'AffectAtlas',
    description: 'Turn emotions into practical design choices with an intuitive emotion wheel',
    fullDescription: 'Turn emotions into practical design choices using an intuitive emotion wheel that guides color, type, layout, and motion. Dial the intensity up or down and export clean, ready-to-use tokens for Figma, CSS, Tailwind, and design systems. Combine emotions to explore fresh visual directions and create interfaces with a clear, intentional tone. See your components update live, complete with accessibility checks and consistent style-guide output.',
    features: ['Emotion-to-Design Mapping', 'Design Token Export', 'Live Component Preview', 'Accessibility Checks'],
    category: 'Design Tools / Cross-platform',
    sourceImage: affectAtlas,
    website: 'https://affectatlas.com'
  },
  {
    id: 'kitty-purrception-ar',
    name: 'Kitty-purrception AR',
    description: 'Experience the latest science of feline vision through augmented reality',
    fullDescription: 'Explore breakthrough low-light perception where pitch-black rooms become fully navigable, replicating findings showing cats need only a fraction of the light humans require. Activate a persistent ultraviolet overlay reflecting the latest research on feline UV sensitivity, making fabrics, skin tones, and insect trails explode into brilliant blues and glowing neon tracks. Experience newly understood feline attention mechanics as the AR view mutes static elements and hyper-enhances moving targets. See human movement the way a cat truly does — slowed, exaggerated, and easier to track — based on evidence of cats processing motion at roughly twice the human flicker-fusion rate.',
    features: ['Breakthrough Low-Light Perception', 'Fluorescent UV Reveal', 'Predator Mode Dynamic Focus', 'Slow-Motion Processing'],
    category: 'AR / Entertainment / Free',
    sourceImage: kittyPurrceptionAR,
    website: 'https://purrtechnine.com'
  },
  {
    id: 'canny-recollection',
    name: 'Canny Recollection',
    description: 'Ambient learning posters and placemats that turn everyday spaces into quiet teachers',
    fullDescription: 'Your gateway to printable learning products. Generate posters, placemats, and Kindle books that turn everyday spaces into quiet teachers. Our products transform breakfast tables, desks and bedrooms into "always-on" memory aids, so facts sink in slowly and painlessly just by being in view. Build real knowledge without extra screen time — these are calm, physical artefacts that gently repeat key information until it sticks. Curated "just good to know" content from science and maps to critical thinking and safety rules, focusing on durable, foundational knowledge that pays off for a lifetime.',
    features: ['Placemats, Kindle Books & Posters', 'Screen-Free Education', 'Ambient Learning Products', 'Curated Knowledge Content'],
    category: 'Education / Physical Products',
    sourceImage: cannyRecollection,
    website: 'https://cannyrecollection.com'
  },
  {
    id: 'pirateify',
    name: 'Pirateify',
    description: 'Be a legendary pirate by photo transformation, digital and printable art',
    fullDescription: 'Drop a photo and it puts your face on a pirate selecting from history\'s most notorious buccaneers, on the deck of a ship, in the heat of a sea battle, or burying treasure on a hidden island. You can use the image as digital art in its own right or send it to printify and get your likeness as a poster of yourself as Blackbeard, Anne Bonny, Calico Jack, Madame Cheng, Sir Francis Drake or a classic eyepatch-and-parrot captain, a great gift, birthday card or poster for any swashbuckler in your life.',
    features: ['Face Mapping', 'Famous Pirates', 'Print Services', 'Digital Art'],
    category: 'Entertainment/ art and decoration',
    sourceImage: soldierify,
    beforeImage: pirateifyBefore,
    afterImage: pirateifyAfter
  },
  {
    id: 'mythify',
    name: 'Mythify',
    description: 'Be a mythological god or hero by photo transformation, digital and printable art',
    fullDescription: 'Drop a photo and it puts your face on a mythological figure selecting from gods, heroes and legendary creatures from world mythology, whether enthroned on Olympus, charging into legendary battle, or wielding divine weapons. You can use the image as digital art in its own right or send it to printify and get your likeness as a poster of yourself as Zeus, Thor, Anubis, Athena, a Norse valkyrie, a Hindu deity or a Japanese oni, a great gift, birthday card or poster for any mythology lover.',
    features: ['Face Mapping', 'Gods & Heroes', 'Print Services', 'Digital Art'],
    category: 'Entertainment/ art and decoration',
    sourceImage: soldierify,
    beforeImage: mythifyBefore,
    afterImage: mythifyAfter
  },
  {
    id: 'knightify',
    name: 'Knightify',
    description: 'Be a medieval knight or warrior by photo transformation, digital and printable art',
    fullDescription: 'Drop a photo and it puts your face on a knight or medieval warrior selecting from chivalric orders across history, jousting at tournament, charging on the battlefield, or kneeling at a royal court. You can use the image as digital art in its own right or send it to printify and get your likeness as a poster of yourself as a Templar crusader, a Japanese samurai, an English longbowman, a Teutonic knight or a Round Table champion, a great gift, birthday card or poster for father\'s day or any history buff.',
    features: ['Face Mapping', 'Knights & Samurai', 'Print Services', 'Digital Art'],
    category: 'Entertainment/ art and decoration',
    sourceImage: soldierify,
    beforeImage: knightifyBefore,
    afterImage: knightifyAfter
  },
  {
    id: 'threadgauge',
    name: 'ThreadGauge',
    description: 'Scan a screw or bolt with your phone — get its thread spec back',
    fullDescription: 'Point your phone camera at a screw, bolt, or threaded fastener and get an identification — ISO Metric (M1–M60), BSP, UNC, UNF, with thread specs and material grades. On-device ML via TensorFlow Lite means it works offline, and no data leaves the device unless you opt in. Confirmed matches feed back into the training set, sharpening accuracy over time. In development — currently closer to a home-workshop tool, with serious engineering use (maintenance fitters, fabricators, mechanics) as the model matures. Mobile app for iOS and Android.',
    features: ['Camera-based thread ID', 'Offline ML (TensorFlow Lite)', '70+ thread specifications', 'iOS and Android'],
    category: 'Workshop / Engineering',
    sourceImage: screwLoose
  }
];