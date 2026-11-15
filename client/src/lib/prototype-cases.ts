// The written case studies for the three prototype projects. Everything
// here comes from the project background Kazeem gave and from what the
// prototype screens show; nothing is measured, so outcomes are written as
// what the design sets out to do, not as results.

export type CaseSection = { heading: string; paras: string[] };
export type CaseShot = { src: string; alt: string; caption: string };

export type PrototypeCase = {
  // A short line under the title.
  deck: string;
  // The case study in four lines.
  short: { problem: string; role: string; did: string; result: string };
  overview: string;
  challenge: CaseSection;
  role: CaseSection;
  approach: CaseSection & { points: { title: string; text: string }[] };
  solution: CaseSection & { shots: CaseShot[] };
  takeaways: string[];
};

export const PROTOTYPE_CASES: Record<string, PrototypeCase> = {
  "pharmacy-benefit": {
    short: {
      problem: "Leadway's HMO system worked but was hard to use.",
      role: "Interface designer for the redesign.",
      did: "Organised it around each user's job: one navigation, a working dashboard, scannable records.",
      result: "A redesigned interface for admin, operations and client services, prototyped in Figma.",
    },
    deck: "An HMO management system, redesigned so the people running healthcare operations can find their way.",
    overview:
      "Leadway acquired Prognosis to run its health maintenance organisation (HMO). It worked, but it wasn’t easy to use. I redesigned the interface across front- and back-office operations, administration and the client services behind inpatient and outpatient care.",
    challenge: {
      heading: "The challenge: a capable system that was hard to use",
      paras: [
        "Prognosis serves people with very different jobs: administrators, back-office operations staff, and the teams handling client care from outpatient appointments to inpatient stays.",
        "Each needed something different from the same system. The task: make complex HMO software approachable without losing anything it did.",
      ],
    },
    role: {
      heading: "My role",
      paras: [
        "I designed the new interface: a more user-friendly experience that made the platform easier to navigate and use across its administrative, operational and client-facing areas.",
      ],
    },
    approach: {
      heading: "The design approach",
      paras: [
        "Start from the users and their work, and organise the interface around those jobs, not the system’s internals.",
      ],
      points: [
        {
          title: "One navigation for every role",
          text: "One persistent side menu (Dashboard, My Task, Members, Pharmacy, Schedule, Report), so everyone knows where they are.",
        },
        {
          title: "A dashboard that starts the day",
          text: "Key figures at a glance (members, pharmacies, schedules, pending items) beside the work needing attention: recent members, pharmacies and entries to review.",
        },
        {
          title: "Records that are easy to scan",
          text: "Clean tables with a status on every row, and one-screen detail views with contacts, opening hours and linked people.",
        },
        {
          title: "Actions where they’re needed",
          text: "Common tasks, like creating a schedule or viewing a member, are dashboard buttons; search tops every screen.",
        },
      ],
    },
    solution: {
      heading: "The solution",
      paras: [
        "Each part of the operation gets a clear home. Screens from the working prototype:",
      ],
      shots: [
        {
          src: "/images/pharmacy-benefit/dashboard.jpg",
          alt: "HMO management dashboard showing totals for members, pharmacies, schedules and pending items, a schedules chart, recent members and new entries to review",
          caption: "The dashboard: totals, a schedules chart, recent members and entries to review.",
        },
        {
          src: "/images/pharmacy-benefit/pharmacies.jpg",
          alt: "Pharmacy list in the healthcare administration interface, with name, number, date, location, contact and status for each pharmacy",
          caption: "Every pharmacy in the network in one table, with its status.",
        },
        {
          src: "/images/pharmacy-benefit/pharmacy-detail.jpg",
          alt: "A pharmacy's record showing its address, contact details, opening hours and the list of enrolees attached to it",
          caption: "A pharmacy’s details, hours and enrolees on one screen.",
        },
      ],
    },
    takeaways: [
      "One system serves very different people; designing around their jobs, not the database, makes it usable.",
      "Consistent navigation and predictable tables do more for a complex system than any single screen.",
      "Putting the next action beside its information cuts the hunting that makes enterprise tools feel hard.",
    ],
  },

  householder: {
    short: {
      problem: "Home insurance sold poorly; customers dropped out early.",
      role: "Designer of the purchase journey.",
      did: "A guided journey that builds cover from the rooms and things in the customer's home.",
      result: "A transparent flow where customers choose what to insure, prototyped in Figma.",
    },
    deck: "Home insurance where customers choose exactly what to insure, so they know what they’re covered for.",
    overview:
      "Householder, a home insurance product, sold poorly and lost customers early in the purchase. I redesigned the journey around one idea: let customers build cover from the things in their home.",
    challenge: {
      heading: "The challenge: customers didn’t know what they were buying",
      paras: [
        "People couldn’t see what they were buying, or which of their belongings the policy actually covered.",
        "Generic, opaque insurance is hard to say yes to. The aim: a transparent, easy journey that leaves customers in control.",
      ],
    },
    role: {
      heading: "My role",
      paras: [
        "I designed the purchase journey: the interactive flow customers move through to describe their home, choose what to insure and see their cover.",
      ],
    },
    approach: {
      heading: "The design approach",
      paras: [
        "Instead of picking a policy and hoping it fits, customers describe their home and the cover builds from their answers.",
      ],
      points: [
        {
          title: "One question at a time",
          text: "Short, friendly steps (“Tell us about you”, “Where are you located?”) so it never feels like a long form.",
        },
        {
          title: "Rooms first, then things",
          text: "Pick rooms, then the items in each, the way people think about their own home.",
        },
        {
          title: "Their choice, and easy to change",
          text: "Add, remove or add “others”, with a basket showing what’s chosen, so customers control their cover.",
        },
        {
          title: "Cover and price, side by side",
          text: "Coverage options shown with their prices, for an informed decision.",
        },
      ],
    },
    solution: {
      heading: "The solution",
      paras: [
        "Customers pick what to insure, adjust it and understand their cover. Screens from the prototype:",
      ],
      shots: [
        {
          src: "/images/householder/choose-items.jpg",
          alt: "Home insurance item selection: choosing a couch, sound stereo, air conditioner, television, console and painting in the living room, with an option to add others",
          caption: "The living room: couch, stereo, TV, console, painting, or add your own.",
        },
        {
          src: "/images/householder/choose-rooms.jpg",
          alt: "Choosing which rooms to insure: living room, bedroom, kitchen, other room and personal effects",
          caption: "Choosing rooms to cover, including personal effects.",
        },
        {
          src: "/images/householder/location.jpg",
          alt: "Insurance journey step asking where the customer is located, with address, ownership, city and state fields",
          caption: "One question per step: where the home is, and who owns it.",
        },
      ],
    },
    takeaways: [
      "Transparency sells: when people see what they’re covered for, the purchase feels like their decision.",
      "Asking about their world (rooms, belongings) is easier than asking them to understand a product.",
      "Short, conversational steps keep people moving through a long application.",
    ],
  },

  "leadway-health": {
    short: {
      problem: "A new HMO with no website.",
      role: "Designer of the site's layout, navigation and interface.",
      did: "A site that leads with what people come to do: buy a plan, find a provider, get help.",
      result: "Leadway Health's first website, designed and prototyped in Figma.",
    },
    deck: "A new healthcare organisation’s first website: plans, services and providers, easy to reach.",
    overview:
      "Leadway Health, a new HMO, needed a website to establish itself online and give clients a useful starting point. I designed it, from home page to resources.",
    challenge: {
      heading: "The challenge: a new organisation with no digital front door",
      paras: [
        "It needed a professional presence and a genuinely useful site: explain the offer, help people buy a plan or find a provider, and point them to information.",
      ],
    },
    role: {
      heading: "My role",
      paras: [
        "I designed the Leadway Health website as part of designing Leadway’s web products: the layout, navigation and interface of the site.",
      ],
    },
    approach: {
      heading: "The design approach",
      paras: [
        "The site leads with what people come to an HMO for, with everything else one step away.",
      ],
      points: [
        {
          title: "A clear promise up front",
          text: "The home page opens on “The Smarter Choice is Here” and one Get Started action.",
        },
        {
          title: "The main jobs, one click away",
          text: "Four cards under the hero: buy a plan, “Hello Doc!”, find a provider, become a provider.",
        },
        {
          title: "Navigation that mirrors the organisation",
          text: "Home, About Us, Products, Provider Network, Contact Us; Get Started always in the header, and chat on hand.",
        },
        {
          title: "Resources people can browse",
          text: "Resources in Featured, Case Studies, Events & Webinars and Annual Reports, with stories and video.",
        },
      ],
    },
    solution: {
      heading: "The solution",
      paras: [
        "Clear navigation, the main services up front, and room for stories and reports. Pages from the prototype:",
      ],
      shots: [
        {
          src: "/images/leadway-health/home.jpg",
          alt: "Leadway Health website home page: The Smarter Choice is Here, with cards to buy a health plan, Hello Doc, find a provider and become a provider",
          caption: "The home page: the promise, Get Started, and four services one click away.",
        },
        {
          src: "/images/leadway-health/resources.jpg",
          alt: "Healthcare website resources page with tabs for featured content, case studies, events and webinars, and annual reports",
          caption: "Resources: featured articles, case studies, events and webinars, annual reports.",
        },
        {
          src: "/images/leadway-health/case-studies.jpg",
          alt: "Featured case studies with video on the Leadway Health resources page",
          caption: "Featured case studies, with video.",
        },
      ],
    },
    takeaways: [
      "A new organisation’s website must first earn trust: a clear promise and an obvious next step.",
      "Put the services people come for on the home page, not three menus deep.",
      "Separating everyday tasks from deeper content keeps a site simple without hiding anything.",
    ],
  },
};
