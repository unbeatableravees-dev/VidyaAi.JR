// =============================================================================
// HINDI & CULTURAL WISDOM LEARNING DATA (हिन्दी ज्ञान एवं नैतिक शिक्षा)
// Tailored for Hindu students: English + Hindi (हिन्दी)
// =============================================================================

export interface HindiLesson {
  id: string;
  title: string;
  hindiTitle: string;
  category: 'hindi-varnamala' | 'hindi-words' | 'moral-values' | 'panchatantra';
  hindiText: string;
  transliteration: string;
  englishMeaning: string;
  moralTip: string;
  icon: string;
  color: string;
}

export const HINDI_TRACKS = [
  {
    id: 'hindi-varnamala',
    title: 'Hindi Varnamala (वर्णमाला)',
    hindiTitle: 'स्वर एवं व्यंजन वर्णमाला',
    description: 'Learn Hindi vowels and consonants from अ to ज्ञ with vibrant examples and clear phonetics.',
    icon: '🕉️',
    color: 'from-orange-500 via-amber-600 to-red-600',
    count: 'Varnamala',
  },
  {
    id: 'hindi-words',
    title: 'Daily Hindi Words (दैनिक शब्द)',
    hindiTitle: 'फल, रंग, पशु और गिनती',
    description: 'Essential Hindi vocabulary for fruits, colors, animals, relations, and counting from १ to १०.',
    icon: '🥭',
    color: 'from-emerald-500 via-teal-600 to-green-700',
    count: '20+ Words',
  },
  {
    id: 'moral-values',
    title: 'Moral Values & Sanskar (नैतिक मूल्य)',
    hindiTitle: 'सत्य, अहिंसा और गुरु-आदर',
    description: 'Noble principles: Vidya Dadati Vinayam (Education brings humility), Matru Devo Bhava, and Truthfulness.',
    icon: '🪔',
    color: 'from-blue-600 via-indigo-700 to-cyan-700',
    count: 'Sanskar',
  },
  {
    id: 'panchatantra',
    title: 'Panchatantra Fables (पंचतंत्र कथाएं)',
    hindiTitle: 'पंचतंत्र की शिक्षाप्रद कहानियां',
    description: 'Timeless animal wisdom stories: The Clever Crow, Unity is Strength, and The Honest Woodcutter.',
    icon: '📖',
    color: 'from-purple-600 via-violet-700 to-rose-700',
    count: 'Fables',
  },
];

export const HINDI_LESSONS: HindiLesson[] = [
  {
    id: 'h-varnamala-a',
    title: 'Letter अ (A) - Pomegranate (अनार)',
    hindiTitle: 'अ - अनार (Anaar / Pomegranate)',
    category: 'hindi-varnamala',
    hindiText: 'अ से अनार, लाल-लाल दानेदार। यह स्वास्थ्य के लिए उत्तम फल है।',
    transliteration: 'A se Anaar, laal-laal daanedaar.',
    englishMeaning: 'अ is the first vowel of Hindi. Anaar represents the ruby pomegranate fruit filled with nutrition.',
    moralTip: 'Eat fresh fruits daily to keep your mind active and body healthy.',
    icon: '🍎',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'h-varnamala-aa',
    title: 'Letter आ (Aa) - Mango (आम)',
    hindiTitle: 'आ - आम (Aam / King of Fruits)',
    category: 'hindi-varnamala',
    hindiText: 'आ से आम, फलों का राजा! मीठा, रसीला और सबका प्यारा।',
    transliteration: 'Aa se Aam, phalon ka raja!',
    englishMeaning: 'आ stands for Aam, the delicious Mango, celebrated as the King of Fruits.',
    moralTip: 'Speak sweet words to everyone just like the sweet flavor of ripe mangoes.',
    icon: '🥭',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'h-words-counting',
    title: 'Hindi Numbers १ to ५ (गिनती)',
    hindiTitle: '१ (एक), २ (दो), ३ (तीन), ४ (चार), ५ (पाँच)',
    category: 'hindi-words',
    hindiText: '१ एक, २ दो, ३ तीन, ४ चार, ५ पाँच।',
    transliteration: 'Ek (1), Do (2), Teen (3), Chaar (4), Paanch (5)',
    englishMeaning: 'Count from 1 to 5 in Hindi: 1=Ek, 2=Do, 3=Teen, 4=Chaar, 5=Paanch.',
    moralTip: 'Count your blessings every morning before starting homework.',
    icon: '🔢',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'h-values-vinayam',
    title: 'Humility in Knowledge (विद्या ददाति विनयं)',
    hindiTitle: 'विद्या ददाति विनयं (ज्ञान से विनम्रता आती है)',
    category: 'moral-values',
    hindiText: 'विद्या ददाति विनयं, विनयाद्याति पात्रताम्।\nज्ञान प्राप्त करने से मनुष्य में विनम्रता और सज्जनता का वास होता है।',
    transliteration: 'Vidya dadati vinayam, vinayad yaati patratam.',
    englishMeaning: 'True knowledge makes a person humble and respectful, never proud or arrogant.',
    moralTip: 'Bow and say Namaste to your teachers and grandparents with fold hands and a warm smile.',
    icon: '🪔',
    color: 'from-orange-600 to-amber-700',
  },
  {
    id: 'h-story-unity',
    title: 'Panchatantra: Unity is Strength (संगठन में शक्ति)',
    hindiTitle: 'कबूतरों का जाल और एकता की शक्ति',
    category: 'panchatantra',
    hindiText: 'जब शिकारी ने दाना डालकर कबूतरों को जाल में फँसा लिया, तो सभी कबूतरों ने मिलकर एक साथ ज़ोर लगाया और पूरे जाल को लेकर आकाश में उड़ गए।',
    transliteration: 'When trapped in the hunter net, all pigeons flapped wings together in unison and flew away with the net to freedom.',
    englishMeaning: 'When team members work together unitedly, even the toughest challenges can be overcome with ease.',
    moralTip: 'Cooperate with your classmates and family members; unity wins every race.',
    icon: '🕊️',
    color: 'from-emerald-600 to-teal-700',
  },
];
