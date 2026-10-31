// =============================================================================
// FEMALE VOICE SPEECH SYNTHESIS ENGINE (Arabic, Urdu, Hindi, Punjabi, English)
// Designed for clear, gentle, child-friendly recitation & guidance
// =============================================================================

export type SupportedLang = 'ar' | 'ur' | 'hi' | 'pa' | 'en';

class FemaleVoiceEngine {
  private voices: SpeechSynthesisVoice[] = [];
  private isLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices() || [];
    if (this.voices.length > 0) {
      this.isLoaded = true;
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
    }
    return this.voices;
  }

  /**
   * Finds the best voice matching the requested language (Arabic, Urdu, Hindi, Punjabi, English)
   */
  public getFemaleVoice(lang: SupportedLang): SpeechSynthesisVoice | null {
    const all = this.getVoices();
    if (!all || all.length === 0) return null;

    const femaleKeywords = [
      'female', 'woman', 'girl',
      // Microsoft Windows female voices
      'zira', 'jenny', 'aria', 'sonia', 'natasha', 'libby', 'hazel',
      'salma', 'hoda', 'zeina',
      'gul', 'uzma', 'heera', 'kalpana', 'swara', 'neerja',
      // Apple / iOS female voices
      'samantha', 'victoria', 'karen', 'moira', 'tessa', 'leila', 'lekha',
      // Google Chrome female voices
      'google uk english female', 'google us english female', 'google हिन्दी',
    ];

    let langPrefix = 'en';
    if (lang === 'ar') langPrefix = 'ar';
    if (lang === 'ur') langPrefix = 'ur';
    if (lang === 'hi') langPrefix = 'hi';
    if (lang === 'pa') langPrefix = 'pa';

    // 1. Try finding a voice matching the specific language with female name
    const langVoices = all.filter((v) =>
      v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix)
    );

    const femaleLangVoice = langVoices.find((v) => {
      const lowerName = v.name.toLowerCase();
      return femaleKeywords.some((kw) => lowerName.includes(kw));
    });
    if (femaleLangVoice) return femaleLangVoice;

    // Fallbacks for Urdu / Punjabi / Hindi interchangeability if not installed
    if (lang === 'ur' || lang === 'pa') {
      const hindiVoices = all.filter((v) => v.lang.toLowerCase().startsWith('hi'));
      const femaleHindi = hindiVoices.find((v) => {
        const lowerName = v.name.toLowerCase();
        return femaleKeywords.some((kw) => lowerName.includes(kw));
      });
      if (femaleHindi) return femaleHindi;
      if (hindiVoices.length > 0) return hindiVoices[0];
    }

    if (langVoices.length > 0) return langVoices[0];

    const anyFemale = all.find((v) => {
      const lowerName = v.name.toLowerCase();
      return femaleKeywords.some((kw) => lowerName.includes(kw));
    });

    return anyFemale || all[0] || null;
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isSpeaking(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    return window.speechSynthesis.speaking;
  }

  /**
   * Speaks text using a dedicated friendly voice with gentle pitch for kids
   */
  public speak(options: {
    text: string;
    lang: SupportedLang;
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
    onError?: () => void;
  }): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;

    this.stop();

    const cleanText = options.text.trim();
    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = this.getFemaleVoice(options.lang);

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      const langMap: Record<SupportedLang, string> = {
        ar: 'ar-SA',
        ur: 'ur-PK',
        hi: 'hi-IN',
        pa: 'pa-IN',
        en: 'en-US',
      };
      utterance.lang = langMap[options.lang] || 'en-US';
    }

    // Kid-friendly gentle pitch and clear pacing
    utterance.pitch = options.pitch ?? 1.15;
    utterance.rate = options.rate ?? (options.lang === 'ar' ? 0.82 : 0.88);

    utterance.onend = () => {
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = () => {
      if (options.onError) options.onError();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  }
}

export const femaleVoice = new FemaleVoiceEngine();
