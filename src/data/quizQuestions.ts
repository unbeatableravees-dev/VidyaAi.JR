export interface AdaptiveQuizQuestion {
  id: string;
  topic: string;
  difficulty: 1 | 2 | 3;
  question: string;
  visualPrompt: string;
  options: { key: string; value: string }[];
  correctAnswer: string;
  explanation: string;
}

interface QuestionSeed {
  topic: string;
  difficulty: 1 | 2 | 3;
  question: string;
  visualPrompt: string;
  answer: string;
  distractors: [string, string, string];
  explanation: string;
}

const makeQuestions = (grade: string, seeds: QuestionSeed[]): AdaptiveQuizQuestion[] =>
  seeds.map((seed, index) => {
    const correctIndex = index % 4;
    const values = [...seed.distractors];
    values.splice(correctIndex, 0, seed.answer);
    const options = values.map((value, optionIndex) => ({
      key: String.fromCharCode(65 + optionIndex),
      value,
    }));

    return {
      id: `${grade}-${index + 1}`,
      topic: seed.topic,
      difficulty: seed.difficulty,
      question: seed.question,
      visualPrompt: seed.visualPrompt,
      options,
      correctAnswer: options[correctIndex].key,
      explanation: seed.explanation,
    };
  });

const QUESTION_BANK: Record<string, AdaptiveQuizQuestion[]> = {
  Kindergarten: makeQuestions('kg', [
    { topic: 'Counting', difficulty: 1, question: 'Count the stars: ⭐ ⭐ ⭐. How many are there?', visualPrompt: '⭐ ⭐ ⭐', answer: '3', distractors: ['2', '4', '5'], explanation: 'There are 3 stars.' },
    { topic: 'Numbers', difficulty: 1, question: 'Which number comes after 6?', visualPrompt: '5  →  6  →  ?', answer: '7', distractors: ['5', '8', '4'], explanation: '7 comes after 6.' },
    { topic: 'Shapes', difficulty: 1, question: 'Which shape has three sides?', visualPrompt: '🔺  🟡  🟥', answer: 'Triangle', distractors: ['Circle', 'Square', 'Star'], explanation: 'A triangle has 3 sides.' },
    { topic: 'Patterns', difficulty: 1, question: 'What comes next? 🔴 🔵 🔴 🔵 ?', visualPrompt: '🔴  🔵  🔴  🔵  ?', answer: '🔴', distractors: ['🔵', '🟢', '🟡'], explanation: 'The colors take turns, so red comes next.' },
    { topic: 'Addition', difficulty: 2, question: 'You have 3 apples and get 2 more. How many apples now?', visualPrompt: '🍎 🍎 🍎  +  🍎 🍎', answer: '5', distractors: ['4', '6', '3'], explanation: '3 + 2 = 5 apples.' },
    { topic: 'Number order', difficulty: 2, question: 'Which number is missing? 2, 3, __, 5', visualPrompt: '2  →  3  →  ?  →  5', answer: '4', distractors: ['1', '6', '3'], explanation: 'The numbers count up by 1: 2, 3, 4, 5.' },
    { topic: 'Comparing', difficulty: 2, question: 'Which number is bigger: 8 or 5?', visualPrompt: '8  or  5', answer: '8', distractors: ['5', 'They are equal', '3'], explanation: '8 is greater than 5.' },
    { topic: 'Subtraction', difficulty: 2, question: 'There are 5 ducks. 2 swim away. How many remain?', visualPrompt: '🦆 🦆 🦆 🦆 🦆  −  2', answer: '3', distractors: ['2', '4', '7'], explanation: '5 − 2 = 3 ducks.' },
    { topic: 'Reasoning', difficulty: 3, question: 'Mia has 4 blocks. She needs 6 blocks to build a tower. How many more does she need?', visualPrompt: '4 blocks  +  ?  =  6 blocks', answer: '2', distractors: ['1', '3', '4'], explanation: '4 + 2 = 6, so she needs 2 more blocks.' },
    { topic: 'Patterns', difficulty: 3, question: 'What comes next? ⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ?', visualPrompt: '⭐  ⭐  🌙  ⭐  ⭐  🌙  ?', answer: '⭐', distractors: ['🌙', '☀️', '🔵'], explanation: 'The repeating group is star, star, moon.' },
    { topic: 'Addition', difficulty: 3, question: 'A basket has 4 red balls and 3 blue balls. How many balls altogether?', visualPrompt: '🔴 🔴 🔴 🔴  +  🔵 🔵 🔵', answer: '7', distractors: ['6', '8', '5'], explanation: '4 + 3 = 7 balls.' },
    { topic: 'Number sense', difficulty: 3, question: 'Which number is one less than 10?', visualPrompt: '10  −  1  =  ?', answer: '9', distractors: ['8', '11', '10'], explanation: 'One less than 10 is 9.' },
  ]),
  'Grade 1': makeQuestions('g1', [
    { topic: 'Addition', difficulty: 1, question: 'What is 4 + 3?', visualPrompt: '4  +  3  =  ?', answer: '7', distractors: ['6', '8', '9'], explanation: '4 + 3 = 7.' },
    { topic: 'Place value', difficulty: 1, question: 'How many tens are in  thirty? (30)', visualPrompt: '30 = ? tens', answer: '3', distractors: ['2', '30', '1'], explanation: '30 is made of 3 tens.' },
    { topic: 'Subtraction', difficulty: 1, question: 'What is 9 − 4?', visualPrompt: '9  −  4  =  ?', answer: '5', distractors: ['4', '6', '13'], explanation: '9 − 4 = 5.' },
    { topic: 'Patterns', difficulty: 1, question: 'What comes next? 2, 4, 6, __', visualPrompt: '2  →  4  →  6  →  ?', answer: '8', distractors: ['7', '9', '10'], explanation: 'The pattern adds 2 each time.' },
    { topic: 'Word problems', difficulty: 2, question: 'There are 8 birds. 3 fly away. How many are left?', visualPrompt: '8 birds  −  3 birds  =  ?', answer: '5', distractors: ['11', '4', '6'], explanation: '8 − 3 = 5 birds.' },
    { topic: 'Place value', difficulty: 2, question: 'Which number has 4 tens and 2 ones?', visualPrompt: '4 tens  +  2 ones', answer: '42', distractors: ['24', '402', '46'], explanation: '4 tens are 40; 40 + 2 = 42.' },
    { topic: 'Addition', difficulty: 2, question: 'What is 16 + 7?', visualPrompt: '16  +  7  =  ?', answer: '23', distractors: ['22', '24', '13'], explanation: '16 + 7 = 23.' },
    { topic: 'Measurement', difficulty: 2, question: 'A pencil is 12 cm long. A crayon is 8 cm long. How much longer is the pencil?', visualPrompt: '12 cm  −  8 cm  =  ?', answer: '4 cm', distractors: ['3 cm', '20 cm', '5 cm'], explanation: '12 − 8 = 4 cm.' },
    { topic: 'Reasoning', difficulty: 3, question: 'I am greater than 30 and less than 40. My ones digit is 6. What number am I?', visualPrompt: '30 < ? < 40  (ones digit: 6)', answer: '36', distractors: ['26', '46', '63'], explanation: '36 is between 30 and 40 and has 6 ones.' },
    { topic: 'Word problems', difficulty: 3, question: 'Sam has 14 marbles. He gives 6 away, then wins 3. How many does he have now?', visualPrompt: '14  −  6  +  3  =  ?', answer: '11', distractors: ['9', '17', '13'], explanation: '14 − 6 = 8, and 8 + 3 = 11.' },
    { topic: 'Time', difficulty: 3, question: 'A game starts at 2 o’clock and lasts 1 hour. When does it end?', visualPrompt: '2:00  +  1 hour  =  ?', answer: '3:00', distractors: ['1:00', '2:30', '4:00'], explanation: 'One hour after 2 o’clock is 3 o’clock.' },
    { topic: 'Number patterns', difficulty: 3, question: 'Find the missing number: 5, 10, 15, __, 25', visualPrompt: '5  →  10  →  15  →  ?  →  25', answer: '20', distractors: ['18', '19', '30'], explanation: 'The pattern increases by 5 each time.' },
  ]),
  'Grade 2': makeQuestions('g2', [
    { topic: 'Addition', difficulty: 1, question: 'What is 28 + 15?', visualPrompt: '28  +  15  =  ?', answer: '43', distractors: ['33', '42', '53'], explanation: '28 + 15 = 43.' },
    { topic: 'Subtraction', difficulty: 1, question: 'What is 52 − 20?', visualPrompt: '52  −  20  =  ?', answer: '32', distractors: ['42', '30', '72'], explanation: 'Subtract 2 tens: 52 − 20 = 32.' },
    { topic: 'Place value', difficulty: 1, question: 'In 364, what is the value of the digit 6?', visualPrompt: '364  →  6 is in the tens place', answer: '60', distractors: ['6', '600', '64'], explanation: 'The 6 is in the tens place, so its value is 60.' },
    { topic: 'Patterns', difficulty: 1, question: 'What comes next? 7, 14, 21, __', visualPrompt: '7  →  14  →  21  →  ?', answer: '28', distractors: ['27', '29', '35'], explanation: 'The pattern adds 7 each time.' },
    { topic: 'Multiplication', difficulty: 2, question: 'There are 4 baskets with 3 oranges in each. How many oranges are there?', visualPrompt: '4 groups of 3  =  ?', answer: '12', distractors: ['7', '10', '14'], explanation: '4 × 3 = 12 oranges.' },
    { topic: 'Word problems', difficulty: 2, question: 'A library has 36 storybooks and 18 science books. How many books altogether?', visualPrompt: '36  +  18  =  ?', answer: '54', distractors: ['44', '52', '64'], explanation: '36 + 18 = 54 books.' },
    { topic: 'Money', difficulty: 2, question: 'You have ₹50 and spend ₹27. How much money is left?', visualPrompt: '₹50  −  ₹27  =  ?', answer: '₹23', distractors: ['₹33', '₹27', '₹77'], explanation: '₹50 − ₹27 = ₹23.' },
    { topic: 'Time', difficulty: 2, question: 'A class begins at 10:15 and ends at 10:45. How long is the class?', visualPrompt: '10:15  →  10:45', answer: '30 minutes', distractors: ['15 minutes', '45 minutes', '1 hour'], explanation: 'From :15 to :45 is 30 minutes.' },
    { topic: 'Division', difficulty: 3, question: '24 stickers are shared equally among 4 friends. How many stickers does each friend get?', visualPrompt: '24  ÷  4  =  ?', answer: '6', distractors: ['4', '8', '20'], explanation: '24 ÷ 4 = 6 stickers each.' },
    { topic: 'Fractions', difficulty: 3, question: 'A pizza is cut into 4 equal slices. You eat 1 slice. What fraction is left?', visualPrompt: '4 equal slices − 1 slice', answer: '3/4', distractors: ['1/4', '2/4', '4/3'], explanation: '3 of the 4 equal slices remain, so 3/4 is left.' },
    { topic: 'Measurement', difficulty: 3, question: 'A ribbon is 1 metre long. How many centimetres long is it?', visualPrompt: '1 metre  =  ? centimetres', answer: '100 cm', distractors: ['10 cm', '50 cm', '1,000 cm'], explanation: '1 metre equals 100 centimetres.' },
    { topic: 'Reasoning', difficulty: 3, question: 'A number has 5 tens and is 3 more than 50. What is the number?', visualPrompt: '50  +  3  =  ?', answer: '53', distractors: ['35', '57', '503'], explanation: 'Five tens make 50; 3 more is 53.' },
  ]),
  'Grade 3': makeQuestions('g3', [
    { topic: 'Multiplication', difficulty: 1, question: 'A box holds 6 pencils. How many pencils are in 7 boxes?', visualPrompt: '7 groups of 6  =  ?', answer: '42', distractors: ['13', '36', '48'], explanation: '7 × 6 = 42 pencils.' },
    { topic: 'Division', difficulty: 1, question: 'Share 48 stickers equally among 6 students. How many does each student get?', visualPrompt: '48  ÷  6  =  ?', answer: '8', distractors: ['6', '7', '9'], explanation: '48 ÷ 6 = 8 stickers each.' },
    { topic: 'Fractions', difficulty: 1, question: 'A chocolate bar has 8 equal pieces. Riya eats 3. What fraction is left?', visualPrompt: '8 equal pieces − 3 pieces', answer: '5/8', distractors: ['3/8', '3/5', '8/5'], explanation: '5 of the 8 pieces remain, so 5/8 is left.' },
    { topic: 'Place value', difficulty: 1, question: 'What is the value of 7 in 3,742?', visualPrompt: '3,742  →  7 is in the hundreds place', answer: '700', distractors: ['70', '7', '7,000'], explanation: 'The 7 is in the hundreds place, so its value is 700.' },
    { topic: 'Word problems', difficulty: 1, question: 'A school bus has 36 children. At the next stop, 18 more get on. How many children are on the bus?', visualPrompt: '36  +  18  =  ?', answer: '54', distractors: ['44', '52', '64'], explanation: '36 + 18 = 54 children.' },
    { topic: 'Multiplication', difficulty: 2, question: 'A gardener plants 8 rows of 9 flowers. How many flowers does she plant?', visualPrompt: '8 rows × 9 flowers  =  ?', answer: '72', distractors: ['17', '64', '81'], explanation: '8 × 9 = 72 flowers.' },
    { topic: 'Two-step problems', difficulty: 2, question: 'A shop had 125 balloons. It sold 48 in the morning and 37 in the afternoon. How many are left?', visualPrompt: '125  −  48  −  37  =  ?', answer: '40', distractors: ['50', '77', '60'], explanation: '125 − 48 = 77, then 77 − 37 = 40 balloons.' },
    { topic: 'Fractions', difficulty: 2, question: 'Which fraction is equal to one half?', visualPrompt: '1/2  =  ?', answer: '2/4', distractors: ['1/4', '2/3', '3/4'], explanation: 'Two of four equal parts is the same amount as one of two.' },
    { topic: 'Time', difficulty: 2, question: 'A movie starts at 2:35 pm and lasts 50 minutes. When does it finish?', visualPrompt: '2:35 pm  +  50 minutes  =  ?', answer: '3:25 pm', distractors: ['3:15 pm', '2:85 pm', '3:35 pm'], explanation: '25 minutes takes us to 3:00, then 25 more minutes is 3:25 pm.' },
    { topic: 'Perimeter', difficulty: 2, question: 'A rectangle is 8 cm long and 5 cm wide. What is its perimeter?', visualPrompt: '8 cm + 5 cm + 8 cm + 5 cm', answer: '26 cm', distractors: ['13 cm', '40 cm', '21 cm'], explanation: 'Perimeter = 8 + 5 + 8 + 5 = 26 cm.' },
    { topic: 'Division', difficulty: 3, question: 'A baker packs 95 cookies into boxes of 8. How many full boxes can she fill, and how many cookies remain?', visualPrompt: '95  ÷  8  =  ? remainder ?', answer: '11 boxes, 7 left', distractors: ['12 boxes, 1 left', '10 boxes, 15 left', '11 boxes, 5 left'], explanation: '8 × 11 = 88, and 95 − 88 = 7 cookies remain.' },
    { topic: 'Number patterns', difficulty: 3, question: 'Find the missing number: 4, 9, 19, 39, __', visualPrompt: '4  →  9  →  19  →  39  →  ?', answer: '79', distractors: ['59', '78', '49'], explanation: 'Each number is doubled, then 1 is added: 39 × 2 + 1 = 79.' },
    { topic: 'Fractions', difficulty: 3, question: 'A cake is cut into 6 equal slices. Three children each eat one slice. What fraction of the cake remains?', visualPrompt: '6 equal slices − 3 slices', answer: '3/6 (or 1/2)', distractors: ['1/3', '2/6', '3/3'], explanation: '3 of 6 slices remain. 3/6 is equivalent to 1/2.' },
    { topic: 'Two-step problems', difficulty: 3, question: 'A class collects 6 bags with 24 cans in each bag. They recycle 38 cans. How many cans are not recycled yet?', visualPrompt: '(6 × 24) − 38  =  ?', answer: '106', distractors: ['96', '124', '182'], explanation: '6 × 24 = 144, and 144 − 38 = 106 cans.' },
    { topic: 'Measurement', difficulty: 3, question: 'A path is 2 metres 35 centimetres long. How many centimetres is that?', visualPrompt: '2 m 35 cm  =  ? cm', answer: '235 cm', distractors: ['205 cm', '253 cm', '2,035 cm'], explanation: '2 metres = 200 cm; 200 + 35 = 235 cm.' },
  ]),
};

const gradeDifficulty = (grade: string): 1 | 2 =>
  grade === 'Grade 2' || grade === 'Grade 3' ? 2 : 1;

export const getInitialQuizDifficulty = (grade: string): 1 | 2 => gradeDifficulty(grade);

export const getAdaptiveQuizQuestion = (
  grade: string,
  difficulty: 1 | 2 | 3,
  usedIds: Set<string>,
): AdaptiveQuizQuestion | undefined => {
  const questionGrade = QUESTION_BANK[grade] ? grade : 'Grade 1';
  const remaining = QUESTION_BANK[questionGrade].filter((question) => !usedIds.has(question.id));

  return remaining.sort(
    (first, second) =>
      Math.abs(first.difficulty - difficulty) - Math.abs(second.difficulty - difficulty),
  )[0];
};
