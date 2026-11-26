// A shared parcel mesh: neighboring plots start from the same bank vertices.
// Insetting each parcel leaves narrow farm lanes without overlapping water.
// Ponds are small (seen from high up) and cover the screen plus a margin, so the hero camera can zoom in and tilt.
// `bounds` picks another window of the same endless grid (used for the far ponds out to the horizon).
export function pondLayout(width, height, bounds) {
  if (!width || !height) return [];
  const baseWidth = Math.min(420, Math.max(210, width * 0.3));
  const baseHeight = baseWidth * 0.54;
  const cx = width / 2;
  const cy = height * 0.45;
  const diagonal = Math.SQRT1_2;
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
    return { x: cx + (u + v) * diagonal, y: cy + (v - u) * diagonal };
  };
  const { x0, x1, y0, y1 } = bounds ?? { x0: -width * 0.2, x1: width * 1.2, y0: -height * 0.45, y1: height * 1.2 };
  const reach = Math.max(Math.abs(x0 - cx), Math.abs(x1 - cx)) + Math.max(Math.abs(y0 - cy), Math.abs(y1 - cy));
  const radius = Math.ceil((reach * 1.1) / (baseHeight * 0.85));
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
      if (Math.max(...xs) < x0 || Math.min(...xs) > x1 || Math.max(...ys) < y0 || Math.min(...ys) > y1) continue;
      ponds.push({
        id, span, center, points, size: baseWidth,
        topLeft: vertex(col, row), topRight: vertex(col + 1, row), bottomLeft: vertex(col, row + span), bottomRight: vertex(col + 1, row + span),
      });
    }
  }
  return ponds;
}
