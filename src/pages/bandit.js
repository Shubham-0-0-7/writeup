import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Bandit() {
  return (
    <Layout title="Bandit Writeups" description="OverTheWire Bandit challenge writeups">
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Bandit Writeups</h1>
        <p>Complete walkthroughs of OverTheWire Bandit challenges</p>
        {/* We'll add dynamic content here later */}
        <Link to="/blog/tags/bandit" className="button button--primary">
          View All Bandit Writeups
        </Link>
      </main>
    </Layout>
  );
}