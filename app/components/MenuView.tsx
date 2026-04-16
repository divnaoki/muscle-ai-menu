"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const sectionAccent: Record<string, string> = {
  ウォームアップ: "from-amber-50 to-white border-amber-200 text-amber-700",
  メインセット: "from-indigo-50 to-white border-indigo-200 text-indigo-700",
  クールダウン: "from-sky-50 to-white border-sky-200 text-sky-700",
  ワンポイントアドバイス: "from-emerald-50 to-white border-emerald-200 text-emerald-700",
};

function pickAccent(text: string): string {
  for (const key of Object.keys(sectionAccent)) {
    if (text.includes(key)) return sectionAccent[key];
  }
  return "from-gray-50 to-white border-gray-200 text-gray-700";
}

const components: Components = {
  h2({ children }) {
    const text = String(children);
    const accent = pickAccent(text);
    return (
      <h2
        className={`mt-8 mb-4 rounded-md border-l-4 bg-gradient-to-r ${accent} px-4 py-2 text-base font-bold first:mt-0`}
      >
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="mt-5 mb-2 text-base font-semibold text-gray-900">{children}</h3>
    );
  },
  p({ children }) {
    return <p className="my-2 text-sm leading-relaxed text-gray-700">{children}</p>;
  },
  ul({ children }) {
    return <ul className="my-2 space-y-1 pl-1 text-sm text-gray-700">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="my-2 list-decimal space-y-1 pl-5 text-sm text-gray-700">{children}</ol>;
  },
  li({ children }) {
    return (
      <li className="flex gap-2 leading-relaxed before:mt-2 before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-indigo-400">
        <span className="flex-1">{children}</span>
      </li>
    );
  },
  strong({ children }) {
    return <strong className="font-semibold text-gray-900">{children}</strong>;
  },
  em({ children }) {
    return <em className="not-italic text-gray-600">{children}</em>;
  },
  hr() {
    return <hr className="my-6 border-gray-200" />;
  },
  code({ children }) {
    return (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-xs text-gray-800">
        {children}
      </code>
    );
  },
};

export function MenuView({ markdown }: { markdown: string }) {
  return (
    <div className="text-gray-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
