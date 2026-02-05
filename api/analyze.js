// api/analyze.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Cấu hình CORS để cho phép frontend gọi được (Phòng hờ lỗi chặn truy cập)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Xử lý preflight request (cho trình duyệt)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Kiểm tra Method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 3. Lấy Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("LỖI: Chưa có GEMINI_API_KEY");
      return res.status(500).json({ error: 'Server Config Error: Missing API Key' });
    }

    const { husbandYear, wifeYear, hCanChi, wCanChi } = req.body;

    // 4. Khởi tạo AI (Dùng thư viện GoogleGenerativeAI chuẩn)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", // Dùng model 1.5 Flash cho nhanh và rẻ
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Đóng vai chuyên gia Phong Thủy, xem tuổi vợ chồng:
      - Chồng: ${husbandYear} (${hCanChi})
      - Vợ: ${wifeYear} (${wCanChi})
      
      Phân tích 5 yếu tố (Mệnh, Can, Chi, Cung Phi, Thiên Mệnh).
      Trả về kết quả JSON thuần túy theo cấu trúc:
      {
        "husbandYear": number,
        "husbandLunarYear": string,
        "wifeYear": number,
        "wifeLunarYear": string,
        "overallScore": number,
        "verdict": string,
        "detailedAnalysis": [
            { "criteria": string, "husbandInfo": string, "wifeInfo": string, "assessment": string, "score": number, "explanation": string }
        ],
        "advice": string
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse JSON an toàn
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanJson);

    return res.status(200).json(data);

  } catch (error) {
    console.error("Server API Error Details:", error); // Dòng này sẽ hiện trong Vercel Logs
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}