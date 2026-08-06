import type { ShopProduct } from '../types';
import karraberryIcon from '../assets/icon/karraberry-1-removebg-preview.png';
import alberyIcon from '../assets/icon/albery-k__rm__z__-removebg-preview.png';
import gokberryIcon from '../assets/icon/go_êkberry-1-removebg-preview.png';

// Volume discount ladder for Karaberry: linear from 100₺ (retail) at 0 units
// down to 55₺ at 2500 units, i.e. -0.018₺ per unit — set proportionally per
// the business's 2500-unit/55₺ reference point.
const karaberryTiers = [
  { minUnits: 100, pricePerUnit: 98.2 },
  { minUnits: 150, pricePerUnit: 97.3 },
  { minUnits: 200, pricePerUnit: 96.4 },
  { minUnits: 250, pricePerUnit: 95.5 },
  { minUnits: 500, pricePerUnit: 91 },
  { minUnits: 750, pricePerUnit: 86.5 },
  { minUnits: 1000, pricePerUnit: 82 },
  { minUnits: 1500, pricePerUnit: 73 },
  { minUnits: 2000, pricePerUnit: 64 },
  { minUnits: 2500, pricePerUnit: 55 },
];

// Commerce data only — display copy (name/description) lives in i18n.ts.
export const shopProducts: ShopProduct[] = [
  {
    fruitType: 'blackberry',
    available: true,
    packageSizeGrams: 125,
    retailPriceTRY: 100,
    priceTiers: karaberryTiers,
    image: '/images/caddo_blackberry.jpg',
    wordmark: '/images/logos/karaberry-wordmark.png',
    seal: karraberryIcon,
    accentClass: 'accent-karaberry',
  },
  {
    fruitType: 'raspberry',
    available: false,
    packageSizeGrams: 0,
    retailPriceTRY: 0,
    priceTiers: [],
    image: '/images/farm_14.jpeg',
    wordmark: '/images/logos/alberry-wordmark.png',
    seal: alberyIcon,
    accentClass: 'accent-alberry',
  },
  {
    fruitType: 'blueberry',
    available: false,
    packageSizeGrams: 0,
    retailPriceTRY: 0,
    priceTiers: [],
    image: '/images/cupla_blueberry.jpg',
    wordmark: '/images/logos/gokberry-wordmark.png',
    seal: gokberryIcon,
    accentClass: 'accent-gokberry',
  },
];

// Highest tier the given quantity qualifies for, or the flat retail price
// if it doesn't reach the first tier's threshold yet.
export const getUnitPrice = (product: ShopProduct, quantity: number): number => {
  let price = product.retailPriceTRY;
  for (const tier of product.priceTiers) {
    if (quantity >= tier.minUnits) {
      price = tier.pricePerUnit;
    }
  }
  return price;
};

export const formatPrice = (price: number): string =>
  Number.isInteger(price) ? String(price) : price.toFixed(1);

export const RETAIL_QTY_SOFT_CAP = 5000;
export const WHATSAPP_NUMBER = '905334166484';

// Online sales are paused for now — the nav link stays visible (with a
// "coming soon" marker) but isn't clickable, and the /shop route redirects
// home. Flip this back to true whenever the shop is ready to go live.
export const SHOP_ENABLED = false;
