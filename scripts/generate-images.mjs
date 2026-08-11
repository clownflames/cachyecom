import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const productsFile = path.join(root, "lib", "products.ts");
const outDir = path.join(root, "public", "products");

const source = fs.readFileSync(productsFile, "utf8");

// Extract every `slug: "..."` occurrence from lib/products.ts
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

if (slugs.length === 0) {
  console.error("No slugs found in lib/products.ts");
  process.exit(1);
}

const palette = [
  ["#f43f5e", "#9f1239"],
  ["#f97316", "#c2410c"],
  ["#f59e0b", "#b45309"],
  ["#10b981", "#047857"],
  ["#06b6d4", "#0e7490"],
  ["#3b82f6", "#1d4ed8"],
  ["#8b5cf6", "#6d28d9"],
  ["#ec4899", "#be185d"],
  ["#84cc16", "#3f6212"],
  ["#14b8a6", "#0f766e"],
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function wrapText(name, maxChars) {
  const words = name.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = word;
    } else {
      line += " " + word;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines.slice(0, 3);
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function makeSvg(slug, index, name) {
  const colors = palette[hashString(slug) % palette.length];
  const lines = wrapText(name, 26);
  const angle = index * 35;
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="400" dy="${i === 0 ? 0 : 40}">${escapeXml(line)}</tspan>`
    )
    .join("");

  const startY = 400 - ((lines.length - 1) * 40) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="${escapeXml(
    name
  )} placeholder image">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${colors[0]}"/>
      <stop offset="1" stop-color="${colors[1]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <rect width="800" height="800" fill="url(#glow)"/>
  <circle cx="650" cy="150" r="220" fill="#ffffff" opacity="0.08"/>
  <circle cx="120" cy="660" r="160" fill="#ffffff" opacity="0.08"/>
  <g transform="rotate(${angle} 400 400)">
    <rect x="240" y="180" width="320" height="320" rx="48" fill="#ffffff" opacity="0.16"/>
    <rect x="285" y="225" width="230" height="230" rx="36" fill="#ffffff" opacity="0.22"/>
  </g>
  <text x="400" y="140" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" font-weight="900" letter-spacing="6" fill="#ffffff" opacity="0.9">BIG DEAL</text>
  <text x="400" y="${startY}" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#ffffff">
    ${tspans}
  </text>
  <text x="400" y="690" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="900" fill="#ffffff">SALE</text>
</svg>
`;
}

fs.mkdirSync(outDir, { recursive: true });

let count = 0;
for (const slug of slugs) {
  const name = slug.split("-").join(" ");
  for (let i = 1; i <= 3; i++) {
    const file = path.join(outDir, `${slug}-${i}.svg`);
    fs.writeFileSync(file, makeSvg(slug, i, name), "utf8");
    count++;
  }
}

console.log(`Generated ${count} placeholder SVGs for ${slugs.length} products in public/products/`);
