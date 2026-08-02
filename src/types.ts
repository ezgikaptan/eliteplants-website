export type FruitType = 'blackberry' | 'raspberry' | 'blueberry';

export interface ShopProduct {
  fruitType: FruitType;
  available: boolean;
  packageSizeGrams: number;
  retailPriceTRY: number;
  wholesalePriceTRY: number;
  wholesaleMinUnits: number;
  image: string;
  wordmark: string;
  seal: string;
  accentClass: 'accent-karaberry' | 'accent-alberry' | 'accent-gokberry';
}

export interface CartItem {
  fruitType: FruitType;
  quantity: number;
}

export interface VarietyDetail {
  id: string;
  name: string;
  type: string;
  tag: string;
  description: string;
  image: string;
  origin: string;
  growth: string;
  fruitSize: string;
  taste: string;
  chillHours: string;
  harvest: string;
  shelfLife: string;
}
