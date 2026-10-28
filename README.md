<div align="center">

# 🌟 VidyaAI Jr. (Junior)
### *Let's Make Learning Fun, Playful & Magical!* 🚀✨

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

<br/>

<img src="./public/logo.svg" alt="VidyaAI Jr Logo" width="120" height="120" />

<p align="center">
  <b>VidyaAI Jr.</b> is an interactive, gamified e-learning platform specially crafted for young curious minds (Kindergarten to Grade 3). Built with modern glossy glassmorphism, playful 3D illustrations, interactive Web Audio API sound synthesis, 10 playable interactive mini-games, simulated video players, and rewarding quizzes!
</p>

---

</div>

## 🎯 Key Highlights & Features

### 👦 1. Personalized Onboarding & Character Creation
* **Welcome Screen First:** Every learning journey begins with the child entering their name, picking a lovable cartoon avatar (*Aarav*, *Ananya*, *Kabir*, *Meera*), and selecting their grade.
* **Celebratory Audio & Confetti:** Submitting their name triggers voice narration welcoming them by name, along with colorful celebratory confetti.
* **Dynamic Personalization:** The child's chosen name dynamically personalizes greetings, progress reports, and achievement screens across the platform.

### 📚 2. Complete 13 Learning Categories (Full Curriculum)
Every single category is fully equipped with dedicated chapter pages, animated video playlists, interactive practice minigames, and fun trivia:
1. 🔢 **Numbers & Counting** (1 to 100, number line, greater/smaller, odd/even party)
2. 🔤 **Alphabets & Phonics** (A-Z safari, capital vs small, vowels A E I O U, 3-letter words)
3. 📖 **Story Time** (Panchatantra classics, The Thirsty Crow, Magic Paintbrush)
4. 🎵 **Musical Rhymes** (Twinkle Twinkle 3D, Lakdi Ki Kathi, Wheels on the Bus, Chanda Mama)
5. 🔬 **Science & Experiments** (Five senses, Sink or float, Seed germination, Rainbow colors)
6. 💡 **General Knowledge** (Solar system exploration, Community helpers, Animal habitats, Road safety)
7. 🏰 **History & Great Forts** (King Ashoka, Taj Mahal secrets, Rani Lakshmibai, Indus Valley)
8. 🤝 **Manners & Golden Habits** (Please/Sorry/Thank You, Table manners, Cleanliness, Sharing)
9. 📝 **English Grammar** (Action verbs, Opposite pairs, Sight words, Sentence builder)
10. ➕ **Mathematics Adventures** (Addition with apples, Subtraction safari, Shapes, Clock reading)
11. 🇮🇳 **हिन्दी सीखो (Hindi)** (स्वर और व्यंजन ज्ञान, दो अक्षर वाले शब्द, कविताएं, हिन्दी गिनती १ से १०)
12. 🦁 **Children Stories** (Birbal ki Khichdi, Tenali Raman, Monkey & Crocodile, Blue Jackal)
13. 🎨 **Creative Art & Origami** (Color mixing, Origami jumping frog, Fingerprint art, Clay modeling)

### 🎮 3. Interactive Practice Games Arcade
* **10 Playable Interactive Activities:** Dedicated practice games covering Math, Phonics, Patterns, Colors, and Shapes.
* **Mini-Game Modals:**
  - *Bubble Pop Math:* Pop glowing bubbles matching target number equations.
  - *Colour the Shapes:* Interactive paint palette to color stars, circles, hearts, and triangles.
  - *Pattern Play:* Sequence completion with fruits, emojis, and geometric shapes.
  - *Alphabet Animals:* Tap the animal or object matching the letter phonics.
  - *Feed the Bunny:* Count and feed crunchy carrots to an animated bunny.
  - *Shape Match & Tracing:* Touch and identify geometric 3D shapes.
* **Instant Star Rewards:** Earning stars and unlocking achievement badges on victory with particle confetti.

