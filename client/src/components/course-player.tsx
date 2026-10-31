import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";

// A Storyline course, playable on the page. Newer players scale their slide
// to whatever window they get, so they simply fill the frame. Older ones
// are published at a fixed size (`native`) and scroll inside a smaller
// window, so they're laid out at that size and scaled down as one piece to
// fit the frame, centred, never cropped and never scrolling. Where that
// would make the course too small to read (narrow phones), a button opens
// it full screen.

export default function CoursePlayer({
  url,
  title,
  native,
}: {
  url: string;
  title: string;
  native?: { width: number; height: number };
}) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = box.current;
    if (!el || !native) return;
    const fit = () => {
      // As wide as the column allows, and short enough to be seen whole.
      const byWidth = el.clientWidth / native.width;
      const byHeight = (window.innerHeight - 140) / native.height;
      setScale(Math.min(1, byWidth, byHeight));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      removeEventListener("resize", fit);
    };
  }, [native]);

  const frame = (
    <iframe
      src={url}
      title={`${title}, the course`}
      loading="lazy"
      allow="autoplay; fullscreen"
      allowFullScreen
      onLoad={() => track("course_embed_loaded", { course: title })}
      style={
        native
          ? {
              position: "absolute",
              top: 0,
              left: "50%",
              width: native.width,
              height: native.height,
              border: 0,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: "50% 0",
            }
          : undefined
      }
    />
  );

  return (
    <div ref={box} className="ks-course-wrap">
      {native ? (
        <div
          className="ks-course ks-course-fixed"
          style={{ width: native.width * scale, height: native.height * scale }}
        >
          {frame}
          {scale < 0.5 && (
            <a className="ks-course-full" href={url} target="_blank" rel="noopener noreferrer">
              Open the course full screen &#8599;
            </a>
          )}
        </div>
      ) : (
        <div className="ks-course">{frame}</div>
      )}
    </div>
  );
}
