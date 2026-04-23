"use client";

import { Children, isValidElement, type ReactNode } from "react";
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
  h3({ children, node }) {
    const name = readHastText(node) || extractText(children);
    const query = name.trim() || "筋トレ";
    const ytUrl = buildYouTubeSearchUrl(query);
    return (
      <div className="mt-5 mb-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-base font-semibold text-gray-900">{children}</h3>
          <a
            href={ytUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${query} のやり方をYouTubeで検索する`}
            className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-medium text-red-700 transition-colors hover:bg-red-100 hover:text-red-800"
          >
            <YouTubeIcon className="h-3 w-3" aria-hidden="true" />
            やり方動画
          </a>
        </div>
      </div>
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

function buildYouTubeSearchUrl(name: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} やり方 初心者`)}`;
}

type HastLike = { type?: string; value?: string; children?: HastLike[] };

function readHastText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as HastLike;
  if (typeof n.value === "string") return n.value;
  if (Array.isArray(n.children)) return n.children.map(readHastText).join("");
  return "";
}

function extractText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return extractText(child.props.children);
      }
      return "";
    })
    .join("");
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.5zM9.6 15.5v-7l6.3 3.5-6.3 3.5z" />
    </svg>
  );
}
