export interface OrganQuiz {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface BodyOrgan {
  id: string;
  name: string;
  urduName: string;
  nickname: string;
  regionId: string;
  regionName: string;
  system: string;
  systemColor: string;
  badgeBg: string;
  weightSize: string;
  location: string;
  dailyStat: string;
  shortDesc: string;
  fullDescription: string;
  howItWorks: string[];
  funFacts: string[];
  healthyHabits: string[];
  quiz: OrganQuiz;
  svgType: string;
}

export interface BodyRegion {
  id: string;
  name: string;
  urduName: string;
  subtitle: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  badgeColor: string;
  description: string;
  organIds: string[];
  svgHotspot: {
    cx: number;
    cy: number;
    r: number;
    labelX: number;
    labelY: number;
  };
}

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: 'head',
    name: 'Head, Brain & Senses',
    urduName: 'سر، دماغ اور حواس خمسہ',
    subtitle: 'Thoughts, Memory & 5 Senses',
    color: '#3b82f6',
    bgGradient: 'from-blue-600 via-indigo-600 to-cyan-600',
    borderColor: 'border-blue-400',
    badgeColor: 'bg-blue-500',
    description: 'دماغ، نیورونز، کھوپڑی، آنکھیں، کان کی باریک ہڈیاں، ناک اور زبان کا کنٹرول سینٹر۔',
    organIds: ['brain', 'neuron', 'skull', 'eyes', 'retina', 'ears', 'ear-bones', 'nose', 'tongue', 'teeth'],
    svgHotspot: { cx: 200, cy: 90, r: 42, labelX: 300, labelY: 80 }
  },
  {
    id: 'throat',
    name: 'Neck & Throat',
    urduName: 'گردن، گلا اور غدود',
    subtitle: 'Airway, Voice & Hormones',
    color: '#06b6d4',
    bgGradient: 'from-cyan-600 via-teal-600 to-blue-600',
    borderColor: 'border-cyan-400',
    badgeColor: 'bg-cyan-500',
    description: 'سانس کی نالی، خوراک کی نالی، آواز کی تاریں (حنجرہ) اور تھائرائڈ غدود۔',
    organIds: ['trachea', 'vocal-cords', 'esophagus', 'thyroid'],
    svgHotspot: { cx: 200, cy: 155, r: 35, labelX: 300, labelY: 150 }
  },
  {
    id: 'chest',
    name: 'Chest, Heart & Lungs',
    urduName: 'سینہ، دل اور پھیپھڑے',
    subtitle: 'The Rhythm of Life & Breath',
    color: '#ef4444',
    bgGradient: 'from-rose-600 via-red-600 to-pink-600',
    borderColor: 'border-red-400',
    badgeColor: 'bg-red-500',
    description: 'دل، دل کے والوز، پھیپھڑے، باریک ہوائی تھیلیاں (Alveoli)، ڈایافرام اور پسلیوں کا پنجرہ۔',
    organIds: ['heart', 'heart-valves', 'lungs', 'alveoli', 'diaphragm', 'ribcage'],
    svgHotspot: { cx: 200, cy: 225, r: 52, labelX: 300, labelY: 220 }
  },
  {
    id: 'circulation',
    name: 'Veins, Arteries & Blood',
    urduName: 'رگیں، شریانیں اور خون',
    subtitle: 'The Complete Circulatory Highway',
    color: '#dc2626',
    bgGradient: 'from-red-600 via-rose-700 to-blue-700',
    borderColor: 'border-rose-400',
    badgeColor: 'bg-red-600',
    description: 'نیلی رگیں، سرخ شریانیں، باریک ترین کیپیلریز، اور خون کے سرخ و سفید خلیات۔',
    organIds: ['veins', 'arteries', 'capillaries', 'blood-cells', 'platelets'],
    svgHotspot: { cx: 120, cy: 260, r: 42, labelX: 40, labelY: 250 }
  },
  {
    id: 'abdomen',
    name: 'Abdomen & Digestive Lab',
    urduName: 'پیٹ اور نظام انہضام',
    subtitle: 'Food Processing & Filtration',
    color: '#f59e0b',
    bgGradient: 'from-amber-500 via-orange-600 to-yellow-600',
    borderColor: 'border-amber-400',
    badgeColor: 'bg-amber-500',
    description: 'معدہ، جگر، پتہ، گردے، نیفرونز، چھوٹی آنت، باریک Villi، بڑی آنت، لبلبہ اور تلی۔',
    organIds: ['stomach', 'liver', 'gallbladder', 'pancreas', 'kidneys', 'nephrons', 'bladder', 'small-intestine', 'villi', 'large-intestine', 'appendix', 'spleen'],
    svgHotspot: { cx: 200, cy: 335, r: 54, labelX: 300, labelY: 330 }
  },
  {
    id: 'skeleton',
    name: 'Spine, Bones & Joints',
    urduName: 'ڈھانچہ، ریڑھ کی ہڈی اور جوڑ',
    subtitle: 'Armor, Cartilage & Framework',
    color: '#10b981',
    bgGradient: 'from-emerald-600 via-teal-600 to-green-600',
    borderColor: 'border-emerald-400',
    badgeColor: 'bg-emerald-500',
    description: '33 مہروں والی ریڑھ کی ہڈی، حرام مغز، کولہے کی ہڈی، ران کی ہڈی، اور لچکدار جوڑ۔',
    organIds: ['spine', 'spinal-cord', 'pelvis', 'femur', 'joints-cartilage', 'ligaments'],
    svgHotspot: { cx: 200, cy: 450, r: 46, labelX: 300, labelY: 445 }
  },
  {
    id: 'limbs',
    name: 'Muscles, Arms & Movement',
    urduName: 'پٹھے، بازو اور ٹانگیں',
    subtitle: 'Power, Tendons & Motion',
    color: '#8b5cf6',
    bgGradient: 'from-purple-600 via-violet-600 to-indigo-600',
    borderColor: 'border-purple-400',
    badgeColor: 'bg-purple-500',
    description: '600 سے زائد پٹھے، بائسپس، گھٹنے کا جوڑ، ہاتھ کی انگلیاں اور پاؤں کا لچکدار نظام۔',
    organIds: ['biceps', 'knee-joint', 'hand-fingers', 'foot-ankle'],
    svgHotspot: { cx: 200, cy: 560, r: 50, labelX: 300, labelY: 555 }
  },
  {
    id: 'microscopic',
    name: 'Skin, Nails & Microscopic DNA',
    urduName: 'جلد، ناخن اور باریک خلیات',
    subtitle: 'Outer Shield, Keratin & DNA',
    color: '#ec4899',
    bgGradient: 'from-pink-600 via-rose-500 to-purple-600',
    borderColor: 'border-pink-400',
    badgeColor: 'bg-pink-500',
    description: 'حفاظتی واٹر پروف جلد، پسینے کے مسام، مضبوط ناخن، اور مائیکروسکوپک ڈی این اے خلیہ۔',
    organIds: ['skin', 'nails', 'dna-cells'],
    svgHotspot: { cx: 280, cy: 380, r: 40, labelX: 350, labelY: 380 }
  }
];

