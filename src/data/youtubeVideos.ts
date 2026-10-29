export interface RealVideoItem {
  id: string;
  youtubeId: string;
  title: string;
  hindiTitle?: string;
  channel: string;
  duration: string;
  category: string;
  categoryId: string;
  gradeLevel: 'All Ages' | 'KG' | 'Grade 1-2' | 'Grade 2-3';
  views: string;
  thumbnail: string;
  description: string;
  notes: string[];
  objectives: string[];
}

export const REAL_YOUTUBE_VIDEOS: RealVideoItem[] = [
  {
    id: 'v-elephants',
    youtubeId: 'lLAyDRLHKXY',
    title: "How Elephants Use Their Super Trunks!",
    hindiTitle: "हाथी की जादुई सूंड के अनोखे करतब",
    channel: 'National Geographic Kids',
    duration: '4:32',
    category: 'Animals & Wildlife',
    categoryId: 'animals',
    gradeLevel: 'All Ages',
    views: '1.4M views',
    thumbnail: 'https://img.youtube.com/vi/lLAyDRLHKXY/hqdefault.jpg',
    description: 'Join Toto and Nat Geo Kids to discover how elephants use their amazing trunk as a hand, hose, snorkel, and trumpet!',
    notes: [
      'An elephant trunk has over 40,000 muscles and zero bones!',
      'They can use it to breathe like a snorkel underwater.',
      'Trunks can pick up a tiny peanut or lift a 300kg tree branch.',
    ],
    objectives: [
      'Discover animal anatomy & sensory adaptations',
      'Learn the difference between Asian and African elephants',
      'Cultivate kindness and conservation for wild animals',
    ],
  },
  {
    id: 'v-trains',
    youtubeId: 'Yr88rbWb-7E',
    title: 'The Invention of Trains | Steam to Bullet Trains',
    hindiTitle: 'ट्रेन का आविष्कार कैसे हुआ? छुक-छुक से बुलेट ट्रेन',
    channel: 'Peekaboo Kidz (Dr. Binocs)',
    duration: '5:18',
    category: 'Science & Invention',
    categoryId: 'science',
    gradeLevel: 'Grade 1-2',
    views: '2.8M views',
    thumbnail: 'https://img.youtube.com/vi/Yr88rbWb-7E/hqdefault.jpg',
    description: 'Hop aboard with Dr. Binocs to see how coal, boiling water, and steam revolutionized travel across the world!',
    notes: [
      'George Stephenson built the world’s first passenger railway.',
      'High pressure steam pushes giant metal pistons to turn wheels.',
      'Modern Vande Bharat & electric trains run on clean electrical power.',
    ],
    objectives: [
      'Understand the basics of steam pressure and locomotives',
      'Learn how wheels grip steel railway tracks',
      'Appreciate how transportation connects nations',
    ],
  },
  {
    id: 'v-plants',
    youtubeId: 'D1Ymc311XS8',
    title: 'How Does A Seed Grow Into A Plant? (Photosynthesis)',
    hindiTitle: 'बीज से पौधा कैसे बनता है? फोटोसिंथेसिस',
    channel: 'Dr. Binocs Show',
    duration: '4:45',
    category: 'Science & Nature',
    categoryId: 'science',
    gradeLevel: 'All Ages',
    views: '3.9M views',
    thumbnail: 'https://img.youtube.com/vi/D1Ymc311XS8/hqdefault.jpg',
    description: 'Explore the magical life cycle of a seed, root systems, and how leaves catch sunlight to cook sweet food for plants!',
    notes: [
      'Seeds need sunlight, water, and healthy soil to germinate.',
      'Roots absorb vital water and minerals from deep underground.',
      'Plants produce oxygen that all humans and animals breathe!',
    ],
    objectives: [
      'Identify plant parts: roots, stem, leaves, flower, seed',
      'Understand basic photosynthesis and the oxygen cycle',
      'Encourage planting and caring for green nature',
    ],
  },
  {
    id: 'v-numberblocks-add',
    youtubeId: 'G_FYTTmxukc',
    title: 'Numberblocks – Magical Addition & Combining Numbers',
    hindiTitle: 'नंबरब्लॉक्स के साथ जोड़ना सीखें (२ + ३ = ५)',
    channel: 'Numberblocks Official',
    duration: '6:10',
    category: 'Mathematics',
    categoryId: 'numbers',
    gradeLevel: 'KG',
    views: '5.2M views',
    thumbnail: 'https://img.youtube.com/vi/G_FYTTmxukc/hqdefault.jpg',
    description: 'Sing and count with the colorful Numberblocks! See how 2 and 3 jump together to form happy Number Five.',
    notes: [
      'Addition means combining two sets together into one total.',
      '2 blocks + 3 blocks = 5 bright blocks!',
      'Visual counting on fingers makes math instant and fun.',
    ],
    objectives: [
      'Master single-digit addition visually',
      'Recognize number bonds up to 10',
      'Build confidence in basic mental math',
    ],
  },
  {
    id: 'v-planets',
    youtubeId: 'w36yxLgwUOc',
    title: 'Explore the Solar System & 8 Wonder Planets',
    hindiTitle: 'सौरमंडल और ८ ग्रहों की जादुई अंतरिक्ष यात्रा',
    channel: 'Peekaboo Kidz',
    duration: '6:42',
    category: 'Space & Astronomy',
    categoryId: 'space',
    gradeLevel: 'All Ages',
    views: '4.1M views',
    thumbnail: 'https://img.youtube.com/vi/w36yxLgwUOc/hqdefault.jpg',
    description: 'Zoom through the solar system from blazing Mercury to icy Neptune, passing Jupiter’s great red storm and Saturn’s rings!',
    notes: [
      'The Sun holds 99.8% of all the mass in our solar system.',
      'Jupiter is the largest planet; Earth is the only one with oceans.',
      'Saturn has magnificent rings made of ice, rock, and dust.',
    ],
    objectives: [
      'Name all 8 planets in order from the Sun',
      'Understand gravity, orbits, and planet types',
      'Spark excitement for astronomy and telescope stargazing',
    ],
  },
  {
    id: 'v-subtraction',
    youtubeId: 'Fe8u2I3vmHu',
    title: 'Basic Subtraction for Kids | Take Away & Count Back',
    hindiTitle: 'घटाना सीखें – मजेदार सबट्रैक्शन',
    channel: 'Khan Academy Kids',
    duration: '5:20',
    category: 'Mathematics',
    categoryId: 'numbers',
    gradeLevel: 'Grade 1-2',
    views: '1.9M views',
    thumbnail: 'https://img.youtube.com/vi/Fe8u2I3vmHu/hqdefault.jpg',
    description: 'Friendly animals demonstrate how taking away delicious treats leaves fewer items behind, teaching minus signs step-by-step.',
    notes: [
      'Subtraction means taking away part of a group.',
      'If you have 5 apples and eat 2, you have 3 apples left.',
      'The minus sign (-) tells us to count backwards.',
    ],
    objectives: [
      'Understand the concept of subtraction and the minus sign',
      'Solve word problems using real objects',
      'Practice mental subtraction within 20',
    ],
  },
  {
    id: 'v-shapes',
    youtubeId: 'OEbRDtCAFdU',
    title: 'The Shapes Song | Circles, Squares, Triangles & Stars',
    hindiTitle: 'आकृतियों का गीत – गोल, चौकोर, त्रिकोण',
    channel: 'KidsTV123',
    duration: '4:15',
    category: 'Shapes & Geometry',
    categoryId: 'shapes',
    gradeLevel: 'KG',
    views: '12M views',
    thumbnail: 'https://img.youtube.com/vi/OEbRDtCAFdU/hqdefault.jpg',
    description: 'Catchy melodic song identifying 2D geometric shapes in clocks, windows, slices of pizza, and glittering stars.',
    notes: [
      'A circle has 0 corners and is completely round.',
      'A triangle has 3 straight sides and 3 sharp corners.',
      'A square has 4 sides that are all completely equal.',
    ],
    objectives: [
      'Recognize circles, squares, rectangles, triangles, and stars',
      'Count sides and corners of geometric figures',
      'Spot basic shapes hidden in everyday household objects',
    ],
  },
  {
    id: 'v-phonics',
    youtubeId: 'BELlZKpi1Zs',
    title: 'Alphablocks A to Z Phonics & Word Magic',
    hindiTitle: 'अल्फाब्लॉक्स A से Z तक फोनिक्स और शब्द बनाना',
    channel: 'Alphablocks Official',
    duration: '7:30',
    category: 'English & Phonics',
    categoryId: 'english',
    gradeLevel: 'KG',
    views: '8.7M views',
    thumbnail: 'https://img.youtube.com/vi/BELlZKpi1Zs/hqdefault.jpg',
    description: 'Each alphabet block holds hands to blend sounds and bring words like CAT, DOG, and SUN to life!',
    notes: [
      'Every letter has its own name and special phonetic sound.',
      'Combining consonant-vowel-consonant creates CVC words.',
      'Phonics makes learning to read fast, fun, and natural.',
    ],
    objectives: [
      'Master the phonetic sounds of letters A to Z',
      'Blend letter sounds together to read 3-letter words',
      'Foster early independent reading habits',
    ],
  },
  {
    id: 'v-birbal',
    youtubeId: 'zY6f0h7t73M',
    title: 'Clever Birbal & Emperor Akbar – Classic Moral Tales',
    hindiTitle: 'अकबर और बीरबल की चतुर कहानियां',
    channel: 'Panchatantra Kids',
    duration: '8:10',
    category: 'Moral Stories',
    categoryId: 'stories',
    gradeLevel: 'All Ages',
    views: '3.1M views',
    thumbnail: 'https://img.youtube.com/vi/zY6f0h7t73M/hqdefault.jpg',
    description: 'When Emperor Akbar faces tricky puzzles and riddles, wise advisor Birbal uses kindness, quick thinking, and humor to find justice.',
    notes: [
      'Wisdom and calm thinking can solve problems anger cannot.',
      'Truth always shines brighter than greed or deception.',
      'Treating everyone with fairness earns true respect.',
    ],
    objectives: [
      'Develop moral values of honesty, justice, and kindness',
      'Encourage creative problem solving in tough situations',
      'Appreciate Indian folklore and storytelling traditions',
    ],
  },
  {
    id: 'v-continents',
    youtubeId: 'K6DSMZ8b3LE',
    title: 'Seven Continents & 5 Oceans of Planet Earth',
    hindiTitle: 'दुनिया के सात महाद्वीप और पांच महासागर',
    channel: 'Hopscotch Kids',
    duration: '3:50',
    category: 'Geography',
    categoryId: 'geography',
    gradeLevel: 'Grade 1-2',
    views: '6.4M views',
    thumbnail: 'https://img.youtube.com/vi/K6DSMZ8b3LE/hqdefault.jpg',
    description: 'Fly across Asia, Africa, North America, South America, Antarctica, Europe, and Australia with catchy rhythm and colorful maps!',
    notes: [
      'Asia is the largest continent with the highest mountain, Everest.',
      'The Pacific Ocean is the deepest and widest ocean on Earth.',
      'Antarctica is covered in thick glaciers and icebergs.',
    ],
    objectives: [
      'Memorize all 7 continents and 5 oceans',
      'Understand globe orientation and world maps',
      'Build global curiosity for cultures and habitats',
    ],
  },
  {
    id: 'v-coding',
    youtubeId: 'THOEQ5DIRMt',
    title: 'What is Coding? Computer Science & Algorithms for Juniors',
    hindiTitle: 'कोडिंग क्या है? बच्चों के लिए कंप्यूटर साइंस',
    channel: 'Code.org',
    duration: '4:55',
    category: 'Coding & Logic',
    categoryId: 'coding',
    gradeLevel: 'Grade 2-3',
    views: '2.1M views',
    thumbnail: 'https://img.youtube.com/vi/THOEQ5DIRMt/hqdefault.jpg',
    description: 'Learn how computers follow instructions just like a cooking recipe or dance routine! Discover loops, sequences, and logic bugs.',
    notes: [
      'Code is a list of clear step-by-step instructions for computers.',
      'An algorithm is like a step-by-step recipe to complete a task.',
      'A bug is simply a mistake in your recipe that you can debug and fix!',
    ],
    objectives: [
      'Understand algorithmic thinking and sequences',
      'Learn what programs, inputs, and outputs mean',
      'Inspire kids to build games and solve logical puzzles',
    ],
  },
  {
    id: 'v-drawing',
    youtubeId: 't_3rS5yP0tU',
    title: 'How to Draw a 3D Space Rocket Step by Step',
    hindiTitle: '3D स्पेस रॉकेट बनाना सीखें – आसान ड्राइंग',
    channel: 'Art for Kids Hub',
    duration: '7:05',
    category: 'Art & Drawing',
    categoryId: 'art',
    gradeLevel: 'All Ages',
    views: '1.8M views',
    thumbnail: 'https://img.youtube.com/vi/t_3rS5yP0tU/hqdefault.jpg',
    description: 'Follow along with father and son to draw a sleek space rocket with fiery thrusters, portholes, and glowing stars!',
    notes: [
      'Start with simple geometric shapes: a long oval and triangles.',
      'Add curved shading lines to make flat drawings pop into 3D!',
      'Bright contrasting colors bring cosmic energy to your artwork.',
    ],
    objectives: [
      'Develop fine motor drawing and pencil control skills',
      'Learn 3D perspective and shading fundamentals',
      'Encourage imaginative artistic self-expression',
    ],
  },
];

// Helper to look up video by ID or fallback
export const getVideoById = (id: string): RealVideoItem => {
  return REAL_YOUTUBE_VIDEOS.find((v) => v.id === id || v.youtubeId === id) || REAL_YOUTUBE_VIDEOS[0];
};

// Lessons mapped specifically for the interactive VideoLessonScreen playlist
export const LESSON_PLAYLIST_VIDEOS: RealVideoItem[] = [
  REAL_YOUTUBE_VIDEOS[3], // Numberblocks Addition
  REAL_YOUTUBE_VIDEOS[5], // Subtraction
  REAL_YOUTUBE_VIDEOS[6], // Shapes
  REAL_YOUTUBE_VIDEOS[1], // Trains & Inventions
  REAL_YOUTUBE_VIDEOS[2], // Plant Growth
];
