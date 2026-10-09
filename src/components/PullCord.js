import React, {useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useColorMode} from '@docusaurus/theme-common';

const MAX_PULL = 34;
const SEEN_KEY = 'cord-pulled';
const FIRST_TUG_MS = 4000;
const REPEAT_TUG_MS = 11000;

const hasPulled = () => {
  try { return window.localStorage.getItem(SEEN_KEY) === '1'; } catch (e) { return false; }
};
const rememberPull = () => {
  try { window.localStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* storage blocked: fine */ }
};

/* A pixel hero hanging from a web. Click, tap or drag down to pull:
   the theme flips (dark = Spider-Man, light = Spider-Gwen). */
export default function PullCord() {
  const {colorMode, setColorMode} = useColorMode();
  const light = colorMode === 'light';
  const hero = useBaseUrl(light ? '/img/gwen.svg' : '/img/spidey.svg');
  const [dy, setDy] = useState(0);
  const [held, setHeld] = useState(false);
  const [kick, setKick] = useState(0);
  const start = useRef(null);
  const idle = useRef(true);   // false once the visitor has touched the cord

  // Hint: until the visitor has pulled once, give the web a small idle tug now and then.
  useEffect(() => {
    if (hasPulled() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    const tug = () => {
      if (!idle.current) return;
      if (!document.hidden) {
        setDy(16);
        timer = setTimeout(() => setDy(0), 260);
      }
      timer = setTimeout(tug, REPEAT_TUG_MS);
    };
    timer = setTimeout(tug, FIRST_TUG_MS);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    idle.current = false;
    rememberPull();
    setColorMode(light ? 'dark' : 'light');
    setKick((k) => k + 1);
  };

  const onDown = (e) => {
    idle.current = false;
    start.current = e.clientY;
    setHeld(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (start.current === null) return;
    setDy(Math.max(0, Math.min(MAX_PULL, e.clientY - start.current)));
  };
  const onUp = () => {
    if (start.current === null) return;
    // a tap or a decent tug both count as a pull
    if (dy < 4 || dy > 14) toggle();
    start.current = null;
    setHeld(false);
    setDy(0);
  };
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={`cord-swing${kick ? ' kicked' : ''}`} key={kick} aria-live="polite">
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
  );
}
