import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useGlobalData from '@docusaurus/useGlobalData';
import PullCord from '../components/PullCord';

const LINKS = {
  github: 'https://github.com/Shubham-0-0-7',
  linkedin: 'https://linkedin.com/in/shubhchhatbar27',
  discord: 'https://discord.com/users/759047974684327938',
  instagram: 'https://www.instagram.com/7thdimensionartss/',
  email: 'mailto:shubhamchhatbar1@gmail.com',
};

// `dir` is the folder under docs/, `slug` the generated category page.
const WRITEUPS = [
  {dir: 'bandit', slug: 'bandit', name: 'Bandit', note: 'OverTheWire. Shell, permissions, SSH, the basics done properly.'},
  {dir: 'natas', slug: 'natas', name: 'Natas', note: 'OverTheWire. Web exploitation: source, cookies, HTTP, server-side bugs.'},
  {dir: 'leviathan', slug: 'leviathan', name: 'Leviathan', note: 'OverTheWire. SUID binaries, ltrace/strace, first reversing steps.'},
  {dir: 'linuxprivesc', slug: 'linux-privesc', name: 'Linux PrivEsc', note: 'SUID, sudo, cron, kernel bugs, sloppy services.'},
  {dir: 'pentesting', slug: 'pentesting', name: 'Pentesting', note: 'Web app methodology: recon, mapping, auth, exploitation.'},
  {dir: 'flaws', slug: 'flaws', name: 'flAWS', note: 'flAWS and flAWS2.cloud: leaky S3, IAM mistakes, exposed credentials.'},
  {dir: 'cybersecbasics', slug: 'cybersecurity-basics', name: 'Cybersec Basics', note: 'Networking, packet analysis, SOC workflow, PowerShell, Windows AD.'},
  {dir: 'ctf', slug: 'ctf', name: 'CTF', note: 'TryHackMe Valentine event and other one-offs.'},
];

const PROJECTS = [
  {name: 'Prisma OS', year: '2026', status: 'wip', desc: 'A hobby OS from scratch: bootloader, kernel, memory management.', tags: 'c · asm', repo: 'prisma-os'},
  {name: 'Axum Vuln Lab', year: '2026', desc: 'Intentionally vulnerable Rust/Axum web app for practising common web bugs and their fixes.', tags: 'rust · web sec', repo: 'axum_vuln_lab'},
  {name: 'LLM Prompt Injection', year: '2026', desc: 'Testbed for prompt-injection attacks against LLM apps, and defences that hold up.', tags: 'python · ai sec', repo: 'llm_prompt_injection'},
  {name: 'Telnet Honeypot', year: '2026', desc: 'Thread-per-connection Rust honeypot with an explicit state machine. Logs real attacker credentials.', tags: 'rust · networking', repo: 'telnet_honeypot'},
  {name: 'Runtime Decrypted Execution', year: '2026', desc: 'Decrypt-at-runtime pipeline in C: anonymous mmap, RW→RX flips, memory wiping against static analysis.', tags: 'c · memory', repo: 'runtime_decrypted_execution_pipeline'},
  {name: 'HTTP Server in C', year: '2026', desc: 'HTTP/1.0 server treating TCP as a raw byte stream. No heap allocation in the request path.', tags: 'c · sockets', repo: 'http_server_in_c'},
  {name: 'Keylogger in C', year: '2026', desc: 'Reads /dev/input events below X11/Wayland, so it sees terminals, GUIs and TTYs alike.', tags: 'c · linux', repo: 'keylogger_in_c'},
  {name: 'Hexdump in C', year: '2026', desc: 'hexdump(1) rebuilt byte by byte: offsets, hex columns, printable ASCII gutter.', tags: 'c · unix', repo: 'hexdump_in_c'},
  {name: 'Meta Data Remover', year: '2025', desc: 'Strips EXIF from images entirely in the browser. No uploads, no server.', tags: 'js · privacy', repo: 'meta_data_remover'},
  {name: 'Undo / Redo Visualised', year: '2025', desc: 'Manim animation of the two-stack undo/redo model.', tags: 'python · manim', repo: 'undo_redo_visualization'},
  {name: 'Chess in C++', year: '2025', desc: 'Console chess with polymorphic pieces, check/checkmate detection and special moves.', tags: 'c++ · oop', url: 'https://github.com/VekariaNeel/Chess-OOPs-Project'},
];

