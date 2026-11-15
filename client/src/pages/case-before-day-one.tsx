import CaseStudyLayout from "@/components/case-study-layout";
import { useSEO } from "@/hooks/use-seo";
import { CALLS } from "@/lib/calls";

export default function CaseBeforeDayOne() {
  useSEO("/work/before-day-one");
  return (
    <CaseStudyLayout
      page="2"
      tags={["Scenario", "Custom build", "SCORM"]}
      title="Before Day One"
      tagline="A new starter's first week, from Tuesday night's offer to clocking out on Day One."
      playUrl="/courses/before-day-one/index.html"
      playKicker="Scenario · Custom build, SCORM"
      image="/images/before-day-one.jpg"
      imageCaption="Tuesday night in Before Day One, when the offer arrives"
      short={{
        problem: "Preboarding arrives as documents, read once and forgotten.",
        role: "Instructional design, script, illustrations and build.",
        did: "Eight scenes of a first week, then a check on five key decisions.",
        result: "Learners can check an offer, catch a contract error, flag lateness, refuse a fake sign-in and ask a useful first question.",
      }}
      challenge="New starters get policies, a contract and a start date, then work out the rest alone. The costly mistakes come before the first meeting: signing the wrong number, arriving late unannounced, approving a sign-in they didn't start."
      solution="The course is the week itself. An offer lands on Tuesday night; the contract doesn't match it. The night before, they pack and set an alarm. Day One runs from the train to reception, a laptop sign-in, the team call and a first 1:1. A five-question check asks them to do it all again."
      process="I wrote the week in order and tied every scene to one decision. Pass mark: four out of five. It's SCORM 1.2, reporting a pass when the certificate appears. Names and places (Brightfield Digital, Milton Keynes) are fictional."
      outcome="Finishers can do the five things the week turns on: read an offer before accepting, catch a contract mismatch, tell a manager they'll be late, deny a sign-in they didn't start, and ask a question only their manager can answer."
      nextLabel="Business Writing"
      nextHref="/work/business-writing"
      diagrams={{
        challenge: {
          kind: "contrast",
          left: { label: "What they are sent", items: ["A policy pack", "A contract", "A start date"] },
          right: { label: "What actually goes wrong", items: ["Signing the wrong number", "Arriving late in silence", "Approving a sign-in they did not start"] },
        },
        solution: {
          kind: "flow",
          steps: [
            { label: "The offer", note: "Tuesday night. Read the terms before you reply." },
            { label: "The contract", note: "One number does not match the offer. Find it before you sign." },
            { label: "The night before", note: "Pack, choose what to wear, and set an alarm you can keep." },
            { label: "Day One", note: "The train, reception, a sign-in you did not start, the team call, and the first 1:1." },
          ],
        },
      }}
      calls={CALLS["before-day-one"]}
    />
  );
}
