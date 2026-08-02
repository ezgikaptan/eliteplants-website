import type { ShopProduct } from '../types';
import karraberryIcon from '../assets/icon/karraberry-1-removebg-preview.png';
import alberyIcon from '../assets/icon/albery-k__rm__z__-removebg-preview.png';
import gokberryIcon from '../assets/icon/go_êkberry-1-removebg-preview.png';

// Commerce data only — display copy (name/description) lives in i18n.ts.
export const shopProducts: ShopProduct[] = [
  {
    fruitType: 'blackberry',
    available: true,
    packageSizeGrams: 125,
    retailPriceTRY: 100,
    wholesalePriceTRY: 55,
    wholesaleMinUnits: 2500,
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
    wholesalePriceTRY: 0,
    wholesaleMinUnits: 0,
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
    wholesalePriceTRY: 0,
    wholesaleMinUnits: 0,
    image: '/images/cupla_blueberry.jpg',
    wordmark: '/images/logos/gokberry-wordmark.png',
    seal: gokberryIcon,
    accentClass: 'accent-gokberry',
  },
];

export const RETAIL_QTY_SOFT_CAP = 200;
export const WHATSAPP_NUMBER = '905334166484';
