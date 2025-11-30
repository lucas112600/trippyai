export enum Pace {
  RELAXED = '放鬆慢活',
  MODERATE = '適中均衡',
  PACKED = '緊湊充實',
}

export enum Budget {
  BUDGET = '經濟實惠',
  STANDARD = '標準舒適',
  LUXURY = '豪華享受',
}

export enum Language {
  ZH_TW = '繁體中文',
  EN = 'English',
  JA = '日本語',
  KO = '한국어'
}

export enum InputMode {
  WIZARD = '精靈模式',
  FREE_TEXT = '自由輸入',
}

export interface UserPreferences {
  inputMode: InputMode;
  // Wizard Mode Fields
  destination?: string;
  days?: number;
  pace?: Pace;
  budget?: Budget;
  interests?: string[];
  // Free Text Mode Field
  freeTextPrompt?: string;
  // Global Settings
  language: Language;
  isQuickMode: boolean;
}

export interface GroundingChunk {
  maps?: {
    placeId?: string;
    uri?: string;
    title?: string;
  };
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface ItineraryResult {
  markdown: string;
  groundingChunks: GroundingChunk[];
}