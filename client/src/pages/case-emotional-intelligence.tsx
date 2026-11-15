import CaseStudyLayout from "@/components/case-study-layout";
import { useSEO } from "@/hooks/use-seo";
import { CALLS } from "@/lib/calls";

export default function CaseEmotionalIntelligence() {
  useSEO("/work/emotional-intelligence");
  return (
    <CaseStudyLayout
      page="5"
      tags={["Corporate", "Articulate Storyline 360", "SCORM"]}
      title="Emotional Intelligence"
      tagline="Spot the trigger, choose the response: built around moments when pressure changes the decision."
      playUrl="https://codvacreatives.com/demo/ei/story_html5.html"
      playKicker="Corporate · Storyline 360"
      image="/images/emotional-intelligence-frame.jpg"
      imageCaption="Emotional Intelligence, scenario-led rather than definition-led"
      short={{
        problem: "People knew the theory and still reacted badly under pressure.",
        role: "Instructional design, scripts and the Storyline 360 build.",
        did: "Real workplace scenarios: name the trigger, choose a response, see where it leads.",
        result: "Managers heard its vocabulary in team conversations afterwards.",
      }}
      challenge="EI training usually stops at definitions. People can name the four domains and still snap at a colleague on a bad Friday. This course had to work in the moment."
      solution="Each concept arrives inside a familiar moment: feedback that lands badly, a hijacked meeting, a request at the worst time. Learners name the trigger, pick a response, see the result, then reflect on their own month."
      process="I gathered situations from people who manage teams and scripted around them before adding theory. Outcomes describe what you could watch someone do. Built in Storyline 360 as SCORM, then adjusted where the first group found it unrealistic."
      outcome="Learners leave with words for pressure and a habit of pausing first. Managers then heard that vocabulary in team conversations: the content had left the course."
      nextLabel="Before Day One"
      nextHref="/work/before-day-one"
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
