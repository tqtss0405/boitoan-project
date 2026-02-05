
// --- HEADER CHUNG (Phong cách Duyên Phận) ---
export const Header = () => {
  return (
    <header className="bg-orient-red text-white shadow-lg border-b-4 border-orient-gold relative overflow-hidden">
      {/* Họa tiết trang trí chìm (Optional) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="w-20 h-20 border-2 border-yellow-200 rounded-full absolute -top-10 -left-10"></div>
        <div className="w-32 h-32 border-2 border-yellow-200 rounded-full absolute -bottom-16 -right-10"></div>
      </div>

      <nav className="container mx-auto px-4 py-6 relative z-10 text-center">
        <h1 className="text-2xl md:text-4xl font-bold font-serif tracking-wide text-orient-gold drop-shadow-md">
          DUYÊN PHẬN
        </h1>
        <p className="text-red-100 text-sm md:text-base mt-2 font-light tracking-wider uppercase opacity-90">
          Xem Tuổi Vợ Chồng & Gieo Quẻ Kinh Dịch
        </p>
      </nav>
    </header>
  );
};

// --- FOOTER CHUNG ---
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto border-t-4 border-orient-red">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Cột 1: Giới thiệu */}
          <div>
            <h3 className="text-xl font-serif font-bold text-orient-gold mb-4">Duyên Phận</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Công cụ tra cứu phong thủy, xem tuổi và gieo quẻ hỏi việc dựa trên tinh hoa cổ học phương Đông. Giúp bạn tìm thấy sự an yên và định hướng trong cuộc sống.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 uppercase text-sm tracking-wider">Liên Kết</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orient-gold transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-orient-gold transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-orient-gold transition-colors">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Cột 3: Thông điệp */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 uppercase text-sm tracking-wider">Lưu Ý</h3>
            <p className="text-sm text-gray-400 italic bg-gray-800 p-3 rounded border-l-2 border-orient-gold">
              "Mọi kết quả chỉ mang tính chất tham khảo. Tướng tại tâm sinh, mệnh do mình tạo."
            </p>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Duyên Phận - Tool Phong Thủy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};