<div align="center">

# VidyaAI Jr.
### Playful, personalized learning for curious kids

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**VidyaAI Jr.** is a browser-based learning app with a personalized student profile, subject lessons, quizzes, games, language academies, and interactive discovery activities. The interface is responsive and designed for children.

</div>

## What is in the app

### Student profile and navigation

- First-run setup asks for a display name, one of **8 character avatars**, age, class, community, and a favorite starting activity.
- Class choices in onboarding are **Nursery / KG, Classes 1–5, and Classes 6–8**.
- Community choices configure the learning focus and default language pairing:
  - Islam — English and Urdu
  - Sikhism — English and Punjabi
  - Hinduism — English and Hindi
  - Universal / All — English
- Each profile has a unique ID and is saved in browser `localStorage`. Learning progress is stored separately for each profile on that browser/device; there is no account service or cloud sync.
- A fixed sidebar provides Home, Categories, Islamic Teachings or the relevant language academy, Explorer, Practice Games, My Learning, Progress, and Settings. On small screens, routes in the sidebar can scroll while the mascot and profile-switch control stay in place.
- The header includes lesson search, grade/language context, notifications, and the selected student avatar.
- Switching profiles keeps their progress separate. A newly created profile starts with zero stars, badges, completed lessons, quizzes, exams, and discoveries.

### General learning subjects

There are **14 subject categories** in the general learning library:

1. Numbers
2. Alphabets
3. Story Time
4. Rhymes
5. Science
6. Knowledge
7. History
8. Manners
9. English
10. Mathematics
11. Urdu
12. Hindi
13. Children Stories
14. Art & Craft

The category directory supports text search and Math & Science, Languages, and Arts & Tales filters. Category detail pages include lesson outlines, facts, and practice activity descriptions. These bundled lesson records are local app content; the directory's displayed lesson counts are labels, not a guarantee of that many playable lessons in each subject.

### Lessons and video

- The Home screen includes featured learning content and video cards.
- The app bundles **12 real YouTube video records** and a **5-video lesson playlist**. Playback uses YouTube embeds, so an internet connection and YouTube availability are required.
- The video lesson player includes lesson notes, objectives, an interactive concept playground, playlist navigation, and a quiz route. Videos are external embeds, not locally hosted media.
- Some lesson and video presentation content is illustrative app data; the app does not fetch a curriculum from a learning-management backend.

### Subject discovery and filters

- The general Categories screen has search and four filters: **All Subjects**, **Math & Science**, **Languages**, and **Arts & Tales**.
- The current 14-category directory covers Numbers, Alphabets, Story Time, Rhymes, Science, Knowledge, History, Manners, English, Mathematics, Urdu, Hindi, Children Stories, and Art & Craft.
- Choosing a community during onboarding tailors the sidebar and cultural academy: Muslim profiles get Islamic Teachings, Sikh profiles get Punjabi & Gurmukhi, Hindu profiles get Hindi & Cultural Wisdom, and Universal profiles focus on general learning. General subject categories remain available to every profile.

### Quizzes and exams

- General quiz rounds contain **10 randomly generated multiple-choice questions**, with explanations and visual prompts. Learners can choose from **14 quiz modes**: All Subjects Mix and 13 subject modes.
- Question generators have difficulty patterns for Kindergarten and Grades 1–3. For onboarding classes outside those supported levels, the generator currently falls back to Grade 1 difficulty.
- Two Islamic & Urdu exam rounds are available in Practice: **Islamic Manners Exam** and **Islamic Urdu Words Exam**. Each has 10 questions, with English and Urdu question text, answer choices, and explanations shown together. Arabic duas and phrases remain in Arabic script with their English and Urdu meanings. The scoreboard, filters, and retry controls are bilingual. Class 3 and above use the more challenging question wording where provided.
- Quizzes and exams run from question banks bundled with the app; they do not load questions from a server.
- Completing a general quiz records correct and incorrect answers and awards 10 stars per correct answer. Completing an Islamic exam records the answer totals and awards one star per correct answer.

### Practice Games and explorer

- Practice always includes math, words, creativity, logic, and a 10-question **Science Explorer Challenge**. Islamic & Urdu exams appear for Muslim profiles; a Hindu culture quiz appears for Hindu profiles; a Sikhism & Seva quiz appears for Sikh profiles; and a world-knowledge quiz appears for Universal profiles.
- Shared activities include alphabet and number practice, shape tracing, pattern play, coloring, Match & Pop, balloon math, Feed the Bunny, Math Quest, fruit memory matching, and fractions. Students choose their class and age during profile setup; these automatically determine the Foundation (Grade 1), Growing (Grade 2), or Challenge (Grade 3+) content level used by games and quizzes. There are no separate class/age filters in Practice. Classes offered at onboarding are Nursery/KG and Classes 1–8; ages are 4–14.
- Interactive games run in modals. Grade-specific question sets are implemented for the number challenges and some fraction activities; community, science, and world-knowledge quizzes provide applied prompts for older learners.
- The Explorer hub offers five modules: Human Body, Islamic Teachings, Solar System, Animals, and Plants.
- **Human Body:** interactive body illustration, **8 body regions**, organ facts, drag-and-drop inspection, organ questions, speech, and per-student saved discoveries.
- Solar System supports selectable Sun, Earth, Moon, and stars/galaxies content. Islamic Teachings in the Explorer opens the same teachings collection as the Muslim sidebar.

