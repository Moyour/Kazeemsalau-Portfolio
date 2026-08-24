import CaseStudyLayout from "@/components/case-study-layout";

export default function CaseTheFixer() {
  return (
    <CaseStudyLayout
      pageNum="3"
      tags={["Page 3", "Scenario", "Storyline, illustration", "SCORM"]}
      title="The Fixer"
      tagline="A branching special assignment. The learner is sent into an agency to close the policy knowledge gaps that are costing it service delivery, and every choice changes what happens next."
      playUrl="https://codvacreatives.com/demo/fixer/story_html5.html"
      playKicker="Scenario . Storyline, illustration"
      image="/images/the-fixer-hq.jpg"
      imageCaption="The Fixer, characters and interface built alongside the script"
      challenge="Policy training is usually read and forgotten. Staff can pass a quiz on the policy and still handle the case in front of them badly, because the hard part was never the rule. It was judging which rule applies when a client is upset, a deadline has passed and the file is incomplete. The brief was to build something that tests judgement rather than recall."
      solution="The learner plays the fixer, brought in to sort out an agency whose service delivery is slipping. Instead of lessons there are cases. Each one puts the learner in a conversation, gives them the file, and asks what they do. Choices branch, consequences arrive later rather than immediately, and the feedback explains the reasoning rather than marking an answer right or wrong. The illustration and interface were built alongside the script so the tone of the visuals matches the tone of the dialogue."
      process="I started with the subject matter experts and asked them for the cases that go wrong, not the policy summary. Those became the scenarios. I mapped the branches on paper first so the story held together before any of it was built, then wrote the dialogue as people actually speak it, then produced the characters, screens and interactions in Storyline 360. The whole thing was packaged as SCORM for the LMS and revised after the first cohort went through it."
      outcome="Learners finish it, which for policy content is the whole battle, and they replay it to see the branches they missed. It has since become the format I reach for whenever the real problem is judgement under pressure rather than missing information."
      nextLabel="Emotional Intelligence"
      nextHref="/work/emotional-intelligence"
      nextPageNum="4"
      nextDirection="Continued on"
    />
  );
}
