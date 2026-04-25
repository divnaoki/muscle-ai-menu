# 記事画像の配置ルール

## ディレクトリ構造

```
public/images/articles/<slug>/<連番>-<内容>.<拡張子>
```

`<slug>` は `content/articles/<slug>.mdx` のファイル名と一致させること。

## 命名規則

- **連番**: `01`, `02`, `03`...（記事内での出現順）
- **内容**: 英語または日本語のローマ字（kebab-case 推奨）
- **拡張子**: `webp` 推奨。`next/image` が未対応の素材は `jpg` / `png`

## 例

```
public/images/articles/squat-types/01-normal-form.webp
public/images/articles/squat-types/02-wide-form.webp
public/images/articles/squat-types/og.png  ← OG画像
```

## OG画像

- **ファイル名**: `og.png`
- **サイズ**: 1200×630（OGP標準）
- frontmatter の `ogImage` に絶対パスで参照
  - 例: `ogImage: /images/articles/squat-types/og.png`

## MDX からの参照方法

```mdx
<MdxImage
  src="/images/articles/squat-types/01-normal-form.webp"
  alt="標準的なスクワットのフォーム"
  caption="背筋を伸ばし、膝がつま先より前に出ないよう注意"
  width={800}
  height={450}
/>
```

`width` / `height` は省略時 800×450（16:9）。実画像のアスペクト比に合わせて指定してください。
