import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/lib/data";
import { PageHero } from "@/components/site";

export const Route = createFileRoute("/blog/")({
  validateSearch: (s: Record<string, unknown>): { category?: string } => ({ category: (s.category as string) || undefined }),
  head: () => ({ meta: [
    { title: "Health Articles & Patient Resources | GoPraxio" },
    { name: "description", content: "Doctor-reviewed health articles on primary care, telehealth, heart health and pediatrics." },
    { property: "og:title", content: "Health Articles | GoPraxio" },
    { property: "og:description", content: "Doctor-reviewed health articles and patient resources." },
  ] }),
  component: Blog,
});

function Blog() {
  const { category } = Route.useSearch();
  const cats = [...new Set(articles.map((a) => a.category))];
  const list = articles.filter((a) => !category || a.category === category);
  const pill = (on: boolean) => `rounded-full border px-3 py-1 text-sm ${on ? "border-primary bg-primary text-primary-foreground" : ""}`;
  return (
    <>
      <PageHero title="Health articles" sub="Practical, doctor-reviewed guidance for patients and families." />
      <div className="container-x py-10">
        <div className="mb-6 flex flex-wrap gap-2"><Link to="/blog" search={{}} className={pill(!category)}>All</Link>{cats.map((c) => <Link key={c} to="/blog" search={{ category: c }} className={pill(category === c)}>{c}</Link>)}</div>
        <div className="grid gap-6 md:grid-cols-2">{list.map((a) => (
          <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="rounded-2xl border bg-card p-6 hover:shadow-elegant">
            <span className="text-xs font-semibold text-primary">{a.category}</span><h2 className="mt-2 text-xl font-bold">{a.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p><p className="mt-4 text-xs text-muted-foreground">{a.date} · {a.read} read</p>
          </Link>))}</div>
      </div>
    </>
  );
}
