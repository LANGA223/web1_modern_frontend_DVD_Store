import { productImage } from '../utils/images';
import { CATALOG } from './catalog';

// Category metadata (used by the navbar, category pages, and footer).
export const CATEGORIES = [
  { key: 'dvd', label: 'DVD', icon: 'bi-disc' },
  { key: 'se', label: 'Special Edition', icon: 'bi-laptop' },
  { key: '4k_uhd', label: '4K & UHD', icon: 'bi bi-badge-4k' },
  { key: 'merchandise', label: 'Merchandise', icon: 'bi-people' },
  { key: 'hardware', label: 'Hardware', icon: 'bi-speaker' },
];

export const categoryLabel = (key) =>
  CATEGORIES.find((c) => c.key === key)?.label || key;

// Real product data + locally-bundled photos (see scripts/build-catalog.mjs).
// If an image is ever missing we fall back to a generated placeholder so the
// UI never shows a broken image.
const products = CATALOG.map((p) => ({
  ...p,
  image: p.image || productImage(p),
}));

export default products;

// --- lookups ---------------------------------------------------------------
export const getProductById = (id) =>
  products.find((p) => String(p.id) === String(id));

export const getProductsByCategory = (category) =>
  products.filter((p) => p.category === category);

export const getBrandsByCategory = (category) =>
  [...new Set(getProductsByCategory(category).map((p) => p.brand))].sort();

// Products of a category grouped by brand: [{ brand, items: [...] }, ...]
export const getProductsGroupedByBrand = (category) => {
  const groups = {};
  for (const p of getProductsByCategory(category)) {
    (groups[p.brand] ||= []).push(p);
  }
  return Object.keys(groups)
    .sort()
    .map((brand) => ({ brand, items: groups[brand] }));
};
