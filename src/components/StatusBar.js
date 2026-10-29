import React, {useEffect, useState} from 'react';

// tmux-style window list: one window per page of the home screen.
const WIN = [
  ['top', 'hero'],
  ['intercept', 'request'],
  ['findings', 'findings'],
  ['writeups', 'writeups'],
  ['projects', 'projects'],
  ['contact', 'contact'],
];

export default function StatusBar({clock, mood}) {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      {rootMargin: '-45% 0px -45% 0px'},
    );
    WIN.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="statusbar" aria-label="Pages">
      <span className="sb-sess">[shubham]</span>
      <span className="sb-wins">
        {WIN.map(([id, name], i) => (
          <a key={id} href={`#${id}`} className={active === id ? 'is-on' : ''} aria-current={active === id ? 'true' : undefined}>
            {i}:{name}
          </a>
        ))}
      </span>
      <span className="sb-right">
        <span className="sb-mood">{mood}</span>
        <span>{clock ? `Mumbai ${clock} IST` : 'Mumbai IST'}</span>
      </span>
    </nav>
  );
}
