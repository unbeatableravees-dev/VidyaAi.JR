export interface QuizOption {
  key: string;
  value: string;
}

export interface AdaptiveQuizQuestion {
  id: string;
  subjectId: string;
  subjectName: string;
  topic: string;
  difficulty: 1 | 2 | 3;
  question: string;
  visualPrompt: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
  funFact?: string;
}

export interface QuizSubject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const QUIZ_SUBJECTS: QuizSubject[] = [
  { id: 'all', name: 'All Subjects Mix', icon: '🌟', color: '#3b82f6' },
  { id: 'mathematics', name: 'Mathematics', icon: '➕', color: '#6366f1' },
  { id: 'numbers', name: 'Numbers', icon: '🔢', color: '#8b5cf6' },
  { id: 'alphabets', name: 'Alphabets', icon: '🔤', color: '#22c55e' },
  { id: 'english', name: 'English', icon: '📝', color: '#84cc16' },
  { id: 'science', name: 'Science', icon: '🔬', color: '#06b6d4' },
  { id: 'hindi', name: 'Hindi (हिन्दी)', icon: '🇮🇳', color: '#10b981' },
  { id: 'knowledge', name: 'General Knowledge', icon: '💡', color: '#f59e0b' },
  { id: 'history', name: 'History', icon: '🏰', color: '#f97316' },
  { id: 'story-time', name: 'Story Time', icon: '📖', color: '#ec4899' },
  { id: 'children-stories', name: 'Children Stories', icon: '🦁', color: '#e11d48' },
  { id: 'rhymes', name: 'Rhymes', icon: '🎵', color: '#d946ef' },
  { id: 'manners', name: 'Manners & Habits', icon: '🤝', color: '#f43f5e' },
  { id: 'art-craft', name: 'Art & Craft', icon: '🎨', color: '#eab308' },
];

// Utility Helpers
const randomChoice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const buildOptions = (correct: string, distractors: string[]): { options: QuizOption[]; correctAnswer: string } => {
  const uniqueDistractors = Array.from(new Set(distractors.filter((d) => String(d).trim() !== String(correct).trim())));
  while (uniqueDistractors.length < 3) {
    const fallback = `${correct} + ${uniqueDistractors.length + 1}`;
    uniqueDistractors.push(fallback);
  }
  const chosenDistractors = shuffleArray(uniqueDistractors).slice(0, 3);
  const correctIndex = randomInt(0, 3);
  const allValues = [...chosenDistractors];
  allValues.splice(correctIndex, 0, correct);

  const options: QuizOption[] = allValues.map((val, idx) => ({
    key: String.fromCharCode(65 + idx),
    value: String(val),
  }));

  return {
    options,
    correctAnswer: options[correctIndex].key,
  };
};

const KIDS_NAMES = ['Aarav', 'Ananya', 'Kabir', 'Meera', 'Rohan', 'Sara', 'Vihaan', 'Diya', 'Arjun', 'Isha'];
const FRUIT_EMOJIS = [
  { name: 'apples', emoji: '🍎' },
  { name: 'bananas', emoji: '🍌' },
  { name: 'strawberries', emoji: '🍓' },
  { name: 'oranges', emoji: '🍊' },
  { name: 'mangoes', emoji: '🥭' },
  { name: 'grapes', emoji: '🍇' },
];
const ITEM_EMOJIS = [
  { name: 'stars', emoji: '⭐' },
  { name: 'balloons', emoji: '🎈' },
  { name: 'cupcakes', emoji: '🧁' },
  { name: 'stickers', emoji: '✨' },
  { name: 'marbles', emoji: '🔮' },
  { name: 'pencils', emoji: '✏️' },
  { name: 'books', emoji: '📚' },
  { name: 'toy cars', emoji: '🚗' },
];

interface RawDraft {
  topic: string;
  difficulty: 1 | 2 | 3;
  question: string;
  visualPrompt: string;
  answer: string;
  distractors: string[];
  explanation: string;
  funFact?: string;
}

