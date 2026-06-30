import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import type { FruitType } from '../types';

interface ProductShowcaseProps {
  activeFruit: FruitType;
  setActiveFruit: (fruit: FruitType) => void;
  images: Record<FruitType, string>;
  badges: Record<FruitType, string>;
}

const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ setActiveFruit, images, badges }) => {
  const { t } = useTranslation();

  const cards: { id: FruitType; name: string; desc: string; accentClass: string }[] = [
    { id: 'blackberry', name: 'Karaberry', desc: t.productsKaraberryDesc, accentClass: 'accent-karaberry' },
    { id: 'raspberry', name: 'Alberry', desc: t.productsAlberryDesc, accentClass: 'accent-alberry' },
    { id: 'blueberry', name: 'Gökberry', desc: t.productsGokberryDesc, accentClass: 'accent-gokberry' },
  ];

  const handleSelect = (fruit: FruitType) => {
    setActiveFruit(fruit);
    document.getElementById('varieties')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="product-showcase-section">
      <div className="product-showcase-header">
        <span className="section-tag">{t.navProducts}</span>
        <h2 className="section-title">{t.productsCursive}</h2>
        <p className="product-showcase-sub">{t.productsSub}</p>
      </div>

      <div className="product-showcase-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="product-showcase-card"
            onClick={() => handleSelect(card.id)}
            role="button"
            tabIndex={0}
          >
            <div className="product-showcase-img-wrap">
              <img src={getAssetPath(images[card.id])} alt={card.name} className="product-showcase-img" />
              <span className={`product-showcase-badge ${card.accentClass}`}>{badges[card.id]}</span>
            </div>
            <div className="product-showcase-body">
              <h3 className="product-showcase-title">{card.name}</h3>
              <p className="product-showcase-desc">{card.desc}</p>
              <span className="product-showcase-link">{t.productsExplore} →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
