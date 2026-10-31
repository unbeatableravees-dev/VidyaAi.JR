export interface IslamicExamQuestion {
  question: string;
  questionForGrade3Plus?: string;
  options: string[];
  answer: string;
  explanation: string;
  sourceLessonId: string;
  english?: {
    question: string;
    questionForGrade3Plus?: string;
    options: string[];
    explanation: string;
  };
}

export interface IslamicExam {
  title: string;
  titleUrdu?: string;
  titleHindi?: string;
  titlePunjabi?: string;
  subjectLabel?: string;
  direction?: 'rtl' | 'ltr';
  faith?: 'muslim' | 'hindu' | 'sikh' | 'universal';
  questions: IslamicExamQuestion[];
}

export const ISLAMIC_EXAMS: Record<string, IslamicExam> = {
  'islamic-manners-exam': {
    title: 'Islamic Manners Exam',
    titleUrdu: 'اسلامی آداب کا امتحان',
    subjectLabel: 'Islamic Adab',
    faith: 'muslim',
    questions: [
      {
        question: 'کھانا شروع کرنے سے پہلے کون سا کلمہ کہنا چاہیے؟',
        questionForGrade3Plus: 'علی نے کھانا شروع کرتے وقت اللہ کا نام لینے والا کلمہ بھول گیا۔ اسے اب کیا کہنا چاہیے؟',
        options: ['الحمد للہ', 'بسم اللہ', 'جزاک اللہ', 'سبحان اللہ'],
        answer: 'بسم اللہ',
        explanation: 'کھانا شروع کرتے وقت بسم اللہ کہنا سکھایا گیا ہے۔',
        english: {
          question: 'Which phrase should you say before you begin eating?',
          questionForGrade3Plus: 'Ali forgot to say the phrase that begins with Allah’s name before eating. What should he say now?',
          options: ['Alhamdulillah — All praise is for Allah', 'Bismillah — In the name of Allah', 'JazakAllahu khayran — May Allah reward you with goodness', 'SubhanAllah — Glory be to Allah'],
          explanation: 'The lesson teaches saying Bismillah before eating.',
        },
        sourceLessonId: 'good-talks-everyday-phrases',
      },
      {
        question: 'کھانا کس ہاتھ سے کھانے کی تعلیم دی گئی ہے؟',
        questionForGrade3Plus: 'کھانے کے آداب میں کھانا اٹھانے کے لیے کس ہاتھ کو ترجیح دی گئی ہے؟',
        options: ['بائیں ہاتھ سے', 'دونوں ہاتھوں سے', 'دائیں ہاتھ سے', 'کسی بھی ہاتھ سے'],
        answer: 'دائیں ہاتھ سے',
        explanation: 'کھانے کے آداب میں دائیں ہاتھ سے کھانا شامل ہے۔',
        english: {
          question: 'Which hand are Muslims taught to use when eating?',
          questionForGrade3Plus: 'According to table manners, which hand is preferred for picking up food?',
          options: ['The left hand', 'Both hands', 'The right hand', 'Either hand'],
          explanation: 'Eating with the right hand is part of the manners taught in this lesson.',
        },
        sourceLessonId: 'manners-eating-right-hand',
      },
      {
        question: 'کسی مسلمان سے ملاقات پر کون سا سلام کہنا چاہیے؟',
        questionForGrade3Plus: 'ملاقات کے وقت دوسرے مسلمان کے لیے امن کی دعا دینے والے الفاظ کون سے ہیں؟',
        options: ['صبح بخیر', 'السلام علیکم', 'خدا حافظ', 'شب بخیر'],
        answer: 'السلام علیکم',
        explanation: 'السلام علیکم مسلمانوں کا سلام اور امن کی دعا ہے۔',
        english: {
          question: 'Which greeting should you use when you meet another Muslim?',
          questionForGrade3Plus: 'Which words greet another Muslim and offer a prayer of peace?',
          options: ['Good morning', 'As-salamu alaykum — Peace be upon you', 'Goodbye', 'Good night'],
          explanation: 'As-salamu alaykum is a Muslim greeting and a prayer of peace.',
        },
        sourceLessonId: 'manners-greeting-salam',
      },
      {
        question: 'چھینک آنے کے بعد مسلمان کیا کہتا ہے؟',
        questionForGrade3Plus: 'چھینک آنے کے بعد شکر ادا کرنے کے لیے کون سا کلمہ کہا جاتا ہے؟',
        options: ['ان شاء اللہ', 'ماشاء اللہ', 'الحمد للہ', 'استغفر اللہ'],
        answer: 'الحمد للہ',
        explanation: 'چھینک کے آداب میں الحمد للہ کہنا شامل ہے۔',
        english: {
          question: 'What does a Muslim say after sneezing?',
          questionForGrade3Plus: 'Which phrase is said to give thanks after sneezing?',
          options: ['InshaAllah — If Allah wills', 'MashaAllah — What Allah has willed', 'Alhamdulillah — All praise is for Allah', 'Astaghfirullah — I seek Allah’s forgiveness'],
          explanation: 'Saying Alhamdulillah expresses gratitude to Allah after a sneeze.',
        },
        sourceLessonId: 'good-talks-everyday-phrases',
      },
      {
        question: 'والدین کے ساتھ بات کرتے وقت کیسا لہجہ رکھنا چاہیے؟',
        questionForGrade3Plus: 'قرآن میں والدین کے سامنے کون سا لفظ بولنے سے بھی منع کیا گیا ہے؟',
        options: ['تیز اور غصے والا', 'نرم اور احترام والا', 'سرد اور بے پروا', 'اونچی آواز والا'],
        answer: 'نرم اور احترام والا',
        explanation: 'والدین کے ساتھ بات کرتے وقت نرمی اور ادب کا حکم ہے۔',
        english: {
          question: 'What kind of tone should you use when speaking with your parents?',
          questionForGrade3Plus: 'In the Quran, which disrespectful expression is explicitly forbidden before parents?',
          options: ['Loud and angry', 'Gentle and respectful', 'Cold and careless', 'Shouting and impatient'],
          explanation: 'Kindness, patience, and honoring parents with gentle speech is a central Islamic teaching.',
        },
        sourceLessonId: 'manners-respect-parents',
      },
    ],
  },
  'islamic-urdu-words-exam': {
    title: 'Islamic Urdu Words Exam',
    titleUrdu: 'اسلامی کلمات اور اردو الفاظ',
    subjectLabel: 'Urdu & Kalimaat',
    faith: 'muslim',
    questions: [
      {
        question: 'پہلے کلمے کا نام کیا ہے؟',
        questionForGrade3Plus: 'کلمہ طیبہ کے معانی کیا ہیں؟',
        options: ['کلمہ شہادت', 'کلمہ طیبہ', 'کلمہ تمجید', 'کلمہ توحید'],
        answer: 'کلمہ طیبہ',
        explanation: 'پہلا کلمہ، کلمہ طیبہ کہلاتا ہے: لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَّسُولُ اللهِ۔',
        english: {
          question: 'What is the name of the first Kalima?',
          questionForGrade3Plus: 'What does Kalima Tayyibah declare?',
          options: ['Kalima Shahadah', 'Kalima Tayyibah', 'Kalima Tamjeed', 'Kalima Tawheed'],
          explanation: 'The first Kalima is Kalima Tayyibah: La ilaha illallah Muhammadur Rasulullah.',
        },
        sourceLessonId: 'good-talks-six-kalimas',
      },
    ],
  },

  // ==========================================
  // HINDU CULTURE & VALUES EXAMS
  // ==========================================
  'hindi-values-quiz': {
    title: 'Hindu Culture & Values Quiz',
    titleHindi: 'हिन्दी संस्कृति एवं नैतिक मूल्य',
    subjectLabel: 'Hindu Culture & Values',
    faith: 'hindu',
    direction: 'ltr',
    questions: [
      {
        question: 'Which epic includes the sacred Bhagavad Gita?',
        questionForGrade3Plus: 'A student reads a dialogue between Shri Krishna and Arjuna before battle. Which epic contains this teaching?',
        options: ['The Mahabharata', 'The Panchatantra', 'The Jataka Tales', 'The Iliad'],
        answer: 'The Mahabharata',
        explanation: 'The Bhagavad Gita is an inspiring dialogue in the Bhishma Parva of the Mahabharata.',
        sourceLessonId: 'epics-legends',
      },
      {
        question: 'Which joyful festival is celebrated with oil lamps and fireworks?',
        questionForGrade3Plus: 'A family illuminates their doorstep with earthen diyas to celebrate Shri Rama’s return. Which festival is this?',
        options: ['Diwali (दीपावली)', 'Holi (होली)', 'Onam', 'Baisakhi'],
        answer: 'Diwali (दीपावली)',
        explanation: 'Diwali (Deepavali) is the festival of lights celebrating truth overcoming darkness.',
        sourceLessonId: 'festivals-culture',
      },
      {
        question: 'Which festival is famous for sharing bright organic colors?',
        questionForGrade3Plus: 'Children play with herbal gulal to welcome spring and remember Prahlad’s protection. Which festival is this?',
        options: ['Holi (होली)', 'Diwali', 'Raksha Bandhan', 'Navratri'],
        answer: 'Holi (होली)',
        explanation: 'Holi is widely celebrated as the joyful festival of colors, brotherhood, and forgiveness.',
        sourceLessonId: 'festivals-culture',
      },
      {
        question: 'What does the noble principle of Ahimsa (अहिंसा) teach?',
        questionForGrade3Plus: 'When solving a playground dispute, which choice best reflects Ahimsa?',
        options: ['Kindness, non-harm, and compassion for all living beings', 'Winning every argument by force', 'Ignoring other children in need', 'Taking all toys for oneself'],
        answer: 'Kindness, non-harm, and compassion for all living beings',
        explanation: 'Ahimsa Paramo Dharmah teaches harmlessness and active compassion toward all living creatures.',
        sourceLessonId: 'moral-values',
      },
      {
        question: 'Which epic narrates the righteous journey of Shri Rama and Sita?',
        questionForGrade3Plus: 'A child reads the story of Rama, Sita, Lakshmana, and Hanuman. Which epic is this?',
        options: ['The Ramayana (रामायण)', 'The Vedas', 'The Panchatantra', 'The Arthashastra'],
        answer: 'The Ramayana (रामायण)',
        explanation: 'The Ramayana, composed by Sage Valmiki, tells the inspiring story of Maryada Purushottam Rama.',
        sourceLessonId: 'epics-legends',
      },
      {
        question: 'What does "Vasudhaiva Kutumbakam" (वसुधैव कुटुम्बकम्) mean?',
        questionForGrade3Plus: 'Which ancient Sanskrit phrase expresses that the entire universe is one interconnected family?',
        options: ['The whole world is one family', 'Only my village matters', 'Study only for marks', 'Travel alone in silence'],
        answer: 'The whole world is one family',
        explanation: 'From the Maha Upanishad, "Vasudhaiva Kutumbakam" teaches universal brotherhood and love.',
        sourceLessonId: 'moral-values',
      },
      {
        question: 'What is the National Flower of India that rises pure above muddy waters?',
        questionForGrade3Plus: 'Which flower symbolizes staying clean, noble, and pure regardless of external circumstances?',
        options: ['Lotus (कमल)', 'Rose (गुलाब)', 'Marigold (गेंदा)', 'Sunflower (सूरਜਮੁਖੀ)'],
        answer: 'Lotus (कमल)',
        explanation: 'The lotus (Kamal) represents spiritual purity and detached beauty in Indian thought.',
        sourceLessonId: 'hindi-varnamala',
      },
      {
        question: 'Which sacred morning mantra prays for the awakening of our intellect?',
        questionForGrade3Plus: 'Which Rigvedic mantra begins with "Om Bhur Bhuva Svah"?',
        options: ['Gayatri Mantra (गायत्री मंत्र)', 'Shanti Mantra', 'Bhojan Mantra', 'Maha Mrityunjaya'],
        answer: 'Gayatri Mantra (गायत्री मंत्र)',
        explanation: 'The Gayatri Mantra is a universal prayer for divine wisdom and radiant intellect.',
        sourceLessonId: 'daily-shlokas',
      },
      {
        question: 'Which fable author composed the animal wisdom stories of the Panchatantra?',
        questionForGrade3Plus: 'Who taught three young princes life wisdom through animal fables such as the Thirsty Crow and Unity is Strength?',
        options: ['Pandit Vishnu Sharma', 'Sage Valmiki', 'Sage Ved Vyasa', 'Kalidasa'],
        answer: 'Pandit Vishnu Sharma',
        explanation: 'Pandit Vishnu Sharma composed the Panchatantra tales to teach political and ethical wisdom.',
        sourceLessonId: 'panchatantra',
      },
      {
        question: 'What does "Vidya Dadati Vinayam" (विद्या ददाति विनयं) emphasize?',
        questionForGrade3Plus: 'What quality does true knowledge bestow upon an educated student?',
        options: ['Humility, modesty, and gentleness', 'Pride and boasting', 'Shouting loudly', 'Impatience with elders'],
        answer: 'Humility, modesty, and gentleness',
        explanation: 'True knowledge makes a person humble and ready to serve society with reverence.',
        sourceLessonId: 'moral-values',
      },
    ],
  },
  'hindi-varnamala-exam': {
    title: 'Hindi Varnamala & Words Exam',
    titleHindi: 'हिन्दी वर्णमाला एवं शब्द परीक्षा',
    subjectLabel: 'Hindi Varnamala',
    faith: 'hindu',
    direction: 'ltr',
    questions: [
      {
        question: 'हिन्दी वर्णमाला का पहला स्वर कौन सा है? (Which is the first vowel of Hindi?)',
        questionForGrade3Plus: 'अ से अनार में "अ" किस प्रकार का वर्ण है?',
        options: ['अ (A)', 'आ (Aa)', 'इ (I)', 'क (Ka)'],
        answer: 'अ (A)',
        explanation: '"अ" हिन्दी वर्णमाला का प्रथम स्वर (Vowel) है।',
        sourceLessonId: 'h-varnamala-a',
      },
      {
        question: '"आ" से कौन सा रसीला फल बनता है जिसे फलों का राजा कहते हैं?',
        questionForGrade3Plus: 'King of Fruits in Hindi is known as:',
        options: ['आम (Aam / Mango)', 'अनार (Anaar)', 'अंगूर (Angoor)', 'अमरूद (Amrood)'],
        answer: 'आम (Aam / Mango)',
        explanation: 'आ से आम बनता है, जिसे फलों का राजा कहा जाता है।',
        sourceLessonId: 'h-varnamala-aa',
      },
      {
        question: 'हिन्दी गिनती में संख्या "५" को क्या कहते हैं? (What is 5 in Hindi?)',
        questionForGrade3Plus: 'एक हाथ की उंगलियों की संख्या हिन्दी में कितनी होती है?',
        options: ['पाँच (Paanch)', 'तीन (Teen)', 'चार (Chaar)', 'सात (Saat)'],
        answer: 'पाँच (Paanch)',
        explanation: 'संख्या ५ को हिन्दी में पाँच (Paanch) कहते हैं।',
        sourceLessonId: 'h-words-counting-1-5',
      },
      {
        question: 'हिन्दी में "माता" और "पिता" के रिश्ते को आदरपूर्वक क्या कहते हैं?',
        questionForGrade3Plus: 'In Hindi, respectful words for Mother and Father are:',
        options: ['माता जी और पिता जी', 'मित्र और सखा', 'भाई और बहन', 'पड़ोसी'],
        answer: 'माता जी और पिता जी',
        explanation: 'हिन्दी में माता-पिता को आदर के साथ माता जी और पिता जी कहा जाता है।',
        sourceLessonId: 'h-words-family',
      },
      {
        question: 'कमल (Lotus) का पहला अक्षर कौन सा व्यंजन है?',
        questionForGrade3Plus: 'Which consonant begins the word "Kamal"?',
        options: ['क (Ka)', 'ख (Kha)', 'ग (Ga)', 'घ (Gha)'],
        answer: 'क (Ka)',
        explanation: 'कमल शब्द का प्रथम अक्षर "क" व्यंजन है।',
        sourceLessonId: 'h-varnamala-k',
      },
    ],
  },

  // ==========================================
  // SIKH HERITAGE & GURMUKHI EXAMS
  // ==========================================
  'sikh-values-quiz': {
    title: 'Sikhism & Seva Quiz',
    titlePunjabi: 'ਸਿੱਖੀ ਅਤੇ ਸੇਵਾ ਪ੍ਰੀਖਿਆ',
    subjectLabel: 'Sikhism & Seva',
    faith: 'sikh',
    direction: 'ltr',
    questions: [
      {
        question: 'What does "Seva" (ਸੇਵਾ) mean in Sikh life?',
        questionForGrade3Plus: 'A student helps sweep the floor and serve water at a gurdwara without seeking praise. What is this act called?',
        options: ['Selfless service without expecting reward', 'A commercial job', 'A competitive sports race', 'A quiet study hour'],
        answer: 'Selfless service without expecting reward',
        explanation: 'Seva means voluntary selfless service to humanity done with humility and love.',
        sourceLessonId: 'sikh-values',
      },
      {
        question: 'What is Langar (ਲੰਗਰ)?',
        questionForGrade3Plus: 'At a Gurdwara, people of all religions, backgrounds, and wealth sit in one row (Pangat) to share a free meal. What is this called?',
        options: ['A free community meal shared with everyone as equals', 'A private celebration', 'A silent test', 'A royal banquet'],
        answer: 'A free community meal shared with everyone as equals',
        explanation: 'Langar is the community kitchen started by Guru Nanak Dev Ji where everyone sits together as equals.',
        sourceLessonId: 'sikh-values',
      },
      {
        question: 'Who is the first Sikh Guru and founder of Sikhism?',
        questionForGrade3Plus: 'Who founded Sikhism and traveled on four Udasis to teach "Naam Japna, Kirat Karna, Vand Chhakna"?',
        options: ['Guru Nanak Dev Ji', 'Guru Gobind Singh Ji', 'Guru Arjan Dev Ji', 'Guru Tegh Bahadur Ji'],
        answer: 'Guru Nanak Dev Ji',
        explanation: 'Guru Nanak Dev Ji (born 1469 at Nankana Sahib) is the first Sikh Guru.',
        sourceLessonId: 'sikh-gurus',
      },
      {
        question: 'Which sacred script is used to write Punjabi and Gurbani?',
        questionForGrade3Plus: 'Which script was standardized by Guru Angad Dev Ji to record sacred hymns?',
        options: ['Gurmukhi (ਗੁਰਮੁਖੀ)', 'Devanagari', 'Perso-Arabic', 'Roman script'],
        answer: 'Gurmukhi (ਗੁਰਮੁਖੀ)',
        explanation: 'Gurmukhi is the sacred script of 35 letters created for writing Punjabi and Gurbani.',
        sourceLessonId: 'gurmukhi-alphabet',
      },
      {
        question: 'What is the eternal living scripture and Guru of the Sikhs?',
        questionForGrade3Plus: 'Which sacred scripture containing 5,894 hymns was conferred Guru-ship by Guru Gobind Singh Ji in 1708?',
        options: ['Sri Guru Granth Sahib Ji', 'Bhagavad Gita', 'The Quran', 'Dhammapada'],
        answer: 'Sri Guru Granth Sahib Ji',
        explanation: 'Sri Guru Granth Sahib Ji is the eternal living Guru of the Sikh Panth.',
        sourceLessonId: 'sikh-gurus',
      },
      {
        question: 'Which pillar of Sikhism means earning an honest, hard-working living?',
        questionForGrade3Plus: 'Someone works diligently with integrity rather than taking dishonest shortcuts. Which pillar is this?',
        options: ['Kirat Karni (ਕਿਰਤ ਕਰਨੀ)', 'Vand Chhakna', 'Naam Japna', 'Hukam'],
        answer: 'Kirat Karni (ਕਿਰਤ ਕਰਨੀ)',
        explanation: 'Kirat Karni means earning one’s bread through honest and dedicated labor.',
        sourceLessonId: 'sikh-values',
      },
      {
        question: 'What does "Vand Chhakna" (ਵੰਡ ਛਕਣਾ) encourage?',
        questionForGrade3Plus: 'Sharing food, blessings, and knowledge with the needy reflects which pillar?',
        options: ['Sharing what you have with others', 'Hoarding toys and snacks', 'Eating alone in a room', 'Ignoring hungry people'],
        answer: 'Sharing what you have with others',
        explanation: 'Vand Chhakna means sharing food and earnings with the community and those in need.',
        sourceLessonId: 'sikh-values',
      },
      {
        question: 'Which harvest celebration marks the creation of the Khalsa Panth in 1699?',
        questionForGrade3Plus: 'In 1699 at Anandpur Sahib, Guru Gobind Singh Ji initiated the Panj Pyare. Which festival commemorates this day?',
        options: ['Vaisakhi (ਵਿਸਾਖੀ)', 'Diwali', 'Lohri', 'Holi'],
        answer: 'Vaisakhi (ਵਿਸਾਖੀ)',
        explanation: 'Vaisakhi celebrates both the spring harvest and the founding of the Khalsa Panth in 1699.',
        sourceLessonId: 'festivals-virasat',
      },
      {
        question: 'Who gave water to wounded soldiers on both sides of battle with universal compassion?',
        questionForGrade3Plus: 'Which historic Sikh hero said to Guru Gobind Singh Ji: "I see only your light in every face"?',
        options: ['Bhai Kanhaiya Ji (ਭਾਈ ਘਨੱਈਆ ਜੀ)', 'Bhai Lalo', 'Malik Bhago', 'Baba Deep Singh'],
        answer: 'Bhai Kanhaiya Ji (ਭਾਈ ਘਨੱਈਆ ਜੀ)',
        explanation: 'Bhai Kanhaiya Ji served water and medical care to all wounded soldiers without discrimination.',
        sourceLessonId: 'inspirational-sakhis',
      },
      {
        question: 'What is the sacred greeting commonly shared among Sikhs?',
        questionForGrade3Plus: 'Which greeting translates to "Truth is the Timeless Lord"?',
        options: ['Sat Sri Akal (ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ)', 'Namaste', 'Salaam', 'Aloha'],
        answer: 'Sat Sri Akal (ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ)',
        explanation: 'Sat Sri Akal means "Truth is the Eternal, Timeless Lord" and is the universal Sikh greeting.',
        sourceLessonId: 'punjabi-words',
      },
    ],
  },
  'punjabi-gurmukhi-exam': {
    title: 'Gurmukhi Alphabet & Words Exam',
    titlePunjabi: 'ਗੁਰਮੁਖੀ ਅੱਖਰੀ ਤੇ ਸ਼ਬਦ ਪ੍ਰੀਖਿਆ',
    subjectLabel: 'Gurmukhi 35 Akhari',
    faith: 'sikh',
    direction: 'ltr',
    questions: [
      {
        question: 'ਗੁਰਮੁਖੀ ਵਰਣਮਾਲਾ ਦਾ ਪਹਿਲਾ ਅੱਖਰ ਕਿਹੜਾ ਹੈ? (First letter of Gurmukhi?)',
        questionForGrade3Plus: 'Which is the very first letter of the Gurmukhi 35 Akhari?',
        options: ['ੳ (Ura)', 'ਅ (Aira)', 'ੲ (Iri)', 'ਸ (Sasa)'],
        answer: 'ੳ (Ura)',
        explanation: 'ੳ (Ura) ਗੁਰਮੁਖੀ ਦਾ ਪਹਿਲਾ ਅੱਖਰ ਹੈ, ਜਿਸ ਤੋਂ ੴ (Ik Onkar) ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ।',
        sourceLessonId: 'gur-ura',
      },
      {
        question: 'ਅੱਖਰ "ਸ" ਤੋਂ ਸੇਵਾ ਅਤੇ ਹੋਰ ਕਿਹੜਾ ਚਾਨਣ ਦੇਣ ਵਾਲਾ ਸ਼ਬਦ ਬਣਦਾ ਹੈ?',
        questionForGrade3Plus: 'Letter "ਸ" stands for Seva and which celestial object?',
        options: ['ਸੂਰਜ (Sooraj / Sun)', 'ਚੰਨ (Chann)', 'ਤਾਰੇ (Taare)', 'ਬੱਦਲ (Baadal)'],
        answer: 'ਸੂਰਜ (Sooraj / Sun)',
        explanation: 'ਸ ਤੋਂ ਸੂਰਜ ਅਤੇ ਸੇਵਾ ਸ਼ਬਦ ਬਣਦੇ ਹਨ।',
        sourceLessonId: 'gur-sasa',
      },
      {
        question: 'ਗੁਰਮੁਖੀ ਗਿਣਤੀ ਵਿੱਚ ਸੰਖਿਆ "੩" ਨੂੰ ਕੀ ਕਹਿੰਦੇ ਹਨ? (What is 3 in Punjabi?)',
        questionForGrade3Plus: 'In Punjabi, number 3 is called:',
        options: ['ਤਿੰਨ (Teen)', 'ਇਕ (Ek)', 'ਦੋ (Do)', 'ਚਾਰ (Chaar)'],
        answer: 'ਤਿੰਨ (Teen)',
        explanation: 'ਸੰਖਿਆ ੩ ਨੂੰ ਪੰਜਾਬੀ ਵਿੱਚ ਤਿੰਨ (Teen) ਕਿਹਾ ਜਾਂਦਾ ਹੈ।',
        sourceLessonId: 'p-words-counting-1-5',
      },
      {
        question: 'ਪੰਜ ਕਕਾਰਾਂ ਵਿੱਚੋਂ ਹੱਥ ਵਿੱਚ ਪਹਿਨਣ ਵਾਲਾ ਲੋਹੇ ਦਾ ਕੜਾ ਕਿਸ ਚੀਜ਼ ਦੀ ਯਾਦ ਦਿਵਾਉਂਦਾ ਹੈ?',
        questionForGrade3Plus: 'The iron Kara on the wrist reminds Sikhs to:',
        options: ['ਸਦਾ ਨੇਕ ਅਤੇ ਸੱਚੇ ਕਰਮ ਕਰਨ ਦੀ (Do only honest, righteous deeds)', 'ਕੁਸ਼ਤੀ ਜਿੱਤਣ ਦੀ', 'ਸੌਣ ਦੀ', 'ਦੌੜਨ ਦੀ'],
        answer: 'ਸਦਾ ਨੇਕ ਅਤੇ ਸੱਚੇ ਕਰਮ ਕਰਨ ਦੀ (Do only honest, righteous deeds)',
        explanation: 'ਕੜਾ ਹੱਥਾਂ ਨਾਲ ਸਦਾ ਸੱਚੇ ਅਤੇ ਨੇਕ ਕੰਮ ਕਰਨ ਦਾ ਚੇਤਾ ਕਰਵਾਉਂਦਾ ਹੈ।',
        sourceLessonId: 'p-values-five-kakaars',
      },
      {
        question: 'ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਪਿਤਾ ਜੀ ਨੇ ਕਿੰਨੇ ਰੁਪਏ ਦੇ ਕੇ ਸੱਚਾ ਸੌਦਾ ਕਰਨ ਭੇਜਿਆ ਸੀ?',
        questionForGrade3Plus: 'How many rupees did young Nanak spend to feed hungry hermits in Sacha Sauda?',
        options: ['੨੦ ਰੁਪਏ (20 Rupees)', '੧੦ ਰੁਪਏ', '੫੦ ਰੁਪਏ', '੧੦੦ ਰੁਪਏ'],
        answer: '੨੦ ਰੁਪਏ (20 Rupees)',
        explanation: 'ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ੨੦ ਰੁਪਏ ਨਾਲ ਭੁੱਖੇ ਸਾਧੂਆਂ ਨੂੰ ਭੋਜਨ ਛਕਾ ਕੇ ਸੱਚਾ ਸੌਦਾ ਕੀਤਾ ਸੀ।',
        sourceLessonId: 'p-sakhi-sacha-sauda',
      },
    ],
  },

  // ==========================================
  // GENERAL & SCIENCE DISCOVERY EXAMS
  // ==========================================
  'general-discovery-quiz': {
    title: 'World Discovery Quiz',
    subjectLabel: 'World Discovery',
    faith: 'universal',
    direction: 'ltr',
    questions: [
      { question: 'Which is the largest ocean on Earth?', questionForGrade3Plus: 'A researcher compares ocean areas on a world map. Which ocean covers the greatest area?', options: ['Pacific Ocean', 'Arctic Ocean', 'Indian Ocean', 'Southern Ocean'], answer: 'Pacific Ocean', explanation: 'The Pacific Ocean is the largest ocean on Earth.', sourceLessonId: 'world-discovery' },
      { question: 'How many continents are commonly taught in the seven-continent model?', questionForGrade3Plus: 'A class project uses the model that names Asia, Africa, the Americas, Antarctica, Europe, and Australia separately. How many continents are in this model?', options: ['7', '5', '6', '8'], answer: '7', explanation: 'The seven-continent model includes Asia, Africa, North America, South America, Antarctica, Europe, and Australia.', sourceLessonId: 'world-discovery' },
      { question: 'Which planet is known as the Red Planet?', questionForGrade3Plus: 'Iron-rich dust makes one neighboring planet look reddish. Which planet is it?', options: ['Mars', 'Venus', 'Neptune', 'Mercury'], answer: 'Mars', explanation: 'Iron-rich dust gives Mars its reddish appearance.', sourceLessonId: 'world-discovery' },
      { question: 'What do we use to find directions on a map?', questionForGrade3Plus: 'A map reader needs to identify north, south, east, and west. Which map feature helps?', options: ['A compass rose', 'A thermometer', 'A ruler only', 'A calendar'], answer: 'A compass rose', explanation: 'A compass rose shows directions such as north, south, east, and west.', sourceLessonId: 'world-discovery' },
      { question: 'Which animal is the largest mammal?', questionForGrade3Plus: 'A wildlife report asks which living mammal has the greatest body size. Which animal is the answer?', options: ['Blue whale', 'African elephant', 'Giraffe', 'Hippopotamus'], answer: 'Blue whale', explanation: 'The blue whale is the largest mammal known to live on Earth.', sourceLessonId: 'world-discovery' },
    ],
  },
  'science-explorer-quiz': {
    title: 'Science Explorer Challenge',
    subjectLabel: 'Science',
    faith: 'universal',
    direction: 'ltr',
    questions: [
      { question: 'Which part of a plant usually absorbs water from the soil?', questionForGrade3Plus: 'A plant is moved to dry soil. Which part needs to take up water and minerals for it to stay healthy?', options: ['Roots', 'Flower petals', 'Fruit', 'Seeds only'], answer: 'Roots', explanation: 'Roots take up water and minerals from the soil.', sourceLessonId: 'science-plants' },
      { question: 'What force pulls objects toward Earth?', questionForGrade3Plus: 'When a ball is released, it falls toward the ground. Which force explains this motion?', options: ['Gravity', 'Sound', 'Light', 'Magnetism only'], answer: 'Gravity', explanation: 'Gravity is the force that attracts objects toward one another; Earth’s gravity pulls things toward the ground.', sourceLessonId: 'science-forces' },
      { question: 'Which state of matter keeps its own shape?', questionForGrade3Plus: 'A toy keeps its shape when moved between containers. Which state of matter is it most likely in?', options: ['Solid', 'Liquid', 'Gas', 'Steam only'], answer: 'Solid', explanation: 'A solid keeps its shape unless a force changes it.', sourceLessonId: 'science-matter' },
      { question: 'What gas do humans need to breathe?', questionForGrade3Plus: 'The body uses one gas from the air to help release energy from food. Which gas is it?', options: ['Oxygen', 'Helium', 'Carbon dioxide', 'Hydrogen'], answer: 'Oxygen', explanation: 'Humans breathe in oxygen, which the body uses to release energy from food.', sourceLessonId: 'science-body' },
      { question: 'What is the closest star to Earth?', questionForGrade3Plus: 'A student compares stars by distance from Earth. Which star is in our solar system and nearest to us?', options: ['The Sun', 'Sirius', 'Polaris', 'Vega'], answer: 'The Sun', explanation: 'The Sun is the star at the center of our solar system and the closest star to Earth.', sourceLessonId: 'science-space' },
    ],
  },
};
