import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function AllWriteups() {
  return (
    <Layout title="All Writeups" description="Cybersecurity writeups and walkthroughs">
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem" }}>
        
        <h1>All Writeups</h1>
        <p style={{ opacity: 0.8, marginBottom: "2rem" }}>
          Explore Bandit, Natas, Linux basics, Windows commands, networking fundamentals,
          shell scripting, web basics, and more.
        </p>

        {/* ⭐ MANUAL LIST OF LINKS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          <Link to="/writeup/blog/2025/10/18/bandit-0-1" className="writeup-card">
            Bandit Level 0 → 1
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-1-2" className="writeup-card">
            Bandit Level 1 → 2
          </Link>

          <Link to="/writeup/blog/2025/10/18/bandit-2-3" className="writeup-card">
            Bandit Level 2 → 3
          </Link>

          <Link to="/writeup/blog/2025/10/23/natas-0" className="writeup-card">
            Natas Level 0
          </Link>

          <Link to="/writeup/blog/2025/10/24/natas-7" className="writeup-card">
            Natas Level 7
          </Link>

          <Link to="/writeup/blog/2025/12/04/networking" className="writeup-card">
            Networking Basics (Dec 2025)
          </Link>

          <Link to="/writeup/blog/2025/11/05/netw-essentials" className="writeup-card">
            Networking Essentials
          </Link>

        </div>

      </div>
    </Layout>
  );
}
