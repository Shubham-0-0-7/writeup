import React, {useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useColorMode} from '@docusaurus/theme-common';

const MAX_PULL = 34;
// damped swing played on every pull (Web Animations API, so it restarts each time)
const KICK = [
  {transform: 'rotate(0deg)', offset: 0},
  {transform: 'rotate(11deg)', offset: 0.15},
  {transform: 'rotate(-8deg)', offset: 0.35},
  {transform: 'rotate(4deg)', offset: 0.55},
  {transform: 'rotate(-2.5deg)', offset: 0.75},
  {transform: 'rotate(0deg)', offset: 1},
];

/* A pixel hero hanging from a web. Click, tap or drag down to pull:
   the theme flips (dark = Spider-Man, light = Spider-Gwen). */
export default function PullCord() {
  const {colorMode, setColorMode} = useColorMode();
  const light = colorMode === 'light';
  const hero = useBaseUrl(light ? '/img/gwen.svg' : '/img/spidey.svg');
  const [dy, setDy] = useState(0);
  const [held, setHeld] = useState(false);
  const kickRef = useRef(null);
  const start = useRef(null);

  const toggle = () => {
    setColorMode(light ? 'dark' : 'light');
    kickRef.current?.animate(KICK, {duration: 1800, easing: 'cubic-bezier(.3, .6, .4, 1)'});
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
    <div className="cord-kick" ref={kickRef}>
      <div className="cord-swing">
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
