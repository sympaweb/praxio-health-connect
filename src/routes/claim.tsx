import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { doctors, specialties, cities } from "@/lib/data";
import { PageHero, input } from "@/components/site";
import { useLocal, type Claim } from "@/lib/store";

export const Route = createFileRoute("/claim")({
  validateSearch: (s: Record<string, unknown>): { doctor?: string } => ({ doctor: (s.doctor as string) || undefined }),
  head: () => ({ meta: [
    { title: "Claim or Register Your Practice | GoPraxio for Doctors" },
    { name: "description", content: "Claim your existing GoPraxio listing or register a new practice to receive patient bookings." },
    { property: "og:title", content: "Claim Your Profile | GoPraxio" },
    { property: "og:description", content: "Doctors: claim your free profile and grow your practice." },
  ] }),
  component: ClaimPage,
});

function ClaimPage() {
  const { doctor } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"claim" | "new">(doctor ? "claim" : "claim");
  const [form, setForm] = useState({ doctorSlug: doctor ?? "", name: "", email: "", license: "", practice: "", specialty: "", city: "" });
  const [claims, setClaims] = useLocal<Claim[]>("claims", []);
  const steps = ["Find listing", "Verify identity", "Practice details", "Done"];
  const up = (k: string) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });
  const submit = () => { setClaims([{ id: crypto.randomUUID(), name: form.name, email: form.email, license: form.license, practice: form.practice, doctorSlug: mode === "claim" ? form.doctorSlug : undefined, status: "pending", date: new Date().toISOString().slice(0, 10) }, ...claims]); setStep(3); };
  const btn = "rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground disabled:opacity-50";
  return (
    <>
      <PageHero title="Claim or register your practice" sub="Free for doctors. Manage your profile, services, hours and patient inquiries." />
      <div className="container-x max-w-2xl py-10">
        <ol className="mb-8 flex justify-between">{steps.map((s, i) => <li key={s} className="flex flex-1 flex-col items-center text-xs"><span className={`grid h-8 w-8 place-items-center rounded-full font-bold ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{i < step ? <Check className="h-4 w-4" /> : i + 1}</span><span className="mt-1">{s}</span></li>)}</ol>
        <div className="space-y-4 rounded-2xl border bg-card p-6">
          {step === 0 && <>
            <div className="grid grid-cols-2 gap-2">{(["claim", "new"] as const).map((m) => <button key={m} onClick={() => setMode(m)} className={`rounded-lg border p-3 text-sm font-medium ${mode === m ? "border-primary bg-primary/5 text-primary" : ""}`}>{m === "claim" ? "Claim existing listing" : "Register new practice"}</button>)}</div>
            {mode === "claim" ? <select className={input} value={form.doctorSlug} onChange={up("doctorSlug")}><option value="">Select your listing…</option>{doctors.filter((d) => !d.claimed).map((d) => <option key={d.slug} value={d.slug}>{d.name} — {d.specialty}, {d.city}</option>)}</select>
              : <div className="grid gap-3 md:grid-cols-2"><select className={input} value={form.specialty} onChange={up("specialty")}><option value="">Specialty</option>{specialties.map((s) => <option key={s.slug}>{s.name}</option>)}</select><select className={input} value={form.city} onChange={up("city")}><option value="">City</option>{cities.map((c) => <option key={c}>{c}</option>)}</select></div>}
            <button className={btn} disabled={mode === "claim" ? !form.doctorSlug : !form.specialty} onClick={() => setStep(1)}>Continue</button>
          </>}
          {step === 1 && <>
            <input className={input} placeholder="Full legal name" value={form.name} onChange={up("name")} />
            <input className={input} type="email" placeholder="Professional email" value={form.email} onChange={up("email")} />
            <input className={input} placeholder="Medical license number" value={form.license} onChange={up("license")} />
            <p className="text-xs text-muted-foreground">We verify licenses with the relevant medical board before approving a claim.</p>
            <div className="flex gap-2"><button className="rounded-lg border px-5 py-2" onClick={() => setStep(0)}>Back</button><button className={btn} disabled={!form.name || !form.email || !form.license} onClick={() => setStep(2)}>Continue</button></div>
          </>}
          {step === 2 && <>
            <input className={input} placeholder="Practice / clinic name" value={form.practice} onChange={up("practice")} />
            <input className={input} placeholder="Practice address" />
            <input className={input} placeholder="Practice phone" />
            <div className="flex gap-2"><button className="rounded-lg border px-5 py-2" onClick={() => setStep(1)}>Back</button><button className={btn} disabled={!form.practice} onClick={submit}>Submit for verification</button></div>
          </>}
          {step === 3 && <div className="py-6 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success"><Check /></div><h2 className="mt-3 text-xl font-bold">Submitted for review</h2><p className="mt-1 text-sm text-muted-foreground">Our team typically verifies within 1–2 business days.</p><Link to="/portal" className={btn + " mt-5 inline-block"}>Go to Doctor Portal</Link></div>}
        </div>
      </div>
    </>
  );
}
