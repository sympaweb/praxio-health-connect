import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | GoPraxio" },
    { name: "description", content: "How GoPraxio collects, uses and protects your data." },
    { property: "og:title", content: "Privacy Policy | GoPraxio" },
    { property: "og:description", content: "How GoPraxio collects, uses and protects your data." },
  ] }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero title="Privacy Policy" sub="Last updated October 2026" />
      <div className="container-x max-w-3xl space-y-4 py-10 leading-relaxed text-muted-foreground">
        <p>We collect information you provide (name, contact details, appointment requests) and usage data.</p>
        <p>We share appointment requests only with the provider you contact. We never sell personal health information.</p>
        <p>You may request access to or deletion of your data at any time by contacting privacy@gopraxio.com.</p>
      </div>
    </>
  );
}
