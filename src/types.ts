export interface CompatibilityDetail {
  criteria: string; // e.g., "Mệnh (Ngũ Hành)", "Thiên Can", "Địa Chi", "Cung Phi"
  husbandInfo: string;
  wifeInfo: string;
  assessment: string; // e.g., "Tương Sinh", "Bình Hòa", "Tương Khắc"
  score: number; // 0 to 2 for this specific criteria
  explanation: string;
}

export interface CompatibilityResult {
  husbandYear: number;
  husbandLunarYear: string; // e.g., "Giáp Thìn"
  wifeYear: number;
  wifeLunarYear: string; // e.g., "Ất Tỵ"
  overallScore: number; // 0 to 10
  verdict: string; // Short summary phrase e.g., "Tam Vinh Hiển"
  detailedAnalysis: CompatibilityDetail[];
  advice: string; // Practical advice for the couple
}

export interface FormData {
  husbandYear: string;
  wifeYear: string;
}

// Kinh Dịch Types
export interface SpecificContexts {
  currentSituation: string; // Tình thế hiện tại
  future: string; // Tương lai
  career: string; // Sự nghiệp
  study: string; // Học tập
  wealth: string; // Tài sản/Tài lộc
  love: string; // Tình duyên
  children: string; // Tử tức
  health: string; // Sức khỏe
  travel: string; // Xuất hành
  disputes: string; // Tranh chấp
  graves: string; // Mồ mả
  house: string; // Nhà cửa
  lostProperty: string; // Mất của
  documents: string; // Giấy tờ
}

export interface TextDetail {
  hanVan: string; // Lời kinh chữ Hán
  phienAm: string; // Dịch âm
  dichNghia: string; // Dịch nghĩa
  giangNghia: string; // Giảng nghĩa
}

export interface LineDetail extends TextDetail {
  name: string; // Tên hào (VD: Sơ Lục, Cửu Nhị...)
}

export interface OmenDetail {
  mainText: string; // Triệu (e.g., Ngũ quan thoát nạn)
  poem: string; // Bài thơ
  story: string; // Tích xưa
  commentary: string; // Lời bàn
  prediction: string; // Lời đoán
}

export interface YiJingMeaning {
  overview: string; // Tổng quan quẻ
  thuanTu: TextDetail; // Thoán từ (Structured)
  tuongQue: {
    text: string; // Lời tượng (e.g. Lôi vũ tác giải)
    explanation: string; // Giải thích chi tiết tượng quẻ
  };
  linesMeaning: LineDetail[]; // Ý nghĩa các hào (Structured)
}

export interface DivinationMeaning {
  meaning: string; // Ý nghĩa quẻ trong chiêm bốc (Giải thích các ý nghĩa chính)
  omen: OmenDetail; // Triệu và điềm (Cấu trúc chi tiết)
  godToUse: string; // Dụng thần
}

export interface IChingResult {
  hexagramNumber: number; // 1-64
  hexagramName: string; // e.g. "Hỏa Thủy Vị Tế"
  hexagramCode: string; // e.g. "Ly / Khảm"
  innerTrigram: string; // Nội quái (e.g. Ly)
  outerTrigram: string; // Ngoại quái (e.g. Khảm)
  isYinOrYang: string; // "Quẻ Dương" | "Quẻ Âm" | "Quẻ Quân Bình"
  symbolism: string; // e.g. "Việc chưa xong, dở dang"
  
  // Basic An Quẻ info
  lucThan: string[];
  lucThu: string[];
  diaChi: string[];
  
  // Section 1: Meaning in I Ching
  yiJingMeaning: YiJingMeaning;
  
  // Section 2: Meaning in Divination
  divinationMeaning: DivinationMeaning;
  
  // Section 3: Specific Contexts
  specificContexts: SpecificContexts;

  imageUrl?: string;
}

export interface TossResult {
  val: number; // 6, 7, 8, 9
  label: 'Lão Âm' | 'Thiếu Dương' | 'Thiếu Âm' | 'Lão Dương';
  isYang: boolean;
  isChanging: boolean;
}