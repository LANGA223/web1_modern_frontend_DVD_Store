// Local SVG image generators.
// Everything the site shows is drawn here as an inline SVG data URI, so there
// are no external image requests and nothing can appear "broken" offline.

const svg = (markup) =>
  `data:image/svg+xml,${encodeURIComponent(markup.replace(/\s+/g, ' ').trim())}`;

// --- Category theming -------------------------------------------------------
export const CATEGORY_THEME = {
  gaming: { from: '#6d28d9', to: '#9333ea', accent: '#c4b5fd' },
  laptop: { from: '#1d4ed8', to: '#3b82f6', accent: '#93c5fd' },
  accessory: { from: '#0f766e', to: '#14b8a6', accent: '#99f6e4' },
};

// --- Product icon shapes (drawn with primitives, no font dependency) --------
function iconMarkup(icon, accent) {
  switch (icon) {
    case 'console':
      return `
        <rect x="196" y="150" width="208" height="92" rx="14" fill="#fff"/>
        <circle cx="360" cy="196" r="11" fill="${accent}"/>
        <rect x="220" y="184" width="76" height="9" rx="4" fill="${accent}"/>
        <rect x="220" y="204" width="52" height="9" rx="4" fill="${accent}"/>`;
    case 'controller':
      return `
        <rect x="216" y="176" width="168" height="58" rx="29" fill="#fff"/>
        <circle cx="234" cy="234" r="24" fill="#fff"/>
        <circle cx="366" cy="234" r="24" fill="#fff"/>
        <rect x="255" y="192" width="9" height="30" rx="3" fill="${accent}"/>
        <rect x="245" y="202" width="30" height="9" rx="3" fill="${accent}"/>
        <circle cx="345" cy="200" r="6" fill="${accent}"/>
        <circle cx="363" cy="212" r="6" fill="${accent}"/>`;
    case 'vr':
      return `
        <rect x="200" y="162" width="200" height="82" rx="26" fill="#fff"/>
        <rect x="220" y="184" width="72" height="40" rx="12" fill="${accent}"/>
        <rect x="308" y="184" width="72" height="40" rx="12" fill="${accent}"/>`;
    case 'laptop':
      return `
        <rect x="212" y="150" width="176" height="106" rx="8" fill="#fff"/>
        <rect x="225" y="162" width="150" height="82" rx="4" fill="${accent}"/>
        <path d="M186 258 h228 l18 22 h-264 z" fill="#fff"/>`;
    case 'mouse':
      return `
        <rect x="256" y="150" width="88" height="146" rx="44" fill="#fff"/>
        <rect x="296" y="166" width="8" height="40" rx="4" fill="${accent}"/>`;
    case 'keyboard': {
      let keys = '';
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 7; c++) {
          keys += `<rect x="${196 + c * 30}" y="${190 + r * 24}" width="20" height="16" rx="3" fill="${accent}"/>`;
        }
      }
      return `<rect x="180" y="176" width="240" height="92" rx="12" fill="#fff"/>${keys}`;
    }
    case 'headphones':
      return `
        <path d="M216 236 v-22 a84 84 0 0 1 168 0 v22" fill="none" stroke="#fff" stroke-width="16"/>
        <rect x="200" y="226" width="34" height="60" rx="14" fill="#fff"/>
        <rect x="366" y="226" width="34" height="60" rx="14" fill="#fff"/>`;
    case 'hub':
    default:
      return `
        <rect x="228" y="196" width="144" height="46" rx="12" fill="#fff"/>
        <rect x="296" y="150" width="8" height="48" rx="4" fill="#fff"/>
        <rect x="244" y="212" width="20" height="12" rx="2" fill="${accent}"/>
        <rect x="272" y="212" width="20" height="12" rx="2" fill="${accent}"/>
        <rect x="300" y="212" width="20" height="12" rx="2" fill="${accent}"/>
        <rect x="328" y="212" width="20" height="12" rx="2" fill="${accent}"/>`;
  }
}

// A product "photo": gradient card + drawn icon + brand tag + name.
export function productImage({ name = '', brand = '', category = 'accessory', icon }) {
  const theme = CATEGORY_THEME[category] || CATEGORY_THEME.accessory;
  const id = `g${Math.abs(hashCode(name + brand))}`;
  return svg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${theme.from}"/>
          <stop offset="1" stop-color="${theme.to}"/>
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="url(#${id})"/>
      <g transform="translate(0 -6)">${iconMarkup(icon, theme.accent)}</g>
      <text x="40" y="60" font-family="Segoe UI, Arial, sans-serif" font-size="22"
        font-weight="700" fill="#ffffff" opacity="0.9">${escapeXml(brand)}</text>
      <text x="300" y="360" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="30" font-weight="700" fill="#ffffff">${escapeXml(truncate(name, 26))}</text>
      <text x="300" y="398" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="18" fill="#ffffff" opacity="0.85">${escapeXml(category.toUpperCase())}</text>
    </svg>`);
}

// Wide banner for the home slider.
export function bannerImage({ title = '', subtitle = '', category = 'gaming' }) {
  const theme = CATEGORY_THEME[category] || CATEGORY_THEME.gaming;
  const id = `b${Math.abs(hashCode(title))}`;
  return svg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="520" viewBox="0 0 1600 520">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${theme.from}"/>
          <stop offset="1" stop-color="${theme.to}"/>
        </linearGradient>
      </defs>
      <rect width="1600" height="520" fill="url(#${id})"/>
      <circle cx="1300" cy="120" r="260" fill="#ffffff" opacity="0.06"/>
      <circle cx="1180" cy="440" r="180" fill="#ffffff" opacity="0.06"/>
      <text x="120" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="72"
        font-weight="800" fill="#ffffff">${escapeXml(title)}</text>
      <text x="124" y="320" font-family="Segoe UI, Arial, sans-serif" font-size="30"
        fill="#ffffff" opacity="0.9">${escapeXml(subtitle)}</text>
    </svg>`);
}

// Circular avatar with initials, colour derived from the name.
export function avatarImage(name = '?', size = 150) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const hue = Math.abs(hashCode(name)) % 360;
  return svg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 150 150">
      <rect width="150" height="150" fill="hsl(${hue} 55% 55%)"/>
      <text x="75" y="75" dy="0.35em" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="58" font-weight="700"
        fill="#ffffff">${escapeXml(initials || '?')}</text>
    </svg>`);
}

// Generic content image (blog cards etc.).
export function coverImage(label = '', seed = label) {
  const hue = Math.abs(hashCode(seed)) % 360;
  const id = `c${Math.abs(hashCode(seed))}`;
  return svg(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="350" viewBox="0 0 600 350">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="hsl(${hue} 60% 45%)"/>
          <stop offset="1" stop-color="hsl(${(hue + 40) % 360} 60% 55%)"/>
        </linearGradient>
      </defs>
      <rect width="600" height="350" fill="url(#${id})"/>
      <text x="300" y="185" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="30" font-weight="700" fill="#ffffff">${escapeXml(label)}</text>
    </svg>`);
}

// --- helpers ----------------------------------------------------------------
function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(s, n) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}
