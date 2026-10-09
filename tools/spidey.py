# Generates static/img/spidey.svg: pixel Spider-Man hanging upside down from a web.
# Each row is (left 8 cols, centre col); the right half mirrors the left.
ROWS = [
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("........","T"),
 ("...NRRN.","T"),
 ("...NBBN.","T"),
 ("...NBBBB","N"),
 ("..NRRRRR","R"),
 (".NBNRRRD","D"),
 ("NBBBNRRR","R"),
 (".NBBNNRR","R"),
 (".NNRRNNN","N"),
 (".NRRRRRR","R"),
 (".NRNNNRR","R"),
 (".NRNWWNR","R"),
 (".NRRNWWN","R"),
 (".NRRRNNR","R"),
 (".NRRRRRR","R"),
 ("..NRRRRR","R"),
 ("...NNRRR","R"),
 ("......NN","N"),
]
G = [l + c + l[::-1] for l, c in ROWS]
assert all(len(r) == 17 for r in G)
C = {'N': '#05060a', 'D': '#9c1c1c', 'R': '#e23636', 'B': '#2f5fd0', 'W': '#f4f6ff', 'T': '#cfd6ee'}
rects = [f'<rect x="{x}" y="{y}" width="1" height="1" fill="{C[c]}"/>'
         for y, r in enumerate(G) for x, c in enumerate(r) if c != '.']
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 {len(G)}" shape-rendering="crispEdges">' + ''.join(rects) + '</svg>'
open('static/img/spidey.svg', 'w').write(svg)
print("\n".join(G))
