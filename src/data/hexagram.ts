import { TossResult, IChingResult } from "../types";
// Dùng @data hoặc import trực tiếp từ file cùng cấp đều được vì đây là file trong thư mục data
import { HEXAGRAM_DATA } from "./hexagram_store";

const TRIGRAMS: Record<string, { name: string; element: string; label: string }> = {
    "111": { name: "Càn", element: "Thiên", label: "Trời" },
    "110": { name: "Đoài", element: "Trạch", label: "Đầm/Hồ" },
    "101": { name: "Ly", element: "Hỏa", label: "Lửa" },
    "100": { name: "Chấn", element: "Lôi", label: "Sấm" },
    "011": { name: "Tốn", element: "Phong", label: "Gió" },
    "010": { name: "Khảm", element: "Thủy", label: "Nước" },
    "001": { name: "Cấn", element: "Sơn", label: "Núi" },
    "000": { name: "Khôn", element: "Địa", label: "Đất" },
};

const HEXAGRAM_ID_MAP: Record<string, number> = {
    "111111": 1, "111110": 10, "111101": 13, "111100": 25, "111011": 44, "111010": 6, "111001": 33, "111000": 12,
    "110111": 43, "110110": 58, "110101": 49, "110100": 17, "110011": 28, "110010": 47, "110001": 31, "110000": 45,
    "101111": 14, "101110": 38, "101101": 30, "101100": 21, "101011": 50, "101010": 64, "101001": 56, "101000": 35,
    "100111": 34, "100110": 54, "100101": 55, "100100": 51, "100011": 32, "100010": 40, "100001": 62, "100000": 16,
    "011111": 9, "011110": 61, "011101": 37, "011100": 42, "011011": 57, "011010": 59, "011001": 53, "011000": 20,
    "010111": 5, "010110": 60, "010101": 63, "010100": 3, "010011": 48, "010010": 29, "010001": 39, "010000": 8,
    "001111": 26, "001110": 41, "001101": 22, "001100": 27, "001011": 18, "001010": 4, "001001": 52, "001000": 23,
    "000111": 11, "000110": 19, "000101": 36, "000100": 24, "000011": 46, "000010": 7, "000001": 15, "000000": 2,
};

export const lookupHexagram = (lines: TossResult[]): IChingResult => {
    const getBit = (l: TossResult) => l.val % 2 !== 0 ? "1" : "0";
    const lowerKey = getBit(lines[2]) + getBit(lines[1]) + getBit(lines[0]); 
    const upperKey = getBit(lines[5]) + getBit(lines[4]) + getBit(lines[3]);
    const lowerTri = TRIGRAMS[lowerKey] || { name: "?", element: "?", label: "?" };
    const upperTri = TRIGRAMS[upperKey] || { name: "?", element: "?", label: "?" };
    const fullKey = upperKey + lowerKey;
    const hexId = HEXAGRAM_ID_MAP[fullKey] || 0;
    
    // @ts-ignore
    const richData = HEXAGRAM_DATA[hexId.toString()] || {};

    return {
        hexagramNumber: hexId,
        hexagramName: richData.hexagramName || "Vô Danh",
        hexagramCode: `${upperTri.name} / ${lowerTri.name}`,
        innerTrigram: lowerTri.name,
        outerTrigram: upperTri.name,
        isYinOrYang: richData.isYinOrYang || (hexId % 2 !== 0 ? "Quẻ Dương" : "Quẻ Âm"),
        symbolism: richData.symbolism || "Chưa xác định",
        lucThan: [],
        lucThu: [],
        diaChi: [],
        yiJingMeaning: richData.yiJingMeaning || {
            overview: "Đang tải dữ liệu...",
            thuanTu: { hanVan: "...", phienAm: "...", dichNghia: "...", giangNghia: "..." },
            tuongQue: { text: "...", explanation: "..." },
            linesMeaning: []
        },
        divinationMeaning: richData.divinationMeaning || {
            meaning: "...",
            omen: { mainText: "...", poem: "...", story: "...", commentary: "...", prediction: "..." },
            godToUse: "..."
        },
        specificContexts: richData.specificContexts
    };
};