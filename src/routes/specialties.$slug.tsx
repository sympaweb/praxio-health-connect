import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { doctors, specialtyBySlug, cities } from "@/lib/data";
import { DoctorCard, PageHero } from "@/components/site";

export const Route = createFileRoute("/specialties/$slug")({
  validateSearch: (s: Record<string, unknown>): { city?: string | undefined } => ({ city: (s["city"] as string) || undefined }),
  loader: ({ params }) => { const s = specialtyBySlug(params.slug); if (!s) throw notFound(); return { name: s.name, desc: s.desc, slug: s.slug }; },
  head: ({ loaderData: s }) => s ? { meta: [
    { title: `${s.name} Doctors — Book Online | GoPraxio` },
    { name: "description", content: `Find top-rated ${s.name} doctors in Amman, Jordan and beyond. ${s.desc}.` },
    { property: "og:title", content: `${s.name} Doctors | GoPraxio` },
    { property: "og:description", content: s.desc },
  ] } : { meta: [{ title: "Specialty not found" }, { name: "robots", content: "noindex" }] },
  component: Hub,
});

function Hub() {
  const s = Route.useLoaderData();
  const { city } = Route.useSearch();
  const list = doctors.filter((d) => d.specialty === s.name && (!city || d.city === city));
  return (
    <>
      <PageHero title={`${s.name}${city ? ` in ${city}` : ""}`} sub={s.desc} />
      <div className="container-x py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          <Link to="/specialties/$slug" params={{ slug: s.slug }} search={{}} className={`rounded-full border px-3 py-1 text-sm ${!city ? "border-primary bg-primary text-primary-foreground" : ""}`}>All locations</Link>
          {cities.map((c) => <Link key={c} to="/specialties/$slug" params={{ slug: s.slug }} search={{ city: c }} className={`rounded-full border px-3 py-1 text-sm ${city === c ? "border-primary bg-primary text-primary-foreground" : ""}`}>{c}</Link>)}
        </div>
        {list.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((d) => <DoctorCard key={d.slug} d={d} />)}</div>
          : <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">No {s.name} doctors listed here yet.</div>}
      </div>
    </>
  );
}
