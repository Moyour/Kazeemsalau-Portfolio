import CaseStudyLayout from "@/components/case-study-layout";
import { useSEO } from "@/hooks/use-seo";
import { CALLS } from "@/lib/calls";

export default function CaseTheFixer() {
  useSEO("/work/the-fixer");
  return (
    <CaseStudyLayout
      tags={["Scenario", "Storyline, illustration", "SCORM"]}
      title="The Fixer"
      tagline="A branching special assignment. The learner is sent into an agency to close the policy knowledge gaps that are costing it service delivery, and every choice changes what happens next."
      playUrl="https://codvacreatives.com/demo/fixer/story_html5.html"
      playKicker="Scenario · Storyline, illustration"
      image="/images/the-fixer-hq.jpg"
      imageCaption="The Fixer, characters and interface built alongside the script"
      short={{
        problem: "Staff passed the policy quiz but still mishandled the real cases.",
        role: "Instructional design, the script, the illustration and the Storyline 360 build.",
        did: "A branching assignment: the learner handles cases and lives with the consequences.",
        result: "Learners finish it, and replay it to find the branches they missed.",
      }}
      challenge="Staff could pass a quiz on the policy and still handle the real case badly. The hard part was never the rule: it was judging which rule applies when a client is upset, a deadline has passed and the file is incomplete. The brief was to test judgement, not recall."
      solution="The learner plays the fixer, sent into an agency whose service is slipping. Instead of lessons there are cases: a conversation, the file, and a decision. Choices branch, consequences arrive later, and the feedback explains the reasoning rather than marking right or wrong."
      process="I asked the subject experts for the cases that go wrong, not the policy summary. I mapped the branches on paper, wrote the dialogue the way people actually speak, then built it in Storyline 360 as SCORM and revised it after the first cohort."
      outcome="Learners finish it, which for policy content is the whole battle, and replay it to find the branches they missed. It is now my go-to format when the problem is judgement under pressure."
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
