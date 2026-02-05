import React from 'react';

export const HomeContent = () => {
  return (
    <div className="w-full prose lg:prose-xl max-w-none mx-auto p-4 text-gray-800 bg-white rounded-lg shadow-sm">
      {/* --- HEADER BÀI VIẾT --- */}
      <article>
        <header className="mb-8 text-center border-b pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-orient-red mb-4 font-serif">
            Xem Tuổi Vợ Chồng - Tính Độ Hợp Tuổi Theo Phong Thủy Chính Xác
          </h1>
          <p className="text-gray-500 italic">
            Cập nhật: <time dateTime="2026-02-05">05/02/2026</time>
          </p>
        </header>

        {/* --- PHẦN 1: ĐỊNH NGHĨA --- */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-red-100 text-red-600 w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm">1</span>
            Tool Xem Tuổi Vợ Chồng Là Gì?
          </h2>
          <p className="mb-4 leading-relaxed">
            <strong>Xem tuổi vợ chồng</strong> là công cụ trực tuyến giúp bạn tính toán độ tương hợp giữa hai người dựa trên năm sinh, can chi và ngũ hành theo phong thủy Việt Nam. Tool này sử dụng các nguyên lý cổ truyền để đánh giá mức độ hợp tuổi trong hôn nhân.
          </p>

          <blockquote className="border-l-4 border-orient-gold bg-yellow-50 p-4 rounded-r-lg italic text-gray-700 my-6">
            <p>"Tuổi tác hợp nhau là nền tảng cho một cuộc hôn nhân hạnh phúc" - Theo quan niệm phong thủy truyền thống</p>
          </blockquote>
        </section>

        {/* --- PHẦN 2: CÁCH SỬ DỤNG --- */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-red-100 text-red-600 w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm">2</span>
            Cách Sử Dụng Tool Xem Tuổi Vợ Chồng
          </h2>
          <ol className="list-decimal list-inside space-y-2 mb-6 ml-2">
            <li><strong>Nhập năm sinh:</strong> Điền năm sinh của cả hai người theo dương lịch</li>
            <li><strong>Chọn giới tính:</strong> Xác định nam/nữ để tính toán chính xác</li>
            <li><strong>Nhấn tính toán:</strong> Tool sẽ phân tích độ hợp tuổi</li>
            <li><strong>Xem kết quả:</strong> Nhận thông tin chi tiết về mức độ tương hợp</li>
          </ol>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-blue-900">
            <h3 className="font-bold flex items-center mb-1">
              💡 Lưu Ý Quan Trọng
            </h3>
            <p>Để có kết quả chính xác nhất khi <em>xem tuổi vợ chồng</em>, bạn nên biết chính xác năm sinh âm lịch của cả hai người.</p>
          </div>
        </section>

        {/* --- PHẦN 3: BẢNG NGŨ HÀNH (Responsive Table) --- */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
             <span className="bg-red-100 text-red-600 w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm">3</span>
            Các Yếu Tố Được Tính Trong Tool
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Ngũ Hành Tương Sinh - Tương Khắc</h3>
          
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mb-6">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b border-gray-200 font-semibold text-gray-700">Mệnh</th>
                  <th className="p-3 border-b border-gray-200 font-semibold text-green-700">Tương Sinh</th>
                  <th className="p-3 border-b border-gray-200 font-semibold text-red-600">Tương Khắc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50"><td className="p-3">Kim</td><td className="p-3">Thổ sinh Kim</td><td className="p-3">Hỏa khắc Kim</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">Mộc</td><td className="p-3">Thủy sinh Mộc</td><td className="p-3">Kim khắc Mộc</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">Thủy</td><td className="p-3">Kim sinh Thủy</td><td className="p-3">Thổ khắc Thủy</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">Hỏa</td><td className="p-3">Mộc sinh Hỏa</td><td className="p-3">Thủy khắc Hỏa</td></tr>
                <tr className="hover:bg-gray-50"><td className="p-3">Thổ</td><td className="p-3">Hỏa sinh Thổ</td><td className="p-3">Mộc khắc Thổ</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Can Chi và Cung Mệnh</h3>
          <p className="mb-2">Tool <strong>xem tuổi vợ chồng</strong> phân tích:</p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>Can năm sinh (Giáp, Ất, Bính, Đinh...)</li>
            <li>Chi năm sinh (Tý, Sửu, Dần, Mão...)</li>
            <li>Cung mệnh theo Đông Tây tứ mệnh</li>
            <li>Hướng sinh khí, phúc đức</li>
          </ul>
        </section>

        {/* --- PHẦN 4: FAQ (Câu hỏi thường gặp) --- */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
             <span className="bg-red-100 text-red-600 w-8 h-8 flex items-center justify-center rounded-full mr-3 text-sm">4</span>
            Câu Hỏi Thường Gặp
          </h2>
          
          <div className="space-y-4">
            <details className="group bg-gray-50 p-4 rounded-lg cursor-pointer">
              <summary className="font-bold text-gray-800 list-none flex justify-between items-center">
                <span>Tool xem tuổi vợ chồng có chính xác không?</span>
                <span className="transition group-open:rotate-180">🔽</span>
              </summary>
              <p className="text-gray-600 mt-2">Tool dựa trên các nguyên lý phong thủy cổ truyền được truyền lại qua nhiều thế hệ. Tuy nhiên, đây chỉ là tham khảo và không thể quyết định hoàn toàn vận mệnh hôn nhân.</p>
            </details>

            <details className="group bg-gray-50 p-4 rounded-lg cursor-pointer">
              <summary className="font-bold text-gray-800 list-none flex justify-between items-center">
                <span>Nếu tuổi không hợp có nên kết hôn không?</span>
                 <span className="transition group-open:rotate-180">🔽</span>
              </summary>
              <p className="text-gray-600 mt-2">Tuổi tác chỉ là một yếu tố tham khảo. Tình yêu chân thành, sự hiểu biết và tôn trọng lẫn nhau mới là nền tảng quan trọng nhất của hôn nhân.</p>
            </details>
          </div>
        </section>

        {/* --- KẾT LUẬN --- */}
        <section className="bg-red-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">Kết Luận</h2>
          <p className="text-gray-800">
            <strong>Xem tuổi vợ chồng</strong> là công cụ hữu ích giúp các cặp đôi hiểu rõ hơn về mức độ tương hợp. Dù kết quả ra sao, quan trọng nhất vẫn là sự vun vén từ hai phía.
          </p>
        </section>

      </article>

      {/* --- SCRIPT SCHEMA JSON-LD (Cho SEO Google) --- */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: `
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Xem Tuổi Vợ Chồng - Tool Tính Toán Độ Hợp Tuổi Theo Phong Thủy",
            "description": "Hướng dẫn sử dụng tool xem tuổi vợ chồng online để tính độ hợp tuổi theo phong thủy, ngũ hành và can chi.",
            "author": { "@type": "Organization", "name": "Tool Phong Thủy" },
            "datePublished": "2024-01-15",
            "dateModified": "2024-01-15"
        }
      `}} />
    </div>
  );
};