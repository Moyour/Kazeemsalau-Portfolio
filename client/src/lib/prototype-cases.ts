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
      problem: "Leadway's HMO management system did the work, but it was hard to use.",
      role: "Interface designer for the redesign.",
      did: "Organised the interface around each user's job: one navigation, a working dashboard and scannable records.",
      result: "A redesigned interface for administration, operations and client services, prototyped in Figma.",
    },
    deck: "Redesigning the interface of an HMO management system so the people running healthcare operations can find their way around it.",
    overview:
      "Leadway acquired Prognosis, a platform for running the operations of its health maintenance organisation (HMO). The system did the work, but it wasn’t easy to use. This project redesigned its interface: a healthcare administration product that supports front-end and back-end operations, administration, and the client-facing services behind inpatient and outpatient care.",
    challenge: {
      heading: "The challenge: a capable system that was hard to use",
      paras: [
        "Prognosis had to serve several groups of people with very different jobs: administrators, operations staff working behind the scenes, and the teams handling client-facing healthcare services, from outpatient appointments to inpatient care.",
        "Each group needed something different from the same system, and the existing interface didn’t make that easy. The task was to make a complex piece of HMO management software approachable without losing any of what it did.",
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
        "The approach was to start from the different users and the work each of them does, then organise the interface around those jobs rather than around the system’s internals.",
      ],
      points: [
        {
          title: "One navigation for every role",
          text: "A single, persistent side menu (Dashboard, My Task, Members, Pharmacy, Schedule and Report) so every user always knows where they are and where everything lives.",
        },
        {
          title: "A dashboard that starts the day",
          text: "The figures that matter at a glance (members, pharmacies, schedules and pending items) beside the work that needs attention: recent members, recent pharmacies and new entries waiting for review.",
        },
        {
          title: "Records that are easy to scan",
          text: "Lists laid out as clean tables with a status on every row, and a detail view for each record that keeps contact details, opening hours and the people attached to it on one screen.",
        },
        {
          title: "Actions where they’re needed",
          text: "Common tasks such as creating a schedule or viewing a member sit as buttons on the dashboard, and search sits at the top of every screen.",
        },
      ],
    },
    solution: {
      heading: "The solution",
      paras: [
        "The redesigned interface gives each part of the operation a clear home. These are screens from the working prototype.",
      ],
      shots: [
        {
          src: "/images/pharmacy-benefit/dashboard.jpg",
          alt: "HMO management dashboard showing totals for members, pharmacies, schedules and pending items, a schedules chart, recent members and new entries to review",
          caption: "The dashboard: totals, a schedules chart, recent members and new entries waiting for review.",
        },
        {
          src: "/images/pharmacy-benefit/pharmacies.jpg",
          alt: "Pharmacy list in the healthcare administration interface, with name, number, date, location, contact and status for each pharmacy",
          caption: "Pharmacies: every pharmacy in the network in one table, each with its status.",
        },
        {
          src: "/images/pharmacy-benefit/pharmacy-detail.jpg",
          alt: "A pharmacy's record showing its address, contact details, opening hours and the list of enrolees attached to it",
          caption: "A pharmacy’s record: its details, opening hours and the enrolees attached to it, on one screen.",
        },
      ],
    },
    takeaways: [
      "In healthcare administration software, the same system serves very different people; designing around their jobs, not the database, is what makes it usable.",
      "Consistent navigation and predictable tables do more for a complex system than any single screen.",
      "Putting the next action (review, create, view) next to the information it relates to cuts the hunting that makes enterprise tools feel hard.",
    ],
  },

  householder: {
    short: {
      problem: "Home insurance was selling poorly, and customers dropped out early in the purchase.",
      role: "Designer of the purchase journey.",
      did: "A guided journey that builds cover from the rooms and things in the customer's own home.",
      result: "A transparent purchase flow where customers choose what to insure, prototyped in Figma.",
    },
    deck: "A home insurance journey that lets customers choose exactly what they want to insure, so they know what their policy covers.",
    overview:
      "Householder is a home insurance product. It was selling poorly, and many customers dropped out early in the purchase. This project redesigned the buying journey around a simple idea: let customers build their cover from the things in their own home.",
    challenge: {
      heading: "The challenge: customers didn’t know what they were buying",
      paras: [
        "Sales were low and customers were leaving the purchase early. Part of the problem was understanding: people struggled to see exactly what they were buying, or which of their household items their policy would actually cover.",
        "Insurance that feels generic and opaque is hard to say yes to. The aim was a purchase journey that was transparent and easy to follow, and that left customers in control.",
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
        "Instead of asking customers to pick a policy and hope it fit, the journey asks them about their home and builds the cover from their answers.",
      ],
      points: [
        {
          title: "One question at a time",
          text: "The journey starts with short, friendly steps (“Tell us about you”, “A little more”, “How can we contact you?”, “Where are you located?”) so it never feels like a long form.",
        },
        {
          title: "Rooms first, then things",
          text: "Customers choose the rooms they want to cover, then the items in each room, so building a policy follows the way people think about their own home.",
        },
        {
          title: "Their choice, and easy to change",
          text: "Items can be added, removed or added as “others”, and a basket shows what has been chosen, so customers stay in control of what goes into their cover.",
        },
        {
          title: "Cover and price, side by side",
          text: "Customers can explore the coverage options and the prices that go with them, so the decision is an informed one.",
        },
      ],
    },
    solution: {
      heading: "The solution",
      paras: [
        "A guided home insurance journey that lets customers pick the household items they want to insure, adjust their choices and understand their cover. These are screens from the prototype.",
      ],
      shots: [
        {
          src: "/images/householder/choose-items.jpg",
          alt: "Home insurance item selection: choosing a couch, sound stereo, air conditioner, television, console and painting in the living room, with an option to add others",
          caption: "Choosing what to insure in the living room: couch, stereo, TV, console, painting, or add your own.",
        },
        {
          src: "/images/householder/choose-rooms.jpg",
          alt: "Choosing which rooms to insure: living room, bedroom, kitchen, other room and personal effects",
          caption: "Choosing the rooms to cover, including personal effects.",
        },
        {
          src: "/images/householder/location.jpg",
          alt: "Insurance journey step asking where the customer is located, with address, ownership, city and state fields",
          caption: "One question per step: where the home is, and whether the customer owns it.",
        },
      ],
    },
    takeaways: [
      "In digital insurance, transparency sells: when people can see what they’re covered for, the purchase feels like their decision.",
      "Asking about the customer’s world (rooms, belongings) is easier to answer than asking them to understand a product.",
      "Breaking a long application into short, conversational steps keeps people moving through it.",
    ],
  },

  "leadway-health": {
    short: {
      problem: "A new HMO with no website and no digital front door.",
      role: "Designer of the website's layout, navigation and interface.",
      did: "A site that leads with what people come to do: buy a plan, find a provider, get help.",
      result: "Leadway Health's first website, designed and prototyped in Figma.",
    },
    deck: "A new healthcare organisation’s first website: its plans, services and providers, clear and easy to reach.",
    overview:
      "Leadway Health was a new health maintenance organisation that needed a website to establish its digital presence and give its clients a useful place to start. This project designed that healthcare website, from the home page to the resources section.",
    challenge: {
      heading: "The challenge: a new organisation with no digital front door",
      paras: [
        "As a new company, Leadway Health needed a professional presence online and a site that would actually be useful to the people it serves: explaining what it offers, helping people buy a health plan or find a provider, and pointing them to the information they need.",
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
        "The site leads with what people come to an HMO to do, and keeps everything else one clear step away.",
      ],
      points: [
        {
          title: "A clear promise up front",
          text: "The home page opens on “The Smarter Choice is Here” and a single Get Started action, with customised plans described as simpler, smarter and more rewarding.",
        },
        {
          title: "The main jobs, one click away",
          text: "Four cards under the hero go straight to the things people come to do: buy a health plan, “Hello Doc!”, find a provider, and become a provider.",
        },
        {
          title: "Navigation that mirrors the organisation",
          text: "Home, About Us, Products, Provider Network and Contact Us, with Get Started always in the header, and a chat button on hand.",
        },
        {
          title: "Resources people can browse",
          text: "A resources section organised into Featured, Case Studies, Events & Webinars and Annual Reports, with featured stories and video.",
        },
      ],
    },
    solution: {
      heading: "The solution",
      paras: [
        "A purpose-designed healthcare website with clear navigation, the organisation’s main services up front, and room for its stories and reports. These are pages from the prototype.",
      ],
      shots: [
        {
          src: "/images/leadway-health/home.jpg",
          alt: "Leadway Health website home page: The Smarter Choice is Here, with cards to buy a health plan, Hello Doc, find a provider and become a provider",
          caption: "The home page: the promise, Get Started, and the four main services one click away.",
        },
        {
          src: "/images/leadway-health/resources.jpg",
          alt: "Healthcare website resources page with tabs for featured content, case studies, events and webinars, and annual reports",
          caption: "Resources: featured articles and tabs for case studies, events and webinars, and annual reports.",
        },
        {
          src: "/images/leadway-health/case-studies.jpg",
          alt: "Featured case studies with video on the Leadway Health resources page",
          caption: "Featured case studies, with video.",
        },
      ],
    },
    takeaways: [
      "For a new organisation, a website’s first job is trust: a clear promise and an obvious next step.",
      "Healthcare website design works best when the services people come for sit on the home page, not three menus deep.",
      "Separating everyday tasks from deeper content (resources, reports) keeps a site simple without hiding anything.",
    ],
  },
};
