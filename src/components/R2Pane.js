import React from 'react';

/*
 * A real radare2 session over the 512-byte boot sector of PrismOS (main.bin),
 * the part where the CPU leaves 16-bit real mode. Every address, byte and
 * mnemonic below is verbatim `r2` output (r2 -a x86 -b 16 -m 0x7c00 main.bin).
 * Only the `;` comments are mine, the way you annotate in r2.
 */
const LINES = [
  {t: 'sh', text: 'r2 -a x86 -b 16 -m 0x7c00 main.bin'},
  {t: 'r2', text: 'pd 6 @ 0x7cfc'},
  {t: 'cmt', text: '; switch_to_pm: the last 16-bit instructions'},
  {t: 'i', a: '0000:7cfc', b: 'fa', m: 'cli'},
  {t: 'i', a: '0000:7cfd', b: '0f0116f67c', m: 'lgdt [0x7cf6]', c: 'my hand-written GDT'},
  {t: 'i', a: '0000:7d02', b: '0f20c0', m: 'mov eax, cr0'},
  {t: 'i', a: '0000:7d05', b: '6683c801', m: 'or eax, 1', c: 'set the PE bit'},
  {t: 'i', a: '0000:7d09', b: '0f22c0', m: 'mov cr0, eax', c: 'the CPU is now 32-bit', hot: true},
  {t: 'i', a: '0000:7d0c', b: 'ea117d0800', m: 'ljmp 8:0x7d11', c: 'far jump flushes the pipeline'},
  {t: 'r2', text: 'e asm.bits=32; pd 8 @ 0x7d11'},
  {t: 'i', a: '0x00007d11', b: '66b81000', m: 'mov ax, 0x10', c: 'DATA_SEG'},
  {t: 'i', a: '0x00007d15', b: '8ed8', m: 'mov ds, eax'},
  {t: 'i', a: '0x00007d17', b: '8ed0', m: 'mov ss, eax'},
  {t: 'i', a: '0x00007d19', b: '8ec0', m: 'mov es, eax'},
  {t: 'i', a: '0x00007d1b', b: '8ee0', m: 'mov fs, eax'},
  {t: 'i', a: '0x00007d1d', b: '8ee8', m: 'mov gs, eax'},
  {t: 'i', a: '0x00007d1f', b: 'bd00000900', m: 'mov ebp, 0x90000'},
  {t: 'i', a: '0x00007d24', b: '89ec', m: 'mov esp, ebp'},
  {t: 'r2', text: 'px 16 @ 0x7df0'},
  {t: 'hex'},
  {t: 'r2', text: '', cursor: true},
];

function Line({l, i}) {
  const style = {'--i': i};
  if (l.t === 'sh')
    return (
      <div className="r2-l" style={style}>
        <span className="r2-ps">shubham@prism:~/prismos$ </span>
        {l.text}
      </div>
    );
  if (l.t === 'r2')
    return (
      <div className="r2-l" style={style}>
        <span className="r2-ps">[0x00007c00]&gt; </span>
        {l.text}
        {l.cursor && <span className="r2-cursor" aria-hidden="true" />}
      </div>
    );
  if (l.t === 'cmt')
    return (
      <div className="r2-l r2-c" style={style}>
        {l.text}
      </div>
    );
  if (l.t === 'hex')
    return (
      <div className="r2-l" style={style}>
        <span className="r2-a">0000:7df0 </span> 0000 0000 0000 0000 0000 0000 0000 <span className="r2-hot">55aa</span>{' '}
        <span className="r2-a">..............</span>
        <span className="r2-hot">U.</span>
      </div>
    );
  return (
    <div className="r2-l" style={style}>
      <span className="r2-a">{l.a}</span>
      {'  '}
      <span className="r2-b">{l.b.padEnd(10)}</span>
      {'  '}
      <span className={l.hot ? 'r2-hot' : ''}>{l.m.padEnd(16)}</span>
      {l.c && <span className="r2-c">; {l.c}</span>}
    </div>
  );
}

export default function R2Pane() {
  return (
    <figure className="r2" aria-label="radare2 disassembly of the PrismOS boot sector, the 16-bit to 32-bit mode switch">
      <figcaption className="r2-bar">
        <span>r2: main.bin</span>
        <span>PrismOS, my x86 kernel</span>
      </figcaption>
      <div className="r2-body" aria-hidden="true">
        {LINES.map((l, i) => (
          <Line key={i} l={l} i={i} />
        ))}
      </div>
    </figure>
  );
}
