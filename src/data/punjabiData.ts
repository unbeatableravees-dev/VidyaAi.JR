// =============================================================================
// PUNJABI & GURMUKHI COMPREHENSIVE LEARNING DATA (ਪੰਜਾਬੀ ਸਿੱਖਿਆ)
// Tailored for Sikh students: English + Punjabi (ਗੁਰਮੁਖੀ)
// =============================================================================

export interface PunjabiLesson {
  id: string;
  title: string;
  punjabiTitle: string;
  category: 'gurmukhi-alphabet' | 'punjabi-words' | 'sikh-values' | 'punjabi-stories';
  punjabiText: string;
  transliteration: string;
  englishMeaning: string;
  moralTip: string;
  icon: string;
  color: string;
}

export const PUNJABI_TRACKS = [
  {
    id: 'gurmukhi-alphabet',
    title: 'Gurmukhi Alphabet (ਪੈਂਤੀ ਅੱਖਰੀ)',
    punjabiTitle: '੩੫ ਅੱਖਰੀ ਗੁਰਮੁਖੀ ਵਰਣਮਾਲਾ',
    description: 'Learn the sacred 35 letters of Gurmukhi from ੳ to ੜ with authentic pronunciation and vocabulary.',
    icon: 'ੴ',
    color: 'from-amber-500 via-orange-600 to-yellow-600',
    count: '35 Letters',
  },
  {
    id: 'punjabi-words',
    title: 'Daily Punjabi Words (ਰੋਜ਼ਾਨਾ ਸ਼ਬਦ)',
    punjabiTitle: 'ਫਲ, ਸਬਜ਼ੀਆਂ, ਰੰਗ ਅਤੇ ਗਿਣਤੀ',
    description: 'Everyday Punjabi words for fruits, colors, animals, nature, and counting from ੧ (Ek) to ੧੦ (Das).',
    icon: '🍎',
    color: 'from-emerald-500 via-teal-600 to-green-700',
    count: '20+ Words',
  },
  {
    id: 'sikh-values',
    title: 'Noble Virtues & Seva (ਸਿੱਖ ਕਦਰਾਂ-ਕੀਮਤਾਂ)',
    punjabiTitle: 'ਕਿਰਤ ਕਰੋ, ਨਾਮ ਜਪੋ, ਵੰਡ ਛਕੋ',
    description: 'The golden pillars: Honest hard work (Kirat), Remembering the Divine (Naam), Sharing with all (Vand Chhako), and Chardi Kala.',
    icon: '☬',
    color: 'from-blue-600 via-indigo-700 to-cyan-700',
    count: 'Golden Rules',
  },
  {
    id: 'punjabi-stories',
    title: 'Inspirational Tales (ਪ੍ਰੇਰਣਾਦਾਇਕ ਸਾਖੀਆਂ)',
    punjabiTitle: 'ਸੱਚਾ ਸੌਦਾ ਅਤੇ ਨਿਡਰਤਾ ਦੀਆਂ ਕਹਾਣੀਆਂ',
    description: 'Heartwarming stories of compassion, Sacha Sauda (True Bargain), selfless langar, and standing for justice.',
    icon: '📖',
    color: 'from-purple-600 via-violet-700 to-rose-700',
    count: 'Heroic Tales',
  },
];

