import Link from "next/link";

const SITE_NAME = "AI筋トレメニュー生成";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-6 text-xs text-gray-600">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link href="/" className="hover:text-indigo-700 hover:underline">
            ホーム
          </Link>
          <span className="text-gray-300" aria-hidden="true">
            |
          </span>
          <Link href="/generate" className="hover:text-indigo-700 hover:underline">
            メニュー作成
          </Link>
          <span className="text-gray-300" aria-hidden="true">
            |
          </span>
          <Link href="/articles" className="hover:text-indigo-700 hover:underline">
            記事一覧
          </Link>
          <span className="text-gray-300" aria-hidden="true">
            |
          </span>
          <Link href="/privacy" className="hover:text-indigo-700 hover:underline">
            プライバシーポリシー
          </Link>
          <span className="text-gray-300" aria-hidden="true">
            |
          </span>
          <Link href="/about" className="hover:text-indigo-700 hover:underline">
            運営者情報
          </Link>
          <span className="text-gray-300" aria-hidden="true">
            |
          </span>
          <Link href="/contact" className="hover:text-indigo-700 hover:underline">
            お問い合わせ
          </Link>
        </nav>
        <p className="mt-4 text-center text-gray-500">
          &copy; {year} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
