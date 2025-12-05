import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Natas() {
  return (
    <Layout
      title="Natas Writeups"
      description="OverTheWire Natas challenge writeups"
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem 1rem",
          textAlign: "left",
        }}
      >
        <h1>Natas Writeups</h1>
        <p>
          Explore all levels of OverTheWire Natas — complete walkthroughs from
          Level 0 to 9 (more coming soon).
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
            to="/writeup/blog/2025/10/23/natas-0"
            className="writeup-card"
          >
            Natas Level 0
          </Link>

          <Link
            to="/writeup/blog/2025/10/23/natas-1"
            className="writeup-card"
          >
            Natas Level 1
          </Link>

          <Link
            to="/writeup/blog/2025/10/24/natas-2"
            className="writeup-card"
          >
            Natas Level 2
          </Link>

          <Link
            to="/writeup/blog/2025/10/24/natas-3"
            className="writeup-card"
          >
            Natas Level 3
          </Link>

          <Link
            to="/writeup/blog/2025/10/24/natas-4"
            className="writeup-card"
          >
            Natas Level 4
          </Link>

          <Link
            to="/writeup/blog/2025/10/24/natas-5"
            className="writeup-card"
          >
            Natas Level 5
          </Link>

          <Link
            to="/writeup/blog/2025/10/24/natas-6"
            className="writeup-card"
          >
            Natas Level 6
          </Link>

          <Link
            to="/writeup/blog/2025/10/24/natas-7"
            className="writeup-card"
          >
            Natas Level 7
          </Link>

          <Link
            to="/writeup/blog/2025/11/06/natas-8"
            className="writeup-card"
          >
            Natas Level 8
          </Link>

          <Link
            to="/writeup/blog/2025/11/06/natas-9"
            className="writeup-card"
          >
            Natas Level 9
          </Link>
        </div>
      </div>
    </Layout>
  );
}
