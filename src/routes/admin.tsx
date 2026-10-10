import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { doctors as seed, getDoctor } from "@/lib/data";
import { Badges, input } from "@/components/site";
import { useLocal, type Claim } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Admin Dashboard | GoPraxio" },
    { name: "description", content: "Manage directory listings and approve doctor claims." },
    { property: "og:title", content: "Admin | GoPraxio" },
    { property: "og:description", content: "GoPraxio directory administration." },
    { name: "robots", content: "noindex" },
  ] }),
  component: Admin,
});

function Admin() {
  const [claims, setClaims] = useLocal<Claim[]>("claims", []);
  const [hidden, setHidden] = useLocal<string[]>("admin:hidden", []);
  const [q, setQ] = useState("");
  const setStatus = (id: string, status: Claim["status"]) => setClaims(claims.map((c) => c.id === id ? { ...c, status } : c));
  const list = seed.filter((d) => (d.name + d.specialty + d.city).toLowerCase().includes(q.toLowerCase()));
  const card = "rounded-2xl border bg-card p-6";
  return (
    <div className="container-x space-y-8 py-10">
      <h1 className="text-2xl font-bold">Admin dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4">{[["Listings", seed.length], ["Claimed", seed.filter((d) => d.claimed).length], ["Pending claims", claims.filter((c) => c.status === "pending").length], ["Hidden", hidden.length]].map(([l, v]) => <div key={l} className={card}><div className="text-2xl font-bold">{v}</div><div className="text-sm text-muted-foreground">{l}</div></div>)}</div>
      <section className={card}><h2 className="mb-4 text-lg font-bold">Claim requests</h2>
        {claims.length === 0 ? <p className="text-sm text-muted-foreground">No claims yet. Submit one via <Link to="/claim" className="text-primary">the claim flow</Link>.</p> :
          <div className="divide-y">{claims.map((c) => <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"><div><b>{c.name}</b> · {c.email} · License {c.license}<div className="text-muted-foreground">{c.doctorSlug ? `Claiming ${getDoctor(c.doctorSlug)?.name}` : `New practice: ${c.practice}`} · {c.date}</div></div>
            <div className="flex items-center gap-2"><span className={`rounded-full px-2 py-0.5 text-xs ${c.status === "approved" ? "bg-success/10 text-success" : c.status === "rejected" ? "bg-destructive/10 text-destructive" : "bg-warning/20"}`}>{c.status}</span>
              <button onClick={() => setStatus(c.id, "approved")} className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground">Approve</button><button onClick={() => setStatus(c.id, "rejected")} className="rounded-md border px-3 py-1 text-xs">Reject</button></div></div>)}</div>}
      </section>
      <section className={card}><div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-lg font-bold">Listings</h2><input className={input + " max-w-xs"} placeholder="Search listings" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <table className="w-full text-sm"><thead><tr className="text-left text-muted-foreground"><th className="py-2">Doctor</th><th>Specialty</th><th>City</th><th>Status</th><th /></tr></thead>
          <tbody>{list.map((d) => <tr key={d.slug} className={`border-t ${hidden.includes(d.slug) ? "opacity-40" : ""}`}><td className="py-2"><Link to="/doctors/$slug" params={{ slug: d.slug }} className="font-medium hover:text-primary">{d.name}</Link></td><td>{d.specialty}</td><td>{d.city}</td><td><Badges d={d} /></td>
            <td className="text-right"><button className="rounded-md border px-3 py-1 text-xs" onClick={() => setHidden(hidden.includes(d.slug) ? hidden.filter((s) => s !== d.slug) : [...hidden, d.slug])}>{hidden.includes(d.slug) ? "Publish" : "Hide"}</button></td></tr>)}</tbody></table>
      </section>
    </div>
  );
}
