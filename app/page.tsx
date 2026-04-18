import Link from "next/link";

const STEPS = [
  {
    title: "条件を選ぶ",
    body: "目標・鍛えたい部位・経験レベル・トレーニング時間・使える器具を、ボタンを押すだけで指定します。文章入力は不要です。",
  },
  {
    title: "AIがメニューを作成",
    body: "選択した条件をもとに、Google Gemini があなた専用の筋トレメニューを瞬時に生成します。",
  },
  {
    title: "今日からトレーニング開始",
    body: "ウォームアップからクールダウンまで、セット数・回数・フォームのコツまで含めて表示。コピーしてスマホで見ながら実施できます。",
  },
];

const BENEFITS = [
  {
    title: "悩まずに始められる",
    body: "「何をやればいいか分からない」が解消。条件に最適化された具体的なメニューがすぐ手に入ります。",
  },
  {
    title: "自分に合ったレベル感",
    body: "初心者から上級者まで対応。経験レベルと器具に応じて、無理なく続けられる強度に自動調整されます。",
  },
  {
    title: "時間を有効活用",
    body: "15分から90分まで、その日の使える時間に合わせたメニューを提案。スキマ時間でも本格的に鍛えられます。",
  },
  {
    title: "完全無料・登録不要",
    body: "アカウント登録もメールアドレス入力も不要。今すぐ使えて、生成データも端末内のみで処理されます。",
  },
];

const FAQ = [
  {
    q: "本当に無料ですか？",
    a: "はい、本サイトは完全無料でご利用いただけます。アカウント登録も不要です。",
  },
  {
    q: "ジムに通っていなくても使えますか？",
    a: "はい。「自重のみ」を選択すれば、器具なしで自宅トレーニング向けメニューが生成されます。",
  },
  {
    q: "生成されたメニューの安全性は？",
    a: "AI が生成する一般的なトレーニング案であり、医学的助言ではありません。持病・怪我のある方は医師にご相談のうえご利用ください。",
  },
  {
    q: "個人情報は保存されますか？",
    a: "氏名・メールアドレス等の個人情報は一切取得していません。詳細はプライバシーポリシーをご覧ください。",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="text-center">
        <p className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          完全無料・登録不要
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          AIがあなた専用の
          <br className="sm:hidden" />
          筋トレメニューを作成
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-gray-600 sm:text-base">
          目標・部位・レベル・時間・器具を選ぶだけ。Google Gemini があなたの条件にぴったり合った
          トレーニングメニューを数秒で提案します。
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/generate"
            className="w-full rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
          >
            メニューを作成する
          </Link>
          <a
            href="#how-to-use"
            className="w-full rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            使い方を見る
          </a>
        </div>
      </section>

      <section id="how-to-use" className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">使い方</h2>
        <p className="mt-2 text-sm text-gray-600">3ステップで完了します。</p>
        <ol className="mt-6 space-y-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          このアプリでできること・効果
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-indigo-700">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">こんな方におすすめ</h2>
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-indigo-600" aria-hidden="true">
              ✓
            </span>
            筋トレを始めたいけど何からやればいいか分からない方
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600" aria-hidden="true">
              ✓
            </span>
            ジムに行く時間がなく、自宅で効率よく鍛えたい方
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600" aria-hidden="true">
              ✓
            </span>
            毎回同じメニューに飽きて、新しい刺激が欲しい方
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600" aria-hidden="true">
              ✓
            </span>
            目的（筋肥大・ダイエット・体力向上）に合ったメニューを知りたい方
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">よくある質問</h2>
        <dl className="mt-6 space-y-4">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <dt className="text-sm font-semibold text-gray-900">Q. {item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-gray-600">A. {item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 rounded-lg border border-indigo-200 bg-indigo-50 p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900">さっそくメニューを作ってみましょう</h2>
        <p className="mt-2 text-sm text-gray-700">条件を選ぶだけ・所要時間1分以内</p>
        <Link
          href="/generate"
          className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          メニューを作成する
        </Link>
      </section>
    </main>
  );
}
