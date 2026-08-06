export type FruitType = 'blackberry' | 'raspberry' | 'blueberry';

export interface ShopPriceTier {
  minUnits: number;
  pricePerUnit: number;
}

export interface ShopProduct {
  fruitType: FruitType;
  available: boolean;
  packageSizeGrams: number;
  retailPriceTRY: number;
  // Volume discount ladder, ascending by minUnits. The price for a given
  // quantity is the pricePerUnit of the highest tier it meets or exceeds;
  // below the first tier's minUnits, retailPriceTRY applies.
  priceTiers: ShopPriceTier[];
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
