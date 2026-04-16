import { GoogleGenerativeAI, FinishReason } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { buildPrompt } from "@/app/lib/buildPrompt";
import {
  BODY_PARTS,
  DURATIONS,
  EQUIPMENTS,
  GOALS,
  LEVELS,
  isComplete,
  type MenuConditions,
} from "@/app/types";

export const runtime = "nodejs";
export const maxDuration = 30;

function sanitizeConditions(raw: unknown): MenuConditions | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const goal = GOALS.includes(r.goal as never) ? (r.goal as MenuConditions["goal"]) : null;
  const level = LEVELS.includes(r.level as never) ? (r.level as MenuConditions["level"]) : null;
  const duration = DURATIONS.includes(r.duration as never)
    ? (r.duration as MenuConditions["duration"])
    : null;
  const equipment = EQUIPMENTS.includes(r.equipment as never)
    ? (r.equipment as MenuConditions["equipment"])
    : null;
  const parts = Array.isArray(r.parts)
    ? (r.parts.filter((p) => BODY_PARTS.includes(p as never)) as MenuConditions["parts"])
    : [];
  return { goal, parts, level, duration, equipment };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "リクエストボディが不正です" }, { status: 400 });
  }

  const conditions = sanitizeConditions((body as { conditions?: unknown })?.conditions);
  if (!conditions || !isComplete(conditions)) {
    return NextResponse.json({ error: "選択項目が不足しています" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return NextResponse.json({ error: "サーバー設定エラーが発生しました" }, { status: 500 });
  }

  const prompt = buildPrompt(conditions);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;

    if (response.promptFeedback?.blockReason) {
      return NextResponse.json(
        { error: "入力内容が安全フィルタにブロックされました" },
        { status: 400 },
      );
    }

    const candidate = response.candidates?.[0];
    if (candidate?.finishReason === FinishReason.SAFETY) {
      return NextResponse.json(
        { error: "生成結果が安全フィルタにブロックされました。条件を変えて再試行してください" },
        { status: 422 },
      );
    }

    const text = response.text();
    if (!text) {
      return NextResponse.json({ error: "生成結果が空でした" }, { status: 502 });
    }
    return NextResponse.json({ result: text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: "メニュー生成に失敗しました。しばらくしてから再試行してください" },
      { status: 502 },
    );
  }
}
