import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import TripForm from './components/TripForm';
import ItineraryResultDisplay from './components/ItineraryResult';
import DeveloperManual from './components/DeveloperManual';
import Footer from './components/Footer';
import { generateItinerary } from './services/geminiService';
import { UserPreferences, ItineraryResult } from './types';
import { Plane } from 'lucide-react';

const AppContent: React.FC = () => {
  const [result, setResult] = useState<ItineraryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (prefs: UserPreferences) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateItinerary(prefs);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生未知錯誤');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-cyan-200">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" onClick={reset} className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 text-white p-2 rounded-lg transform transition group-hover:rotate-6">
              <Plane className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              TrippyAI
            </span>
          </Link>
          <div className="flex gap-4 text-sm font-medium text-slate-600">
            <Link to="/manual" className="hover:text-cyan-600 transition-colors flex items-center gap-1">
              開發手冊
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
            <Route path="/" element={
                <>
                     {/* Hero Section Background (Only visible when no result) */}
                    {!result && (
                        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-200/20 blur-3xl"></div>
                        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-200/20 blur-3xl"></div>
                        </div>
                    )}

                    <div className="relative z-10">
                        {error && (
                            <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-center">
                                {error}
                            </div>
                        )}

                        {!result ? (
                            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                                <TripForm onSubmit={handleFormSubmit} isLoading={loading} />
                                <div className="mt-8 text-center text-slate-400 text-sm max-w-lg">
                                    <p>運用 Gemini 2.5 Flash 模型與 Google Maps 大數據，即時計算最佳路徑與景點推薦。</p>
                                </div>
                            </div>
                        ) : (
                            <ItineraryResultDisplay result={result} onReset={reset} />
                        )}
                    </div>
                </>
            } />
            <Route path="/manual" element={<DeveloperManual />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