const ART = [
  ['krishna', 'Krishna & calf'],
  ['henna', 'Radha Krishna\u2019s hands'],
  ['starry', 'Starry Night, after Van Gogh'],
  ['harry', 'Harry'],
  ['thor', 'Thor'],
  ['succulent', 'Succulent'],
  ['catnoir', 'Cat Noir'],
  ['eye', 'Eye study'],
  ['dancer', 'Dancer'],
];

const PALETTE = ['#c82d39', '#e06951', '#f2a93b', '#f5d34a', '#3fb26b', '#22b3c8', '#0a69c5', '#9b4fd0'];

const SKILLS = [
  ['pentesting', 'web app and API pentesting, vulnerability assessment, bug bounty, responsible disclosure, prompt injection and LLM app security'],
  ['learning', 'backend development: Rust (Axum), Python, JS, SQL, REST APIs, auth and sessions'],
  ['tools', 'Burp Suite, Nmap, Wireshark, ffuf, Gobuster, John, Hydra, GDB, Ghidra, IDA, Cutter'],
  ['cloud', 'AWS misconfigurations, S3/IAM abuse (flAWS, flAWS2.cloud)'],
  ['systems', 'Linux internals, eBPF, namespaces, networking, x86/ARM assembly'],
  ['off-keyboard', 'traditional art, photography, chess, rubik\u2019s cube'],
];

function Clock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const tick = () =>
      setT(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span>{t ? `${t} IST` : ' '}</span>;
}

function useWriteupCounts() {
  const data = useGlobalData();
  const docs = data['docusaurus-plugin-content-docs']?.default?.versions?.[0]?.docs ?? [];
  const counts = {};
  docs.forEach((d) => {
    const m = /^\/docs\/([^/]+)\//.exec(d.path);
    if (m) counts[m[1]] = (counts[m[1]] || 0) + 1;
  });
  return counts;
}

