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
      "Kazeem Salau - eLearning Developer & Instructional Designer | London",
    description:
      "Freelance eLearning developer and instructional designer specializing in SCORM course development, Articulate Storyline 360 & Rise, LMS integration, and corporate training. Based in London, working worldwide.",
    url: BASE_URL,
    image: DEFAULT_IMAGE,
    imageAlt:
      "Kazeem Salau - eLearning Developer & Instructional Designer Portfolio",
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
    title: "About Kazeem Salau - Freelance eLearning Developer | London",
    description:
      "Freelance eLearning developer and instructional designer based in London. Specialising in Articulate Storyline 360, Rise, SCORM development, and learning experience design.",
    url: `${BASE_URL}/about`,
    image: DEFAULT_IMAGE,
    imageAlt: "Kazeem Salau, freelance eLearning developer",
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
  "/contact": {
    title:
      "Hire Kazeem Salau - eLearning Developer & Instructional Designer",
    description:
      "Get in touch to discuss your eLearning project. Freelance SCORM course development, Articulate Storyline & Rise, instructional design, and LMS integration services.",
    url: `${BASE_URL}/contact`,
    image: DEFAULT_IMAGE,
    imageAlt: "Contact Kazeem Salau for eLearning development services",
  },
};
