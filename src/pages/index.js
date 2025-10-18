import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout
      title="Cybersecurity Writeups"
      description="Bandit, Natas, and cybersecurity challenge writeups">
      <main style={{padding: '2rem', textAlign: 'center'}}>
        <h1>Welcome to My Cybersecurity Blog</h1>
        <p>Writeups, tutorials, and notes from my cybersecurity learning journey</p>
        
        <div style={{marginTop: '2rem'}}>
          <Link
            className="button button--primary button--lg"
            to="/blog">
            View All Writeups
          </Link>
        </div>

        <div style={{marginTop: '3rem'}}>
          <h2>Categories</h2>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link className="button button--outline button--secondary" to="/blog/tags/bandit">
              Bandit Writeups
            </Link>
            <Link className="button button--outline button--secondary" to="/blog/tags/natas">
              Natas Writeups
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}