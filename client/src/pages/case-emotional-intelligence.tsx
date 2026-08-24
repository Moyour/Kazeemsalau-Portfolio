import CaseStudyLayout from "@/components/case-study-layout";

export default function CaseEmotionalIntelligence() {
  return (
    <CaseStudyLayout
      pageNum="4"
      tags={["Page 4", "Corporate", "Articulate Storyline 360", "SCORM"]}
      title="Emotional Intelligence"
      tagline="Recognising your triggers and choosing your response, built around the situations where the pressure changes the decision."
      playUrl="https://codvacreatives.com/demo/ei/story_html5.html"
      playKicker="Corporate . Storyline 360"
      image="/images/emotional-intelligence-hq.jpg"
      imageCaption="Emotional Intelligence, scenario-led rather than definition-led"
      challenge="Emotional intelligence training tends to stop at definitions. People can name the four domains and still snap at a colleague on a bad Friday, because knowing the model is not the same as noticing what is happening to you while it happens. The course had to work on the noticing."
      solution="Every concept arrives inside a situation the learner recognises: the feedback that lands badly, the meeting that gets hijacked, the request that arrives at the worst possible time. The learner reads the moment, names the trigger, then picks a response and sees where it leads. Self-awareness and regulation are practised rather than described, and the reflection prompts ask about their own last month at work rather than the character's."
      process="I gathered the situations first, from the people who manage teams, and wrote the scripts around those before touching the theory. The learning outcomes were written as things you could watch someone do. Then storyboard, script, build in Storyline 360, package as SCORM, and adjust the scenarios that the first group found unrealistic."
      outcome="Learners leave with language for what happens to them under pressure and a habit of pausing before responding. Managers reported the vocabulary showing up in team conversations afterwards, which is the sign that the content left the course."
      nextLabel="Business Writing"
      nextHref="/work/business-writing"
      nextPageNum="2"
      nextDirection="Back to"
    />
  );
}
