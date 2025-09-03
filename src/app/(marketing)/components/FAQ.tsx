import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold sm:text-3xl">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="q1">
          <AccordionTrigger>
            How does "business‑day aware" scheduling work?
          </AccordionTrigger>
          <AccordionContent>
            Runbook computes due dates using a pure UTC engine that skips
            weekends and supports negatives like −1 (last biz day). Holidays can
            be injected per region without changing your tasks.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>Do edits save automatically?</AccordionTrigger>
          <AccordionContent>
            Yes. Status, assignee, and comments autosave via idempotent upserts
            with optimistic UI and retry on transient errors.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>
            Can we see who did a task in the past?
          </AccordionTrigger>
          <AccordionContent>
            Every occurrence is stored with timestamped status, assignee, and
            comment so you can audit by task, date, or user.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q4">
          <AccordionTrigger>Does it work on iPhone/iPad?</AccordionTrigger>
          <AccordionContent>
            Absolutely. The UI is touch‑friendly with responsive tables
            (horizontal scroll on small screens) and keyboard‑safe inputs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
