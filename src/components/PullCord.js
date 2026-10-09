import React, {useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useColorMode} from '@docusaurus/theme-common';

const MAX_PULL = 34;      // px the web stretches when pulled
const MAX_TILT = 16;      // deg you can drag him sideways
const OMEGA = 2.0;        // rad/s, natural sway (~3.1s per swing)
const DAMPING = 0.55;     // 1/s, how fast a swing dies out
const rand = (a, b) => a + Math.random() * (b - a);

/* A pixel hero hanging from a web, driven by a small pendulum simulation.
   Drag him down and sideways, tap him, or press Enter: the theme flips
   (dark = Spider-Man, light = Spider-Gwen) and he swings off wherever you sent him. */
export default function PullCord() {
  const {colorMode, setColorMode} = useColorMode();
  const light = colorMode === 'light';
  const hero = useBaseUrl(light ? '/img/gwen.svg' : '/img/spidey.svg');
  const [dy, setDy] = useState(0);
  const [held, setHeld] = useState(false);

  const swingEl = useRef(null);
  const sim = useRef({a: rand(-3, 3), w: 0, held: false, target: 0, nextNudge: 0, ambient: true});
  const start = useRef(null);

  // pendulum loop: a'' = -OMEGA^2 a - 2 DAMPING a'; writes the angle straight to the DOM
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    sim.current.ambient = !reduce.matches;
    const onChange = () => { sim.current.ambient = !reduce.matches; };
    reduce.addEventListener?.('change', onChange);

    let raf;
    let last = performance.now();
    const step = (now) => {
      const s = sim.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (s.held) {
        // follow the pointer, keeping the velocity so release carries on smoothly
        const next = s.a + (s.target - s.a) * Math.min(1, dt * 14);
        s.w = dt > 0 ? (next - s.a) / dt : 0;
        s.a = next;
      } else {
        s.w += (-OMEGA * OMEGA * s.a - 2 * DAMPING * s.w) * dt;
        s.a += s.w * dt;
        // keep a gentle sway alive with small random nudges, different every time
        if (s.ambient && now > s.nextNudge && Math.abs(s.a) + Math.abs(s.w) < 6) {
          s.w += (Math.random() < 0.5 ? -1 : 1) * rand(6, 11);
          s.nextNudge = now + rand(1800, 4200);
        }
      }
      if (swingEl.current) swingEl.current.style.transform = `rotate(${s.a.toFixed(2)}deg)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      reduce.removeEventListener?.('change', onChange);
    };
  }, []);

  const toggle = () => setColorMode(light ? 'dark' : 'light');
  const shove = (dir) => { sim.current.w += dir * rand(20, 32); };   // sets him swinging

  const onDown = (e) => {
    start.current = {x: e.clientX, y: e.clientY};
    sim.current.held = true;
    sim.current.target = sim.current.a;
    setHeld(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!start.current) return;
    const mx = e.clientX - start.current.x;
    const my = e.clientY - start.current.y;
    setDy(Math.max(0, Math.min(MAX_PULL, my)));
    sim.current.target = Math.max(-MAX_TILT, Math.min(MAX_TILT, -mx * 0.22));   // drag right -> swings right
  };
  const onUp = () => {
    if (!start.current) return;
    const pulledDown = dy > 14;
    const tapped = dy < 4 && Math.abs(sim.current.target - sim.current.a) < 2 && Math.abs(sim.current.target) < 2;
    start.current = null;
    sim.current.held = false;
    setHeld(false);
    setDy(0);
    if (pulledDown || tapped) {
      toggle();
      if (tapped) shove(Math.random() < 0.5 ? -1 : 1);   // a tap has no direction of its own
      else shove(Math.sign(sim.current.w) || (Math.random() < 0.5 ? -1 : 1));
    }
  };
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
      shove(Math.random() < 0.5 ? -1 : 1);
    }
  };

  return (
    <div className="cord-kick">
      <div className="cord-swing" ref={swingEl}>
        <button
          type="button"
          className={`cord${held ? ' held' : ''}`}
          style={{'--pull': `${dy}px`}}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={onKey}
          aria-label={light ? 'Pull the web to switch to the dark theme' : 'Pull the web to switch to the light theme'}
          aria-pressed={light}>
          <span className="cord-line" aria-hidden />
          <img className="cord-hero" src={hero} alt="" draggable="false" />
        </button>
      </div>
    </div>
  );
}
