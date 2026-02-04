import React from 'react';
import { CompatibilityResult, CompatibilityDetail } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { CheckCircle2, AlertCircle, MinusCircle, Star } from 'lucide-react';

interface ResultDisplayProps {
  result: CompatibilityResult;
}

const DetailRow: React.FC<{ detail: CompatibilityDetail; index: number }> = ({ detail, index }) => {
  const getIcon = (score: number) => {
    if (score >= 1.5) return <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />;
    if (score >= 1) return <MinusCircle className="w-6 h-6 text-yellow-600 shrink-0" />;
    return <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />;
  };

  const getBgColor = (score: number) => {
     if (score >= 1.5) return 'bg-green-50 border-green-200';
     if (score >= 1) return 'bg-yellow-50 border-yellow-200';
     return 'bg-red-50 border-red-200';
  };

  return (
    <div className={`p-4 rounded-xl border ${getBgColor(detail.score)} transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between mb-2 gap-3">
        <h4 className="font-bold text-gray-800 text-lg break-words">{index + 1}. {detail.criteria}</h4>
        <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-600 whitespace-nowrap">{detail.assessment}</span>
            {getIcon(detail.score)}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-3">
        <div className="bg-white/60 p-2 rounded">
            <span className="block text-xs text-gray-500 font-semibold uppercase">Chồng</span>
            <span className="font-serif text-gray-900 break-words">{detail.husbandInfo}</span>
        </div>
        <div className="bg-white/60 p-2 rounded">
            <span className="block text-xs text-gray-500 font-semibold uppercase">Vợ</span>
            <span className="font-serif text-gray-900 break-words">{detail.wifeInfo}</span>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm italic border-t border-black/5 pt-2 mt-2 break-words">
        "{detail.explanation}"
      </p>
    </div>
  );
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const chartData = [
    { name: 'Score', value: result.overallScore },
    { name: 'Remaining', value: 10 - result.overallScore },
  ];
  
  const scoreColor = result.overallScore >= 8 ? '#166534' : result.overallScore >= 5 ? '#ca8a04' : '#991b1b';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in w-full overflow-hidden">
      
      {/* Header Summary Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orient-gold/40">
        <div className="bg-orient-red p-4 text-white text-center">
            <h2 className="text-2xl font-serif font-bold break-words">Kết Quả Luận Giải</h2>
            <div className="flex justify-center gap-2 md:gap-8 mt-2 text-sm opacity-90 flex-wrap">
                <span className="whitespace-nowrap">Chồng: {result.husbandLunarYear} ({result.husbandYear})</span>
                <span className="hidden md:inline">•</span>
                <span className="whitespace-nowrap">Vợ: {result.wifeLunarYear} ({result.wifeYear})</span>
            </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
            {/* Score Chart */}
            <div className="w-48 h-48 flex-shrink-0 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={180}
                        endAngle={0}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell key="cell-0" fill={scoreColor} />
                        <Cell key="cell-1" fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="block text-4xl font-bold font-serif" style={{ color: scoreColor }}>{result.overallScore}</span>
                    <span className="text-xs text-gray-400 uppercase">Trên 10</span>
                  </div>
            </div>

            {/* Verbal Verdict */}
            <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orient-gold/20 text-yellow-800 text-xs font-bold uppercase tracking-wider mb-2">
                    <Star className="w-3 h-3 fill-yellow-700" /> Tổng Quan
                </div>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3 break-words">{result.verdict}</h3>
                <p className="text-gray-600 leading-relaxed break-words">
                    Hai bạn có số điểm tương hợp là <strong style={{ color: scoreColor }}>{result.overallScore}/10</strong>. 
                    {result.advice}
                </p>
            </div>
        </div>
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 gap-4">
        <h3 className="text-xl font-serif font-bold text-gray-800 border-l-4 border-orient-red pl-3 flex items-center">
            Chi Tiết 5 Yếu Tố
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.detailedAnalysis.map((detail, idx) => (
                <div key={idx} className={idx === result.detailedAnalysis.length - 1 ? "md:col-span-2" : ""}>
                   <DetailRow detail={detail} index={idx} />
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ResultDisplay;