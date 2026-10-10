import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms of Service | GoPraxio" },
    { name: "description", content: "The terms governing your use of GoPraxio." },
    { property: "og:title", content: "Terms of Service | GoPraxio" },
    { property: "og:description", content: "The terms governing your use of GoPraxio." },
  ] }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero title="Terms of Service" sub="Last updated October 2026" />
      <div className="container-x max-w-3xl space-y-4 py-10 leading-relaxed text-muted-foreground">
        <p>By using GoPraxio you agree to these terms.</p>
        <p>GoPraxio is a directory and booking platform. It does not provide medical advice, and listings do not constitute endorsement.</p>
        <p>Doctors are responsible for the accuracy of their claimed profiles. Reviews must reflect genuine experiences.</p>
        <p>We may suspend accounts that violate these terms. These terms are governed by applicable local law.</p>
      </div>
    </>
  );
}
