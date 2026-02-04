import { GoogleGenAI, Type } from "@google/genai";
import type { CompatibilityResult, FormData, IChingResult, TossResult, SpecificContexts } from "../types";
import { lookupHexagram } from "../data/hexagram";
// Helper function to get the AI instance. 
// Initializes lazily to prevent top-level crashes if API_KEY is missing during development.
const getAI = () => {
  // Try to get key from process.env (mapped in vite.config) or direct Vite env
  // @ts-ignore
  const apiKey = process.env.API_KEY || import.meta.env?.VITE_API_KEY;
  
  if (!apiKey || apiKey.includes('YOUR_GEMINI_API_KEY')) {
    throw new Error("API Key chưa hợp lệ. Vui lòng mở file .env và điền key Gemini của bạn vào biến VITE_API_KEY.");
  }
  return new GoogleGenAI({ apiKey });
};

const getCanChi = (year: number) => {
    const can = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
    const chi = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
    return `${can[year % 10]} ${chi[year % 12]}`;
};

export const checkCompatibility = async (data: FormData): Promise<CompatibilityResult> => {
  const ai = getAI();
  const hYear = parseInt(data.husbandYear);
  const wYear = parseInt(data.wifeYear);
  const hCanChi = getCanChi(hYear);
  const wCanChi = getCanChi(wYear);

  const prompt = `
    Đóng vai chuyên gia Phong Thủy, xem tuổi vợ chồng:
    - Chồng: ${hYear} (${hCanChi})
    - Vợ: ${wYear} (${wCanChi})
    
    Phân tích 5 yếu tố (Mệnh, Can, Chi, Cung Phi, Thiên Mệnh).
    Trả về kết quả dưới dạng JSON thuần túy, không có markdown code blocks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            husbandYear: { type: Type.NUMBER },
            husbandLunarYear: { type: Type.STRING },
            wifeYear: { type: Type.NUMBER },
            wifeLunarYear: { type: Type.STRING },
            overallScore: { type: Type.NUMBER },
            verdict: { type: Type.STRING },
            detailedAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  criteria: { type: Type.STRING },
                  husbandInfo: { type: Type.STRING },
                  wifeInfo: { type: Type.STRING },
                  assessment: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  explanation: { type: Type.STRING },
                },
                required: ["criteria", "husbandInfo", "wifeInfo", "assessment", "score", "explanation"]
              }
            },
            advice: { type: Type.STRING }
          }
        }
      }
    });

    if (!response.text) throw new Error("Không nhận được phản hồi từ AI");

    // SỬA LỖI QUAN TRỌNG: Làm sạch chuỗi JSON trước khi parse
    const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson) as CompatibilityResult;

  } catch (error) {
    console.error("Lỗi khi gọi Gemini:", error);
    throw new Error("Không thể luận giải lúc này. Vui lòng thử lại sau.");
  }
};

// --- CÁC HÀM KINH DỊCH (CHỈ LẤY DỮ LIỆU TĨNH) ---

export const getHexagramBasicInfo = (lines: TossResult[]): IChingResult => {
    return lookupHexagram(lines);
};
