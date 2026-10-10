import { createFileRoute, Link } from "@tanstack/react-router";
import { doctors, specialties } from "@/lib/data";
import { PageHero } from "@/components/site";

export const Route = createFileRoute("/specialties/")({
  head: () => ({ meta: [
    { title: "Medical Specialties Directory | GoPraxio" },
    { name: "description", content: "Browse doctors by medical specialty: family medicine, pediatrics, cardiology, dermatology, dentistry and more." },
    { property: "og:title", content: "Specialties Directory | GoPraxio" },
    { property: "og:description", content: "Browse doctors by medical specialty." },
  ] }),
  component: () => (
    <>
      <PageHero title="Specialties" sub="Find the right kind of care for your needs." />
      <div className="container-x grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {specialties.map((s) => (
          <Link key={s.slug} to="/specialties/$slug" params={{ slug: s.slug }} className="rounded-2xl border bg-card p-6 hover:border-primary hover:shadow-elegant">
            <h2 className="font-semibold">{s.name}</h2><p className="text-sm text-muted-foreground">{s.desc}</p>
            <p className="mt-3 text-xs font-medium text-primary">{doctors.filter((d) => d.specialty === s.name).length} doctors</p>
          </Link>
        ))}
      </div>
    </>
  ),
});
