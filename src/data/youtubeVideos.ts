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
  // 1. Phonics Alphabetical content 1: https://youtu.be/hq3yfQnllfQ?feature=shared
  {
    id: 'v-alphabet-hq3yfQnllfQ',
    youtubeId: 'hq3yfQnllfQ',
    title: 'A to Z Alphabet Phonics Song & Letter Adventure',
    hindiTitle: 'ए से ज़ेड तक वर्णमाला और फोनिक्स गीत',
    channel: 'Alphabet Learning Kids',
    duration: '4:15',
    category: 'Alphabets & Phonics',
    categoryId: 'words',
    gradeLevel: 'KG',
    views: '1.8M views',
    thumbnail: 'https://img.youtube.com/vi/hq3yfQnllfQ/hqdefault.jpg',
    description: 'Catchy and colorful alphabetical phonics with singing animals and letter sounds for toddlers and preschoolers.',
    notes: [
      'Each letter from A to Z has its own unique vocal sound.',
      'Letter A makes the /æ/ sound like Apple.',
      'Letter B makes the /b/ sound like Ball.',
      'Singing the alphabet daily builds reading readiness.',
    ],
    objectives: [
      'Recognize all 26 uppercase and lowercase letters',
      'Connect letter symbols with correct phonics sounds',
      'Build confidence in early English vocabulary',
    ],
  },

  // 2. Phonics Alphabetical content 2: https://youtu.be/TF1loU8bJaM?feature=shared
  {
    id: 'v-alphabet-TF1loU8bJaM',
    youtubeId: 'TF1loU8bJaM',
    title: 'Phonics Alphabet Bus & Letter Sounds Masterclass',
    hindiTitle: 'अक्षर लेखन और फोनिक्स ट्रेसिंग मास्टरक्लास',
    channel: 'Toddler Learning Academy',
    duration: '5:20',
    category: 'Alphabets & Phonics',
    categoryId: 'words',
    gradeLevel: 'Grade 1-2',
    views: '2.4M views',
    thumbnail: 'https://img.youtube.com/vi/TF1loU8bJaM/hqdefault.jpg',
    description: 'Learn handwriting strokes and vocal sounds for every letter with fun interactive phonics animations.',
    notes: [
      'Trace letters from top to bottom with steady fingers.',
      'Blend letter sounds together to read simple three-letter words (C-A-T, B-A-T).',
      'Practice writing every day for beautiful neat handwriting.',
    ],
    objectives: [
      'Master proper pencil grip and letter stroke direction',
      'Form words using phonemic awareness',
      'Enhance spelling and reading fluency',
    ],
  },

  // 3. Magicimals Stories: https://www.youtube.com/@magicimals
  {
    id: 'v-magicimals-beanstalk',
    youtubeId: 'fabyDHOhUMg',
    title: 'Magicimals: Jack & The Magic Beanstalk 3D Story',
    hindiTitle: 'मैजिशिमल्स: जादुई पेड़ और नन्हे जैक की साहसी कहानी',
    channel: 'Magicimals',
    duration: '6:45',
    category: 'Stories & Moral Values',
    categoryId: 'stories',
    gradeLevel: 'All Ages',
    views: '3.1M views',
    thumbnail: 'https://img.youtube.com/vi/fabyDHOhUMg/hqdefault.jpg',
    description: 'Enchanting 3D animated fairy tales and moral bedtime stories from Magicimals teaching courage, honesty, and family values.',
    notes: [
      'True courage means doing the right thing even when it feels hard.',
      'Honesty and patience bring true long-term rewards.',
      'Sharing with family and helping parents makes a loving home.',
    ],
    objectives: [
      'Develop empathy, emotional intelligence and moral values',
      'Inspire imaginative creative thinking through storytelling',
      'Learn about courage, responsibility and kindness',
    ],
  },

  // 4. Masti Toons by Varda for rhymes: https://www.youtube.com/@mastitoonsbyvarda
  {
    id: 'v-mastitoons-muffin',
    youtubeId: 'UHEm0JnL7I8',
    title: 'Masti Toons: The Muffin Man & Sweet Toddler Rhymes',
    hindiTitle: 'मस्ती टून्स: द मफिन मैन और बाल गीत',
    channel: 'Masti Toons by Varda',
    duration: '4:30',
    category: 'Rhymes & Music',
    categoryId: 'rhymes',
    gradeLevel: 'KG',
    views: '4.5M views',
    thumbnail: 'https://img.youtube.com/vi/UHEm0JnL7I8/hqdefault.jpg',
    description: 'Musical rhythm, joyful nursery rhymes, and colorful dance songs from Masti Toons by Varda for toddlers.',
    notes: [
      'Rhythmic singing improves memory retention and speech clarity.',
      'Clap along to the beat to build musical rhythm.',
      'Enjoy cheerful nursery rhymes with cute dancing characters.',
    ],
    objectives: [
      'Enhance auditory listening skills and speech articulation',
      'Promote joy, laughter, and active physical movement',
      'Preserve beloved cultural childhood rhymes',
    ],
  },

  // 5. Magicimals Animal Adventure: https://www.youtube.com/@magicimals
  {
    id: 'v-magicimals-northwind',
    youtubeId: 'Eq18su0edqU',
    title: 'Magicimals: The Boy Who Went to the North Wind',
    hindiTitle: 'मैजिशिमल्स: हवा के देश में नन्हा बालक और जादुई उपहार',
    channel: 'Magicimals',
    duration: '7:15',
    category: 'Stories & Moral Values',
    categoryId: 'stories',
    gradeLevel: 'Grade 1-2',
    views: '2.7M views',
    thumbnail: 'https://img.youtube.com/vi/Eq18su0edqU/hqdefault.jpg',
    description: 'Follow the gentle young hero as he travels to meet the North Wind and learns valuable lessons in persistence and justice.',
    notes: [
      'Never give up when facing setbacks or obstacles.',
      'Keep your promises and respect the trust of others.',
      'Stand up for kindness and fair treatment for all people.',
    ],
    objectives: [
      'Foster determination and moral character in young minds',
      'Reinforce truthfulness, cooperation, and patience',
      'Encourage family listening and discussion habits',
    ],
  },

  // 6. Masti Toons Rhyme Fun: https://www.youtube.com/@mastitoonsbyvarda
  {
    id: 'v-mastitoons-rain',
    youtubeId: 'eCRI4yZP0SE',
    title: 'Masti Toons: Rain Rain Go Away & Dancing Animal Songs',
    hindiTitle: 'मस्ती टून्स: रेन रेन गो अवे और बाल गीत',
    channel: 'Masti Toons by Varda',
    duration: '4:10',
    category: 'Rhymes & Music',
    categoryId: 'rhymes',
    gradeLevel: 'All Ages',
    views: '3.8M views',
    thumbnail: 'https://img.youtube.com/vi/eCRI4yZP0SE/hqdefault.jpg',
    description: 'Dance and sing along with joyful animal friends celebrating sunny days and happy playtime together!',
    notes: [
      'Catchy songs encourage toddlers to sing in full sentences.',
      'Notice the rhythm and rhyming patterns.',
      'Active dancing builds physical balance and motor coordination.',
    ],
    objectives: [
      'Identify rhyming sound patterns',
      'Practice motor coordination through dance motions',
      'Spread happiness and smiles among toddlers',
    ],
  },
];

export const LESSON_PLAYLIST_VIDEOS = REAL_YOUTUBE_VIDEOS;
