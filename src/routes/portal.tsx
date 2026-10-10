import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, MessageSquare, Star, CalendarCheck, Trash2 } from "lucide-react";
import { getDoctor, type Service } from "@/lib/data";
import { input } from "@/components/site";
import { useLocal, type Inquiry } from "@/lib/store";

export const Route = createFileRoute("/portal")({
  head: () => ({ meta: [
    { title: "Doctor Portal — Manage Your Practice | GoPraxio" },
    { name: "description", content: "Manage your profile, services, office hours and patient inquiries." },
    { property: "og:title", content: "Doctor Portal | GoPraxio" },
    { property: "og:description", content: "Practice management dashboard for GoPraxio doctors." },
  ] }),
  component: Portal,
});

function Portal() {
  const d = getDoctor("james-mitchell")!;
  const [tab, setTab] = useState("Overview");
  const [inq] = useLocal<Inquiry[]>("inquiries", []);
  const [profile, setProfile] = useLocal("portal:profile", { bio: d.bio, phone: d.phone, address: d.address });
  const [services, setServices] = useLocal<Service[]>("portal:services", d.services);
  const [hours, setHours] = useLocal("portal:hours", d.hours);
  const [saved, setSaved] = useState(false);
  const [ns, setNs] = useState({ name: "", price: "", description: "" });
  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 1500); };
  const tabs = ["Overview", "Profile", "Services", "Hours", "Inquiries"];
  const card = "rounded-2xl border bg-card p-6";
  return (
    <div className="container-x py-10">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">Welcome back</p><h1 className="text-2xl font-bold">{d.name}</h1></div>
        <Link to="/doctors/$slug" params={{ slug: d.slug }} className="rounded-lg border px-4 py-2 text-sm">View public profile</Link></div>
      <div className="mt-6 flex gap-1 overflow-x-auto border-b">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium ${tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>{t}</button>)}</div>
      {saved && <p className="mt-4 text-sm text-success">Saved ✓</p>}
      <div className="mt-6">
        {tab === "Overview" && <div className="grid gap-4 md:grid-cols-4">{[[Eye, "Profile views (30d)", "1,284"], [CalendarCheck, "Booking requests", String(inq.length + 42)], [Star, "Average rating", String(d.rating)], [MessageSquare, "New reviews", "5"]].map(([I, l, v]) => { const Ic = I as typeof Eye; return <div key={l as string} className={card}><Ic className="h-5 w-5 text-primary" /><div className="mt-3 text-2xl font-bold">{v as string}</div><div className="text-sm text-muted-foreground">{l as string}</div></div>; })}</div>}
        {tab === "Profile" && <div className={card + " max-w-2xl space-y-3"}>
          <label className="block text-sm font-medium">Bio<textarea rows={6} className={input + " mt-1"} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></label>
          <label className="block text-sm font-medium">Phone<input className={input + " mt-1"} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></label>
          <label className="block text-sm font-medium">Address<input className={input + " mt-1"} value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} /></label>
          <button onClick={flash} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save changes</button></div>}
        {tab === "Services" && <div className={card}>
          <div className="divide-y">{services.map((s, i) => <div key={s.name + i} className="flex items-center justify-between gap-3 py-3"><div><b>{s.name}</b> <span className="text-primary">{s.price}</span><p className="text-sm text-muted-foreground">{s.description}</p></div><button aria-label="Remove service" onClick={() => setServices(services.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4 text-destructive" /></button></div>)}</div>
          <form className="mt-4 grid gap-2 md:grid-cols-[1fr_120px_2fr_auto]" onSubmit={(e) => { e.preventDefault(); if (!ns.name) return; setServices([...services, ns]); setNs({ name: "", price: "", description: "" }); }}>
            <input className={input} placeholder="Service" value={ns.name} onChange={(e) => setNs({ ...ns, name: e.target.value })} /><input className={input} placeholder="Price" value={ns.price} onChange={(e) => setNs({ ...ns, price: e.target.value })} /><input className={input} placeholder="Description" value={ns.description} onChange={(e) => setNs({ ...ns, description: e.target.value })} /><button className="rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">Add</button>
          </form></div>}
        {tab === "Hours" && <div className={card + " max-w-lg space-y-3"}>{hours.map((h, i) => <div key={h.day} className="flex items-center gap-3"><span className="w-28 text-sm font-medium">{h.day}</span><input className={input} value={h.time} onChange={(e) => setHours(hours.map((x, j) => j === i ? { ...x, time: e.target.value } : x))} /></div>)}<button onClick={flash} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save hours</button></div>}
        {tab === "Inquiries" && <div className={card}>{inq.length === 0 ? <p className="text-muted-foreground">No inquiries yet. Requests sent from doctor profiles appear here.</p> :
          <table className="w-full text-sm"><thead><tr className="text-left text-muted-foreground"><th className="py-2">Date</th><th>Patient</th><th>Phone</th><th>Type</th><th>Doctor</th><th>Message</th></tr></thead><tbody>{inq.map((x) => <tr key={x.id} className="border-t"><td className="py-2">{x.date}</td><td>{x.name}</td><td>{x.phone}</td><td>{x.type}</td><td>{getDoctor(x.doctorSlug)?.name}</td><td className="text-muted-foreground">{x.message}</td></tr>)}</tbody></table>}</div>}
      </div>
    </div>
  );
}