export const PUNJABI_LESSONS: PunjabiLesson[] = [
  // 1. GURMUKHI ALPHABET
  {
    id: 'gur-ura',
    title: 'Letter ੳ (Ura) - Camel (ਊਠ)',
    punjabiTitle: 'ੳ - ਊਠ (Uth / Camel)',
    category: 'gurmukhi-alphabet',
    punjabiText: 'ੳ ਊਠ ਰੇਗਿਸਤਾਨ ਦਾ ਜਹਾਜ਼ ਹੈ।',
    transliteration: 'Ura: Uth registan da jahaz hai.',
    englishMeaning: 'ੳ is the very first letter of Gurmukhi. Uth means Camel, known as the ship of the desert.',
    moralTip: 'Camels are patient and resilient in heat. Always be patient and strong in all situations.',
    icon: '🐫',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'gur-aira',
    title: 'Letter ਅ (Aira) - Pomegranate (ਅਨਾਰ)',
    punjabiTitle: 'ਅ - ਅਨਾਰ (Anaar / Pomegranate)',
    category: 'gurmukhi-alphabet',
    punjabiText: 'ਅ ਅਨਾਰ ਮਿੱਠਾ ਅਤੇ ਸਿਹਤਮੰਦ ਫਲ ਹੈ।',
    transliteration: 'Aira: Anaar mitha ate sehatmand phal hai.',
    englishMeaning: 'ਅ is the second letter. Anaar means sweet ruby pomegranate, packed with vitamins.',
    moralTip: 'Share your sweet fruits and snacks with friends just like an anaar has many pearls together.',
    icon: '🍎',
    color: 'from-rose-500 to-red-600',
  },
  {
    id: 'gur-iri',
    title: 'Letter ੲ (Iri) - Brick & Wisdom (ਇੱਟ)',
    punjabiTitle: 'ੲ - ਇੱਟ (Itt / Brick)',
    category: 'gurmukhi-alphabet',
    punjabiText: 'ੲ ਇੱਟਾਂ ਨਾਲ ਮਜ਼ਬੂਤ ਘਰ ਅਤੇ ਸਕੂਲ ਬਣਦੇ ਹਨ।',
    transliteration: 'Iri: Ittan naal mazboot ghar ate school bande han.',
    englishMeaning: 'ੲ represents Iri. Itt means brick, the foundation of homes and libraries.',
    moralTip: 'Build a solid character brick by brick through good habits, honesty, and daily study.',
    icon: '🧱',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'gur-sasa',
    title: 'Letter ਸ (Sasa) - Apple & Sun (ਸੇਬ / ਸੂਰਜ)',
    punjabiTitle: 'ਸ - ਸੇਬ ਅਤੇ ਸੂਰਜ (Seb & Sooraj)',
    category: 'gurmukhi-alphabet',
    punjabiText: 'ਸ ਸੂਰਜ ਸਾਰੀ ਦੁਨੀਆ ਨੂੰ ਰੌਸ਼ਨੀ ਦਿੰਦਾ ਹੈ।',
    transliteration: 'Sasa: Sooraj saari duniya nu raushni dinda hai.',
    englishMeaning: 'ਸ stands for Sasa. Sooraj is the Sun that gives bright warmth and life to everyone equally.',
    moralTip: 'Like the warm sun, shine your smile and kindness unconditionally on everyone you meet.',
    icon: '☀️',
    color: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'gur-haha',
    title: 'Letter ਹ (Haha) - Elephant (ਹਾਥੀ)',
    punjabiTitle: 'ਹ - ਹਾਥੀ (Haathi / Elephant)',
    category: 'gurmukhi-alphabet',
    punjabiText: 'ਹ ਹਾਥੀ ਬਹੁਤ ਸ਼ਕਤੀਸ਼ਾਲੀ ਅਤੇ ਸ਼ਾਂਤ ਜਾਨਵਰ ਹੈ।',
    transliteration: 'Haha: Haathi bohat shaktishaali ate shaant jaanwar hai.',
    englishMeaning: 'ਹ is Haha. Haathi means Elephant, immense in strength yet gentle and noble.',
    moralTip: 'Real strength is gentle. Never bully anyone; use your physical and mental strength to help.',
    icon: '🐘',
    color: 'from-teal-500 to-emerald-600',
  },

  // 2. PUNJABI WORDS & COUNTING
  {
    id: 'words-counting-1-5',
    title: 'Punjabi Numbers ੧ to ੫ (ਇੱਕ ਤੋਂ ਪੰਜ)',
    punjabiTitle: '੧ (ਇੱਕ), ੨ (ਦੋ), ੩ (ਤਿੰਨ), ੪ (ਚਾਰ), ੫ (ਪੰਜ)',
    category: 'punjabi-words',
    punjabiText: '੧ ਇੱਕ, ੨ ਦੋ, ੩ ਤਿੰਨ, ੪ ਚਾਰ, ੫ ਪੰਜ',
    transliteration: 'Ikk (1), Do (2), Tinn (3), Chaar (4), Panj (5)',
    englishMeaning: 'Learn the Punjabi numerals and counting up to five: 1=Ikk, 2=Do, 3=Tinn, 4=Chaar, 5=Panj.',
    moralTip: 'Practice counting your books, crayons, and toys in Punjabi every day!',
    icon: '🔢',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'words-colors',
    title: 'Vibrant Colors in Punjabi (ਰੰਗਾਂ ਦੇ ਨਾਂ)',
    punjabiTitle: 'ਲਾਲ (Red), ਨੀਲਾ (Blue), ਹਰਾ (Green), ਪੀਲਾ (Yellow)',
    category: 'punjabi-words',
    punjabiText: 'ਲਾਲ ਸੇਬ, ਨੀਲਾ ਅਸਮਾਨ, ਹਰਾ ਘਾਹ, ਪੀਲਾ ਸੂਰਜ',
    transliteration: 'Laal Seb, Neela Asmaan, Hara Ghaah, Peela Sooraj',
    englishMeaning: 'Red = Laal, Blue = Neela, Green = Hara, Yellow = Peela, White = Chitta, Orange = Kesari.',
    moralTip: 'Nature is painted with marvelous colors. Keep our earth green and rivers clean.',
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
  },

  // 3. NOBLE VIRTUES & SIKH VALUES
  {
    id: 'values-three-pillars',
    title: 'The Three Golden Pillars of Life (ਤਿੰਨ ਸੁਨਹਿਰੀ ਅਸੂਲ)',
    punjabiTitle: 'ਨਾਮ ਜਪੋ, ਕਿਰਤ ਕਰੋ, ਵੰਡ ਛਕੋ',
    category: 'sikh-values',
    punjabiText: '੧. ਨਾਮ ਜਪੋ (ਰੱਬ ਨੂੰ ਯਾਦ ਰੱਖੋ)\n੨. ਕਿਰਤ ਕਰੋ (ਇਮਾਨਦਾਰੀ ਨਾਲ ਮਿਹਨਤ ਕਰੋ)\n੩. ਵੰਡ ਛਕੋ (ਸਭ ਨਾਲ ਵੰਡ ਕੇ ਖਾਓ)',
    transliteration: '1. Naam Japo (Remember the Divine)\n2. Kirat Karo (Earn honestly with hard work)\n3. Vand Chhako (Share with the needy)',
    englishMeaning: 'These three pillars teach us to keep our mind peaceful, work with full honesty, and share our food and joy with all humanity.',
    moralTip: 'Whenever you have a snack, always offer it to your classmate or sibling before eating.',
    icon: '🌟',
    color: 'from-amber-600 to-orange-700',
  },
  {
    id: 'values-seva',
    title: 'Selfless Service & Langar (ਸੇਵਾ ਅਤੇ ਲੰਗਰ)',
    punjabiTitle: 'ਨਿਸ਼ਕਾਮ ਸੇਵਾ ਅਤੇ ਪੰਗਤ-ਸੰਗਤ',
    category: 'sikh-values',
    punjabiText: 'ਸੇਵਾ ਕਰਤ ਹੋਇ ਨਿਹਕਾਮੀ ॥ ਤਿਸ ਕਉ ਹੋਤ ਪਰਾਪਤਿ ਸੁਆਮੀ ॥',
    transliteration: 'Seva karat hoe nihkaami, tis kau hot praapat suaami.',
    englishMeaning: 'One who serves selflessly without pride or greed attains true peace. Langar treats king and commoner as equal brothers sitting side by side.',
    moralTip: 'Help clean up the classroom, serve water to your parents, and participate in community cleaning.',
    icon: '🤝',
    color: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'values-chardi-kala',
    title: 'Chardi Kala - Unshakable High Spirits (ਚੜ੍ਹਦੀ ਕਲਾ)',
    punjabiTitle: 'ਚੜ੍ਹਦੀ ਕਲਾ ਅਤੇ ਸਰਬੱਤ ਦਾ ਭਲਾ',
    category: 'sikh-values',
    punjabiText: 'ਨਾਨਕ ਨਾਮ ਚੜ੍ਹਦੀ ਕਲਾ, ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ।',
    transliteration: 'Nanak Naam Chardi Kala, Tere Bhaane Sarbat Da Bhala.',
    englishMeaning: 'Chardi Kala means perpetual optimism, joy, and courage even in tough times, praying for the wellbeing of all creation (Sarbat Da Bhala).',
    moralTip: 'When things feel difficult, take a deep breath, stay positive, smile, and say: "I can do this!"',
    icon: '🦁',
    color: 'from-indigo-600 to-violet-700',
  },

  // 4. INSPIRATIONAL STORIES
  {
    id: 'story-sacha-sauda',
    title: 'Sacha Sauda - The True Bargain (ਸੱਚਾ ਸੌਦਾ)',
    punjabiTitle: 'ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ਸੱਚਾ ਸੌਦਾ',
    category: 'punjabi-stories',
    punjabiText: 'ਜਦੋਂ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੂੰ ਵਪਾਰ ਕਰਨ ਲਈ ੨੦ ਰੁਪਏ ਦਿੱਤੇ ਗਏ, ਤਾਂ ਉਨ੍ਹਾਂ ਨੇ ਭੁੱਖੇ ਸਾਧੂਆਂ ਅਤੇ ਲੋੜਵੰਦਾਂ ਨੂੰ ਪੇਟ ਭਰ ਕੇ ਭੋਜਨ ਛਕਾ ਦਿੱਤਾ ਅਤੇ ਕਿਹਾ: ਭੁੱਖੇ ਨੂੰ ਖਾਣਾ ਖੁਆਉਣਾ ਹੀ ਦੁਨੀਆ ਦਾ ਸਭ ਤੋਂ ਸੱਚਾ ਸੌਦਾ ਹੈ।',
    transliteration: 'When Guru Nanak Dev Ji was given 20 rupees for profitable business, he bought food and fed starving pilgrims, proclaiming: Feeding the hungry is the truest bargain in existence.',
    englishMeaning: 'Kindness to living beings is worth more than worldly profit. Compassion is the greatest wealth.',
    moralTip: 'Use your pocket money or allowance to buy bread or milk for someone hungry or feed stray birds.',
    icon: '🍞',
    color: 'from-amber-600 to-yellow-700',
  },
];
