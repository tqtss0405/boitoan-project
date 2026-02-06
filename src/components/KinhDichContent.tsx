import React from 'react';

export const KinhDichContent: React.FC = () => {
  return (
    <article className="prose prose-stone max-w-none text-gray-700 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
      {/* Giới thiệu */}
      <section id="gioi-thieu" className="mb-10">
        <h2 className="text-3xl font-serif font-bold text-red-800 border-b-4 border-yellow-500 pb-2 mb-6">
          Xem Quẻ Kinh Dịch Là Gì?
        </h2>
        <p className="mb-4 text-justify leading-relaxed">
          <strong>Xem quẻ Kinh Dịch</strong> là phương pháp bói toán cổ truyền của người Việt, có nguồn gốc từ <strong>Kinh Dịch</strong> (I Ching) - một trong tứ thư ngũ kinh của Nho giáo. Đây không chỉ là công cụ dự đoán tương lai mà còn là hệ thống triết học sâu sắc về quy luật vận hành của vũ trụ, thiên nhiên và con người.
        </p>
        <p className="mb-6 text-justify leading-relaxed">
          Tool <strong>xem quẻ Kinh Dịch online</strong> giúp bạn dễ dàng tiếp cận phương pháp bói toán này mọi lúc mọi nơi, không cần sử dụng đồng xu hay que cỏ như phương pháp truyền thống. Chỉ cần vài click chuột, bạn có thể nhận được quẻ và lời giải đáp cho những thắc mắc trong cuộc sống.
        </p>
        <div className="bg-orange-50 border-l-8 border-yellow-500 p-6 rounded-r-lg shadow-inner mb-10">
          <h3 className="text-xl font-bold text-red-800 mb-4">Tại Sao Nên Sử Dụng Tool Xem Quẻ Kinh Dịch?</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Tiện lợi:</strong> Xem quẻ mọi lúc mọi nơi chỉ với thiết bị có kết nối internet.</li>
            <li><strong>Chính xác:</strong> Thuật toán dựa trên phương pháp truyền thống 64 quẻ.</li>
            <li><strong>Miễn phí:</strong> Không mất phí, không giới hạn số lần xem quẻ.</li>
            <li><strong>Chi tiết:</strong> Giải nghĩa đầy đủ về quẻ, hào, lời sấm và cách ứng dụng.</li>
            <li><strong>Dễ hiểu:</strong> Ngôn ngữ hiện đại, dễ tiếp cận cho mọi đối tượng.</li>
          </ul>
        </div>
      </section>

      {/* Hướng dẫn sử dụng */}
      <section id="cach-su-dung" className="mb-10">
        <h2 className="text-3xl font-serif font-bold text-red-800 border-b-4 border-yellow-500 pb-2 mb-6">
          Hướng Dẫn Sử Dụng Tool Xem Quẻ Kinh Dịch
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-orange-700 mb-2">Bước 1: Chuẩn Bị Tâm Lý</h3>
            <p className="text-justify leading-relaxed">
              Trước khi xem quẻ, bạn cần tâm thành và tập trung. Hãy tìm một không gian yên tĩnh, thư giãn tinh thần và suy nghĩ rõ ràng về câu hỏi bạn muốn hỏi. Kinh Dịch nhấn mạnh sự chân thành của người hỏi quẻ - <em>"Tâm thành tắc linh"</em>.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-700 mb-2">Bước 2: Đặt Câu Hỏi Cụ Thể</h3>
            <p className="text-justify leading-relaxed mb-2">
              Câu hỏi nên rõ ràng, cụ thể và liên quan đến một vấn đề nhất định. Tránh những câu hỏi mơ hồ hoặc quá chung chung. Ví dụ:
            </p>
            <ul className="list-none ml-4 space-y-1 text-sm">
              <li className="text-red-600">❌ Sai: "Cuộc đời tôi sẽ như thế nào?"</li>
              <li className="text-green-700 font-medium">✅ Đúng: "Công việc mới này có phù hợp với tôi không?"</li>
              <li className="text-green-700 font-medium">✅ Đúng: "Mối quan hệ này có nên tiếp tục phát triển?"</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-700 mb-2">Bước 3: Xem Quẻ</h3>
            <p className="text-justify leading-relaxed font-medium">
              Nhấn vào nút <strong>"Gieo Quẻ"</strong> hoặc <strong>"Gieo Nhanh"</strong>. Hệ thống sẽ tự động tạo ra một quẻ dựa trên thuật toán ngẫu nhiên, tương tự như việc tung đồng xu trong phương pháp truyền thống.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-orange-700 mb-2">Bước 4: Đọc Và Hiểu Quẻ</h3>
            <p className="mb-2">Sau khi quẻ được tạo ra, hệ thống hiển thị đầy đủ:</p>
            <ul className="grid md:grid-cols-2 gap-2 text-sm italic ml-4">
              <li>• Tên quẻ & Hình quẻ</li>
              <li>• Quẻ từ & Đại tượng</li>
              <li>• Hào từ chi tiết</li>
              <li>• Lời giải & Lời khuyên</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hệ thống 64 quẻ */}
      <section id="64-que" className="mb-10">
        <h2 className="text-3xl font-serif font-bold text-red-800 border-b-4 border-yellow-500 pb-2 mb-6">
          Hệ Thống 64 Quẻ Kinh Dịch
        </h2>
        <p className="mb-6 text-justify">
          Kinh Dịch bao gồm <strong>64 quẻ</strong>, mỗi quẻ được tạo thành từ 6 hào. 64 quẻ này biểu thị 64 tình huống khác nhau trong cuộc sống, từ thuận lợi đến khó khăn.
        </p>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-red-800 text-white">
              <tr>
                <th className="p-3 border">STT</th>
                <th className="p-3 border">Tên Quẻ</th>
                <th className="p-3 border">Ý Nghĩa Chính</th>
                <th className="p-3 border text-center">Tình Huống</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="hover:bg-orange-50"><td className="p-3 border">1</td><td className="p-3 border font-bold text-red-700">Càn (乾)</td><td className="p-3 border">Trời, sức mạnh, sáng tạo</td><td className="p-3 border">Thuận lợi, khởi đầu tốt</td></tr>
              <tr className="hover:bg-orange-50"><td className="p-3 border">2</td><td className="p-3 border font-bold text-red-700">Khôn (坤)</td><td className="p-3 border">Đất, nhu thuận, tiếp nhận</td><td className="p-3 border">Cần nhẫn nại, hỗ trợ</td></tr>
              <tr className="hover:bg-orange-50"><td className="p-3 border">3</td><td className="p-3 border font-bold text-red-700">Thuỷ Lôi Truân (屯)</td><td className="p-3 border">Khó khăn ban đầu</td><td className="p-3 border">Giai đoạn khởi sự trở ngại</td></tr>
                <tr className="hover:bg-orange-50"><td className="p-3 border">4</td><td className="p-3 border font-bold text-red-700">Sơn Thuỷ Mông (蒙)</td><td className="p-3 border">Trí tuệ non nớt</td><td className="p-3 border">Cần học hỏi, tiếp thu kinh nghiệm</td></tr>
            <tr className="hover:bg-orange-50"><td className= "p-3 border">...</td><td className="p-3 border font-bold" colSpan={3}>Và 60 quẻ khác với ý nghĩa đa dạng</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ý nghĩa sâu xa */}
      <section id="y-nghia" className="mb-10">
        <h2 className="text-3xl font-serif font-bold text-red-800 border-b-4 border-yellow-500 pb-2 mb-6">
          Ý Nghĩa Sâu Xa Của Việc Xem Quẻ
        </h2>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-orange-700">Không Phải Mê Tín Mà Là Trí Tuệ</h3>
          <p className="text-justify leading-relaxed">
            Thực tế, Kinh Dịch là một hệ thống triết học sâu sắc được công nhận trên toàn thế giới. Các nhà khoa học, triết gia như Carl Jung, Leibniz đều nghiên cứu và đánh giá cao giá trị của nó.
          </p>
          <h3 className="text-xl font-bold text-orange-700">Dịch Lý - Quy Luật Biến Đổi</h3>
          <p className="text-justify leading-relaxed italic border-l-4 border-gray-300 pl-4 py-2">
            "Bần cực tắc biến, biến tắc thông, thông tắc cửu" - Khi đến cùng cực thì sẽ biến đổi, biến đổi rồi sẽ thông suốt, thông suốt thì bền lâu.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-6">
        <h2 className="text-3xl font-serif font-bold text-red-800 border-b-4 border-yellow-500 pb-2 mb-6">
          Câu Hỏi Thường Gặp
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-red-800 mb-2">❓ Một ngày có thể xem quẻ bao nhiêu lần?</p>
            <p className="text-sm text-gray-700">
              Nguyên tắc "Sơ đao chính, tái đao bất chính" - Lần đầu xem quẻ là chính xác, lần sau không còn chính xác nữa. Nên chỉ xem 1 lần cho mỗi vấn đề.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-bold text-red-800 mb-2">❓ Xem online có chính xác không?</p>
            <p className="text-sm text-gray-700">
              Về nguyên lý, tool online sử dụng thuật toán ngẫu nhiên tương tự việc tung đồng xu. Điều quan trọng nhất là <strong>tâm thành</strong> và khả năng áp dụng lời quẻ vào thực tế.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};