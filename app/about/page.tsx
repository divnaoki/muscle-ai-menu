import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報 | muscle-ai-menu",
  description:
    "muscle-ai-menu の運営者情報、サイトの目的、収益化方針、免責事項について。",
};

const SITE_URL = "https://muscle-ai-menu.vercel.app/";
const CONTACT_PATH = "/contact";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          運営者情報
        </h1>
        <p className="mt-2 text-xs text-gray-500">最終更新日: 2026年4月25日</p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">サイト名</h2>
          <p>muscle-ai-menu（マッスルAIメニュー）</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">サイトURL</h2>
          <p>
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              {SITE_URL}
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">運営者</h2>
          <p>arufu</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            サイトの目的
          </h2>
          <p>
            AI（Google Gemini）を活用し、初心者でも迷わず取り組める筋トレメニューを
            自動生成するWebアプリです。種目別ガイドや習慣化のコツなど、フィットネス
            初心者の継続をサポートする情報を発信しています。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            サイトの収益化について
          </h2>
          <p>当サイトは以下の方法で運営費用を賄っています:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Google AdSense による広告表示</li>
            <li>Amazon アソシエイト・プログラムへの参加</li>
            <li>もしもアフィリエイト・A8.net 等のアフィリエイト・プログラムへの参加</li>
          </ul>
          <p className="mt-3">
            商品やサービスの紹介リンクから購入が発生した場合、当サイトに紹介料が
            支払われることがあります。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">連絡先</h2>
          <p>
            ご質問・ご意見は{" "}
            <Link
              href={CONTACT_PATH}
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              お問い合わせフォーム
            </Link>{" "}
            よりお願いいたします。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">免責事項</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              当サイトの情報は一般的なフィットネス情報の提供を目的としており、
              医療行為や個別の指導を代替するものではありません。
            </li>
            <li>
              トレーニングを実施する際は、ご自身の体調・体力に応じて無理のない
              範囲で行ってください。
            </li>
            <li>
              当サイトの情報を利用した結果生じた損害について、一切の責任を負い
              かねます。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">運営開始</h2>
          <p>2026年4月</p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            サイト更新履歴
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>2026年4月: サイト公開、初期記事5本公開</li>
          </ul>
        </section>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-block rounded-md border border-indigo-300 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
        >
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
