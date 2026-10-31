import { editionName, getEdition } from "@/lib/edition";
import { GRUBSHELF_SCREENS } from "@/lib/product-screens";
import type { Paper } from "@/lib/paper";

// The folded papers on the table: two white newspapers, each showing the
// top of its own front page down to the fold. They're printed like the
// open paper (top bar, masthead, section bar, lead story) but each is
// laid out for its own discipline, and the masthead names the role rather
// than repeating the name on both. Drawn at one fixed size and scaled to
// fit the table.

export const COVER_W = 1000;
export const COVER_H = 640;

const date = () =>
  new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const PORTRAIT = "/images/portrait.png";

function TopBar({ discipline }: { discipline: string }) {
  const e = getEdition();
  return (
    <div className="ks-np-top">
      <span>{discipline}</span>
      <span>{date()}</span>
      <span>
        {editionName(e)} &middot; No. {String(e.copy).padStart(2, "0")}
      </span>
    </div>
  );
}

function Sections({ items }: { items: string[] }) {
  return (
    <div className="ks-np-sections">
      {items.map((item, i) => (
        <span key={item} data-on={i === 0 ? "1" : undefined} data-cta={i === items.length - 1 ? "1" : undefined}>
          {item}
        </span>
      ))}
    </div>
  );
}

// Learning: the lead story in columns, with Fig. 1 beside it.
function LearningFront() {
  return (
    <div className="ks-np">
      <TopBar discipline="Learning design" />
      <div className="ks-np-mast">Learning Designer</div>
      <div className="ks-np-rules" />
      <Sections items={["Front page", "Learning case studies", "About", "Hire"]} />
      <div className="ks-np-body ks-npl">
        <div>
          <div className="ks-np-kicker">The lead story</div>
          <div className="ks-np-head">
            Courses people
            <br />
            <em>finish.</em>
          </div>
          <p className="ks-np-stand">From the needs analysis to the SCORM package.</p>
          <div className="ks-np-cols">
            <p>
              <b className="ks-np-cap">I</b>have built courses for blended and self-paced learning since 2014, for
              learners spread across the globe. I work the ADDIE model with subject matter experts, write the script,
              then produce it in Storyline 360, Rise and Camtasia.
            </p>
            <p>
              I define the course itself: observable, measurable learning outcomes, performance competencies,
              interactive elements, case studies and assessments.
            </p>
          </div>
        </div>
        <div>
          {/* The cover photo moves, like a picture in a wizarding paper:
              a silent clip on a loop, the still as its poster. */}
          <div className="ks-np-photo">
            {matchMedia("(prefers-reduced-motion: reduce)").matches ? (
              <img src="/videos/portrait-living.jpg" alt="" />
            ) : (
              <video autoPlay muted loop playsInline poster="/videos/portrait-living.jpg" aria-hidden="true">
                <source src="/videos/portrait-living.webm" type="video/webm" />
                <source src="/videos/portrait-living.mp4" type="video/mp4" />
              </video>
            )}
          </div>
          <div className="ks-np-caption">
            <b>Fig. 1</b> Kazeem Salau, photographed in London
          </div>
          <div className="ks-np-stats">
            <span>
              <b>50+</b> courses
            </span>
            <span>
              <b>+20%</b> completion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product: the app leads, phones fanned on the left, the story beside them.
function ProductFront() {
  const screens = GRUBSHELF_SCREENS.map((s) => s.src);
  return (
    <div className="ks-np">
      <TopBar discipline="Product design" />
      <div className="ks-np-mast">Product Designer</div>
      <div className="ks-np-rules" />
      <Sections items={["Front page", "App and design", "About", "Hire"]} />
      <div className="ks-np-body ks-npp">
        <div className="ks-npp-stage">
          {[screens[1], screens[0], screens[4]].map((src, i) => (
            <div key={src} className={`ks-npp-phone ks-npp-phone-${i}`}>
              <img src={src} alt="" />
            </div>
          ))}
          <div className="ks-np-caption ks-npp-caption">
            <b>Fig. 1</b> GrubShelf, a meal planner for UK households
          </div>
        </div>
        <div>
          <div className="ks-np-kicker">The lead story</div>
          <div className="ks-np-head">
            Apps people
            <br />
            <em>use.</em>
          </div>
          <p className="ks-np-stand">From the first user interview to a working build.</p>
          <div className="ks-npp-byline">
            <div className="ks-npp-stamp">
              <img src={PORTRAIT} alt="" />
            </div>
            <p>
              Research, flows, a 53-screen prototype and a SwiftUI build. <b>By Kazeem Salau</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Cover({ paper }: { paper: Paper }) {
  return paper === "learning" ? <LearningFront /> : <ProductFront />;
}
