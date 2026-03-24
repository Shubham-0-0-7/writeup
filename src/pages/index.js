import React, { useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useGlobalData from "@docusaurus/useGlobalData";

const SECTIONS = [
  { id: "hero", label: "Home", emoji: "🛸" },
  { id: "about", label: "About", emoji: "🚀" },
  { id: "skills", label: "Skills", emoji: "💻" },
  { id: "work", label: "Work", emoji: "🪐" },
  { id: "writeups", label: "Writeups", emoji: "📝" },
  { id: "contact", label: "Contact", emoji: "📧" },
];

const PROJECTS = [
  {
    title: "Telnet Honeypot",
    year: "2026",
    desc: "Minimal Rust honeypot using a thread-per-connection model and an explicit state machine. Captures attacker credentials and simulates a believable shell — catches real attackers in the wild.",
    tags: ["rust", "networking", "security", "honeypot"],
    repo: "https://github.com/Shubham-0-0-7/telnet_honeypot",
  },
  {
    title: "Runtime Decrypted Execution Pipeline",
    year: "2026",
    desc: "Low-level C implementation of runtime-only code execution using anonymous memory mappings, permission transitions (RW→RX), and memory wiping to resist static analysis.",
    tags: ["c", "kernel", "memory", "security"],
    repo: "https://github.com/Shubham-0-0-7/runtime_decrypted_execution_pipeline",
  },
  {
    title: "HTTP Server in C",
    year: "2026",
    desc: "HTTP/1.0 server in C that treats TCP as a raw byte stream, enforces server-side trust boundaries, and avoids heap allocation in the request path for predictable memory behavior.",
    tags: ["c", "networking", "socket programming"],
    repo: "https://github.com/Shubham-0-0-7/http_server_in_c",
  },
  {
    title: "Keylogger in C",
    year: "2026",
    desc: "Linux kernel-level keylogger using /dev/input event files. Captures all keystrokes at the device layer, below X11/Wayland — works in terminals, GUIs, and TTYs alike.",
    tags: ["c", "linux", "kernel", "security"],
    repo: "https://github.com/Shubham-0-0-7/keylogger_in_c",
  },
  {
    title: "Hexdump in C",
    year: "2026",
    desc: "From-scratch hexdump utility in C that reads raw input byte-by-byte and displays hexadecimal offsets, byte values, and a printable ASCII view — faithful to the classic hexdump tool.",
    tags: ["c", "systems", "unix"],
    repo: "https://github.com/Shubham-0-0-7/hexdump_in_c",
  },
  {
    title: "Meta Data Remover",
    year: "2025",
    desc: "Privacy-focused web tool that removes EXIF metadata from images directly in your browser. No uploads, no tracking, no server — everything happens locally.",
    tags: ["javascript", "privacy", "webdev"],
    repo: "https://github.com/Shubham-0-0-7/meta_data_remover",
  },
  {
    title: "Undo Redo Visualization",
    year: "2025",
    desc: "Smooth Manim animation demonstrating the Undo-Redo stack mechanism. Color-coded stacks, smooth transitions, and a clean visual model of text edit history.",
    tags: ["python", "manim", "animation", "data structures"],
    repo: "https://github.com/Shubham-0-0-7/undo_redo_visualization",
  },
  {
    title: "Chess (C++ OOP)",
    year: "2025",
    desc: "Full chess engine in C++ using polymorphic pieces, move validation, check/checkmate detection, and special moves. Console-based visualization with proper chess rules.",
    tags: ["c++", "oop", "game"],
    repo: "https://github.com/VekariaNeel/Chess-OOPs-Project",
  },
];

export default function Home() {
  const [active, setActive] = useState("hero");
  const [blobY, setBlobY] = useState(0);
  const sectionsRef = useRef({});
  const globalData = useGlobalData();

  const blogPluginData = globalData["docusaurus-plugin-content-blog"];
  const blogPosts =
    blogPluginData?.default?.blogPosts?.map((p) => ({
      title: p.metadata.title,
      permalink: p.metadata.permalink,
      date: p.metadata.date,
      description: p.metadata.description,
    })) || [];

  useEffect(() => {
    SECTIONS.forEach((s) => {
      sectionsRef.current[s.id] = document.getElementById(s.id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: [0.4, 0.6] }
    );

    SECTIONS.forEach((s) => {
      const el = sectionsRef.current[s.id];
      if (el) observer.observe(el);
    });

    // Blob parallax on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setBlobY(scrollY * 0.25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Layout title="Shubham" wrapperClassName="homepage">
      {/* vertical nav */}
      <nav className="vertical-nav" aria-label="Main">
        <ul>
          {SECTIONS.map((s) => (
            <li
              key={s.id}
              className={`nav-item ${active === s.id ? "active" : ""}`}
              onClick={() => scrollToId(s.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") scrollToId(s.id);
              }}
              aria-current={active === s.id ? "true" : "false"}
              title={s.label}
            >
              <span className="emoji">{s.emoji}</span>
              <span className="label">{s.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* page content */}
      <main className="page-root">

        {/* ── HERO ── */}
        <section id="hero" className="hero-section">
          <div className="bg-layer">
            <div className="stars" />
            {/* planet blob — parallax driven by scroll */}
            <div
              className="planet-blob"
              style={{ transform: `translate(-50%, calc(-50% + ${blobY}px))` }}
            />
            <div
              className="planet-blob secondary"
              style={{ transform: `translateY(${blobY * 0.15}px)` }}
            />
          </div>

          <div className="hero-content">
            <div className="hello">Hello, <span className="wave">👋</span> I am</div>
            <h1 className="hero-name">shubham</h1>
            <p className="hero-desc">
              {`systems & security enthusiast. artist. math nerd.
building close to the metal, one exploit at a time.`}
            </p>

            <div className="hero-actions">
              <a className="button button-primary" onClick={() => scrollToId("work")}>projects</a>
              <a className="button button-outline" onClick={() => scrollToId("writeups")}>writeups</a>
            </div>

            <div className="scroll-indicator" aria-hidden>
              <div className="chevron" />
              <div className="chevron" />
              <div className="chevron" />
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="section about-section">
          <div className="page-container">
            <h2 className="section-title">About</h2>
            <p className="about-lead">
              I'm an undergrad CS student who's been deep in the weeds of systems
              and security for as long as I can remember.
            </p>
            <p className="about-body">
              Started with the usual — C, then quickly fell down the rabbit hole of
              how things actually work underneath. Built things close to the metal: a
              custom HTTP server from scratch parsing raw TCP bytes, a honeypot in
              Rust catching real attackers in the wild, utilities that talk directly
              to Linux kernel APIs. Got into CTFs, then started writing about them.
              Somewhere along the way I went from solving wargame levels to building
              and hosting one for 150+ people at my institute.
            </p>
            <p className="about-body">
              The security side pulled me in hard — reverse engineering, binary
              exploitation, privilege escalation, network security. Tools like GDB,
              Ghidra, Wireshark became second nature. Picked up Rust because I
              wanted memory safety without giving up control. Learned assembly because
              I wanted to know what the compiler was hiding from me.
            </p>
            <p className="about-body">
              Now I spend time in the intersection of systems internals and security
              — kernel mechanics, eBPF, namespaces, the stuff that most people treat
              as a black box. Red team and blue team both interest me equally.
            </p>
            <p className="about-tldr">
              TLDR, I know where the bodies are buried, and I probably put them there.
            </p>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="section skills-section">
          <div className="page-container">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              <div className="skill-card">
                <h3>Programming</h3>
                <p>C, Assembly (x86 & ARM), C++, Rust, Python, MySQL, HTML, CSS, JS</p>
              </div>
              <div className="skill-card">
                <h3>Cybersecurity</h3>
                <p>CTF, pentesting, networking, Linux internals, reverse engineering, binary exploitation</p>
              </div>
              <div className="skill-card">
                <h3>Tools</h3>
                <p>GDB, Ghidra, IDA Pro, Rizin/Cutter, Wireshark, Nmap, Burp Suite, John, Hydra, Gobuster</p>
              </div>
              <div className="skill-card">
                <h3>Other</h3>
                <p>drawing, photography, chess, rubik's cube, eBPF, kernel namespaces</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WORK / PROJECTS ── */}
        <section id="work" className="section work-section">
          <div className="page-container">
            <h2 className="section-title">Work / Projects</h2>
            <div className="projects-grid">
              {PROJECTS.map((p, idx) => (
                <article className="project-card" key={idx}>
                  <small className="year">{p.year}</small>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <div className="project-links">
                    {p.repo && (
                      <a className="icon-link" href={p.repo} target="_blank" rel="noopener noreferrer">
                        GitHub →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── WRITEUPS ── */}
        <section id="writeups" className="section writeups-section">
          <div className="page-container">
            <h2 className="section-title">Writeups</h2>
            <p className="lead">CTF walkthroughs, OverTheWire solutions, and pentesting notes:</p>

            <div className="writeups-grid">

              <article className="writeup-card">
                <h3>Bandit</h3>
                <p className="snippet">
                  Linux and SSH-based wargame — file permissions, privilege escalation, shell navigation
                </p>
                <div className="project-links">
                  <a className="icon-link" href={useBaseUrl("/bandit")}>View Bandit Writeups →</a>
                </div>
              </article>

              <article className="writeup-card">
                <h3>Natas</h3>
                <p className="snippet">
                  Web exploitation series — HTML source, HTTP, cookies, server-side scripting
                </p>
                <div className="project-links">
                  <a className="icon-link" href={useBaseUrl("/natas")}>View Natas Writeups →</a>
                </div>
              </article>

              <article className="writeup-card">
                <h3>Leviathan</h3>
                <p className="snippet">
                  Reverse engineering series — binaries, SUID permissions, ltrace / strace debugging
                </p>
                <div className="project-links">
                  <a className="icon-link" href={useBaseUrl("/leviathan")}>View Leviathan Writeups →</a>
                </div>
              </article>

              <article className="writeup-card">
                <h3>Linux Privilege Escalation</h3>
                <p className="snippet">
                  SUID binaries, sudo rights, cron jobs, kernel exploits and misconfigured services
                </p>
                <div className="project-links">
                  <a className="icon-link" href={useBaseUrl("/linuxpriv")}>View Linux PrivEsc →</a>
                </div>
              </article>

              <article className="writeup-card">
                <h3>Pentesting</h3>
                <p className="snippet">
                  Web app pentesting methodology — recon, application mapping, auth analysis, exploitation
                </p>
                <div className="project-links">
                  <a className="icon-link" href={useBaseUrl("/pentesting")}>View Pentesting Writeups →</a>
                </div>
              </article>

              <article className="writeup-card">
                <h3>Cybersecurity Basics</h3>
                <p className="snippet">
                  Linux commands, Windows fundamentals, PowerShell, networking, packet analysis
                </p>
                <div className="project-links">
                  <a className="icon-link" href={useBaseUrl("/cybersecbasics")}>View Cybersec Basics →</a>
                </div>
              </article>

              <article className="writeup-card">
                <h3>Love at First Breach</h3>
                <p className="snippet">
                  TryHackMe Valentine's CTF — Cupid's matchmaker, TryHeartMe, ValenFind and more
                </p>
                <div className="project-links">
                  <a className="icon-link" href={useBaseUrl("/lovethm")}>View CTF Writeups →</a>
                </div>
              </article>

              <article className="writeup-card">
                <h3>All Writeups</h3>
                <p className="snippet">
                  Every published writeup — Bandit, Natas, and beyond, sorted by date and topic
                </p>
                <div className="project-links">
                  <a className="icon-link" href={useBaseUrl("/allwriteups")}>View All Writeups →</a>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section contact-section">
          <div className="contact-split-container">
            <h2 className="contact-heading">Contact</h2>
            <p className="contact-subtext">Feel free to contact me for anything~</p>

            <div className="contact-split">
              <div className="contact-left">
                <div className="contact-avatar">
                  <img src={useBaseUrl("/img/mac.png")} alt="Avatar" />
                </div>
              </div>

              <div className="contact-right">
                <div className="contact-links-row">
                  <a href="https://github.com/Shubham-0-0-7" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" /></svg>
                    <span>Shubham-0-0-7</span>
                  </a>
                  <a href="https://discord.com/users/759047974684327938" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.946 2.4189-2.1568 2.4189z"/></svg>
                    <span>neocipher27</span>
                  </a>
                  <a href="https://linkedin.com/in/shubhchhatbar27" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.55V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
                    <span>Shubham</span>
                  </a>
                </div>

                <div className="contact-email">
                  <a href="mailto:shubhamchhatbar1@gmail.com" className="contact-email-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                    <span>shubhamchhatbar1@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
