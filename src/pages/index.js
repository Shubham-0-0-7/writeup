import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Intercept from '../components/Intercept';
import ByteSpill from '../components/ByteSpill';
import R2Pane from '../components/R2Pane';
import StatusBar from '../components/StatusBar';
import {WRITEUPS, useWriteupCounts} from '../components/WriteupList';

const LINKS = {
  github: 'https://github.com/Shubham-0-0-7',
  linkedin: 'https://linkedin.com/in/shubhchhatbar27',
  instagram: 'https://www.instagram.com/7thdimensionartss/',
  email: 'shubhamchhatbar1@gmail.com',
};

// Named only where an advisory is public. Everything else stays anonymous by platform type.
const FINDINGS = [
  {
    target: 'Monkeytype',
    what: 'Pwn Request: a pull_request_target workflow ran an untrusted fork\u2019s binary with a contents:write token. Code execution, token exfiltration.',
    id: 'GHSA-47v3-j88w-92f8',
    cve: 'CVE-2026-118762',
    writeup: '/docs/pentesting/monkeytype-pwn-request',
    url: 'https://github.com/monkeytypegame/monkeytype/security/advisories/GHSA-47v3-j88w-92f8',
    sev: 'critical · 9.3',
  },
  {
    target: 'mixpeek/amux',
    what: 'Default-scoped invites inherited Global access, bypassing authorization for unrestricted host filesystem read/write via /api/fs/*.',
    id: 'GHSA-7888-pcwc-x87h',
    url: 'https://github.com/Shubham-0-0-7/amux/security/advisories/GHSA-7888-pcwc-x87h',
    sev: 'high',
  },
  {target: 'a fintech platform', anon: true, what: 'Unauthenticated mass user enumeration through an IDOR.', id: 'coordinated disclosure', sev: 'p2'},
  {target: 'a web3 grants platform', anon: true, what: 'Open redirect.', id: 'coordinated disclosure', sev: ''},
];

const PROJECTS = [
  {name: 'cryptaudit', what: 'crypto API misuse in Rust', tag: 'wip', repo: 'cryptaudit'},
  {name: 'Search Engine', what: 'crawler + BM25 in Rust', tag: 'wip', repo: 'search-engine'},
  {name: 'Prisma OS', what: 'bootloader to kernel', tag: 'wip', repo: 'prismos'},
  {name: 'Axum Vuln Lab', what: 'vulnerable Rust app, with fixes', tag: 'rust', repo: 'axum_vuln_lab'},
  {name: 'LLM Prompt Injection', what: 'attacks and defences', tag: 'ai sec', repo: 'llm_prompt_injection'},
  {name: 'Telnet Honeypot', what: 'logs real attacker creds', tag: 'rust', repo: 'telnet_honeypot'},
  {name: 'Runtime Decrypted Exec', what: 'mmap, RW to RX flips', tag: 'c', repo: 'runtime_decrypted_execution_pipeline'},
  {name: 'HTTP Server in C', what: 'TCP as raw bytes', tag: 'c', repo: 'http_server_in_c'},
  {name: 'Keylogger in C', what: 'reads /dev/input', tag: 'c', repo: 'keylogger_in_c'},
  {name: 'Hexdump in C', what: 'hexdump(1), byte by byte', tag: 'c', repo: 'hexdump_in_c'},
  {name: 'Meta Data Remover', what: 'EXIF stripped in-browser', tag: 'js', repo: 'meta_data_remover'},
  {name: 'Undo / Redo Visualised', what: 'two stacks, in Manim', tag: 'python', repo: 'undo_redo_visualization'},
  {name: 'Chess in C++', what: 'check, mate, en passant', tag: 'c++', url: 'https://github.com/VekariaNeel/Chess-OOPs-Project'},
  {name: 'my_alloc', what: 'malloc: free list, coalescing, slabs', tag: 'c', repo: 'my_alloc_in_c'},
];

