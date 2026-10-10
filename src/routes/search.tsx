import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { doctors, specialties, cities, insurers, languageList } from "@/lib/data";
import { DoctorCard, PageHero, input } from "@/components/site";

type S = { q?: string; city?: string; specialty?: string; insurance?: string; telehealth?: boolean; rating?: number; lang?: string };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): S => ({
    q: (s.q as string) || undefined, city: (s.city as string) || undefined, specialty: (s.specialty as string) || undefined,
    insurance: (s.insurance as string) || undefined, telehealth: s.telehealth === true || s.telehealth === "true" || undefined,
    rating: s.rating ? Number(s.rating) : undefined, lang: (s.lang as string) || undefined,
  }),
  head: () => ({ meta: [
    { title: "Find a Doctor — Search & Filter | GoPraxio" },
    { name: "description", content: "Filter doctors by specialty, city, insurance, telehealth, rating and language." },
    { property: "og:title", content: "Find a Doctor | GoPraxio" },
    { property: "og:description", content: "Search and filter verified doctors near you." },
  ] }),
  component: SearchPage,
});

function SearchPage() {
  const s = Route.useSearch();
  const nav = useNavigate({ from: "/search" });
  const set = (p: Partial<S>) => nav({ search: (old: S) => ({ ...old, ...p }) });
  const q = (s.q ?? "").toLowerCase();
  const list = doctors.filter((d) =>
    (!q || [d.name, d.specialty, d.bio, ...d.services.map((x) => x.name)].join(" ").toLowerCase().includes(q)) &&
    (!s.city || `${d.city} ${d.country}`.toLowerCase().includes(s.city.toLowerCase())) &&
    (!s.specialty || d.specialty === s.specialty) && (!s.insurance || d.insurance.includes(s.insurance)) &&
    (!s.telehealth || d.telehealth) && (!s.rating || d.rating >= s.rating) && (!s.lang || d.languages.includes(s.lang)));
  const sel = (label: string, key: keyof S, opts: string[]) => (
    <label className="block text-sm font-medium">{label}
      <select className={input + " mt-1"} value={(s[key] as string) ?? ""} onChange={(e) => set({ [key]: e.target.value || undefined })}>
        <option value="">Any</option>{opts.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
  return (
    <>
      <PageHero title="Find a doctor" sub="Search by name, specialty, condition or location." />
      <div className="container-x grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit space-y-4 rounded-2xl border bg-card p-5 lg:sticky lg:top-20">
          <label className="block text-sm font-medium">Keyword<input className={input + " mt-1"} defaultValue={s.q} onBlur={(e) => set({ q: e.target.value || undefined })} placeholder="e.g. vaccines" /></label>
          {sel("Specialty", "specialty", specialties.map((x) => x.name))}
          {sel("City / Location", "city", cities)}
          {sel("Insurance", "insurance", insurers)}
          {sel("Language", "lang", languageList)}
          {sel("Minimum rating", "rating", ["4", "4.5", "4.8"])}
          <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={!!s.telehealth} onChange={(e) => set({ telehealth: e.target.checked || undefined })} /> Telehealth available</label>
          <button onClick={() => nav({ search: {} })} className="w-full rounded-lg border py-2 text-sm hover:bg-accent">Clear filters</button>
        </aside>
        <div>
          <p className="mb-4 text-sm text-muted-foreground">{list.length} doctor{list.length !== 1 && "s"} found</p>
          {list.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.map((d) => <DoctorCard key={d.slug} d={d} />)}</div>
            : <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">No doctors match these filters.</div>}
        </div>
      </div>
    </>
  );
}
