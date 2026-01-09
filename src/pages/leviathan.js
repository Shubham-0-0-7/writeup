import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Leviathan() {
  return (
    <Layout
      title="Leviathan Writeups"
      description="OverTheWire Leviathan challenge writeups"
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem 1rem",
          textAlign: "left",
        }}
      >
        <h1>Leviathan Writeups</h1>
        <p>
          Explore all levels of OverTheWire Leviathan — complete walkthroughs from
          Level 0 to 3 (more coming soon).
        </p>

        {/* Centered cards container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
            <Link
              to="/writeup/blog/2026/01/09/leviathan0-1"
              className="writeup-card"
            >
            Leviathan 0 to 1
            </Link>

            <Link
              to="/writeup/blog/2026/01/09/leviathan1-2"
              className="writeup-card"
            >
            Leviathan 1 to 2
            </Link>

          
        </div>
      </div>
    </Layout>
  );
}
