import React, { useState } from 'react';
import { UserPreferences, Pace, Budget, InputMode, Language } from '../types';
import { MapPin, Calendar, Activity, DollarSign, Compass, Globe, Zap, Type, LayoutTemplate } from 'lucide-react';

interface TripFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const INTEREST_OPTIONS = [
  "歷史古蹟", "自然風景", "美食探索", "購物血拼", 
  "博物館/藝術", "戶外冒險", "親子同樂", "夜生活"
];

const TripForm: React.FC<TripFormProps> = ({ onSubmit, isLoading }) => {
  // Mode State
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.WIZARD);
  const [language, setLanguage] = useState<Language>(Language.ZH_TW);
  const [isQuickMode, setIsQuickMode] = useState(false);

  // Wizard Data
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [pace, setPace] = useState<Pace>(Pace.MODERATE);
  const [budget, setBudget] = useState<Budget>(Budget.STANDARD);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Free Text Data
  const [freeTextPrompt, setFreeTextPrompt] = useState('');

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMode === InputMode.WIZARD && !destination.trim()) return;
    if (inputMode === InputMode.FREE_TEXT && !freeTextPrompt.trim()) return;

    onSubmit({ 
      inputMode,
      language,
      isQuickMode,
      // Wizard
      destination, 
      days, 
      pace, 
      budget, 
      interests: selectedInterests,
      // Free Text
      freeTextPrompt
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <Compass className="w-8 h-8 text-cyan-600" />
          TrippyAI 旅程規劃
        </h2>
        <p className="text-slate-500 mt-2 text-sm">AI 驅動的大數據旅遊助手</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-white gap-4 border-b border-slate-100">
         {/* Tabs */}
         <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setInputMode(InputMode.WIZARD)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                inputMode === InputMode.WIZARD ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutTemplate className="w-4 h-4" /> 選單模式
            </button>
            <button
              type="button"
              onClick={() => setInputMode(InputMode.FREE_TEXT)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                inputMode === InputMode.FREE_TEXT ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Type className="w-4 h-4" /> 自由輸入
            </button>
         </div>

         {/* Settings */}
         <div className="flex items-center gap-3">
            <div className="relative group">
               <Globe className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
               <select 
                 value={language}
                 onChange={(e) => setLanguage(e.target.value as Language)}
                 className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer hover:bg-slate-100 transition"
               >
                 {Object.values(Language).map(lang => (
                   <option key={lang} value={lang}>{lang}</option>
                 ))}
               </select>
            </div>
            
            <button
               type="button"
               onClick={() => setIsQuickMode(!isQuickMode)}
               className={`p-2 rounded-lg border transition-all ${
                 isQuickMode 
                   ? 'bg-yellow-50 border-yellow-300 text-yellow-700' 
                   : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
               }`}
               title="快速生成模式"
            >
               <Zap className={`w-5 h-5 ${isQuickMode ? 'fill-yellow-500' : ''}`} />
            </button>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        {/* WIZARD MODE */}
        {inputMode === InputMode.WIZARD && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-600" /> 目的地
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="例如：京都, 巴黎, 紐約..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                required={inputMode === InputMode.WIZARD}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-600" /> 天數
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none bg-slate-50 focus:bg-white"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-600" /> 步調
                </label>
                <select
                  value={pace}
                  onChange={(e) => setPace(e.target.value as Pace)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none bg-slate-50 focus:bg-white"
                  disabled={isLoading}
                >
                  {Object.values(Pace).map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-cyan-600" /> 預算等級
                </label>
                <div className="flex gap-3">
                  {Object.values(Budget).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      disabled={isLoading}
                      className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                        budget === b 
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-lg shadow-cyan-200' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">興趣偏好</label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    disabled={isLoading}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      selectedInterests.includes(interest)
                        ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FREE TEXT MODE */}
        {inputMode === InputMode.FREE_TEXT && (
          <div className="animate-fade-in-up">
            <label className="block text-sm font-semibold text-slate-700 mb-2">告訴 AI 您的需求</label>
            <textarea
              value={freeTextPrompt}
              onChange={(e) => setFreeTextPrompt(e.target.value)}
              placeholder="例如：我要去北海道五天四夜，想看雪祭和吃螃蟹，請幫我安排適合帶父母的行程..."
              className="w-full h-64 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white resize-none"
              required={inputMode === InputMode.FREE_TEXT}
              disabled={isLoading}
            />
            <p className="text-xs text-slate-400 mt-2 text-right">
              提示：描述越詳細，AI 生成的行程越精準。
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transform transition active:scale-[0.98] ${
            isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/30'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AI 正在搜集大數據...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
               {isQuickMode ? '快速生成行程' : '開始規劃行程'}
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default TripForm;