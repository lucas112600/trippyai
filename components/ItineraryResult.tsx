import React, { useState } from 'react';
import { ItineraryResult } from '../types';
import { 
  Map, ExternalLink, ArrowLeft, Navigation, Globe, Star, DollarSign, Car,
  Utensils, Coffee, Trees, Landmark, ShoppingBag, Train, Bed, MapPin, Camera,
  Share2, Download, Check, Copy
} from 'lucide-react';

interface ItineraryResultProps {
  result: ItineraryResult;
  onReset: () => void;
}

const ItineraryResultDisplay: React.FC<ItineraryResultProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  // Helper: Detect category and return icon
  const getCategoryIcon = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Food & Drink
    if (lowerText.match(/(餐|飯|食|味|lunch|dinner|breakfast|food|restaurant|eat|drink|居酒屋|食堂|燒肉|火鍋|壽司|拉麵)/)) {
      return <Utensils className="w-5 h-5 text-orange-500" />;
    }
    if (lowerText.match(/(咖啡|甜點|下午茶|cafe|coffee|dessert|tea|bakery|cake)/)) {
      return <Coffee className="w-5 h-5 text-amber-600" />;
    }
    
    // Nature & Outdoors
    if (lowerText.match(/(公園|花園|山|海|灘|景|view|park|garden|nature|beach|mountain|river|lake|forest|hiking)/)) {
      return <Trees className="w-5 h-5 text-emerald-600" />;
    }
    
    // Culture & History
    if (lowerText.match(/(博|館|美|藝|史|古|廟|寺|社|宮|museum|art|history|gallery|temple|shrine|palace|castle|church|cathedral)/)) {
      return <Landmark className="w-5 h-5 text-purple-600" />;
    }
    
    // Shopping
    if (lowerText.match(/(購|買|街|市|商|貨|shop|mall|market|store|outlet|plaza)/)) {
      return <ShoppingBag className="w-5 h-5 text-pink-500" />;
    }
    
    // Accommodation
    if (lowerText.match(/(宿|店|房|check-in|check in|hotel|stay|resort|bnb|hostel)/)) {
      return <Bed className="w-5 h-5 text-blue-500" />;
    }
    
    // Transport
    if (lowerText.match(/(車|站|鐵|機|train|station|airport|bus|subway|metro|transfer|arrive|depart)/)) {
      return <Train className="w-5 h-5 text-slate-500" />;
    }

    // General Sightseeing
    if (lowerText.match(/(塔|觀景|observation|tower|sight|landmark)/)) {
        return <Camera className="w-5 h-5 text-indigo-500" />;
    }
    
    // Default fallback
    return <MapPin className="w-5 h-5 text-cyan-600" />;
  };

  // Enhanced line processor to highlight special info
  const formatLineContent = (content: string) => {
    // Split by bold markers first
    const parts = content.split('**');
    return parts.map((part, i) => {
      // Bold text (usually place names)
      if (i % 2 === 1) {
        return <strong key={i} className="text-slate-900 font-bold bg-yellow-100/80 px-1 rounded mx-0.5">{part}</strong>;
      }
      
      // Process normal text for special emojis/keywords
      let element: React.ReactNode = part;

      // Highlight Ratings (⭐ 4.x)
      if (typeof element === 'string') {
        const ratingRegex = /(⭐\s*[\d.]+)/g;
        if (ratingRegex.test(element)) {
            const fragments = element.split(ratingRegex);
            element = fragments.map((frag, idx) => {
                if (ratingRegex.test(frag)) {
                    return <span key={`r-${idx}`} className="inline-flex items-center text-xs font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full mx-1 border border-orange-100 shadow-sm">{frag}</span>
                }
                return frag;
            });
        }
      }

      // Highlight Price (💰 ...)
      if (typeof element === 'string') {
          const priceRegex = /(💰\s*[^)\s,，。]+)/g; // Adjusted regex to stop at common punctuation
          if (priceRegex.test(element)) {
              const fragments = element.split(priceRegex);
              element = fragments.map((frag, idx) => {
                  if (priceRegex.test(frag)) {
                      return <span key={`p-${idx}`} className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full mx-1 border border-emerald-100 shadow-sm">{frag}</span>
                  }
                  return frag;
              });
          }
      }

      return <span key={i}>{element}</span>;
    });
  };

  const renderContent = (text: string) => {
    return text.split('\n').map((line, idx) => {
      // Day Headers (H2)
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold text-slate-800 mt-12 mb-6 border-b-2 border-cyan-100 pb-2 inline-block pr-8">{line.replace('## ', '')}</h2>;
      }
      
      // Location/Activity Headers (H3)
      if (line.startsWith('### ')) {
        const title = line.replace('### ', '');
        const Icon = getCategoryIcon(title);
        return (
            <h3 key={idx} className="text-xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 shadow-sm">
                    {Icon}
                </div>
                {title}
            </h3>
        );
      }

      // Bullet Points
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const content = line.replace(/^[*-] /, '');
        
        // Try to find specific place names at the start to determine icon (e.g., "**Tokyo Tower**: ...")
        const boldMatch = content.match(/^\*\*([^*]+)\*\*/);
        let ItemIcon = null;
        
        // Only use specific icon if it starts with a bold location name, otherwise use dot
        if (boldMatch) {
            ItemIcon = getCategoryIcon(boldMatch[1]);
        }

        return (
          <li key={idx} className="mb-4 text-slate-700 list-none pl-0 leading-relaxed flex items-start gap-3 group hover:bg-slate-50/50 p-2 rounded-lg transition-colors -ml-2">
             <div className="mt-1 flex-shrink-0">
                {ItemIcon ? (
                    <div className="p-1 bg-white rounded-md border border-slate-100 shadow-sm text-slate-400 group-hover:text-cyan-500 transition-colors">
                        {React.cloneElement(ItemIcon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4" })}
                    </div>
                ) : (
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2.5 ml-1.5 group-hover:bg-cyan-400 transition-colors" />
                )}
             </div>
             <div className="flex-1">{formatLineContent(content)}</div>
          </li>
        );
      }

      // Empty lines
      if (line.trim() === '') {
        return <br key={idx} />;
      }

      // Check for Transport Lines explicitly starting with emojis
      if (line.match(/^(🚗|🚇|🚌|🚶|🚕|🚄)/)) {
          return (
              <div key={idx} className="flex items-center gap-3 my-4 p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-slate-600 text-sm shadow-sm">
                  {formatLineContent(line)}
              </div>
          )
      }

      // Regular Paragraphs
      return (
        <p key={idx} className="mb-3 text-slate-600 leading-relaxed pl-1">
          {formatLineContent(line)}
        </p>
      );
    });
  };

  // --- Actions ---
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'TrippyAI 行程規劃',
          text: result.markdown,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TrippyAI_Itinerary_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 animate-fade-in-up">
      {/* Main Content */}
      <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 border border-slate-100 min-h-[500px]">
        {/* Header Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <span className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-cyan-200">
                <Globe className="w-6 h-6" />
            </span>
            您的專屬行程
            </h1>
            
            <div className="flex items-center gap-2">
                <button 
                  onClick={handleShare}
                  className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-cyan-600 rounded-lg transition-colors shadow-sm"
                  title="分享或複製行程"
                >
                  {copied ? <Check className="w-4 h-4 mr-1 text-green-500" /> : <Share2 className="w-4 h-4 mr-1" />}
                  {copied ? '已複製' : '分享'}
                </button>
                
                <button 
                  onClick={handleDownload}
                  className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-cyan-600 rounded-lg transition-colors shadow-sm"
                  title="下載 Markdown 檔案"
                >
                  <Download className="w-4 h-4 mr-1" /> 下載
                </button>

                <div className="w-px h-6 bg-slate-200 mx-1"></div>

                <button 
                onClick={onReset}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors shadow-md"
                >
                <ArrowLeft className="w-4 h-4 mr-2" /> 重新規劃
                </button>
            </div>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          {renderContent(result.markdown)}
        </div>
      </div>

      {/* Sidebar - Map References (Sources) */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-white rounded-2xl p-6 sticky top-24 border border-slate-200 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="mb-6 pb-4 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Map className="w-5 h-5 text-cyan-600" />
                地圖來源 & 資訊
            </h3>
            <p className="text-xs text-slate-500 mt-1">點擊下方卡片查看 Google Maps 詳細資訊</p>
          </div>
          
          <div className="space-y-3">
             {result.groundingChunks && result.groundingChunks.length > 0 ? (
               result.groundingChunks.map((chunk, index) => {
                 const mapInfo = chunk.maps;
                 if (!mapInfo) return null;
                 return (
                   <a
                     key={index}
                     href={mapInfo.uri}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block group relative bg-slate-50 hover:bg-white p-4 rounded-xl border border-slate-200 hover:border-cyan-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                   >
                     <div className="absolute top-4 right-4 text-slate-300 group-hover:text-cyan-500 transition-colors">
                        <Navigation className="w-5 h-5" />
                     </div>
                     <div className="font-bold text-slate-800 group-hover:text-cyan-700 pr-6 mb-1">
                       {mapInfo.title}
                     </div>
                     <div className="text-xs text-slate-500 flex items-center gap-1 group-hover:text-cyan-600">
                        <ExternalLink className="w-3 h-3" />
                        開啟 Google Maps 導航
                     </div>
                   </a>
                 );
               })
             ) : (
               <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                   <p className="text-sm text-slate-500">
                       本次生成未包含具體地圖連結<br/>
                       (請嘗試在提示詞中加入具體地點名稱)
                   </p>
               </div>
             )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200 bg-cyan-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="text-xs font-bold text-cyan-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Star className="w-3 h-3" /> 評分依據
                    </h4>
                    <p className="text-xs text-cyan-700/80">
                        行程顯示之 ⭐ 評分與 💰 價格為 AI 依據網路大數據估算，僅供參考。
                    </p>
                </div>
                <div>
                    <h4 className="text-xs font-bold text-cyan-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Car className="w-3 h-3" /> 交通建議
                    </h4>
                    <p className="text-xs text-cyan-700/80">
                        建議搭配 Google Maps 查詢即時班次與路況。
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryResultDisplay;