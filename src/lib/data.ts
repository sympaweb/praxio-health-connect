export type Review = { id: string; author: string; rating: number; date: string; text: string };
export type Service = { name: string; price: string; description: string };
export type Doctor = {
  slug: string; name: string; title: string; specialty: string; city: string; country: string;
  address: string; phone: string; rating: number; reviewCount: number; telehealth: boolean;
  claimed: boolean; verified: boolean; languages: string[]; insurance: string[]; bio: string;
  credentials: string[]; awards: string[]; hours: { day: string; time: string }[];
  services: Service[]; reviews: Review[]; faqs: { q: string; a: string }[]; initials: string;
  yearsExperience: number; addedAt: string; featured?: boolean;
};

export const specialties = [
  { slug: "family-medicine", name: "Family Medicine", icon: "Stethoscope", desc: "Primary care for all ages" },
  { slug: "pediatrics", name: "Pediatrics", icon: "Baby", desc: "Care for infants, children & teens" },
  { slug: "cardiology", name: "Cardiology", icon: "HeartPulse", desc: "Heart & vascular health" },
  { slug: "dermatology", name: "Dermatology", icon: "Sparkles", desc: "Skin, hair & nail conditions" },
  { slug: "dentistry", name: "Dentistry", icon: "Smile", desc: "Oral health & cosmetic dentistry" },
  { slug: "orthopedics", name: "Orthopedics", icon: "Bone", desc: "Bones, joints & sports injuries" },
  { slug: "gynecology", name: "Gynecology", icon: "Flower2", desc: "Women's reproductive health" },
  { slug: "psychiatry", name: "Psychiatry", icon: "Brain", desc: "Mental health & wellbeing" },
] as const;

export const cities = ["Amman", "Irbid", "Zarqa", "Aqaba", "Dubai", "Austin"];
export const insurers = ["MedNet", "GlobeMed", "NatHealth", "Aetna", "Blue Cross", "Cigna", "UnitedHealthcare", "Medicare"];
export const languageList = ["English", "Arabic", "French", "Spanish", "German"];

const hours = [
  { day: "Mon – Thu", time: "8:00 AM – 6:00 PM" }, { day: "Friday", time: "8:00 AM – 2:00 PM" },
  { day: "Saturday", time: "9:00 AM – 1:00 PM" }, { day: "Sunday", time: "Closed" },
];
const genericFaqs = [
  { q: "Do you accept new patients?", a: "Yes, new patients are welcome. Book online or call the office." },
  { q: "Is telehealth available?", a: "Many follow-ups and consultations can be done by secure video visit." },
  { q: "What should I bring to my first visit?", a: "Photo ID, insurance card, medication list and any prior records." },
];
const r = (id: string, author: string, rating: number, date: string, text: string): Review => ({ id, author, rating, date, text });

function mk(d: Partial<Doctor> & Pick<Doctor, "slug" | "name" | "title" | "specialty" | "city">): Doctor {
  const initials = d.name.replace(/^Dr\.\s*/, "").split(" ").map((p) => p[0]).slice(0, 2).join("");
  const reviews = d.reviews ?? [
    r(d.slug + "1", "Sarah K.", 5, "2026-08-14", "Attentive, thorough and kind. Explained everything clearly."),
    r(d.slug + "2", "Omar H.", 4, "2026-07-02", "Short wait time and a very professional team."),
  ];
  return {
    country: "Jordan", address: "Medical Plaza, Building 12", phone: "+962 6 555 0100", rating: 4.7,
    reviewCount: reviews.length, telehealth: false, claimed: false, verified: false, languages: ["English", "Arabic"],
    insurance: ["MedNet", "GlobeMed"], bio: "", credentials: [], awards: [], hours, services: [],
    faqs: genericFaqs, yearsExperience: 10, addedAt: "2026-06-01", ...d, reviews, initials,
  };
}

