import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Star, Video, Activity, ShieldCheck } from "lucide-react";
import type { Doctor } from "@/lib/data";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Activity className="h-5 w-5" /></span>
      Go<span className="text-primary">Praxio</span>
    </Link>
  );
}

export function Header() {
  const l = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/search" className={l} activeProps={{ className: "text-foreground" }}>Find a Doctor</Link>
          <Link to="/specialties" className={l}>Specialties</Link>
          <Link to="/blog" className={l}>Health Articles</Link>
          <Link to="/portal" className={l}>Doctor Portal</Link>
        </nav>
        <Link to="/claim" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">For Doctors</Link>
      </div>
    </header>
  );
}

export function Footer() {
  const col = (t: string, items: [string, string][]) => (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-background">{t}</h4>
      <ul className="space-y-2 text-sm">{items.map(([label, to]) => <li key={label}><Link to={to} className="text-background/60 hover:text-background">{label}</Link></li>)}</ul>
    </div>
  );
  return (
    <footer className="bg-foreground text-background">
      <div className="container-x grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-xl font-bold"><ShieldCheck className="h-6 w-6 text-primary" /> GoPraxio</div>
          <p className="mt-3 max-w-xs text-sm text-background/60">Find trusted doctors, read verified reviews, and book care in minutes.</p>
        </div>
        {col("For Patients", [["Find a Doctor", "/search"], ["Specialties", "/specialties"], ["Health Articles", "/blog"]])}
        {col("For Doctors", [["Claim Your Profile", "/claim"], ["Doctor Portal", "/portal"], ["Admin", "/admin"]])}
        {col("Company", [["Terms of Service", "/terms"], ["Privacy Policy", "/privacy"], ["SMS Consent", "/sms-consent"]])}
      </div>
      <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">© 2026 GoPraxio. Not for medical emergencies — call your local emergency number.</div>
    </footer>
  );
}

export function Stars({ value, size = 4 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} style={{ width: size * 4, height: size * 4 }} className={i <= Math.round(value) ? "fill-warning text-warning" : "text-border"} />)}
    </span>
  );
}

export function Badges({ d }: { d: Doctor }) {
  const b = "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium";
  return (
    <div className="flex flex-wrap gap-1.5">
      {d.verified && <span className={`${b} bg-success/10 text-success`}><BadgeCheck className="h-3 w-3" />Verified</span>}
      {d.telehealth && <span className={`${b} bg-primary/10 text-primary`}><Video className="h-3 w-3" />Telehealth</span>}
      {d.claimed && <span className={`${b} bg-secondary text-secondary-foreground`}>Claimed</span>}
    </div>
  );
}

export function Avatar({ d, lg }: { d: Doctor; lg?: boolean }) {
  return <div className={`grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow font-bold text-primary-foreground ${lg ? "h-28 w-28 text-3xl" : "h-16 w-16 text-lg"}`}>{d.initials}</div>;
}

export function DoctorCard({ d }: { d: Doctor }) {
  return (
    <div className="flex flex-col rounded-2xl border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elegant">
      <div className="flex gap-4">
        <Avatar d={d} />
        <div className="min-w-0">
          <Link to="/doctors/$slug" params={{ slug: d.slug }} className="font-semibold text-foreground hover:text-primary">{d.name}, {d.title}</Link>
          <p className="text-sm text-primary">{d.specialty}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{d.city}, {d.country}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm"><Stars value={d.rating} /> <b>{d.rating}</b> <span className="text-muted-foreground">({d.reviewCount})</span></div>
      <div className="mt-3"><Badges d={d} /></div>
      <div className="mt-auto flex gap-2 pt-4">
        <Link to="/doctors/$slug" params={{ slug: d.slug }} hash="book" className="flex-1 rounded-lg bg-primary py-2 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90">Book</Link>
        <Link to="/doctors/$slug" params={{ slug: d.slug }} className="flex-1 rounded-lg border py-2 text-center text-sm font-medium hover:bg-accent">Profile</Link>
      </div>
    </div>
  );
}

export function PageHero({ title, sub }: { title: string; sub?: string }) {
  return (
    <section className="hero-dots bg-secondary/60 py-14">
      <div className="container-x"><h1 className="text-3xl font-bold md:text-4xl">{title}</h1>{sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}</div>
    </section>
  );
}

export const input = "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
