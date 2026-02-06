import React from 'react';
import { 
  BookOpen, Star, Target, ShieldAlert, 
  MessageCircle, Info, ChevronRight, CheckCircle, XCircle 
} from 'lucide-react';

export const KinhDichContent: React.FC = () => {
  return (
    <article className="max-w-none text-gray-700 space-y-12 animate-fade-in pb-10">
      
      {/* SECTION 1: GIỚI THIỆU */}
      <section id="gioi-thieu" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {/* Tiêu đề dùng font-serif và màu orient-red để giống tool */}
        <h2 className="text-3xl font-serif font-bold text-orient-red border-b-4 border-orient-gold/50 pb-3 mb-6 flex items-center gap-3">
          <BookOpen className="text-orient-gold w-8 h-8" /> Xem Quẻ Kinh Dịch Là Gì?
        </h2>
        
        {/* Nội dung dùng font mặc định (Sans) */}
        <div className="space-y-4 text-justify text-lg leading-relaxed font-sans">
          <p>
            <strong>Xem quẻ Kinh Dịch</strong> là phương pháp bói toán cổ truyền của người Việt, 
            có nguồn gốc từ <strong>Kinh Dịch</strong> (I Ching) - một trong tứ thư ngũ kinh của Nho giáo. 
            Đây không chỉ là công cụ dự đoán tương lai mà còn là hệ thống triết học sâu sắc về 
            quy luật vận hành của vũ trụ, thiên nhiên và con người.
          </p>
          <p>
            Tool <strong>xem quẻ Kinh Dịch online</strong> giúp bạn dễ dàng tiếp cận phương pháp 
            bói toán này mọi lúc mọi nơi, không cần sử dụng đồng xu hay que cỏ như phương pháp 
            truyền thống. Chỉ cần vài click chuột, bạn có thể nhận được quẻ và lời giải đáp 
            cho những thắc mắc trong cuộc sống.
          </p>
        </div>

        {/* Feature Box */}
        <div className="mt-8 bg-orange-50/50 border-l-4 border-orient-gold p-6 rounded-r-lg shadow-sm">
          <h3 className="text-xl font-serif font-bold text-orient-red mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 fill-orient-gold text-orient-gold" /> Tại Sao Nên Sử Dụng Tool Xem Quẻ Kinh Dịch?
          </h3>
          <ul className="grid md:grid-cols-1 gap-3 ml-2 font-sans">
            {[
              { title: "Tiện lợi", content: "Xem quẻ mọi lúc mọi nơi chỉ với thiết bị có kết nối internet" },
              { title: "Chính xác", content: "Thuật toán dựa trên phương pháp truyền thống 64 quẻ" },
              { title: "Miễn phí", content: "Không mất phí, không giới hạn số lần xem quẻ" },
              { title: "Chi tiết", content: "Giải nghĩa đầy đủ về quẻ, hào, lời sấm và cách ứng dụng" },
              { title: "Dễ hiểu", content: "Ngôn ngữ hiện đại, dễ tiếp cận cho mọi đối tượng" }
            ].map((item, index) => (
              <li key={index} className="flex gap-2 items-start">
                <ChevronRight className="w-5 h-5 text-orient-red flex-shrink-0 mt-0.5" />
                <span><strong>{item.title}:</strong> {item.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 2: HƯỚNG DẪN SỬ DỤNG */}
      <section id="cach-su-dung" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-serif font-bold text-orient-red border-b-4 border-orient-gold/50 pb-3 mb-8 flex items-center gap-3">
          <Target className="text-orient-gold w-8 h-8" /> Hướng Dẫn Sử Dụng
        </h2>

        <div className="space-y-8 font-sans">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orient-red text-white rounded-full flex items-center justify-center font-bold font-serif">1</div>
            <div>
              <h3 className="text-xl font-serif font-bold text-orient-red mb-2">Chuẩn Bị Tâm Lý</h3>
              <p className="text-justify leading-relaxed">
                Trước khi xem quẻ, bạn cần tâm thành và tập trung. Hãy tìm một không gian yên tĩnh, 
                thư giãn tinh thần và suy nghĩ rõ ràng về câu hỏi bạn muốn hỏi. Kinh Dịch nhấn mạnh 
                sự chân thành của người hỏi quẻ - <em className="font-serif text-orient-red">"Tâm thành tắc linh"</em>.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orient-red text-white rounded-full flex items-center justify-center font-bold font-serif">2</div>
            <div>
              <h3 className="text-xl font-serif font-bold text-orient-red mb-2">Đặt Câu Hỏi Cụ Thể</h3>
              <p className="text-justify leading-relaxed mb-3">
                Câu hỏi nên rõ ràng, cụ thể và liên quan đến một vấn đề nhất định. Tránh những 
                câu hỏi mơ hồ hoặc quá chung chung. Ví dụ:
              </p>
              <ul className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm md:text-base">
                <li className="flex items-center gap-2 text-red-600"><XCircle className="w-5 h-5"/> <span>Sai: "Cuộc đời tôi sẽ như thế nào?"</span></li>
                <li className="flex items-center gap-2 text-green-700"><CheckCircle className="w-5 h-5"/> <span>Đúng: "Công việc mới này có phù hợp với tôi không?"</span></li>
                <li className="flex items-center gap-2 text-green-700"><CheckCircle className="w-5 h-5"/> <span>Đúng: "Mối quan hệ này có nên tiếp tục phát triển?"</span></li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orient-red text-white rounded-full flex items-center justify-center font-bold font-serif">3</div>
            <div>
              <h3 className="text-xl font-serif font-bold text-orient-red mb-2">Xem Quẻ</h3>
              <p className="text-justify leading-relaxed">
                Nhấn vào nút <strong>"Gieo Quẻ"</strong> hoặc <strong>"Gieo Nhanh"</strong> trên tool. 
                Hệ thống sẽ tự động tạo ra một quẻ dựa trên thuật toán ngẫu nhiên.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orient-red text-white rounded-full flex items-center justify-center font-bold font-serif">4</div>
            <div>
              <h3 className="text-xl font-serif font-bold text-orient-red mb-2">Đọc Và Hiểu Quẻ</h3>
              <p className="mb-2">Sau khi quẻ được tạo ra, tool sẽ hiển thị đầy đủ:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside bg-orange-50/30 p-4 rounded-lg text-sm md:text-base border border-orient-gold/20">
                <li><strong>Tên quẻ:</strong> Ví dụ "Càn", "Khôn"...</li>
                <li><strong>Hình quẻ:</strong> 6 hào biểu thị (Dương/Âm)</li>
                <li><strong>Quẻ từ:</strong> Lời sấm ngắn gọn</li>
                <li><strong>Đại tượng:</strong> Hình ảnh biểu trưng</li>
                <li><strong>Hào từ:</strong> Giải thích chi tiết từng hào</li>
                <li><strong>Lời giải:</strong> Lời khuyên cụ thể</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orient-red text-white rounded-full flex items-center justify-center font-bold font-serif">5</div>
            <div>
              <h3 className="text-xl font-serif font-bold text-orient-red mb-2">Suy Ngẫm Và Áp Dụng</h3>
              <p className="text-justify leading-relaxed">
                Lời quẻ thường mang tính ẩn dụ, cần sự suy ngẫm để hiểu sâu. Hãy liên hệ với 
                hoàn cảnh thực tế của bạn, đừng hiểu một cách máy móc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HỆ THỐNG 64 QUẺ */}
      <section id="64-que" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-serif font-bold text-orient-red border-b-4 border-orient-gold/50 pb-3 mb-6 flex items-center gap-3">
          <Info className="text-orient-gold w-8 h-8" /> Hệ Thống 64 Quẻ Kinh Dịch
        </h2>
        <div className="space-y-4 mb-6 font-sans">
          <p>
            Kinh Dịch bao gồm <strong>64 quẻ</strong>, mỗi quẻ được tạo thành từ 6 hào (vạch).
            Mỗi hào có thể là Dương (⚊ vạch liền) hoặc Âm (⚋ vạch đứt).
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2 font-serif">Cấu Trúc Quẻ:</h4>
            <ul className="list-disc list-inside">
              <li><strong>Hạ quái (Nội quái):</strong> 3 hào dưới, đại diện cho nội tâm, cơ sở, quá khứ</li>
              <li><strong>Thượng quái (Ngoại quái):</strong> 3 hào trên, đại diện cho bên ngoài, biểu hiện, tương lai</li>
            </ul>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-left border-collapse min-w-[600px] font-sans">
            <thead className="bg-gradient-to-r from-orient-red to-orange-700 text-white font-serif">
              <tr>
                <th className="p-4 border border-white/20">STT</th>
                <th className="p-4 border border-white/20">Tên Quẻ</th>
                <th className="p-4 border border-white/20">Ý Nghĩa Chính</th>
                <th className="p-4 border border-white/20">Tình Huống</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm md:text-base">
              {[
                {id: 1, name: "Càn (乾)", mean: "Trời, sức mạnh, sáng tạo", context: "Thuận lợi, khởi đầu tốt, cần kiên trì"},
                {id: 2, name: "Khôn (坤)", mean: "Đất, nhu thuận, tiếp nhận", context: "Cần nhẫn nại, hỗ trợ người khác"},
                {id: 3, name: "Thuỷ Lôi Truân (屯)", mean: "Khó khăn ban đầu", context: "Giai đoạn khởi sự gặp trở ngại"},
                {id: 4, name: "Sơn Thuỷ Mông (蒙)", mean: "Trí tuệ non nớt", context: "Cần học hỏi, tiếp thu kinh nghiệm"},
                {id: 5, name: "Thuỷ Thiên Nhu (需)", mean: "Chờ đợi, kiên nhẫn", context: "Thời điểm cần chờ đợi, không nên vội vàng"},
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-orange-50" : "bg-orange-50/20 hover:bg-orange-50"}>
                  <td className="p-4 border border-gray-200 text-center">{row.id}</td>
                  <td className="p-4 border border-gray-200 font-bold text-orient-red font-serif">{row.name}</td>
                  <td className="p-4 border border-gray-200">{row.mean}</td>
                  <td className="p-4 border border-gray-200">{row.context}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} className="p-4 text-center italic text-gray-500 bg-gray-50">... Và 59 quẻ khác (sẽ hiển thị chi tiết khi gieo quẻ)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: Ý NGHĨA SÂU XA */}
      <section id="y-nghia" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-serif font-bold text-orient-red border-b-4 border-orient-gold/50 pb-3 mb-6 flex items-center gap-3">
          <BookOpen className="text-orient-gold w-8 h-8" /> Ý Nghĩa Sâu Xa Của Việc Xem Quẻ
        </h2>
        
        <div className="space-y-6 font-sans">
          <div>
            <h3 className="text-xl font-serif font-bold text-orient-red mb-2">Không Phải Mê Tín Mà Là Trí Tuệ</h3>
            <p className="text-justify">
              Nhiều người lầm tưởng rằng xem quẻ Kinh Dịch là mê tín dị đoan. Thực tế, Kinh Dịch 
              là một hệ thống triết học sâu sắc được công nhận trên toàn thế giới.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold text-orient-red mb-2">Nguyên Lý Âm Dương & Dịch Lý</h3>
            <p className="text-justify mb-2">
              Kinh Dịch dựa trên nguyên lý <strong>Âm Dương</strong> - hai thế lực đối lập nhưng 
              bổ sung cho nhau. Chữ "Dịch" có nghĩa là "thay đổi". 
            </p>
            <p className="italic bg-gray-100 p-4 border-l-4 border-gray-400 rounded font-serif text-gray-600">
              "Bần cực tắc biến, biến tắc thông, thông tắc cửu" - Khi đến cùng cực thì 
              sẽ biến đổi, biến đổi rồi sẽ thông suốt, thông suốt thì bền lâu.
            </p>
          </div>

          <div className="bg-paper-bg border border-orient-gold/30 rounded-xl p-6">
            <h3 className="text-xl font-serif font-bold text-orient-red mb-4 border-b border-orient-gold/20 pb-2">Ba Tầng Ý Nghĩa Của Quẻ Kinh Dịch</h3>
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Dị giản (Đơn giản):</strong> Nguyên lý cơ bản chỉ là Âm và Dương.
              </li>
              <li>
                <strong>Biến dị (Biến đổi):</strong> Vạn vật luôn thay đổi, không có gì cố định.
              </li>
              <li>
                <strong>Bất dị (Không đổi):</strong> Những quy luật vĩnh hằng của tự nhiên.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION 5: ỨNG DỤNG THỰC TIỄN */}
      <section id="ung-dung" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-serif font-bold text-orient-red border-b-4 border-orient-gold/50 pb-3 mb-6 flex items-center gap-3">
          <Target className="text-orient-gold w-8 h-8" /> Ứng Dụng Thực Tiễn
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8 font-sans">
          {[
            { 
              head: "1. Trong Công Việc - Sự Nghiệp", 
              text: "Xem quẻ giúp đánh giá xu hướng phát triển, thời điểm thích hợp khởi nghiệp hay đầu tư."
            },
            { 
              head: "2. Trong Tình Yêu - Hôn Nhân", 
              text: "Phân tích tính cách, mức độ tương hợp. Khi gặp khó khăn, quẻ chỉ ra nguyên nhân và cách hóa giải."
            },
            { 
              head: "3. Trong Học Tập - Tu Dưỡng", 
              text: "Gợi ý phương pháp học tập, thời điểm thi cử. Khuyến khích con người không ngừng tu dưỡng."
            },
            { 
              head: "4. Trong Sức Khỏe - Tinh Thần", 
              text: "Cảnh báo vấn đề tiềm ẩn do mất cân bằng Âm Dương, khuyên điều chỉnh lối sống."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-red-50/50 p-6 rounded-xl hover:shadow-md transition-shadow border border-red-100">
              <h3 className="font-serif font-bold text-orient-red mb-2 text-lg">{item.head}</h3>
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border-l-4 border-orient-gold p-6 rounded-r-lg">
           <h3 className="text-lg font-serif font-bold text-yellow-800 mb-3 flex items-center gap-2">
             <ShieldAlert className="w-5 h-5"/> Lưu Ý Quan Trọng Khi Áp Dụng
           </h3>
           <ul className="list-disc list-inside space-y-1 text-yellow-900 font-sans text-sm">
              <li>Quẻ là công cụ tham khảo, không phải lời tiên tri tuyệt đối</li>
              <li>Cần kết hợp quẻ với phân tích lý trí và thực tiễn</li>
              <li>Đừng phụ thuộc hoàn toàn vào quẻ, mất đi tự chủ của bản thân</li>
              <li>Nên xem quẻ khi có vấn đề cụ thể, không nên xem quá nhiều lần</li>
              <li>Tâm thành là quan trọng nhất trong việc xem quẻ</li>
           </ul>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section id="faq" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-3xl font-serif font-bold text-orient-red border-b-4 border-orient-gold/50 pb-3 mb-8 flex items-center gap-3">
          <MessageCircle className="text-orient-gold w-8 h-8" /> Câu Hỏi Thường Gặp (FAQ)
        </h2>
        
        <div className="space-y-6 font-sans">
          {[
            {
              q: "Xem quẻ Kinh Dịch online có chính xác như xem trực tiếp không?",
              a: "Về mặt nguyên lý, cả hai phương pháp đều dựa trên sự ngẫu nhiên. Tool online sử dụng thuật toán ngẫu nhiên tương tự như tung đồng xu. Quan trọng nhất là tâm thành."
            },
            {
              q: "Một ngày có thể xem quẻ bao nhiêu lần?",
              a: "Nguyên tắc 'Sơ đao chính, tái đao bất chính' - Lần đầu xem quẻ là chính xác nhất. Không nên xem lại nhiều lần cho cùng một vấn đề."
            },
            {
              q: "Quẻ Kinh Dịch có thể dự đoán tương lai không?",
              a: "Kinh Dịch chỉ ra xu hướng và khả năng dựa trên hiện tại. Tương lai luôn thay đổi theo hành động của con người."
            },
          ].map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
               <div className="bg-orange-50 p-4 font-bold text-orient-red flex gap-2 font-serif">
                 <span>❓</span> {item.q}
               </div>
               <div className="p-4 bg-white text-gray-700">
                 {item.a}
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: KẾT LUẬN */}
      <section className="bg-gradient-to-br from-orient-red to-red-800 text-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 font-serif">Kết Luận</h2>
        <p className="mb-4 leading-relaxed max-w-4xl mx-auto font-sans">
          <strong>Tool xem quẻ Kinh Dịch online</strong> là cầu nối giữa trí tuệ cổ đại và 
          công nghệ hiện đại. Dù bạn xem quẻ vì tò mò hay tìm kiếm lời khuyên, hãy nhớ rằng 
          Kinh Dịch không phải để dự đoán số phận mà để giúp bạn <strong>hiểu rõ bản thân, 
          nhận thức đúng tình huống và đưa ra quyết định sáng suốt</strong>.
        </p>
        <p className="italic opacity-90 font-serif">
          Hãy bắt đầu hành trình khám phá trí tuệ Phương Đông ngay hôm nay. Chúc bạn may mắn và an lành!
        </p>
      </section>

    </article>
  );
};