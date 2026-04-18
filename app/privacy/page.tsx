import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | AI筋トレメニュー生成",
  description:
    "AI筋トレメニュー生成における個人情報の取扱い、Cookie の利用、広告配信、アクセス解析、免責事項などを記載しています。",
};

const SITE_NAME = "AI筋トレメニュー生成";
const CONTACT_PATH = "/contact";
const EFFECTIVE_DATE = "2026年4月18日";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          プライバシーポリシー
        </h1>
        <p className="mt-2 text-xs text-gray-500">最終更新日: {EFFECTIVE_DATE}</p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <p>
            {SITE_NAME}（以下「当サイト」といいます）は、利用者のプライバシーを尊重し、
            個人情報の保護に努めます。本ポリシーでは、当サイトにおける個人情報の取扱い、
            Cookie および類似技術の利用、広告配信、アクセス解析、免責事項などについて
            定めます。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            1. 取得する情報
          </h2>
          <p>
            当サイトでは、利用者がフォームで選択した筋トレ条件（目標・部位・レベル・時間・器具）を
            メニュー生成のために利用します。これらの条件はサーバーへ送信され、生成 AI
            （Google Gemini API）への入力として処理されます。
          </p>
          <p className="mt-2">
            また、生成結果と入力条件はブラウザの sessionStorage にのみ保存され、
            タブを閉じると自動的に消去されます。当サイトのデータベースには保存されません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            2. Cookie および類似技術の利用
          </h2>
          <p>
            当サイトは、サービス改善および広告配信を目的として、Cookie および類似技術を
            利用することがあります。利用者はブラウザの設定により Cookie を無効化できますが、
            その場合は一部機能がご利用いただけない可能性があります。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            3. 広告配信について（Google AdSense）
          </h2>
          <p>
            当サイトは、第三者配信の広告サービス「Google AdSense」を利用する予定です。
            Google などの第三者広告配信事業者は、利用者の興味に応じた広告を表示するため、
            Cookie を使用することがあります。
          </p>
          <p className="mt-2">
            Cookie を使用することで、当サイトや他のサイトへの過去のアクセス情報に基づいて
            広告が配信されます。利用者は{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              広告設定
            </a>{" "}
            ページで、パーソナライズ広告を無効にできます。
          </p>
          <p className="mt-2">
            また、{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              Google 広告に関するポリシー
            </a>{" "}
            もあわせてご確認ください。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            4. アクセス解析について
          </h2>
          <p>
            当サイトでは、サービス向上のために Google Analytics 等のアクセス解析ツールを
            導入する場合があります。これらのツールはトラフィックデータの収集のために
            Cookie を使用しますが、収集される情報は匿名であり、個人を特定するものでは
            ありません。詳細は各ツール提供者のポリシーをご確認ください。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            5. 第三者提供
          </h2>
          <p>
            当サイトは、法令に基づく場合を除き、利用者の同意なく個人情報を第三者に提供する
            ことはありません。ただし、メニュー生成のために選択条件を Google Gemini API
            に送信することが必要であり、この点は利用者の同意があるものとみなします。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            6. 免責事項
          </h2>
          <p>
            当サイトが提供する筋トレメニューは AI による自動生成であり、医学的・専門的な
            アドバイスではありません。実施にあたっては、利用者ご自身の体調や健康状態を
            考慮し、必要に応じて医師や専門家にご相談ください。実施によって生じた怪我や
            損害について、当サイトは一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            7. プライバシーポリシーの変更
          </h2>
          <p>
            当サイトは、必要に応じて本ポリシーを変更することがあります。重要な変更がある
            場合は、当ページにて告知します。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            8. お問い合わせ
          </h2>
          <p>
            本ポリシーに関するお問い合わせは、{" "}
            <Link
              href={CONTACT_PATH}
              className="text-indigo-600 underline hover:text-indigo-800"
            >
              お問い合わせページ
            </Link>{" "}
            よりご連絡ください。
          </p>
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
