# Generates static/img/spidey.svg and static/img/gwen.svg: pixel heroes hanging from a web by both hands.
# Each row is (left 9 cols, centre col); the right half mirrors the left.
# Tokens: N outline, H head, S suit, A accent, G gloves, W eye lens, D chest detail, T web.
G = [
 "......GTG......",
 ".....S...S.....",
 "....S.....S....",
 "...S.......S...",
 "..S.NNNNNNN.S..",
 "..S.NNHLHNN.S..",
 "..S.NWWHWWN.S..",
 "..S.NHHHHHN.S..",
 "..S.NHHHHHN.S..",
 "..S..NNNNN..S..",
 "..SSSSSSSSSSS..",
 "...NSSSDSSSN...",
 "....NSSDSSN....",
 ".....NSSSN.....",
 ".....NSSSN.....",
 ".....NSNSN.....",
 ".....NSNSN.....",
 ".....NSNSN.....",
 ".....NANAN.....",
 ".....NANAN.....",
 "....NNNNNNN....",
]
assert all(len(r) == 15 for r in G), [len(r) for r in G]

PALETTES = {
  'spidey': {'N':'#05060a','H':'#e23636','S':'#e23636','A':'#2f5fd0','G':'#e23636','W':'#f4f6ff','D':'#2f5fd0','L':'#9c1c1c','T':'#cfd6ee'},
  'gwen':   {'N':'#14121f','H':'#f4f6ff','S':'#1c1a2b','A':'#ff6fa8','G':'#f4f6ff','W':'#4ad6e8','D':'#ff6fa8','L':'#9a9db5','T':'#6b6f88'},
}
for name, C in PALETTES.items():
    rects = [f'<rect x="{x}" y="{y}" width="1" height="1" fill="{C[c]}"/>'
             for y, r in enumerate(G) for x, c in enumerate(r) if c != '.']
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 {len(G)}" shape-rendering="crispEdges">' + ''.join(rects) + '</svg>'
    open(f'static/img/{name}.svg', 'w').write(svg)
