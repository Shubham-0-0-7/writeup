import React from 'react';
import Link from '@docusaurus/Link';
import useGlobalData from '@docusaurus/useGlobalData';

// `dir` is the folder under docs/, `slug` the generated category page.
export const WRITEUPS = [
  {dir: 'bandit', slug: 'bandit', name: 'Bandit', note: 'OverTheWire. Shell, permissions, SSH, the basics done properly.'},
  {dir: 'natas', slug: 'natas', name: 'Natas', note: 'OverTheWire. Web exploitation: source, cookies, HTTP, server-side bugs.'},
  {dir: 'leviathan', slug: 'leviathan', name: 'Leviathan', note: 'OverTheWire. SUID binaries, ltrace/strace, first reversing steps.'},
  {dir: 'linuxprivesc', slug: 'linux-privesc', name: 'Linux PrivEsc', note: 'SUID, sudo, cron, kernel bugs, sloppy services.'},
  {dir: 'pentesting', slug: 'pentesting', name: 'Pentesting', note: 'Web app methodology: recon, mapping, auth, exploitation.'},
  {dir: 'flaws', slug: 'flaws', name: 'flAWS', note: 'flAWS and flAWS2.cloud: leaky S3, IAM mistakes, exposed credentials.'},
  {dir: 'cybersecbasics', slug: 'cybersecurity-basics', name: 'Cybersec Basics', note: 'Networking, packet analysis, SOC workflow, PowerShell, Windows AD.'},
  {dir: 'ctf', slug: 'ctf', name: 'CTF', note: 'TryHackMe Valentine event and other one-offs.'},
  {dir: 'misc', slug: 'miscellaneous', name: 'Miscellaneous', note: 'Protocol internals and other loose ends.'},
];

export function useWriteupCounts() {
  const data = useGlobalData();
  const docs = data['docusaurus-plugin-content-docs']?.default?.versions?.[0]?.docs ?? [];
  const counts = {};
  docs.forEach((d) => {
    const m = /^\/docs\/([^/]+)\//.exec(d.path);
    if (m) counts[m[1]] = (counts[m[1]] || 0) + 1;
  });
  return counts;
}

/* One row per writeup series, with how many notes it holds. Used on the homepage and on /docs. */
export default function WriteupList() {
  const counts = useWriteupCounts();
  return (
    <ul className="lst">
      {WRITEUPS.map((w, i) => (
        <li key={w.dir}>
          <Link className="lst-item" to={`/docs/category/${w.slug}`}>
            <span className="lst-idx">{String(i + 1).padStart(2, '0')}</span>
            <span className="lst-main">
              <span className="lst-title">{w.name}</span>
              <span className="lst-desc">{w.note}</span>
            </span>
            <span className="lst-meta">{counts[w.dir] ? `${counts[w.dir]}` : ''}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
