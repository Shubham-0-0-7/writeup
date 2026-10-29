import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';

const START = {method: 'GET', path: '/whoami', role: 'guest', note: ''};
const PATHS = ['/whoami', '/projects', '/writeups', '/art'];
const FOLLOW_MS = 1500;

// What the "server" says back. Order matters: the more interesting tamper wins.
function respond(r) {
  const p = r.path.trim().toLowerCase();
  const all = `${p} ${r.role} ${r.note}`.toLowerCase();

  if (/<script|' or|" or|1=1|union\s+select|\{\{|\$\{/.test(all))
    return {code: '418 I’m a Teapot', hint: 'nice reflexes', body: 'Payload spotted. Respect.\nI brew tea, not injections. But you clearly read the docs.'};
  if (p.includes('..') || p.includes('passwd'))
    return {code: '200 OK', hint: 'path traversal, classic', body: 'root:x:0:0:shubham:/home/pencil:/bin/draw\nneocipher27:x:1000:1000::/home/burp:/bin/curious\n\n(you found the hidden door. most people never touch the path.)'};
  if (r.method === 'DELETE')
    return {code: '405 Method Not Allowed', hint: 'Allow: GET, POST', body: 'You can’t delete me. I’ve tried.'};
  if (r.role.trim().toLowerCase() === 'admin')
    return {code: '200 OK', hint: 'broken access control', body: 'Welcome, admin.\nYou just did what I do for a living: changed one value the developer trusted.\nThat’s most of web security, honestly.'};
  if (p === '/art' || p === '/art/') return {code: '302 Found', hint: 'the quiet room', body: 'Location: /art', to: '/art'};
  if (p.startsWith('/project')) return {code: '302 Found', hint: 'follow it', body: 'Location: /projects', to: '#projects'};
  if (p.startsWith('/writeup') || p.startsWith('/docs')) return {code: '302 Found', hint: 'follow it', body: 'Location: /writeups', to: '#writeups'};
  if (p.startsWith('/finding')) return {code: '302 Found', hint: 'follow it', body: 'Location: /findings', to: '#findings'};
  if (p === '/whoami' || p === '/' || p === '/shubham-chhatbar')
    return {code: '200 OK', hint: 'try role=admin', body: 'CS undergrad. Started with C and kept asking what’s underneath: raw TCP, a Rust honeypot, kernel APIs.\nThen I wondered what happens between a click and a response, and who decides what you’re allowed to see.\nNow I hunt bugs in web apps and report them before someone worse finds them.'};
  return {code: '404 Not Found', hint: 'enumerate harder', body: `Nothing at ${r.path || '(empty path)'}.\nTry ${PATHS.join(', ')}. Or tamper with the cookie.`};
}

export default function Intercept() {
  const history = useHistory();
  const [req, setReq] = useState(START);
  const [res, setRes] = useState(null);
  const [sent, setSent] = useState(0);
  const timer = useRef(null);
  const set = (k) => (e) => setReq({...req, [k]: e.target.value});

  const cancel = () => clearTimeout(timer.current);
  useEffect(() => cancel, []);

  // Follow a redirect the way a browser would: to a section on this page, or to another page.
  const follow = (to) => {
    cancel();
    if (to.startsWith('#')) document.querySelector(to)?.scrollIntoView({behavior: 'smooth'});
    else history.push(to);
  };

  const forward = (e) => {
    e.preventDefault();
    cancel();
    const r = respond(req);
    setRes(r);
    setSent((n) => n + 1);
    if (r.to) timer.current = setTimeout(() => follow(r.to), FOLLOW_MS);
  };
  const drop = () => {
    cancel();
    setReq(START);
    setRes(null);
  };

  return (
    <div className="icpt">
      <form className="icpt-req" onSubmit={forward} aria-label="Request">
        <span className="eyebrow">request</span>
        <div className="icpt-line">
          <label className="icpt-field">
            <span>method</span>
            <select value={req.method} onChange={set('method')}>
              {['GET', 'POST', 'PUT', 'DELETE'].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label className="icpt-field icpt-grow">
            <span>path</span>
            <input value={req.path} onChange={set('path')} spellCheck={false} autoComplete="off" />
          </label>
          <span className="icpt-proto">HTTP/1.1</span>
        </div>
        <div className="icpt-paths" role="group" aria-label="Pick a path">
          {PATHS.map((p) => (
            <button
              key={p}
              type="button"
              className={req.path === p ? 'is-on' : ''}
              aria-pressed={req.path === p}
              onClick={() => setReq({...req, path: p})}>
              {p}
            </button>
          ))}
        </div>
        <div className="icpt-headers">
          <span>Host: shubhamchhatbar.in</span>
          <span>User-Agent: you (curious)</span>
          <label className="icpt-inline">
            Cookie: role=
            <input value={req.role} onChange={set('role')} spellCheck={false} autoComplete="off" />
          </label>
          <label className="icpt-inline">
            X-Note:
            <input value={req.note} onChange={set('note')} spellCheck={false} autoComplete="off" placeholder="anything" />
          </label>
        </div>
        <div className="icpt-actions">
          <button type="submit" className="btn-solid">Forward</button>
          <button type="button" className="btn-ghost" onClick={drop}>Drop</button>
        </div>
      </form>

      <section className="icpt-res" aria-label="Response" aria-live="polite">
        <span className="eyebrow">response</span>
        {!res ? (
          <p className="icpt-wait">nothing sent yet. the request is waiting for you.</p>
        ) : (
          <>
            <div className={`icpt-status ${res.code.startsWith('2') || res.code.startsWith('3') ? '' : 'is-err'}`}>{res.code}</div>
            <div className="icpt-resh">
              <span>Server: neocipher27</span>
              <span>X-Hint: {res.hint}</span>
            </div>
            <p className="icpt-body">{res.body}</p>
            {res.to && (
              <p className="icpt-follow">
                <span key={sent} className="icpt-bar" aria-hidden="true" />
                following redirect…{' '}
                {res.to.startsWith('#') ? (
                  <a href={res.to} onClick={(e) => (e.preventDefault(), follow(res.to))}>
                    go now →
                  </a>
                ) : (
                  <Link to={res.to} onClick={cancel}>
                    go now →
                  </Link>
                )}
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
