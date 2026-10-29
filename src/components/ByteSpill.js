import React, {useEffect, useRef, useState} from 'react';

// The bytes spell this, in hex. Decode them and you get the email.
const SRC = 'shubhamchhatbar1@gmail.com ';
const HOT = new Set([61, 188, 307]); // three orange bytes, no more
const COL = 24; // px per heightmap column

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeBytes(n) {
  const r = rng(27);
  return Array.from({length: n}, (_, i) => {
    const size = 15 + Math.floor(r() * 8);
    return {
      hex: SRC.charCodeAt(i % SRC.length).toString(16).padStart(2, '0'),
      size,
      shade: Math.floor(r() * 4),
      hot: HOT.has(i),
      // bias the pile toward the right so the email stays readable on the left
      fx: r() < 0.75 ? 0.45 + Math.pow(r(), 0.8) * 0.55 : r(),
      rot: (r() - 0.5) * 70,
      delay: i * 5 + r() * 160,
    };
  });
}

/*
 * Bytes fall each time the section is reached, then settle on a heightmap
 * (one column per COL px). A tall column sheds onto a lower neighbour, so the
 * pile slumps like sand instead of stacking into towers. Click to spill again.
 */
export default function ByteSpill() {
  const box = useRef(null);
  const spans = useRef([]);
  const [count, setCount] = useState(0);
  const run = useRef(0);

  useEffect(() => {
    // fewer bytes on short windows so the pile stays below the text
    const base = window.innerWidth < 700 ? 140 : 380;
    const scale = Math.min(1, Math.max(0.5, (window.innerHeight - 200) / 620));
    setCount(Math.round(base * scale));
  }, []);

  useEffect(() => {
    if (!count || !box.current) return undefined;
    const bytes = makeBytes(count);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let parked = true;

    const spill = () => {
      parked = false;
      cancelAnimationFrame(raf);
      const id = ++run.current;
      const W = box.current.clientWidth;
      const H = box.current.clientHeight;
      const cols = new Array(Math.ceil(W / COL) + 1).fill(0);

      const maxC = Math.floor((W - 80) / COL); // keep every byte inside the right margin

      const land = (b) => {
        let c = Math.min(cols.length - 1, Math.max(0, Math.floor((b.fx * (W - 80)) / COL)));
        // slump: roll toward a lower neighbour while it is much lower
        for (let k = 0; k < 6; k++) {
          const l = c > 0 ? cols[c - 1] : Infinity;
          const rr = c < cols.length - 1 ? cols[c + 1] : Infinity;
          const low = Math.min(l, rr);
          if (cols[c] - low < b.size * 1.1) break;
          c = l <= rr ? c - 1 : c + 1;
        }
        // cap the pile: when a column is tall enough, spread to the lowest one instead
        if (cols[c] > H * (H < 500 ? 0.24 : 0.38)) {
          let best = c;
          for (let k = 0; k <= maxC; k++) if (cols[k] < cols[best] - 1) best = k;
          c = best;
        }
        c = Math.min(c, maxC);
        const y = H - 22 - cols[c] - b.size;
        cols[c] += b.size * 1.05;
        return {x: c * COL + (b.fx * 997) % COL * 0.4, y};
      };

      const state = bytes.map((b) => ({...b, ...land(b), cur: -60 - Math.random() * 200, v: 0, done: false}));

      if (reduce) {
        state.forEach((s, i) => {
          const el = spans.current[i];
          if (el) el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rot}deg)`;
        });
        return;
      }

      const t0 = performance.now();
      const step = (now) => {
        if (id !== run.current) return;
        let moving = false;
        state.forEach((s, i) => {
          const el = spans.current[i];
          if (!el || s.done) return;
          if (now - t0 < s.delay) {
            el.style.transform = `translate(${s.x}px, -80px)`;
            moving = true;
            return;
          }
          s.v += 0.9;
          s.cur += s.v;
          if (s.cur >= s.y) {
            s.cur = s.y;
            // one small bounce, then rest
            if (s.v > 6) s.v = -s.v * 0.25;
            else s.done = true;
          }
          if (!s.done) moving = true;
          const spin = s.done ? s.rot : s.rot * Math.min(1, s.cur / Math.max(1, s.y));
          el.style.transform = `translate(${s.x}px, ${s.cur}px) rotate(${spin}deg)`;
        });
        if (moving) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    // Park every byte above the page, out of sight.
    const park = () => {
      parked = true;
      cancelAnimationFrame(raf);
      run.current++;
      spans.current.forEach((el) => el && (el.style.transform = 'translate(0, -80px)'));
    };

    // Fall every time the page is reached; reset once it's left.
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.intersectionRatio >= 0.6 && parked) spill();
        else if (!e.isIntersecting) park();
      },
      {threshold: [0, 0.6]},
    );
    io.observe(box.current);
    const el = box.current;
    el.addEventListener('click', spill);
    // re-settle after the window is resized
    let rt;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => !parked && spill(), 250);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(rt);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      run.current++;
      io.disconnect();
      el.removeEventListener('click', spill);
    };
  }, [count]);

  const bytes = count ? makeBytes(count) : [];
  return (
    <div ref={box} className="spill" aria-hidden="true" title="click to spill again">
      {bytes.map((b, i) => (
        <span
          key={i}
          ref={(el) => (spans.current[i] = el)}
          className={`byte ${b.hot ? 'hot' : `s${b.shade}`}`}
          style={{fontSize: b.size, transform: 'translate(0, -80px)'}}>
          {b.hex}
        </span>
      ))}
    </div>
  );
}
