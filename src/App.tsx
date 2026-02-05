import React, { useState } from 'react';
import { FormData, CompatibilityResult, TossResult } from './types';
import { checkCompatibility } from './services/geminiService';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import KinhDich from './components/KinhDich';
import { Heart, ScrollText } from 'lucide-react';
import { Header, IntroContent, FooterSection } from './components/IntroSection';
type Tab = 'compatibility' | 'iching';

function App() {
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

  const handleTossUpdate = (lines: TossResult[]) => {
      // Logic xử lý gieo quẻ nếu cần
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 1. Phần Đầu trang (Header) */}
      <Header />

      <main className="container mx-auto px-4 py-8">
        
        {/* 2. Phần Giới thiệu (Intro) */}
        <IntroContent />

        {/* 3. Phần TOOL CHÍNH (Nằm nổi bật ở giữa) */}
        <section id="tool-app" className="max-w-4xl mx-auto my-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
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
            <div className="mt-8 animate-fade-in">
              <ResultDisplay result={result} />
            </div>
          )}
        </section>

        {/* 4. Phần Footer và Bài viết liên quan */}
        <FooterSection />
        
      </main>
    </div>
  );
}

export default App;