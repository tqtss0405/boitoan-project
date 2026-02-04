import React, { useState } from 'react';
import { FormData, CompatibilityResult } from './types';
import { checkCompatibility } from './services/geminiService';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import KinhDich from './components/KinhDich';
import { Heart, ScrollText } from 'lucide-react';

type Tab = 'compatibility' | 'iching';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('compatibility');
  
  // Compatibility State
  const [compResult, setCompResult] = useState<CompatibilityResult | null>(null);
  const [compLoading, setCompLoading] = useState<boolean>(false);
  const [compError, setCompError] = useState<string | null>(null);

  const handleCompatibilitySubmit = async (data: FormData) => {
    setCompLoading(true);
    setCompError(null);
    setCompResult(null);

    try {
      const compatibilityResult = await checkCompatibility(data);
      setCompResult(compatibilityResult);
    } catch (err: any) {
      console.error(err);
      setCompError("Đã xảy ra lỗi khi kết nối với chuyên gia. Vui lòng thử lại sau.");
    } finally {
      setCompLoading(false);
    }
  };

  const resetComp = () => {
    setCompResult(null);
    setCompError(null);
  };

  return (
    <div className="min-h-screen font-sans pb-12 bg-paper-bg">
      {/* Header / Hero Section */}
      <header className="bg-orient-red text-white pt-10 pb-20 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3 text-orient-gold tracking-wide">
            Huyền Học Phương Đông
          </h1>
          <p className="text-red-100 text-sm md:text-base max-w-2xl mx-auto font-light opacity-90">
            Khám phá huyền cơ, thấu hiểu nhân duyên và vận mệnh qua lăng kính Phong Thủy & Kinh Dịch.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="absolute bottom-0 left-0 w-full">
           <div className="flex justify-center max-w-4xl mx-auto px-4">
              <button
                onClick={() => setActiveTab('compatibility')}
                className={`flex items-center gap-2 px-6 py-4 rounded-t-xl font-medium transition-all duration-300 ${
                  activeTab === 'compatibility' 
                  ? 'bg-paper-bg text-orient-red translate-y-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]' 
                  : 'bg-orient-red/50 text-white/70 hover:bg-orient-red/70 translate-y-1'
                }`}
              >
                <Heart className={`w-5 h-5 ${activeTab === 'compatibility' ? 'fill-orient-red' : ''}`} />
                Xem Tuổi Vợ Chồng
              </button>
              <button
                onClick={() => setActiveTab('iching')}
                className={`flex items-center gap-2 px-6 py-4 rounded-t-xl font-medium transition-all duration-300 ml-2 ${
                  activeTab === 'iching' 
                  ? 'bg-paper-bg text-orient-red translate-y-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]' 
                  : 'bg-orient-red/50 text-white/70 hover:bg-orient-red/70 translate-y-1'
                }`}
              >
                <ScrollText className="w-5 h-5" />
                Gieo Quẻ Kinh Dịch
              </button>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8 relative z-20 min-h-[600px]">
        
        {/* Tab Content 1: Compatibility */}
        {activeTab === 'compatibility' && (
          <div className="animate-fade-in">
             {compError && (
              <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg flex items-center justify-center">
                {compError}
              </div>
            )}

            {!compResult ? (
              <InputForm onSubmit={handleCompatibilitySubmit} isLoading={compLoading} />
            ) : (
              <div className="space-y-6">
                <ResultDisplay result={compResult} />
                <div className="text-center">
                    <button 
                      onClick={resetComp}
                      className="inline-flex items-center text-gray-500 hover:text-orient-red font-medium transition-colors underline decoration-dotted underline-offset-4"
                    >
                      ← Tra cứu cặp đôi khác
                    </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: I Ching */}
        {activeTab === 'iching' && (
           <div className="animate-fade-in">
             <KinhDich />
           </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 py-8 text-center text-gray-500 text-sm px-4">
          <p className="mb-2">
           Luận giải dựa trên dữ liệu cổ học.
          </p>
          <p className="font-serif text-orient-red/60 text-xs">
            © {new Date().getFullYear()} Duyên Phận & Huyền Cơ.
          </p>
      </footer>
    </div>
  );
};

export default App;
