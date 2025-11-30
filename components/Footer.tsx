import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-auto border-t border-slate-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-light">
          &copy; {new Date().getFullYear()} <span className="font-bold text-slate-200">TrippyAI</span> 智能旅程
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
           <span className="text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700">
              Powered by Google Gemini 2.5
           </span>
          <span className="text-sm font-medium text-cyan-400 flex items-center gap-2">
            Designed by AI <span className="text-slate-600">|</span> 胡家綸dd製作
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;