export const doctors: Doctor[] = [
  mk({
    slug: "james-mitchell", name: "Dr. James Mitchell", title: "MD", specialty: "Family Medicine", city: "Austin",
    country: "USA", address: "2100 Lakeview Blvd, Suite 300, Austin, TX", phone: "+1 (512) 555-0148", rating: 4.9,
    telehealth: true, claimed: true, verified: true, featured: true, yearsExperience: 18, languages: ["English", "Spanish"],
    insurance: ["Aetna", "Blue Cross", "Cigna", "UnitedHealthcare", "Medicare"], addedAt: "2026-09-28",
    bio: "Dr. James Mitchell is a board-certified family physician with 18 years of experience caring for patients of every age. He believes in long-term relationships, prevention-first care and clear communication. His practice combines evidence-based medicine with modern tools like same-day telehealth and digital health records. Outside the clinic he volunteers at community health fairs and coaches youth soccer.",
    credentials: ["MD, Baylor College of Medicine", "Residency, UT Southwestern Family Medicine", "Board Certified, American Board of Family Medicine", "Fellow, American Academy of Family Physicians"],
    awards: ["Austin Top Doctors 2024 & 2025", "Patients' Choice Award 2023", "Compassionate Doctor Recognition 2022"],
    services: [
      ["Annual Physical Exam", "$150", "Comprehensive head-to-toe preventive check-up."],
      ["Sick Visit", "$95", "Same-day care for acute illness."],
      ["Telehealth Consultation", "$75", "Secure video visit from home."],
      ["Chronic Disease Management", "$120", "Diabetes, hypertension and cholesterol care."],
      ["Well-Child Visit", "$110", "Growth and development checks."],
      ["Vaccinations", "$40", "Flu, Tdap, shingles and more."],
      ["Lab Work & Blood Tests", "$60", "In-office draws with fast results."],
      ["Women's Health Exam", "$140", "Pap smear and preventive screening."],
      ["Sports & School Physicals", "$65", "Clearance forms completed same day."],
      ["Minor Procedures", "$180", "Skin tag removal, wound care, stitches."],
      ["Weight Management", "$130", "Personalized nutrition and fitness plans."],
      ["Mental Health Screening", "$90", "Anxiety and depression assessment."],
      ["EKG", "$85", "In-office heart rhythm testing."],
      ["Travel Medicine", "$100", "Pre-travel vaccines and advice."],
    ].map(([name, price, description]) => ({ name, price, description })),
    reviews: [
      r("jm1", "Emily R.", 5, "2026-09-20", "Dr. Mitchell is the best doctor I've ever had. He listens and never rushes."),
      r("jm2", "Carlos M.", 5, "2026-09-02", "Telehealth visit was easy and he followed up personally the next day."),
      r("jm3", "Linda T.", 5, "2026-08-11", "Has cared for my whole family for 10 years. Highly recommend."),
      r("jm4", "Mark D.", 4, "2026-07-19", "Great care. Wait was a bit long but worth it."),
      r("jm5", "Priya S.", 5, "2026-06-30", "Helped me finally get my blood pressure under control."),
    ],
  }),
  mk({ slug: "lina-haddad", name: "Dr. Lina Haddad", title: "MD", specialty: "Pediatrics", city: "Amman", rating: 4.8, telehealth: true, claimed: true, verified: true, featured: true, bio: "Gentle, family-centred pediatric care from newborn to adolescence.", services: [{ name: "Newborn Check", price: "35 JOD", description: "First-week assessment." }, { name: "Vaccination", price: "20 JOD", description: "National schedule." }], addedAt: "2026-09-25", languages: ["Arabic", "English", "French"] }),
  mk({ slug: "omar-khalil", name: "Dr. Omar Khalil", title: "MD, FACC", specialty: "Cardiology", city: "Amman", rating: 4.9, verified: true, claimed: true, featured: true, yearsExperience: 22, bio: "Interventional cardiologist focused on prevention and heart rhythm disorders.", services: [{ name: "Cardiac Consultation", price: "50 JOD", description: "Full evaluation." }, { name: "Echocardiogram", price: "60 JOD", description: "Heart ultrasound." }], addedAt: "2026-05-10" }),
  mk({ slug: "rania-saleh", name: "Dr. Rania Saleh", title: "MD", specialty: "Dermatology", city: "Irbid", rating: 4.6, telehealth: true, featured: true, bio: "Medical and cosmetic dermatology including acne, eczema and laser treatments.", services: [{ name: "Skin Consultation", price: "30 JOD", description: "Diagnosis & plan." }], addedAt: "2026-09-30" }),
  mk({ slug: "yousef-nasser", name: "Dr. Yousef Nasser", title: "DDS", specialty: "Dentistry", city: "Amman", rating: 4.7, claimed: true, verified: true, bio: "Modern family and cosmetic dentistry with a pain-free approach.", services: [{ name: "Cleaning", price: "25 JOD", description: "Scaling & polish." }, { name: "Whitening", price: "120 JOD", description: "In-office whitening." }], addedAt: "2026-09-18", insurance: ["MedNet", "NatHealth"] }),
  mk({ slug: "sara-abbas", name: "Dr. Sara Abbas", title: "MD", specialty: "Family Medicine", city: "Amman", rating: 4.5, telehealth: true, bio: "Holistic primary care with a focus on women's and preventive health.", addedAt: "2026-09-29" }),
  mk({ slug: "michael-chen", name: "Dr. Michael Chen", title: "MD", specialty: "Orthopedics", city: "Dubai", country: "UAE", rating: 4.8, verified: true, claimed: true, bio: "Sports medicine and joint replacement surgeon.", insurance: ["Cigna", "GlobeMed"], addedAt: "2026-04-03", languages: ["English", "German"] }),
  mk({ slug: "hala-mansour", name: "Dr. Hala Mansour", title: "MD", specialty: "Gynecology", city: "Zarqa", rating: 4.7, telehealth: true, bio: "Comprehensive gynecology and prenatal care.", addedAt: "2026-08-20" }),
  mk({ slug: "karim-aziz", name: "Dr. Karim Aziz", title: "MD", specialty: "Psychiatry", city: "Aqaba", rating: 4.6, telehealth: true, verified: true, claimed: true, bio: "Adult psychiatry: anxiety, depression and ADHD, in-person or online.", addedAt: "2026-07-15" }),
];

