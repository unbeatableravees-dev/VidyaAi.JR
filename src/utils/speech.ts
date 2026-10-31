// =============================================================================
// FEMALE VOICE SPEECH SYNTHESIS ENGINE (Arabic, Urdu, English)
// Designed for clear, gentle, child-friendly recitation & guidance
// =============================================================================

export type SupportedLang = 'ar' | 'ur' | 'en';

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
   * Finds the best female voice matching the requested language (Arabic, Urdu, English)
   */
  public getFemaleVoice(lang: SupportedLang): SpeechSynthesisVoice | null {
    const all = this.getVoices();
    if (!all || all.length === 0) return null;

    const femaleKeywords = [
      'female', 'woman', 'girl',
      // Microsoft Windows female voices
      'zira', 'jenny', 'aria', 'sonia', 'natasha', 'libby', 'hazel',
      'salma', 'hoda', 'zeina',
      'gul', 'uzma',
      // Apple / iOS female voices
      'samantha', 'victoria', 'karen', 'moira', 'tessa', 'leila',
      // Google Chrome female voices
      'google uk english female', 'google us english female',
    ];

    let langPrefix = 'en';
    if (lang === 'ar') langPrefix = 'ar';
    if (lang === 'ur') langPrefix = 'ur';

    // 1. Try finding a voice matching the specific language with female name
    const langVoices = all.filter((v) =>
      v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix)
    );

    const femaleLangVoice = langVoices.find((v) => {
      const lowerName = v.name.toLowerCase();
      return femaleKeywords.some((kw) => lowerName.includes(kw));
    });
    if (femaleLangVoice) return femaleLangVoice;

    // Prefer a recognizable female voice in a related language before an unknown-gender voice.
    if (lang === 'ur') {
      const hindiVoices = all.filter((v) => v.lang.toLowerCase().startsWith('hi'));
      const femaleHindi = hindiVoices.find((v) => {
        const lowerName = v.name.toLowerCase();
        return femaleKeywords.some((kw) => lowerName.includes(kw)) || lowerName.includes('swara') || lowerName.includes('kalpana') || lowerName.includes('madhur');
      });
      if (femaleHindi) return femaleHindi;
      if (hindiVoices.length > 0) return hindiVoices[0];
    }

    const anyFemale = all.find((v) => {
      const lowerName = v.name.toLowerCase();
      return femaleKeywords.some((kw) => lowerName.includes(kw));
    });

    // Browsers do not expose voice gender; use the requested language if no
    // installed voice can be identified as female.
    return anyFemale || langVoices[0] || all[0] || null;
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
   * Speaks text using a dedicated female voice with gentle pitch for kids
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
    const femaleVoice = this.getFemaleVoice(options.lang);

    if (femaleVoice) {
      utterance.voice = femaleVoice;
      utterance.lang = femaleVoice.lang;
    } else {
      utterance.lang = options.lang === 'ar' ? 'ar-SA' : options.lang === 'ur' ? 'ur-PK' : 'en-US';
    }

    // Kid-friendly gentle female pitch and clear pacing
    utterance.pitch = options.pitch ?? 1.18; // slightly higher pitch produces natural warm female tone
    utterance.rate = options.rate ?? (options.lang === 'ar' ? 0.82 : 0.88); // deliberate pacing for recitation

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
