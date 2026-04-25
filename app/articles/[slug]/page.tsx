import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "../../components/article/mdx-components";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.frontmatter.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "記事が見つかりません | AI筋トレメニュー生成" };
  return {
    title: `${article.frontmatter.title} | AI筋トレメニュー生成`,
    description: article.frontmatter.description,
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || article.frontmatter.draft) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 text-xs">
        <Link href="/articles" className="text-indigo-600 hover:underline">
          ← 記事一覧へ戻る
        </Link>
      </nav>

      <article>
        <MDXRemote
          source={article.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>

      <section className="mt-16 rounded-lg border border-indigo-200 bg-indigo-50 p-6 text-center">
        <h2 className="text-lg font-bold text-gray-900">
          自分に合ったメニューをAIに作ってもらう
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          条件を選ぶだけで、目標・部位・レベルに最適化された筋トレメニューを生成します。
        </p>
        <Link
          href="/generate"
          className="mt-4 inline-block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          メニューを作成する
        </Link>
      </section>
    </main>
  );
}
