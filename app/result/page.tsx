"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdPlaceholder } from "../components/AdPlaceholder";
import { MenuView } from "../components/MenuView";
import { STORAGE_KEYS, type MenuConditions } from "../types";

type ViewState =
  | { status: "loading" }
  | { status: "ready"; result: string; meta: MenuConditions };

export default function ResultPage() {
  const router = useRouter();
  const [view, setView] = useState<ViewState>({ status: "loading" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const result = sessionStorage.getItem(STORAGE_KEYS.result);
    const metaRaw = sessionStorage.getItem(STORAGE_KEYS.meta);
    if (!result || !metaRaw) {
      router.replace("/");
      return;
    }
    try {
      const meta = JSON.parse(metaRaw) as MenuConditions;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage はクライアントのみで読めるため、マウント後に初期値を反映する必要がある
      setView({ status: "ready", result, meta });
    } catch {
      router.replace("/");
    }
  }, [router]);

  async function handleCopy() {
    if (view.status !== "ready") return;
    try {
      await navigator.clipboard.writeText(view.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop: clipboard API unavailable
    }
  }

  if (view.status === "loading") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-gray-500">読み込み中...</p>
      </main>
    );
  }

  const { result, meta } = view;
  const pills: string[] = [];
  if (meta.goal) pills.push(`目標: ${meta.goal}`);
  if (meta.parts.length > 0) pills.push(`部位: ${meta.parts.join("・")}`);
  if (meta.level) pills.push(`レベル: ${meta.level}`);
  if (meta.duration) pills.push(`時間: ${meta.duration}`);
  if (meta.equipment) pills.push(`器具: ${meta.equipment}`);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          あなた専用の筋トレメニュー
        </h1>
        <p className="mt-1 text-xs text-gray-500">AI が条件に合わせて生成しました</p>
      </header>

      <section className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          選択した条件
        </h2>
        <div className="flex flex-wrap gap-2">
          {pills.map((p) => (
            <span
              key={p}
              className="rounded-full border border-indigo-300 bg-white px-3 py-1 text-xs font-medium text-indigo-700"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      <section className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-4 top-4 rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          {copied ? "コピーしました" : "コピー"}
        </button>
        <MenuView markdown={result} />
      </section>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="mt-6 w-full rounded-md border border-indigo-300 bg-white px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
      >
        条件を変えて再生成する
      </button>

      <AdPlaceholder />
    </main>
  );
}