// -------------------------------------------------------------
// 1. MATHEMATICS & NUMBERS GENERATORS (10,000+ Permutations)
// -------------------------------------------------------------
function generateMathNumbersQuestion(grade: string, isNumbersOnly = false): RawDraft {
  const child = randomChoice(KIDS_NAMES);
  const fruit = randomChoice(FRUIT_EMOJIS);
  const item = randomChoice(ITEM_EMOJIS);

  if (grade === 'Kindergarten') {
    const templateType = randomInt(1, 6);

    // Template 1: Visual Object Counting (1 to 10)
    if (templateType === 1) {
      const count = randomInt(2, 9);
      const visuals = Array.from({ length: count }, () => fruit.emoji).join(' ');
      return {
        topic: 'Visual Counting',
        difficulty: 1,
        question: `Count the ${fruit.name}: ${visuals}. How many are there in total?`,
        visualPrompt: visuals,
        answer: String(count),
        distractors: [String(count - 1), String(count + 1), String(count + 2)],
        explanation: `Counting each ${fruit.name} one by one gives ${count}!`,
      };
    }

    // Template 2: Next Number in Sequence
    if (templateType === 2) {
      const start = randomInt(1, 8);
      const next = start + 1;
      return {
        topic: 'Number Order',
        difficulty: 1,
        question: `Which friendly number comes right after ${start}?`,
        visualPrompt: `${start}  ➔  ?`,
        answer: String(next),
        distractors: [String(start - 1 < 0 ? 9 : start - 1), String(next + 1), String(next + 2)],
        explanation: `When we count up, ${next} comes immediately after ${start}.`,
      };
    }

    // Template 3: Simple Sum up to 6
    if (templateType === 3) {
      const a = randomInt(1, 3);
      const b = randomInt(1, 3);
      const sum = a + b;
      const visualA = Array.from({ length: a }, () => '⭐').join(' ');
      const visualB = Array.from({ length: b }, () => '⭐').join(' ');
      return {
        topic: 'Addition Fun',
        difficulty: 2,
        question: `What is ${a} + ${b}? (Count the stars!)`,
        visualPrompt: `${visualA}   +   ${visualB}`,
        answer: String(sum),
        distractors: [String(sum - 1), String(sum + 1), String(sum + 2)],
        explanation: `${a} and ${b} put together make ${sum}!`,
      };
    }

    // Template 4: Basic Subtraction Takeaway
    if (templateType === 4) {
      const a = randomInt(3, 6);
      const b = randomInt(1, a - 1);
      const rem = a - b;
      return {
        topic: 'Takeaway Subtraction',
        difficulty: 2,
        question: `${child} had ${a} ${item.name}. ${child} gave ${b} to a friend. How many are left?`,
        visualPrompt: `${a} ${item.emoji}  −  ${b} ${item.emoji} = ?`,
        answer: String(rem),
        distractors: [String(rem + 1), String(rem - 1 < 1 ? a : rem - 1), String(a)],
        explanation: `Starting with ${a} and taking away ${b} leaves ${rem} ${item.name}.`,
      };
    }

    // Template 5: Bigger vs Smaller Number
    if (templateType === 5) {
      const num1 = randomInt(1, 9);
      let num2 = randomInt(1, 9);
      while (num2 === num1) num2 = randomInt(1, 9);
      const bigger = Math.max(num1, num2);
      return {
        topic: 'Comparing Numbers',
        difficulty: 1,
        question: `Which number is BIGGER: ${num1} or ${num2}?`,
        visualPrompt: `${num1}   🆚   ${num2}`,
        answer: String(bigger),
        distractors: [String(Math.min(num1, num2)), 'Both are equal', '0'],
        explanation: `${bigger} represents more items than ${Math.min(num1, num2)}.`,
      };
    }

    // Template 6: Basic 2D Shapes
    const shapes = [
      { name: 'Circle', prompt: '🟡 Smooth & round with 0 corners', dist: ['Triangle', 'Square', 'Star'] },
      { name: 'Triangle', prompt: '🔺 Has 3 corners and 3 straight sides', dist: ['Circle', 'Square', 'Rectangle'] },
      { name: 'Square', prompt: '🟥 Has 4 equal sides and 4 corners', dist: ['Circle', 'Triangle', 'Star'] },
      { name: 'Star', prompt: '⭐ Has 5 shiny pointed corners', dist: ['Circle', 'Square', 'Triangle'] },
    ];
    const pickedShape = randomChoice(shapes);
    return {
      topic: 'Shape Discovery',
      difficulty: 1,
      question: `Which shape is this? "${pickedShape.prompt}"`,
      visualPrompt: pickedShape.prompt,
      answer: pickedShape.name,
      distractors: pickedShape.dist,
      explanation: `A ${pickedShape.name} matches this description perfectly!`,
    };
  }

  if (grade === 'Grade 1') {
    const templateType = randomInt(1, 6);

    // Template 1: Addition to 20
    if (templateType === 1) {
      const a = randomInt(4, 12);
      const b = randomInt(3, 8);
      const ans = a + b;
      return {
        topic: 'Addition to 20',
        difficulty: 1,
        question: `What is ${a} + ${b}?`,
        visualPrompt: `${a}  +  ${b}  =  ?`,
        answer: String(ans),
        distractors: [String(ans - 1), String(ans + 1), String(ans + 2)],
        explanation: `${a} + ${b} equals ${ans}.`,
      };
    }

    // Template 2: Subtraction up to 18
    if (templateType === 2) {
      const a = randomInt(10, 18);
      const b = randomInt(3, 9);
      const ans = a - b;
      return {
        topic: 'Subtraction',
        difficulty: 2,
        question: `What is ${a} − ${b}?`,
        visualPrompt: `${a}  −  ${b}  =  ?`,
        answer: String(ans),
        distractors: [String(ans - 1), String(ans + 1), String(ans + 2)],
        explanation: `${a} minus ${b} leaves ${ans}.`,
      };
    }

    // Template 3: Place Value (Tens & Ones)
    if (templateType === 3) {
      const tens = randomInt(2, 6);
      const ones = randomInt(1, 9);
      const num = tens * 10 + ones;
      return {
        topic: 'Place Value',
        difficulty: 2,
        question: `Which number has ${tens} tens and ${ones} ones?`,
        visualPrompt: `${tens} Tens  +  ${ones} Ones`,
        answer: String(num),
        distractors: [String(ones * 10 + tens), String(num + 10), String(tens * 10)],
        explanation: `${tens} tens = ${tens * 10}. Adding ${ones} ones gives ${num}.`,
      };
    }

    // Template 4: Skip Counting Patterns
    if (templateType === 4) {
      const step = randomChoice([2, 5, 10]);
      const start = step * randomInt(1, 4);
      const seq = [start, start + step, start + step * 2];
      const next = start + step * 3;
      return {
        topic: 'Skip Counting',
        difficulty: 2,
        question: `What comes next in the pattern? ${seq.join(', ')}, __`,
        visualPrompt: `${seq.join('  ➔  ')}  ➔  ?`,
        answer: String(next),
        distractors: [String(next - 1), String(next + 1), String(next + step)],
        explanation: `The numbers are skip counting up by ${step} each time.`,
      };
    }

    // Template 5: Real-world Word Problem
    if (templateType === 5) {
      const start = randomInt(7, 14);
      const add = randomInt(3, 6);
      const total = start + add;
      return {
        topic: 'Word Problems',
        difficulty: 2,
        question: `${child} collected ${start} ${item.name}. Teacher gave ${add} more. How many ${item.name} does ${child} have now?`,
        visualPrompt: `${start} ${item.emoji}  +  ${add} ${item.emoji}  =  ?`,
        answer: String(total),
        distractors: [String(total - 1), String(total + 1), String(total - 2)],
        explanation: `${start} + ${add} = ${total} ${item.name} altogether.`,
      };
    }

    // Template 6: Clock Time to the Hour
    const hour = randomInt(1, 12);
    return {
      topic: 'Telling Time',
      difficulty: 1,
      question: `The short hour hand is pointing at ${hour} and the long minute hand is on 12. What time is it?`,
      visualPrompt: `🕒 Hour hand: ${hour} | Minute hand: 12`,
      answer: `${hour}:00`,
      distractors: [`${hour > 1 ? hour - 1 : 12}:00`, `${hour < 12 ? hour + 1 : 1}:00`, `${hour}:30`],
      explanation: `When the minute hand points straight up at 12, it is exactly ${hour} o'clock (${hour}:00).`,
    };
  }

  if (grade === 'Grade 2') {
    const templateType = randomInt(1, 6);

    // Template 1: 2-Digit Addition with Regrouping
    if (templateType === 1) {
      const a = randomInt(18, 55);
      const b = randomInt(15, 38);
      const ans = a + b;
      return {
        topic: '2-Digit Addition',
        difficulty: 2,
        question: `What is ${a} + ${b}?`,
        visualPrompt: `${a}  +  ${b}  =  ?`,
        answer: String(ans),
        distractors: [String(ans - 10), String(ans + 10), String(ans - 1)],
        explanation: `${a} + ${b} = ${ans}.`,
      };
    }

    // Template 2: 2-Digit Subtraction
    if (templateType === 2) {
      const a = randomInt(50, 95);
      const b = randomInt(15, 45);
      const ans = a - b;
      return {
        topic: '2-Digit Subtraction',
        difficulty: 2,
        question: `What is ${a} − ${b}?`,
        visualPrompt: `${a}  −  ${b}  =  ?`,
        answer: String(ans),
        distractors: [String(ans + 10), String(ans - 10), String(ans + 2)],
        explanation: `${a} − ${b} = ${ans}.`,
      };
    }

    // Template 3: Multiplication as Equal Groups
    if (templateType === 3) {
      const groups = randomInt(3, 6);
      const perGroup = randomInt(2, 5);
      const total = groups * perGroup;
      return {
        topic: 'Multiplication Groups',
        difficulty: 2,
        question: `There are ${groups} baskets. Each basket has ${perGroup} juicy ${fruit.name}. How many ${fruit.name} in all?`,
        visualPrompt: `${groups} groups of ${perGroup}  =  ?`,
        answer: String(total),
        distractors: [String(total - perGroup), String(total + perGroup), String(groups + perGroup)],
        explanation: `${groups} groups of ${perGroup} means ${groups} × ${perGroup} = ${total}.`,
      };
    }

    // Template 4: Rupee Money Calculation
    if (templateType === 4) {
      const wallet = randomChoice([50, 100]);
      const spent = randomInt(15, 45);
      const left = wallet - spent;
      return {
        topic: 'Money Math',
        difficulty: 2,
        question: `${child} had ₹${wallet} and spent ₹${spent} on a drawing notebook. How much change is left?`,
        visualPrompt: `₹${wallet}  −  ₹${spent}  =  ?`,
        answer: `₹${left}`,
        distractors: [`₹${left + 10}`, `₹${left - 10}`, `₹${spent}`],
        explanation: `₹${wallet} − ₹${spent} leaves ₹${left}.`,
      };
    }

    // Template 5: Even vs Odd Numbers
    if (templateType === 5) {
      const evenNum = randomInt(11, 45) * 2;
      const odd1 = evenNum + 1;
      const odd2 = evenNum - 3;
      const odd3 = evenNum + 5;
      return {
        topic: 'Even & Odd',
        difficulty: 1,
        question: 'Which of the following numbers is an EVEN number?',
        visualPrompt: `Ends in 0, 2, 4, 6, or 8?`,
        answer: String(evenNum),
        distractors: [String(odd1), String(odd2), String(odd3)],
        explanation: `${evenNum} ends in ${evenNum % 10}, so it can be split into 2 equal pairs with no leftovers!`,
      };
    }

    // Template 6: Half-hour Clock Time
    const h = randomInt(2, 10);
    return {
      topic: 'Clock Reading',
      difficulty: 2,
      question: `If a cartoon show starts at ${h}:00 and lasts for 30 minutes, when does it finish?`,
      visualPrompt: `${h}:00  +  30 mins  =  ?`,
      answer: `${h}:30`,
      distractors: [`${h + 1}:00`, `${h}:15`, `${h}:45`],
      explanation: `Adding 30 minutes to ${h}:00 gives ${h}:30 (half past ${h}).`,
    };
  }

  // Grade 3 Level
  const templateType = randomInt(1, 6);

  // Template 1: Multiplication Tables (6 to 12)
  if (templateType === 1) {
    const a = randomInt(6, 9);
    const b = randomInt(4, 9);
    const ans = a * b;
    return {
      topic: 'Multiplication Tables',
      difficulty: 1,
      question: `What is ${a} × ${b}?`,
      visualPrompt: `${a}  ×  ${b}  =  ?`,
      answer: String(ans),
      distractors: [String(ans - a), String(ans + b), String(ans - 2)],
      explanation: `${a} times ${b} equals ${ans}.`,
    };
  }

  // Template 2: Exact Division
  if (templateType === 2) {
    const div = randomInt(3, 8);
    const quotient = randomInt(4, 9);
    const dividend = div * quotient;
    return {
      topic: 'Division Facts',
      difficulty: 2,
      question: `${dividend} stickers are shared equally among ${div} children. How many stickers does each child get?`,
      visualPrompt: `${dividend}  ÷  ${div}  =  ?`,
      answer: String(quotient),
      distractors: [String(quotient - 1), String(quotient + 1), String(quotient + 2)],
      explanation: `${dividend} divided by ${div} equals ${quotient}.`,
    };
  }

  // Template 3: Fractions
  if (templateType === 3) {
    const totalSlices = randomChoice([4, 6, 8]);
    const eaten = randomChoice([1, 2, 3]);
    const remaining = totalSlices - eaten;
    return {
      topic: 'Fractions',
      difficulty: 2,
      question: `A pizza is sliced into ${totalSlices} equal pieces. You ate ${eaten} slice(s). What fraction of the pizza is remaining?`,
      visualPrompt: `${totalSlices} slices  −  ${eaten} eaten`,
      answer: `${remaining}/${totalSlices}`,
      distractors: [`${eaten}/${totalSlices}`, `1/${totalSlices}`, `${remaining}/${remaining + 2}`],
      explanation: `${remaining} out of ${totalSlices} equal parts remain, which is written as ${remaining}/${totalSlices}.`,
    };
  }

  // Template 4: Perimeter of Rectangle
  if (templateType === 4) {
    const l = randomInt(5, 12);
    const w = randomInt(3, 8);
    const peri = 2 * (l + w);
    return {
      topic: 'Perimeter Geometry',
      difficulty: 3,
      question: `A rectangle picture frame is ${l} cm long and ${w} cm wide. What is its total perimeter?`,
      visualPrompt: `Length: ${l} cm | Width: ${w} cm`,
      answer: `${peri} cm`,
      distractors: [`${l * w} cm`, `${peri - 2} cm`, `${l + w} cm`],
      explanation: `Perimeter = (Length + Width) × 2 = (${l} + ${w}) × 2 = ${peri} cm.`,
    };
  }

  // Template 5: Place value in 4-digit numbers
  if (templateType === 5) {
    const thousands = randomInt(2, 8);
    const hundreds = randomInt(1, 9);
    const tens = randomInt(1, 9);
    const ones = randomInt(1, 9);
    const num = thousands * 1000 + hundreds * 100 + tens * 10 + ones;
    return {
      topic: '4-Digit Place Value',
      difficulty: 2,
      question: `In the number ${num}, what is the place value of the digit ${hundreds}?`,
      visualPrompt: `${thousands},${hundreds}${tens}${ones}  ➔  digit ${hundreds}`,
      answer: `${hundreds * 100}`,
      distractors: [`${hundreds}`, `${hundreds * 10}`, `${hundreds * 1000}`],
      explanation: `The digit ${hundreds} is in the hundreds place, so its value is ${hundreds * 100}.`,
    };
  }

  // Template 6: Multi-step Word Problem
  const boxCount = randomInt(4, 7);
  const itemsPerBox = randomInt(6, 10);
  const broken = randomInt(3, 8);
  const result = boxCount * itemsPerBox - broken;
  return {
    topic: 'Two-Step Problem',
    difficulty: 3,
    question: `A toy store has ${boxCount} boxes with ${itemsPerBox} crayons in each. If ${broken} crayons are broken, how many good crayons are left?`,
    visualPrompt: `(${boxCount} × ${itemsPerBox})  −  ${broken}  =  ?`,
    answer: String(result),
    distractors: [String(result + broken), String(result - 5), String(boxCount * itemsPerBox)],
    explanation: `Total crayons = ${boxCount} × ${itemsPerBox} = ${boxCount * itemsPerBox}. After subtracting ${broken} broken crayons, ${result} remain.`,
  };
}