### Islamic, Sikh, Hindu, and language learning

- **Islamic Teachings (Muslim profiles):** 12 tracks—Prophets, Quran, Hadith, Karbala, Manners, Sunnah Hobbies, Good Talks & Daily Zikr, Seerah, Namaz & Wudu, Sahabah & Ahl al-Bayt, Awliya & Imams, and Arabic & Urdu Foundations. The collection has **127 existing lessons** plus **100 study topics per track (1,200 total)**. Learners can search, filter tracks, page through entries, hear Arabic/Urdu/English speech, and mark items learned. Study-topic notes are explanatory content linked to lessons, not additional Quran or Hadith quotations.
- **Punjabi & Gurmukhi (Sikh profiles):** 4 tracks—Gurmukhi alphabet, daily Punjabi words, Sikh values and Seva, and Punjabi stories. The **11 lessons** include Gurmukhi text, transliteration, English meanings, and practical tips.
- **Hindi & Cultural Wisdom (Hindu profiles):** 4 tracks—Hindi Varnamala, daily Hindi words, moral values and Sanskar, and Panchatantra fables. The **5 lessons** include Hindi text, transliteration, English meanings, and practical tips.
- These community-specific academies are available from the sidebar and Explorer. Their progress is tracked independently per student.

### Progress, sound, and settings

- Profile settings can update the student's name, avatar, and grade; sound effects can be switched on or off.
- The app uses synthesized interface sounds and browser speech synthesis. Speech prefers a recognizable female voice for reading quiz questions and English, Urdu, and Arabic learning material, with a gentle pitch and pace. Voice availability, gender identification, and pronunciation depend on the learner's operating system and browser.
- Per-profile progress is stored locally in the browser: completed academy lessons, quiz and exam attempts, correct/incorrect answer totals, stars, completed games, and discovered body organs. Progress starts at zero and the Progress screen reports these saved totals and badges; no sample achievement totals are preloaded.
- Multiple student profiles can be saved on the same device and selected from the profile switcher. Each profile has its own progress record. Resetting progress in Settings clears and removes only the active student's profile; other students are retained.
- Daily-goal and autoplay controls shown in Settings are UI preferences and are not currently persisted as application-wide settings.

## Technology

| Area | Technology |
| --- | --- |
| UI | React 19 |
| Language | TypeScript 5 |
| Development and build | Vite 6 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Celebration effects | Canvas Confetti |
| Speech | Browser Speech Synthesis API |
| Interface sounds | Web Audio API |
| Profile and progress persistence | Browser `localStorage`, with saved profiles and progress scoped by student profile ID |

## Run locally

**Requirements:** Node.js 20 (the CI build uses Node.js 20) and npm.

```bash
git clone https://github.com/unbeatableravees-dev/VidyaAi.JR.git
cd VidyaAi.JR
npm ci
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:5173`).

Production build and preview:

```bash
npm run build
npm run preview
```

## Project structure

```text
VidyaAi.JR/
├── .github/
│   └── workflows/
│       └── main.yml              # CI install and production build
├── public/                       # Public assets, including the logo
├── src/
│   ├── assets/                   # Image asset references
│   ├── components/
│   │   ├── illustrations/        # SVG illustrations and body model
│   │   ├── layout/               # App header, sidebar, animated backdrop
│   │   ├── modals/               # Game and video player modals
│   │   └── screens/              # Onboarding, subjects, academies, games, quiz
│   ├── data/                     # Bundled curricula, quizzes, videos, and tracks
│   ├── types/                    # Student profile and community types
│   ├── utils/                    # Audio, speech, language, and student-progress helpers
│   ├── App.tsx                   # App state and screen routing
│   ├── index.css                 # Global styles and animations
│   └── main.tsx                  # React entry point
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Validation and current scope

- `npm run build` creates the production site in `dist/`.
- GitHub Actions installs dependencies and runs the production build on pushes and pull requests targeting `main` or `development`.
- There is currently no test or lint script in `package.json`.
- The app is currently client-side: it has no backend, user authentication, cloud-synced progress, or server-managed curriculum. Backend integration is deferred; local progress does not sync between browsers or devices and can be cleared with browser storage.
