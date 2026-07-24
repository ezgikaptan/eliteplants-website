import React from 'react';
import { MapPin } from 'lucide-react';
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

  const cards: { id: FruitType; name: string; brand: string; desc: string; accentClass: string; icon: string }[] = [
    { id: 'blackberry', name: t.productsKaraberryName, brand: 'Karaberry', desc: t.productsKaraberryDesc, accentClass: 'accent-karaberry', icon: '/images/icons/blackberry-icon.png' },
    { id: 'raspberry', name: t.productsAlberryName, brand: 'Alberry', desc: t.productsAlberryDesc, accentClass: 'accent-alberry', icon: '/images/icons/raspberry-icon.png' },
    { id: 'blueberry', name: t.productsGokberryName, brand: 'Gökberry', desc: t.productsGokberryDesc, accentClass: 'accent-gokberry', icon: '/images/icons/blueberry-icon.png' },
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
              
              <div className="product-showcase-badge-container">
                <span className={`product-showcase-badge-item ${card.accentClass}`}>{badges[card.id]}</span>
                {card.id === 'blueberry' && (
                  <span className="product-showcase-badge-item location">
                    <MapPin size={10} /> Huelva - Spain
                  </span>
                )}
              </div>
            </div>
            <div className="product-showcase-body">
              <h3 className="product-showcase-title">{card.name}</h3>
              <span className={`product-showcase-brand-tag ${card.accentClass}`}>
                <img src={getAssetPath(card.icon)} alt="" aria-hidden="true" className="product-showcase-brand-icon" />
                {card.brand}
              </span>
              <p className="product-showcase-desc">{card.desc}</p>
              <span className="product-showcase-link">{t.productsExplore} →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
