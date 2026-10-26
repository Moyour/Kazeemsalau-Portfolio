const BASE_URL = "https://www.kazeemsalau.com";
const DEFAULT_IMAGE = `${BASE_URL}/images/portrait.png`;

export interface SEOData {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
}

export const seoData: Record<string, SEOData> = {
  "/": {
    title:
      "Kazeem Salau - Learning Experience Designer & Product Designer | London",
    description:
      "Learning experience designer building SCORM courses in Articulate Storyline 360 & Rise, and product designer of iOS apps and websites. Based in London, working worldwide.",
    url: BASE_URL,
    image: DEFAULT_IMAGE,
    imageAlt:
      "Kazeem Salau - Learning Experience Designer & Product Designer Portfolio",
  },
  "/work": {
    title: "eLearning Case Studies - SCORM Course Demos | Kazeem Salau",
    description:
      "Interactive SCORM course demos built with Articulate Storyline 360. Explore case studies in business writing, scenario-based learning, and emotional intelligence training.",
    url: `${BASE_URL}/work`,
    image: `${BASE_URL}/images/business-writing-hq.jpg`,
    imageAlt: "eLearning course portfolio showcasing SCORM demos",
  },
  "/work/business-writing": {
    title:
      "Business Writing Course - Articulate Storyline 360 | Kazeem Salau",
    description:
      "Corporate business writing SCORM course built in Articulate Storyline 360. Interactive lessons on planning, structuring, and refining professional communication.",
    url: `${BASE_URL}/work/business-writing`,
    image: `${BASE_URL}/images/business-writing-hq.jpg`,
    imageAlt: "Business Writing eLearning course built in Articulate Storyline 360",
  },
  "/work/the-fixer": {
    title:
      "The Fixer - Branching Scenario eLearning Course | Kazeem Salau",
    description:
      "Branching scenario SCORM course with custom illustration. A policy-training game where every choice changes what happens next, built in Articulate Storyline.",
    url: `${BASE_URL}/work/the-fixer`,
    image: `${BASE_URL}/images/the-fixer-hq.jpg`,
    imageAlt: "The Fixer branching scenario eLearning course",
  },
  "/work/emotional-intelligence": {
    title:
      "Emotional Intelligence Course - Articulate Storyline 360 | Kazeem Salau",
    description:
      "Scenario-led emotional intelligence SCORM course. Learners practise recognising triggers and choosing responses in realistic workplace situations.",
    url: `${BASE_URL}/work/emotional-intelligence`,
    image: `${BASE_URL}/images/emotional-intelligence-hq.jpg`,
    imageAlt: "Emotional Intelligence eLearning course in Articulate Storyline 360",
  },
  "/about": {
    title: "About Kazeem Salau - Learning Experience Designer & Product Designer | London",
    description:
      "Learning experience designer and product designer based in London. Twelve years across learning design, Articulate Storyline 360 and Rise, user research, UI design and SwiftUI.",
    url: `${BASE_URL}/about`,
    image: DEFAULT_IMAGE,
    imageAlt: "Kazeem Salau, learning experience designer and product designer",
  },
  "/products": {
    title: "App & Design - GrubShelf & Mai Shara | Kazeem Salau",
    description:
      "Products designed and built by Kazeem Salau: the GrubShelf iOS meal planner and its website, and Mai Shara, a waste pick-up app taken from user research to prototype.",
    url: `${BASE_URL}/products`,
    image: `${BASE_URL}/images/grubshelf-og.jpg`,
    imageAlt: "GrubShelf and Mai Shara product design by Kazeem Salau",
  },
  "/apps": {
    title: "Apps & Side Projects | Kazeem Salau",
    description:
      "Side projects and apps built by Kazeem Salau, including iOS apps and developer tools alongside eLearning development work.",
    url: `${BASE_URL}/apps`,
    image: DEFAULT_IMAGE,
    imageAlt: "Apps and side projects by Kazeem Salau",
  },
  "/design": {
    title: "Design Work - Visual & UI Design | Kazeem Salau",
    description:
      "Visual and UI design work by Kazeem Salau. Design projects spanning branding, interface design, and creative direction alongside eLearning development.",
    url: `${BASE_URL}/design`,
    image: DEFAULT_IMAGE,
    imageAlt: "Design work by Kazeem Salau",
  },
  "/design/grubshelf": {
    title: "GrubShelf Meals Lite - Product Design Case Study | Kazeem Salau",
    description:
      "How I designed and built GrubShelf Meals Lite, an iOS meal planner for African and diaspora households in the UK, using an LLM-first spec, a 53-screen prototype and Claude Code.",
    url: `${BASE_URL}/design/grubshelf`,
    image: `${BASE_URL}/images/grubshelf-og.jpg`,
    imageAlt: "GrubShelf Meals Lite product design case study",
  },
  "/design/grubshelf/screens": {
    title: "GrubShelf - Every Screen of the App Mockup | Kazeem Salau",
    description:
      "All 70 screens of the GrubShelf iOS meal planner mockup, grouped by flow: onboarding, weekly planning, pots, meals, list and shopping, and profile.",
    url: `${BASE_URL}/design/grubshelf/screens`,
    image: `${BASE_URL}/images/grubshelf-og.jpg`,
    imageAlt: "GrubShelf app screens",
  },
  "/design/grubshelf-website": {
    title: "GrubShelf Website - Landing Page Design | Kazeem Salau",
    description:
      "Design and build of grubshelf.app, a problem-first landing page for the GrubShelf meal planner with one goal: waiting-list sign-ups.",
    url: `${BASE_URL}/design/grubshelf-website`,
    image: `${BASE_URL}/images/grubshelf-web/hero.jpg`,
    imageAlt: "The grubshelf.app landing page",
  },
  "/design/mai-shara": {
    title: "Mai Shara - Waste Management App UX Case Study | Kazeem Salau",
    description:
      "UX research and UI/UX design for Mai Shara, a mobile app that lets residents and businesses schedule and track waste pick-up, pay for the service and report incidents.",
    url: `${BASE_URL}/design/mai-shara`,
    image: DEFAULT_IMAGE,
    imageAlt: "Mai Shara waste management app case study",
  },
  "/contact": {
    title:
      "Hire Kazeem Salau - Learning Experience Designer & Product Designer",
    description:
      "Get in touch to discuss your eLearning project. Freelance SCORM course development, Articulate Storyline & Rise, instructional design, and LMS integration services.",
    url: `${BASE_URL}/contact`,
    image: DEFAULT_IMAGE,
    imageAlt: "Contact Kazeem Salau for eLearning development services",
  },
};