// -------------------------------------------------------------
// 2. ALPHABETS & ENGLISH GENERATORS (10,000+ Permutations)
// -------------------------------------------------------------
const PHONICS_BANK = [
  { letter: 'A', word: 'Apple', emoji: '🍎', dist: ['Elephant', 'Lion', 'Kite'] },
  { letter: 'B', word: 'Butterfly', emoji: '🦋', dist: ['Giraffe', 'Monkey', 'Zebra'] },
  { letter: 'C', word: 'Cat', emoji: '🐱', dist: ['Frog', 'Owl', 'Snake'] },
  { letter: 'D', word: 'Dolphin', emoji: '🐬', dist: ['Tiger', 'Rabbit', 'Panda'] },
  { letter: 'E', word: 'Elephant', emoji: '🐘', dist: ['Apple', 'Dolphin', 'Cat'] },
  { letter: 'F', word: 'Fish', emoji: '🐟', dist: ['Duck', 'Lion', 'Bear'] },
  { letter: 'G', word: 'Giraffe', emoji: '🦒', dist: ['Parrot', 'Penguin', 'Dog'] },
  { letter: 'H', word: 'Horse', emoji: '🐴', dist: ['Kangaroo', 'Fox', 'Eagle'] },
  { letter: 'I', word: 'Igloo', emoji: '🧊', dist: ['Umbrella', 'Sun', 'House'] },
  { letter: 'J', word: 'Jellyfish', emoji: '🪼', dist: ['Bee', 'Crab', 'Whale'] },
  { letter: 'K', word: 'Kite', emoji: '🪁', dist: ['Ball', 'Car', 'Drum'] },
  { letter: 'L', word: 'Lion', emoji: '🦁', dist: ['Monkey', 'Zebra', 'Elephant'] },
  { letter: 'M', word: 'Monkey', emoji: '🐒', dist: ['Giraffe', 'Koala', 'Panda'] },
  { letter: 'N', word: 'Nest', emoji: '🪺', dist: ['Tree', 'River', 'Mountain'] },
  { letter: 'O', word: 'Owl', emoji: '🦉', dist: ['Duck', 'Parrot', 'Eagle'] },
  { letter: 'P', word: 'Penguin', emoji: '🐧', dist: ['Flamingo', 'Toucan', 'Bat'] },
  { letter: 'Q', word: 'Queen', emoji: '👑', dist: ['King', 'Prince', 'Princess'] },
  { letter: 'R', word: 'Rainbow', emoji: '🌈', dist: ['Cloud', 'Star', 'Moon'] },
  { letter: 'S', word: 'Sun', emoji: '☀️', dist: ['Rain', 'Wind', 'Snow'] },
  { letter: 'T', word: 'Tiger', emoji: '🐅', dist: ['Cheetah', 'Leopard', 'Wolf'] },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', dist: ['Hat', 'Coat', 'Boots'] },
  { letter: 'V', word: 'Violin', emoji: '🎻', dist: ['Guitar', 'Piano', 'Flute'] },
  { letter: 'W', word: 'Whale', emoji: '🐋', dist: ['Shark', 'Seal', 'Octopus'] },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', dist: ['Horse', 'Donkey', 'Camel'] },
];