### 🎬 4. Simulated Interactive Video Player Modal
* **Full-Featured 16:9 Player:** Simulated HD playback with animated scenes, scrub bar, like counter, and speed indicator.
* **Pedagogical Tabs:** Switch seamlessly between *Lesson Summary*, *Learning Goals*, and *Interactive Comments*.
* **Direct Quiz Bridge:** Launch straight into the chapter quiz from the video screen.

### ❓ 5. Interactive Quiz Time & Results
* **Visual Math Equations:** Real-time rendered colorful 3D objects (juicy red apples with gloss shine) illustrating problems.
* **Instant Positive Reinforcement:** Selecting answers triggers playful star animations, cheerful chimes, and score tracking.
* **Celebration Banner:** Confetti bursts, animated score gauge ring, and hexagonal badges.

### ⚙️ 6. Profile Editing & Settings
* **Live Profile Update:** Easily update child's name, avatar character, and grade level (*Kindergarten*, *Grade 1*, *Grade 2*, *Grade 3*) with instant save across the app.
* **Sound Controls:** Toggle button and game chime sound effects on or off.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Ultra-responsive component architecture |
| **Language** | **TypeScript 5** | Strong typing, safer code, and IntelliSense |
| **Build Tool** | **Vite 6** | Instant Hot Module Replacement (HMR) & rapid builds |
| **Styling** | **Tailwind CSS v4** | Modern utility-first CSS with custom glassmorphism |
| **Icons** | **Lucide React** | Consistent, crisp, kid-friendly vector iconography |
| **Celebrations** | **Canvas Confetti** | High-performance particle physics celebration bursts |
| **Audio** | **Web Audio API** | Zero-dependency sound synthesis (chimes, pops, fanfares) |

---

## 📁 Project Architecture

```
VidyaAiKids/
├── public/
│   └── logo.svg                 # VidyaAI Jr custom graduation star logo
├── src/
│   ├── components/
│   │   ├── illustrations/       # Handcrafted 3D SVGs (Apples, Blackboard, Badges, Characters)
│   │   ├── layout/              # Sidebar (with Jr branding & arcade tab) & Header (Profile, Search)
│   │   ├── modals/              # Interactive Game & Video Modals
│   │   │   ├── InteractiveGameModal.tsx # Playable mini-games (Bubble Pop, Color shapes, Feed bunny)
│   │   │   └── VideoPlayerModal.tsx     # Simulated 16:9 video player with notes and comments
│   │   └── screens/             # Dedicated Screen Views
│   │       ├── WelcomeScreen.tsx          # Child name & avatar onboarding
│   │       ├── HomeScreen.tsx             # Hero banner, 13 categories, practice cards, featured videos
│   │       ├── PracticeScreen.tsx         # Dedicated Interactive Practice Game Arcade
│   │       ├── CategoryDetailScreen.tsx   # Detailed category syllabus & games
│   │       ├── CategoriesScreen.tsx       # All 13 categories directory
│   │       ├── VideoLessonScreen.tsx      # Video player & blackboard simulation
│   │       ├── QuizScreen.tsx             # Interactive visual quiz
│   │       ├── QuizResultsScreen.tsx      # Celebration, score ring & badges
│   │       ├── ProgressScreen.tsx         # Report card & streak tracking
│   │       └── SettingsScreen.tsx         # Live profile editing (name, avatar, grade, sound toggle)
│   ├── data/
│   │   ├── learningData.ts      # 13 Categories, practice cards, badges, questions
│   │   └── categoryLessons.ts   # Deep mock curriculum data for all 13 subjects
│   ├── utils/
│   │   └── audio.ts             # Web Audio API sound synthesizer
│   ├── types.ts                 # TypeScript interfaces
│   ├── App.tsx                  # Core app state & navigation router
│   ├── index.css                # Glossy glassmorphism utilities & animations
│   └── main.tsx                 # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** or **pnpm**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/unbeatableravees-dev/VidyaAi.JR.git
cd VidyaAi.JR
```

2. Install dependencies:
```bash
npm install
```

3. Launch the development server:
```bash
npm run dev
```

4. Open in your browser:
```
http://localhost:5173
```

### Production Build
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 💛 Made for Young Learners
Designed with love, vibrant colors, accessible typography, and positive reinforcement to make early childhood education joyful and exciting!