function Section({id, title, aside, children}) {
  return (
    <section id={id} className="sec">
      <h2 className="sec-title">
        <span className="sec-hash" aria-hidden>
          #
        </span>
        {title}
        {aside && <span className="sec-aside">{aside}</span>}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  const counts = useWriteupCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <Layout title="Systems & security" description="Shubham Chhatbar: systems programming, offensive security, CTF writeups.">
      <main className="home">
        {/* ---------- hero ---------- */}
        <header className="landing">
          <PullCord />
          <div className="win">
            <div className="win-bar" aria-hidden>
              <span className="win-dot" />
              <span className="win-dot" />
              <span className="win-dot" />
              <span className="win-title">neocipher27@root</span>
            </div>
            <div className="win-body">
              <p className="ln"><span className="ps1">$ </span><span className="cmd">whoami</span></p>
              <h1 className="name">Shubham Chhatbar</h1>
              <p className="ln" style={{marginTop: '0.9rem'}}><span className="ps1">$ </span><span className="cmd">cat role.txt</span></p>
              <p className="ln out">pentester &amp; vulnerability researcher, learning backend</p>
              <p className="ln" style={{marginTop: '0.9rem'}}><span className="ps1">$ </span><span className="cmd">ls focus/</span></p>
              <p className="ln out">vuln-assessment/ pentesting/ bug-bounty/ ai-sec/ cloud/ backend/</p>
              <p className="ln" style={{marginTop: '0.9rem'}}><span className="ps1">$ </span><span className="cmd">ls hobbies/</span></p>
              <p className="ln out">art/ kernel/ reversing/ binexp/ chess/</p>
              <p className="ln" style={{marginTop: '0.9rem'}}><span className="ps1">$ </span><span className="cursor" aria-hidden /></p>
            </div>
          </div>
        </header>

        <section id="about" className="about">
          <p>
            I'm an undergrad CS student who got pulled into systems and security early and never found a good reason
            to leave.
          </p>
          <p>
            It started with C, and then curiosity about what's underneath it. I built things close to the metal: a
            custom HTTP server parsing raw TCP bytes, a honeypot in Rust catching real attackers, tools that talk
            straight to Linux kernel APIs. I got into CTFs, started writing about them, and ended up building and
            hosting a 21-level wargame for 150+ people at my institute.
          </p>
          <p>
            Then things took a turn. I started wondering how websites actually work: what happens between a click and a
            response, who decides what you're allowed to see, and what breaks when someone asks for something the
            developer didn't expect. That pulled me into web app pentesting, and it's what I do most now: hunting bugs,
            reporting them responsibly, and learning backend development so I understand the things I'm trying to break.
            The kernel and reversing side is still there, just more of a hobby these days.
          </p>
          <p>
            When I'm not at a terminal I'm usually drawing. Some of it is <a href="#art">further down</a>. The rest of
            what I solve goes into the <a href="#writeups">writeups</a>, and the code is on{' '}
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
        </section>

        <nav className="quicklinks" aria-label="Elsewhere">
          <Link to="/docs">all writeups</Link>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">github</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">art</a>
          <a href={LINKS.discord} target="_blank" rel="noopener noreferrer">discord</a>
          <a href={LINKS.email}>email</a>
        </nav>

        <p className="whereabouts">
          India <i aria-hidden>&bull;</i> <Clock />
        </p>

        {/* ---------- writeups ---------- */}
        <Section id="writeups" title="writeups" aside={total ? `${total} notes` : null}>
          <p className="sec-lead">
            Walkthroughs of wargames and CTFs, plus study notes. Each series opens to a list of its levels.
          </p>
          <ul className="lst">
            {WRITEUPS.map((w, i) => (
              <li key={w.dir}>
                <Link className="lst-item" to={`/docs/category/${w.slug}`}>
                  <span className="lst-idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="lst-main">
                    <span className="lst-title">{w.name}</span>
                    <span className="lst-desc">{w.note}</span>
                  </span>
                  <span className="lst-meta">{counts[w.dir] ? `${counts[w.dir]}` : ''}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="sec-more">
            <Link to="/docs">browse everything &rarr;</Link>
          </p>
        </Section>

        {/* ---------- projects ---------- */}
        <Section id="projects" title="projects" aside={`${PROJECTS.length} repos`}>
          <ul className="lst">
            {PROJECTS.map((p) => (
              <li key={p.name}>
                <a
                  className="lst-item"
                  href={p.url || `${LINKS.github}/${p.repo}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  <span className="lst-idx">{p.year}</span>
                  <span className="lst-main">
                    <span className="lst-title">
                      {p.name}
                      {p.status && <em className="badge">{p.status}</em>}
                    </span>
                    <span className="lst-desc">{p.desc}</span>
                  </span>
                  <span className="lst-meta">{p.tags}</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------- art ---------- */}
        <Section id="art" title="art">
          <p className="sec-lead">
            Traditional work, made away from the screen. On desktop, hover a tile to resolve it. More on{' '}
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">@7thdimensionartss</a>.
          </p>
          <ul className="gallery">
            {ART.map(([k, label]) => (
              <li key={k}>
                <figure className="tile" tabIndex={0}>
                  <img className="tile-px" src={useBaseUrl(`/img/art/${k}-px.png`)} alt="" aria-hidden="true" />
                  <img className="tile-full" src={useBaseUrl(`/img/art/${k}.jpg`)} alt={label} loading="lazy" />
                  <figcaption>{label}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className="palette" aria-hidden="true">
            {PALETTE.map((c) => (
              <span key={c} className="swatch" style={{background: c}} title={c} />
            ))}
          </div>
        </Section>

        {/* ---------- skills ---------- */}
        <Section id="skills" title="toolbox">
          <dl className="toolbox">
            {SKILLS.map(([k, v]) => (
              <React.Fragment key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </React.Fragment>
            ))}
          </dl>
        </Section>

        <footer className="home-foot">
          <p>
            If you've got a bug, a binary or a weird idea, write to me:{' '}
            <a href={LINKS.email}>shubhamchhatbar1@gmail.com</a>
          </p>
        </footer>
      </main>
    </Layout>
  );
}