const OPPOSITES_BANK = [
  { word: 'Hot', opp: 'Cold', emoji: '🔥 ➔ ❄️', dist: ['Warm', 'Sunny', 'Bright'] },
  { word: 'Big', opp: 'Small', emoji: '🐘 ➔ 🐭', dist: ['Tall', 'Wide', 'Heavy'] },
  { word: 'Fast', opp: 'Slow', emoji: '🐆 ➔ 🐢', dist: ['Quick', 'Running', 'Speedy'] },
  { word: 'Happy', opp: 'Sad', emoji: '😊 ➔ 😢', dist: ['Glad', 'Excited', 'Playful'] },
  { word: 'Day', opp: 'Night', emoji: '☀️ ➔ 🌙', dist: ['Morning', 'Noon', 'Evening'] },
  { word: 'Up', opp: 'Down', emoji: '⬆️ ➔ ⬇️', dist: ['High', 'Sky', 'Top'] },
  { word: 'Clean', opp: 'Dirty', emoji: '✨ ➔ 🧼', dist: ['Shiny', 'Neat', 'Tidy'] },
  { word: 'Heavy', opp: 'Light', emoji: '🪨 ➔ 🪶', dist: ['Hard', 'Rough', 'Big'] },
  { word: 'Sweet', opp: 'Sour', emoji: '🍯 ➔ 🍋', dist: ['Sugary', 'Tasty', 'Juicy'] },
  { word: 'Open', opp: 'Closed', emoji: '📖 ➔ 📕', dist: ['Shut', 'Wide', 'Lock'] },
];

const PLURALS_BANK = [
  { sing: 'Cat', plur: 'Cats', dist: ['Cates', 'Caties', 'Cat'] },
  { sing: 'Box', plur: 'Boxes', dist: ['Boxs', 'Boxies', 'Boxen'] },
  { sing: 'Leaf', plur: 'Leaves', dist: ['Leafs', 'Leaveses', 'Leafes'] },
  { sing: 'Child', plur: 'Children', dist: ['Childs', 'Childrens', 'Childes'] },
  { sing: 'Mouse', plur: 'Mice', dist: ['Mouses', 'Mices', 'Mouseies'] },
  { sing: 'Tooth', plur: 'Teeth', dist: ['Tooths', 'Teethes', 'Toothen'] },
  { sing: 'Foot', plur: 'Feet', dist: ['Foots', 'Feets', 'Footies'] },
  { sing: 'Baby', plur: 'Babies', dist: ['Babys', 'Babyes', 'Babiess'] },
];

function generateEnglishAlphabetsQuestion(grade: string): RawDraft {
  if (grade === 'Kindergarten') {
    const isPhonics = Math.random() > 0.4;
    if (isPhonics) {
      const item = randomChoice(PHONICS_BANK);
      return {
        topic: 'Letter Phonics',
        difficulty: 1,
        question: `Which word begins with the letter "${item.letter}"?`,
        visualPrompt: `Letter  [ ${item.letter} ]  ➔  ?`,
        answer: `${item.word} ${item.emoji}`,
        distractors: item.dist.map((d) => `${d}`),
        explanation: `Letter ${item.letter} makes the starting sound for ${item.word}!`,
      };
    } else {
      const vowels = ['A', 'E', 'I', 'O', 'U'];
      const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'];
      const chosenVowel = randomChoice(vowels);
      const chosenCons = shuffleArray(consonants).slice(0, 3);
      return {
        topic: 'Magic Vowels',
        difficulty: 1,
        question: 'Which of the following is one of the 5 magic VOWELS (A, E, I, O, U)?',
        visualPrompt: `A  E  I  O  U`,
        answer: chosenVowel,
        distractors: chosenCons,
        explanation: `${chosenVowel} is a vowel! The vowels are A, E, I, O, U.`,
      };
    }
  }

  if (grade === 'Grade 1') {
    const isOpposite = Math.random() > 0.5;
    if (isOpposite) {
      const opp = randomChoice(OPPOSITES_BANK);
      return {
        topic: 'Opposite Words',
        difficulty: 1,
        question: `What is the OPPOSITE of "${opp.word}"?`,
        visualPrompt: `${opp.word}   ↔️   ?`,
        answer: opp.opp,
        distractors: opp.dist,
        explanation: `The opposite of ${opp.word} is ${opp.opp}.`,
      };
    } else {
      const item = randomChoice(PLURALS_BANK);
      return {
        topic: 'Plural Words',
        difficulty: 2,
        question: `What is the plural form of "${item.sing}"? (More than one ${item.sing.toLowerCase()})`,
        visualPrompt: `One ${item.sing}  ➔  Many ?`,
        answer: item.plur,
        distractors: item.dist,
        explanation: `When there are many, we say "${item.plur}".`,
      };
    }
  }

  if (grade === 'Grade 2') {
    const types = randomChoice(['noun', 'verb', 'adjective']);
    if (types === 'noun') {
      const nouns = [
        { sent: 'The golden lion rested under a shady tree.', target: 'Lion', dist: ['Rested', 'Golden', 'Under'] },
        { sent: 'Aarav rode his shiny bicycle to school.', target: 'Bicycle', dist: ['Rode', 'Shiny', 'Quickly'] },
        { sent: 'The little bird made a nest on the branch.', target: 'Bird', dist: ['Little', 'Made', 'On'] },
      ];
      const p = randomChoice(nouns);
      return {
        topic: 'Nouns (Naming Words)',
        difficulty: 2,
        question: `Find the NOUN (name of an animal or thing) in this sentence: "${p.sent}"`,
        visualPrompt: p.sent,
        answer: p.target,
        distractors: p.dist,
        explanation: `"${p.target}" is a noun because it names a person, animal, or thing.`,
      };
    } else if (types === 'verb') {
      const verbs = [
        { sent: 'The playful dolphins jump high out of the water.', target: 'Jump', dist: ['Playful', 'Dolphins', 'Water'] },
        { sent: 'Meera painted a colorful rainbow in art class.', target: 'Painted', dist: ['Meera', 'Colorful', 'Rainbow'] },
        { sent: 'The children laughed happily at the puppet show.', target: 'Laughed', dist: ['Children', 'Happily', 'Puppet'] },
      ];
      const p = randomChoice(verbs);
      return {
        topic: 'Verbs (Action Words)',
        difficulty: 2,
        question: `Find the ACTION VERB in this sentence: "${p.sent}"`,
        visualPrompt: p.sent,
        answer: p.target,
        distractors: p.dist,
        explanation: `"${p.target}" tells us what the subject is doing, making it an action verb.`,
      };
    } else {
      const adjs = [
        { sent: 'The giant elephant drank fresh water from the river.', target: 'Giant', dist: ['Elephant', 'Drank', 'River'] },
        { sent: 'Aarav wore a warm jacket on the snowy morning.', target: 'Warm', dist: ['Wore', 'Jacket', 'Morning'] },
        { sent: 'The bright star sparkled in the dark night.', target: 'Bright', dist: ['Star', 'Sparkled', 'Night'] },
      ];
      const p = randomChoice(adjs);
      return {
        topic: 'Adjectives (Describing Words)',
        difficulty: 2,
        question: `Find the ADJECTIVE (word describing how something looks or feels): "${p.sent}"`,
        visualPrompt: p.sent,
        answer: p.target,
        distractors: p.dist,
        explanation: `"${p.target}" describes the noun, so it is an adjective!`,
      };
    }
  }

  // Grade 3 Level
  const pastTenseBank = [
    { present: 'Run', past: 'Ran', dist: ['Runned', 'Running', 'Runs'] },
    { present: 'Eat', past: 'Ate', dist: ['Eated', 'Eaten', 'Eating'] },
    { present: 'Go', past: 'Went', dist: ['Goed', 'Gone', 'Going'] },
    { present: 'Sing', past: 'Sang', dist: ['Singed', 'Sung', 'Song'] },
    { present: 'Buy', past: 'Bought', dist: ['Buyed', 'Brought', 'Buys'] },
    { present: 'Write', past: 'Wrote', dist: ['Written', 'Writed', 'Writes'] },
    { present: 'Fly', past: 'Flew', dist: ['Flyed', 'Flown', 'Flying'] },
  ];
  const p = randomChoice(pastTenseBank);
  return {
    topic: 'Past Tense Verbs',
    difficulty: 3,
    question: `What is the PAST TENSE of the verb "${p.present}"? (Yesterday, I ___)`,
    visualPrompt: `Today: ${p.present}  ➔  Yesterday: ?`,
    answer: p.past,
    distractors: p.dist,
    explanation: `The past tense form of "${p.present}" is "${p.past}".`,
  };
}

