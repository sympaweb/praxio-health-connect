import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import * as Icons from "lucide-react";
import { Search, MapPin, Star, CalendarCheck } from "lucide-react";
import { doctors, specialties } from "@/lib/data";
import { DoctorCard } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GoPraxio — Find & Book Trusted Doctors Near You" },
      { name: "description", content: "Search doctors by specialty, condition or location. Read verified reviews and book appointments instantly with GoPraxio." },
      { property: "og:title", content: "GoPraxio — Find & Book Trusted Doctors" },
      { property: "og:description", content: "Search doctors, read verified reviews and book care instantly." },
    ],
  }),
  component: Home,
});

function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const recent = [...doctors].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, 4);
  return (
    <>
      <section className="hero-dots relative bg-secondary/70 pt-20 pb-36">
        <div className="container-x text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Trusted by 50,000+ patients</span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">Find the right doctor, <span className="text-primary">book in minutes.</span></h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Search by specialty, doctor name, condition or location — with verified reviews you can trust.</p>
          <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/search", search: { q, city } }); }}
            className="mx-auto mt-8 flex max-w-3xl flex-col gap-2 rounded-2xl border bg-card p-2 shadow-elegant md:flex-row">
            <label className="flex flex-1 items-center gap-2 px-3"><Search className="h-5 w-5 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Specialty, doctor, or condition" className="w-full bg-transparent py-3 outline-none" /></label>
            <label className="flex flex-1 items-center gap-2 border-t px-3 md:border-t-0 md:border-l"><MapPin className="h-5 w-5 text-muted-foreground" /><input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City or location" className="w-full bg-transparent py-3 outline-none" /></label>
            <button className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90">Search</button>
          </form>
        </div>
        <svg className="absolute bottom-0 left-0 w-full text-primary" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: 100 }}><path fill="currentColor" d="M0,64 C360,140 1080,-10 1440,70 L1440,120 L0,120 Z" /></svg>
      </section>
      <section className="bg-primary pb-12 text-primary-foreground">
        <div className="container-x grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[["2,400+", "Verified doctors"], ["38", "Specialties"], ["120k", "Patient reviews"], ["4.8★", "Average rating"]].map(([n, l]) => (
            <div key={l}><div className="text-3xl font-extrabold md:text-4xl">{n}</div><div className="text-sm opacity-80">{l}</div></div>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[[Search, "Search Doctors & Clinics", "Filter by specialty, location, insurance and language."], [Star, "Read Verified Reviews", "Real feedback from patients who booked through GoPraxio."], [CalendarCheck, "Book / Contact Instantly", "Request an appointment or telehealth visit in a few taps."]].map(([I, t, d], i) => {
            const Ic = I as typeof Search;
            return (
              <div key={t as string} className="relative rounded-2xl border bg-card p-7 shadow-soft">
                <span className="absolute right-5 top-5 text-5xl font-extrabold text-primary/10">{i + 1}</span>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><Ic className="h-6 w-6" /></div>
                <h3 className="mt-4 text-lg font-semibold">{t as string}</h3><p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="container-x">
          <div className="flex items-end justify-between"><h2 className="text-3xl font-bold">Browse by specialty</h2><Link to="/specialties" className="text-sm font-semibold text-primary">All specialties →</Link></div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {specialties.map((s) => {
              const I = (Icons as unknown as Record<string, typeof Search>)[s.icon] ?? Search;
              return (
                <Link key={s.slug} to="/specialties/$slug" params={{ slug: s.slug }} className="group rounded-2xl border bg-card p-5 transition hover:border-primary hover:shadow-elegant">
                  <I className="h-7 w-7 text-primary" /><div className="mt-3 font-semibold group-hover:text-primary">{s.name}</div><div className="text-xs text-muted-foreground">{s.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <h2 className="text-3xl font-bold">Featured doctors</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{doctors.filter((d) => d.featured).map((d) => <DoctorCard key={d.slug} d={d} />)}</div>
        <h2 className="mt-16 text-3xl font-bold">Recently added</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{recent.map((d) => <DoctorCard key={d.slug} d={d} />)}</div>
      </section>

      <section className="container-x pb-20">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-primary to-primary-glow p-10 text-primary-foreground md:flex-row">
          <div><h3 className="text-2xl font-bold">Are you a doctor?</h3><p className="opacity-90">Claim your free profile and start receiving patient bookings.</p></div>
          <Link to="/claim" className="rounded-xl bg-background px-6 py-3 font-semibold text-primary">Claim your profile</Link>
        </div>
      </section>
    </>
  );
}
