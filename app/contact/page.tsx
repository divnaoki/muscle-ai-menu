"use client";

import Link from "next/link";
import { useState } from "react";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const hasContactEmail = CONTACT_EMAIL.length > 0;
  const canSubmit =
    hasContactEmail &&
    name.trim().length > 0 &&
    isValidEmail(email) &&
    message.trim().length > 0;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    const subj = subject.trim() || "AI筋トレメニュー生成へのお問い合わせ";
    const lines = [
      `お名前: ${name.trim()}`,
      `メール: ${email.trim()}`,
      "",
      "【お問い合わせ内容】",
      message.trim(),
    ];
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">お問い合わせ</h1>
        <p className="mt-2 text-sm text-gray-600">
          ご質問・ご要望・不具合のご報告などは下記フォームよりお寄せください。
          送信ボタンを押すと、ご利用のメールソフトが起動します。
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field id="name" label="お名前" required>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="山田 太郎"
          />
        </Field>

        <Field id="email" label="メールアドレス" required>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="example@example.com"
          />
        </Field>

        <Field id="subject" label="件名">
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="（任意）"
          />
        </Field>

        <Field id="message" label="お問い合わせ内容" required>
          <textarea
            id="message"
            required
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="お問い合わせ内容をご記入ください"
          />
        </Field>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          送信する（メーラー起動）
        </button>

        {hasContactEmail ? (
          <p className="text-xs text-gray-500">
            送信ボタンが反応しない場合は、お手数ですが直接{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            までご連絡ください。
          </p>
        ) : (
          <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800">
            お問い合わせ先が未設定のため、現在送信できません。サイト管理者にお知らせください。
          </p>
        )}
      </form>

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

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      {children}
    </div>
  );
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