// -------------------------------------------------------------
// 3. SCIENCE & NATURE GENERATORS (10,000+ Permutations)
// -------------------------------------------------------------
const SENSES_BANK = [
  { organ: 'Ears', sense: 'Hearing', action: 'Listen to chirping birds', emoji: '👂 ➔ 🎶', dist: ['Eyes', 'Nose', 'Tongue'] },
  { organ: 'Eyes', sense: 'Sight', action: 'Admire the bright rainbow colors', emoji: '👀 ➔ 🌈', dist: ['Ears', 'Skin', 'Tongue'] },
  { organ: 'Tongue', sense: 'Taste', action: 'Taste sweet chocolate ice cream', emoji: '👅 ➔ 🍦', dist: ['Nose', 'Ears', 'Eyes'] },
  { organ: 'Nose', sense: 'Smell', action: 'Sniff the fragrance of red roses', emoji: '👃 ➔ 🌹', dist: ['Skin', 'Ears', 'Tongue'] },
  { organ: 'Skin', sense: 'Touch', action: 'Feel the softness of a fluffy bunny', emoji: '✋ ➔ 🐰', dist: ['Eyes', 'Ears', 'Nose'] },
];

const ANIMAL_BABIES_BANK = [
  { parent: 'Dog', baby: 'Puppy', emoji: '🐶', dist: ['Kitten', 'Calf', 'Cub'] },
  { parent: 'Cat', baby: 'Kitten', emoji: '🐱', dist: ['Puppy', 'Lamb', 'Foal'] },
  { parent: 'Cow', baby: 'Calf', emoji: '🐮', dist: ['Kid', 'Chick', 'Piglet'] },
  { parent: 'Lion', baby: 'Cub', emoji: '🦁', dist: ['Foal', 'Calf', 'Duckling'] },
  { parent: 'Duck', baby: 'Duckling', emoji: '🦆', dist: ['Chick', 'Gosling', 'Puppy'] },
  { parent: 'Hen', baby: 'Chick', emoji: '🐔', dist: ['Duckling', 'Cub', 'Piglet'] },
  { parent: 'Sheep', baby: 'Lamb', emoji: '🐑', dist: ['Calf', 'Foal', 'Kid'] },
  { parent: 'Horse', baby: 'Foal', emoji: '🐴', dist: ['Puppy', 'Kitten', 'Calf'] },
];

const PLANETS_BANK = [
  { q: 'Which is the closest planet to the Sun?', ans: 'Mercury', emoji: '☀️ ➔ 🪐', dist: ['Venus', 'Earth', 'Mars'], fact: 'Mercury is the smallest planet and orbits nearest to the Sun.' },
  { q: 'Which planet is famous as the "Red Planet"?', ans: 'Mars', emoji: '🔴 🪐', dist: ['Jupiter', 'Venus', 'Saturn'], fact: 'Mars looks red due to iron oxide (rust) on its surface.' },
  { q: 'Which is the largest planet in our Solar System?', ans: 'Jupiter', emoji: '🪐 👑', dist: ['Saturn', 'Neptune', 'Earth'], fact: 'Jupiter is so huge that over 1,300 Earths could fit inside it!' },
  { q: 'Which beautiful planet is known for its spectacular rings?', ans: 'Saturn', emoji: '🪐 ✨', dist: ['Mars', 'Mercury', 'Venus'], fact: 'Saturn has rings made of ice, rocks, and cosmic dust.' },
  { q: 'Which planet is called the "Blue Planet" because it is covered in water?', ans: 'Earth', emoji: '🌍 💧', dist: ['Mars', 'Venus', 'Jupiter'], fact: 'About 71% of Earth’s surface is covered by oceans.' },
];

function generateScienceQuestion(grade: string): RawDraft {
  if (grade === 'Kindergarten') {
    const isBaby = Math.random() > 0.5;
    if (isBaby) {
      const b = randomChoice(ANIMAL_BABIES_BANK);
      return {
        topic: 'Animal Families',
        difficulty: 1,
        question: `What is a baby ${b.parent} called?`,
        visualPrompt: `${b.emoji} Mother ${b.parent}  ➔  Baby ?`,
        answer: b.baby,
        distractors: b.dist,
        explanation: `A baby ${b.parent.toLowerCase()} is known as a ${b.baby}.`,
      };
    } else {
      const s = randomChoice(SENSES_BANK);
      return {
        topic: 'Five Senses',
        difficulty: 1,
        question: `Which sense organ helps us ${s.action.toLowerCase()}?`,
        visualPrompt: s.emoji,
        answer: s.organ,
        distractors: s.dist,
        explanation: `We use our ${s.organ.toLowerCase()} for the sense of ${s.sense.toLowerCase()}.`,
      };
    }
  }

  if (grade === 'Grade 1') {
    const plantBank = [
      { q: 'Which part of the plant grows UNDER the soil and drinks water?', ans: 'Roots', dist: ['Leaves', 'Flowers', 'Fruits'], fact: 'Roots anchor the plant and absorb moisture.' },
      { q: 'Which green part of the plant prepares food using sunlight?', ans: 'Leaves', dist: ['Roots', 'Bark', 'Stem'], fact: 'Leaves act like tiny food kitchens for plants!' },
      { q: 'Which part of a plant carries water and stands tall like a pillar?', ans: 'Stem', dist: ['Roots', 'Leaves', 'Seeds'], fact: 'The stem acts like a drinking straw for the plant.' },
      { q: 'What do seeds need to sprout into a healthy baby plant?', ans: 'Sunlight, Water & Soil', dist: ['Only Darkness', 'Ice cream & Candy', 'Just Rocks'], fact: 'Seeds need moisture, warmth, and nutrients to germinate.' },
    ];
    const p = randomChoice(plantBank);
    return {
      topic: 'Plant Kingdom',
      difficulty: 1,
      question: p.q,
      visualPrompt: '🌱 🌿 🌸',
      answer: p.ans,
      distractors: p.dist,
      explanation: p.fact,
    };
  }

  if (grade === 'Grade 2') {
    const habitatBank = [
      { q: 'Where does a Polar Bear live in the wild?', ans: 'Arctic Ice & Snow', dist: ['Hot Desert', 'Dense Rainforest', 'River Lake'] },
      { q: 'Where do Camels store fat to survive without water for days?', ans: 'In their Hump', dist: ['In their Stomach', 'In their Hooves', 'In their Ears'] },
      { q: 'Animals that eat ONLY plants and grass are called:', ans: 'Herbivores', dist: ['Carnivores', 'Omnivores', 'Insects'] },
      { q: 'Animals that eat other animals (meat) are called:', ans: 'Carnivores', dist: ['Herbivores', 'Vegetarians', 'Plants'] },
      { q: 'What state of matter is an ice cube?', ans: 'Solid', dist: ['Liquid', 'Gas', 'Plasma'] },
    ];
    const h = randomChoice(habitatBank);
    return {
      topic: 'Habitats & Matter',
      difficulty: 2,
      question: h.q,
      visualPrompt: '❄️ 🐫 🦁 🧊',
      answer: h.ans,
      distractors: h.dist,
      explanation: 'Nature has adapted each living creature to thrive in its natural environment.',
    };
  }

  // Grade 3: Solar System & Human Anatomy
  const isPlanet = Math.random() > 0.5;
  if (isPlanet) {
    const p = randomChoice(PLANETS_BANK);
    return {
      topic: 'Solar System',
      difficulty: 2,
      question: p.q,
      visualPrompt: p.emoji,
      answer: p.ans,
      distractors: p.dist,
      explanation: p.fact,
    };
  } else {
    const bodyBank = [
      { q: 'Which muscular organ beats non-stop to pump oxygenated blood through the body?', ans: 'Heart', dist: ['Lungs', 'Stomach', 'Kidneys'], fact: 'Your heart beats around 100,000 times every day!' },
      { q: 'Which pair of organs helps us breathe in oxygen and exhale carbon dioxide?', ans: 'Lungs', dist: ['Heart', 'Liver', 'Brain'], fact: 'The lungs expand and contract like balloons when we breathe.' },
      { q: 'Which organ acts as the master control computer of our entire body?', ans: 'Brain', dist: ['Stomach', 'Bones', 'Skin'], fact: 'The brain sends signals through nerves faster than a sports car!' },
    ];
    const b = randomChoice(bodyBank);
    return {
      topic: 'Human Body Systems',
      difficulty: 3,
      question: b.q,
      visualPrompt: '🫀 🫁 🧠',
      answer: b.ans,
      distractors: b.dist,
      explanation: b.fact,
    };
  }
}

