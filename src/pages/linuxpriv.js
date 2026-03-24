import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function LinuxPrivEsc() {
  return (
    <Layout
      title="Linux Privilege Escalation"
      description="Linux Privilege Escalation techniques and writeups"
    >
      <div className="subpage-container">
        <h1>Linux Privilege Escalation</h1>
        <p>
          Explore various techniques for escalating privileges on Linux systems —
          from SUID binaries and Sudo rights to Kernel exploits and misconfigurations.
        </p>

        <div className="subpage-cards">
          <Link to="/writeup/blog/2026/01/30/linuxprivesc" className="writeup-card">
            What is Linux Privilege Escalation?
          </Link>
        </div>
      </div>
    </Layout>
  );
}