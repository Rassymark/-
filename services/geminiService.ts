
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function fetchDailyHealingContent(dateStr: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `오늘의 날짜는 ${dateStr}입니다. 대한민국 시간 기준으로 다음 정보를 생성해주세요:
    1. 디지털 피로감을 줄이기 위한 '따스한 행동 추천' (1문장)
    2. 디지털 취약계층(어르신 등)을 위한 아주 쉬운 'AI 사용법' (제목, 설명, 3-4단계의 간단한 방법)
    반드시 한국어로 작성해주세요.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          warmAction: { type: Type.STRING },
          aiTip: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              steps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title", "description", "steps"]
          }
        },
        required: ["warmAction", "aiTip"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
}