function useIST() {
  const [t, setT] = useState(null);
  useEffect(() => {
    const tick = () =>
      setT(new Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata'}).format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function mood(t) {
  if (!t) return '';
  const h = Number(t.slice(0, 2));
  if (h >= 1 && h < 6) return 'yes, he is probably still awake';
  if (h < 12) return 'morning shift';
  return 'probably in Burp right now';
}

function Prompt({cmd, path = '~'}) {
  return (
    <span className="prompt">
      <span className="p-host">shubham@chhatbar</span>:<span className="p-host">{path}</span>$ <span className="p-cmd">{cmd}</span>
    </span>
  );
}

function Rule({cmd, path, status}) {
  return (
    <div className="rule">
      <Prompt cmd={cmd} path={path} />
      <span>{status}</span>
    </div>
  );
}

export default function Home() {
  const t = useIST();
  const counts = useWriteupCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const series = [...WRITEUPS].sort((a, b) => (counts[b.dir] || 0) - (counts[a.dir] || 0));

  return (
    <Layout title="Pentester & bug hunter" description="Shubham Chhatbar: web app pentesting, bug bounty findings, CTF writeups.">
      <main className="journey">
        {/* ---------- hero ---------- */}
        <section className="screen landing" id="top">
          <div className="hero-grid">
            <div className="hero-left">
              <Prompt cmd="whoami" />
              <h1 className="hero-name">
                Shubham
                <br />
                Chhatbar
              </h1>
              <p className="hero-line">
                I break web apps and report them before someone else does. Pentester, bug hunter, still curious about
                what's underneath.
              </p>
              <a className="forward" href="#intercept">
                scroll to forward ↓
              </a>
            </div>
            <R2Pane />
          </div>
        </section>

        {/* ---------- intercept ---------- */}
        <section className="screen" id="intercept">
          <Rule cmd="burp --intercept" status="1 request held" />
          <div className="screen-head">
            <h2 className="h-section">Your request is on hold.</h2>
            <span className="dim">change anything. then forward.</span>
          </div>
          <Intercept />
          <div className="screen-foot">
            <span>or tamper: role=admin · ../../etc/passwd · DELETE · a payload in X-Note</span>
            <a href="#findings">or just keep scrolling ↓</a>
          </div>
        </section>

        {/* ---------- findings ---------- */}
        <section className="screen" id="findings">
          <Rule cmd="cat findings.log" status="GET /findings → 200 OK" />
          <h2 className="h-section">
            Things I found <span className="muted">before someone else did.</span>
          </h2>
          <ol className="rows findings">
            {FINDINGS.map((f) => (
              <li key={f.target}>
                <span className={`f-target ${f.anon ? 'is-anon' : ''}`}>{f.target}</span>
                <span className="f-what">{f.what}</span>
                <span className="f-id">
                  {f.url ? (
                    <a href={f.url} target="_blank" rel="noopener noreferrer">
                      {f.cve && <span className="f-cve">{f.cve}</span>}
                      {f.id} ↗
                    </a>
                  ) : (
                    f.id
                  )}
                  {f.writeup && (
                    <Link className="f-write" to={f.writeup}>
                      read the writeup →
                    </Link>
                  )}
                </span>
                <span className="f-sev">{f.sev}</span>
              </li>
            ))}
            <li className="redacted">
              <span className="f-target" aria-label="redacted">
                ███████
              </span>
              <span className="f-what">An authorization bypass, a cross-user session-termination IDOR, permissive CORS leaking data. And counting.</span>
              <span className="f-id">names withheld</span>
              <span className="f-sev" />
            </li>
          </ol>
        </section>

        {/* ---------- writeups ---------- */}
        <section className="screen" id="writeups">
          <Rule cmd="ls -l writeups/" status={`GET /writeups → 200 OK`} />
          <div className="ls">
            <p className="ls-total">total {total}</p>
            <ul className="rows series">
              {series.map((w) => (
                <li key={w.dir}>
                  <span className="s-perm" aria-hidden="true">drwxr-xr-x</span>
                  <span className="s-n">{String(counts[w.dir] || 0).padStart(2, '0')}</span>
                  <Link to={`/docs/category/${w.slug}`}>{w.name}/</Link>
                  <span className="s-what">{w.short}</span>
                </li>
              ))}
            </ul>
            <p className="ls-more">
              <Link to="/docs">browse everything →</Link>
            </p>
          </div>
        </section>

        {/* ---------- projects ---------- */}
        <section className="screen" id="projects">
          <Rule cmd="ls ~/projects" status={`${PROJECTS.length} repos`} />
          <h2 className="h-section">
            Built to understand <span className="muted">what I break.</span>
          </h2>
          <ul className="rows projects">
            {PROJECTS.map((p) => (
              <li key={p.name}>
                <a href={p.url || `${LINKS.github}/${p.repo}`} target="_blank" rel="noopener noreferrer">
                  {p.name}
                </a>
                <span className="p-what">{p.what}</span>
                <span className={`p-tag ${p.tag === 'wip' ? 'is-wip' : ''}`}>{p.tag}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- contact + bytes ---------- */}
        <section className="screen contact" id="contact">
          <Rule cmd="curl -i shubhamchhatbar.in/contact" status="Connection: close" />
          <ByteSpill />
          <div className="contact-body">
            <span className="dim">that was the whole response. if you got this far:</span>
            <a className="mail" href={`mailto:${LINKS.email}`}>
              shubhamchhatbar1
              <br />
              @gmail.com
            </a>
            <nav className="contact-links" aria-label="Elsewhere">
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">github</a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
              <Link to="/art">art ↗</Link>
            </nav>
            <span className="dim2">the bytes below spell my email. go on, decode them.</span>
          </div>
        </section>
      </main>
      <StatusBar clock={t} mood={mood(t)} />
    </Layout>
  );
}
