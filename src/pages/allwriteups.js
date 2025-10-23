import React from "react";
import Layout from "@theme/Layout";
import useGlobalData from "@docusaurus/useGlobalData";
import Link from "@docusaurus/Link";

export default function AllWriteups() {
  const globalData = useGlobalData();
  const blogData = globalData["docusaurus-plugin-content-blog"]?.default?.blogPosts || [];

  const sortedPosts = blogData.sort(
    (a, b) => new Date(b.metadata.date) - new Date(a.metadata.date)
  );

  return (
    <Layout title="All Writeups" description="All OverTheWire and CTF writeups">
      <div className="writeups-container">
        <main className="writeups-main">
          <h1>All Writeups</h1>
          <p>Browse every CTF or OverTheWire writeup — Bandit, Natas, and more.</p>

          {sortedPosts.map((post) => (
            <Link key={post.metadata.permalink} to={post.metadata.permalink} className="writeup-card">
              <h3>{post.metadata.title}</h3>
              <small>{post.metadata.date}</small>
              <p>{post.metadata.description}</p>
            </Link>
          ))}
        </main>

        <aside className="writeups-sidebar">
          <h3>Quick Access</h3>
          <Link to="/bandit">Bandit Writeups</Link>
          <Link to="/natas">Natas Writeups</Link>
          <Link className="view-all" to="/blog">→ Blog Home</Link>
        </aside>
      </div>
    </Layout>
  );
}
