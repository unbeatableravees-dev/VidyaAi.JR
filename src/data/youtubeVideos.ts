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
    title: 'Phonics Letter Tracing & ABC Sounds Masterclass',
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
    id: 'v-magicimals-elephant',
    youtubeId: 'hq3yfQnllfQ',
    title: 'Magicimals: The Brave Little Elephant & Forest Friends',
    hindiTitle: 'मैजिशिमल्स: नन्हा बहादुर हाथी और जंगल के दोस्त',
    channel: 'Magicimals',
    duration: '6:12',
    category: 'Stories & Moral Values',
    categoryId: 'stories',
    gradeLevel: 'All Ages',
    views: '3.1M views',
    thumbnail: 'https://img.youtube.com/vi/hq3yfQnllfQ/hqdefault.jpg',
    description: 'Enchanting animated animal bedtime and moral stories from Magicimals teaching empathy, friendship, and curiosity.',
    notes: [
      'True courage means helping a friend when they feel scared.',
      'Small acts of kindness make the whole forest brighter.',
      'Every animal has a unique gift to share with others.',
    ],
    objectives: [
      'Develop empathy, emotional intelligence and moral values',
      'Inspire imaginative creative thinking through storytelling',
      'Learn about animal habitats and nature stewardship',
    ],
  },

  // 4. Masti Toons by Varda for rhymes: https://www.youtube.com/@mastitoonsbyvarda
  {
    id: 'v-mastitoons-chanda',
    youtubeId: 'TF1loU8bJaM',
    title: 'Masti Toons: Chanda Mama Door Ke & Sweet Toddler Rhymes',
    hindiTitle: 'मस्ती टून्स: चंदा मामा दूर के और बाल गीत',
    channel: 'Masti Toons by Varda',
    duration: '4:45',
    category: 'Rhymes & Music',
    categoryId: 'rhymes',
    gradeLevel: 'KG',
    views: '4.5M views',
    thumbnail: 'https://img.youtube.com/vi/TF1loU8bJaM/hqdefault.jpg',
    description: 'Musical rhythm, joyful nursery rhymes, and colorful dance songs from Masti Toons by Varda for toddlers.',
    notes: [
      'Rhythmic singing improves memory retention and speech clarity.',
      'Clap along to the beat to build musical rhythm.',
      'Enjoy traditional folk rhymes with cute dancing characters.',
    ],
    objectives: [
      'Enhance auditory listening skills and speech articulation',
      'Promote joy, laughter, and active physical movement',
      'Preserve beloved cultural childhood rhymes',
    ],
  },

  // 5. Magicimals Animal Adventure: https://www.youtube.com/@magicimals
  {
    id: 'v-magicimals-kindness',
    youtubeId: 'hq3yfQnllfQ',
    title: 'Magicimals: The Curious Little Fox & The Starry Night',
    hindiTitle: 'मैजिशिमल्स: नन्हीं लोमड़ी और तारों भरी रात',
    channel: 'Magicimals',
    duration: '5:30',
    category: 'Stories & Moral Values',
    categoryId: 'stories',
    gradeLevel: 'Grade 1-2',
    views: '2.7M views',
    thumbnail: 'https://img.youtube.com/vi/hq3yfQnllfQ/hqdefault.jpg',
    description: 'Follow the adventurous young fox as she looks up at the constellations and learns the magic of sharing with woodland friends.',
    notes: [
      'Curiosity leads to wondrous scientific discoveries.',
      'Sharing toys and treats makes playing ten times happier.',
      'Listen to parent animals when exploring new places.',
    ],
    objectives: [
      'Foster curiosity about the night sky and stars',
      'Reinforce sharing, cooperation, and patience',
      'Encourage family reading and listening habits',
    ],
  },

  // 6. Masti Toons Rhyme Fun: https://www.youtube.com/@mastitoonsbyvarda
  {
    id: 'v-mastitoons-bandar',
    youtubeId: 'TF1loU8bJaM',
    title: 'Masti Toons: Bandar Mama Pahan Pajama & Animal Song',
    hindiTitle: 'मस्ती टून्स: बंदर मामा पहन पजामा दावत खाने आए',
    channel: 'Masti Toons by Varda',
    duration: '4:10',
    category: 'Rhymes & Music',
    categoryId: 'rhymes',
    gradeLevel: 'All Ages',
    views: '3.8M views',
    thumbnail: 'https://img.youtube.com/vi/TF1loU8bJaM/hqdefault.jpg',
    description: 'Laugh and dance with Bandar Mama as he dresses up in funny clothes and attends a grand jungle party!',
    notes: [
      'Funny rhymes encourage toddlers to speak full sentences.',
      'Notice the rhyming words: Pajama, Mama, Daawat!',
      'Dance moves build motor coordination and balance.',
    ],
    objectives: [
      'Identify rhyming sound patterns',
      'Practice motor coordination through dance motions',
      'Spread happiness and smiles among toddlers',
    ],
  },
];

export const LESSON_PLAYLIST_VIDEOS = REAL_YOUTUBE_VIDEOS;
