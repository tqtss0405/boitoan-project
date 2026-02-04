import React, { useState, useRef } from 'react';
import { TossResult, IChingResult } from '../types';
import { consultIChing, generateHexagramImage } from '../services/geminiService';
import { Loader2, RefreshCcw, Scroll, Circle, ImageIcon, BookOpen, ArrowRight, Quote, BookMarked, MessageSquareQuote, ImageOff, Wand2 } from 'lucide-react';

// Internal component to render Hexagram SVG
const HexagramSVG: React.FC<{ lines: TossResult[] }> = ({ lines }) => {
  // lines[0] is bottom, lines[5] is top.
  // We draw visually from top to bottom (index 0 at top).
  // So we reverse the array for display purposes.
  const displayLines = [...lines].reverse();

  return (
    <div className="w-full h-full bg-paper-bg flex items-center justify-center p-6 border-4 border-double border-orient-gold/20">
        <svg viewBox="0 0 100 100" className="w-full h-full max-w-[200px]">
        {displayLines.map((line, index) => {
            // Determine if the line is Yang (Solid) or Yin (Broken) in the Main Hexagram
            // 7 (Young Yang) & 9 (Old Yang) -> Solid
            // 8 (Young Yin) & 6 (Old Yin) -> Broken
            const isYang = line.val % 2 !== 0;
            
            // Layout calculations
            // Total height available ~90 units.
            // 6 lines. Each line height 10. Gap 6.
            // y start = 5.
            const y = 5 + index * 16; 
            
            return (
                <g key={index}>
                    {isYang ? (
                        <rect x="0" y={y} width="100" height="10" fill="#8B0000" rx="1" />
                    ) : (
                        <>
                            <rect x="0" y={y} width="42" height="10" fill="#8B0000" rx="1" />
                            <rect x="58" y={y} width="42" height="10" fill="#8B0000" rx="1" />
                        </>
                    )}
                </g>
            );
        })}
        </svg>
    </div>
  );
};

