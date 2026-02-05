import type { CompatibilityResult, FormData, IChingResult, TossResult } from "../types";
import { lookupHexagram } from "../data/hexagram";

const getCanChi = (year: number) => {
    const can = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
    const chi = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
    return `${can[year % 10]} ${chi[year % 12]}`;
};

export const checkCompatibility = async (data: FormData): Promise<CompatibilityResult> => {
  const hYear = parseInt(data.husbandYear);
  const wYear = parseInt(data.wifeYear);
  const hCanChi = getCanChi(hYear);
  const wCanChi = getCanChi(wYear);

  try {
    // Gọi đến Serverless Function của chính mình thay vì gọi Google trực tiếp
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            husbandYear: hYear,
            wifeYear: wYear,
            hCanChi,
            wCanChi
        })
    });

    if (!response.ok) {
        throw new Error('Lỗi khi kết nối đến server');
    }

    const result = await response.json();
    return result as CompatibilityResult;

  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw new Error("Không thể luận giải lúc này. Vui lòng thử lại sau.");
  }
};
// --- CÁC HÀM KINH DỊCH (GIỮ NGUYÊN) ---
export const getHexagramBasicInfo = (lines: TossResult[]): IChingResult => {
    return lookupHexagram(lines);
};