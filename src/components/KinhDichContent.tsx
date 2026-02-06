import React from 'react';
import { Book, HelpCircle, Star, Target } from 'lucide-react';

export const KinhDichContent: React.FC = () => {
  return (
    <div className="prose prose-stone max-w-none text-gray-700 space-y-8 mb-10">
      <section>
        <h2 className="text-3xl font-serif font-bold text-orient-red border-b-2 border-orient-gold/30 pb-2 flex items-center gap-3">
          <Book className="text-orient-gold" /> Xem Quẻ Kinh Dịch Là Gì?
        </h2>
        <p className="mt-4 leading-relaxed">
          <strong>Xem quẻ Kinh Dịch</strong> là phương pháp bói toán cổ truyền, có nguồn gốc từ Kinh Dịch - một trong những hệ thống triết học sâu sắc nhất của phương Đông. Đây không chỉ là công cụ dự đoán tương lai mà còn là hệ thống giúp ta hiểu về quy luật vận hành của vũ trụ và nhân sinh.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 shadow-sm">
          <h3 className="font-bold text-orient-red mb-3 flex items-center gap-2">
            <Star className="w-5 h-5" /> Tại sao nên xem quẻ?
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Tâm thành tắc linh:</strong> Giúp tĩnh tâm và thấu đáo vấn đề.</li>
            <li><strong>Dịch lý:</strong> Hiểu quy luật biến đổi để thích nghi.</li>
            <li><strong>Đưa ra quyết định:</strong> Nhận lời khuyên sáng suốt cho sự nghiệp, tình duyên.</li>
          </ul>
        </div>

        <div className="bg-red-50/50 p-6 rounded-xl border border-red-100 shadow-sm">
          <h3 className="font-bold text-orient-red mb-3 flex items-center gap-2">
            <Target className="w-5 h-5" /> Nguyên tắc cần nhớ
          </h3>
          <p className="text-sm italic">"Sơ đao chính, tái đao bất chính"</p>
          <p className="text-sm mt-2">
            Không nên xem quẻ quá nhiều lần cho cùng một câu hỏi. Lần đầu xem là chính xác nhất.
          </p>
        </div>
      </div>

      <section className="bg-white p-6 rounded-xl border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-orient-gold" /> Hướng dẫn gieo quẻ
        </h3>
        <ol className="list-decimal list-inside space-y-3 text-sm">
          <li><strong>Chuẩn bị:</strong> Tìm không gian yên tĩnh, tập trung vào câu hỏi cụ thể.</li>
          <li><strong>Gieo quẻ:</strong> Sử dụng nút gieo để tạo ra 6 hào của quẻ.</li>
          <li><strong>Đọc giải mã:</strong> Xem tên quẻ, hình quẻ, thoán từ và lời khuyên chi tiết.</li>
        </ol>
      </section>
    </div>
  );
};