export const getDoctor = (slug: string) => doctors.find((d) => d.slug === slug);
export const specialtyBySlug = (slug: string) => specialties.find((s) => s.slug === slug);
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const articles = [
  { slug: "choosing-a-family-doctor", title: "How to Choose the Right Family Doctor", category: "Primary Care", date: "2026-09-12", read: "6 min", excerpt: "Credentials, communication style and insurance: what to look for.", body: ["A good family doctor is your first line of defence for nearly every health concern.", "Start by checking board certification and years of experience. Then read verified patient reviews to understand bedside manner.", "Confirm the practice accepts your insurance and offers convenient hours or telehealth.", "Finally, book an introductory visit. Trust your instinct about whether you feel heard."] },
  { slug: "telehealth-guide", title: "Telehealth: When a Video Visit Makes Sense", category: "Digital Health", date: "2026-08-30", read: "4 min", excerpt: "Video visits are perfect for follow-ups, prescriptions and minor issues.", body: ["Telehealth lets you see a clinician from home.", "It works well for medication reviews, skin concerns, mental health and follow-ups.", "Emergencies, physical exams and procedures still need an in-person visit."] },
  { slug: "heart-health-basics", title: "Heart Health Basics Everyone Should Know", category: "Cardiology", date: "2026-08-02", read: "5 min", excerpt: "Simple daily habits that dramatically lower cardiovascular risk.", body: ["Heart disease remains a leading cause of death worldwide, but much of it is preventable.", "Move 150 minutes a week, eat more plants, avoid tobacco and know your numbers: blood pressure, cholesterol and blood sugar."] },
  { slug: "kids-vaccination-schedule", title: "A Parent's Guide to Childhood Vaccines", category: "Pediatrics", date: "2026-07-21", read: "7 min", excerpt: "What vaccines your child needs and when.", body: ["Vaccines protect children during their most vulnerable years.", "Talk to your pediatrician about the national schedule and keep a record card at home."] },
];
