import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site";

export const Route = createFileRoute("/sms-consent")({
  head: () => ({ meta: [
    { title: "SMS Consent | GoPraxio" },
    { name: "description", content: "How GoPraxio uses text messages for appointments." },
    { property: "og:title", content: "SMS Consent | GoPraxio" },
    { property: "og:description", content: "How GoPraxio uses text messages for appointments." },
  ] }),
  component: SmsConsent,
});

function SmsConsent() {
  return (
    <>
      <PageHero title="SMS Consent" sub="Last updated October 2026" />
      <div className="container-x max-w-3xl space-y-4 py-10 leading-relaxed text-muted-foreground">
        <p>By checking the SMS consent box you agree to receive appointment confirmations and reminders by text.</p>
        <p>Message frequency varies. Message and data rates may apply.</p>
        <p>Reply STOP to opt out at any time, or HELP for help. Consent is not a condition of receiving care.</p>
      </div>
    </>
  );
}
