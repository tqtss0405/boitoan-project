export const Header = () => (
  <header className="bg-red-600 text-white p-4 shadow-md text-center">
    <nav>
      <h1 className="text-xl md:text-2xl font-bold uppercase">Tool Xem Tuổi Vợ Chồng Online</h1>
    </nav>
  </header>
);

export const IntroContent = () => (
  <article className="prose lg:prose-xl mx-auto p-4 text-gray-700">
    <header className="mb-6 text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Xem Tuổi Vợ Chồng - Tính Độ Hợp Tuổi Theo Phong Thủy
      </h1>
      <p className="text-sm text-gray-500">
        Cập nhật: <time dateTime="2024-01-15">15/01/2024</time>
      </p>
    </header>

    <section className="mb-8">
      <h2 className="text-xl font-bold text-red-600 mb-3 border-b pb-2">Tool Xem Tuổi Vợ Chồng Là Gì?</h2>
      <p className="mb-4">
        <strong>Xem tuổi vợ chồng</strong> là công cụ trực tuyến giúp bạn tính toán độ tương hợp giữa hai người dựa trên năm sinh, can chi và ngũ hành theo phong thủy Việt Nam. Tool này sử dụng các nguyên lý cổ truyền để đánh giá mức độ hòa hợp.
      </p>
      <p className="mb-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
        <em>Lưu ý: Kết quả chỉ mang tính chất tham khảo. Tình yêu chân thành và sự thấu hiểu mới là cốt lõi của hạnh phúc.</em>
      </p>
    </section>
  </article>
);

export const FooterSection = () => (
  <>
    <aside className="max-w-3xl mx-auto p-4 mt-8 bg-gray-50 rounded-lg">
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Bài Viết Liên Quan</h2>
        <ul className="space-y-2 list-disc pl-5 text-blue-600">
          <li><a href="#" className="hover:underline">Tuổi hợp kết hôn theo phong thủy</a></li>
          <li><a href="#" className="hover:underline">Cách chọn ngày cưới theo tuổi</a></li>
          <li><a href="#" className="hover:underline">Phong thủy hôn nhân hạnh phúc</a></li>
        </ul>
      </section>
    </aside>

    <footer className="bg-gray-800 text-white text-center p-6 mt-12">
      <p>&copy; 2024 Tool Xem Tuổi Vợ Chồng. Mọi thông tin chỉ mang tính chất tham khảo.</p>
    </footer>
  </>
);