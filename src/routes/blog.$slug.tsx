import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles } from "@/lib/data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => { const a = articles.find((x) => x.slug === params.slug); if (!a) throw notFound(); return a; },
  head: ({ loaderData: a }) => a ? { meta: [
    { title: `${a.title} | GoPraxio Health` },
    { name: "description", content: a.excerpt },
    { property: "og:title", content: a.title },
    { property: "og:description", content: a.excerpt },
    { property: "og:type", content: "article" },
  ] } : { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] },
  component: Article,
});

function Article() {
  const a = Route.useLoaderData();
  return (
    <article className="container-x max-w-3xl py-14">
      <Link to="/blog" search={{ category: a.category }} className="text-sm font-semibold text-primary">{a.category}</Link>
      <h1 className="mt-2 text-4xl font-extrabold">{a.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{a.date} · {a.read} read</p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">{a.body.map((p, i) => <p key={i}>{p}</p>)}</div>
      <div className="mt-12 rounded-2xl bg-secondary p-6"><p className="font-semibold">Need personalized advice?</p><Link to="/search" className="mt-2 inline-block text-primary">Find a doctor near you →</Link></div>
    </article>
  );
}
