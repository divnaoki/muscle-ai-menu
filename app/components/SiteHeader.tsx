"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/articles", label: "記事" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/85 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="AI筋トレメニュー トップへ"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <DumbbellIcon className="h-4 w-4" />
          </span>
          <span className="text-base font-bold tracking-tight text-gray-900 group-hover:text-indigo-700 sm:text-lg">
            AI筋トレメニュー
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-md px-2.5 py-1.5 text-sm font-semibold text-indigo-700 sm:px-3"
                    : "rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:px-3"
                }
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/generate"
            aria-current={isActive("/generate") ? "page" : undefined}
            className="ml-1 inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 sm:ml-2 sm:px-4 sm:text-sm"
          >
            <SparkleIcon className="h-3.5 w-3.5" aria-hidden="true" />
            メニュー作成
          </Link>
        </nav>
      </div>
    </header>
  );
}

function DumbbellIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.5 6.5v11" />
      <path d="M3 9v5" />
      <path d="M17.5 6.5v11" />
      <path d="M21 9v5" />
      <path d="M6.5 12h11" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.8L12 2.5zM18.5 14l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1 1-2.6z" />
    </svg>
  );
}
