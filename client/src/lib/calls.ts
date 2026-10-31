import type { Call } from "@/components/your-call";

// The "Your call" decisions for each case study. Each reveal is the case
// study's own reasoning, cut to a line; the other options are believable
// alternatives.

export const CALLS: Record<string, Call[]> = {
  "the-fixer": [
    {
      question: "Staff pass the policy quiz, then fumble the real case. What do you build?",
      options: ["A clearer policy summary", "Short explainer videos", "Cases to judge, with delayed consequences"],
      chose: 2,
      why: "The hard part was never the rule. It was judgement under pressure, so the course is cases, not lessons.",
    },
    {
      question: "What do you ask the subject experts for?",
      options: ["The policy, section by section", "The cases that go wrong", "Last year's assessment"],
      chose: 1,
      why: "The cases that go wrong became the scenarios, mapped on paper before anything was built.",
    },
  ],
  "business-writing": [
    {
      question: "Writing is wordy, vague and unpolished. Where does the course start?",
      options: ["Grammar rules", "Clarity, brevity and tone", "Persuasion"],
      chose: 1,
      why: "Foundations first: clarity, brevity and the right tone. Persuasion comes last, once the basics hold.",
    },
    {
      question: "What do learners practise on?",
      options: ["Made-up topics", "Their real emails, reports and proposals", "Model examples"],
      chose: 1,
      why: "The formats people send every week, so the habit goes straight back to their inbox.",
    },
  ],
  "emotional-intelligence": [
    {
      question: "People know the four domains and still snap on a bad Friday. What does the course train?",
      options: ["The definitions, more thoroughly", "Noticing it while it happens", "A self-assessment"],
      chose: 1,
      why: "Every concept arrives inside a moment the learner recognises: read it, name the trigger, choose a response.",
    },
    {
      question: "What do you write first?",
      options: ["The theory", "Real situations from team managers", "The assessment"],
      chose: 1,
      why: "The situations came first, from people who manage teams. The theory was written around them.",
    },
  ],
  grubshelf: [
    {
      question: "A new user picks some favourite meals. Where do they go?",
      options: ["Onto this week's plan", "Into Meals, until the user plans them", "Into a suggested week"],
      chose: 1,
      why: "Never plan for the user. Guessing wrong costs more trust than an empty week.",
    },
    {
      question: "A TikTok recipe is shared into the app. How is it matched?",
      options: ["An AI call each time", "On the phone, against ~150 dishes", "The user types it"],
      chose: 1,
      why: "On-device matching means no AI cost per use. AI for unknown dishes waits for Premium.",
    },
    {
      question: "How do you track a pot of stew eaten over days?",
      options: ["Portions left", "Still got some, or finished", "You don't"],
      chose: 1,
      why: "Pots, not portions. Nobody counts portions in real life.",
    },
  ],
  "grubshelf-website": [
    {
      question: "The site has one job: the waiting list. How does it open?",
      options: ["The feature list", "“You bought basil. Again.”", "App screenshots"],
      chose: 1,
      why: "Open on a problem people already feel, then show the app quietly fixing it.",
    },
    {
      question: "How do you sell receipt scanning?",
      options: ["Describe it", "Show a receipt becoming a pantry", "A video walkthrough"],
      chose: 1,
      why: "The demo does the selling. The idea lands in a couple of seconds.",
    },
  ],
  "mai-shara": [
    {
      question: "Residents face blocked drains, rotting waste and estimated bills. What does the app give them?",
      options: ["A complaints form", "Control over their own pick-ups", "A map of the worst streets"],
      chose: 1,
      why: "The delays were the agencies'. So residents schedule, track and report pick-ups themselves.",
    },
    {
      question: "How should paying for pick-ups work?",
      options: ["A monthly bill", "An in-app wallet with every charge listed", "Cash to the driver"],
      chose: 1,
      why: "A wallet with full history. Nothing is estimated behind anyone's back.",
    },
  ],
};
