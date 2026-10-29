import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

const ART = [
  ['starry', 'Starry Night, after Van Gogh'],
  ['krishna', 'Krishna & calf'],
  ['henna', 'Radha Krishna’s hands'],
  ['harry', 'Harry'],
];

function Piece({k, label}) {
  return (
    <figure className="piece">
      <img src={useBaseUrl(`/img/art/${k}.jpg`)} alt={label} loading="lazy" />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export default function Art() {
  return (
    <Layout title="Art" description="Traditional art by Shubham Chhatbar, made away from the screen.">
      <main className="artroom">
        <div className="rule">
          <span className="prompt">
            <span className="p-host">shubham@chhatbar</span>:<span className="p-host">~</span>$ <span className="p-cmd">ls art/</span>
          </span>
          <span>
            <Link to="/">← back</Link> ·{' '}
            <a href="https://www.instagram.com/7thdimensionartss/" target="_blank" rel="noopener noreferrer">
              @7thdimensionartss ↗
            </a>
          </span>
        </div>
        <div className="art-head">
          <h1 className="h-xxl">
            Away from
            <br />
            the screen.
          </h1>
          <p>
            I've drawn since I could hold a pencil. Same habit as hunting bugs, really: noticing the detail everyone
            else walks past.
          </p>
        </div>
        <div className="art-grid">
          {ART.map(([k, label]) => (
            <Piece key={k} k={k} label={label} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