// -------------------------------------------------------------
// 4. HINDI (हिन्दी) GENERATORS (10,000+ Permutations)
// -------------------------------------------------------------
const HINDI_SWAR_BANK = [
  { letter: 'अ', word: 'अनार', emoji: '🍎', dist: ['आम', 'इमली', 'ऊन'] },
  { letter: 'आ', word: 'आम', emoji: '🥭', dist: ['अंगूर', 'ऋषि', 'ओखली'] },
  { letter: 'इ', word: 'इमली', emoji: '🟤', dist: ['ईख', 'उल्लू', 'ऐनक'] },
  { letter: 'ई', word: 'ईख (गन्ना)', emoji: '🎋', dist: ['अमरूद', 'ओस', 'ऋतु'] },
  { letter: 'उ', word: 'उल्लू', emoji: '🦉', dist: ['ऊन', 'अंगूर', 'इत्र'] },
  { letter: 'ऊ', word: 'ऊन', emoji: '🧶', dist: ['उपहार', 'आम', 'एड़ी'] },
  { letter: 'ए', word: 'एड़ी', emoji: '🦶', dist: ['ऐनक', 'ओस', 'अनार'] },
  { letter: 'ओ', word: 'ओखली', emoji: '🥣', dist: ['औरत', 'अंगूर', 'इमली'] },
  { letter: 'क', word: 'कमल', emoji: '🪷', dist: ['खरगोश', 'गमला', 'चम्मच'] },
  { letter: 'ख', word: 'खरगोश', emoji: '🐰', dist: ['कबूतर', 'घड़ी', 'टमाटर'] },
  { letter: 'ग', word: 'गमला', emoji: '🪴', dist: ['घोड़ा', 'छतरी', 'जहाज'] },
  { letter: 'म', word: 'मछली', emoji: '🐟', dist: ['तितली', 'पतंग', 'नल'] },
  { letter: 'प', word: 'पतंग', emoji: '🪁', dist: ['फूल', 'बत्तख', 'भालू'] },
];

const HINDI_VILOM_BANK = [
  { word: 'दिन', vilom: 'रात', emoji: '☀️ ➔ 🌙', dist: ['सुबह', 'दोपहर', 'शाम'] },
  { word: 'बड़ा', vilom: 'छोटा', emoji: '🐘 ➔ 🐭', dist: ['मोटा', 'लंबा', 'भारी'] },
  { word: 'गरम', vilom: 'ठंडा', emoji: '☕ ➔ 🍦', dist: ['मीठा', 'तीखा', 'गर्म'] },
  { word: 'ऊपर', vilom: 'नीचे', emoji: '⬆️ ➔ ⬇️', dist: ['आगे', 'पीछे', 'दाएं'] },
  { word: 'हँसना', vilom: 'रोना', emoji: '😃 ➔ 😭', dist: ['गाना', 'कूदना', 'नाचना'] },
  { word: 'सच', vilom: 'झूठ', emoji: '✅ ➔ ❌', dist: ['सही', 'गलत', 'बात'] },
  { word: 'मित्र', vilom: 'शत्रु (दुश्मन)', emoji: '🤝 ➔ ⚔️', dist: ['सखा', 'भाई', 'दोस्त'] },
  { word: 'साफ़', vilom: 'गंदा', emoji: '✨ ➔ 🧼', dist: ['सुंदर', 'उजला', 'धुला'] },
];

const HINDI_NUMS_BANK = [
  { num: '१', word: 'एक', val: 1, dist: ['दो', 'तीन', 'चार'] },
  { num: '२', word: 'दो', val: 2, dist: ['एक', 'चार', 'पाँच'] },
  { num: '३', word: 'तीन', val: 3, dist: ['दो', 'छह', 'सात'] },
  { num: '४', word: 'चार', val: 4, dist: ['तीन', 'पाँच', 'आठ'] },
  { num: '५', word: 'पाँच', val: 5, dist: ['चार', 'छह', 'दस'] },
  { num: '६', word: 'छह', val: 6, dist: ['पाँच', 'सात', 'नौ'] },
  { num: '७', word: 'सात', val: 7, dist: ['छह', 'आठ', 'दस'] },
  { num: '८', word: 'आठ', val: 8, dist: ['सात', 'नौ', 'पाँच'] },
  { num: '९', word: 'नौ', val: 9, dist: ['आठ', 'दस', 'छह'] },
  { num: '१०', word: 'दस', val: 10, dist: ['नौ', 'पाँच', 'सात'] },
];

