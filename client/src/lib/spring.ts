// Moves a value to a target on a damped spring, starting at a given speed
// (units per second). Resolves when it has settled; cancel() stops it.
export function spring(
  from: number,
  to: number,
  velocity: number,
  { stiffness = 90, damping = 16 } = {},
  onUpdate: (x: number) => void,
) {
  let x = from;
  let v = velocity;
  let raf = 0;
  let last = performance.now();
  let resolve = () => {};
  const done = new Promise<void>((r) => (resolve = r));
  const step = (now: number) => {
    // Small fixed steps keep the spring stable on slow frames.
    let dt = Math.min(0.064, (now - last) / 1000);
    last = now;
    while (dt > 0) {
      const h = Math.min(dt, 1 / 240);
      v += (-stiffness * (x - to) - damping * v) * h;
      x += v * h;
      dt -= h;
    }
    if (Math.abs(x - to) < 0.002 && Math.abs(v) < 0.02) {
      onUpdate(to);
      resolve();
      return;
    }
    onUpdate(x);
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return { done, cancel: () => cancelAnimationFrame(raf) };
}

// Moves a value from one number to another over a set time, eased in and
// out: a slow start, a smooth middle and a gentle landing. Resolves when
// it arrives; cancel() stops it.
export function tween(from: number, to: number, ms: number, onUpdate: (x: number) => void) {
  let raf = 0;
  let resolve = () => {};
  const done = new Promise<void>((r) => (resolve = r));
  const start = performance.now();
  // Sine ease: gentle at both ends without a sudden rush in the middle.
  const ease = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / ms);
    onUpdate(from + (to - from) * ease(t));
    if (t < 1) raf = requestAnimationFrame(step);
    else resolve();
  };
  raf = requestAnimationFrame(step);
  return { done, cancel: () => cancelAnimationFrame(raf) };
}