const KinhDich: React.FC = () => {
  const [step, setStep] = useState(0); // 0 = start, 1-6 = tossing lines, 7 = finished tossing
  const [lines, setLines] = useState<TossResult[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState<IChingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const tossCoins = () => {
    if (step >= 6) return;
    setIsAnimating(true);

    setTimeout(() => {
      const c1 = Math.random() < 0.5 ? 0 : 1;
      const c2 = Math.random() < 0.5 ? 0 : 1;
      const c3 = Math.random() < 0.5 ? 0 : 1;
      const sum = c1 + c2 + c3;

      let val = 0;
      let label: TossResult['label'] = 'Thiếu Dương';
      let isYang = true;
      let isChanging = false;

      switch (sum) {
        case 0: // Âm động
          label = 'Lão Âm';
          val = 6;
          isYang = false;
          isChanging = true;
          break;
        case 3: // Dương động
          label = 'Lão Dương';
          val = 9;
          isYang = true;
          isChanging = true;
          break;
        case 1: // Âm tĩnh
          label = 'Thiếu Âm';
          val = 8;
          isYang = false;
          isChanging = false;
          break;
        case 2: // Dương tĩnh
          label = 'Thiếu Dương';
          val = 7;
          isYang = true;
          isChanging = false;
          break;
      }

      const newLine: TossResult = { val, label, isYang, isChanging };
      
      setLines(prev => [...prev, newLine]);
      setStep(prev => prev + 1);
      setIsAnimating(false);
    }, 800); // Animation duration
  };

  const handleInterpret = async () => {
    setLoading(true);
    setResult(null); // Clear previous result
    setImageError(false); // Reset image error
    try {
      // 1. Get Text Result
      const data = await consultIChing(lines, "");
      setResult(data);
      setLoading(false);

      // 2. Trigger Image Generation
      await handleGenerateImage(data);
    } catch (e) {
      console.error(e);
      alert("Có lỗi khi luận giải. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  const handleGenerateImage = async (data: IChingResult) => {
    setImageLoading(true);
    // Optimistically reset error state
    setImageError(false);
    try {
        const imgUrl = await generateHexagramImage(data.hexagramNumber, data.hexagramName, data.symbolism);
        if (imgUrl) {
            setResult(prev => prev ? { ...prev, imageUrl: imgUrl } : null);
        } else {
            // If service returns undefined (all strategies failed), explicitly set error to show fallback
            setImageError(true);
        }
    } catch (e) {
        console.error("Image generation failed", e);
        setImageError(true);
    } finally {
        setImageLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setLines([]);
    setResult(null);
    setImageError(false);
  };

  const scrollToDetails = () => {
    if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageError = () => {
    // When the <img> tag fails to load the URL (CORS, 404, etc.)
    console.warn("Image load failed. Switching to internal Hexagram SVG.");
    setImageError(true);
  };

  // Helper to get descriptive text for tossing result
  const getLineDescription = (line: TossResult) => {
    if (line.isChanging) {
       return line.isYang ? "Dương Động" : "Âm Động";
    }
    return line.isYang ? "Dương Tĩnh" : "Âm Tĩnh";
  };

  // Render visual bar only
  const renderVisualBar = (line: TossResult) => {
    return (
      <div className="w-16 md:w-24 h-6 flex justify-between items-center bg-red-50/20 mx-auto">
        {line.isYang ? (
          <div className={`w-full h-4 ${line.isChanging ? 'bg-orient-red' : 'bg-gray-800'} rounded-sm`}></div>
        ) : (
          <div className="w-full h-4 flex justify-between">
            <div className={`w-[45%] h-full ${line.isChanging ? 'bg-orient-red' : 'bg-gray-800'} rounded-sm`}></div>
            <div className={`w-[45%] h-full ${line.isChanging ? 'bg-orient-red' : 'bg-gray-800'} rounded-sm`}></div>
          </div>
        )}
      </div>
    );
  };

  // Render Table Row
  const renderTableRow = (line: TossResult, index: number) => {
    return (
      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
        <td className="p-2 text-center text-gray-500 font-serif">
          {index + 1}
        </td>
        <td className="p-2 text-center text-xs md:text-sm whitespace-nowrap">
          {result?.lucThu?.[index] || "-"}
        </td>
        <td className="p-2 text-center font-bold text-orient-red text-xs md:text-sm whitespace-nowrap">
          {result?.lucThan?.[index] || "-"}
        </td>
        <td className="p-2 text-center">
          {renderVisualBar(line)}
        </td>
        <td className="p-2 text-center text-gray-700 text-xs md:text-sm whitespace-nowrap">
          {result?.diaChi?.[index] || "-"}
        </td>
        <td className="p-2 text-center text-xs text-gray-500 font-medium whitespace-nowrap">
          <span className="block">{line.label}</span>
          {line.isChanging && <span className="text-orient-red text-[10px]">(Động)</span>}
        </td>
      </tr>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 w-full overflow-hidden px-2 md:px-0">
      {!result && !loading ? (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-orient-gold/30 text-center relative overflow-hidden max-w-4xl mx-auto">
             {/* Decor */}
             <div className="absolute top-0 left-0 w-20 h-20 border-t-8 border-l-8 border-orient-gold/20 rounded-tl-3xl"></div>
             <div className="absolute bottom-0 right-0 w-20 h-20 border-b-8 border-r-8 border-orient-gold/20 rounded-br-3xl"></div>

             <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2 break-words">Gieo Quẻ Kinh Dịch</h2>
             <p className="text-gray-500 italic mb-8 break-words">"Hãy tĩnh tâm suy nghĩ về điều băn khoăn, lòng thành tất linh ứng."</p>

             {/* Visualization of the Hexagram building up (Simple View) */}
             <div className="flex flex-col-reverse items-center justify-center min-h-[250px] py-6 px-4 bg-paper-bg rounded-lg border border-dashed border-gray-300 mb-4 overflow-hidden relative">
                {lines.length === 0 ? (
                  <span className="text-gray-400 text-sm">Các hào sẽ xuất hiện tại đây...</span>
                ) : (
                  lines.map((l, i) => (
                    <div key={i} className="flex items-center gap-4 my-2 w-full justify-center animate-fade-in">
                       <span className="text-xs text-gray-600 font-bold w-24 md:w-32 text-right whitespace-nowrap">
                            {getLineDescription(l)}
                       </span>
                       {renderVisualBar(l)}
                       <span className="text-xs text-gray-400 w-8 text-left whitespace-nowrap">Hào {i + 1}</span>
                    </div>
                  ))
                )}
             </div>

             {/* Legend */}
             <div className="flex items-center justify-center gap-6 mb-8 text-xs text-gray-500 flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-800 rounded-sm"></div>
                    <span>Hào Tĩnh (Thường)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orient-red rounded-sm"></div>
                    <span>Hào Động (Biến đổi)</span>
                </div>
             </div>

             {/* Controls */}
             <div className="flex justify-center">
               {step < 6 ? (
                  <button
                    onClick={tossCoins}
                    disabled={isAnimating}
                    className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all transform active:scale-95 ${
                      isAnimating 
                      ? 'border-gray-300 bg-gray-100' 
                      : 'border-orient-red bg-orient-red text-white hover:bg-red-800 shadow-lg hover:shadow-orient-red/50'
                    }`}
                  >
                    {isAnimating ? (
                      <RefreshCcw className="w-10 h-10 animate-spin text-gray-400" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-serif font-bold">{6 - step}</span>
                        <span className="text-xs uppercase mt-1">Gieo Lần</span>
                      </div>
                    )}
                  </button>
               ) : (
                 <button
                   onClick={handleInterpret}
                   className="flex items-center px-8 py-4 bg-orient-gold text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors shadow-lg animate-pulse"
                 >
                   <Scroll className="mr-2" />
                   Luận Giải Quẻ
                 </button>
               )}
             </div>
        </div>
      ) : loading ? (
         <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-2xl shadow-lg border border-orient-gold/30">
            <Loader2 className="w-16 h-16 text-orient-red animate-spin mb-4" />
            <p className="text-xl font-serif text-gray-700">Đang bình giải thiên cơ...</p>
         </div>
      ) : (
        <div className="space-y-8 animate-slide-up w-full">
           {/* Result Header */}
           <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border-t-4 border-orient-red flex flex-col xl:flex-row items-stretch gap-8 overflow-hidden">
              
              {/* Column 1: Detailed Table (Updated Layout) */}
              <div className="w-full xl:w-auto flex flex-col bg-white rounded-lg border border-orient-gold/30 shrink-0 self-start overflow-hidden">
                 <div className="bg-gray-100 p-3 text-center border-b border-gray-200">
                    <h3 className="font-bold text-orient-red uppercase text-sm">Cấu Trúc Quẻ</h3>
                 </div>
                 <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-300">
                    <table className="w-full text-sm border-collapse min-w-[320px]">
                        <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <th className="p-2 border border-gray-100 whitespace-nowrap">Hào</th>
                            <th className="p-2 border border-gray-100 whitespace-nowrap">Lục Thú</th>
                            <th className="p-2 border border-gray-100 whitespace-nowrap">Lục Thân</th>
                            <th className="p-2 border border-gray-100 min-w-[80px] whitespace-nowrap">Hình Quẻ</th>
                            <th className="p-2 border border-gray-100 whitespace-nowrap">Địa Chi</th>
                            <th className="p-2 border border-gray-100 whitespace-nowrap">Trạng Thái</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Render lines from Top (5) to Bottom (0) */}
                        {[...lines].reverse().map((line, index) => {
                            const actualIndex = lines.length - 1 - index;
                            return renderTableRow(line, actualIndex);
                        })}
                        </tbody>
                    </table>
                 </div>
                 <div className="p-3 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-600 flex justify-center gap-6 flex-wrap">
                    <span className="whitespace-nowrap">Ngoại Quái: <strong className="text-orient-red">{result?.outerTrigram}</strong></span>
                    <span className="whitespace-nowrap">Nội Quái: <strong className="text-orient-red">{result?.innerTrigram}</strong></span>
                 </div>
              </div>

              {/* Column 2: Generated Image */}
              <div className="w-full xl:w-1/4 flex flex-col gap-2 shrink-0">
                  <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative shadow-inner flex items-center justify-center group">
                      {result?.imageUrl && !imageError ? (
                        <>
                            <img 
                            src={result.imageUrl} 
                            alt={result.hexagramName} 
                            onError={handleImageError}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Regenerate Button Overlay */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => result && handleGenerateImage(result)}
                                    disabled={imageLoading}
                                    title="Tạo lại ảnh minh họa"
                                    className="p-2 bg-white/80 hover:bg-white rounded-full text-orient-red shadow-md backdrop-blur-sm"
                                >
                                    {imageLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Wand2 className="w-4 h-4" />}
                                </button>
                            </div>
                        </>
                      ) : (
                        // Fallback State (Loading or Hexagram SVG)
                        <div className="w-full h-full flex flex-col items-center justify-center bg-paper-bg relative">
                           {imageLoading ? (
                             <div className="flex flex-col items-center text-gray-400 p-4 text-center">
                              <Loader2 className="w-10 h-10 animate-spin mb-2" />
                              <span className="text-xs">Đang vẽ lại hình ảnh...</span>
                             </div>
                           ) : (
                             // Internal Hexagram SVG Fallback
                             <>
                                <HexagramSVG lines={lines} />
                                {/* Regenerate Button on top of Fallback */}
                                <div className="absolute top-2 right-2">
                                    <button 
                                        onClick={() => result && handleGenerateImage(result)}
                                        disabled={imageLoading}
                                        title="Thử tạo lại ảnh nghệ thuật"
                                        className="p-2 bg-white/80 hover:bg-white rounded-full text-orient-red shadow-md backdrop-blur-sm"
                                    >
                                        <Wand2 className="w-4 h-4" />
                                    </button>
                                </div>
                             </>
                           )}
                        </div>
                      )}
                      
                      {/* Caption */}
                      {result?.imageUrl && !imageError && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white font-serif text-sm italic opacity-90 text-center line-clamp-2">
                                Minh họa hình tượng: {result?.symbolism}
                            </p>
                        </div>
                      )}
                  </div>
              </div>

              {/* Column 3: Text Info - UPDATED */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 flex-wrap">
                         <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest rounded-full whitespace-nowrap">
                            {result?.hexagramCode}
                        </span>
                        <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border whitespace-nowrap ${result?.isYinOrYang?.includes('Dương') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                            {result?.isYinOrYang}
                        </span>
                    </div>
                   
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-orient-red mb-2 break-words">
                        Quẻ Số {result?.hexagramNumber}: {result?.hexagramName}
                    </h2>
                    
                    <div className="h-1 w-20 bg-orient-gold mb-6 mx-auto lg:mx-0"></div>
                    <p className="text-lg md:text-xl text-gray-800 font-serif italic mb-6 leading-relaxed break-words">
                        "{result?.symbolism}"
                    </p>
                    
                    {/* Link to details */}
                    <button 
                        onClick={scrollToDetails}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 w-full sm:w-auto bg-orient-red text-white font-medium rounded-lg hover:bg-red-800 transition-all hover:shadow-lg group text-sm md:text-base"
                    >
                        <BookOpen className="w-5 h-5 shrink-0" />
                        <span>Xem Chi Tiết Luận Giải</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
                    </button>
                  </div>
              </div>
           </div>

           {/* Detailed Interpretation Section */}
           <div ref={detailsRef} className="space-y-8 pt-8">
                
                {/* Section 1: Yi Jing Meaning */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-stone-100 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                        <div className="p-2 bg-orient-red rounded-lg text-white shrink-0">
                            <span className="font-serif font-bold text-xl">I</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 font-serif break-words">Ý Nghĩa Trong Kinh Dịch</h3>
                    </div>
                    <div className="p-6 md:p-8 space-y-6">
                        <div>
                            <h4 className="text-orient-red font-bold uppercase text-sm mb-2 tracking-wider">Tổng Quan</h4>
                            <p className="text-gray-700 leading-relaxed text-justify mb-2 break-words whitespace-normal">{result?.yiJingMeaning.overview}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="whitespace-nowrap">Nội Quái: <strong className="text-gray-800">{result?.innerTrigram}</strong></span>
                                <span className="text-gray-300 hidden sm:inline">|</span>
                                <span className="whitespace-nowrap">Ngoại Quái: <strong className="text-gray-800">{result?.outerTrigram}</strong></span>
                            </div>
                        </div>
                        
                        {/* Thoán từ structured */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="text-gray-900 font-bold text-sm mb-3 border-b border-gray-200 pb-2">Thoán Từ (Lời Phán)</h4>
                            <div className="space-y-3 text-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-1 sm:gap-2">
                                    <span className="font-bold text-orient-red">Lời kinh:</span>
                                    <span className="text-gray-800 font-serif font-medium break-words">{result?.yiJingMeaning.thuanTu.hanVan}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-1 sm:gap-2">
                                    <span className="font-bold text-gray-600">Dịch âm:</span>
                                    <span className="text-gray-700 italic break-words">{result?.yiJingMeaning.thuanTu.phienAm}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-1 sm:gap-2">
                                    <span className="font-bold text-gray-600">Dịch nghĩa:</span>
                                    <span className="text-gray-900 break-words">{result?.yiJingMeaning.thuanTu.dichNghia}</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-1 sm:gap-2">
                                    <span className="font-bold text-gray-600">Giảng:</span>
                                    <span className="text-gray-700 leading-relaxed break-words">{result?.yiJingMeaning.thuanTu.giangNghia}</span>
                                </div>
                            </div>
                        </div>

                         <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="text-gray-900 font-bold text-sm mb-2">Tượng Quẻ (Hình Ảnh)</h4>
                            <p className="text-gray-800 font-serif font-medium mb-1 break-words">"{result?.yiJingMeaning.tuongQue.text}"</p>
                            <p className="text-gray-600 italic text-sm break-words">{result?.yiJingMeaning.tuongQue.explanation}</p>
                        </div>

                         <div>
                            <h4 className="text-orient-red font-bold uppercase text-sm mb-4 tracking-wider flex items-center gap-2">
                                <Scroll className="w-4 h-4" /> Ý Nghĩa Các Hào
                            </h4>
                            <ul className="space-y-6">
                                {result?.yiJingMeaning.linesMeaning.map((line, idx) => (
                                    <li key={idx} className="bg-stone-50 p-4 sm:p-5 rounded-xl border border-stone-200 transition-all hover:shadow-sm">
                                        <h5 className="font-bold text-lg text-gray-800 mb-3 border-b border-stone-200 pb-2 flex items-center gap-2">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orient-gold/20 text-orient-red text-xs shrink-0">
                                                {idx + 1}
                                            </span>
                                            <span className="break-words">{line.name}</span>
                                        </h5>
                                        <div className="space-y-3 text-sm text-gray-700">
                                             <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-1 sm:gap-2">
                                                <span className="font-bold text-orient-red">Lời kinh:</span>
                                                <span className="text-gray-800 font-serif font-medium break-words">{line.hanVan}</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-1 sm:gap-2">
                                                <span className="font-bold text-gray-500">Dịch âm:</span>
                                                <span className="text-gray-600 italic break-words">{line.phienAm}</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-1 sm:gap-2">
                                                <span className="font-bold text-gray-500">Dịch nghĩa:</span>
                                                <span className="text-gray-900 break-words">{line.dichNghia}</span>
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-stone-200">
                                                <p className="leading-relaxed break-words whitespace-normal"><span className="font-bold text-gray-600 mr-1">Giảng nghĩa:</span> {line.giangNghia}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Section 2: Divination Meaning */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                     <div className="bg-stone-100 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                        <div className="p-2 bg-orient-gold rounded-lg text-white shrink-0">
                            <span className="font-serif font-bold text-xl">II</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 font-serif break-words">Ý Nghĩa Chiêm Bốc (Đoán Quẻ)</h3>
                    </div>
                    <div className="p-6 md:p-8 space-y-8">
                        {/* Meaning Keywords */}
                        <div>
                             <h4 className="text-orient-red font-bold uppercase text-sm mb-2 tracking-wider">Ý Nghĩa Cốt Lõi</h4>
                             <p className="text-gray-700 leading-relaxed text-lg font-medium bg-orange-50/50 p-4 rounded-lg border border-orange-100 break-words">
                                {result?.divinationMeaning.meaning}
                             </p>
                        </div>
                        
                        {/* Omen / Triệu */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                                <h4 className="text-blue-800 font-bold mb-4 flex items-center gap-2 flex-wrap">
                                    <Circle className="w-4 h-4 fill-blue-600 shrink-0" /> Triệu & Điềm: <span className="text-blue-900 uppercase break-words">{result?.divinationMeaning.omen.mainText}</span>
                                </h4>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    {/* Poem */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h5 className="text-gray-500 text-xs uppercase font-bold mb-2 flex items-center gap-1"><Quote className="w-3 h-3"/> Thơ Cổ</h5>
                                        <p className="font-serif text-gray-800 italic whitespace-pre-line leading-relaxed break-words">
                                            {result?.divinationMeaning.omen.poem}
                                        </p>
                                    </div>
                                    {/* Story */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                         <h5 className="text-gray-500 text-xs uppercase font-bold mb-2 flex items-center gap-1"><BookMarked className="w-3 h-3"/> Tích Xưa</h5>
                                         <p className="text-gray-700 text-sm leading-relaxed break-words">
                                            {result?.divinationMeaning.omen.story}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                     <div className="text-sm">
                                        <span className="font-bold text-gray-800 flex items-center gap-1 mb-1"><MessageSquareQuote className="w-3 h-3"/> Lời Bàn:</span>
                                        <p className="text-gray-700 break-words">{result?.divinationMeaning.omen.commentary}</p>
                                     </div>
                                      <div className="text-sm">
                                        <span className="font-bold text-gray-800 flex items-center gap-1 mb-1"><ArrowRight className="w-3 h-3"/> Lời Đoán:</span>
                                        <p className="text-gray-700 break-words">{result?.divinationMeaning.omen.prediction}</p>
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* God to use */}
                        <div className="p-4 border border-purple-100 bg-purple-50/50 rounded-lg">
                            <h4 className="text-purple-800 font-bold mb-2 flex items-center gap-2"><Circle className="w-3 h-3 fill-purple-600" /> Dụng Thần</h4>
                            <p className="text-gray-700 text-sm break-words">{result?.divinationMeaning.godToUse}</p>
                        </div>
                    </div>
                </div>

                {/* Section 3: Specific Contexts */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-stone-100 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                        <div className="p-2 bg-gray-700 rounded-lg text-white shrink-0">
                            <span className="font-serif font-bold text-xl">III</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 font-serif break-words">Luận Giải Cho Từng Sự Việc</h3>
                    </div>
                    <div className="p-6 md:p-8">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {[
                                { label: "Tình thế hiện tại", val: result?.specificContexts.currentSituation },
                                { label: "Tương lai", val: result?.specificContexts.future },
                                { label: "Sự nghiệp & Công danh", val: result?.specificContexts.career },
                                { label: "Tài lộc & Tài sản", val: result?.specificContexts.wealth },
                                { label: "Tình duyên & Gia đạo", val: result?.specificContexts.love },
                                { label: "Học tập & Thi cử", val: result?.specificContexts.study },
                                { label: "Sức khỏe", val: result?.specificContexts.health },
                                { label: "Con cái (Tử tức)", val: result?.specificContexts.children },
                                { label: "Xuất hành", val: result?.specificContexts.travel },
                                { label: "Nhà cửa (Điền trạch)", val: result?.specificContexts.house },
                                { label: "Mồ mả", val: result?.specificContexts.graves },
                                { label: "Tranh chấp & Kiện tụng", val: result?.specificContexts.disputes },
                                { label: "Mất của", val: result?.specificContexts.lostProperty },
                                { label: "Giấy tờ & Thủ tục", val: result?.specificContexts.documents },
                            ].map((item, idx) => (
                                <div key={idx} className="border-b border-gray-100 pb-4 last:border-0">
                                    <h5 className="font-bold text-gray-900 text-sm uppercase mb-1">{item.label}</h5>
                                    <p className="text-gray-600 text-sm break-words">{item.val}</p>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>

           </div>

           <div className="text-center pt-8 pb-8">
              <button 
                onClick={reset}
                className="px-8 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
              >
                Gieo quẻ mới
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default KinhDich;