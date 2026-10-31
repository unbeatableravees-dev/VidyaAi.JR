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
  subjectLabel?: string;
  direction?: 'rtl' | 'ltr';
  questions: IslamicExamQuestion[];
}

export const ISLAMIC_EXAMS: Record<string, IslamicExam> = {
  'islamic-manners-exam': {
    title: 'Islamic Manners Exam',
    titleUrdu: 'اسلامی آداب کا امتحان',
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
          explanation: 'Sneezing manners include saying Alhamdulillah.',
        },
        sourceLessonId: 'manners-sneezing-yawning',
      },
      {
        question: 'اسلامی تعلیمات میں غصہ آنے پر بہتر عمل کیا ہے؟',
        questionForGrade3Plus: 'غصے کے وقت اپنے رویے کو بہتر رکھنے کے لیے کون سا عمل اختیار کرنا چاہیے؟',
        options: ['دوسروں پر غصہ نکالنا', 'غصے پر قابو پانا', 'بات چیت بند کرنا', 'چیزیں پھینکنا'],
        answer: 'غصے پر قابو پانا',
        explanation: 'غصے کو قابو میں رکھنا ایک اچھی صفت ہے۔',
        english: {
          question: 'What is a better thing to do when you feel angry, according to Islamic teachings?',
          questionForGrade3Plus: 'Which action helps you behave well when you feel angry?',
          options: ['Take your anger out on others', 'Control your anger', 'Stop talking to everyone', 'Throw things'],
          explanation: 'Controlling anger is a good quality.',
        },
        sourceLessonId: 'hadith-controlling-anger',
      },
      {
        question: 'والدین اور اساتذہ کے ساتھ کیسا برتاؤ کرنا چاہیے؟',
        questionForGrade3Plus: 'اگر آپ کسی استاد کی بات سے متفق نہ ہوں، تب بھی کون سا رویہ درست ہے؟',
        options: ['احترام اور نرمی سے', 'صرف ضرورت کے وقت', 'بے صبری سے', 'ان کی بات نظر انداز کرکے'],
        answer: 'احترام اور نرمی سے',
        explanation: 'والدین اور اساتذہ کے احترام کی تعلیم دی گئی ہے۔',
        english: {
          question: 'How should you treat parents and teachers?',
          questionForGrade3Plus: 'Even if you disagree with a teacher, which way of behaving is right?',
          options: ['With respect and gentleness', 'Only when you need something', 'Impatiently', 'By ignoring them'],
          explanation: 'The lesson teaches respect for parents and teachers.',
        },
        sourceLessonId: 'manners-respect-elders-teachers',
      },
      {
        question: 'اسلامی تعلیم کے مطابق صفائی کس چیز کا حصہ ہے؟',
        questionForGrade3Plus: 'پاکیزگی اور صفائی کی اہمیت کو اسلامی تعلیم میں کس بنیادی چیز سے جوڑا گیا ہے؟',
        options: ['صرف کھیل کا', 'ایمان کا', 'صرف لباس کا', 'صرف کھانے کا'],
        answer: 'ایمان کا',
        explanation: 'سبق میں پاکیزگی اور صفائی کی اہمیت بیان کی گئی ہے۔',
        english: {
          question: 'According to Islamic teaching, cleanliness is part of what?',
          questionForGrade3Plus: 'What important foundation is cleanliness and purity connected to in Islamic teaching?',
          options: ['Only games', 'Faith', 'Only clothing', 'Only food'],
          explanation: 'The lesson explains the importance of cleanliness and purity.',
        },
        sourceLessonId: 'hadith-cleanliness-purity',
      },
      {
        question: 'اگر کوئی پڑوسی مشکل میں ہو تو ہمیں کیا کرنا چاہیے؟',
        questionForGrade3Plus: 'آپ کو معلوم ہو کہ آپ کا پڑوسی مشکل میں ہے؛ اسلامی اخلاق کے مطابق آپ کا اگلا قدم کیا ہونا چاہیے؟',
        options: ['اس کی مدد کرنی چاہیے', 'اسے نظر انداز کرنا چاہیے', 'اس کا مذاق اڑانا چاہیے', 'اس سے چیزیں چھپا لینی چاہئیں'],
        answer: 'اس کی مدد کرنی چاہیے',
        explanation: 'پڑوسیوں کے ساتھ بھلائی اور ہمدردی کی تعلیم دی گئی ہے۔',
        english: {
          question: 'What should we do if a neighbor is having difficulty?',
          questionForGrade3Plus: 'You learn that your neighbor is in trouble. What should you do next, following good Islamic manners?',
          options: ['Help them', 'Ignore them', 'Make fun of them', 'Hide things from them'],
          explanation: 'The lesson teaches kindness and compassion toward neighbors.',
        },
        sourceLessonId: 'hadith-kindness-neighbors',
      },
      {
        question: 'کسی کی مدد یا نعمت پر شکر ادا کرنے کے لیے کیا کہنا اچھا ہے؟',
        questionForGrade3Plus: 'ایک دوست نے آپ کی مدد کی۔ اس کے لیے دعا اور شکریہ ادا کرنے والے الفاظ کون سے ہیں؟',
        options: ['استغفر اللہ', 'جزاک اللہ خیراً', 'ان شاء اللہ', 'اللہ اکبر'],
        answer: 'جزاک اللہ خیراً',
        explanation: 'جزاک اللہ خیراً کسی کی بھلائی پر دعا اور شکریے کے طور پر کہا جاتا ہے۔',
        english: {
          question: 'What is a good thing to say to thank someone for their help or kindness?',
          questionForGrade3Plus: 'A friend helped you. Which words offer a prayer and thanks in return?',
          options: ['Astaghfirullah — I seek Allah’s forgiveness', 'JazakAllahu khayran — May Allah reward you with goodness', 'InshaAllah — If Allah wills', 'Allahu Akbar — Allah is the Greatest'],
          explanation: 'JazakAllahu khayran is a prayer and a way to thank someone for their kindness.',
        },
        sourceLessonId: 'good-talks-everyday-phrases',
      },
      {
        question: 'حدیث کے سبق کے مطابق مسکرانا کس عمل کی مثال ہے؟',
        questionForGrade3Plus: 'کسی سے ملتے وقت خوش دلی سے مسکرانا حدیث کے سبق میں کس نیکی کی مثال ہے؟',
        options: ['صدقہ اور بھلائی', 'وقت کا ضیاع', 'خاموشی', 'آرام'],
        answer: 'صدقہ اور بھلائی',
        explanation: 'دوسروں کے لیے مسکراہٹ کو صدقہ اور بھلائی بتایا گیا ہے۔',
        english: {
          question: 'According to the hadith lesson, smiling is an example of what?',
          questionForGrade3Plus: 'When you greet someone with a cheerful smile, what good deed does the hadith lesson describe?',
          options: ['Charity and kindness', 'A waste of time', 'Silence', 'Rest'],
          explanation: 'A smile for others is described as charity and kindness.',
        },
        sourceLessonId: 'hadith-smiling-charity',
      },
    ],
  },
  'islamic-urdu-words-exam': {
    title: 'Islamic Urdu Words Exam',
    titleUrdu: 'اسلامی الفاظ اور معانی کا امتحان',
    questions: [
      {
        question: 'الحمد للہ کا درست مطلب کیا ہے؟',
        questionForGrade3Plus: 'کھانے کے بعد اللہ کی نعمت پر شکر اور تعریف کرنے کے لیے کہے گئے الحمد للہ کا مطلب کیا ہے؟',
        options: ['اللہ پاک ہے', 'تمام تعریفیں اللہ کے لیے ہیں', 'اللہ سب سے بڑا ہے', 'اللہ سے معافی مانگتا ہوں'],
        answer: 'تمام تعریفیں اللہ کے لیے ہیں',
        explanation: 'الحمد للہ کا مطلب ہے: تمام تعریفیں اللہ کے لیے ہیں۔',
        english: {
          question: 'What does the Arabic phrase Alhamdulillah mean?',
          questionForGrade3Plus: 'After a meal, what does Alhamdulillah mean when thanking and praising Allah for His blessings?',
          options: ['Allah is pure', 'All praise is for Allah', 'Allah is the Greatest', 'I seek Allah’s forgiveness'],
          explanation: 'Alhamdulillah means “All praise is for Allah.”',
        },
        sourceLessonId: 'good-talks-subhanallah-praise',
      },
      {
        question: 'سبحان اللہ کہنے سے کیا مراد ہے؟',
        questionForGrade3Plus: 'اللہ تعالیٰ کو ہر عیب سے پاک ماننے کا مفہوم کون سے کلمے میں ہے؟',
        options: ['اللہ پاک ہے', 'اگر اللہ نے چاہا', 'اللہ آپ کو اجر دے', 'میں توبہ کرتا ہوں'],
        answer: 'اللہ پاک ہے',
        explanation: 'سبحان اللہ اللہ کی پاکی بیان کرنے کا کلمہ ہے۔',
        english: {
          question: 'What does saying SubhanAllah mean?',
          questionForGrade3Plus: 'Which phrase expresses that Allah is free from every imperfection?',
          options: ['Allah is pure and perfect', 'If Allah wills', 'May Allah reward you', 'I repent'],
          explanation: 'SubhanAllah is a phrase that declares Allah’s perfection.',
        },
        sourceLessonId: 'good-talks-subhanallah-praise',
      },
      {
        question: 'اللہ اکبر کا مطلب کیا ہے؟',
        questionForGrade3Plus: 'اللہ تعالیٰ کی عظمت بیان کرنے والے اللہ اکبر کا درست مطلب کیا ہے؟',
        options: ['اللہ مہربان ہے', 'اللہ سب سے بڑا ہے', 'اللہ سے معافی', 'اللہ کا شکر'],
        answer: 'اللہ سب سے بڑا ہے',
        explanation: 'اللہ اکبر کا مطلب ہے: اللہ سب سے بڑا ہے۔',
        english: {
          question: 'What does Allahu Akbar mean?',
          questionForGrade3Plus: 'What is the correct meaning of Allahu Akbar, a phrase that expresses Allah’s greatness?',
          options: ['Allah is Most Merciful', 'Allah is the Greatest', 'I seek Allah’s forgiveness', 'Thanks be to Allah'],
          explanation: 'Allahu Akbar means “Allah is the Greatest.”',
        },
        sourceLessonId: 'good-talks-subhanallah-praise',
      },
      {
        question: 'مستقبل کے کسی کام کا ارادہ بتاتے ہوئے کون سا لفظ کہتے ہیں؟',
        questionForGrade3Plus: 'آپ دوست سے کہتے ہیں کہ کل ملیں گے، اور یہ بھی مانتے ہیں کہ سب اللہ کی مشیت سے ہوگا۔ کون سا لفظ کہیں گے؟',
        options: ['ماشاء اللہ', 'ان شاء اللہ', 'الحمد للہ', 'استغفر اللہ'],
        answer: 'ان شاء اللہ',
        explanation: 'ان شاء اللہ کا مطلب ہے: اگر اللہ نے چاہا۔',
        english: {
          question: 'Which phrase do you say when talking about something you plan to do in the future?',
          questionForGrade3Plus: 'You tell a friend you will meet tomorrow and recognize that it is by Allah’s will. Which phrase should you use?',
          options: ['MashaAllah — What Allah has willed', 'InshaAllah — If Allah wills', 'Alhamdulillah — All praise is for Allah', 'Astaghfirullah — I seek Allah’s forgiveness'],
          explanation: 'InshaAllah means “If Allah wills.”',
        },
        sourceLessonId: 'good-talks-everyday-phrases',
      },
      {
        question: 'کسی خوبصورت چیز کو دیکھ کر کون سا لفظ کہنا مناسب ہے؟',
        questionForGrade3Plus: 'آپ کسی خوبصورت چیز کی تعریف کرتے ہوئے اللہ کی مشیت کو یاد رکھنا چاہتے ہیں۔ کون سا لفظ کہیں گے؟',
        options: ['ماشاء اللہ', 'استغفر اللہ', 'بسم اللہ', 'جزاک اللہ'],
        answer: 'ماشاء اللہ',
        explanation: 'ماشاء اللہ کسی اچھی یا خوبصورت چیز کی تعریف کرتے ہوئے کہا جاتا ہے۔',
        english: {
          question: 'Which phrase is appropriate when you see something beautiful?',
          questionForGrade3Plus: 'You want to admire something beautiful while remembering Allah’s will. Which phrase should you say?',
          options: ['MashaAllah — What Allah has willed', 'Astaghfirullah — I seek Allah’s forgiveness', 'Bismillah — In the name of Allah', 'JazakAllah — May Allah reward you'],
          explanation: 'MashaAllah is said when admiring something good or beautiful.',
        },
        sourceLessonId: 'good-talks-everyday-phrases',
      },
      {
        question: 'استغفر اللہ کہنے سے ہم کیا مانگتے ہیں؟',
        questionForGrade3Plus: 'غلطی کے بعد اللہ تعالیٰ سے معافی مانگنے کے مفہوم والا کلمہ کون سا ہے؟',
        options: ['علم میں اضافہ', 'اللہ سے معافی', 'کسی کا شکریہ', 'کھانے میں برکت'],
        answer: 'اللہ سے معافی',
        explanation: 'استغفر اللہ کا مطلب ہے: میں اللہ سے معافی مانگتا ہوں۔',
        english: {
          question: 'What do we ask for when we say Astaghfirullah?',
          questionForGrade3Plus: 'Which phrase means asking Allah for forgiveness after making a mistake?',
          options: ['More knowledge', 'Forgiveness from Allah', 'To thank someone', 'Blessings in food'],
          explanation: 'Astaghfirullah means “I seek forgiveness from Allah.”',
        },
        sourceLessonId: 'good-talks-astaghfirullah-repentance',
      },
      {
        question: 'بسم اللہ کا مطلب کیا ہے؟',
        questionForGrade3Plus: 'کسی اچھے کام کا آغاز اللہ کا نام لے کر کرنے کے لیے کہے گئے بسم اللہ کا مطلب کیا ہے؟',
        options: ['اللہ کے نام سے', 'اللہ کا شکر ہے', 'اللہ آپ کو اجر دے', 'اللہ پاک ہے'],
        answer: 'اللہ کے نام سے',
        explanation: 'بسم اللہ کا مطلب ہے: اللہ کے نام سے۔',
        english: {
          question: 'What does Bismillah mean?',
          questionForGrade3Plus: 'What does Bismillah mean when beginning a good action in Allah’s name?',
          options: ['In the name of Allah', 'Thanks be to Allah', 'May Allah reward you', 'Allah is pure'],
          explanation: 'Bismillah means “In the name of Allah.”',
        },
        sourceLessonId: 'good-talks-everyday-phrases',
      },
      {
        question: 'جزاک اللہ خیراً کس موقع پر کہا جاتا ہے؟',
        questionForGrade3Plus: 'کسی شخص کی بھلائی کے جواب میں اس کے لیے بہترین اجر کی دعا کون سے الفاظ میں دی جاتی ہے؟',
        options: ['کسی کی بھلائی پر دعا دینے کے لیے', 'سونے سے پہلے', 'مستقبل کا ارادہ بتانے کے لیے', 'چھینک آنے پر'],
        answer: 'کسی کی بھلائی پر دعا دینے کے لیے',
        explanation: 'جزاک اللہ خیراً کا مطلب ہے: اللہ آپ کو بہترین بدلہ دے۔',
        english: {
          question: 'When do you say JazakAllahu khayran?',
          questionForGrade3Plus: 'Which phrase offers someone a prayer for a good reward in return for their kindness?',
          options: ['To pray for someone who has been kind', 'Before going to sleep', 'When sharing a future plan', 'After sneezing'],
          explanation: 'JazakAllahu khayran means “May Allah reward you with goodness.”',
        },
        sourceLessonId: 'good-talks-everyday-phrases',
      },
      {
        question: 'رَبِّ زِدْنِي عِلْمًا کی دعا میں کس چیز میں اضافے کی درخواست ہے؟',
        questionForGrade3Plus: 'طالب علم کی دعا رَبِّ زِدْنِي عِلْمًا میں اللہ سے کس چیز میں اضافے کی درخواست کی گئی ہے؟',
        options: ['رزق', 'علم', 'صحت', 'دوست'],
        answer: 'علم',
        explanation: 'اس دعا کا مطلب ہے: اے میرے رب، میرے علم میں اضافہ فرما۔',
        english: {
          question: 'What does the dua Rabbi zidni ilma ask to increase?',
          questionForGrade3Plus: 'In the dua Rabbi zidni ilma, what does the student ask Allah to increase?',
          options: ['Provision', 'Knowledge', 'Health', 'Friends'],
          explanation: 'The dua means “My Lord, increase me in knowledge.”',
        },
        sourceLessonId: 'good-talks-dua-knowledge-rabbi-zidni',
      },
      {
        question: 'کلمہ طیبہ میں اللہ کے بارے میں کون سا بنیادی عقیدہ بیان ہوتا ہے؟',
        questionForGrade3Plus: 'کلمہ طیبہ میں اللہ کی وحدانیت کے بارے میں کون سی گواہی دی جاتی ہے؟',
        options: ['اللہ کے سوا کوئی معبود نہیں', 'اللہ ہر جگہ سفر کرتا ہے', 'ہر انسان فرشتہ ہے', 'دن اور رات ایک جیسے ہیں'],
        answer: 'اللہ کے سوا کوئی معبود نہیں',
        explanation: 'کلمہ طیبہ اللہ کی وحدانیت اور رسول اللہ ﷺ کی رسالت کی گواہی دیتا ہے۔',
        english: {
          question: 'What basic belief about Allah is stated in the Kalima Tayyibah?',
          questionForGrade3Plus: 'Which testimony about the oneness of Allah is given in the Kalima Tayyibah?',
          options: ['There is no deity worthy of worship except Allah', 'Allah travels everywhere', 'Every person is an angel', 'Day and night are the same'],
          explanation: 'The Kalima Tayyibah testifies to the oneness of Allah and the prophethood of Prophet Muhammad ﷺ.',
        },
        sourceLessonId: 'good-talks-six-kalimas',
      },
    ],
  },
  'hindu-values-quiz': {
    title: 'Hindu Culture & Values Quiz',
    subjectLabel: 'Hindu Culture',
    direction: 'ltr',
    questions: [
      { question: 'Which epic includes the Bhagavad Gita?', questionForGrade3Plus: 'A student finds the Bhagavad Gita while reading an Indian epic. Which epic should they write in their notes?', options: ['The Mahabharata', 'The Panchatantra', 'The Jataka Tales', 'The Iliad'], answer: 'The Mahabharata', explanation: 'The Bhagavad Gita is a teaching conversation in the Mahabharata.', sourceLessonId: 'hindu-culture' },
      { question: 'Which festival is often celebrated with lamps and lights?', questionForGrade3Plus: 'A family decorates with lamps for a festival often called the festival of lights. Which festival are they celebrating?', options: ['Diwali', 'Holi', 'Onam', 'Baisakhi'], answer: 'Diwali', explanation: 'Many communities celebrate Diwali by lighting lamps and sharing time with family.', sourceLessonId: 'hindu-culture' },
      { question: 'Which festival is famous for its joyful colors?', questionForGrade3Plus: 'Friends celebrate by sharing bright colors during a spring festival. Which festival is this?', options: ['Holi', 'Diwali', 'Raksha Bandhan', 'Navratri'], answer: 'Holi', explanation: 'Holi is widely known as a festival of colors.', sourceLessonId: 'hindu-culture' },
      { question: 'What does ahimsa encourage?', questionForGrade3Plus: 'When a disagreement happens, which choice best follows ahimsa?', options: ['Kindness and avoiding harm', 'Winning every contest', 'Keeping all food to yourself', 'Never asking questions'], answer: 'Kindness and avoiding harm', explanation: 'Ahimsa is the principle of non-harm and compassion.', sourceLessonId: 'hindu-culture' },
      { question: 'Which language is used in many ancient Hindu texts?', questionForGrade3Plus: 'A learner studies an ancient language used in many Hindu scriptures. Which language are they studying?', options: ['Sanskrit', 'Gurmukhi', 'Latin', 'Japanese'], answer: 'Sanskrit', explanation: 'Sanskrit is an ancient language used in many Hindu scriptures and works.', sourceLessonId: 'hindu-culture' },
      { question: 'What is a rangoli?', questionForGrade3Plus: 'A family makes a colorful design on the floor to decorate their home. What is this art called?', options: ['A colorful decorative floor design', 'A musical instrument', 'A kind of book', 'A mountain'], answer: 'A colorful decorative floor design', explanation: 'Rangoli is a decorative art made with colorful materials, often at homes or celebrations.', sourceLessonId: 'hindu-culture' },
      { question: 'Which epic tells the story of Rama and Sita?', questionForGrade3Plus: 'A reading group wants to find the epic that tells Rama and Sita’s story. Which text should they choose?', options: ['The Ramayana', 'The Vedas', 'The Panchatantra', 'The Arthashastra'], answer: 'The Ramayana', explanation: 'The Ramayana is an epic whose central story follows Rama, Sita, and their journey.', sourceLessonId: 'hindu-culture' },
      { question: 'What is yoga commonly practiced to support?', questionForGrade3Plus: 'A class practices breathing, movement, and attention to support which goal?', options: ['Well-being and mindful movement', 'Making a louder voice', 'Changing the weather', 'Growing taller overnight'], answer: 'Well-being and mindful movement', explanation: 'Yoga includes practices such as movement, breathing, and attention.', sourceLessonId: 'hindu-culture' },
      { question: 'What is a respectful greeting often used in India?', questionForGrade3Plus: 'A visitor wants to use a respectful greeting commonly heard in India. Which should they choose?', options: ['Namaste', 'Bonjour', 'Shalom', 'Ciao'], answer: 'Namaste', explanation: 'Namaste is a respectful greeting used in India and by people around the world.', sourceLessonId: 'hindu-culture' },
      { question: 'In many traditions, what can a lotus symbolize?', questionForGrade3Plus: 'In several Indian traditions, which ideas can the lotus represent as it grows from muddy water?', options: ['Purity and growth', 'A storm warning', 'A number puzzle', 'A musical rhythm'], answer: 'Purity and growth', explanation: 'The lotus is an important symbol in several Indian religious and cultural traditions.', sourceLessonId: 'hindu-culture' },
    ],
  },
  'sikh-values-quiz': {
    title: 'Sikhism & Seva Quiz',
    subjectLabel: 'Sikhism',
    direction: 'ltr',
    questions: [
      { question: 'What does seva mean?', questionForGrade3Plus: 'A group volunteers to help their neighbors without expecting payment. Which Sikh value are they practicing?', options: ['Selfless service', 'A type of dance', 'A mountain path', 'A counting game'], answer: 'Selfless service', explanation: 'Seva means serving others without expecting a reward.', sourceLessonId: 'sikh-values' },
      { question: 'What is langar?', questionForGrade3Plus: 'At a gurdwara, visitors of different backgrounds sit together for a free meal. What is this meal called?', options: ['A community meal shared with everyone', 'A kind of painting', 'A musical note', 'A holiday greeting'], answer: 'A community meal shared with everyone', explanation: 'Langar is a free community meal served at a gurdwara and open to all.', sourceLessonId: 'sikh-values' },
      { question: 'What is the Sikh place of worship called?', questionForGrade3Plus: 'A family visits a Sikh place of worship to pray and serve the community. Where are they?', options: ['Gurdwara', 'Mandir', 'Synagogue', 'Pagoda'], answer: 'Gurdwara', explanation: 'A gurdwara is a place where Sikhs gather for worship and community.', sourceLessonId: 'sikh-values' },
      { question: 'Which script is used to write Punjabi in Sikh religious texts?', questionForGrade3Plus: 'A student sees Punjabi letters in a Sikh text and learns the script name. What is it?', options: ['Gurmukhi', 'Devanagari', 'Arabic', 'Cyrillic'], answer: 'Gurmukhi', explanation: 'The Guru Granth Sahib is written in Gurmukhi script, among other languages and scripts represented in it.', sourceLessonId: 'sikh-values' },
      { question: 'Who is the first Sikh Guru?', questionForGrade3Plus: 'A history timeline begins with the founder and first of the Sikh Gurus. Whose name belongs first?', options: ['Guru Nanak', 'Guru Gobind Singh', 'Guru Arjan', 'Guru Tegh Bahadur'], answer: 'Guru Nanak', explanation: 'Guru Nanak is the founder of Sikhism and the first of the Sikh Gurus.', sourceLessonId: 'sikh-values' },
      { question: 'What does sharing langar teach?', questionForGrade3Plus: 'People from different backgrounds share the same meal as equals. Which values does langar demonstrate?', options: ['Equality and community', 'Only eating with friends', 'Keeping food for one group', 'Avoiding teamwork'], answer: 'Equality and community', explanation: 'Everyone can sit and share a meal together, reflecting equality and service.', sourceLessonId: 'sikh-values' },
      { question: 'What is the Sikh scripture called?', questionForGrade3Plus: 'A learner wants to read the central scripture of Sikhism. Which book should they learn about?', options: ['Guru Granth Sahib', 'Bhagavad Gita', 'The Ramayana', 'The Torah'], answer: 'Guru Granth Sahib', explanation: 'Guru Granth Sahib is the central scripture of Sikhism and is treated with great respect.', sourceLessonId: 'sikh-values' },
      { question: 'Which value encourages earning honestly?', questionForGrade3Plus: 'Someone works hard and earns a living honestly. Which of the three Sikh principles describes this?', options: ['Kirat karni', 'Vand chhakna', 'Naam japna', 'Seva'], answer: 'Kirat karni', explanation: 'Kirat karni means earning an honest living through hard work.', sourceLessonId: 'sikh-values' },
      { question: 'What does vand chhakna encourage?', questionForGrade3Plus: 'A child shares food and supplies with people who need them. Which principle are they following?', options: ['Sharing with others', 'Collecting things alone', 'Skipping meals', 'Avoiding neighbors'], answer: 'Sharing with others', explanation: 'Vand chhakna means sharing what you have with others.', sourceLessonId: 'sikh-values' },
      { question: 'Which celebration is especially important in Sikh history and community?', questionForGrade3Plus: 'A student researches the festival connected with the founding of the Khalsa. Which celebration should they study?', options: ['Vaisakhi', 'Halloween', 'April Fools’ Day', 'Thanksgiving'], answer: 'Vaisakhi', explanation: 'Vaisakhi is an important harvest festival and commemorates the founding of the Khalsa.', sourceLessonId: 'sikh-values' },
    ],
  },
  'general-discovery-quiz': {
    title: 'World Discovery Quiz',
    subjectLabel: 'World Discovery',
    direction: 'ltr',
    questions: [
      { question: 'Which is the largest ocean on Earth?', questionForGrade3Plus: 'A researcher compares ocean areas on a world map. Which ocean covers the greatest area?', options: ['Pacific Ocean', 'Arctic Ocean', 'Indian Ocean', 'Southern Ocean'], answer: 'Pacific Ocean', explanation: 'The Pacific Ocean is the largest ocean on Earth.', sourceLessonId: 'world-discovery' },
      { question: 'How many continents are commonly taught in the seven-continent model?', questionForGrade3Plus: 'A class project uses the model that names Asia, Africa, the Americas, Antarctica, Europe, and Australia separately. How many continents are in this model?', options: ['7', '5', '6', '8'], answer: '7', explanation: 'The seven-continent model includes Asia, Africa, North America, South America, Antarctica, Europe, and Australia.', sourceLessonId: 'world-discovery' },
      { question: 'Which planet is known as the Red Planet?', questionForGrade3Plus: 'Iron-rich dust makes one neighboring planet look reddish. Which planet is it?', options: ['Mars', 'Venus', 'Neptune', 'Mercury'], answer: 'Mars', explanation: 'Iron-rich dust gives Mars its reddish appearance.', sourceLessonId: 'world-discovery' },
      { question: 'What do we use to find directions on a map?', questionForGrade3Plus: 'A map reader needs to identify north, south, east, and west. Which map feature helps?', options: ['A compass rose', 'A thermometer', 'A ruler only', 'A calendar'], answer: 'A compass rose', explanation: 'A compass rose shows directions such as north, south, east, and west.', sourceLessonId: 'world-discovery' },
      { question: 'Which animal is the largest mammal?', questionForGrade3Plus: 'A wildlife report asks which living mammal has the greatest body size. Which animal is the answer?', options: ['Blue whale', 'African elephant', 'Giraffe', 'Hippopotamus'], answer: 'Blue whale', explanation: 'The blue whale is the largest mammal known to live on Earth.', sourceLessonId: 'world-discovery' },
      { question: 'What is the capital city of Japan?', questionForGrade3Plus: 'A traveler plans a trip to Japan and wants to visit its capital. Which city should they choose?', options: ['Tokyo', 'Seoul', 'Beijing', 'Bangkok'], answer: 'Tokyo', explanation: 'Tokyo is the capital of Japan.', sourceLessonId: 'world-discovery' },
      { question: 'Which instrument measures temperature?', questionForGrade3Plus: 'A scientist records how hot or cold a liquid is. Which instrument should be used?', options: ['Thermometer', 'Compass', 'Telescope', 'Scale'], answer: 'Thermometer', explanation: 'A thermometer measures how hot or cold something is.', sourceLessonId: 'world-discovery' },
      { question: 'Which natural feature carries water from land toward the sea?', questionForGrade3Plus: 'Rainwater flows downhill through a channel and eventually reaches the ocean. What is this feature?', options: ['River', 'Desert', 'Volcano', 'Glacier only'], answer: 'River', explanation: 'Rivers flow across land and often empty into a sea or ocean.', sourceLessonId: 'world-discovery' },
      { question: 'What do we call a person who studies stars and planets?', questionForGrade3Plus: 'A space scientist observes planets, stars, and galaxies. What is this scientist called?', options: ['Astronomer', 'Botanist', 'Chef', 'Architect'], answer: 'Astronomer', explanation: 'Astronomers study objects and events in space.', sourceLessonId: 'world-discovery' },
      { question: 'Which is a renewable source of energy?', questionForGrade3Plus: 'A town wants an energy source that is naturally replenished. Which option is renewable?', options: ['Sunlight', 'Coal', 'Petrol', 'Natural gas'], answer: 'Sunlight', explanation: 'Sunlight is naturally replenished and can be used to make solar energy.', sourceLessonId: 'world-discovery' },
    ],
  },
  'science-explorer-quiz': {
    title: 'Science Explorer Challenge',
    subjectLabel: 'Science',
    direction: 'ltr',
    questions: [
      { question: 'Which part of a plant usually absorbs water from the soil?', questionForGrade3Plus: 'A plant is moved to dry soil. Which part needs to take up water and minerals for it to stay healthy?', options: ['Roots', 'Flower petals', 'Fruit', 'Seeds only'], answer: 'Roots', explanation: 'Roots take up water and minerals from the soil.', sourceLessonId: 'science-plants' },
      { question: 'What force pulls objects toward Earth?', questionForGrade3Plus: 'When a ball is released, it falls toward the ground. Which force explains this motion?', options: ['Gravity', 'Sound', 'Light', 'Magnetism only'], answer: 'Gravity', explanation: 'Gravity is the force that attracts objects toward one another; Earth’s gravity pulls things toward the ground.', sourceLessonId: 'science-forces' },
      { question: 'Which state of matter keeps its own shape?', questionForGrade3Plus: 'A toy keeps its shape when moved between containers. Which state of matter is it most likely in?', options: ['Solid', 'Liquid', 'Gas', 'Steam only'], answer: 'Solid', explanation: 'A solid keeps its shape unless a force changes it.', sourceLessonId: 'science-matter' },
      { question: 'What gas do humans need to breathe?', questionForGrade3Plus: 'The body uses one gas from the air to help release energy from food. Which gas is it?', options: ['Oxygen', 'Helium', 'Carbon dioxide', 'Hydrogen'], answer: 'Oxygen', explanation: 'Humans breathe in oxygen, which the body uses to release energy from food.', sourceLessonId: 'science-body' },
      { question: 'What is the closest star to Earth?', questionForGrade3Plus: 'A student compares stars by distance from Earth. Which star is in our solar system and nearest to us?', options: ['The Sun', 'Sirius', 'Polaris', 'Vega'], answer: 'The Sun', explanation: 'The Sun is the star at the center of our solar system and the closest star to Earth.', sourceLessonId: 'science-space' },
      { question: 'Which material is attracted to a magnet?', questionForGrade3Plus: 'A magnet is brought near four objects. Which material should be attracted?', options: ['Iron', 'Paper', 'Wood', 'Glass'], answer: 'Iron', explanation: 'Iron is a magnetic material.', sourceLessonId: 'science-magnets' },
      { question: 'What do bees help many flowering plants do?', questionForGrade3Plus: 'A bee carries pollen between flowers. What important process can this help plants complete?', options: ['Pollinate', 'Make soil disappear', 'Turn leaves blue', 'Stop growing'], answer: 'Pollinate', explanation: 'When bees move between flowers, they can carry pollen and help plants reproduce.', sourceLessonId: 'science-plants' },
      { question: 'What happens to liquid water when it freezes?', questionForGrade3Plus: 'A tray of water is cooled below its freezing point. What change of state happens?', options: ['It becomes solid ice', 'It becomes a metal', 'It disappears forever', 'It becomes soil'], answer: 'It becomes solid ice', explanation: 'Freezing changes liquid water into solid ice.', sourceLessonId: 'science-matter' },
      { question: 'Which simple machine is a ramp?', questionForGrade3Plus: 'A worker rolls a heavy box up a sloping surface instead of lifting it straight up. Which simple machine is being used?', options: ['Inclined plane', 'Pulley', 'Wheel and axle', 'Lever'], answer: 'Inclined plane', explanation: 'A ramp is an inclined plane that helps move objects between different heights.', sourceLessonId: 'science-machines' },
      { question: 'Why does the Moon appear bright at night?', questionForGrade3Plus: 'The Moon looks bright, but it does not produce visible light of its own. Where does its light come from?', options: ['It reflects sunlight', 'It makes its own sunlight', 'It is made of fire', 'It reflects city lights only'], answer: 'It reflects sunlight', explanation: 'The Moon reflects light from the Sun; it does not make its own visible light.', sourceLessonId: 'science-space' },
    ],
  },
};
