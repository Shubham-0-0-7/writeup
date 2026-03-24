import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function LoveAtFirstBreach() {
  return (
    <Layout
      title="Love at First Breach | TryHackMe CTF"
      description="My writeups and walkthroughs for the TryHackMe Love at First Breach CTF event."
    >
      <div className="subpage-container">
        <h1>Love at First Breach CTF Writeups</h1>
        <p>
          A collection of my writeups and walkthroughs for the TryHackMe "Love at First Breach"
          event, detailing the vulnerabilities exploited, payloads crafted, and the methodologies
          used to capture the flags.
        </p>

        <div className="subpage-cards">
          <Link to="/writeup/blog/2026/02/15/cupids-matchmaker" className="writeup-card">
            Cupid's Matchmaker
          </Link>
          <Link to="/writeup/blog/2026/02/15/tryheartme" className="writeup-card">
            TryHeartMe
          </Link>
          <Link to="/writeup/blog/2026/02/17/whenheartscollide" className="writeup-card">
            When Hearts Collide
          </Link>
        </div>
      </div>
    </Layout>
  );
}