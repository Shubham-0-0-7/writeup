import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function CybersecBasics() {
  return (
    <Layout
      title="Cybersecurity Basics"
      description="Linux, Windows, networking fundamentals, web basics, and scripting writeups"
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem 1rem",
          textAlign: "left",
        }}
      >
        <h1>Cybersecurity Basics</h1>
        <p>
          A curated collection of beginner-friendly foundations — Linux commands, Windows basics,
          networking concepts, web fundamentals, shell scripting, and PowerShell.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {/* Linux Basics */}
          <Link
            to="/writeup/blog/2025/11/05/web-basics"
            className="writeup-card"
          >
            Web Basics (Nov 2025)
          </Link>

          <Link
            to="/writeup/blog/2025/11/04/windowsad"
            className="writeup-card"
          >
            Windows Commands & AD Basics (Nov 2025)
          </Link>

          <Link
            to="/writeup/blog/2025/11/04/powershell"
            className="writeup-card"
          >
            PowerShell Fundamentals (Nov 2025)
          </Link>

          <Link
            to="/writeup/blog/2025/12/04/networking"
            className="writeup-card"
          >
            Networking Essentials (Dec 2025)
          </Link>

          <Link
            to="/writeup/blog/2025/12/06/netw-core-protocols"
            className="writeup-card"
          >
            Networking Core Protocols (Dec 2025)
          </Link>

          <Link
            to="/writeup/blog/2025/12/07/wiresharkbasics"
            className="writeup-card"
          >
            Wireshark Basics
          </Link>
        </div>
      </div>
    </Layout>
  );
}