export const BODY_ORGANS: Record<string, BodyOrgan> = {
  // --- REGION 1: HEAD, BRAIN & SENSES ---
  brain: {
    id: 'brain',
    name: 'Brain',
    urduName: 'دماغ (مغز)',
    nickname: 'The Master Supercomputer (سپر کمپیوٹر) 🧠',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Nervous System (نظام اعصاب)',
    systemColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    badgeBg: 'bg-indigo-600',
    weightSize: 'Approx. 1.4 kg (3 pounds)',
    location: 'Inside the protective cranial bone of your head',
    dailyStat: 'Generates ~20 watts of electrical power and processes 70,000 thoughts every day!',
    shortDesc: 'The master command center of your entire body that controls thinking, memories, heartbeat, emotions, and movement.',
    fullDescription: 'Your brain contains over 86 billion interconnected neurons communicating via electrical and chemical signals. Divided into the Cerebrum, Cerebellum, and Brainstem, it operates 24 hours a day without stopping, even creating wonderful dreams while you sleep!',
    howItWorks: [
      'Receives sensory inputs from eyes, ears, skin, nose, and tongue via nerve pathways.',
      'Processes inputs in specialized brain lobes (Frontal, Parietal, Occipital, Temporal).',
      'Sends instructions down the spinal cord to muscles and organs in milliseconds.',
      'Stores experiences as long-term memories and generates thoughts, emotions, and dreams.'
    ],
    funFacts: [
      'The brain consumes about 20% of all oxygen and glucose used by your whole body!',
      'Brain tissue itself has zero pain receptors; surgeons can perform operations while patients are awake!',
      'When you learn something new, physical connections between your neurons strengthen and create new pathways.'
    ],
    healthyHabits: [
      'Sleep 8 to 10 hours every night to clear brain waste and consolidate memories.',
      'Drink plenty of water — your brain is made of approximately 75% water!',
      'Always wear a protective helmet when cycling, skating, or playing cricket.'
    ],
    quiz: {
      question: 'Which organ is the master supercomputer of your body?',
      options: ['The Stomach', 'The Brain (دماغ)', 'The Liver'],
      answer: 'The Brain (دماغ)',
      explanation: 'Zabardast! The brain (دماغ) is the command center controlling your entire body!'
    },
    svgType: 'brain'
  },

  neuron: {
    id: 'neuron',
    name: 'Brain Neurons & Synapses',
    urduName: 'دماغی خلیات اور نیورونز',
    nickname: 'The Electric Messengers (برقی تاریں) ⚡',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Nervous System (نظام اعصاب)',
    systemColor: 'text-indigo-700 bg-indigo-50 border-indigo-300',
    badgeBg: 'bg-indigo-700',
    weightSize: 'Microscopic (about 100 microns long, with axons up to 1 meter)',
    location: 'Spread throughout the brain, spinal cord, and all body nerves',
    dailyStat: '86 billion neurons firing trillions of electrical impulses every single second!',
    shortDesc: 'Microscopic branched nerve cells that transmit information using tiny electrical pulses and neurotransmitters.',
    fullDescription: 'Neurons are the microscopic building blocks of your nervous system. Each neuron has a cell body, branching dendrites that receive signals, and a long axon that transmits electrical pulses at speeds up to 400 km/h across tiny gaps called synapses.',
    howItWorks: [
      'Dendrites receive incoming chemical neurotransmitters from neighboring cells.',
      'An action potential (tiny electric spark) rushes down the long axon fiber.',
      'Myelin sheath insulation ensures signals travel at lightning speed without leaking.',
      'Synaptic vesicles release chemical messengers across the synapse to the next neuron.'
    ],
    funFacts: [
      'There are more neural connections in your brain than there are stars in the Milky Way galaxy!',
      'Signals in fast motor neurons travel faster than a Formula 1 race car (up to 400 km/h)!',
      'Neuroplasticity allows your brain to grow new neural connections at any age!'
    ],
    healthyHabits: [
      'Solve puzzles, read books, and learn new skills to build new neural connections.',
      'Eat omega-3 rich foods like walnuts, chia seeds, and leafy greens.',
      'Exercise daily — physical activity stimulates brain-derived neurotrophic factor (BDNF).'
    ],
    quiz: {
      question: 'How many neurons are roughly packed inside the human brain?',
      options: ['1 Million', '86 Billion', '100 Thousand'],
      answer: '86 Billion',
      explanation: 'Incredible! Your brain contains approximately 86 billion neurons working together!'
    },
    svgType: 'neuron'
  },

  skull: {
    id: 'skull',
    name: 'Skull & Cranium',
    urduName: 'کھوپڑی (جمجمہ)',
    nickname: 'The Natural Helmet (قدرتی ہیلمٹ) 🪖',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Skeletal System (نظام ہڈی)',
    systemColor: 'text-slate-600 bg-slate-100 border-slate-300',
    badgeBg: 'bg-slate-700',
    weightSize: 'Approx. 1 kg (composed of 22 fused bones)',
    location: 'Encloses the brain and forms the facial framework',
    dailyStat: 'Shields your delicate brain from bumps and falls 24 hours a day!',
    shortDesc: 'A rigid protective dome made of 22 interlocking bones that safeguards your soft brain and anchors your facial features.',
    fullDescription: 'The skull consists of 8 cranial bones that fuse together at zigzag joints called sutures to create a tough protective vault around your brain, and 14 facial bones that form your eye sockets, nasal cavity, and movable jaw.',
    howItWorks: [
      'Curved dome geometry disperses external impact energy around the brain.',
      'Rigid eye sockets protect delicate eyeballs from frontal impact.',
      'The mandible (lower jaw) hinges smoothly to cut and grind food.',
      'Suture joints lock the 22 bones into an unshakeable protective fortress.'
    ],
    funFacts: [
      'The lower jawbone (mandible) is the only bone in the entire human skull that can move!',
      'Babies are born with flexible soft spots called fontanelles so their brains can grow safely.',
      'Pound for pound, skull bone is as strong as solid oak wood!'
    ],
    healthyHabits: [
      'Always strap on a safety helmet when riding a bicycle, skateboard, or scooter.',
      'Eat calcium-rich foods like milk, curd, almonds, and green veggies.',
      'Protect your head during sports and never play near dangerous edges.'
    ],
    quiz: {
      question: 'Which is the ONLY bone in your skull that can move?',
      options: ['Forehead bone', 'Lower Jaw (Mandible)', 'Nose bone'],
      answer: 'Lower Jaw (Mandible)',
      explanation: 'Super! The lower jaw (mandible / جبڑا) moves up and down so you can chew and speak!'
    },
    svgType: 'skull'
  },

  eyes: {
    id: 'eyes',
    name: 'Eyes (Cornea & Iris)',
    urduName: 'آنکھیں (پتلیاں اور قرنیہ)',
    nickname: 'The Living HD Cameras (زندہ کیمرے) 👁️',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Sensory System (حسی نظام)',
    systemColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    badgeBg: 'bg-cyan-600',
    weightSize: 'Approx. 7.5 grams each (2.5 cm diameter)',
    location: 'Encased inside the bony eye sockets of the skull',
    dailyStat: 'Blinks ~15,000 to 20,000 times a day to lubricate and clean the lens!',
    shortDesc: 'Precision sensory organs that capture light, colors, and motion, transmitting 3D stereoscopic vision to the brain.',
    fullDescription: 'Light passes through the clear cornea, into the pupil controlled by the colorful iris, and is focused by a flexible crystal-clear lens onto the retina, providing sharp 3D color vision.',
    howItWorks: [
      'Light enters through the clear front window (cornea).',
      'The colored iris expands or contracts to control pupil size.',
      'Ciliary muscles flex the internal lens to focus near or far.',
      'Tears from lacrimal glands wash away dust and microbes with every blink.'
    ],
    funFacts: [
      'Your eyes can distinguish between approximately 10 million distinct colors!',
      'Eye muscles are the most active and fastest reacting muscles in your entire body!',
      'Fingerprints have 40 unique traits, but your eye iris has over 256 unique markers!'
    ],
    healthyHabits: [
      'Follow the 20-20-20 rule: Every 20 minutes, look at an object 20 feet away for 20 seconds.',
      'Eat vitamin-A rich foods like carrots, papayas, mangoes, and spinach.',
      'Never rub your eyes with unwashed hands.'
    ],
    quiz: {
      question: 'What colored muscular ring adjusts the size of your pupil?',
      options: ['The Iris', 'The Eyelash', 'The Eyebrow'],
      answer: 'The Iris',
      explanation: 'Spot on! The iris is the colorful ring that controls how much light enters your eye!'
    },
    svgType: 'eyes'
  },

  retina: {
    id: 'retina',
    name: 'Retina & Optic Nerve',
    urduName: 'پردہ بصارت اور بصری رگ',
    nickname: 'The Light Sensor Screen (تصویری پردہ) 📷',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Sensory System (حسی نظام)',
    systemColor: 'text-blue-700 bg-blue-50 border-blue-200',
    badgeBg: 'bg-blue-700',
    weightSize: 'Paper-thin layer (~0.2 mm) lining the back of the eyeball',
    location: 'Lining the interior back wall of the eyeball, connecting to optic nerve',
    dailyStat: 'Contains over 120 million rods and 7 million cones processing images!',
    shortDesc: 'A delicate layer of photoreceptor cells at the back of the eye that converts focused light into electrical brain signals.',
    fullDescription: 'The retina is the biological film of your eye. Over 120 million rod cells detect shapes and low light, while 7 million cone cells capture sharp colors. The optic nerve then channels this visual data straight to your brain.',
    howItWorks: [
      'Focused photons of light hit the photoreceptor rods and cones.',
      'Rods detect black, white, and motion; cones detect red, green, and blue colors.',
      'Chemical reactions generate electrical impulses in retinal ganglion cells.',
      'Over 1 million nerve fibers in the optic nerve carry images to the visual cortex.'
    ],
    funFacts: [
      'Images actually hit your retina upside down! Your brain automatically flips them right side up!',
      'Your eye has a tiny natural blind spot where the optic nerve leaves the retina!',
      'Rods are so sensitive they can detect a single photon of light in total darkness!'
    ],
    healthyHabits: [
      'Wear UV-protective sunglasses on bright sunny days.',
      'Eat lutein and zeaxanthin-rich foods like corn, egg yolks, and green leafy vegetables.',
      'Avoid reading on bright screens in pitch-dark rooms.'
    ],
    quiz: {
      question: 'How do images initially hit your retina before your brain processes them?',
      options: ['Upside down', 'Right side up', 'Backwards'],
      answer: 'Upside down',
      explanation: 'Amazing! Lenses invert the image upside down, and your brain flips it right side up!'
    },
    svgType: 'retina'
  },

  ears: {
    id: 'ears',
    name: 'Ears & Eardrum',
    urduName: 'کان اور کان کا پردہ',
    nickname: 'Sound Waves & Balance Station 👂',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Sensory System (حسی نظام)',
    systemColor: 'text-amber-600 bg-amber-50 border-amber-200',
    badgeBg: 'bg-amber-600',
    weightSize: 'Outer ear + inner cochlea (the size of a pea)',
    location: 'Both sides of your head inside temporal bones',
    dailyStat: 'Processes background audio 24 hours a day without ever sleeping!',
    shortDesc: 'A double-duty sensory organ that captures sound vibrations and contains fluid canals that keep you balanced.',
    fullDescription: 'Your ears funnel air vibrations down the ear canal to vibrate the eardrum. Semicircular canals filled with fluid detect head movements, allowing you to walk, jump, and ride a bike without falling over!',
    howItWorks: [
      'The outer pinna gathers sound waves and directs them into the ear canal.',
      'Sound waves strike the thin eardrum (tympanic membrane), making it vibrate.',
      'Vibrations ripple into the snail-shaped cochlea filled with fluid.',
      'Fluid motion bends microscopic hair cells, generating signals for the auditory nerve.'
    ],
    funFacts: [
      'Your ears never sleep! While you snooze, your brain filters out safe background noises.',
      'The semicircular canals in your ears are your body’s natural gyroscope for balancing on one leg!',
      'Earwax (cerumen) is an antibacterial protective shield that traps dirt and bugs.'
    ],
    healthyHabits: [
      'Keep headphone volume under 60% to avoid damaging delicate cochlear hair cells.',
      'Never insert sharp objects, pencils, or cotton swabs into your ear canal.',
      'Dry ears gently with a clean soft towel after swimming.'
    ],
    quiz: {
      question: 'Which organ is responsible for keeping your body balanced as you walk?',
      options: ['The Stomach', 'The Inner Ear (اندرونی کان)', 'The Elbow'],
      answer: 'The Inner Ear (اندرونی کان)',
      explanation: 'Super! The fluid canals in your inner ear give you balance so you do not fall over!'
    },
    svgType: 'ears'
  },

  'ear-bones': {
    id: 'ear-bones',
    name: '3 Tiny Ear Bones (Ossicles)',
    urduName: 'کان کی 3 باریک ہڈیاں (ہتھوڑی، سندان، رکاب)',
    nickname: 'The Tiniest Bones in the Body 🔍',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Skeletal & Sensory',
    systemColor: 'text-amber-700 bg-amber-50 border-amber-300',
    badgeBg: 'bg-amber-700',
    weightSize: 'The Stapes is only 3 mm long (smaller than a single grain of rice!)',
    location: 'Inside the middle ear air cavity behind the eardrum',
    dailyStat: 'Vibrates thousands of times every second with every spoken word or song!',
    shortDesc: 'A chain of three microscopic bones (Malleus, Incus, Stapes) that amplify sound vibrations into the inner ear.',
    fullDescription: 'These three miniature bones — commonly called the Hammer (Malleus), Anvil (Incus), and Stirrup (Stapes) — form a microscopic lever system. They amplify sound wave vibrations by over 20 times to pass them smoothly into the fluid of the inner ear.',
    howItWorks: [
      'The vibrating eardrum pushes the Hammer (Malleus) bone.',
      'The Hammer levers the Anvil (Incus) bone in the center.',
      'The Anvil taps the Stirrup (Stapes) bone against the oval window of the cochlea.',
      'Amplifies sound vibrations 20-fold so they can travel through liquid.'
    ],
    funFacts: [
      'The Stapes (stirrup) is officially the smallest and lightest bone in the entire human body!',
      'All three bones together could easily fit on the surface of a ten-cent coin!',
      'Unlike other bones, these three bones are already fully grown at birth!'
    ],
    healthyHabits: [
      'Avoid sudden deafening loud sounds like firecrackers close to your ears.',
      'Treat ear infections promptly to protect the delicate ossicle joints.',
      'Wear earplugs in loud industrial or concert settings.'
    ],
    quiz: {
      question: 'What is the smallest bone in the entire human body?',
      options: ['The Stapes (in the ear)', 'Pinky toe bone', 'Nose bone'],
      answer: 'The Stapes (in the ear)',
      explanation: 'Bingo! The Stapes (رکاب) inside your middle ear is only 3 millimeters long!'
    },
    svgType: 'ear-bones'
  },

  nose: {
    id: 'nose',
    name: 'Nose & Olfactory Nerves',
    urduName: 'ناک اور سونگھنے کے اعصاب',
    nickname: 'The Air Filter & Aroma Detective 👃',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Respiratory & Sensory',
    systemColor: 'text-teal-600 bg-teal-50 border-teal-200',
    badgeBg: 'bg-teal-600',
    weightSize: 'Cartilage framework with nasal cavities containing millions of receptors',
    location: 'Center of the face, leading back into nasal pharynx',
    dailyStat: 'Can detect over 1 trillion distinct odor combinations and warms 10,000 liters of air!',
    shortDesc: 'A dual airway that warms, humidifies, and filters inhaled air, while detecting thousands of scents using olfactory nerves.',
    fullDescription: 'Your nose is your respiratory first line of defense. Tiny hairs (cilia) and mucus trap dust, allergens, and bacteria. High in the nasal cavity, the olfactory epithelium has 10 million receptor neurons connected directly to your brain’s smell center.',
    howItWorks: [
      'Inhaled air is warmed by dense capillary networks inside nasal turbinates.',
      'Mucus and cilia filter out airborne dust particles and pathogens.',
      'Airborne scent molecules bind to microscopic olfactory receptors.',
      'Signals travel directly through the cribriform plate to the brain olfactory bulb.'
    ],
    funFacts: [
      'Your sense of smell is responsible for about 80% of what you perceive as food flavor!',
      'Humans can distinguish between more than 1 trillion distinct scents!',
      'Your nose cleans and humidifies about 15,000 breaths of air every day!'
    ],
    healthyHabits: [
      'Never stick small objects or fingers into your nostrils.',
      'Use a clean handkerchief when sneezing or blowing your nose.',
      'Stay away from harsh chemical vapors and pollution.'
    ],
    quiz: {
      question: 'What percentage of food flavor is actually detected by your sense of smell?',
      options: ['About 80%', 'Only 10%', 'Exactly 50%'],
      answer: 'About 80%',
      explanation: 'Fascinating! About 80% of what we think we taste is actually detected by our sense of smell!'
    },
    svgType: 'nose'
  },

  tongue: {
    id: 'tongue',
    name: 'Tongue & Taste Buds',
    urduName: 'زبان اور ذائقے کی کلیاں',
    nickname: 'The Flavor Explorer & Speech Artist 👅',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Digestive & Sensory',
    systemColor: 'text-rose-600 bg-rose-50 border-rose-200',
    badgeBg: 'bg-rose-500',
    weightSize: 'Approx. 70 grams (group of 8 intertwined muscles)',
    location: 'Anchored at the floor of the mouth extending back to the throat',
    dailyStat: 'Houses ~10,000 microscopic taste buds that renew every 10 to 14 days!',
    shortDesc: 'A muscular hydrostat with no bones that detects sweet, sour, salty, bitter, and umami tastes while forming speech sounds.',
    fullDescription: 'The tongue is made of 8 strong intertwined muscles. Thousands of tiny bumps called papillae contain microscopic taste buds that tell your brain if an apple is sweet or a medicine is bitter. It also guides chewed food into a swallowable ball.',
    howItWorks: [
      'Food molecules dissolve in saliva and wash into taste bud pores.',
      'Receptors detect 5 core tastes: Sweet, Salty, Sour, Bitter, and Umami.',
      'The 8 flexible muscles shape letters like T, D, L, S, and R against the palate.',
      'Pushes chewed food (bolus) backward into the esophagus for safe swallowing.'
    ],
    funFacts: [
      'Just like fingerprints, every single person on Earth has a completely unique tongue print!',
      'The tongue is one of the only muscles in your body that never gets tired from talking!',
      'Taste buds are not only on the tongue; some are located on the roof of your mouth and throat!'
    ],
    healthyHabits: [
      'Gently clean your tongue with a scraper or soft toothbrush daily to remove bacteria.',
      'Avoid drinking boiling hot beverages that could scald delicate taste buds.',
      'Drink plenty of water to keep your mouth moist and saliva flowing.'
    ],
    quiz: {
      question: 'Which of these is NOT one of the 5 basic tastes detected by your tongue?',
      options: ['Sweet', 'Spicy', 'Bitter'],
      answer: 'Spicy',
      explanation: 'Clever! Spiciness is actually a heat and pain sensation detected by nerve fibers, not a taste bud flavor!'
    },
    svgType: 'tongue'
  },

  teeth: {
    id: 'teeth',
    name: 'Teeth, Enamel & Gums',
    urduName: 'دانت، مسوڑھے اور انیمل',
    nickname: 'The Diamond Grinders (مضبوط دانت) 🦷',
    regionId: 'head',
    regionName: 'Head, Brain & Senses',
    system: 'Digestive System (نظام انہضام)',
    systemColor: 'text-blue-600 bg-blue-50 border-blue-200',
    badgeBg: 'bg-blue-600',
    weightSize: '32 permanent adult teeth (or 20 milk teeth in children)',
    location: 'Rooted firmly in the upper and lower jawbones (mandible & maxilla)',
    dailyStat: 'Can bite down with up to 70 kilograms of crushing force!',
    shortDesc: 'Hard mineral structures coated in crystalline enamel that cut, tear, and grind nutritious food into digestible bites.',
    fullDescription: 'Tooth enamel is the hardest biological substance in the human body — even harder than your thigh bone! Incisors cut, canines tear, and premolars and molars grind food into fine pieces so stomach enzymes can digest them easily.',
    howItWorks: [
      'Incisors (front 8 teeth) cut food like sharp scissors.',
      'Canines (pointed teeth) tear tough fibrous textures.',
      'Premolars and Molars grind food into fine pulp.',
      'Periodontal ligaments cushion the roots inside the jawbone during chewing.'
    ],
    funFacts: [
      'Tooth enamel is the single hardest substance in the entire human body!',
      'Only two-thirds of each tooth is visible; the remaining one-third is hidden inside the gums!',
      'Humans only get two natural sets of teeth: milk teeth and permanent adult teeth.'
    ],
    healthyHabits: [
      'Brush teeth twice a day for two full minutes with fluoride toothpaste.',
      'Limit sugary sodas and sticky candies that feed cavity-causing plaque bacteria.',
      'Visit your friendly dentist twice a year for a regular checkup.'
    ],
    quiz: {
      question: 'What is the hardest substance in the entire human body?',
      options: ['Tooth Enamel', 'Femur bone', 'Fingernails'],
      answer: 'Tooth Enamel',
      explanation: 'Brilliant! Tooth enamel (انیمل) is crystalline mineral that is harder than any bone!'
    },
    svgType: 'teeth'
  },

  // --- REGION 2: NECK & THROAT ---
  trachea: {
    id: 'trachea',
    name: 'Windpipe (Trachea)',
    urduName: 'سانس کی نالی (حلقوم)',
    nickname: 'The Main Air Highway 🌬️',
    regionId: 'throat',
    regionName: 'Neck & Throat',
    system: 'Respiratory System (نظام تنفس)',
    systemColor: 'text-teal-600 bg-teal-50 border-teal-200',
    badgeBg: 'bg-teal-600',
    weightSize: 'About 10 to 12 cm long and 2 cm wide',
    location: 'Extends from the larynx down into the chest behind the sternum',
    dailyStat: 'Channels over 11,000 liters of filtered air into your lungs every single day!',
    shortDesc: 'A sturdy tube reinforced with cartilage rings that carries clean, warm air from your throat directly to your lungs.',
    fullDescription: 'The trachea is reinforced with 16 to 20 C-shaped cartilage rings that prevent it from collapsing like an empty straw when you inhale. Inside, microscopic waving hairs (cilia) and mucus sweep dust and germs upward and out of your lungs.',
    howItWorks: [
      'Channels humidified air from the throat down into the bronchial branches.',
      'C-shaped cartilage rings keep the airway permanently open.',
      'Cilia beat 1,000 times per minute to sweep trapped dust particles out.',
      'Divides at the carina into left and right primary bronchi.'
    ],
    funFacts: [
      'The epiglottis flap snaps shut like a trapdoor when you swallow food so you do not choke!',
      'The C-shaped rings are open at the back so the esophagus can expand when swallowing big bites!',
      'Cilia in the trachea sweep mucus upward like an automatic escalator!'
    ],
    healthyHabits: [
      'Chew food thoroughly and never talk or laugh with a full mouth.',
      'Stay away from secondhand cigarette smoke and toxic fumes.',
      'Drink warm fluids when you have a scratchy throat.'
    ],
    quiz: {
      question: 'What special trapdoor flap prevents food from going down your windpipe?',
      options: ['The Epiglottis', 'The Diaphragm', 'The Uvula'],
      answer: 'The Epiglottis',
      explanation: 'Correct! The epiglottis folds over the windpipe every time you swallow!'
    },
    svgType: 'trachea'
  },

  'vocal-cords': {
    id: 'vocal-cords',
    name: 'Voice Box & Vocal Cords (Larynx)',
    urduName: 'صوتی تاریں اور حنجرہ (آواز کا بکس)',
    nickname: 'The Voice Box & Musical Reeds 🎤',
    regionId: 'throat',
    regionName: 'Neck & Throat',
    system: 'Respiratory & Muscular',
    systemColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    badgeBg: 'bg-indigo-600',
    weightSize: 'Two twin elastic muscular folds inside the cartilage larynx',
    location: 'Sitting at the top of the windpipe in the middle of the neck',
    dailyStat: 'Can vibrate between 100 to over 1,000 times per second to create your speech and songs!',
    shortDesc: 'Two twin elastic folds of mucous membrane that vibrate together when exhaled air passes through to create your voice.',
    fullDescription: 'The larynx (voice box) houses two flexible vocal cords. When you breathe silently, they stay open. When you speak or sing, throat muscles bring them together, and air from your lungs makes them vibrate like musical guitar strings.',
    howItWorks: [
      'Laryngeal muscles pull the vocal cords close together.',
      'Air expelled from the lungs forces them to vibrate rapidly.',
      'Tightening the cords produces high pitch notes; relaxing them creates deep notes.',
      'Mouth, tongue, teeth, and lips shape the buzzing sound into words and singing.'
    ],
    funFacts: [
      'Vocal cords vibrate about 100 times per second for deep voices and over 300 times per second for children!',
      'The visible bump on the front of a neck is called the Adam’s apple (thyroid cartilage)!',
      'Whispering actually puts more mechanical strain on your vocal cords than speaking softly!'
    ],
    healthyHabits: [
      'Drink plenty of room-temperature water to keep vocal folds well-hydrated.',
      'Avoid screaming or shouting loudly for long periods to prevent vocal strain.',
      'Rest your voice when you have laryngitis or a sore throat.'
    ],
    quiz: {
      question: 'What makes your vocal cords vibrate to produce speech and singing?',
      options: ['Exhaled air from lungs', 'Food swallowing', 'Blood pumping'],
      answer: 'Exhaled air from lungs',
      explanation: 'Awesome! Air flowing up from your lungs makes the vocal cords vibrate like musical strings!'
    },
    svgType: 'vocal-cords'
  },

  esophagus: {
    id: 'esophagus',
    name: 'Food Pipe (Esophagus)',
    urduName: 'خوراک کی نالی (مری)',
    nickname: 'The Muscular Food Chute 🎢',
    regionId: 'throat',
    regionName: 'Neck & Throat',
    system: 'Digestive System (نظام انہضام)',
    systemColor: 'text-orange-600 bg-orange-50 border-orange-200',
    badgeBg: 'bg-orange-600',
    weightSize: 'About 25 cm (10 inches) long muscular tube',
    location: 'Runs down through the neck and chest behind the windpipe',
    dailyStat: 'Transports every bite and sip you take directly into the stomach in 4 to 8 seconds!',
    shortDesc: 'A muscular tube that uses rhythmic wave-like contractions (peristalsis) to push food down into the stomach.',
    fullDescription: 'The esophagus connects your throat to your stomach. It does not rely on gravity; muscular walls squeeze in coordinated waves called peristalsis, meaning food would still travel into your stomach even if you were hanging upside down on monkey bars!',
    howItWorks: [
      'Upper esophageal sphincter relaxes to let the chewed food bolus enter.',
      'Circular and longitudinal muscles squeeze rhythmically in waves (peristalsis).',
      'Mucus glands lubricate the passage so food slides smoothly down.',
      'Lower esophageal sphincter opens to let food into the stomach and snaps shut to prevent acid reflux.'
    ],
    funFacts: [
      'You can swallow food even when hanging completely upside down because of peristalsis muscles!',
      'It takes a bite of food only about 5 to 7 seconds to travel the entire length of the esophagus!',
      'Heartburn has nothing to do with the heart; it is stomach acid splashing into the lower esophagus.'
    ],
    healthyHabits: [
      'Chew food thoroughly before swallowing so large lumps do not get stuck.',
      'Avoid lying down flat immediately after eating a heavy meal.',
      'Drink water while eating dry foods to help smooth passage.'
    ],
    quiz: {
      question: 'Can you swallow food while hanging upside down?',
      options: ['Yes, due to muscle peristalsis', 'No, gravity stops it', 'Only liquids'],
      answer: 'Yes, due to muscle peristalsis',
      explanation: 'Super! Muscular peristalsis squeezes food down regardless of gravity!'
    },
    svgType: 'esophagus'
  },

  thyroid: {
    id: 'thyroid',
    name: 'Thyroid Gland',
    urduName: 'تھائرائڈ غدود (میٹابولزم کنٹرولر)',
    nickname: 'The Butterfly Energy Regulator 🦋',
    regionId: 'throat',
    regionName: 'Neck & Throat',
    system: 'Endocrine System (نظام غدود)',
    systemColor: 'text-purple-600 bg-purple-50 border-purple-200',
    badgeBg: 'bg-purple-600',
    weightSize: 'About 20 grams (shaped just like a butterfly)',
    location: 'In the front lower neck, wrapped around the trachea',
    dailyStat: 'Produces T3 and T4 hormones that govern how fast your cells burn energy and grow!',
    shortDesc: 'A butterfly-shaped gland in your neck that controls your body’s metabolism, energy levels, growth, and temperature.',
    fullDescription: 'The thyroid is your body’s engine thermostat. It absorbs iodine from your food to produce thyroid hormones (T3 and T4) that dictate how fast cells burn calories, how quickly your heart beats, and how kids grow taller.',
    howItWorks: [
      'Captures iodine from your diet to manufacture hormones T3 and T4.',
      'Releases hormones into the bloodstream to regulate cellular metabolic rate.',
      'Controls body temperature, protein synthesis, and bone development.',
      'Monitors feedback signals from the brain’s pituitary gland (TSH).'
    ],
    funFacts: [
      'The thyroid is shaped just like a butterfly with two wings wrapped around your windpipe!',
      'It controls how fast your body burns fuel: like the gas pedal in a car!',
      'Iodized table salt was introduced worldwide specifically to keep the thyroid gland healthy.'
    ],
    healthyHabits: [
      'Use iodized salt in daily family meals to provide essential iodine.',
      'Eat seafood, eggs, dairy, and cranberries rich in natural minerals.',
      'Get regular exercise to keep metabolism active.'
    ],
    quiz: {
      question: 'What winged creature does the thyroid gland resemble in shape?',
      options: ['A Butterfly 🦋', 'An Eagle 🦅', 'A Dragon 🐉'],
      answer: 'A Butterfly 🦋',
      explanation: 'Spot on! The thyroid gland is shaped just like a delicate butterfly wrapped around your neck!'
    },
    svgType: 'thyroid'
  },

  // --- REGION 3: CHEST, HEART & LUNGS ---
  heart: {
    id: 'heart',
    name: 'Heart',
    urduName: 'دل (قلب)',
    nickname: 'The Tireless Life Pump (زندگی کا پمپ) ❤️',
    regionId: 'chest',
    regionName: 'Chest, Heart & Lungs',
    system: 'Circulatory System (نظام دوران خون)',
    systemColor: 'text-rose-600 bg-rose-50 border-rose-200',
    badgeBg: 'bg-rose-600',
    weightSize: 'About the size of your clenched fist (~300 grams)',
    location: 'Center of chest cavity, tilted slightly to the left side',
    dailyStat: 'Beats ~100,000 times a day & pumps ~7,500 liters of blood through 100,000 km of vessels!',
    shortDesc: 'A powerful muscular pump that continuously circulates fresh oxygen and nutrient-rich blood to every cell in your body.',
    fullDescription: 'Your heart is a double-pump made of specialized cardiac muscle. Divided into four chambers (Right Atrium, Right Ventricle, Left Atrium, Left Ventricle), it receives deoxygenated blood, pumps it to the lungs for oxygen, and then launches sparkling oxygenated blood through your aorta to fuel every cell from head to toe.',
    howItWorks: [
      'Right Atrium receives oxygen-poor blood returning from working muscles.',
      'Right Ventricle sends it to the lungs to exchange carbon dioxide for oxygen.',
      'Left Atrium receives sparkling oxygen-rich blood returning from the lungs.',
      'Left Ventricle powerfully squeezes to pump oxygenated blood out to the whole body.'
    ],
    funFacts: [
      'If you stretched out all blood vessels your heart pumps through, they would wrap around Earth twice!',
      'A child’s heart beats faster than an adult’s: about 80 to 120 beats per minute!',
      'The "thump-thump" heartbeat sound is made by 4 internal valves snapping shut.'
    ],
    healthyHabits: [
      'Run, cycle, swim, or dance for 30 minutes every day to keep your heart muscle strong.',
      'Eat colorful fruits, nuts, and leafy greens while minimizing deep-fried snacks.',
      'Take slow deep breaths when feeling stressed to relax your pulse.'
    ],
    quiz: {
      question: 'How many chambers does the human heart have?',
      options: ['2 chambers', '4 chambers', '6 chambers'],
      answer: '4 chambers',
      explanation: 'Spot on! The human heart has 4 chambers: two atria on top and two ventricles on the bottom!'
    },
    svgType: 'heart'
  },

  'heart-valves': {
    id: 'heart-valves',
    name: 'Heart Valves',
    urduName: 'دل کے چار والوز (خون کے یک طرفہ دروازے)',
    nickname: 'The One-Way Traffic Gates 🚪',
    regionId: 'chest',
    regionName: 'Chest, Heart & Lungs',
    system: 'Circulatory System (نظام دوران خون)',
    systemColor: 'text-rose-700 bg-rose-50 border-rose-300',
    badgeBg: 'bg-rose-700',
    weightSize: 'Paper-thin tissue flaps (Tricuspid, Pulmonary, Mitral, Aortic)',
    location: 'Positioned between heart chambers and exiting large arteries',
    dailyStat: 'Snaps open and shut over 100,000 times a day with zero pause!',
    shortDesc: 'Four microscopic one-way doorway flaps that ensure blood flows only in one forward direction through the heart.',
    fullDescription: 'The four heart valves — Tricuspid, Pulmonary, Mitral (Bicuspid), and Aortic — open cleanly to allow forward blood flow and snap shut instantly to prevent any backflow. The classic "lub-dub" sound of a heartbeat is actually the sound of these valves snapping closed.',
    howItWorks: [
      'Tricuspid and Mitral valves open as atria contract to fill the ventricles.',
      'As ventricles squeeze, these valves snap shut with a firm "LUB" sound.',
      'Aortic and Pulmonary valves swing open to let blood surge into the aorta and lungs.',
      'As pressure drops, they snap shut with a crisp "DUB" sound to prevent backward leakage.'
    ],
    funFacts: [
      'The "lub-dub" sound heard through a stethoscope is the sound of heart valves snapping shut!',
      'Heart valves are strong enough to withstand high hydraulic blood pressures for over 80 years!',
      'The Mitral valve is named because its shape resembles a bishop’s traditional mitre hat.'
    ],
    healthyHabits: [
      'Brush teeth twice daily — mouth bacteria can enter the bloodstream and irritate heart valves.',
      'Exercise aerobically to keep heart chambers elastic and valves healthy.',
      'Eat a heart-healthy diet with fresh fruits, lentils, and olive or mustard oils.'
    ],
    quiz: {
      question: 'What creates the famous "lub-dub" heartbeat sound?',
      options: ['Valves snapping shut', 'Bones rubbing', 'Lungs deflating'],
      answer: 'Valves snapping shut',
      explanation: 'Bingo! The "lub-dub" sound is produced by the four heart valves snapping firmly shut!'
    },
    svgType: 'heart-valves'
  },

  lungs: {
    id: 'lungs',
    name: 'Lungs',
    urduName: 'پھیپھڑے (نظام تنفس)',
    nickname: 'The Oxygen Balloon Station 🫁',
    regionId: 'chest',
    regionName: 'Chest, Heart & Lungs',
    system: 'Respiratory System (نظام تنفس)',
    systemColor: 'text-sky-600 bg-sky-50 border-sky-200',
    badgeBg: 'bg-sky-600',
    weightSize: 'Approx. 1.3 kg total (Right lung is slightly bigger than left)',
    location: 'Fills most of your chest cavity on both sides of your heart',
    dailyStat: 'You take about 20,000 breaths every single day without even thinking about it!',
    shortDesc: 'A pair of spongy, pink organs that absorb fresh oxygen from inhaled air and exhale carbon dioxide waste.',
    fullDescription: 'Your lungs are two spongy, elastic organs resting safely inside your rib cage. Inside each lung is an upside-down branching tree of airways ending in over 600 million microscopic air sacs called alveoli, where oxygen enters the bloodstream.',
    howItWorks: [
      'The diaphragm pulls down, expanding your chest so air rushes into airways.',
      'Air branches through bronchi and smaller bronchioles.',
      'In 600 million alveoli, oxygen diffuses into red blood cells.',
      'Waste carbon dioxide is collected and exhaled as the diaphragm pushes back up.'
    ],
    funFacts: [
      'Your left lung is slightly smaller than your right lung to leave room for your heart!',
      'If you unfolded all 600 million air sacs in your lungs, they would cover a tennis court!',
      'Lungs are the only organs in the human body that can float on water!'
    ],
    healthyHabits: [
      'Spend time outdoors in fresh, clean morning air doing light exercises or deep breathing.',
      'Never breathe in cigarette smoke, vehicle exhaust, or toxic fumes.',
      'Sit and stand tall with your shoulders back so your lungs can expand fully.'
    ],
    quiz: {
      question: 'Why is your left lung slightly smaller than your right lung?',
      options: ['To make room for the heart', 'To hold extra water', 'Because it breathes less air'],
      answer: 'To make room for the heart',
      explanation: 'Exactly right! Your heart sits tilted to the left, so the left lung is curved to fit snugly beside it!'
    },
    svgType: 'lungs'
  },

  alveoli: {
    id: 'alveoli',
    name: 'Microscopic Alveoli (Air Sacs)',
    urduName: 'باریک ہوائی تھیلیاں (ایلوولائی)',
    nickname: 'The Microscopic Oxygen Exchange Pods 🎈',
    regionId: 'chest',
    regionName: 'Chest, Heart & Lungs',
    system: 'Respiratory System (نظام تنفس)',
    systemColor: 'text-cyan-700 bg-cyan-50 border-cyan-300',
    badgeBg: 'bg-cyan-700',
    weightSize: 'Microscopic clusters (~0.2 mm wide each, totaling 600 million sacs)',
    location: 'At the very tips of the smallest bronchioles deep inside both lungs',
    dailyStat: 'Exchanges over 2,000 liters of pure oxygen gas with blood capillaries every day!',
    shortDesc: 'Hundreds of millions of microscopic bubble-like sacs wrapped in capillaries where oxygen enters blood and carbon dioxide leaves.',
    fullDescription: 'Alveoli look like tiny microscopic clusters of grapes at the ends of your airways. Their walls are only one cell thick! Red blood cells squeeze through surrounding capillaries in single file, dropping off carbon dioxide and picking up fresh oxygen molecules in less than a second.',
    howItWorks: [
      'Inhaled oxygen fills the 600 million balloon-like alveoli.',
      'Oxygen diffuses across ultra-thin walls directly into capillary red blood cells.',
      'Waste carbon dioxide diffuses out of blood plasma into the alveoli space.',
      'Surfactant liquid keeps the tiny sacs from sticking together or collapsing.'
    ],
    funFacts: [
      'Your lungs contain between 480 to 600 million microscopic alveoli sacs!',
      'The total surface area of all your alveoli is roughly 70 to 100 square meters — as big as a tennis court!',
      'Alveoli walls are so thin that blood cells glide through them in less than three-quarters of a second!'
    ],
    healthyHabits: [
      'Practice deep abdominal breathing to open all lower alveolar clusters.',
      'Never inhale vape vapors or smoke which permanently damages fragile alveolar walls.',
      'Exercise aerobically to increase your lungs’ oxygen-transfer efficiency.'
    ],
    quiz: {
      question: 'How thick are the microscopic walls of the lung alveoli?',
      options: ['Only one cell thick', 'As thick as cardboard', '100 cells thick'],
      answer: 'Only one cell thick',
      explanation: 'Amazing! Alveoli walls are just one single cell thick so oxygen passes through instantly!'
    },
    svgType: 'alveoli'
  },

  diaphragm: {
    id: 'diaphragm',
    name: 'Diaphragm Muscle',
    urduName: 'ڈایافرام (سانس کا مرکزی پٹھا)',
    nickname: 'The Breathing Bellows 🎈',
    regionId: 'chest',
    regionName: 'Chest, Heart & Lungs',
    system: 'Respiratory & Muscular',
    systemColor: 'text-teal-700 bg-teal-50 border-teal-300',
    badgeBg: 'bg-teal-700',
    weightSize: 'A broad, dome-shaped muscular sheet separating chest from abdomen',
    location: 'Floor of the chest cavity, directly underneath lungs and heart',
    dailyStat: 'Contracts and relaxes over 20,000 times a day to power every single breath you take!',
    shortDesc: 'A large dome-shaped muscle at the base of the chest that contracts downward to pull air into the lungs.',
    fullDescription: 'The diaphragm is the primary muscle of respiration. When it contracts and flattens downward, it creates vacuum suction in your chest that draws fresh air in. When it relaxes upward, it pushes air out. Hiccups happen when your diaphragm spasms involuntarily!',
    howItWorks: [
      'Phrenic nerve signals cause the diaphragm to contract and flatten downward.',
      'Chest volume increases, creating negative pressure that sucks air into the lungs.',
      'Upon relaxation, it curves back up like an umbrella, pushing air out.',
      'Assists abdominal muscles during coughing, sneezing, and singing.'
    ],
    funFacts: [
      'Hiccups are caused by sudden involuntary spasms of your diaphragm muscle!',
      'Singers and flute players train their diaphragms to sustain long, powerful musical notes.',
      'It acts as an anatomical ceiling for your liver and stomach and a floor for your lungs.'
    ],
    healthyHabits: [
      'Practice belly breathing (diaphragmatic breathing) to reduce stress and boost oxygen.',
      'Maintain an upright posture; slouching compresses the diaphragm against your ribs.',
      'Avoid drinking cold sodas too quickly which can trigger diaphragm hiccups.'
    ],
    quiz: {
      question: 'What common funny reaction happens when your diaphragm muscle spasms?',
      options: ['Hiccups', 'Sneezing', 'Yawning'],
      answer: 'Hiccups',
      explanation: 'Zabardast! Hiccups are caused by involuntary spasms of your diaphragm muscle!'
    },
    svgType: 'diaphragm'
  },

  ribcage: {
    id: 'ribcage',
    name: 'Rib Cage',
    urduName: 'پسلیوں کا پنجرہ',
    nickname: 'The Chest Armor (حفاظتی پنجرہ) 🛡️',
    regionId: 'chest',
    regionName: 'Chest, Heart & Lungs',
    system: 'Skeletal System (نظام ہڈی)',
    systemColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    badgeBg: 'bg-emerald-600',
    weightSize: '12 pairs of curved bones (24 ribs total) attached to the spine',
    location: 'Surrounds the chest cavity, protecting vital organs',
    dailyStat: 'Expands and contracts over 20,000 times each day with your breathing!',
    shortDesc: 'A flexible protective cage made of 24 curved bones that shields your heart and lungs from external shocks.',
    fullDescription: 'The rib cage is nature’s body armor! It is made of 12 pairs of curved ribs: the first 7 attach to the sternum, the next 3 connect via flexible cartilage, and the bottom 2 pairs are "floating ribs". This flexible cartilage design allows your chest to expand like an accordion.',
    howItWorks: [
      'Curved bone arches deflect bumps, falls, and impacts away from internal organs.',
      'Flexible costal cartilage stretches so your chest can expand when inhaling.',
      'Intercostal muscles between the ribs pull upward to assist heavy breathing.',
      'Anchors to the thoracic spine at the back for structural upright posture.'
    ],
    funFacts: [
      'The bottom 2 pairs of ribs are called "floating ribs" because they do not attach in front!',
      'About 1 in every 200 people is born with an extra 13th pair of ribs called a cervical rib!',
      'Even during a strong cough, your ribs flex to handle high internal air pressures.'
    ],
    healthyHabits: [
      'Drink calcium-rich milk and eat almonds, spinach, and yogurt.',
      'Wear protective chest pads in contact sports like cricket or martial arts.',
      'Practice deep breathing to maintain thoracic flexibility and lung capacity.'
    ],
    quiz: {
      question: 'How many pairs of ribs make up the human rib cage?',
      options: ['12 pairs', '8 pairs', '16 pairs'],
      answer: '12 pairs',
      explanation: 'Awesome! Humans have 12 pairs of ribs (24 individual ribs) forming the chest cage!'
    },
    svgType: 'ribcage'
  },

  // --- REGION 4: VEINS, ARTERIES & BLOOD ---
  veins: {
    id: 'veins',
    name: 'Veins & Venules',
    urduName: 'نیلی رگیں اور وریدیں (واپسی کی نالیاں)',
    nickname: 'The Return Superhighway (واپسی کی شاہراہ) 🚙',
    regionId: 'circulation',
    regionName: 'Veins, Arteries & Blood',
    system: 'Circulatory System (نظام دوران خون)',
    systemColor: 'text-blue-600 bg-blue-50 border-blue-200',
    badgeBg: 'bg-blue-600',
    weightSize: 'Over 60,000 km of veins carrying blood back toward the heart',
    location: 'Spread throughout every limb and tissue, visible as blue lines under fair skin',
    dailyStat: 'Returns thousands of liters of deoxygenated blood back up to the heart against gravity!',
    shortDesc: 'Blood vessels that carry oxygen-depleted blood back to the heart, featuring one-way pocket valves so blood flows upward.',
    fullDescription: 'Veins carry blood back toward your heart. Because the pressure is lower than in arteries, veins have thin walls and built-in pocket valves that prevent blood from falling backward toward your feet. Walking squeezes your leg muscles, acting as a natural pump that pushes blood up through your veins!',
    howItWorks: [
      'Collects deoxygenated blood from microscopic capillaries after cells use oxygen.',
      'One-way valves snap shut behind moving blood to prevent backflow against gravity.',
      'Surrounding leg and arm muscles contract to squeeze veins and propel blood upward.',
      'Empty into the Superior and Inferior Vena Cava entering the right atrium of the heart.'
    ],
    funFacts: [
      'Veins look blue through your skin because of how light wavelengths scatter through skin layers, but blood inside is dark red!',
      'Walking is called your "second heart" because calf muscles squeeze leg veins to pump blood upward!',
      'Veins hold about 70% of all the blood in your body at any given moment!'
    ],
    healthyHabits: [
      'Walk, run, or jump daily — leg movement keeps venous blood flowing smoothly.',
      'Avoid sitting cross-legged or stationary in a chair for hours at a time.',
      'Drink plenty of water to keep your blood hydrated and flowing easily.'
    ],
    quiz: {
      question: 'Why do veins have internal one-way valves?',
      options: ['To stop blood from flowing backwards', 'To cool the blood', 'To store oxygen'],
      answer: 'To stop blood from flowing backwards',
      explanation: 'Super! Pocket valves ensure blood flows continuously toward the heart against gravity!'
    },
    svgType: 'veins'
  },

  arteries: {
    id: 'arteries',
    name: 'Arteries & The Aorta',
    urduName: 'سرخ شریانیں اور شہ رگ (عظیم شریان)',
    nickname: 'The High-Pressure Delivery Highway 🛣️',
    regionId: 'circulation',
    regionName: 'Veins, Arteries & Blood',
    system: 'Circulatory System (نظام دوران خون)',
    systemColor: 'text-rose-600 bg-rose-50 border-rose-200',
    badgeBg: 'bg-rose-600',
    weightSize: 'Thick elastic muscular walls; the Aorta is as thick as a garden hose (~2.5 cm wide)!',
    location: 'Deep inside tissues and bones for protection, branching from the heart',
    dailyStat: 'Withstands high systolic pulse pressure over 100,000 times every single day!',
    shortDesc: 'Tough, elastic muscular pipes that carry sparkling, oxygen-rich blood away from the heart to every organ in your body.',
    fullDescription: 'Arteries are thick-walled, elastic vessels that carry high-pressure oxygenated blood away from your heart. The main trunk is the Aorta, which arches over the heart and branches into smaller arteries, supplying fresh oxygen, glucose, and nutrients to every living cell.',
    howItWorks: [
      'Heart’s left ventricle shoots blood into the elastic Aorta at high pressure.',
      'Elastic artery walls stretch to absorb the surge, then recoil to keep blood moving smoothly.',
      'Branch into smaller arterioles that regulate local blood flow with smooth muscle sphincters.',
      'Deliver oxygen and nutrients to capillaries touching every cell.'
    ],
    funFacts: [
      'Your Aorta is about the same diameter as a standard garden hose (approx. 2.5 cm)!',
      'You can feel your arterial pulse at your wrist (radial artery) or your neck (carotid artery)!',
      'Artery walls have smooth muscle layers that can dilate or constrict to manage blood pressure.'
    ],
    healthyHabits: [
      'Eat healthy unsaturated fats like nuts and olive oil while avoiding trans-fat junk food.',
      'Engage in 30 minutes of aerobic exercise daily to keep artery walls flexible and elastic.',
      'Keep salt consumption balanced to maintain healthy arterial pressure.'
    ],
    quiz: {
      question: 'Which is the largest and thickest artery in the human body?',
      options: ['The Aorta (شہ رگ)', 'The Capillary', 'The Jugular vein'],
      answer: 'The Aorta (شہ رگ)',
      explanation: 'Bingo! The Aorta (شہ رگ) is the largest artery, carrying fresh blood directly from your heart!'
    },
    svgType: 'arteries'
  },

  capillaries: {
    id: 'capillaries',
    name: 'Microscopic Capillaries',
    urduName: 'باریک ترین موئی رگیں (کیپیلریز)',
    nickname: 'The Microscopic Exchange Bridges 🌉',
    regionId: 'circulation',
    regionName: 'Veins, Arteries & Blood',
    system: 'Circulatory System (نظام دوران خون)',
    systemColor: 'text-purple-600 bg-purple-50 border-purple-200',
    badgeBg: 'bg-purple-600',
    weightSize: 'Microscopic (about 5 to 10 microns wide — 10x thinner than a human hair!)',
    location: 'Weaving like a microscopic net through every tissue, muscle, and organ',
    dailyStat: 'Over 10 billion microscopic capillaries link every single cell to your bloodstream!',
    shortDesc: 'Ultra-thin microscopic vessels where oxygen, nutrients, and waste are exchanged directly with body cells.',
    fullDescription: 'Capillaries are the microscopic workhorses of the circulatory system. Their walls are only one cell thick. Red blood cells must travel in single file through them, allowing oxygen and glucose to slip out into cells while carbon dioxide and wastes slip in.',
    howItWorks: [
      'Link tiny arterioles to tiny venules throughout every organ and tissue.',
      'Single-cell-thin endothelial walls allow nutrients and oxygen to diffuse out effortlessly.',
      'Cellular metabolic waste (urea, carbon dioxide) diffuses into the capillary bloodstream.',
      'Pre-capillary sphincters open or close to redirect blood where it is needed most.'
    ],
    funFacts: [
      'Capillaries are so narrow that red blood cells have to squeeze through them in single file!',
      'If all your capillaries were linked end to end, they would stretch over 80,000 kilometers!',
      'When you blush or your cheeks turn red in the cold, millions of facial capillaries are dilating!'
    ],
    healthyHabits: [
      'Eat vitamin-C rich citrus fruits and berries which strengthen capillary walls.',
      'Stay physically active to stimulate the growth of new capillary beds in muscles.',
      'Drink plenty of water to keep blood viscosity optimal for micro-vessels.'
    ],
    quiz: {
      question: 'How do red blood cells travel through narrow capillaries?',
      options: ['In single file, one by one', 'In groups of 50', 'They cannot enter'],
      answer: 'In single file, one by one',
      explanation: 'Super! Capillaries are so narrow that red blood cells squeeze through one by one in single file!'
    },
    svgType: 'capillaries'
  },

  'blood-cells': {
    id: 'blood-cells',
    name: 'Red & White Blood Cells',
    urduName: 'سرخ اور سفید خون کے خلیات (خون کے سپاہی)',
    nickname: 'The Oxygen Couriers & Immune Defenders 🩸',
    regionId: 'circulation',
    regionName: 'Veins, Arteries & Blood',
    system: 'Circulatory & Immune (نظام مدافعت)',
    systemColor: 'text-rose-700 bg-rose-50 border-rose-300',
    badgeBg: 'bg-rose-700',
    weightSize: 'Microscopic disc-shaped cells; about 25 trillion red cells in your body!',
    location: 'Circulating through your heart, arteries, veins, and capillaries',
    dailyStat: 'Your bone marrow manufactures over 2 million brand-new red blood cells every second!',
    shortDesc: 'Red cells carry oxygen using iron hemoglobin; white cells act as superhero immune soldiers fighting off germs.',
    fullDescription: 'Blood is a living liquid tissue! Red blood cells (erythrocytes) are biconcave discs loaded with iron-rich hemoglobin that carries oxygen. White blood cells (leukocytes) are immune warriors that hunt down viruses, bacteria, and foreign invaders to keep you healthy.',
    howItWorks: [
      'Red blood cells bind oxygen molecules in the lungs using iron-based hemoglobin.',
      'Travel through capillaries, unloading oxygen and picking up waste carbon dioxide.',
      'White blood cells patrol the bloodstream and squeeze through vessel walls to fight infections.',
      'Antibodies and memory T-cells remember pathogens to defeat them instantly next time.'
    ],
    funFacts: [
      'A single drop of blood contains about 5 million red blood cells and 10,000 white blood cells!',
      'Red blood cells complete a full circuit through your entire body in about 60 seconds!',
      'Red blood cells have no nucleus, leaving maximum hollow space to carry oxygen!'
    ],
    healthyHabits: [
      'Eat iron-rich foods like spinach, lentils, eggs, and pomegranate to build hemoglobin.',
      'Get adequate sleep — your immune white blood cells produce disease-fighting cytokines at night.',
      'Drink water to keep your blood plasma volume balanced and healthy.'
    ],
    quiz: {
      question: 'Which component in red blood cells binds and carries oxygen?',
      options: ['Iron-rich Hemoglobin', 'Calcium', 'Sugar crystals'],
      answer: 'Iron-rich Hemoglobin',
      explanation: 'Spot on! Iron-rich hemoglobin gives blood its red color and carries oxygen to all cells!'
    },
    svgType: 'blood-cells'
  },

  platelets: {
    id: 'platelets',
    name: 'Platelets (Thrombocytes)',
    urduName: 'پلیٹلیٹس (خون جمانے والے خلیات)',
    nickname: 'The Bandage Makers (قدرتی پٹیاں) 🩹',
    regionId: 'circulation',
    regionName: 'Veins, Arteries & Blood',
    system: 'Circulatory & Healing',
    systemColor: 'text-amber-600 bg-amber-50 border-amber-200',
    badgeBg: 'bg-amber-600',
    weightSize: 'Tiny disc fragments (~2 to 3 microns wide, smaller than red blood cells)',
    location: 'Floating in blood plasma alongside red and white blood cells',
    dailyStat: 'Rushes to heal any scratch or cut within 30 seconds to stop bleeding!',
    shortDesc: 'Tiny cell fragments that cluster together and form a biological net (scab) to plug cuts and stop bleeding.',
    fullDescription: 'Platelets are your body’s emergency repair crew! When you scrape your knee, platelets activate, grow spiky tentacles, stick to the broken vessel walls, and release clotting factors that weave a tough fibrin net, stopping the bleeding and forming a healing scab.',
    howItWorks: [
      'Detect chemical signals released by torn blood vessel endothelial walls.',
      'Change shape from smooth discs into sticky spheres with long clinging tentacles.',
      'Clump together to form an initial temporary platelet plug.',
      'Trigger fibrin protein threads that harden into a protective scab over the wound.'
    ],
    funFacts: [
      'A healthy person has between 150,000 to 450,000 platelets in every single drop of blood!',
      'The scab that forms over a cut is a miraculous web of dried platelets and fibrin threads!',
      'Platelets only live for about 7 to 10 days before fresh ones are made in bone marrow.'
    ],
    healthyHabits: [
      'Eat vitamin-K rich foods like green peas, broccoli, and spinach which help blood clot normally.',
      'Clean small scratches immediately with gentle soap and water.',
      'Never peel off healing scabs — let platelets do their repair job underneath.'
    ],
    quiz: {
      question: 'What do platelets create when you scrape your knee to stop bleeding?',
      options: ['A protective clot / scab', 'A blister', 'A bruise'],
      answer: 'A protective clot / scab',
      explanation: 'Awesome! Platelets weave a web of fibrin threads that forms a healing scab to stop bleeding!'
    },
    svgType: 'platelets'
  },

  // --- REGION 5: ABDOMEN & DIGESTIVE LAB ---
  stomach: {
    id: 'stomach',
    name: 'Stomach',
    urduName: 'معدہ',
    nickname: 'The Acid Food Blender (خوراک کا گرائنڈر) 🍲',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Digestive System (نظام انہضام)',
    systemColor: 'text-amber-600 bg-amber-50 border-amber-200',
    badgeBg: 'bg-amber-600',
    weightSize: 'Stretches from 50 mL when empty to up to 1.5 liters after meals!',
    location: 'Upper left quadrant of abdomen, tucked beneath diaphragm and liver',
    dailyStat: 'Produces 2 to 3 liters of powerful gastric acid and digestive juices daily!',
    shortDesc: 'A muscular J-shaped sac that churns food with digestive enzymes and hydrochloric acid into a smooth liquid called chyme.',
    fullDescription: 'Your stomach is a heavy-duty food processor. Three muscular layers contract in waves to smash food, while strong hydrochloric acid (pH 1.5 to 2.0) breaks down proteins and kills harmful food bacteria. A thick mucus lining protects the stomach from digesting itself!',
    howItWorks: [
      'Receives food bolus through the lower esophageal sphincter valve.',
      'Releases hydrochloric acid and pepsin enzymes to digest proteins.',
      'Three muscular layers churn and crush food for 2 to 4 hours.',
      'Squirt creamy liquid (chyme) into the small intestine in regulated batches.'
    ],
    funFacts: [
      'Stomach acid is strong enough to dissolve metal razor blades, but mucus protects your stomach lining!',
      'Your stomach grows a brand-new protective mucus lining every 3 to 4 days!',
      'The rumbling sound when hungry (borborygmi) is muscle waves sloshing air and liquid in an empty stomach!'
    ],
    healthyHabits: [
      'Eat meals on time and avoid skipping breakfast to prevent acid buildup.',
      'Chew food thoroughly 20 to 30 times before swallowing.',
      'Do not overeat until bursting; leave space for comfortable churning.'
    ],
    quiz: {
      question: 'What letter of the English alphabet does the human stomach resemble?',
      options: ['Letter J', 'Letter C', 'Letter S'],
      answer: 'Letter J',
      explanation: 'You got it! The stomach (معدہ) is a muscular pouch curved just like the letter J!'
    },
    svgType: 'stomach'
  },

  liver: {
    id: 'liver',
    name: 'Liver',
    urduName: 'جگر (کلیجہ)',
    nickname: 'The Chemical Mega-Factory (کیمیکل فیکٹری) 🧪',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Digestive & Metabolic (میٹابولزم)',
    systemColor: 'text-orange-600 bg-orange-50 border-orange-200',
    badgeBg: 'bg-orange-600',
    weightSize: 'Approx. 1.5 kg (the heaviest internal solid organ in your body)',
    location: 'Upper right side of belly, just beneath your lower ribs',
    dailyStat: 'Performs over 500 vital biological tasks simultaneously every single minute!',
    shortDesc: 'The largest solid internal organ; filters blood toxins, makes digestive bile, and stores reserve vitamins and energy.',
    fullDescription: 'Your liver is your body’s chemical processing plant. It produces golden-green bile that digests fats, stores excess sugar as glycogen for energy, cleanses blood coming from the intestines, and stores essential vitamins (A, D, E, K, B12).',
    howItWorks: [
      'Filters every drop of nutrient-rich blood coming directly from the intestines.',
      'Manufactures bile that is stored in the gallbladder to digest dietary fats.',
      'Converts excess glucose into stored glycogen and releases it when you run and play.',
      'Breaks down toxins, drugs, and waste products into harmless excretable compounds.'
    ],
    funFacts: [
      'The liver is the only human internal organ that can regenerate itself! It can regrow from just 30% of its size!',
      'At any given moment, about 10% of your body’s total blood supply is inside your liver being cleansed.',
      'It produces heat that keeps your overall body temperature at a warm 37°C!'
    ],
    healthyHabits: [
      'Drink plenty of clean water every day to help your liver flush out toxins.',
      'Eat cruciferous vegetables like cabbage, broccoli, carrots, and apples.',
      'Avoid deep-fried oily foods and excess artificial chemicals.'
    ],
    quiz: {
      question: 'What unique superpower does the human liver have that other organs do not?',
      options: ['It can regenerate and regrow itself', 'It can glow in the dark', 'It can make bones'],
      answer: 'It can regenerate and regrow itself',
      explanation: 'Amazing! The liver (جگر) has incredible regenerative powers and can regrow back to full size!'
    },
    svgType: 'liver'
  },

  gallbladder: {
    id: 'gallbladder',
    name: 'Gallbladder',
    urduName: 'پِتّہ (بائل کا ذخیرہ)',
    nickname: 'The Green Bile Pouch 🍐',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Digestive System (نظام انہضام)',
    systemColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    badgeBg: 'bg-emerald-700',
    weightSize: 'About 7 to 10 cm long, pear-shaped pouch',
    location: 'Tucked directly underneath the liver on the upper right side',
    dailyStat: 'Concentrates bile by up to 10 times to dissolve oils and fats in your meals!',
    shortDesc: 'A small pear-shaped sac under the liver that stores and concentrates digestive bile, squirting it into the small intestine.',
    fullDescription: 'Your gallbladder stores the golden-green digestive bile made by the liver. When you eat foods containing healthy fats, the gallbladder contracts and squirts concentrated bile through the bile duct into the duodenum to dissolve fats like dish soap dissolves grease.',
    howItWorks: [
      'Receives dilute bile produced by the liver cells through hepatic ducts.',
      'Absorbs water to concentrate the bile salts by up to 5 to 10 times.',
      'Senses hormone CCK when fatty food enters the small intestine.',
      'Squeezes bile down the common bile duct to emulsify fats for easy enzyme digestion.'
    ],
    funFacts: [
      'Bile is naturally bright yellow-green and gives digested waste its normal color!',
      'Bile acts just like liquid dish soap, breaking large grease droplets into tiny droplets!',
      'People can live normal healthy lives even if their gallbladder is surgically removed.'
    ],
    healthyHabits: [
      'Eat healthy unsaturated fats like nuts and olive oil rather than heavy trans-fats.',
      'Eat plenty of dietary fiber to prevent bile cholesterol from crystallizing.',
      'Maintain regular meal times so the gallbladder empties efficiently.'
    ],
    quiz: {
      question: 'What substance does the gallbladder store and concentrate?',
      options: ['Bile (پیلا سبز رس)', 'Stomach acid', 'Pure water'],
      answer: 'Bile (پیلا سبز رس)',
      explanation: 'Correct! The gallbladder (پِتّہ) stores concentrated bile to digest fats!'
    },
    svgType: 'gallbladder'
  },

  pancreas: {
    id: 'pancreas',
    name: 'Pancreas & Insulin',
    urduName: 'لبلبہ اور انسولین (شوگر کنٹرولر)',
    nickname: 'The Sugar Controller & Enzyme Chef 🥞',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Endocrine & Digestive',
    systemColor: 'text-yellow-700 bg-yellow-50 border-yellow-200',
    badgeBg: 'bg-yellow-600',
    weightSize: 'About 15 cm long (~100 grams, shaped like a flat leaf)',
    location: 'Tucked horizontally behind the stomach deep in the abdomen',
    dailyStat: 'Produces around 1 liter of enzyme-packed digestive juice and manages blood glucose 24/7!',
    shortDesc: 'A dual gland that makes insulin hormone to balance blood sugar and releases potent enzymes to digest proteins, fats, and starches.',
    fullDescription: 'The pancreas is an essential organ with two crucial roles: Its endocrine Islets of Langerhans make insulin, which unlocks your cells so they can use sugar for energy. Its exocrine tissue produces powerful digestive enzymes and natural bicarbonate that neutralize stomach acid.',
    howItWorks: [
      'Monitors the level of glucose sugar in your bloodstream continuously.',
      'Releases insulin when blood sugar rises to help cells absorb energy.',
      'Releases glucagon when blood sugar falls to prompt the liver to release stored fuel.',
      'Sends bicarbonate and enzymes into the small intestine to break down food.'
    ],
    funFacts: [
      'Without insulin produced by the pancreas, body cells would starve even with food in the blood!',
      'The pancreas produces natural sodium bicarbonate — the exact same compound as baking soda — to neutralize stomach acid!',
      'The name pancreas comes from Greek meaning "all flesh".'
    ],
    healthyHabits: [
      'Avoid sugary sodas, candies, and sweetened snacks that strain the pancreas.',
      'Eat balanced meals featuring protein, complex carbs, and fiber.',
      'Play outdoors daily — physical activity makes cells sensitive to insulin.'
    ],
    quiz: {
      question: 'Which crucial hormone is made by the pancreas to manage blood sugar?',
      options: ['Insulin', 'Adrenaline', 'Thyroxine'],
      answer: 'Insulin',
      explanation: 'Super! Insulin (انسولین) acts like a key unlocking your cells so they can absorb sugar for energy!'
    },
    svgType: 'pancreas'
  },

  kidneys: {
    id: 'kidneys',
    name: 'Kidneys',
    urduName: 'گردے (فلٹریشن پلانٹ)',
    nickname: 'The Master Water Filters (فلٹر پلانٹ) 🫘',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Excretory / Urinary System (نظام اخراج)',
    systemColor: 'text-rose-700 bg-rose-50 border-rose-200',
    badgeBg: 'bg-rose-700',
    weightSize: 'About 12 cm long each (~150 grams, shaped like kidney beans)',
    location: 'At the back of the abdominal cavity on each side of the spine',
    dailyStat: 'Filters roughly 200 liters of blood each day to produce 1 to 2 liters of urine!',
    shortDesc: 'A pair of bean-shaped twin filters that cleanse your bloodstream, balance water, and manage blood pressure.',
    fullDescription: 'Your kidneys are the ultimate blood-cleansing team. Each kidney contains approximately one million microscopic filtering units called nephrons. They filter metabolic wastes, balance salts, and produce hormones that stimulate red blood cell production.',
    howItWorks: [
      'Blood flows into the kidney via the renal artery under high pressure.',
      'One million tiny nephrons filter out urea, excess water, and cellular wastes.',
      'Vital nutrients, clean water, and minerals are reabsorbed into the clean bloodstream.',
      'Waste liquids flow down ureter tubes into the bladder as urine.'
    ],
    funFacts: [
      'Your kidneys filter all the blood in your body about 40 times every single day!',
      'A person can live a completely healthy, active life with just one working kidney!',
      'The right kidney sits slightly lower than the left one to make room for the large liver above it.'
    ],
    healthyHabits: [
      'Drink 6 to 8 glasses of water daily — water helps kidneys flush out salts.',
      'Never hold your urine for too long when you need to use the restroom.',
      'Keep your salt intake balanced and avoid overly salty processed chips.'
    ],
    quiz: {
      question: 'What popular bean are human kidneys famously shaped like?',
      options: ['Kidney Bean (Lobia/Rajma)', 'Green Pea', 'Coffee Bean'],
      answer: 'Kidney Bean (Lobia/Rajma)',
      explanation: 'Spot on! The kidneys look just like kidney beans (Lobia/Rajma) in both shape and reddish color!'
    },
    svgType: 'kidneys'
  },

  nephrons: {
    id: 'nephrons',
    name: 'Microscopic Nephrons & Glomeruli',
    urduName: 'مائیکروسکوپک نیفرونز (باریک ترین فلٹر یونٹس)',
    nickname: 'The Million Micro-Filters 🔬',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Excretory / Urinary System',
    systemColor: 'text-rose-800 bg-rose-50 border-rose-300',
    badgeBg: 'bg-rose-800',
    weightSize: 'Microscopic tubules (~3 cm long uncoiled, 1 million per kidney)',
    location: 'Densely packed across the renal cortex and medulla inside both kidneys',
    dailyStat: 'Filters 120 milliliters of fluid every single minute through tiny capillary sieves!',
    shortDesc: 'The microscopic functional filtering units of the kidney that separate clean blood from chemical wastes and excess salts.',
    fullDescription: 'Each kidney contains over 1 million microscopic nephrons. Blood enters a tiny ball of capillaries called the Glomerulus, which acts like an ultra-fine sieve. Useful water and nutrients are reabsorbed along the twisting Loop of Henle, while wastes are directed into collecting ducts.',
    howItWorks: [
      'Glomerulus capillaries strain blood plasma under high hydrostatic pressure.',
      'Proteins and blood cells remain in capillaries, while watery filtrate enters Bowman’s capsule.',
      'Twisting tubules reabsorb 99% of filtered water, glucose, and essential amino acids.',
      'Waste urea and excess potassium are concentrated into urine.'
    ],
    funFacts: [
      'If you stretched out all the microscopic nephron tubules from one kidney, they would span over 60 kilometers!',
      'Nephrons reabsorb over 99% of all the water they filter so you do not dehydrate!',
      'Blood passes through your nephrons over 40 times a day!'
    ],
    healthyHabits: [
      'Drink clean, pure water throughout the day to support nephron filtration.',
      'Avoid taking unnecessary pain medicines which can irritate nephron tubules.',
      'Eat less refined salt to keep nephron capillary pressure normal.'
    ],
    quiz: {
      question: 'Roughly how many microscopic nephrons are inside each human kidney?',
      options: ['1 Million', 'Only 100', '500 Thousand'],
      answer: '1 Million',
      explanation: 'Incredible! Each kidney contains roughly 1 million microscopic nephron filters!'
    },
    svgType: 'nephrons'
  },

  bladder: {
    id: 'bladder',
    name: 'Urinary Bladder',
    urduName: 'پیشاب کی تھیلی (مثانہ)',
    nickname: 'The Elastic Storage Balloon 🎈',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Excretory / Urinary System',
    systemColor: 'text-amber-700 bg-amber-50 border-amber-300',
    badgeBg: 'bg-amber-700',
    weightSize: 'Stretches from holding zero up to 500 mL of liquid comfortably',
    location: 'Pelvic floor, cradled safely behind the pubic bone',
    dailyStat: 'Stores urine produced by kidneys and signals your brain when it is half full!',
    shortDesc: 'A muscular elastic sac in the pelvis that stores urine until it is convenient and safe to empty.',
    fullDescription: 'The bladder is an expandable muscular storage reservoir lined with unique transitional epithelium cells that stretch without tearing. Two thin ureter tubes drip urine from the kidneys into the bladder 24/7. When it holds about 250 mL, stretch receptors alert your brain.',
    howItWorks: [
      'Urine enters continuously through two ureter valves at the bladder base.',
      'Transitional epithelial cells slide over each other as the bladder expands.',
      'Detrusor muscle stretches comfortably until sensory nerves trigger the urge to urinate.',
      'Internal and external sphincter muscles coordinate to release urine safely.'
    ],
    funFacts: [
      'The bladder can expand from the size of a small plum to the size of a grapefruit!',
      'Urine stays sterile inside a healthy bladder until it exits the body!',
      'Stretch receptors start sending signals to your brain when the bladder is only about half full!'
    ],
    healthyHabits: [
      'Do not hold your urine for hours when you need to go to the washroom.',
      'Drink sufficient fluids so urine stays light and clear in color.',
      'Practice good personal hygiene in restrooms.'
    ],
    quiz: {
      question: 'Where is the urinary bladder safely cradled in your body?',
      options: ['Behind the pubic bone in the pelvis', 'Under the armpit', 'Inside the ribcage'],
      answer: 'Behind the pubic bone in the pelvis',
      explanation: 'Correct! The bladder is cradled safely in the basin of your pelvis behind the pubic bone!'
    },
    svgType: 'bladder'
  },

  'small-intestine': {
    id: 'small-intestine',
    name: 'Small Intestine',
    urduName: 'چھوٹی آنت (غذائیت جذب کرنے والا پائپ)',
    nickname: 'The Great Nutrient Absorber 🌀',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Digestive System (نظام انہضام)',
    systemColor: 'text-amber-700 bg-amber-50 border-amber-200',
    badgeBg: 'bg-amber-700',
    weightSize: 'About 6 meters (20 feet) long, coiled snugly inside your belly',
    location: 'Coiled centrally within the lower abdominal cavity',
    dailyStat: 'Absorbs 90% of all vitamins, proteins, minerals, and carbohydrates you eat!',
    shortDesc: 'A long winding tube lined with millions of microscopic villi that absorb nutrients directly into your bloodstream.',
    fullDescription: 'Despite being called "small" (due to its narrow 2.5 cm diameter), this winding organ is over 6 meters (20 feet) long! It is divided into three sections: Duodenum, Jejunum, and Ileum. Microscopic velvety fingers called villi absorb glucose, amino acids, and vitamins into capillaries.',
    howItWorks: [
      'Mixes food chyme with bile from the liver and pancreatic enzymes.',
      'Breaks down complex carbohydrates into glucose, proteins into amino acids, and fats into fatty acids.',
      'Millions of villi absorb tiny nutrient molecules through intestinal walls.',
      'Nutrients travel through the portal vein straight to the liver for distribution.'
    ],
    funFacts: [
      'If you stretched out the small intestine, it would be as long as a full-size school bus or mini-van!',
      'The total surface area of all absorbing villi inside is about the size of a badminton court!',
      'Wave-like muscular contractions called peristalsis gently push food along its 20-foot path.'
    ],
    healthyHabits: [
      'Eat plenty of dietary fiber from whole grains, oats, apples, lentils, and chickpeas.',
      'Enjoy probiotic foods like fresh homemade yogurt (dahi) for healthy gut flora.',
      'Drink sufficient water so food glides smoothly through your intestines.'
    ],
    quiz: {
      question: 'Roughly how long is the human small intestine if uncoiled?',
      options: ['6 meters (20 feet)', '1 meter (3 feet)', '15 meters (50 feet)'],
      answer: '6 meters (20 feet)',
      explanation: 'Incredible! Although coiled neatly in your belly, it is approximately 6 meters (20 feet) long!'
    },
    svgType: 'small-intestine'
  },

  villi: {
    id: 'villi',
    name: 'Microscopic Intestinal Villi',
    urduName: 'چھوٹی آنت کے باریک ریشے (وِلی)',
    nickname: 'The Microscopic Nutrient Fingers 🌾',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Digestive System (نظام انہضام)',
    systemColor: 'text-amber-800 bg-amber-50 border-amber-300',
    badgeBg: 'bg-amber-800',
    weightSize: 'Microscopic finger-like projections (~1 mm long, millions in number)',
    location: 'Covering every square millimeter of the small intestine inner wall',
    dailyStat: 'Increases intestinal absorption surface area by over 30 times!',
    shortDesc: 'Millions of microscopic velvety finger-like projections that absorb vitamins, minerals, and glucose into capillaries.',
    fullDescription: 'The inside wall of your small intestine is not smooth; it is covered in millions of tiny finger-shaped projections called villi, and each villus has thousands of microscopic microvilli. This creates a massive surface area where digested nutrients pass into the bloodstream.',
    howItWorks: [
      'Millions of tiny villus projections sway in the passing digested food chyme.',
      'Single-cell outer epithelial layer absorbs dissolved amino acids and sugars.',
      'Central capillary network carries water-soluble nutrients directly to the liver.',
      'Central lacteal vessel absorbs digested fatty acids into the lymphatic system.'
    ],
    funFacts: [
      'Because of millions of villi, your small intestine has an absorbing surface area of 250 square meters — as big as a tennis court!',
      'Under a microscope, the inner intestine wall looks just like a plush, velvety carpet!',
      'Each individual villus has even tinier microscopic fingers on it called microvilli!'
    ],
    healthyHabits: [
      'Eat dietary prebiotics like bananas, garlic, and oats that nourish intestinal cells.',
      'Avoid overly spicy or burning hot foods that irritate intestinal villi.',
      'Drink water to keep intestinal fluids moving smoothly.'
    ],
    quiz: {
      question: 'What do the millions of microscopic villi resemble under a microscope?',
      options: ['A soft velvety carpet with tiny fingers', 'A smooth sheet of glass', 'Sharp spikes'],
      answer: 'A soft velvety carpet with tiny fingers',
      explanation: 'Spot on! The villi form a soft, velvety carpet with millions of absorbing fingers!'
    },
    svgType: 'villi'
  },

  'large-intestine': {
    id: 'large-intestine',
    name: 'Large Intestine (Colon)',
    urduName: 'بڑی آنت (قولون)',
    nickname: 'The Water Recycler & Waste Manager 🚰',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Digestive & Excretory',
    systemColor: 'text-amber-800 bg-amber-50 border-amber-300',
    badgeBg: 'bg-amber-800',
    weightSize: 'About 1.5 meters (5 feet) long, but twice as wide as the small intestine',
    location: 'Frames the abdominal cavity like a picture frame around the small intestine',
    dailyStat: 'Recovers over 1 liter of vital water daily so your body stays hydrated!',
    shortDesc: 'A wider tube that frames the belly, absorbs water and salts from leftover digested material, and prepares solid waste.',
    fullDescription: 'The large intestine (colon) takes over where the small intestine finishes. Its main duty is to reclaim precious water and mineral salts, preventing dehydration. It is home to trillions of friendly gut bacteria (the microbiome) that manufacture essential vitamin K and B12.',
    howItWorks: [
      'Receives watery leftover indigestible fiber residue from the small intestine.',
      'Absorbs water and salts through its walls back into the bloodstream.',
      'Trillions of friendly gut bacteria ferment fiber and produce essential vitamins.',
      'Compacts remaining solid waste and pushes it toward the rectum for safe disposal.'
    ],
    funFacts: [
      'Your large intestine is home to over 100 trillion friendly bacteria — more than human cells!',
      'These helpful gut microbes help protect you from harmful pathogens and boost immunity!',
      'The appendix is a small pouch attached to the start of the large intestine.'
    ],
    healthyHabits: [
      'Eat a rainbow of vegetables and fruits high in prebiotic fiber.',
      'Stay physically active — walking and jumping stimulates healthy bowel motility.',
      'Drink water first thing in the morning to encourage natural bowel habits.'
    ],
    quiz: {
      question: 'What is the primary job of the large intestine?',
      options: ['Absorbing water and salts', 'Tasting food', 'Pumping blood'],
      answer: 'Absorbing water and salts',
      explanation: 'Super! The large intestine reclaims water from food leftovers so your body stays hydrated!'
    },
    svgType: 'large-intestine'
  },

  appendix: {
    id: 'appendix',
    name: 'Appendix',
    urduName: 'اپینڈکس (حفاظتی بیکٹیریا کا ذخیرہ)',
    nickname: 'The Safehouse of Good Bacteria 🪱',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Digestive & Immune (نظام مدافعت)',
    systemColor: 'text-amber-900 bg-amber-50 border-amber-300',
    badgeBg: 'bg-amber-900',
    weightSize: 'A thin worm-shaped tube about 5 to 10 cm long',
    location: 'Lower right side of the abdomen, branching off the cecum of the large intestine',
    dailyStat: 'Acts as an immune safe-house that protects friendly gut bacteria!',
    shortDesc: 'A small finger-shaped pouch off the large intestine that stores reserve friendly bacteria and contains lymphatic immune tissue.',
    fullDescription: 'For centuries people thought the appendix was completely useless. Modern science discovered it acts as an immune "safehouse" for beneficial gut bacteria! When a severe tummy bug flushes out your intestines, the appendix re-inoculates your digestive tract with good bacteria.',
    howItWorks: [
      'Stores reserves of beneficial gut microbiome bacteria.',
      'Contains lymphoid tissue that samples intestinal microbes for immune defenses.',
      'Re-seeds the colon with healthy bacteria after stomach illnesses.',
      'Can occasionally become inflamed (appendicitis) if blocked by residue.'
    ],
    funFacts: [
      'The appendix looks like a little worm, which is why its scientific name is "vermiform appendix"!',
      'It acts like an emergency backup hard drive for your gut microbiome!',
      'Humans can live perfectly healthy lives if the appendix is removed during appendicitis.'
    ],
    healthyHabits: [
      'Eat plenty of dietary fiber to keep intestinal contents moving smoothly.',
      'Tell parents immediately if you ever have sharp pain in the lower right side of your belly.',
      'Drink plenty of water to maintain digestive hydration.'
    ],
    quiz: {
      question: 'What beneficial organisms does the appendix store as a safe-house?',
      options: ['Helpful gut bacteria', 'Red blood cells', 'White sugar'],
      answer: 'Helpful gut bacteria',
      explanation: 'Bingo! The appendix stores reserves of beneficial gut bacteria to help after tummy bugs!'
    },
    svgType: 'appendix'
  },

  spleen: {
    id: 'spleen',
    name: 'Spleen',
    urduName: 'تِلّی (خون کا فلٹر اور ایمرجنسی بینک)',
    nickname: 'The Blood Filter & Immune Base 🛡️',
    regionId: 'abdomen',
    regionName: 'Abdomen & Digestive Lab',
    system: 'Lymphatic & Immune (نظام مدافعت)',
    systemColor: 'text-purple-700 bg-purple-50 border-purple-300',
    badgeBg: 'bg-purple-700',
    weightSize: 'About the size of your clenched fist (~150 grams)',
    location: 'Upper left abdomen, tucked beside the stomach behind lower ribs',
    dailyStat: 'Filters and recycles millions of old red blood cells and stores emergency platelets!',
    shortDesc: 'An organ that filters blood, recycles worn-out red cells, and houses immune white blood cells to destroy microbes.',
    fullDescription: 'The spleen is a major organ of your lymphatic and immune system. It filters circulating blood, destroys old or damaged red blood cells (recycling their iron), stores emergency reserves of platelets, and deploys B-cells and T-cells to attack bacteria.',
    howItWorks: [
      'Red pulp filters blood and destroys worn-out red blood cells older than 120 days.',
      'Recycles iron from old hemoglobin to be sent back to bone marrow.',
      'White pulp contains millions of lymphocytes that detect and destroy circulating bacteria.',
      'Acts as an emergency blood reservoir that releases stored blood during sudden blood loss.'
    ],
    funFacts: [
      'The spleen can store up to one whole cup of emergency blood to release during heavy exercise or injury!',
      'When you run fast and feel a sharp cramp in your left side, your spleen is contracting to release extra blood!',
      'It is the largest single lymphatic organ in the human body.'
    ],
    healthyHabits: [
      'Wear protective gear in contact sports to guard against left ribcage impacts.',
      'Eat balanced meals to maintain iron levels and strong immune cells.',
      'Stay hydrated to help lymphatic and blood filtration.'
    ],
    quiz: {
      question: 'What causes the sharp "stitch" cramp in your left side when running fast?',
      options: ['The spleen contracting to release reserve blood', 'Your stomach bubbling', 'Leg bones stretching'],
      answer: 'The spleen contracting to release reserve blood',
      explanation: 'Fascinating! That stitch in your side is often your spleen squeezing to pump extra oxygenated blood!'
    },
    svgType: 'spleen'
  },

  // --- REGION 6: BONES, SPINE & SKELETON ---
  spine: {
    id: 'spine',
    name: 'Spine (Vertebral Column)',
    urduName: 'ریڑھ کی ہڈی (ستون بدن)',
    nickname: 'The Pillar of Support & Nerve Tunnel 🦴',
    regionId: 'skeleton',
    regionName: 'Spine, Bones & Joints',
    system: 'Skeletal & Nervous',
    systemColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    badgeBg: 'bg-emerald-700',
    weightSize: '33 interlocking vertebrae stacked with shock-absorbing intervertebral discs',
    location: 'Runs down the center of your back from the skull base to the tailbone',
    dailyStat: 'Bends, twists, supports your entire upper body weight, and shields your delicate spinal cord!',
    shortDesc: 'A flexible column of 33 vertebrae bones that lets you bend and twist while shielding the super-important spinal cord.',
    fullDescription: 'Your spine is made of 33 ring-shaped bones called vertebrae, cushioned by jelly-filled discs. An S-shaped curve acts like a natural spring absorbing shock when walking or running. Down through its center runs the vital spinal cord.',
    howItWorks: [
      'Stacked vertebrae create an S-shaped curve that absorbs shock from jumps and steps.',
      'Vertebral rings form an armored bony tunnel protecting the delicate spinal cord.',
      'Intervertebral cartilage discs cushion bones so they glide smoothly without grinding.',
      'Spinal nerves branch out through small gaps to connect with every muscle and organ.'
    ],
    funFacts: [
      'You are about 1 centimeter taller in the morning than in the evening! Discs decompress while you sleep!',
      'Humans and tall giraffes both have the exact same number of cervical neck vertebrae: seven!',
      'The spine can flex forward 90 degrees, bend backward 30 degrees, and rotate sideways!'
    ],
    healthyHabits: [
      'Sit up straight with your shoulders back and feet flat; avoid slouching over tablets.',
      'Carry school backpacks on both shoulders instead of slinging them on one side.',
      'Sleep on a firm, supportive mattress and do gentle back stretches.'
    ],
    quiz: {
      question: 'How many vertebrae bones make up the human spinal column?',
      options: ['33 vertebrae', '10 vertebrae', '50 vertebrae'],
      answer: '33 vertebrae',
      explanation: 'Awesome! The human spine consists of 33 interlocking vertebrae bones!'
    },
    svgType: 'spine'
  },

  'spinal-cord': {
    id: 'spinal-cord',
    name: 'Spinal Cord Nerve Cable',
    urduName: 'حرام مغز (مرکزی اعصابی کیبل)',
    nickname: 'The Information Highway Cable 🔌',
    regionId: 'skeleton',
    regionName: 'Spine, Bones & Joints',
    system: 'Nervous System (نظام اعصاب)',
    systemColor: 'text-indigo-800 bg-indigo-50 border-indigo-300',
    badgeBg: 'bg-indigo-800',
    weightSize: 'About 45 cm long, as thick as your little pinky finger (~35 grams)',
    location: 'Safely protected inside the hollow canal of the vertebral column',
    dailyStat: 'Carries millions of nerve messages between brain and body every millisecond!',
    shortDesc: 'A thick bundle of millions of nerve fibers running through your spine that links your brain to every single muscle and organ.',
    fullDescription: 'The spinal cord is your body’s main communication highway. Millions of nerve fibers run up and down this cable, carrying sensory signals up to your brain and motor commands down to your muscles. It also controls instant involuntary reflexes (like pulling your hand away from a hot pan)!',
    howItWorks: [
      'Ascending sensory nerve tracts carry touch, pain, and temperature signals to the brain.',
      'Descending motor tracts send brain commands to contract arm and leg muscles.',
      'Reflex arcs in the spinal cord trigger instant life-saving muscle reactions before the brain even feels pain.',
      '31 pairs of spinal nerves branch off along its length to reach every corner of the body.'
    ],
    funFacts: [
      'Your spinal cord has its own "reflex brain" that jerks your hand away from a hot pan before you even feel pain!',
      'Although it carries all your body’s signals, the cord is only about as thick as your little finger!',
      'The spinal cord ends around the first lumbar vertebra (L1), branching into nerve strands called the Cauda Equina (horse’s tail)!'
    ],
    healthyHabits: [
      'Never dive into shallow water — head impacts can cause severe spinal cord injuries.',
      'Wear a seatbelt in cars at all times to prevent whiplash and spinal trauma.',
      'Keep your core abdominal and back muscles strong with swimming and yoga.'
    ],
    quiz: {
      question: 'What triggers your hand to pull away instantly from a hot pan before your brain feels pain?',
      options: ['A spinal cord reflex arc', 'Your fingernails', 'Your elbow bone'],
      answer: 'A spinal cord reflex arc',
      explanation: 'Zabardast! Spinal reflex arcs react in milliseconds to protect you before signals even reach the brain!'
    },
    svgType: 'spinal-cord'
  },

  pelvis: {
    id: 'pelvis',
    name: 'Pelvis / Hip Bone',
    urduName: 'کولہے کی ہڈی (شروانی ہڈی)',
    nickname: 'The Sturdy Cradle 🩻',
    regionId: 'skeleton',
    regionName: 'Spine, Bones & Joints',
    system: 'Skeletal System (نظام ہڈی)',
    systemColor: 'text-teal-700 bg-teal-50 border-teal-300',
    badgeBg: 'bg-teal-700',
    weightSize: 'A basin-shaped bone ring linking the spine to both leg bones',
    location: 'Base of the trunk, connecting the upper body to your lower limbs',
    dailyStat: 'Supports the full weight of your upper body every second you sit or stand!',
    shortDesc: 'A strong basin-shaped bony ring that protects pelvic organs and anchors your hip joints for walking, sitting, and running.',
    fullDescription: 'The pelvis is the strong bridge between your upper body and lower legs. Shaped like a basin or bowl, it provides deep cup-shaped sockets (acetabulum) into which your thigh bones fit snugly, allowing you to walk, sprint, kick a ball, or sit down comfortably.',
    howItWorks: [
      'Transfers upper body weight down through your hips to your legs.',
      'Cradles and safeguards delicate lower organs like the bladder.',
      'Provides sturdy attachment points for the strongest leg and abdominal muscles.',
      'Creates a stable center of gravity that keeps your body balanced while moving.'
    ],
    funFacts: [
      'The word "pelvis" is Latin for a "basin" or "bucket", which matches its hollowed-out shape!',
      'The hip socket in the pelvis is so deep and strong that hip dislocations are extremely rare!',
      'Scientists can identify whether an ancient skeleton was male or female just by looking at pelvic width.'
    ],
    healthyHabits: [
      'Exercise with squats, cycling, and walking to keep your hip joints mobile.',
      'Avoid sitting continuously for hours; take a 5-minute walking break every hour.',
      'Stretch your hip flexors and hamstring muscles regularly.'
    ],
    quiz: {
      question: 'What is the shape of the human pelvis bone?',
      options: ['Shaped like a basin or bowl', 'Shaped like a straight stick', 'Shaped like a triangle star'],
      answer: 'Shaped like a basin or bowl',
      explanation: 'Spot on! The pelvis forms a deep basin-like bowl that cradles your organs and supports your legs!'
    },
    svgType: 'pelvis'
  },

  femur: {
    id: 'femur',
    name: 'Femur (Thigh Bone)',
    urduName: 'ران کی ہڈی (فیمر)',
    nickname: 'The Champion Strong Bone 🦿',
    regionId: 'skeleton',
    regionName: 'Spine, Bones & Joints',
    system: 'Skeletal System (نظام ہڈی)',
    systemColor: 'text-emerald-800 bg-emerald-50 border-emerald-300',
    badgeBg: 'bg-emerald-800',
    weightSize: 'About 48 cm long in adults (roughly 27% of a person’s total height)',
    location: 'Upper leg, extending from the hip socket down to the knee joint',
    dailyStat: 'Can support up to 30 times your entire body weight without breaking!',
    shortDesc: 'The longest, heaviest, and strongest bone in the human body, engineered to support jumping, running, and heavy loads.',
    fullDescription: 'The femur is the undisputed champion of your skeletal system! It extends from your hip joint to your knee. The top end has a smooth round ball that fits inside the hip socket, while the shaft is made of dense cortical bone. Inside the femur is red bone marrow making billions of blood cells daily.',
    howItWorks: [
      'Ball-and-socket connection at the top allows your leg to swing in all directions.',
      'Hollow cylinder design provides maximum structural strength with minimal weight.',
      'Transfers impact forces from foot landings safely up toward the pelvis.',
      'Internal bone marrow manufactures billions of fresh blood cells every day.'
    ],
    funFacts: [
      'The femur is the longest, heaviest, and strongest single bone in your entire body!',
      'It is stronger than concrete and can resist forces of over 1,000 kilograms before cracking!',
      'Archaeologists calculate how tall an ancient human was just by measuring femur length.'
    ],
    healthyHabits: [
      'Engage in weight-bearing exercises like skipping rope, jumping, running, and climbing stairs.',
      'Get 15 minutes of mild sunlight daily to produce vitamin D for calcium absorption.',
      'Eat dark leafy greens, sesame seeds, milk, and almonds to strengthen bone density.'
    ],
    quiz: {
      question: 'Which is the longest and strongest bone in the human body?',
      options: ['The Femur (thigh bone)', 'The Rib bone', 'The Arm bone'],
      answer: 'The Femur (thigh bone)',
      explanation: 'Bingo! The femur (ران کی ہڈی) in your thigh is both the longest and strongest bone in your skeleton!'
    },
    svgType: 'femur'
  },

  'joints-cartilage': {
    id: 'joints-cartilage',
    name: 'Joints & Cartilage',
    urduName: 'جوڑ اور نرم کرکری ہڈی (کارٹیلیج)',
    nickname: 'The Frictionless Cushions & Hinges 🚪',
    regionId: 'skeleton',
    regionName: 'Spine, Bones & Joints',
    system: 'Skeletal System (نظام ہڈی)',
    systemColor: 'text-teal-700 bg-teal-50 border-teal-300',
    badgeBg: 'bg-teal-700',
    weightSize: 'Over 230 movable and semi-movable joints in your body',
    location: 'Wherever two or more bones meet (shoulders, knees, elbows, fingers, spine)',
    dailyStat: 'Allows smooth motion millions of times a day with less friction than ice sliding on ice!',
    shortDesc: 'Smooth shock-absorbing cartilage pads and fluid-filled capsules that allow bones to glide freely without grinding.',
    fullDescription: 'Your body has over 230 movable joints. Wherever bones meet, smooth pearly cartilage (Hyaline cartilage) coats the ends, and slippery synovial fluid lubricates the joint capsule like oil in an engine, ensuring frictionless gliding for a lifetime.',
    howItWorks: [
      'Hyaline cartilage caps bone ends, absorbing impact forces from walking and jumping.',
      'Synovial membrane secretes natural lubricating fluid into the joint capsule.',
      'Ball-and-socket joints (shoulder/hip) permit 360-degree rotation.',
      'Hinge joints (elbow/knee) permit stable back-and-forth bending.'
    ],
    funFacts: [
      'Synovial joint cartilage has less friction than ice sliding on smooth ice!',
      'Cartilage has no direct blood vessels; it absorbs nutrients from synovial fluid when you move!',
      'Cracking your knuckles is just harmless gas bubbles popping in the synovial fluid!'
    ],
    healthyHabits: [
      'Warm up with gentle joint rotations before playing sports or running.',
      'Stay hydrated — water makes up about 70% to 80% of healthy joint cartilage.',
      'Maintain an active lifestyle to circulate nutrient-rich synovial fluid.'
    ],
    quiz: {
      question: 'What lubricates your movable joints so bones do not grind against each other?',
      options: ['Synovial fluid (جوڑوں کا تیل)', 'Stomach acid', 'Pure air'],
      answer: 'Synovial fluid (جوڑوں کا تیل)',
      explanation: 'Super! Synovial fluid lubricates your joints so bones glide smoother than ice!'
    },
    svgType: 'joints-cartilage'
  },

  ligaments: {
    id: 'ligaments',
    name: 'Ligaments & Tendons',
    urduName: 'لیگامینٹس اور ٹینڈنز (مضبوط بندھن اور پٹھے کی ڈوریاں)',
    nickname: 'The Biological Ropes & Straps 🪢',
    regionId: 'skeleton',
    regionName: 'Spine, Bones & Joints',
    system: 'Skeletal & Muscular',
    systemColor: 'text-emerald-800 bg-emerald-50 border-emerald-300',
    badgeBg: 'bg-emerald-800',
    weightSize: 'Thousands of tough collagen cords and straps across all joints',
    location: 'Connecting bone to bone (ligaments) and muscle to bone (tendons)',
    dailyStat: 'Withstands pulling forces up to hundreds of kilograms every time you sprint or jump!',
    shortDesc: 'Tough fibrous cords of collagen that strap bones together at joints and anchor muscles to bones like steel cables.',
    fullDescription: 'Ligaments and tendons are your body’s biological rigging! Ligaments connect bone to bone to stabilize joints (like the ACL in your knee). Tendons connect muscle to bone (like the thick Achilles tendon behind your heel), transferring muscular pulling force directly to levers of bone.',
    howItWorks: [
      'Dense bundles of parallel collagen fibers provide incredible tensile strength.',
      'Ligaments prevent joints from bending beyond safe physiological limits.',
      'Tendons pull directly on bone levers when muscle fibers contract.',
      'Elastin fibers allow slight stretching to absorb sudden shock loads.'
    ],
    funFacts: [
      'The Achilles tendon behind your ankle is the thickest and strongest tendon in your body!',
      'Ligaments connect bone-to-bone, while tendons connect muscle-to-bone!',
      'The word tendon comes from the Latin word "tendere", meaning "to stretch"!'
    ],
    healthyHabits: [
      'Always stretch your muscles and tendons before and after strenuous sports.',
      'Wear supportive athletic shoes with good ankle stability.',
      'Give sprained joints plenty of rest and ice to allow collagen fibers to heal.'
    ],
    quiz: {
      question: 'What is the thickest and strongest tendon in the human body?',
      options: ['The Achilles tendon (behind the heel)', 'The thumb tendon', 'The shoulder strap'],
      answer: 'The Achilles tendon (behind the heel)',
      explanation: 'Bingo! The Achilles tendon behind your heel is the thickest and strongest in your entire body!'
    },
    svgType: 'ligaments'
  },

  // --- REGION 7: MUSCLES, LIMBS & MOVEMENT ---
  biceps: {
    id: 'biceps',
    name: 'Biceps & Skeletal Muscles',
    urduName: 'پٹھے (بائسپس اور عضلات)',
    nickname: 'The Power Engines (طاقت کے پٹھے) 💪',
    regionId: 'limbs',
    regionName: 'Muscles, Arms & Movement',
    system: 'Muscular System (نظام عضلات)',
    systemColor: 'text-purple-600 bg-purple-50 border-purple-200',
    badgeBg: 'bg-purple-600',
    weightSize: 'Muscles make up about 40% of your total body weight!',
    location: 'Front part of your upper arm between shoulder and elbow',
    dailyStat: 'Your 600+ muscles contract millions of times a day to produce movement and body warmth!',
    shortDesc: 'A two-headed muscle on the front of your upper arm that flexes your elbow, rotates your forearm, and lifts objects.',
    fullDescription: 'Your body contains over 600 skeletal muscles. The biceps brachii is a two-headed muscle that bends your elbow. Muscles always work in opposing pairs: when the bicep contracts to bend the elbow, the tricep on the back relaxes; when straightening the arm, the tricep contracts and the bicep relaxes.',
    howItWorks: [
      'Motor nerves trigger microscopic actin and myosin protein filaments to slide together.',
      'The bicep shortens and thickens into a powerful peak.',
      'Tough tendons pull on the radius forearm bone to bend the elbow joint.',
      'Opposing triceps muscle relaxes to allow smooth flexion.'
    ],
    funFacts: [
      'Muscles can only pull bones; they cannot push! That is why muscles always work in pairs!',
      'The word "muscle" comes from the Latin "musculus", meaning "little mouse", because flexing looked like a mouse running under the skin!',
      'Shivering when you are cold is your muscles rapidly contracting to generate body warmth.'
    ],
    healthyHabits: [
      'Eat protein-rich foods like eggs, lentils, chickpeas, paneer, and milk to rebuild muscle fibers.',
      'Stretch your arms and legs after playing sports to prevent muscle soreness.',
      'Stay hydrated — dehydrated muscles cramp and tire much faster.'
    ],
    quiz: {
      question: 'Why do skeletal muscles always work in opposing pairs (like biceps and triceps)?',
      options: ['Muscles can only pull, they cannot push', 'Because bones are heavy', 'Because they get tired'],
      answer: 'Muscles can only pull, they cannot push',
      explanation: 'Spot on! Muscles can only contract and pull, so one muscle bends the joint and its partner straightens it!'
    },
    svgType: 'biceps'
  },

  'knee-joint': {
    id: 'knee-joint',
    name: 'Knee Joint & Patella',
    urduName: 'گھٹنے کا جوڑ اور چپنی',
    nickname: 'The Heavy-Duty Hinge 🦵',
    regionId: 'limbs',
    regionName: 'Muscles, Arms & Movement',
    system: 'Skeletal & Muscular',
    systemColor: 'text-blue-700 bg-blue-50 border-blue-200',
    badgeBg: 'bg-blue-700',
    weightSize: 'The largest and most complex joint in the entire human skeleton',
    location: 'Connects the femur (thigh) to the tibia (shin) with the kneecap in front',
    dailyStat: 'Bends over 10,000 times a day and absorbs forces up to 5x your body weight during jumps!',
    shortDesc: 'The largest joint in your body; works like a heavy-duty hinge with cartilage shock-absorbers allowing walking, running, and jumping.',
    fullDescription: 'The knee is where the thigh bone meets the shin bone. Protecting the front is the patella (kneecap). Inside, two C-shaped meniscus cartilage pads act as shock absorbers, while cruciate ligaments (ACL and PCL) keep the bones from sliding out of alignment.',
    howItWorks: [
      'Hinge motion allows your lower leg to bend backward and straighten forward.',
      'Meniscus pads absorb ground shock forces from running and jumping.',
      'Synovial fluid lubricates joint surfaces so bones glide without friction.',
      'Cruciate ligaments crisscross inside to stabilize the joint during twists.'
    ],
    funFacts: [
      'Human babies are born with soft cartilage kneecaps that turn into hard bone around age 3 to 5!',
      'When you jump and land, your knee joints absorb an impact equal to 4 to 5 times your body weight!',
      'The knee is the largest and most complex joint in your whole body.'
    ],
    healthyHabits: [
      'Wear knee pads when roller-skating, skateboarding, or riding bikes on rough surfaces.',
      'Strengthen your thigh muscles (quadriceps and hamstrings) with swimming and cycling.',
      'Avoid sudden awkward twists with locked knees when jumping down from playground equipment.'
    ],
    quiz: {
      question: 'What is the protective shield bone in front of your knee joint called?',
      options: ['The Patella (Kneecap)', 'The Femur', 'The Rib'],
      answer: 'The Patella (Kneecap)',
      explanation: 'Awesome! The patella is your kneecap, a floating shield bone protecting your joint!'
    },
    svgType: 'knee'
  },

  'hand-fingers': {
    id: 'hand-fingers',
    name: 'Hand, Wrist & Opposable Thumb',
    urduName: 'ہاتھ، کلائی اور انگوٹھا',
    nickname: 'The Master Toolmaker & Gripper 🖐️',
    regionId: 'limbs',
    regionName: 'Muscles, Arms & Movement',
    system: 'Skeletal & Muscular',
    systemColor: 'text-amber-600 bg-amber-50 border-amber-200',
    badgeBg: 'bg-amber-600',
    weightSize: '27 bones, 29 joints, and over 120 ligaments in each single hand!',
    location: 'End of your forearm, connected via 8 carpal wrist bones',
    dailyStat: 'Performs thousands of precision tasks: writing, typing, holding, and playing instruments!',
    shortDesc: 'An engineering marvel with 27 bones and an opposable thumb that allows both a powerful grip and delicate pin-point precision.',
    fullDescription: 'Your hand is one of nature’s greatest mechanical inventions. With 8 wrist bones, 5 palm bones, and 14 finger bones, powered by long tendons controlled by forearm muscles, your opposable thumb can touch every other fingertip, allowing you to grip a cricket bat or thread a needle.',
    howItWorks: [
      'Forearm muscles pull on long flexor tendons that run like puppet strings into your fingers.',
      'The opposable thumb swings across the palm to touch fingertips in a precision grip.',
      'Carpal tunnel in the wrist acts as a conduit for tendons and the median nerve.',
      'Dense touch nerve receptors in fingertips send instant texture data to the brain.'
    ],
    funFacts: [
      'There are actually zero muscles inside your fingers! All finger movements are powered by forearm and palm muscles pulling tendons!',
      'One-fourth of the entire motor cortex in your brain is dedicated exclusively to controlling your hands and fingers!',
      'Your fingernails grow about 3 to 4 times faster than your toenails.'
    ],
    healthyHabits: [
      'Take regular finger and wrist stretch breaks when writing or typing for long periods.',
      'Wash hands with soap and water before meals and after playing outdoors.',
      'Trim fingernails neatly and avoid biting them.'
    ],
    quiz: {
      question: 'Are there any muscles inside your fingers?',
      options: ['No, fingers are moved by tendons from forearm muscles', 'Yes, 50 muscles in each finger', 'Only in the thumb'],
      answer: 'No, fingers are moved by tendons from forearm muscles',
      explanation: 'Fascinating! Fingers contain no muscles; they are pulled by long tendons like puppet strings from your forearm!'
    },
    svgType: 'hand-fingers'
  },

  'foot-ankle': {
    id: 'foot-ankle',
    name: 'Foot, Ankle & Toes',
    urduName: 'پاؤں، ٹخنہ اور پاؤں کی انگلیاں',
    nickname: 'The Spring-Loaded Shock Absorbers 🦶',
    regionId: 'limbs',
    regionName: 'Muscles, Arms & Movement',
    system: 'Skeletal & Muscular',
    systemColor: 'text-emerald-700 bg-emerald-50 border-emerald-300',
    badgeBg: 'bg-emerald-700',
    weightSize: '26 bones and 33 joints in each foot (combining 52 bones for both feet)',
    location: 'Base of the lower limb, supporting your entire standing upright posture',
    dailyStat: 'The average active child takes between 8,000 to 12,000 steps every single day!',
    shortDesc: 'A spring-loaded architectural arch with 26 bones that absorbs the impact of walking, provides balance, and propels you forward.',
    fullDescription: 'Together, your two feet contain over 52 bones — more than one-fourth of all the bones in your entire body! Curved arches in the sole act like automotive leaf springs, compressing to absorb landing shock and recoiling to spring you forward into your next step.',
    howItWorks: [
      'The talus bone in the ankle hinges smoothly with tibia and fibula shin bones.',
      'Plantar fascia ligament along the sole acts as an elastic spring storing energy.',
      'Toes spread and grip the ground to adjust balance on uneven terrain.',
      'Achilles tendon pulls the heel bone upward to launch you forward in running.'
    ],
    funFacts: [
      'More than 25% of all the bones in your entire skeleton are located in your two feet!',
      'Your feet have approximately 250,000 sweat glands — more per square centimeter than anywhere else on your body!',
      'During a sprint, your feet momentarily absorb forces equal to 3 to 4 times your body weight.'
    ],
    healthyHabits: [
      'Wear properly fitted shoes that give your toes room to wiggle naturally.',
      'Wash and dry your feet thoroughly every day, especially between the toes.',
      'Walk barefoot on clean grass or sand to strengthen foot arch muscles.'
    ],
    quiz: {
      question: 'What percentage of all bones in the human body are in your two feet?',
      options: ['Over 25%', 'Only 5%', 'Exactly 50%'],
      answer: 'Over 25%',
      explanation: 'Super! Your two feet contain 52 bones — over 25% of all the bones in your entire body!'
    },
    svgType: 'foot-ankle'
  },

  // --- REGION 8: SKIN, NAILS & MICROSCOPIC LIFE ---
  skin: {
    id: 'skin',
    name: 'Skin & Sweat Pores',
    urduName: 'جلد اور پسینے کے مسام (جسم کی بیرونی چادر)',
    nickname: 'The Living Waterproof Coat 🛡️',
    regionId: 'microscopic',
    regionName: 'Skin, Nails & Microscopic DNA',
    system: 'Integumentary System (جلدی نظام)',
    systemColor: 'text-amber-700 bg-amber-50 border-amber-200',
    badgeBg: 'bg-amber-700',
    weightSize: 'Covers ~1.5 to 2 square meters & weighs about 4 kg (16% of total body weight)',
    location: 'Covers the entire exterior surface of your body from head to toe',
    dailyStat: 'Sheds roughly 30,000 to 40,000 dead microscopic skin cells every single minute!',
    shortDesc: 'The largest organ of the human body; acts as a waterproof shield against germs, regulates temperature, and feels touch.',
    fullDescription: 'Skin is officially the largest organ of your body! It has three layers: Epidermis (waterproof outer shield), Dermis (housing sweat glands, hair follicles, and touch sensors), and Hypodermis (insulating fat). It prevents dehydration and cools you down through evaporating sweat.',
    howItWorks: [
      'Epidermis produces keratin and melanin pigment to shield tissues from UV sun rays and bacteria.',
      'Sweat glands release sweat droplets that evaporate to cool your body when running.',
      'Millions of sensory touch receptors detect temperature, pressure, pain, and breezes.',
      'Synthesizes essential vitamin D when gentle morning sunlight touches your skin.'
    ],
    funFacts: [
      'Skin is officially the largest and heaviest single organ in the human body!',
      'You get a completely brand-new outer layer of skin approximately every 28 days!',
      'Goosebumps are tiny arrector pili muscles pulling hairs upright to trap air warmth.'
    ],
    healthyHabits: [
      'Take a daily bath with gentle soap to wash away sweat, dirt, and bacteria.',
      'Drink plenty of clean water to keep your skin supple and moisturized.',
      'Apply sunscreen when spending long hours outdoors in direct harsh sunlight.'
    ],
    quiz: {
      question: 'Which is the largest organ of the entire human body?',
      options: ['The Skin (جلد)', 'The Liver', 'The Large Intestine'],
      answer: 'The Skin (جلد)',
      explanation: 'Super! Your skin covers your entire body (about 2 square meters) and is your largest organ!'
    },
    svgType: 'skin'
  },

  nails: {
    id: 'nails',
    name: 'Fingernails & Toenails',
    urduName: 'ہاتھ اور پاؤں کے ناخن (کیراٹن کی شیلڈ)',
    nickname: 'The Protective Keratin Shields 💅',
    regionId: 'microscopic',
    regionName: 'Skin, Nails & Microscopic DNA',
    system: 'Integumentary System (جلدی نظام)',
    systemColor: 'text-pink-600 bg-pink-50 border-pink-200',
    badgeBg: 'bg-pink-600',
    weightSize: 'Hard plates made of laminated layers of tough fibrous protein (Keratin)',
    location: 'Covering the dorsal surface of the tips of all fingers and toes',
    dailyStat: 'Fingernails grow about 3.5 millimeters every month!',
    shortDesc: 'Hard protective plates made of compacted keratin that shield sensitive fingertips and aid in picking up small objects.',
    fullDescription: 'Nails are made of tough, compacted keratin — the exact same protein found in rhino horns and bird feathers! They grow continuously from the nail matrix hidden underneath the cuticle. Nails support delicate fingertip nerves and allow you to scratch and pick up tiny items.',
    howItWorks: [
      'Nail matrix beneath the cuticle continuously divides and pushes dead keratinized cells forward.',
      'The transparent nail plate rests upon a vascular nail bed which gives it a healthy pink color.',
      'Provides counter-pressure to fingertip pads, increasing touch sensitivity.',
      'Protects sensitive distal phalanx bone tips from crushing injuries.'
    ],
    funFacts: [
      'Fingernails grow about 3 to 4 times faster than your toenails!',
      'The nail on your middle finger grows the fastest, while the thumb nail grows the slowest!',
      'The pale half-moon shape at the base of your nail is called the Lunula (little moon)!'
    ],
    healthyHabits: [
      'Keep nails trimmed neatly and clean underneath with a soft nail brush.',
      'Never bite your nails — it damages the nail bed and introduces germs into your mouth.',
      'Eat protein, zinc, and biotin-rich foods like nuts, eggs, and seeds.'
    ],
    quiz: {
      question: 'What tough fibrous protein are your fingernails and hair made of?',
      options: ['Keratin (کیراٹن)', 'Calcium carbonate', 'Collagen'],
      answer: 'Keratin (کیراٹن)',
      explanation: 'Spot on! Nails and hair are made of tough, waterproof keratin protein!'
    },
    svgType: 'nails'
  },

  'dna-cells': {
    id: 'dna-cells',
    name: 'Human Cell & DNA Molecule',
    urduName: 'انسانی خلیہ اور ڈی این اے (زندگی کا نقشہ)',
    nickname: 'The Blueprint of Life (زندگی کا خفیہ کوڈ) 🧬',
    regionId: 'microscopic',
    regionName: 'Skin, Nails & Microscopic DNA',
    system: 'Genetics & Cellular Biology (خلوی نظام)',
    systemColor: 'text-purple-700 bg-purple-50 border-purple-200',
    badgeBg: 'bg-purple-700',
    weightSize: 'Microscopic (DNA helix is 2 nanometers wide, stretched out it is 2 meters per cell!)',
    location: 'Inside the nucleus of virtually every single cell in your body',
    dailyStat: 'Over 37 trillion cells reading and replicating genetic instructions daily!',
    shortDesc: 'The microscopic double-helix code inside every cell nucleus that contains all instructions for how your body grows and works.',
    fullDescription: 'DNA (Deoxyribonucleic acid) is your body’s ultimate recipe book! Formed as an elegant twisting ladder (double helix) of four chemical bases (A, T, C, G), it tells your body what color eyes to have, how tall to grow, and how to build every single protein that keeps you alive.',
    howItWorks: [
      'Four chemical base letters (A, T, C, G) pair up along sugar-phosphate backbones.',
      'Genes spell out precise recipes for thousands of specialized body proteins.',
      'RNA copies the code and ribosomes manufacture proteins like molecular 3D printers.',
      'Cells replicate DNA with near-zero error rates before dividing.'
    ],
    funFacts: [
      'If you uncoiled all the DNA strands inside all your body cells and tied them end to end, they would stretch to Pluto and back!',
      'All humans share over 99.9% of the exact same DNA code; only 0.1% makes you unique!',
      'You inherit half of your DNA from your mother and half from your father!'
    ],
    healthyHabits: [
      'Protect your skin from harsh ultraviolet sun rays that can mutate DNA bonds.',
      'Eat antioxidant-rich foods like blueberries, dark greens, and tomatoes.',
      'Get plenty of sleep to give cells time to repair damaged DNA strands.'
    ],
    quiz: {
      question: 'What shape does the famous DNA molecule form?',
      options: ['A twisting double-helix ladder', 'A flat straight square', 'A single circle'],
      answer: 'A twisting double-helix ladder',
      explanation: 'Bingo! DNA forms an elegant twisting double-helix ladder containing the code of life!'
    },
    svgType: 'dna'
  }
};
