import { GoogleGenAI, Type } from "@google/genai";
import type { CompatibilityResult, FormData, IChingResult, TossResult } from "../types";

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

// Helper function to calculate Can Chi for the prompt
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
    const ai = getAI();
    // Convert lines to a descriptive string for the prompt
    // lines[0] is Bottom (Hào 1), lines[5] is Top (Hào 6)
    const lineDesc = lines.map((l, i) => 
        `Hào ${i + 1}: ${l.val} (${l.label}) - ${l.isChanging ? "Động (Biến)" : "Tĩnh"}`
    ).join("\n");

    const prompt = `
      Bạn là một bậc thầy về Kinh Dịch và Dự Đoán Học (I Ching).
      Người dùng đã gieo quẻ và nhận được kết quả các hào như sau (từ dưới lên trên):
      ${lineDesc}

      Câu hỏi của người dùng (nếu có): "${question || "Xin luận giải tổng quát về vận thế hiện tại"}"

      Nhiệm vụ:
      1. Xác định Quẻ Chủ (Hexagram) dựa trên các hào đã gieo.
      2. Nếu có hào động, xác định Quẻ Biến.
      3. Xác định các yếu tố: Lục Thân, Lục Thú, Địa Chi cho từng hào.
      4. Luận giải chi tiết ý nghĩa của quẻ (Thoán từ, Đại tượng, Hào từ...).
      5. Đưa ra lời khuyên cụ thể cho các khía cạnh cuộc sống (Sự nghiệp, Tài lộc, Tình duyên...).

      Hãy trả về kết quả dưới dạng JSON tuân thủ schema sau.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    hexagramNumber: { type: Type.NUMBER, description: "Số thứ tự quẻ (1-64)" },
                    hexagramName: { type: Type.STRING, description: "Tên quẻ (VD: Hỏa Thủy Vị Tế)" },
                    hexagramCode: { type: Type.STRING, description: "Mã quẻ (VD: Ly / Khảm)" },
                    innerTrigram: { type: Type.STRING, description: "Nội quái (VD: Ly)" },
                    outerTrigram: { type: Type.STRING, description: "Ngoại quái (VD: Khảm)" },
                    isYinOrYang: { type: Type.STRING, description: "Quẻ Dương, Quẻ Âm hoặc Quẻ Quân Bình" },
                    symbolism: { type: Type.STRING, description: "Hình tượng ý nghĩa ngắn gọn (VD: Việc chưa xong, dở dang)" },
                    lucThan: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lục Thân cho 6 hào (VD: Phụ Mẫu, Tử Tôn...)" },
                    lucThu: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Lục Thú cho 6 hào (VD: Thanh Long, Chu Tước...)" },
                    diaChi: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Địa Chi cho 6 hào (VD: Ngọ, Thân, Tuất...)" },
                    yiJingMeaning: {
                        type: Type.OBJECT,
                        properties: {
                            overview: { type: Type.STRING, description: "Tổng quan ý nghĩa quẻ theo Kinh Dịch" },
                            thuanTu: {
                                type: Type.OBJECT,
                                properties: {
                                    hanVan: { type: Type.STRING },
                                    phienAm: { type: Type.STRING },
                                    dichNghia: { type: Type.STRING },
                                    giangNghia: { type: Type.STRING }
                                }
                            },
                            tuongQue: {
                                type: Type.OBJECT,
                                properties: {
                                    text: { type: Type.STRING, description: "Lời Tượng (Đại Tượng)" },
                                    explanation: { type: Type.STRING, description: "Giải thích Tượng quẻ" }
                                }
                            },
                            linesMeaning: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING, description: "Tên hào (VD: Sơ Lục, Cửu Nhị)" },
                                        hanVan: { type: Type.STRING },
                                        phienAm: { type: Type.STRING },
                                        dichNghia: { type: Type.STRING },
                                        giangNghia: { type: Type.STRING }
                                    }
                                }
                            }
                        }
                    },
                    divinationMeaning: {
                        type: Type.OBJECT,
                        properties: {
                            meaning: { type: Type.STRING, description: "Ý nghĩa trong chiêm bốc, tiên tri" },
                            omen: {
                                type: Type.OBJECT,
                                properties: {
                                    mainText: { type: Type.STRING, description: "Tên Triệu (Điềm)" },
                                    poem: { type: Type.STRING, description: "Bài thơ cổ về quẻ" },
                                    story: { type: Type.STRING, description: "Tích cổ liên quan" },
                                    commentary: { type: Type.STRING, description: "Lời bàn giải" },
                                    prediction: { type: Type.STRING, description: "Lời đoán kiết hung" }
                                }
                            },
                            godToUse: { type: Type.STRING, description: "Dụng thần" }
                        }
                    },
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
                        }
                    }
                }
            }
        }
    });

    if (!response.text) {
        throw new Error("Không nhận được luận giải từ chuyên gia.");
    }

    return JSON.parse(response.text) as IChingResult;
};

export const generateHexagramImage = async (hexNumber: number, hexName: string, symbolism: string): Promise<string | undefined> => {
  const ai = getAI();
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
  try {
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

  return undefined;
}

export const describeImage = async (imageBase64: string): Promise<string> => {
    const ai = getAI();
    try {
        // If data uri, strip header
        const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
        let mimeType = "image/png";
        if (imageBase64.includes(';')) {
            const matches = imageBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
            if (matches && matches[1]) {
                mimeType = matches[1];
            }
        }

        const prompt = "Hãy mô tả chi tiết bức tranh này bằng tiếng Việt. Tập trung vào các yếu tố nghệ thuật, ý nghĩa tượng trưng của Kinh Dịch mà bạn cảm nhận được, và cảm xúc mà bức tranh mang lại.";

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: {
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Data
                        }
                    }
                ]
            }
        });

        return response.text || "Không thể mô tả hình ảnh này.";
    } catch (e) {
        console.error("Describe image error:", e);
        return "Xin lỗi, đã xảy ra lỗi khi phân tích hình ảnh.";
    }
};
