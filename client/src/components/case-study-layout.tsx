import YourCalls, { type Call } from "@/components/your-call";
import LearningDiagram, { type Diagram } from "@/components/learning-diagrams";
import CoursePlayer from "@/components/course-player";
import { CaseHeader, CaseNext, CaseSection, HeroFigure, ShortVersion } from "@/components/case-kit";

// A learning case study, set in the site's one case-study layout: the
// challenge, how it was made, the solution, the course itself playable on
// the page, and what it achieved.

interface CaseStudyProps {
  tags: string[];
  title: string;
  tagline: string;
  playUrl: string;
  playKicker: string;
  image: string;
  imageCaption: string;
  short: { problem: string; role: string; did: string; result: string };
  challenge: string;
  solution: string;
  process: string;
  outcome: string;
  nextLabel: string;
  nextHref: string;
  // "Your call" decisions, asked once the challenge is set out.
  calls?: Call[];
  // Diagrams that show the challenge and how the solution works.
  diagrams?: { challenge?: Diagram; solution?: Diagram };
  // For a course published at a fixed size: that size, so it can be scaled to fit.
  playerSize?: { width: number; height: number };
}

// The first sentence set large, the rest beneath it.
function Lead({ text }: { text: string }) {
  const cut = text.search(/[.!?](\s|$)/);
  const lead = cut > 0 ? text.slice(0, cut + 1) : text;
  const rest = cut > 0 ? text.slice(cut + 1).trim() : "";
  return (
    <>
      <p className="cs-lead">{lead}</p>
      {rest && <p className="cs-p">{rest}</p>}
    </>
  );
}

export default function CaseStudyLayout(props: CaseStudyProps) {
  return (
    <article>
      <CaseHeader
        back={{ href: "/work", label: "All learning case studies" }}
        tags={props.tags}
        title={props.title}
        deck={props.tagline}
        byline={[
          props.playKicker,
          <a key="play" href="#the-course">
            Play it on this page &darr;
          </a>,
        ]}
        hero={<HeroFigure src={props.image} alt={`${props.title} course`} caption={props.imageCaption} />}
      />

      <ShortVersion {...props.short} />

      <CaseSection part="challenge">
        <Lead text={props.challenge} />
        {props.diagrams?.challenge && <LearningDiagram d={props.diagrams.challenge} />}
        {props.calls && <YourCalls calls={props.calls} />}
      </CaseSection>

      <CaseSection part="approach">
        <Lead text={props.process} />
      </CaseSection>

      <CaseSection part="solution">
        <Lead text={props.solution} />
        {props.diagrams?.solution && <LearningDiagram d={props.diagrams.solution} />}
      </CaseSection>

      <CaseSection part="tryIt" id="the-course">
        <p className="cs-lead">Play the course here. Sound on.</p>
        <CoursePlayer url={props.playUrl} title={props.title} native={props.playerSize} />
        <div className="ks-course-bar">
          <span>{props.playKicker}</span>
          <a href={props.playUrl} target="_blank" rel="noopener noreferrer" data-track="course_new_tab">
            Not loading? Open it in a new tab &#8599;
          </a>
        </div>
      </CaseSection>

      <CaseSection part="outcome">
        <Lead text={props.outcome} />
      </CaseSection>

      <CaseNext label={props.nextLabel} href={props.nextHref} hire="Hire me for a course like this" />
    </article>
  );
}
