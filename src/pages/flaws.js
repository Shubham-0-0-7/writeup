import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Flaws() {
  return (
    <Layout
      title="flAWS - Cloud Pentesting"
      description="flAWS challenge writeups on cloud security and AWS misconfigurations"
    >
      <div className="subpage-container">
        <h1>flAWS - Cloud Pentesting</h1>
        <p>
          Explore the writeups for the flAWS challenge — an interactive playground 
          teaching AWS cloud security, common S3 bucket misconfigurations, and IAM policy flaws.
        </p>

        <div className="subpage-cards">
          <Link to="/writeup/blog/2026/06/10/flaws1" className="writeup-card">
            flAWS Level 1 
          </Link>
          <Link to="/writeup/blog/2026/06/10/flaws2" className="writeup-card">
            flAWS Level 2 
          </Link>
          <Link to="/writeup/blog/2026/06/10/flaws3" className="writeup-card">
            flAWS Level 3
          </Link>
          <Link to="/writeup/blog/2026/06/11/flaws4" className="writeup-card">
            flAWS Level 4
          </Link>
          <Link to="/writeup/blog/2026/06/11/flaws5" className="writeup-card">
            flAWS Level 5
          </Link>
          <Link to="/writeup/blog/2026/06/11/flaws6" className="writeup-card">
            flAWS Level 6
          </Link>

        </div>
      </div>
    </Layout>
  );
}
