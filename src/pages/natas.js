import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Natas() {
  return (
    <Layout title="Natas Writeups" description="OverTheWire Natas challenge writeups">
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Natas Writeups</h1>
        <p>Complete walkthroughs of OverTheWire Natas web challenges</p>
        <Link to="/blog/tags/natas" className="button button--primary">
          View All Natas Writeups
        </Link>
      </main>
    </Layout>
  );
}