export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  file: string;
  publishedAt: string;
  category: string;
};

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "beginner-first-month",
    title: "筋トレ初心者が最初の1ヶ月でやるべきこと【完全ガイド】",
    description:
      "筋トレを始めたばかりの初心者向けに、最初の1ヶ月で実施すべき5ステップを解説。目標設定・自重種目・食事・睡眠まで網羅。",
    file: "記事1.md",
    publishedAt: "2026-04-01",
    category: "初心者向け",
  },
  {
    slug: "bodyweight-training-effects",
    title: "自重トレーニングだけで筋肉はつく？初心者向けに効果と限界を解説",
    description:
      "ジムなし・器具なしでも筋肉はつくのか？自重トレーニングの効果・メリット・限界、次のステップまで解説します。",
    file: "記事2.md",
    publishedAt: "2026-04-08",
    category: "自宅トレーニング",
  },
  {
    slug: "training-frequency",
    title: "筋トレの頻度はどのくらいがベスト？初心者が週何回やるべきか徹底解説",
    description:
      "毎日？週1回？筋トレの最適な頻度を初心者向けに解説。休息日の意味、分割法、目的別の週スケジュール例まで紹介します。",
    file: "記事3.md",
    publishedAt: "2026-04-15",
    category: "初心者向け",
  },
  {
    slug: "common-mistakes",
    title: "筋トレ初心者がやりがちな5つのNG行動と正しいやり方",
    description:
      "頑張っているのに効果が出ない人必見。初心者が陥りがちな5つのNG行動と、その正しい改善方法をわかりやすく解説します。",
    file: "記事4.md",
    publishedAt: "2026-04-16",
    category: "初心者向け",
  },
  {
    slug: "pushup-form-guide",
    title: "プッシュアップ（腕立て伏せ）の正しいフォームと初心者向けバリエーション",
    description:
      "腕立て伏せの正しいフォームをステップごとに解説。よくある間違い、難易度別バリエーション、1回もできない人向けの練習法まで網羅。",
    file: "記事5.md",
    publishedAt: "2026-04-17",
    category: "種目別ガイド",
  },
];

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
