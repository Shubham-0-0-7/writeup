import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function LinuxPrivEsc() {
  return (
    <Layout
      title="Linux Privilege Escalation"
      description="Linux Privilege Escalation techniques and writeups"
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem 1rem",
          textAlign: "left",
        }}
      >
        <h1>Linux Privilege Escalation</h1>
        <p>
          Explore various techniques for escalating privileges on Linux systems — 
          from SUID binaries and Sudo rights to Kernel exploits and misconfigurations.
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
            {/* <Link
              to="/writeup/blog/2026/"
              className="writeup-card"
            >
            What is Linux Privilege Escalation?
            </Link> */}
        </div>
      </div>
    </Layout>
  );
}