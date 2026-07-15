import fs from 'fs/promises';
import path from 'path';

const ROOT = process.argv[2];
const OUT_DIR = path.join(ROOT, 'public', 'media');
await fs.mkdir(OUT_DIR, { recursive: true });
const UA = { 'User-Agent': 'DVDStoreOnline-catalog-builder/1.0 (student project; contact krysaven@gmail.com)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function extFromUrl(url, fb = 'jpg') {
  const m = url.split('?')[0].match(/\.(jpg|jpeg|png|webp)$/i);
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : fb;
}
async function download(url, slug, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: UA });
    if (res.status === 429) { await sleep(4000 * (i + 1)); continue; }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 3000) throw new Error('too small');
    const file = `${slug}.${extFromUrl(url)}`;
    await fs.writeFile(path.join(OUT_DIR, file), buf);
    return { path: `/media/${file}`, bytes: buf.length };
  }
  throw new Error('rate-limited');
}
async function commonsImage(query, w = 1200) {
  const api =
    `https://commons.wikimedia.org/w/api.php?action=query&generator=search` +
    `&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10` +
    `&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=${w}&format=json`;
  const json = await (await fetch(api, { headers: UA })).json();
  const pages = Object.values(json.query?.pages || {}).sort(
    (a, b) => (a.index ?? 99) - (b.index ?? 99)
  );
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (ii?.thumburl && /image\/(jpeg|png)/i.test(ii.mime || '') && (ii.width || 0) >= (ii.height || 1)) {
      return ii.thumburl; // prefer landscape for banners/covers
    }
  }
  // fallback: any jpeg/png
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (ii?.thumburl && /image\/(jpeg|png)/i.test(ii.mime || '')) return ii.thumburl;
  }
  throw new Error(`no image for "${query}"`);
}

const jobs = [
  { key: 'bannerGaming', slug: 'banner-gaming', queries: ['gaming setup room', 'esports arena', 'video game console'] },
  { key: 'bannerLaptop', slug: 'banner-laptop', queries: ['laptop computer desk', 'notebook computer office', 'laptop workspace'] },
  { key: 'bannerAccessory', slug: 'banner-accessory', queries: ['headphones desk', 'computer keyboard mouse desk', 'audio headphones'] },
  { key: 'blog1', slug: 'blog-consoles', queries: ['game controllers', 'video game controller', 'gamepad'] },
  { key: 'blog2', slug: 'blog-laptops', queries: ['student laptop', 'person using laptop', 'laptop notebook'] },
  { key: 'blog3', slug: 'blog-desk', queries: ['computer desk setup', 'mechanical keyboard desk', 'gaming desk'] },
];

const media = {};
for (const job of jobs) {
  media[job.key] = null;
  for (const q of job.queries) {
    try {
      await sleep(3500);
      const url = await commonsImage(q);
      const dl = await download(url, job.slug);
      media[job.key] = dl.path;
      console.log(`OK   ${job.key}  <- ${q}  (${dl.bytes}b)`);
      break;
    } catch (e) {
      console.log(`..   ${job.key}  <- ${q}  (${e.message})`);
    }
  }
  if (!media[job.key]) console.log(`MISS ${job.key}`);
}

const body =
  `// AUTO-GENERATED — real decorative images (banners, blog covers) from Wikimedia Commons.\n` +
  `// null means download failed; the UI falls back to a generated image.\n` +
  `export const MEDIA = ${JSON.stringify(media, null, 2)};\n`;
await fs.writeFile(path.join(ROOT, 'src', 'data', 'media.js'), body);
console.log('\nWrote src/data/media.js');
