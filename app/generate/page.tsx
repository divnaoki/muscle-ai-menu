"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SelectButton } from "../components/SelectButton";
import {
  BODY_PARTS,
  DURATIONS,
  EMPTY_CONDITIONS,
  EQUIPMENTS,
  GOALS,
  LEVELS,
  STORAGE_KEYS,
  isComplete,
  type BodyPart,
  type Duration,
  type Equipment,
  type Goal,
  type Level,
  type MenuConditions,
} from "../types";

export default function GeneratePage() {
  const router = useRouter();
  const [conditions, setConditions] = useState<MenuConditions>(EMPTY_CONDITIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEYS.meta);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<MenuConditions>;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage はクライアントのみで読めるため、マウント後に初期値を反映する必要がある
      setConditions({
        goal: GOALS.includes(parsed.goal as Goal) ? (parsed.goal as Goal) : null,
        parts: Array.isArray(parsed.parts)
          ? parsed.parts.filter((p): p is BodyPart => BODY_PARTS.includes(p as BodyPart))
          : [],
        level: LEVELS.includes(parsed.level as Level) ? (parsed.level as Level) : null,
        duration: DURATIONS.includes(parsed.duration as Duration)
          ? (parsed.duration as Duration)
          : null,
        equipment: EQUIPMENTS.includes(parsed.equipment as Equipment)
          ? (parsed.equipment as Equipment)
          : null,
      });
    } catch {
      // ignore malformed meta
    }
  }, []);

  const canSubmit = isComplete(conditions) && !loading;

  function togglePart(part: BodyPart) {
    setConditions((prev) => {
      if (part === "全身") {
        const already = prev.parts.includes("全身");
        return { ...prev, parts: already ? [] : ["全身"] };
      }
      const withoutZenshin = prev.parts.filter((p) => p !== "全身");
      const exists = withoutZenshin.includes(part);
      return {
        ...prev,
        parts: exists
          ? withoutZenshin.filter((p) => p !== part)
          : [...withoutZenshin, part],
      };
    });
  }

  async function handleSubmit() {
    if (!isComplete(conditions)) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conditions }),
      });
      const data = (await res.json()) as { result?: string; error?: string };
      if (!res.ok || !data.result) {
        setError(data.error ?? "エラーが発生しました");
        setLoading(false);
        return;
      }
      sessionStorage.setItem(STORAGE_KEYS.result, data.result);
      sessionStorage.setItem(STORAGE_KEYS.meta, JSON.stringify(conditions));
      router.push("/result");
    } catch {
      setError("通信エラーが発生しました");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI筋トレメニュー生成</h1>
        <p className="mt-2 text-sm text-gray-600">
          条件を選ぶだけで、AIがあなた専用のメニューを提案します。
        </p>
      </header>

      <div className="space-y-6">
        <Field label="目標（単一選択）">
          {GOALS.map((g) => (
            <SelectButton
              key={g}
              label={g}
              selected={conditions.goal === g}
              onClick={() => setConditions({ ...conditions, goal: g })}
              disabled={loading}
            />
          ))}
        </Field>

        <Field label="鍛えたい部位（複数選択可・「全身」選択時は他と排他）">
          {BODY_PARTS.map((p) => (
            <SelectButton
              key={p}
              label={p}
              selected={conditions.parts.includes(p)}
              onClick={() => togglePart(p)}
              disabled={loading}
            />
          ))}
        </Field>

        <Field label="経験レベル（単一選択）">
          {LEVELS.map((l) => (
            <SelectButton
              key={l}
              label={l}
              selected={conditions.level === l}
              onClick={() => setConditions({ ...conditions, level: l })}
              disabled={loading}
            />
          ))}
        </Field>

        <Field label="トレーニング時間（単一選択）">
          {DURATIONS.map((d) => (
            <SelectButton
              key={d}
              label={d}
              selected={conditions.duration === d}
              onClick={() => setConditions({ ...conditions, duration: d })}
              disabled={loading}
            />
          ))}
        </Field>

        <Field label="使用できる器具（単一選択）">
          {EQUIPMENTS.map((e) => (
            <SelectButton
              key={e}
              label={e}
              selected={conditions.equipment === e}
              onClick={() => setConditions({ ...conditions, equipment: e })}
              disabled={loading}
            />
          ))}
        </Field>
      </div>

      {error && (
        <p className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {loading ? "AIがメニューを作成中..." : "メニューを生成する"}
      </button>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-800">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
