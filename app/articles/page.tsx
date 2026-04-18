import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "./_data/articles";

export const metadata: Metadata = {
  title: "記事一覧 | AI筋トレメニュー生成",
  description: "筋トレ初心者・自宅トレーニングなど、トレーニングの基礎から実践まで役立つ記事を掲載しています。",
};

export default function ArticlesPage() {
  const sorted = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">記事一覧</h1>
        <p className="mt-2 text-sm text-gray-600">
          筋トレ・自重トレーニング・食事など、続けるために役立つ情報を発信しています。
        </p>
      </header>

      <ul className="space-y-4">
        {sorted.map((a) => (
          <li
            key={a.slug}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-indigo-300"
          >
            <Link href={`/articles/${a.slug}`} className="block">
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <span className="rounded-full border border-indigo-300 bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">
                  {a.category}
                </span>
                <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
              </div>
              <h2 className="mt-2 text-lg font-semibold text-gray-900 hover:text-indigo-700">
                {a.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{a.description}</p>
              <p className="mt-3 text-xs font-medium text-indigo-700">続きを読む →</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
