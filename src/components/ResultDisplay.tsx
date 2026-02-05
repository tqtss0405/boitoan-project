import React, { useState, useCallback, useRef } from 'react';
import { CompatibilityResult, CompatibilityDetail } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CheckCircle2, AlertCircle, MinusCircle, Star, Download, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';

interface ResultDisplayProps {
  result: CompatibilityResult;
}

const DetailRow: React.FC<{ detail: CompatibilityDetail; index: number }> = ({ detail, index }) => {
  const getIcon = (score: number) => {
    if (score >= 1.5) return <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />;
    if (score >= 1) return <MinusCircle className="w-6 h-6 text-yellow-600 shrink-0" />;
    return <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />;
  };

  const bgColor = detail.score >= 1.5 ? 'bg-green-50 border-green-200' : 
                  detail.score >= 1 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200';

  return (
    <div className={`p-4 rounded-xl border ${bgColor} hover:shadow-md`}>
      <div className="flex justify-between mb-2 gap-3">
        <h4 className="font-bold text-gray-800">{index + 1}. {detail.criteria}</h4>
        <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-bold text-gray-600 uppercase">{detail.assessment}</span>
            {getIcon(detail.score)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm mb-2">
        <div className="bg-white/60 p-2 rounded"><span className="block text-xs text-gray-500 uppercase">Chồng</span>{detail.husbandInfo}</div>
        <div className="bg-white/60 p-2 rounded"><span className="block text-xs text-gray-500 uppercase">Vợ</span>{detail.wifeInfo}</div>
      </div>
      <p className="text-gray-700 text-sm italic border-t border-black/10 pt-2">"{detail.explanation}"</p>
    </div>
  );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  // --- LOGIC XỬ LÝ ĐIỂM SỐ (FIX LỖI 40/10) ---
  // Nếu điểm > 10 (ví dụ 40, 80), tự động chia cho 10 để về thang điểm 10
  const finalScore = result.overallScore > 10 ? (result.overallScore / 10) : result.overallScore;
  
  // Dữ liệu biểu đồ (Thang 10)
  const chartData = [
    { name: 'Score', value: finalScore },
    { name: 'Remaining', value: 10 - finalScore }
  ];
  
  const scoreColor = finalScore >= 8 ? '#166534' : finalScore >= 5 ? '#ca8a04' : '#991b1b';

  const handleDownload = useCallback(async () => {
    if (!captureRef.current) return;
    setIsCapturing(true);
    try {
      await document.fonts.ready; // Chờ font tải xong
      const dataUrl = await toPng(captureRef.current, { 
          cacheBust: true, 
          pixelRatio: 2, 
          backgroundColor: '#F9F5EB',
          style: { margin: '0' }
      });
      
      const link = document.createElement('a');
      link.download = `Ket-Qua-${result.husbandYear}-${result.wifeYear}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Lỗi tải ảnh (Hãy thử mở bằng Chrome/Edge)");
    } finally {
      setIsCapturing(false);
    }
  }, [result]);

  return (
    // Dùng w-full thay vì max-w để bung rộng theo khung cha
    <div className="w-full space-y-8 animate-fade-in overflow-hidden">
      
      {/* VÙNG CHỤP ẢNH */}
      <div ref={captureRef} className="space-y-8 bg-paper-bg p-6 rounded-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-orient-gold/40 overflow-hidden">
          <div className="bg-orient-red p-4 text-white text-center">
              <h2 className="text-2xl font-serif font-bold">Kết Quả Luận Giải</h2>
              <p className="mt-1 opacity-90">Chồng: {result.husbandYear} • Vợ: {result.wifeYear}</p>
          </div>
          <div className="p-6 flex flex-col md:flex-row items-center gap-8">
              
              {/* --- BIỂU ĐỒ TRÒN --- */}
              <div className="relative flex-shrink-0 mx-auto md:mx-0" style={{ width: '192px', height: '192px' }}>
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        {/* startAngle=90 để xoay vòng tròn cho đẹp mắt */}
                        <Pie 
                            data={chartData} 
                            innerRadius={60} 
                            outerRadius={80} 
                            startAngle={90} 
                            endAngle={-270} 
                            dataKey="value" 
                            stroke="none"
                        >
                            <Cell key="score" fill={scoreColor} />
                            <Cell key="rest" fill="#e5e7eb" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    
                    {/* --- CĂN GIỮA TUYỆT ĐỐI (FIX LỖI LỆCH) --- */}
                    {/* top-1/2: Căn giữa theo chiều dọc */}
                    {/* left-1/2: Căn giữa theo chiều ngang */}
                    {/* transform: Dịch chuyển về đúng tâm */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center leading-none">
                      <span className="block text-4xl font-bold font-serif mb-1" style={{ color: scoreColor }}>
                        {finalScore} {/* Hiển thị điểm đã sửa (vd: 4 thay vì 40) */}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Trên 10</span>
                    </div>
              </div>

              {/* Text Kết Luận */}
              <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orient-gold/20 text-yellow-800 text-xs font-bold uppercase tracking-wider mb-2">
                      <Star className="w-3 h-3 fill-yellow-700" /> Tổng Quan
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2 leading-tight">{result.verdict}</h3>
                  <p className="text-gray-600 leading-relaxed">
                      Hai bạn có số điểm tương hợp là <strong style={{ color: scoreColor }}>{finalScore}/10</strong>. 
                      {result.advice}
                  </p>
              </div>
          </div>
        </div>

        {/* Danh sách chi tiết */}
        <div className="grid gap-6 md:grid-cols-2">
           {result.detailedAnalysis.map((d, i) => <DetailRow key={i} detail={d} index={i} />)}
        </div>
      </div>

      {/* NÚT TẢI */}
      <div className="flex justify-center mt-6">
        <button onClick={handleDownload} disabled={isCapturing} className="flex items-center gap-2 px-6 py-3 bg-orient-red text-white rounded-full font-bold shadow-lg hover:bg-red-800 disabled:opacity-50">
          {isCapturing ? <Loader2 className="animate-spin" /> : <Download />}
          {isCapturing ? "Đang xử lý..." : "Tải Ảnh Kết Quả"}
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;