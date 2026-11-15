import CaseStudyLayout from "@/components/case-study-layout";
import { useSEO } from "@/hooks/use-seo";
import { CALLS } from "@/lib/calls";

export default function CaseTheFixer() {
  useSEO("/work/the-fixer");
  return (
    <CaseStudyLayout
      page="4"
      tags={["Scenario", "Storyline, illustration", "SCORM"]}
      title="The Fixer"
      tagline="A branching special assignment: fix an agency's policy gaps before they cost it more service. Every choice changes what happens next."
      playUrl="https://codvacreatives.com/demo/fixer/story_html5.html"
      playKicker="Scenario · Storyline, illustration"
      image="/images/the-fixer-frame.jpg"
      imageCaption="The Fixer, characters and interface built alongside the script"
      short={{
        problem: "Staff passed the policy quiz, then mishandled real cases.",
        role: "Instructional design, script, illustration and the Storyline 360 build.",
        did: "A branching assignment: handle cases, live with the consequences.",
        result: "Learners finish it, then replay it for the branches they missed.",
      }}
      challenge="Staff could pass the policy quiz and still botch the real case. The hard part was never the rule; it was judging which rule applies when the client is upset, the deadline gone and the file incomplete. The brief: test judgement, not recall."
      solution="The learner plays the fixer in an agency whose service is slipping. Each lesson is a case: a conversation, a file, a decision. Choices branch, consequences arrive later, and feedback explains the reasoning instead of marking right or wrong."
      process="I asked subject experts for the cases that go wrong, not the policy summary. I mapped the branches on paper, wrote dialogue the way people speak, built it in Storyline 360 as SCORM and revised it after the first cohort."
      outcome="Learners finish it (for policy content, the whole battle) and replay it for the branches they missed. It's now my go-to format for judgement under pressure."
      nextLabel="Emotional Intelligence"
      nextHref="/work/emotional-intelligence"
      diagrams={{
        challenge: {
          kind: "contrast",
          left: { label: "What the quiz tested", items: ["Knowing the rule", "Recall, on a quiet afternoon", "A pass mark"] },
          right: {
            label: "What the job needed",
            items: ["Judging which rule applies", "An upset client, a missed deadline", "An incomplete file"],
          },
        },
        solution: {
          kind: "flow",
          steps: [
            { label: "A case", note: "Each lesson is a case to handle, not a summary of the policy." },
            { label: "The conversation and the file", note: "Each case puts them in a conversation and hands them the file." },
            {
              label: "A decision",
              note: "They decide what to do. Choices branch, so different calls lead to different cases.",
              branches: ["One call", "Another call", "A third"],
            },
            { label: "Consequences, later", note: "The effects of a choice arrive later rather than immediately, as they do at work." },
            { label: "Feedback that explains", note: "The feedback explains the reasoning rather than marking an answer right or wrong." },
          ],
        },
      }}
      calls={CALLS["the-fixer"]}
    />
  );
}