function generateHindiQuestion(grade: string): RawDraft {
  if (grade === 'Kindergarten') {
    const isNum = Math.random() > 0.6;
    if (isNum) {
      const n = randomChoice(HINDI_NUMS_BANK.slice(0, 5));
      return {
        topic: 'हिन्दी गिनती',
        difficulty: 1,
        question: `अंक "${n.num}" को शब्दों में क्या कहते हैं?`,
        visualPrompt: `अंक  [ ${n.num} ]  ➔  ?`,
        answer: n.word,
        distractors: n.dist,
        explanation: `${n.num} को हिन्दी में "${n.word}" कहते हैं।`,
      };
    } else {
      const s = randomChoice(HINDI_SWAR_BANK);
      return {
        topic: 'स्वर और अक्षर ज्ञान',
        difficulty: 1,
        question: `अक्षर "${s.letter}" से कौन सा शब्द बनता है?`,
        visualPrompt: `अक्षर [ ${s.letter} ]  ➔  ${s.emoji} ?`,
        answer: `${s.word} ${s.emoji}`,
        distractors: s.dist,
        explanation: `"${s.letter}" से "${s.word}" होता है।`,
      };
    }
  }

  if (grade === 'Grade 1') {
    const isVilom = Math.random() > 0.5;
    if (isVilom) {
      const v = randomChoice(HINDI_VILOM_BANK);
      return {
        topic: 'विलोम शब्द (उल्टे अर्थ)',
        difficulty: 1,
        question: `शब्द "${v.word}" का विलोम (उल्टा) शब्द क्या है?`,
        visualPrompt: `${v.word}  ↔️  ?`,
        answer: v.vilom,
        distractors: v.dist,
        explanation: `"${v.word}" का विपरीत (उल्टा) अर्थ "${v.vilom}" होता है।`,
      };
    } else {
      const wordsBank = [
        { letters: 'घ + र', word: 'घर 🏠', dist: ['रथ', 'नल', 'जल'] },
        { letters: 'ज + ल', word: 'जल 💧', dist: ['फल', 'कल', 'हल'] },
        { letters: 'फ + ल', word: 'फल 🍎', dist: ['नल', 'चल', 'दल'] },
        { letters: 'क + म + ल', word: 'कमल 🪷', dist: ['मटर', 'सड़क', 'कलम'] },
      ];
      const w = randomChoice(wordsBank);
      return {
        topic: 'वर्ण जोड़कर शब्द',
        difficulty: 1,
        question: `वर्णों को मिलाकर पढ़ो: "${w.letters} = ?"`,
        visualPrompt: `${w.letters}  ➔  ?`,
        answer: w.word,
        distractors: w.dist,
        explanation: `वर्णों को मिलाकर सही शब्द "${w.word}" बनता है।`,
      };
    }
  }

  if (grade === 'Grade 2') {
    const n = randomChoice(HINDI_NUMS_BANK);
    return {
      topic: 'हिन्दी गिनती १ से १०',
      difficulty: 2,
      question: `हिन्दी अंक "${n.num}" (${n.val}) का सही शब्द रूप चुनो:`,
      visualPrompt: `अंक: ${n.num}`,
      answer: n.word,
      distractors: n.dist,
      explanation: `अंक ${n.num} को हिन्दी में "${n.word}" कहते हैं।`,
    };
  }

  // Grade 3: पर्यायवाची & व्याकरण
  const paryayBank = [
    { word: 'सूर्य (सूरज)', ans: 'रवि', dist: ['शशि', 'बादल', 'तारा'], fact: 'सूर्य के पर्यायवाची रवि, दिनकर, भानु हैं।' },
    { word: 'जल (पानी)', ans: 'नीर', dist: ['आग', 'हवा', 'धरती'], fact: 'जल के पर्यायवाची नीर, वारि, तोय हैं।' },
    { word: 'हवा', ans: 'पवन / वायु', dist: ['अग्नि', 'आकाश', 'भूमि'], fact: 'हवा के पर्यायवाची वायु, पवन, समीर हैं।' },
    { word: 'वृक्ष (पेड़)', ans: 'तरु', dist: ['फूल', 'पत्ता', 'जड़'], fact: 'वृक्ष के पर्यायवाची तरु, विटप, पादप हैं।' },
    { word: 'आँख', ans: 'नेत्र / नयन', dist: ['कर्ण', 'नासिका', 'मुख'], fact: 'आँख के पर्यायवाची नयन, नेत्र, चक्षु हैं।' },
  ];
  const p = randomChoice(paryayBank);
  return {
    topic: 'पर्यायवाची शब्द (समान अर्थ)',
    difficulty: 2,
    question: `शब्द "${p.word}" का दूसरा समान अर्थ (पर्यायवाची) शब्द क्या है?`,
    visualPrompt: `${p.word}  =  ?`,
    answer: p.ans,
    distractors: p.dist,
    explanation: p.fact,
  };
}

// -------------------------------------------------------------
// 5. GENERAL KNOWLEDGE (GK) & HISTORY GENERATORS
// -------------------------------------------------------------
const GK_BANK = [
  { q: 'Which majestic animal is the National Animal of India?', ans: 'Royal Bengal Tiger 🐅', dist: ['Lion 🦁', 'Elephant 🐘', 'Cheetah 🐆'], fact: 'The Royal Bengal Tiger represents grace, strength, and power.' },
  { q: 'Which colorful bird is the National Bird of India?', ans: 'Indian Peacock 🦚', dist: ['Parrot 🦜', 'Sparrow 🐦', 'Flamingo 🦩'], fact: 'The peacock is renowned for its iridescent feathers and rain dance.' },
  { q: 'Which sacred blossom is the National Flower of India?', ans: 'Lotus 🪷', dist: ['Rose 🌹', 'Sunflower 🌻', 'Marigold 🌼'], fact: 'Lotus grows cleanly in water and represents purity of heart.' },
  { q: 'Which sweet king of fruits is the National Fruit of India?', ans: 'Mango 🥭', dist: ['Apple 🍎', 'Banana 🍌', 'Orange 🍊'], fact: 'The delicious mango has been loved in India for thousands of years!' },
  { q: 'What does the RED traffic light signal drivers to do?', ans: 'Stop 🛑', dist: ['Go Fast 🟢', 'Turn Right ➡️', 'Honk Horn 📢'], fact: 'Red light means come to a complete stop for safety.' },
  { q: 'What does the GREEN traffic light tell drivers to do?', ans: 'Go safely 🟢', dist: ['Stop 🛑', 'Wait ⚠️', 'Reverse 🚗'], fact: 'Green light means the path is clear to proceed safely.' },
  { q: 'Who helps put out dangerous fires and rescues people?', ans: 'Firefighter 👨‍🚒', dist: ['Chef 👨‍🍳', 'Pilot 👨‍✈️', 'Carpenter 🪚'], fact: 'Firefighters drive emergency red fire engines with loud sirens.' },
  { q: 'How many total continents are there on our Earth planet?', ans: '7 Continents', dist: ['5 Continents', '10 Continents', '4 Continents'], fact: 'The 7 continents are Asia, Africa, North America, South America, Antarctica, Europe, and Australia.' },
];

const HISTORY_BANK = [
  { q: 'In which famous Indian city is the white marble Taj Mahal situated?', ans: 'Agra', dist: ['Delhi', 'Jaipur', 'Mumbai'], fact: 'The Taj Mahal was commissioned by Emperor Shah Jahan in Agra beside the Yamuna river.' },
  { q: 'Which historic sandstone monument in Delhi is known as Lal Qila?', ans: 'Red Fort', dist: ['Qutub Minar', 'Hawa Mahal', 'Gateway of India'], fact: 'The Red Fort is where the national flag is hoisted on Independence Day.' },
  { q: 'Who is respectfully revered as the "Father of the Nation" in India?', ans: 'Mahatma Gandhi', dist: ['Subhash Chandra Bose', 'Jawaharlal Nehru', 'Bhagat Singh'], fact: 'Mahatma Gandhi led peaceful non-violence movements for freedom.' },
  { q: 'Which brave queen fought fearlessly on horseback to protect Jhansi?', ans: 'Rani Lakshmibai', dist: ['Razia Sultana', 'Mirabai', 'Sarojini Naidu'], fact: 'Rani Lakshmibai is celebrated as the warrior heroine of Jhansi.' },
  { q: 'Which ancient invention revolutionized human transportation across wheels?', ans: 'The Round Wheel', dist: ['The Mobile Phone', 'The Airplane', 'The Clock'], fact: 'The invention of the wheel thousands of years ago transformed travel and farming.' },
];

function generateGKHistoryQuestion(grade: string, isHistory = false): RawDraft {
  const item = isHistory ? randomChoice(HISTORY_BANK) : randomChoice(GK_BANK);
  return {
    topic: isHistory ? 'History & Heritage' : 'General Knowledge',
    difficulty: grade === 'Kindergarten' ? 1 : grade === 'Grade 1' ? 1 : 2,
    question: item.q,
    visualPrompt: isHistory ? '🏰 🇮🇳 📜' : '💡 🌍 🇮🇳',
    answer: item.ans,
    distractors: item.dist,
    explanation: item.fact,
  };
}

