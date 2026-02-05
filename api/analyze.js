// api/analyze.js
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Chỉ chấp nhận method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { husbandYear, wifeYear, hCanChi, wCanChi } = req.body;

    // Lấy API Key từ biến môi trường server (Không có tiền tố VITE_)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Server API Key missing' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Đóng vai chuyên gia Phong Thủy, xem tuổi vợ chồng:
      - Chồng: ${husbandYear} (${hCanChi})
      - Vợ: ${wifeYear} (${wCanChi})
      
      Phân tích 5 yếu tố (Mệnh, Can, Chi, Cung Phi, Thiên Mệnh).
      Trả về kết quả dưới dạng JSON thuần túy, không có markdown code blocks.
    `;

    // Gọi Gemini (Lưu ý: Cấu hình schema giống hệt code cũ của bạn)
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Hoặc model bạn muốn dùng
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        // ... (Bạn có thể copy phần responseSchema từ file cũ vào đây nếu muốn strict mode)
      }
    });

    if (!response.text) throw new Error("No response");

    const cleanJson = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanJson);

    return res.status(200).json(data);

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}