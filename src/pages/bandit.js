import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Bandit() {
  return (
    <Layout
      title="Bandit Writeups"
      description="OverTheWire Bandit challenge writeups"
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem 1rem",
          textAlign: "left",
        }}
      >
        <h1>Bandit Writeups</h1>
        <p>
          Explore all levels of OverTheWire Bandit — complete walkthroughs from
          Level 0 to 17.
        </p>

        {/* Centered cards container */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>

          <Link to="/writeup/blog/2025/10/18/bandit-0-1" className="writeup-card">
            Bandit Level 0 → 1
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-1-2" className="writeup-card">
            Bandit Level 1 → 2
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-2-3" className="writeup-card">
            Bandit Level 2 → 3
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-3-4" className="writeup-card">
            Bandit Level 3 → 4
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-4-5" className="writeup-card">
            Bandit Level 4 → 5
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-5-6" className="writeup-card">
            Bandit Level 5 → 6
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-6-7" className="writeup-card">
            Bandit Level 6 → 7
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-7-8" className="writeup-card">
            Bandit Level 7 → 8
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-passwords" className="writeup-card">
            Bandit Passwords (Complete Dump)
          </Link>

          <Link to="/writeup/blog/2025/10/20/bandit-13-14" className="writeup-card">
            Bandit Level 13 → 14
          </Link>

          <Link to="/writeup/blog/2025/10/20/bandit-14-15" className="writeup-card">
            Bandit Level 14 → 15
          </Link>

          <Link to="/writeup/blog/2025/10/20/bandit-15-16" className="writeup-card">
            Bandit Level 15 → 16
          </Link>

          <Link to="/writeup/blog/2025/10/20/bandit-16-17" className="writeup-card">
            Bandit Level 16 → 17
          </Link>

        </div>
      </div>
    </Layout>
  );
}
