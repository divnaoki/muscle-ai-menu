import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { AffiliateLink } from "./AffiliateLink";
import { CTAButton } from "./CTAButton";
import { MdxImage } from "./MdxImage";
import { YouTubeEmbed } from "./YouTubeEmbed";

export const mdxComponents: MDXComponents = {
  MdxImage,
  YouTubeEmbed,
  AffiliateLink,
  CTAButton,

  h1: ({ children }) => (
    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-lg font-semibold text-indigo-700">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 text-sm leading-relaxed text-gray-700 sm:text-base">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-1 pl-6 text-sm text-gray-700 sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-1 pl-6 text-sm text-gray-700 sm:text-base">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
  a: ({ href, children }) => {
    const url = href ?? "#";
    const isExternal = url.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline hover:text-indigo-800"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={url} className="text-indigo-600 underline hover:text-indigo-800">
        {children}
      </Link>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-indigo-300 bg-indigo-50 px-4 py-3 text-sm text-gray-700">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-800">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-300 px-3 py-2 text-gray-700">{children}</td>
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
};
