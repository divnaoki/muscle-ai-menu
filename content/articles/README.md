# 記事執筆ガイド

このディレクトリに `<slug>.mdx` を追加すると、自動的に `/articles/<slug>` で公開されます。`articles.ts` のような手動の登録は不要です（`lib/mdx.ts` が frontmatter を自動収集）。

## ファイル名

`<slug>.mdx` 形式。`<slug>` は URL に使われるため、英小文字 + ハイフンの kebab-case 推奨（例: `squat-types.mdx` → `/articles/squat-types`）。

## frontmatter スキーマ

```yaml
---
slug: squat-types                                       # 必須・ファイル名と一致
title: スクワットの種類と効果【完全ガイド】              # 必須・記事タイトル
description: スクワットの主要バリエーションと…           # 必須・一覧/SEO で使用
publishedAt: "2026-04-25"                               # 必須・YYYY-MM-DD（必ずクォート）
updatedAt: "2026-04-25"                                 # 必須・更新日（最初は publishedAt と同じでOK）
category: 種目別ガイド                                   # 必須・一覧でバッジ表示
tags: [スクワット, 自重, 初心者]                         # 必須・配列（現状は表示なし、将来用）
ogImage: /images/articles/squat-types/og.png            # 必須・OG画像パス（Phase 2で実画像生成）
draft: false                                            # true にすると一覧/詳細ともに非公開
---
```

> `publishedAt` / `updatedAt` は YAML が日付として解釈しないよう **必ずダブルクォートで囲む**こと。

## 本文

frontmatter の下に Markdown / MDX として本文を書きます。最初の `# H1` は記事タイトルとして表示されます（H1 を省略するとタイトルが画面に出ないので注意）。

GFM テーブル・コードフェンス・blockquote はすべて利用可能です。

## カスタムコンポーネント

MDX の中で React コンポーネントをそのまま埋め込めます。`mdx-components.tsx` で自動的に解決されるため import は不要です。

### 1. MdxImage — 画像

```mdx
<MdxImage
  src="/images/articles/squat-types/01-normal-form.webp"
  alt="標準的なスクワットのフォーム"
  caption="背筋を伸ばし、膝がつま先より前に出ないように"
  width={800}
  height={450}
/>
```

| prop | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `src` | ✅ | — | 画像パス（`/images/articles/<slug>/...`） |
| `alt` | ✅ | — | 代替テキスト（必ず指定） |
| `caption` |  | — | 図表キャプション（指定時 `<figcaption>` 表示） |
| `width` |  | `800` | 画像の論理幅（px） |
| `height` |  | `450` | 画像の論理高さ（px） |

画像配置のディレクトリ規約は [`/public/images/articles/README.md`](../../public/images/articles/README.md) を参照。

### 2. YouTubeEmbed — YouTube 動画埋め込み

```mdx
<YouTubeEmbed id="dQw4w9WgXcQ" title="プッシュアップの正しいフォーム解説" />
<YouTubeEmbed id="dQw4w9WgXcQ" title="解説動画" start={30} />
```

| prop | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `id` | ✅ | — | YouTube 動画 ID（11文字、URL の `v=` 以降） |
| `title` | ✅ | — | アクセシビリティ・タイトル |
| `start` |  | — | 開始秒数（任意） |

サムネイル → クリックで iframe が読み込まれる軽量 facade（`react-lite-youtube-embed`）。LCP に優しい。

### 3. AffiliateLink — アフィリエイトリンク

```mdx
<AffiliateLink platform="amazon" url="https://www.amazon.co.jp/dp/...">
  プッシュアップバー
</AffiliateLink>

<AffiliateLink platform="moshimo" url="https://..." variant="button">
  詳細をチェック
</AffiliateLink>

<AffiliateLink platform="rakuten" url="https://..." variant="card">
  楽天で価格を確認
</AffiliateLink>
```

| prop | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `platform` | ✅ | — | `"amazon"` / `"moshimo"` / `"a8"` / `"rakuten"` |
| `url` | ✅ | — | アフィリエイトリンク URL |
| `children` | ✅ | — | リンク文言 |
| `variant` |  | `"text"` | `"text"` / `"button"` / `"card"` |

`rel="sponsored nofollow noopener"` と `target="_blank"` は自動付与されます。

### 4. CTAButton — CTA ボタン

```mdx
<CTAButton href="/generate">AI でメニューを作成する</CTAButton>

<CTAButton href="https://example.com" external variant="secondary">
  外部リンク
</CTAButton>
```

| prop | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `href` | ✅ | — | 内部パス or 外部 URL |
| `children` | ✅ | — | ボタン文言 |
| `variant` |  | `"primary"` | `"primary"` / `"secondary"` |
| `external` |  | `false` | `true` で外部リンク扱い（新規タブ） |

内部リンクは自動的に `next/link` 経由でクライアント遷移します。

## ローカル確認

```bash
npm run dev
# http://localhost:3000/articles/<slug>
```

## 公開フロー

1. `<slug>.mdx` を追加（必要なら `public/images/articles/<slug>/` に画像配置）
2. `npm run lint && npm run build` でローカル検証
3. git push → Vercel が自動デプロイ
