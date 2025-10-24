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

// placeholder projects — replace/add items or modify in-place
const PROJECTS = [
  {
    title: "Meta Data Remover",
    year: "2025",
    desc: "A privacy-focused web tool that removes metadata (EXIF data) from images directly in your browser. Your images never leave your device - no uploads, no tracking, no cookies.",
    tags: ["javascript", "cyber", "webdev"],
    repo: "https://github.com/Shubham-0-0-7/meta_data_remover",
  },
  {
    title: "Undo Redo Visualization using Manim",
    year: "2025",
    desc: "A smooth animation demonstrating the Undo-Redo stack mechanism built with Manim library. Visualizes text edits with color-coded stacks and smooth transitions.",
    tags: ["python", "ai", "manim", "stack"],
    repo: "https://github.com/Shubham-0-0-7/undo_redo_visualization",
  },
  {
    title: "Chess",
    year: "2025",
    desc: "A full chess game in C++ using OOP with polymorphic pieces, move validation, check detection, and special moves. Features console based visualization with proper chess rules and game mechanics.",
    tags: ["c++", "cpp", "oop"],
    repo: "https://github.com/VekariaNeel/Chess-OOPs-Project",
  },
];

export default function Home() {
  const [active, setActive] = useState("hero");
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

    return () => observer.disconnect();
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
        {/* HERO */}
        <section id="hero" className="hero-section">
          <div className="bg-layer">
            <div className="stars" />
            <div className="white-blob" />
            <div className="white-blob small" />
          </div>

          <div className="hero-content">
            <div className="hello">Hello, <span className="wave">👋</span> I am</div>
            <h1 className="hero-name">shubham</h1>
            <p className="hero-desc">
{`cybersecurity learner, artist, and math enthusiast.
building, breaking, and creating with logic and design.`}
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

        {/* ABOUT */}
        <section id="about" className="section about-section">
          <div className="page-container">
            <h2 className="section-title">About</h2>
            <p className="lead">
              I'm an undergrad CSE student learning cybersecurity, building projects, and writing about my
              journey. I like drawing, math, capturing beautiful moments through my lens, and making things that are both useful and interesting.
            </p>
            <p className="muted">
              This site is inspired by minimal portfolios — black background, clean typography, and a focus on content.
            </p>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section skills-section">
          <div className="page-container">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              <div className="skill-card">
                <h3>Programming</h3>
                <p>Python, C, C++, JavaScript, Bash</p>
              </div>
              <div className="skill-card">
                <h3>Cybersecurity</h3>
                <p>CTF, forensics, pentesting fundamentals, Linux</p>
              </div>
              <div className="skill-card">
                <h3>Tools</h3>
                <p>git, nmap, wireshark, john the ripper, burp suite</p>
              </div>
              <div className="skill-card">
                <h3>Other</h3>
                <p>drawing, photography, playing chess, solving rubiks cube</p>
              </div>
            </div>
          </div>
        </section>

        {/* WORK */}
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
                    {p.repo && <a className="icon-link" href={p.repo} target="_blank" rel="noopener noreferrer">GitHub</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WRITEUPS (Blog posts) */}
        {/* WRITEUPS SECTION */}
<section id="writeups" className="section writeups-section">
  <div className="page-container">
    <h2 className="section-title">Writeups</h2>
    <p className="lead">
      CTF challenge walkthroughs and OverTheWire solutions:
    </p>

    <div className="writeups-grid">
      {/* Bandit Card */}
      <article className="writeup-card">
        <h3>Bandit</h3>
        <p className="snippet">
          Linux and SSH-based wargame focusing on file permissions, privilege escalation,
          and shell navigation — perfect for beginners.
        </p>
        <div className="project-links">
          <a className="icon-link" href={useBaseUrl("/bandit")}>
            View Bandit Writeups →
          </a>
        </div>
      </article>

      {/* Natas Card */}
      <article className="writeup-card">
        <h3>Natas</h3>
        <p className="snippet">
          Web exploitation series exploring HTML, HTTP, cookies, and scripts — ideal for
          cybersecurity learners diving into web security.
        </p>
        <div className="project-links">
          <a className="icon-link" href={useBaseUrl("/natas")}>
            View Natas Writeups →
          </a>
        </div>
      </article>

      {/* All Writeups Card */}
      <article className="writeup-card">
        <h3>All Writeups</h3>
        <p className="snippet">
          Explore every published writeup — Bandit, Natas, and other challenges,
          organized by date and topic.
        </p>
        <div className="project-links">
          <a className="icon-link" href={useBaseUrl("/allwriteups")}>
            View All Writeups →
          </a>
        </div>
      </article>
    </div>
  </div>
</section>


        {/* CONTACT */}
        <section id="contact" className="section contact-section">
  <div className="page-container">
    <h2 className="section-title">Contact</h2>
    <p className="lead">You can reach me at: <code>shubhamchhatbar1@gmail.com</code></p>
    <div className="contact-actions">
      <a className="button button-primary" href="mailto:shubhamchhatbar1@gmail.com">Email me</a>
      <a className="button button-outline" href="https://github.com/Shubham-0-0-7" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a className="button button-outline" href="https://linkedin.com/in/shubhchhatbar27" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a className="button button-outline" href="https://instagram.com/7thdimensionartss" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a className="button button-outline" href="https://www.facebook.com/shubham.arts.31" target="_blank" rel="noopener noreferrer">Facebook</a>
    </div>
  </div>
</section>
      </main>
    </Layout>
  );
}
