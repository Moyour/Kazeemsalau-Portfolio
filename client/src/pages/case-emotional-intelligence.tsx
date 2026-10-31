import CaseStudyLayout from "@/components/case-study-layout";
import { useSEO } from "@/hooks/use-seo";
import { CALLS } from "@/lib/calls";

export default function CaseEmotionalIntelligence() {
  useSEO("/work/emotional-intelligence");
  return (
    <CaseStudyLayout
      tags={["Corporate", "Articulate Storyline 360", "SCORM"]}
      title="Emotional Intelligence"
      tagline="Recognising your triggers and choosing your response, built around the situations where the pressure changes the decision."
      playUrl="https://codvacreatives.com/demo/ei/story_html5.html"
      playKicker="Corporate · Storyline 360"
      image="/images/emotional-intelligence-meeting.jpg"
      imageCaption="Emotional Intelligence, scenario-led rather than definition-led"
      short={{
        problem: "People knew the theory of emotional intelligence and still reacted badly under pressure.",
        role: "Instructional design, the scripts and the Storyline 360 build.",
        did: "Scenarios built from real workplace moments: name the trigger, choose a response, see where it leads.",
        result: "Managers heard the course's vocabulary in team conversations afterwards.",
      }}
      challenge="Emotional intelligence training tends to stop at definitions. People can name the four domains and still snap at a colleague on a bad Friday. The course had to work on noticing it in the moment."
      solution="Every concept arrives inside a moment the learner recognises: feedback that lands badly, a hijacked meeting, a request at the worst time. They name the trigger, pick a response and see where it leads, then reflect on their own last month at work."
      process="I gathered the situations first, from people who manage teams, and wrote the scripts around them before the theory. Outcomes were written as things you could watch someone do. Built in Storyline 360 as SCORM, then adjusted where the first group found it unrealistic."
      outcome="Learners leave with words for what happens under pressure and a habit of pausing first. Managers heard the vocabulary in team conversations afterwards: the content had left the course."
      nextLabel="Business Writing"
      nextHref="/work/business-writing"
      diagrams={{
        challenge: {
          kind: "contrast",
          left: { label: "What people knew", items: ["The four domains", "The definitions", "The model"] },
          right: { label: "What happened anyway", items: ["Snapping at a colleague", "On a bad Friday", "Without noticing"] },
        },
        solution: {
          kind: "flow",
          steps: [
            { label: "A familiar moment", note: "Feedback that lands badly, a hijacked meeting, a request at the worst time." },
            { label: "Name the trigger", note: "The learner reads the moment and names what set them off." },
            { label: "Choose a response", note: "They pick a response and see where it leads." },
            { label: "Reflect", note: "The reflection asks about their own last month at work, not the character's." },
          ],
          loop: "Then the next moment",
        },
      }}
      playerSize={{ width: 1020, height: 635 }}
      calls={CALLS["emotional-intelligence"]}
    />
  );
}