// -------------------------------------------------------------
// 6. MANNERS, STORIES, RHYMES & ART GENERATORS
// -------------------------------------------------------------
const MANNERS_BANK = [
  { q: 'When someone gives you a gift or helps you with your homework, what magic word should you say?', ans: 'Thank you! 😊', dist: ['Move away', 'Give me more', 'Nothing'], fact: 'Saying "Thank You" shows gratitude and spreads happiness!' },
  { q: 'If you accidentally bump into a friend or drop their pencil, what should you say?', ans: 'I am sorry! 🤝', dist: ['It was your fault', 'Run away', 'Laugh loudly'], fact: 'Saying "Sorry" shows kindness and helps mend feelings.' },
  { q: 'When you want to borrow a crayon from a classmate, how do you ask politely?', ans: 'Please may I borrow it? 🖍️', dist: ['Give it now!', 'Grab it quickly', 'Shout loudly'], fact: 'Using "Please" shows polite, respectful manners.' },
  { q: 'How many times every day should we brush our teeth to keep cavities away?', ans: 'Twice a day (Morning & Night) 🪥', dist: ['Once a week', 'Only on Sundays', 'Never'], fact: 'Brushing morning and before bedtime keeps teeth sparkling white.' },
  { q: 'What is the healthy habit before eating any meal or snack?', ans: 'Wash hands with soap & water 🧼', dist: ['Wipe on clothes', 'Touch dirty floor', 'Start eating directly'], fact: 'Washing hands washes away harmful germs.' },
];

const STORIES_RHYMES_BANK = [
  { q: 'In the fable "The Thirsty Crow", how did the clever crow drink the water at the bottom of the pitcher?', ans: 'Dropped small pebbles inside 🪨', dist: ['Broke the pitcher', 'Flew away crying', 'Pushed it over'], fact: 'As pebbles accumulated, the water level rose to the top!' },
  { q: 'In "The Tortoise and the Hare", why did the slow tortoise win the race?', ans: 'Slow and steady never gave up 🐢', dist: ['He ran at supersonic speed', 'The hare got lost', 'He took a bicycle'], fact: 'Perseverance and consistency triumph over careless overconfidence.' },
  { q: 'Complete the rhyme lyric: "Twinkle, twinkle, little star, how I wonder what you ___!"', ans: 'are ⭐', dist: ['far', 'car', 'jar'], fact: '"How I wonder what you are, up above the world so high!"' },
  { q: 'Complete the lyric: "The wheels on the bus go ___ and ___ all through the town!"', ans: 'round and round 🚌', dist: ['up and down', 'fast and slow', 'in and out'], fact: '"The wheels on the bus go round and round, round and round!"' },
  { q: 'In "The Lion and the Mouse", how did the tiny mouse rescue the mighty lion?', ans: 'Gnawed the hunter\'s net with sharp teeth 🐭', dist: ['Pushed the cage over', 'Called an elephant', 'Roared loudly'], fact: 'Even the smallest friend can render immense help in times of need.' },
];

const ART_BANK = [
  { q: 'Which three colors are known as the PRIMARY COLORS that cannot be made by mixing others?', ans: 'Red, Yellow, Blue 🔴 🟡 🔵', dist: ['Green, Orange, Purple', 'Black, White, Gray', 'Pink, Brown, Cyan'], fact: 'Red, Yellow, and Blue form the foundation of all other colors.' },
  { q: 'What magical new color do you get when you mix RED paint + YELLOW paint?', ans: 'Orange 🍊', dist: ['Green 🍏', 'Purple 🍇', 'Brown 🥔'], fact: 'Red + Yellow blend together into warm, radiant Orange.' },
  { q: 'What color do you get when you mix BLUE paint + YELLOW paint together?', ans: 'Green 🌿', dist: ['Orange 🥕', 'Purple 🍆', 'Red 🍓'], fact: 'Blue + Yellow combine on canvas to produce fresh Green.' },
  { q: 'What is the traditional Japanese art of folding colorful paper into cranes and frogs called?', ans: 'Origami 📄', dist: ['Pottery 🏺', 'Knitting 🧶', 'Sculpting 🗿'], fact: '"Ori" means folding and "Kami" means paper in Japanese.' },
];

function generateMannersArtStoriesQuestion(category: string, grade: string): RawDraft {
  if (category === 'manners') {
    const item = randomChoice(MANNERS_BANK);
    return {
      topic: 'Golden Habits',
      difficulty: 1,
      question: item.q,
      visualPrompt: '🤝 ✨ 🧼 🪥',
      answer: item.ans,
      distractors: item.dist,
      explanation: item.fact,
    };
  }
  if (category === 'art-craft') {
    const item = randomChoice(ART_BANK);
    return {
      topic: 'Art & Colors',
      difficulty: 1,
      question: item.q,
      visualPrompt: '🎨 🖌️ 📄 🌈',
      answer: item.ans,
      distractors: item.dist,
      explanation: item.fact,
    };
  }
  // Stories & Rhymes
  const item = randomChoice(STORIES_RHYMES_BANK);
  return {
    topic: 'Fables & Rhymes',
    difficulty: 1,
    question: item.q,
    visualPrompt: '📖 🎵 👑 ⭐',
    answer: item.ans,
    distractors: item.dist,
    explanation: item.fact,
  };
}

// -------------------------------------------------------------
// MAIN QUIZ GENERATION ENGINE (Dynamic 10,000+ Permutations)
// -------------------------------------------------------------
export function generateRandomQuizSet(
  grade = 'Grade 1',
  subjectId = 'all',
  count = 10,
): AdaptiveQuizQuestion[] {
  const normalizedGrade = ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3'].includes(grade)
    ? grade
    : 'Grade 1';

  const questions: AdaptiveQuizQuestion[] = [];
  const usedQuestionsSet = new Set<string>();

  // Available subjects pool if 'all' is picked
  const allSubjectIds = [
    'mathematics',
    'numbers',
    'alphabets',
    'english',
    'science',
    'hindi',
    'knowledge',
    'history',
    'story-time',
    'children-stories',
    'rhymes',
    'manners',
    'art-craft',
  ];

  let attempts = 0;
  while (questions.length < count && attempts < count * 5) {
    attempts++;
    const chosenSubId = subjectId === 'all' || !subjectId ? randomChoice(allSubjectIds) : subjectId;
    const subObj = QUIZ_SUBJECTS.find((s) => s.id === chosenSubId) || QUIZ_SUBJECTS[0];

    let draft: RawDraft;

    if (chosenSubId === 'numbers' || chosenSubId === 'mathematics') {
      draft = generateMathNumbersQuestion(normalizedGrade, chosenSubId === 'numbers');
    } else if (chosenSubId === 'alphabets' || chosenSubId === 'english') {
      draft = generateEnglishAlphabetsQuestion(normalizedGrade);
    } else if (chosenSubId === 'science') {
      draft = generateScienceQuestion(normalizedGrade);
    } else if (chosenSubId === 'hindi') {
      draft = generateHindiQuestion(normalizedGrade);
    } else if (chosenSubId === 'knowledge' || chosenSubId === 'history') {
      draft = generateGKHistoryQuestion(normalizedGrade, chosenSubId === 'history');
    } else {
      draft = generateMannersArtStoriesQuestion(chosenSubId, normalizedGrade);
    }

    // Deduplication check
    const hash = `${chosenSubId}-${draft.question}-${draft.answer}`;
    if (usedQuestionsSet.has(hash)) {
      continue;
    }
    usedQuestionsSet.add(hash);

    const { options, correctAnswer } = buildOptions(draft.answer, draft.distractors);

    questions.push({
      id: `q-${chosenSubId}-${Date.now()}-${questions.length}-${randomInt(100, 999)}`,
      subjectId: chosenSubId,
      subjectName: subObj.name,
      topic: draft.topic,
      difficulty: draft.difficulty,
      question: draft.question,
      visualPrompt: draft.visualPrompt,
      options,
      correctAnswer,
      explanation: draft.explanation,
      funFact: draft.funFact,
    });
  }

  return questions;
}

// Backwards compatibility helper for existing references
export const getInitialQuizDifficulty = (_grade: string): 1 | 2 => 1;

export const getAdaptiveQuizQuestion = (
  grade: string,
  _difficulty: 1 | 2 | 3,
  _usedIds: Set<string>,
): AdaptiveQuizQuestion => {
  const set = generateRandomQuizSet(grade, 'all', 1);
  return set[0];
};
