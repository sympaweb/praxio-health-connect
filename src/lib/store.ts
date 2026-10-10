import { useEffect, useState } from "react";

// Lightweight browser-persisted store for demo submissions (claims, inquiries, reviews).
export function useLocal<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(initial);
  useEffect(() => {
    const raw = localStorage.getItem("praxio:" + key);
    if (raw) setVal(JSON.parse(raw));
  }, [key]);
  const set = (v: T) => { setVal(v); localStorage.setItem("praxio:" + key, JSON.stringify(v)); };
  return [val, set] as const;
}

export type Claim = { id: string; name: string; email: string; license: string; practice: string; doctorSlug?: string; status: "pending" | "approved" | "rejected"; date: string };
export type Inquiry = { id: string; doctorSlug: string; name: string; phone: string; message: string; date: string; type: string };
