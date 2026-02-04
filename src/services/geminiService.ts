import { GoogleGenAI, Type } from "@google/genai";
import { CompatibilityResult, FormData, IChingResult, TossResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper function to calculate Can Chi for the prompt
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

  const prompt = `
    Hãy đóng vai một chuyên gia Phong Thủy và Tử Vi Việt Nam uy tín.
    Nhiệm vụ: Xem tuổi vợ chồng chi tiết cho cặp đôi sau:
    - Chồng: sinh năm ${hYear} (Tuổi ${hCanChi})
    - Vợ: sinh năm ${wYear} (Tuổi ${wCanChi})

    So sánh sự hợp khắc dựa trên 5 yếu tố chính:
    1. Mệnh (Ngũ Hành) - Ví dụ: Chồng mệnh Kim, Vợ mệnh Thổ -> Tương Sinh.
    2. Thiên Can - Ví dụ: Giáp hợp Kỷ, Bính khắc Canh...
    3. Địa Chi - Ví dụ: Tam Hợp, Lục Hợp, Tứ Hành Xung...
    4. Cung Phi (Cung Sanh) - Dựa trên quái số bát trạch.
    5. Thiên Mệnh Năm Sinh (Cung Phối) - Kết hợp Cung Phi để ra (Sinh Khí, Diên Niên, Tuyệt Mệnh, v.v.)

    Đưa ra kết quả phân tích chi tiết, điểm số (thang 10) và lời khuyên.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          husbandYear: { type: Type.NUMBER },
          husbandLunarYear: { type: Type.STRING, description: "Ví dụ: Giáp Thìn" },
          wifeYear: { type: Type.NUMBER },
          wifeLunarYear: { type: Type.STRING, description: "Ví dụ: Ất Tỵ" },
          overallScore: { type: Type.NUMBER, description: "Điểm tổng kết trên thang 10" },
          verdict: { type: Type.STRING, description: "Kết luận ngắn gọn, ví dụ: Đại Cát, Bình Hòa, Tuyệt Mạng..." },
          detailedAnalysis: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                criteria: { type: Type.STRING, description: "Tiêu chí so sánh (Ngũ Hành, Thiên Can...)" },
                husbandInfo: { type: Type.STRING, description: "Thông tin của chồng về tiêu chí này (VD: Lộ Bàng Thổ)" },
                wifeInfo: { type: Type.STRING, description: "Thông tin của vợ về tiêu chí này (VD: Kiếm Phong Kim)" },
                assessment: { type: Type.STRING, description: "Đánh giá: Tương Sinh, Tương Khắc, Bình Hòa, Tam Hợp, Lục Hại..." },
                score: { type: Type.NUMBER, description: "Điểm thành phần (0-2)" },
                explanation: { type: Type.STRING, description: "Giải thích chi tiết ngắn gọn" },
              },
              required: ["criteria", "husbandInfo", "wifeInfo", "assessment", "score", "explanation"]
            }
          },
          advice: { type: Type.STRING, description: "Lời khuyên hóa giải hoặc vun đắp hạnh phúc" }
        },
        required: ["husbandYear", "husbandLunarYear", "wifeYear", "wifeLunarYear", "overallScore", "verdict", "detailedAnalysis", "advice"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Không nhận được phản hồi từ chuyên gia phong thủy.");
  }

  return JSON.parse(response.text) as CompatibilityResult;
};

export const consultIChing = async (lines: TossResult[], question: string): Promise<IChingResult> => {
  // Convert lines to string format for prompt (Bottom to Top)
  // 7/9 = Yang, 6/8 = Yin
  const linesDesc = lines.map((l, i) => `Hào ${i + 1}: ${l.val} (${l.label})`).join("\n");
  
  const prompt = `
    Đóng vai một bậc thầy Kinh Dịch (I Ching) đại tài. Người dùng vừa gieo quẻ (lấy ngẫu nhiên) và đang tâm niệm về một vấn đề.
    
    Kết quả gieo 6 hào (từ dưới lên trên - hào sơ đến hào thượng):
    ${linesDesc}
    
    Hãy an quẻ, lập quẻ Chủ chính xác.
    1. Xác định đây là quẻ Âm hay quẻ Dương.
    2. Xác định Nội Quái (Hạ Quái) và Ngoại Quái (Thượng Quái).
    
    Sau đó luận giải chi tiết theo 3 phần chính sau:
    1. Ý nghĩa của quẻ trong Kinh Dịch:
       - Tổng quan quẻ.
       - Thoán từ (Lời kinh, Dịch âm, Dịch nghĩa, Giảng nghĩa).
       - Tượng quẻ: Phải nêu rõ lời tượng VÀ giải thích chi tiết ý nghĩa tượng quẻ.
       - Ý nghĩa các hào (Lời kinh, Dịch âm, Dịch nghĩa, Giảng nghĩa).
    
    2. Ý nghĩa trong thuật chiêm bốc/đoán quẻ:
       - Ý nghĩa quẻ (Giải thích các từ khóa chính, liệt kê các ý nghĩa như: giải tán, cởi bỏ...).
       - Triệu và điềm của quẻ: Phải bao gồm Tên điềm (Ví dụ: Ngũ quan thoát nạn), Bài thơ tương ứng, Tích xưa (Điển tích), Lời bàn và Lời đoán.
       - Dụng thần: Phân tích kỹ về dụng thần, phi thần, phục thần nếu có.
    
    3. Luận giải chi tiết cho từng sự việc cụ thể.
    
    QUY TẮC:
    - Trả về JSON chuẩn xác.
    - Với các hào, trường "name" chỉ ghi tên hào (VD: "Sơ Lục", "Cửu Nhị"), không lặp lại số thứ tự.
  `;

  const textDetailSchema = {
    type: Type.OBJECT,
    properties: {
        hanVan: { type: Type.STRING, description: "Lời kinh chữ Hán gốc" },
        phienAm: { type: Type.STRING, description: "Phiên âm Hán Việt (Dịch âm)" },
        dichNghia: { type: Type.STRING, description: "Dịch nghĩa tiếng Việt" },
        giangNghia: { type: Type.STRING, description: "Giảng giải ý nghĩa chi tiết" }
    },
    required: ["hanVan", "phienAm", "dichNghia", "giangNghia"]
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hexagramNumber: { type: Type.NUMBER, description: "Số thứ tự của quẻ trong 64 quẻ (1-64)" },
          hexagramName: { type: Type.STRING, description: "Tên quẻ chính (Ví dụ: Thuần Càn)" },
          hexagramCode: { type: Type.STRING, description: "Cấu trúc Thượng Quái / Hạ Quái" },
          innerTrigram: { type: Type.STRING, description: "Tên Nội Quái (Hạ Quái), ví dụ: Ly, Chấn..." },
          outerTrigram: { type: Type.STRING, description: "Tên Ngoại Quái (Thượng Quái), ví dụ: Khảm, Cấn..." },
          isYinOrYang: { type: Type.STRING, description: "Xác định là 'Quẻ Dương', 'Quẻ Âm' hoặc 'Quân Bình'" },
          symbolism: { type: Type.STRING, description: "Hình tượng ngắn gọn của quẻ" },
          lucThan: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Lục thân cho hào 1 đến hào 6, kèm Emoji" 
          },
          lucThu: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Lục thú cho hào 1 đến hào 6, kèm Emoji" 
          },
          diaChi: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Địa chi cho hào 1 đến hào 6" 
          },
          // Section 1
          yiJingMeaning: {
            type: Type.OBJECT,
            properties: {
                overview: { type: Type.STRING, description: "Tổng quan ý nghĩa quẻ trong Kinh Dịch" },
                thuanTu: textDetailSchema,
                tuongQue: {
                    type: Type.OBJECT,
                    properties: {
                        text: { type: Type.STRING, description: "Lời Tượng (VD: Lôi vũ tác Giải)" },
                        explanation: { type: Type.STRING, description: "Giải thích chi tiết ý nghĩa tượng quẻ" }
                    },
                    required: ["text", "explanation"]
                },
                linesMeaning: { 
                    type: Type.ARRAY, 
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING, description: "Tên hào (VD: Sơ Lục, Cửu Nhị, Lục Tam...)" },
                            hanVan: { type: Type.STRING },
                            phienAm: { type: Type.STRING },
                            dichNghia: { type: Type.STRING },
                            giangNghia: { type: Type.STRING }
                        },
                        required: ["name", "hanVan", "phienAm", "dichNghia", "giangNghia"]
                    },
                    description: "Chi tiết ý nghĩa 6 hào từ 1-6" 
                }
            },
            required: ["overview", "thuanTu", "tuongQue", "linesMeaning"]
          },
          // Section 2
          divinationMeaning: {
            type: Type.OBJECT,
            properties: {
                meaning: { type: Type.STRING, description: "Ý nghĩa quẻ trong thuật chiêm bốc (Liệt kê các ý nghĩa)" },
                omen: { 
                    type: Type.OBJECT,
                    properties: {
                        mainText: { type: Type.STRING, description: "Tên điềm/Triệu (VD: Ngũ quan thoát nạn)" },
                        poem: { type: Type.STRING, description: "Bài thơ tương ứng" },
                        story: { type: Type.STRING, description: "Tích xưa (Điển tích)" },
                        commentary: { type: Type.STRING, description: "Lời bàn" },
                        prediction: { type: Type.STRING, description: "Lời đoán" }
                    },
                    required: ["mainText", "poem", "story", "commentary", "prediction"]
                },
                godToUse: { type: Type.STRING, description: "Phân tích Dụng thần" }
            },
            required: ["meaning", "omen", "godToUse"]
          },
          // Section 3
          specificContexts: {
            type: Type.OBJECT,
            properties: {
                currentSituation: { type: Type.STRING },
                future: { type: Type.STRING },
                career: { type: Type.STRING },
                study: { type: Type.STRING },
                wealth: { type: Type.STRING },
                love: { type: Type.STRING },
                children: { type: Type.STRING },
                health: { type: Type.STRING },
                travel: { type: Type.STRING },
                disputes: { type: Type.STRING },
                graves: { type: Type.STRING },
                house: { type: Type.STRING },
                lostProperty: { type: Type.STRING },
                documents: { type: Type.STRING }
            },
            required: ["currentSituation", "future", "career", "study", "wealth", "love", "children", "health", "travel", "disputes", "graves", "house", "lostProperty", "documents"]
          }
        },
        required: ["hexagramNumber", "hexagramName", "hexagramCode", "innerTrigram", "outerTrigram", "isYinOrYang", "symbolism", "lucThan", "lucThu", "diaChi", "yiJingMeaning", "divinationMeaning", "specificContexts"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Không thể luận giải quẻ.");
  }

  return JSON.parse(response.text) as IChingResult;
};

export const generateHexagramImage = async (hexNumber: number, hexName: string, symbolism: string): Promise<string | undefined> => {
  const prompt = `Artistic ink wash painting of I Ching Hexagram ${hexNumber} "${hexName}". Symbolism: ${symbolism}. Minimalist, abstract, black and white, traditional chinese art style, high contrast, clean background.`;
  
  const getUrlFromResponse = (response: any) => {
     for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
    }
    return undefined;
  };

  // STRATEGY 1: Try generating (Flash 2.5 Image) - Returns Base64 (Reliable)
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: '3:4' } }
    });
    const url = getUrlFromResponse(response);
    if (url) return url;
  } catch (e) { 
    console.warn("Gen Attempt 1 failed", e); 
  }

  // STRATEGY 2: Search for an image (Google Search) - Returns URL
  // Warning: Search URLs can be unstable or have hotlinking protection.
  // We prefer Wikimedia or reliable sources.
  try {
    console.log("Attempting to search for image...");
    const searchResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Find a direct public image URL (jpg/png) for "I Ching Hexagram ${hexNumber} ${hexName}" or "Kinh Dịch ${hexName}". 
        Prefer Wikimedia Commons or standard archives.
        Output JSON: { "imageUrl": "URL" }`,
        config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json"
        }
    });
    
    if (searchResponse.text) {
        const data = JSON.parse(searchResponse.text);
        if (data.imageUrl && data.imageUrl.startsWith('http')) {
            return data.imageUrl;
        }
    }
  } catch (e) {
      console.warn("Search Attempt failed", e);
  }

  // If both fail, return undefined to trigger client-side SVG fallback
  return undefined;
}