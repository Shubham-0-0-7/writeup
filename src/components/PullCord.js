import React, {useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useColorMode} from '@docusaurus/theme-common';

const MAX_PULL = 34;

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

  const toggle = () => {
    setColorMode(light ? 'dark' : 'light');
    setKick((k) => k + 1);
  };

  const onDown = (e) => {
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
        style={{transform: `translateY(${dy}px)`}}
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
