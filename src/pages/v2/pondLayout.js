// A shared parcel mesh: neighboring plots start from the same bank vertices.
// Insetting each parcel leaves narrow farm lanes without overlapping water.
export function pondLayout(width, height) {
  if (!width || !height) return [];
  const baseWidth = Math.min(820, Math.max(440, width * 0.62));
  const baseHeight = baseWidth * 0.54;
  const usableHeight = height - Math.max(84, height * 0.16);
  const diagonal = Math.SQRT1_2;
  const radius = Math.ceil((width + height) / baseHeight);
  const widths = [0.86, 1.13, 0.95, 1.04];
  const heights = [1.08, 0.88, 1.16, 0.96];
  const mod = (n, m) => ((n % m) + m) % m;
  const axis = (index, unit, variations) => {
    let value = 0;
    for (let i = Math.min(0, index); i < Math.max(0, index); i++) value += unit * variations[mod(i, variations.length)];
    return index < 0 ? -value : value;
  };
  const vertex = (col, row) => {
    const u = axis(col, baseWidth, widths) + Math.sin(col * 7.3 + row * 3.1) * baseWidth * 0.035;
    const v = axis(row, baseHeight, heights) + Math.sin(col * 2.7 - row * 5.3) * baseHeight * 0.05;
    return { x: width / 2 + (u + v) * diagonal, y: usableHeight / 2 + (v - u) * diagonal };
  };
  const covered = new Set();
  const ponds = [];
  for (let row = -radius; row <= radius; row++) {
    for (let col = -radius; col <= radius; col++) {
      const id = `${row}-${col}`;
      if (covered.has(id)) continue;
      const span = mod(row, 2) === 0 && mod(col * 7 + row * 3, 5) === 0 ? 2 : 1;
      if (span === 2) covered.add(`${row + 1}-${col}`);
      const boundary = [vertex(col, row), vertex(col + 1, row)];
      for (let r = 1; r <= span; r++) boundary.push(vertex(col + 1, row + r));
      boundary.push(vertex(col, row + span));
      for (let r = span - 1; r > 0; r--) boundary.push(vertex(col, row + r));
      const center = boundary.reduce((sum, p) => ({ x: sum.x + p.x / boundary.length, y: sum.y + p.y / boundary.length }), { x: 0, y: 0 });
      const points = boundary.map((p) => ({ x: center.x + (p.x - center.x) * 0.965, y: center.y + (p.y - center.y) * 0.965 }));
      const xs = points.map((p) => p.x), ys = points.map((p) => p.y);
      if (Math.max(...xs) < 0 || Math.min(...xs) > width || Math.max(...ys) < 0 || Math.min(...ys) > usableHeight) continue;
      ponds.push({ id, points, topLeft: vertex(col, row), topRight: vertex(col + 1, row), bottomLeft: vertex(col, row + span), bottomRight: vertex(col + 1, row + span) });
    }
  }
  return ponds;
}
