import React from 'react';
import { ArrowLeft, Book, Code, Cpu, ShieldCheck, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeveloperManual: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-100 my-8">
      <Link to="/" className="inline-flex items-center text-cyan-600 hover:text-cyan-800 mb-6 font-medium transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> 返回首頁
      </Link>

      <header className="mb-10 border-b border-slate-200 pb-6 flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Book className="w-8 h-8 text-cyan-600" />
            更新日誌
            </h1>
            <p className="text-slate-500 mt-2">TrippyAI 系統版本紀錄</p>
        </div>
        <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium border border-cyan-100">
                <User className="w-4 h-4" />
                胡家綸dd製作
            </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            技術架構
          </h2>
          <ul className="space-y-3 text-slate-600 text-sm">
            <li><strong>前端框架:</strong> React 18 + TypeScript</li>
            <li><strong>樣式系統:</strong> Tailwind CSS (Responsive)</li>
            <li><strong>AI 核心:</strong> Google Gemini 2.5 Flash</li>
            <li><strong>資料整合:</strong> Google Maps Grounding</li>
          </ul>
        </section>

        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            功能特色
          </h2>
          <ul className="space-y-3 text-slate-600 text-sm">
            <li>支援多語言即時切換。</li>
            <li>快速生成模式與深度規劃。</li>
            <li>自由文字輸入與選單模式。</li>
            <li>自動整合 Google Maps 連結。</li>
          </ul>
        </section>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Code className="w-6 h-6 text-purple-600" />
          版本紀錄 (Change Log)
        </h2>

        <div className="space-y-8 border-l-2 border-slate-200 ml-3 pl-8 relative">
          
          {/* V1.5.0 */}
          <div className="relative group">
            <span className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-cyan-700 border-4 border-white shadow-md group-hover:scale-110 transition-transform"></span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
               <h3 className="text-lg font-bold text-slate-900">v1.5.0 - 分享與下載</h3>
               <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">Latest</span>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <ul className="list-disc ml-4 text-slate-600 text-sm space-y-2">
                <li>新增 <span className="font-bold text-cyan-700">分享/複製行程</span> 功能，支援系統分享與剪貼簿複製。</li>
                <li>新增 <span className="font-bold text-cyan-700">下載檔案</span> 功能，可將行程保存為 Markdown 格式。</li>
                </ul>
            </div>
          </div>

          {/* V1.4.0 */}
          <div className="relative group">
            <span className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-cyan-600 border-4 border-white shadow-sm group-hover:bg-cyan-500 transition-colors"></span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
               <h3 className="text-lg font-bold text-slate-900">v1.4.0 - 視覺體驗優化</h3>
               <span className="text-xs font-mono text-slate-400">2023-11-08</span>
            </div>
            <div className="p-2">
                <ul className="list-disc ml-4 text-slate-600 text-sm space-y-2">
                <li>新增智能圖示分類，自動為不同行程添加對應 icon。</li>
                <li>優化列表顯示樣式。</li>
                </ul>
            </div>
          </div>

          {/* V1.3.0 */}
          <div className="relative group">
            <span className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-cyan-500 border-4 border-white shadow-sm group-hover:bg-cyan-500 transition-colors"></span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
               <h3 className="text-lg font-bold text-slate-900">v1.3.0 - 深度資訊整合</h3>
               <span className="text-xs font-mono text-slate-400">2023-11-05</span>
            </div>
            <div className="p-2">
                <ul className="list-disc ml-4 text-slate-600 text-sm space-y-2">
                <li>新增網路評分 (Rating) 顯示。</li>
                <li>新增價格估算 (Price) 資訊。</li>
                <li>新增交通方式 (Transport) 與時間預估。</li>
                </ul>
            </div>
          </div>

          {/* V1.2.0 */}
          <div className="relative group">
            <span className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-cyan-400 border-4 border-white shadow-sm group-hover:bg-cyan-500 transition-colors"></span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
               <h3 className="text-lg font-bold text-slate-900">v1.2.0 - 多功能升級版</h3>
               <span className="text-xs font-mono text-slate-400">2023-10-30</span>
            </div>
            <div className="p-2">
                <ul className="list-disc ml-4 text-slate-600 text-sm space-y-2">
                <li>新增多語言支援 (中/英/日/韓)。</li>
                <li>新增自由輸入模式。</li>
                <li>新增快速生成模式。</li>
                </ul>
            </div>
          </div>

          {/* V1.1.0 */}
          <div className="relative group">
            <span className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-slate-300 border-4 border-white group-hover:bg-slate-400 transition-colors"></span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
               <h3 className="text-lg font-bold text-slate-900">v1.1.0 - 專業版發布</h3>
               <span className="text-xs font-mono text-slate-400">2023-10-27</span>
            </div>
            <ul className="list-disc ml-4 text-slate-600 text-sm space-y-1">
              <li>新增 Google Maps Grounding 整合。</li>
              <li>優化 UI/UX 視覺體驗。</li>
              <li>新增開發手冊頁面。</li>
            </ul>
          </div>

          {/* V1.0.0 */}
          <div className="relative group">
             <span className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-slate-200 border-4 border-white"></span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
               <h3 className="text-lg font-bold text-slate-900">v1.0.0 - 初始版本</h3>
               <span className="text-xs font-mono text-slate-400">2023-10-20</span>
            </div>
            <ul className="list-disc ml-4 text-slate-600 text-sm space-y-1">
              <li>基礎行程生成功能上線。</li>
              <li>整合 Gemini API。</li>
            </ul>
          </div>
        </div>
      </section>
      
      <div className="mt-12 text-center border-t border-slate-100 pt-6">
        <p className="text-sm text-slate-400">Created by 胡家綸dd & Powered by Google AI</p>
      </div>
    </div>
  );
};

export default DeveloperManual;