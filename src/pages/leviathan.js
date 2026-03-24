import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Leviathan() {
  return (
    <Layout
      title="Leviathan Writeups"
      description="OverTheWire Leviathan challenge writeups"
    >
      <div className="subpage-container">
        <h1>Leviathan Writeups</h1>
        <p>
          Explore all levels of OverTheWire Leviathan — complete walkthroughs from
          Level 0 to 3 (more coming soon).
        </p>

        <div className="subpage-cards">
          <Link to="/writeup/blog/2026/01/09/leviathan0-1" className="writeup-card">
            Leviathan 0 to 1
          </Link>
          <Link to="/writeup/blog/2026/01/09/leviathan1-2" className="writeup-card">
            Leviathan 1 to 2
          </Link>
        </div>
      </div>
    </Layout>
  );
}
