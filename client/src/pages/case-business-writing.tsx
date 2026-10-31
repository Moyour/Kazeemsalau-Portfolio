import CaseStudyLayout from "@/components/case-study-layout";
import { useSEO } from "@/hooks/use-seo";
import { CALLS } from "@/lib/calls";

export default function CaseBusinessWriting() {
  useSEO("/work/business-writing");
  return (
    <CaseStudyLayout
      tags={["Corporate", "Articulate Storyline 360", "SCORM"]}
      title="Business Writing"
      tagline="Strong business writing is more than putting words on a page. It's about influencing decisions, building credibility, and communicating with clarity."
      playUrl="https://codvacreatives.com/demo/Businesswriting/story_html5.html"
      playKicker="Corporate · Storyline 360"
      image="/images/business-writing-hq.jpg"
      imageCaption="Business Writing, built in Articulate Storyline 360"
      short={{
        problem: "Wordy, vague writing was causing delays and costing people credibility.",
        role: "Instructional design and the Storyline 360 build.",
        did: "A course on planning, structuring and editing, applied to real emails and reports.",
        result: "Clearer, shorter messages that get acted on, not just read.",
      }}
      challenge="Wordy, vague or unpolished writing causes misunderstandings and delays, and quietly costs people credibility and opportunities."
      solution="A course on planning, structuring and editing so every message has a purpose. Guided lessons and real-world examples build a style people trust, with colleagues, clients and stakeholders alike."
      process="It starts with clarity, brevity and tone, then applies them to emails, reports, proposals and executive summaries. Editing comes next, and persuasive writing last, once the basics hold."
      outcome="Clearer, shorter messages, fewer misunderstandings, and writing that gets acted on, not just read."
      nextLabel="The Fixer"
      nextHref="/work/the-fixer"
      diagrams={{
        challenge: {
          kind: "contrast",
          left: { label: "The writing", items: ["Wordy", "Vague", "Unpolished"] },
          right: { label: "What it costs", items: ["Misunderstandings and delays", "Credibility", "Opportunities"] },
        },
        solution: {
          kind: "flow",
          steps: [
            { label: "Clarity, brevity, tone", note: "It starts with the foundations: saying it clearly, briefly and in the right tone." },
            { label: "Real formats", note: "Then applies them to emails, reports, proposals and executive summaries." },
            { label: "Editing", note: "Next, editing and refining drafts so every message has a purpose." },
            { label: "Persuasion", note: "Persuasive writing comes last, once the basics hold." },
          ],
        },
      }}
      calls={CALLS["business-writing"]}
    />
  );
}
