import CaseStudyLayout from "@/components/case-study-layout";
import { useSEO } from "@/hooks/use-seo";
import { CALLS } from "@/lib/calls";

export default function CaseBusinessWriting() {
  useSEO("/work/business-writing");
  return (
    <CaseStudyLayout
      page="3"
      tags={["Corporate", "Articulate Storyline 360", "SCORM"]}
      title="Business Writing"
      tagline="Business writing that influences decisions, builds credibility and says it clearly."
      playUrl="https://codvacreatives.com/demo/Businesswriting/story_html5.html"
      playKicker="Corporate · Storyline 360"
      image="/images/business-writing-frame.jpg"
      imageCaption="Business Writing, built in Articulate Storyline 360"
      short={{
        problem: "Wordy, vague writing caused delays and cost credibility.",
        role: "Instructional design and the Storyline 360 build.",
        did: "Planning, structuring and editing, applied to real emails and reports.",
        result: "Shorter, clearer messages that get acted on.",
      }}
      challenge="Wordy, vague writing causes misunderstandings and delays, and quietly costs people credibility."
      solution="Planning, structuring and editing, so every message has a purpose. Guided lessons and real examples build a style colleagues, clients and stakeholders trust."
      process="Clarity, brevity and tone first, applied to emails, reports and proposals. Then editing, and persuasion last, once the basics hold."
      outcome="Shorter, clearer messages, fewer misunderstandings, and writing that gets acted on."
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
