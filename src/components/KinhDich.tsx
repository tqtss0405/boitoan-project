import React, { useState, useRef } from 'react';
import type { TossResult, IChingResult } from '../types';
import { getHexagramBasicInfo } from '../services/geminiService';
import { RefreshCcw, Scroll, Circle, BookOpen, Zap, Image as ImageIcon, X, ZoomIn, Download, Loader2 } from 'lucide-react';

const HexagramSVG: React.FC<{ lines: TossResult[] }> = ({ lines }) => {
  const displayLines = [...lines].reverse();
  return (
    <div id="hexagram-svg-container" className="w-full aspect-square bg-paper-bg flex items-center justify-center p-4 border-2 border-dashed border-orient-gold/30 rounded-lg">
        <svg viewBox="0 0 100 100" className="w-full h-full max-w-[160px]">
        {displayLines.map((line, index) => {
            const isYang = line.val % 2 !== 0;
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
  const [step, setStep] = useState(0); 
  const [lines, setLines] = useState<TossResult[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState<IChingResult | null>(null);
  const [isZoomed, setIsZoomed] = useState(false); 
  const [isDownloading, setIsDownloading] = useState(false);
  
  const detailsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const generateLine = (): TossResult => {
      const c1 = Math.random() < 0.5 ? 0 : 1;
      const c2 = Math.random() < 0.5 ? 0 : 1;
      const c3 = Math.random() < 0.5 ? 0 : 1;
      const sum = c1 + c2 + c3;
      let val = 0;
      let label: TossResult['label'] = 'Thiếu Dương';
      let isYang = true;
      let isChanging = false;

      switch (sum) {
        case 0: val = 6; label = 'Lão Âm'; isYang = false; isChanging = true; break;
        case 3: val = 9; label = 'Lão Dương'; isYang = true; isChanging = true; break;
        case 1: val = 8; label = 'Thiếu Âm'; isYang = false; isChanging = false; break;
        case 2: val = 7; label = 'Thiếu Dương'; isYang = true; isChanging = false; break;
      }
      return { val, label, isYang, isChanging };
  };

  const tossCoins = () => {
    if (step >= 6) return;
    setIsAnimating(true);
    setTimeout(() => {
      setLines(prev => [...prev, generateLine()]);
      setStep(prev => prev + 1);
      setIsAnimating(false);
    }, 800);
  };

  const quickToss = () => {
      if (step >= 6) return;
      setIsAnimating(true);
      setTimeout(() => {
          const linesNeeded = 6 - lines.length;
          const newLines: TossResult[] = [];
          for (let i = 0; i < linesNeeded; i++) newLines.push(generateLine());
          setLines(prev => [...prev, ...newLines]);
          setStep(6);
          setIsAnimating(false);
      }, 600);
  };

  const handleInterpret = () => {
    // Chỉ lấy dữ liệu từ file store, không gọi AI
    const basicInfo = getHexagramBasicInfo(lines);
    setResult(basicInfo); 
    // Cuộn xuống phần chi tiết sau một chút
    setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const reset = () => {
    setStep(0);
    setLines([]);
    setResult(null);
    setIsZoomed(false);
  };
  
  const handleDownload = async () => {
    if (!resultRef.current || !result) return;
    
    // Access html2canvas from window
    const html2canvas = (window as any).html2canvas;
    
    if (!html2canvas) {
        alert("Thư viện tạo ảnh chưa tải xong. Vui lòng thử lại sau vài giây.");
        return;
    }

    setIsDownloading(true);
    
    try {
        const canvas = await html2canvas(resultRef.current, {
            scale: 3, // Tăng độ phân giải lên 3x để ảnh nét hơn
            useCORS: true, // Cho phép tải ảnh từ nguồn khác (nếu có)
            backgroundColor: '#F9F5EB', // Màu nền giấy
            onclone: (clonedDoc: Document) => {
                // Xóa các class animation trong bản clone để tránh lỗi hiển thị mờ/nhòe do transform/opacity
                const elements = clonedDoc.querySelectorAll('.animate-slide-up, .animate-fade-in');
                elements.forEach((el) => {
                    el.classList.remove('animate-slide-up');
                    el.classList.remove('animate-fade-in');
                    (el as HTMLElement).style.opacity = '1';
                    (el as HTMLElement).style.transform = 'none';
                });
            },
            ignoreElements: (element: HTMLElement) => {
                // Ẩn các nút khi chụp ảnh
                return element.tagName === 'BUTTON' && !element.classList.contains('do-not-ignore');
            }
        });

        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.href = image;
        link.download = `Que-${result.hexagramNumber}-${result.hexagramName.replace(/\s+/g, '-')}.png`;
        link.click();
    } catch (error) {
        console.error("Lỗi khi tạo ảnh:", error);
        alert("Không thể tạo ảnh lúc này. Vui lòng thử lại.");
    } finally {
        setIsDownloading(false);
    }
  };

  const scrollToDetails = () => detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  const getLineDescription = (line: TossResult) => line.isChanging ? (line.isYang ? "Dương Động" : "Âm Động") : (line.isYang ? "Dương Tĩnh" : "Âm Tĩnh");
  
  const renderVisualBar = (line: TossResult) => (
      <div className="w-12 h-4 flex justify-between items-center bg-red-50/20 mx-auto">
        {line.isYang ? (
          <div className={`w-full h-3 ${line.isChanging ? 'bg-orient-red' : 'bg-gray-800'} rounded-[1px]`}></div>
        ) : (
          <div className="w-full h-3 flex justify-between">
            <div className={`w-[45%] h-full ${line.isChanging ? 'bg-orient-red' : 'bg-gray-800'} rounded-[1px]`}></div>
            <div className={`w-[45%] h-full ${line.isChanging ? 'bg-orient-red' : 'bg-gray-800'} rounded-[1px]`}></div>
          </div>
        )}
      </div>
  );

  const renderTableRow = (line: TossResult, index: number) => (
      <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-stone-50 transition-colors">
        <td className="py-3 text-center text-gray-400 font-serif font-bold text-sm">{index + 1}</td>
        <td className="py-3 text-center">{renderVisualBar(line)}</td>
        <td className="py-3 text-center text-xs text-gray-600 font-medium whitespace-nowrap">
          <span className="block">{line.label}</span>
          {line.isChanging && <span className="text-orient-red text-[10px] font-bold">(Động)</span>}
        </td>
      </tr>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 w-full overflow-hidden px-2 md:px-0">
      {!result ? (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-orient-gold/30 text-center relative overflow-hidden max-w-4xl mx-auto">
             <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Gieo Quẻ Kinh Dịch</h2>
             <div className="flex flex-col-reverse items-center justify-center min-h-[250px] py-6 px-4 bg-paper-bg rounded-lg border border-dashed border-gray-300 mb-4 overflow-hidden relative">
                {lines.length === 0 ? <span className="text-gray-400 text-sm">Các hào sẽ xuất hiện tại đây...</span> : 
                  lines.map((l, i) => (
                    <div key={i} className="flex items-center gap-4 my-2 w-full justify-center animate-fade-in">
                       <span className="text-xs text-gray-600 font-bold w-24 text-right">{getLineDescription(l)}</span>
                       {renderVisualBar(l)}
                       <span className="text-xs text-gray-400 w-8 text-left">Hào {i + 1}</span>
                    </div>
                  ))
                }
             </div>
             <div className="flex flex-col items-center gap-4">
               {step < 6 ? (
                  <div className="flex flex-col items-center gap-3">
                    <button onClick={tossCoins} disabled={isAnimating} className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all ${isAnimating ? 'border-gray-300 bg-gray-100' : 'border-orient-red bg-orient-red text-white hover:bg-red-800 shadow-lg'}`}>
                        {isAnimating ? <RefreshCcw className="w-10 h-10 animate-spin text-gray-400" /> : <div className="flex flex-col items-center"><span className="text-3xl font-serif font-bold">{6 - step}</span></div>}
                    </button>
                    <button onClick={quickToss} disabled={isAnimating} className="flex items-center gap-2 px-6 py-2 bg-white text-gray-600 rounded-full hover:bg-orient-red hover:text-white transition-all text-sm font-medium border border-gray-200 shadow-sm">
                        <Zap className="w-4 h-4" /> {step === 0 ? "Gieo 1 Lần (6 Hào)" : "Gieo Nhanh"}
                    </button>
                  </div>
               ) : (
                 <button onClick={handleInterpret} className="flex items-center px-8 py-4 bg-orient-gold text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors shadow-lg animate-pulse">
                   <Scroll className="mr-2" /> Xem Kết Quả
                 </button>
               )}
             </div>
        </div>
      ) : (
        <div ref={resultRef} className="space-y-8 animate-slide-up w-full p-2 md:p-6 bg-paper-bg rounded-xl">
           
           <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                
                {/* --- CỘT TRÁI: CẤU TRÚC (Chiếm 4 phần) --- */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-6 bg-orient-red rounded-full"></div>
                        <h3 className="font-bold text-gray-800 uppercase text-sm tracking-wide">Cấu Trúc Quẻ</h3>
                    </div>
                    
                    {/* Card Cấu Trúc */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="py-2 border-b">Hào</th>
                                    <th className="py-2 border-b">Hình</th>
                                    <th className="py-2 border-b">Thế</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {[...lines].reverse().map((line, index) => renderTableRow(line, lines.length - 1 - index))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card Đồ Hình */}
                    <div className="flex flex-col items-center">
                        <HexagramSVG lines={lines} />
                        <span className="text-xs text-gray-400 mt-2 font-serif italic">Đồ hình {result.hexagramName}</span>
                    </div>
                </div>

                {/* --- CỘT PHẢI: HÌNH ẢNH & THÔNG TIN (Chiếm 8 phần) --- */}
                <div className="md:col-span-8 flex flex-col">
                    
                    {/* 1. Hình ảnh Minh Họa (Ở trên cùng) */}
                    <div 
                        className="w-full relative mb-8 group cursor-zoom-in"
                        onClick={() => setIsZoomed(true)}
                    >
                         {/* Khung viền trang trí cho ảnh */}
                         <div className="absolute inset-0 border-2 border-orient-gold/20 transform translate-x-2 translate-y-2 rounded-xl"></div>
                         <div className="relative bg-stone-100 rounded-xl overflow-hidden shadow-lg border border-stone-200 aspect-[16/9] flex items-center justify-center">
                            <img 
                                src={`/images/hexagrams/${result.hexagramNumber}.jpg`} 
                                alt={`Minh họa quẻ ${result.hexagramName}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    // Fallback nếu không có ảnh: Hiện placeholder đẹp
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement?.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'bg-stone-50');
                                }}
                            />
                            {/* Fallback content hiển thị khi ảnh ẩn đi (do error) hoặc đang load */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-[-1] pointer-events-none group-has-[img[style*='none']]:opacity-100 group-has-[img[style*='none']]:z-10">
                                <ImageIcon className="w-16 h-16 text-gray-300 mb-2" />
                                <span className="text-gray-400 font-serif italic">Đang cập nhật hình ảnh minh họa</span>
                            </div>
                            
                            {/* Zoom Icon Indicator */}
                            <div className="absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ZoomIn className="w-5 h-5" />
                            </div>
                         </div>
                    </div>

                    {/* 2. Thông tin Tên Quẻ (Ở dưới ảnh) */}
                    <div className="text-center md:px-8 space-y-4">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                             <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-full uppercase tracking-wider border border-stone-200">
                                {result.hexagramCode}
                             </span>
                             <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
                                 result.isYinOrYang.includes('Cát') ? 'bg-green-50 text-green-700 border-green-200' :
                                 result.isYinOrYang.includes('Hung') ? 'bg-red-50 text-red-700 border-red-200' :
                                 'bg-blue-50 text-blue-700 border-blue-200'
                             }`}>
                                {result.isYinOrYang}
                             </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-orient-red leading-tight">
                            <span className="text-2xl text-orient-gold/80 block mb-1 font-sans font-medium uppercase tracking-widest text-sm">Quẻ Số {result.hexagramNumber}</span>
                            {result.hexagramName}
                        </h1>
                        
                        <div className="flex items-center justify-center gap-4">
                             <div className="h-px w-12 bg-gray-300"></div>
                             <p className="text-xl text-gray-700 font-serif italic">"{result.symbolism}"</p>
                             <div className="h-px w-12 bg-gray-300"></div>
                        </div>

                        <div className="pt-4 flex items-center justify-center gap-3">
                            <button onClick={scrollToDetails} className="inline-flex items-center gap-2 px-6 py-3 bg-orient-red text-white font-medium rounded-full shadow-lg hover:bg-red-800 hover:-translate-y-1 transition-all duration-300">
                                <BookOpen className="w-5 h-5" /> 
                                Xem Luận Giải
                            </button>
                        </div>
                    </div>

                </div>
             </div>
           </div>

           {/* Content Section (Chi tiết luận giải) */}
           <div ref={detailsRef} className="space-y-8 pt-4">
                {/* 1. Meaning */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative min-h-[300px]">
                    <div className="bg-stone-100 px-6 py-4 border-b border-gray-200 flex items-center gap-3"><span className="p-2 bg-orient-red rounded-lg text-white font-bold">I</span><h3 className="text-xl font-bold text-gray-800 font-serif">Ý Nghĩa Kinh Dịch</h3></div>
                    <div className="p-6 md:p-8 space-y-6">
                        <div><h4 className="text-orient-red font-bold text-sm uppercase mb-2">Tổng Quan</h4><p className="text-gray-700 leading-relaxed text-justify">{result.yiJingMeaning.overview}</p></div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <h4 className="text-gray-900 font-bold text-sm mb-2">Thoán Từ</h4>
                            <p className="text-gray-800 font-serif italic mb-1">{result.yiJingMeaning.thuanTu.hanVan}</p>
                            <p className="text-gray-700">{result.yiJingMeaning.thuanTu.giangNghia}</p>
                        </div>
                        <div>
                            <h4 className="text-orient-red font-bold text-sm uppercase mb-4 flex items-center gap-2"><Scroll className="w-4 h-4" /> Hào Từ (Chi Tiết 6 Hào)</h4>
                           
                            <ul className="space-y-4">
                                {result.yiJingMeaning.linesMeaning && result.yiJingMeaning.linesMeaning.length > 0 ? result.yiJingMeaning.linesMeaning.map((line, idx) => (
                                    <li key={idx} className={`bg-stone-50 p-4 rounded-lg border ${lines[idx]?.isChanging ? 'border-orient-red/40 bg-red-50/20' : 'border-stone-200'}`}>
                                        <h5 className="font-bold text-gray-800 mb-1 flex justify-between">
                                            <span>{line.name} {lines[idx]?.isChanging && <span className="text-red-600 text-xs ml-2">(Động - Cần lưu ý)</span>}</span>
                                            <span className="text-xs text-gray-400 font-normal hidden md:block">{line.hanVan}</span>
                                        </h5>
                                        <p className="text-sm text-gray-700 italic mb-1">{line.phienAm}</p>
                                        <p className="text-sm text-gray-900 font-medium mb-2">{line.dichNghia}</p>
                                        <p className="text-sm text-gray-600 border-t border-gray-200 pt-2">{line.giangNghia}</p>
                                    </li>
                                )) : <p className="text-gray-500 italic text-sm text-center">Đang cập nhật dữ liệu hào từ cho quẻ này...</p>}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 2. Divination */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative min-h-[200px]">
                     <div className="bg-stone-100 px-6 py-4 border-b border-gray-200 flex items-center gap-3"><span className="p-2 bg-orient-gold rounded-lg text-white font-bold">II</span><h3 className="text-xl font-bold text-gray-800 font-serif">Ý Nghĩa Chiêm Bốc</h3></div>
                     <div className="p-6 md:p-8 space-y-6">
                             <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="text-blue-800 font-bold mb-2 flex items-center gap-2"><Circle className="w-3 h-3 fill-blue-600"/> Triệu: {result.divinationMeaning.omen.mainText}</h4>
                                <p className="text-gray-700 text-sm italic mb-2">"{result.divinationMeaning.omen.poem}"</p>
                                <p className="text-gray-700 text-sm">{result.divinationMeaning.omen.prediction}</p>
                             </div>
                             <div className="p-4 bg-purple-50 rounded-lg border border-purple-100"><h4 className="text-purple-800 font-bold text-sm mb-1">Dụng Thần</h4><p className="text-gray-700 text-sm">{result.divinationMeaning.godToUse}</p></div>
                        </div>
                </div>

                {/* 3. Details */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 min-h-[200px] relative">
                    <div className="bg-stone-100 px-6 py-4 border-b border-gray-200 flex items-center gap-3"><span className="p-2 bg-gray-700 rounded-lg text-white font-bold">III</span><h3 className="text-xl font-bold text-gray-800 font-serif">Lời Khuyên Chi Tiết</h3></div>
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {[
                            { label: "Hiện Tại", val: result?.specificContexts?.currentSituation },
                            { label: "Tương Lai", val: result?.specificContexts?.future },
                            { label: "Sự Nghiệp", val: result?.specificContexts?.career },
                            { label: "Tài Lộc", val: result?.specificContexts?.wealth },
                            { label: "Tình Duyên", val: result?.specificContexts?.love },
                            { label: "Gia Đạo", val: result?.specificContexts?.house },
                        ].map((item, idx) => (
                            <div key={idx} className="border-b border-gray-100 pb-2"><h5 className="font-bold text-gray-900 text-xs uppercase mb-1">{item.label}</h5><p className="text-gray-600 text-sm">{item.val || "Đang cập nhật..."}</p></div>
                        ))}
                    </div>
                </div>
           </div>

           <div className="text-center pt-8 pb-8 flex flex-col md:flex-row items-center justify-center gap-4">
               <button onClick={reset} className="px-8 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors">Gieo quẻ mới</button>
               <button 
                  onClick={handleDownload} 
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-orient-gold hover:bg-yellow-600 text-white font-medium transition-colors shadow-lg"
               >
                   {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                   {isDownloading ? "Đang xử lý..." : "Lưu Kết Quả (Ảnh)"}
               </button>
           </div>
           
           {/* Image Zoom Modal */}
           {isZoomed && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in backdrop-blur-sm cursor-zoom-out"
                    onClick={() => setIsZoomed(false)}
                >
                    <button 
                        className="absolute top-4 right-4 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
                        onClick={() => setIsZoomed(false)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    
                    <div 
                        className="flex flex-col items-center justify-center max-w-full max-h-full space-y-4"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <img 
                            src={`/images/hexagrams/${result.hexagramNumber}.jpg`} 
                            alt={`Minh họa quẻ ${result.hexagramName}`}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
                        />
                         <div className="text-center">
                             <h3 className="text-orient-gold font-serif text-2xl font-bold">{result.hexagramName}</h3>
                             <p className="text-white/60 text-sm uppercase tracking-widest mt-1">Quẻ số {result.hexagramNumber}</p>
                         </div>
                    </div>
                </div>
           )}
        </div>
      )}
    </div>
  );
};
export default KinhDich;