import type { ReactNode } from "react";

type Platform = "amazon" | "moshimo" | "a8" | "rakuten";

interface AffiliateLinkProps {
  platform: Platform;
  url: string;
  children: ReactNode;
  variant?: "text" | "button" | "card";
}

const PLATFORM_ICON: Record<Platform, string> = {
  amazon: "🛒",
  moshimo: "🔗",
  a8: "🔗",
  rakuten: "🛍️",
};

const REL = "sponsored nofollow noopener";

export function AffiliateLink({
  platform,
  url,
  children,
  variant = "text",
}: AffiliateLinkProps) {
  const icon = PLATFORM_ICON[platform];

  if (variant === "button") {
    return (
      <a
        href={url}
        target="_blank"
        rel={REL}
        className="my-4 inline-flex items-center gap-2 rounded-md bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
      >
        <span aria-hidden="true">{icon}</span>
        {children}
      </a>
    );
  }

  if (variant === "card") {
    return (
      <a
        href={url}
        target="_blank"
        rel={REL}
        className="my-4 block rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-orange-300 hover:bg-orange-50"
      >
        <span className="mr-2" aria-hidden="true">
          {icon}
        </span>
        <span className="font-semibold text-gray-900">{children}</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel={REL}
      className="text-orange-600 underline hover:text-orange-800"
    >
      <span className="mr-1" aria-hidden="true">
        {icon}
      </span>
      {children}
    </a>
  );
}
