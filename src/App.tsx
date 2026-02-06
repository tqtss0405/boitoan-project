import { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import KinhDich from './components/KinhDich'; // Import lại Kinh Dịch
import { checkCompatibility } from './services/geminiService';
import type { FormData, CompatibilityResult } from './types';
import { BookOpen, Heart } from 'lucide-react'; // Icon cho menu
import { HomeContent } from './components/HomeContent';
import { Header, Footer } from './components/Layout';
import { KinhDichContent } from './components/KinhDichContent';
function App() {
  // State quản lý Tab đang chọn (Mặc định là 'home' - Xem tuổi)
  const [activeTab, setActiveTab] = useState<'home' | 'kinhdich'>('home');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const compatibilityData = await checkCompatibility(data);
      setResult(compatibilityData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      {/* 2. Thanh Menu (Tabs) */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 justify-center md:justify-start">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === 'home'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <Heart className="w-5 h-5" />
              <span>Xem Tuổi Vợ Chồng</span>
            </button>

            <button
              onClick={() => setActiveTab('kinhdich')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === 'kinhdich'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Gieo Quẻ Kinh Dịch</span>
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">

        {/* TAB 1: XEM TUỔI VỢ CHỒNG */}
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            {/* Nội dung giới thiệu SEO */}
            <div className="container mx-auto mb-12 max-w-7xl">
              <HomeContent />
            </div>

            {/* Tool tính toán */}
            <section id="tool-app" className="max-w-7xl mx-auto my-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
                Nhập thông tin vợ chồng
              </h2>

              <InputForm onSubmit={handleFormSubmit} isLoading={loading} />

              {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
                  {error}
                </div>
              )}

              {result && (
                <div className="mt-8">
                  <ResultDisplay result={result} />
                </div>
              )}
            </section>

          </div>
        )}

        {/* TAB 2: KINH DỊCH */}
        {activeTab === 'kinhdich' && (
          <div className="animate-fade-in max-w-7xl mx-auto">
            <div className="container px-4 mx-auto mb-12">
              <KinhDichContent />
            </div>
            <div className="container px-4 mx-auto mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
                Gieo Quẻ Hỏi Việc
              </h2>
              <p className="text-center text-gray-600 mb-6 italic">
                "Thành tâm gieo quẻ, việc gì cũng thông. Hãy tĩnh tâm suy nghĩ về vấn đề bạn muốn hỏi."
              </p>
              <KinhDich />
            </div>
            </div>

          </div>
        )}
        <Footer />
      </main>
    </div>
  );
}

export default App;