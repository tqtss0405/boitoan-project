import React, { useState, useEffect } from 'react';
import { FormData } from '../types';
import { Heart, Loader2, Calendar } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    husbandYear: '',
    wifeYear: '',
  });

  // Calculate Can Chi automatically
  const getCanChi = (yearStr: string) => {
    const year = parseInt(yearStr);
    if (!year || isNaN(year)) return "";
    
    const can = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
    const chi = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
    
    // Can is derived from last digit (year % 10)
    // Chi is derived from year % 12
    return `${can[year % 10]} ${chi[year % 12]}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClassName = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orient-red focus:border-transparent outline-none transition bg-stone-50 text-black placeholder-gray-400 font-medium text-lg text-center tracking-widest";

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-orient-gold/30 max-w-3xl mx-auto relative overflow-hidden animate-slide-up">
      {/* Decorative corner patterns */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-orient-red opacity-10 rounded-tl-3xl"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-orient-red opacity-10 rounded-tr-3xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-orient-red opacity-10 rounded-bl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-orient-red opacity-10 rounded-br-3xl"></div>

      <h2 className="text-3xl font-serif text-center text-orient-red mb-10 font-bold flex items-center justify-center gap-3">
        <Heart className="w-8 h-8 fill-orient-red" />
        Tra Cứu Duyên Phận
        <Heart className="w-8 h-8 fill-orient-red" />
      </h2>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
          
          {/* Husband Column */}
          <div className="space-y-4 relative">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3 border border-blue-100">
                    <span className="text-3xl">👨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Chồng</h3>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500 mb-2 text-center uppercase text-xs tracking-widest">Năm Sinh (Dương Lịch)</label>
              <div className="relative max-w-[200px] mx-auto">
                 <input
                    type="number"
                    name="husbandYear"
                    required
                    min="1900"
                    max="2100"
                    placeholder="VD: 1990"
                    className={inputClassName}
                    value={formData.husbandYear}
                    onChange={handleChange}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              
              {/* Live Can Chi Display */}
              <div className="h-8 mt-2 text-center transition-all duration-300">
                {formData.husbandYear && formData.husbandYear.length === 4 ? (
                    <span className="inline-block px-4 py-1 bg-orient-gold/10 text-orient-red font-serif font-bold rounded-full border border-orient-gold/20 shadow-sm animate-fade-in">
                        {getCanChi(formData.husbandYear)}
                    </span>
                ) : (
                    <span className="text-gray-300 text-sm italic">...</span>
                )}
              </div>
            </div>
          </div>

          {/* Divider with Heart */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-10">
              <div className="h-16 w-px bg-gray-200"></div>
              <div className="p-2 bg-white rounded-full border border-gray-100 shadow-sm my-2">
                 <Heart className="w-6 h-6 text-red-300 fill-red-50" />
              </div>
              <div className="h-16 w-px bg-gray-200"></div>
          </div>

          {/* Wife Column */}
          <div className="space-y-4 relative">
             <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-3 border border-pink-100">
                    <span className="text-3xl">👩</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Vợ</h3>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-500 mb-2 text-center uppercase text-xs tracking-widest">Năm Sinh (Dương Lịch)</label>
              <div className="relative max-w-[200px] mx-auto">
                 <input
                    type="number"
                    name="wifeYear"
                    required
                    min="1900"
                    max="2100"
                    placeholder="VD: 1995"
                    className={inputClassName}
                    value={formData.wifeYear}
                    onChange={handleChange}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

               {/* Live Can Chi Display */}
               <div className="h-8 mt-2 text-center transition-all duration-300">
                {formData.wifeYear && formData.wifeYear.length === 4 ? (
                    <span className="inline-block px-4 py-1 bg-orient-gold/10 text-orient-red font-serif font-bold rounded-full border border-orient-gold/20 shadow-sm animate-fade-in">
                        {getCanChi(formData.wifeYear)}
                    </span>
                ) : (
                    <span className="text-gray-300 text-sm italic">...</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center">
          <button
            type="submit"
            disabled={isLoading || !formData.husbandYear || !formData.wifeYear}
            className="group relative inline-flex items-center justify-center px-12 py-4 text-xl font-medium text-white transition-all duration-200 bg-orient-red rounded-full hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-orient-red/30 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                Đang Luận Giải...
              </>
            ) : (
              'Xem Kết Quả'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;