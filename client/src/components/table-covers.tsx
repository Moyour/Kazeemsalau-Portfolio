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
          {/* The lead picture is the featured course, the one that plays in full. */}
          <div className="ks-np-photo">
            <img src="/images/before-day-one.jpg" alt="" />
          </div>
          <div className="ks-np-caption">
            <b>Fig. 1</b> Before Day One, a course you can play
          </div>
          <div className="ks-np-stats">
            <span>
              <b>50+</b> courses
            </span>
            <span>
              <b>4</b> you can play
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
    <div className="ks-np ks-npp">
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
              Research, flows, a 53-screen prototype and a SwiftUI build. <b>By <span className="ks-name">Kazeem Salau</span></b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Video: the moving portrait leads, and the reel is the story.
function VideoFront() {
  return (
    <div className="ks-np ks-npv">
      <TopBar discipline="Video editing" />
      <div className="ks-np-mast">Video Editor</div>
      <div className="ks-np-rules" />
      <Sections items={["Front page", "The reel", "About", "Hire"]} />
      <div className="ks-np-body ks-npl">
        <div>
          <div className="ks-np-kicker">The lead story</div>
          <div className="ks-np-head">
            Pictures,
            <br />
            <em>cut.</em>
          </div>
          <p className="ks-np-stand">The reel is on YouTube.</p>
          <div className="ks-np-cols">
            <p>
              <b className="ks-np-cap">I</b>cut pictures.
            </p>
            <p>The reel is the channel.</p>
          </div>
        </div>
        <div>
          {/* A small cut of the portrait clip, sized for a thumbnail on the table. */}
          <div className="ks-np-photo">
            {matchMedia("(prefers-reduced-motion: reduce)").matches ? (
              <img src="/videos/portrait-cover.jpg" alt="" />
            ) : (
              <video autoPlay muted loop playsInline poster="/videos/portrait-cover.jpg" aria-hidden="true">
                <source src="/videos/portrait-cover.mp4" type="video/mp4" />
                <source src="/videos/portrait-cover.webm" type="video/webm" />
              </video>
            )}
          </div>
          <div className="ks-np-caption">
            <b>Fig. 1</b> A picture that moves
          </div>
          <div className="ks-np-stats">
            <span>
              <b>1</b> channel
            </span>
            <span>
              <b>21</b> films
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Cover({ paper }: { paper: Paper }) {
  if (paper === "learning") return <LearningFront />;
  if (paper === "product") return <ProductFront />;
  return <VideoFront />;
}
