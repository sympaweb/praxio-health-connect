import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Clock, Award, GraduationCap, ShieldCheck, Video, Image as ImageIcon, Languages } from "lucide-react";
import { getDoctor, type Review } from "@/lib/data";
import { Avatar, Badges, Stars, input } from "@/components/site";
import { useLocal, type Inquiry } from "@/lib/store";

export const Route = createFileRoute("/doctors/$slug")({
  loader: ({ params }) => { const d = getDoctor(params.slug); if (!d) throw notFound(); return d; },
  head: ({ loaderData: d }) => d ? { meta: [
    { title: `${d.name}, ${d.title} — ${d.specialty} in ${d.city} | GoPraxio` },
    { name: "description", content: `${d.name} ${d.specialty} in ${d.city}. Rated ${d.rating}/5. Book an appointment online.` },
    { property: "og:title", content: `${d.name} — ${d.specialty}` },
    { property: "og:description", content: d.bio.slice(0, 150) },
  ] } : { meta: [{ title: "Doctor not found" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => <div className="container-x py-24 text-center"><h1 className="text-2xl font-bold">Doctor not found</h1><Link to="/search" className="mt-4 inline-block text-primary">Back to search</Link></div>,
  component: Profile,
});

function Profile() {
  const d = Route.useLoaderData();
  const [extra, setExtra] = useLocal<Review[]>("reviews:" + d.slug, []);
  const [inq, setInq] = useLocal<Inquiry[]>("inquiries", []);
  const [sent, setSent] = useState(false);
  const [rv, setRv] = useState({ author: "", rating: 5, text: "" });
  const reviews = [...extra, ...d.reviews];
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  const card = "rounded-2xl border bg-card p-6";
  return (
    <div className="bg-secondary/40">
      <div className="hero-dots border-b bg-background">
        <div className="container-x flex flex-col gap-6 py-10 md:flex-row md:items-center">
          <Avatar d={d} lg />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{d.name}, {d.title}</h1>
            <p className="text-lg text-primary">{d.specialty} · {d.yearsExperience} years experience</p>
            <div className="mt-2 flex items-center gap-2"><Stars value={avg} /> <b>{avg.toFixed(1)}</b><span className="text-muted-foreground">({reviews.length} reviews)</span></div>
            <div className="mt-3"><Badges d={d} /></div>
          </div>
          <a href="#book" className="rounded-xl bg-primary px-6 py-3 text-center font-semibold text-primary-foreground">Book appointment</a>
        </div>
      </div>
      <div className="container-x grid gap-6 py-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className={card}><h2 className="text-xl font-bold">About</h2><p className="mt-3 leading-relaxed text-muted-foreground">{d.bio}</p>
            <p className="mt-4 flex items-center gap-2 text-sm"><Languages className="h-4 w-4 text-primary" />{d.languages.join(", ")}</p></section>
          {(d.credentials.length > 0 || d.awards.length > 0) && <section className={card + " grid gap-6 md:grid-cols-2"}>
            <div><h2 className="flex items-center gap-2 font-bold"><GraduationCap className="h-5 w-5 text-primary" />Credentials</h2><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{d.credentials.map((c) => <li key={c}>• {c}</li>)}</ul></div>
            <div><h2 className="flex items-center gap-2 font-bold"><Award className="h-5 w-5 text-primary" />Awards</h2><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{d.awards.map((c) => <li key={c}>• {c}</li>)}</ul></div>
          </section>}
          {d.services.length > 0 && <section className={card}><h2 className="text-xl font-bold">Services ({d.services.length})</h2>
            <div className="mt-4 divide-y">{d.services.map((s) => <div key={s.name} className="flex justify-between gap-4 py-3"><div><div className="font-medium">{s.name}</div><div className="text-sm text-muted-foreground">{s.description}</div></div><div className="font-semibold text-primary">{s.price}</div></div>)}</div></section>}
          <section className={card}><h2 className="flex items-center gap-2 text-xl font-bold"><ShieldCheck className="h-5 w-5 text-primary" />Accepted insurance</h2>
            <div className="mt-4 flex flex-wrap gap-2">{d.insurance.map((i) => <span key={i} className="rounded-full border px-3 py-1 text-sm">{i}</span>)}</div></section>
          <section className={card}><h2 className="flex items-center gap-2 text-xl font-bold"><ImageIcon className="h-5 w-5 text-primary" />Clinic gallery</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">{["Reception", "Exam room", "Waiting area"].map((t, i) => <div key={t} className="grid aspect-[4/3] place-items-end rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/30 p-2 text-xs font-medium" style={{ opacity: 1 - i * 0.15 }}>{t}</div>)}</div></section>
          <section className={card}>
            <h2 className="text-xl font-bold">Patient reviews</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-[180px_1fr]">
              <div className="text-center"><div className="text-5xl font-extrabold">{avg.toFixed(1)}</div><Stars value={avg} /><div className="text-sm text-muted-foreground">{reviews.length} reviews</div></div>
              <div className="space-y-1.5">{[5, 4, 3, 2, 1].map((n) => { const c = reviews.filter((r) => r.rating === n).length; return <div key={n} className="flex items-center gap-2 text-sm"><span className="w-3">{n}</span><div className="h-2 flex-1 rounded-full bg-secondary"><div className="h-2 rounded-full bg-warning" style={{ width: `${(c / reviews.length) * 100}%` }} /></div><span className="w-6 text-muted-foreground">{c}</span></div>; })}</div>
            </div>
            <div className="mt-6 divide-y">{reviews.map((r) => <div key={r.id} className="py-4"><div className="flex items-center justify-between"><b>{r.author}</b><span className="text-xs text-muted-foreground">{r.date}</span></div><Stars value={r.rating} size={3.5} /><p className="mt-1 text-sm text-muted-foreground">{r.text}</p></div>)}</div>
            <form className="mt-4 space-y-3 rounded-xl bg-secondary/60 p-4" onSubmit={(e) => { e.preventDefault(); if (!rv.author || !rv.text) return; setExtra([{ id: crypto.randomUUID(), ...rv, date: new Date().toISOString().slice(0, 10) }, ...extra]); setRv({ author: "", rating: 5, text: "" }); }}>
              <h3 className="font-semibold">Write a review</h3>
              <div className="flex gap-3"><input className={input} placeholder="Your name" value={rv.author} onChange={(e) => setRv({ ...rv, author: e.target.value })} />
                <select className={input + " w-28"} value={rv.rating} onChange={(e) => setRv({ ...rv, rating: +e.target.value })}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}</select></div>
              <textarea className={input} rows={3} placeholder="Share your experience" value={rv.text} onChange={(e) => setRv({ ...rv, text: e.target.value })} />
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Submit review</button>
            </form>
          </section>
          <section className={card}><h2 className="text-xl font-bold">FAQ</h2>
            <div className="mt-3 divide-y">{d.faqs.map((f) => <details key={f.q} className="py-3"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-2 text-sm text-muted-foreground">{f.a}</p></details>)}</div></section>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-20 lg:h-fit">
          <section id="book" className={card + " scroll-mt-24"}>
            <h2 className="text-lg font-bold">Request an appointment</h2>
            {d.telehealth && <p className="mt-1 flex items-center gap-1 text-sm text-primary"><Video className="h-4 w-4" />Video visits available</p>}
            {sent ? <p className="mt-4 rounded-lg bg-success/10 p-4 text-sm text-success">Request sent! The office will contact you shortly.</p> :
              <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); const f = new FormData(e.currentTarget); setInq([{ id: crypto.randomUUID(), doctorSlug: d.slug, name: String(f.get("name")), phone: String(f.get("phone")), message: String(f.get("message")), type: String(f.get("type")), date: new Date().toISOString().slice(0, 10) }, ...inq]); setSent(true); }}>
                <input required name="name" className={input} placeholder="Full name" />
                <input required name="phone" className={input} placeholder="Phone number" />
                <select name="type" className={input}><option>In-person visit</option>{d.telehealth && <option>Telehealth visit</option>}</select>
                <textarea name="message" className={input} rows={3} placeholder="Reason for visit" />
                <label className="flex gap-2 text-xs text-muted-foreground"><input type="checkbox" required />I agree to receive SMS about my appointment (<Link to="/sms-consent" className="underline">details</Link>).</label>
                <button className="w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground">Send request</button>
              </form>}
          </section>
          <section className={card + " space-y-3 text-sm"}>
            <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" />{d.address}, {d.city}</p>
            <p className="flex gap-2"><Phone className="h-4 w-4 text-primary" />{d.phone}</p>
            <div className="flex gap-2"><Clock className="h-4 w-4 text-primary" /><div className="flex-1 space-y-1">{d.hours.map((h) => <div key={h.day} className="flex justify-between"><span>{h.day}</span><span className="text-muted-foreground">{h.time}</span></div>)}</div></div>
          </section>
          {!d.claimed && <Link to="/claim" search={{ doctor: d.slug }} className="block rounded-2xl border border-dashed p-4 text-center text-sm text-primary">Is this you? Claim this profile →</Link>}
        </aside>
      </div>
    </div>
  );
}
