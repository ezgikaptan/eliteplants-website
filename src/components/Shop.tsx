import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Trash2, Truck } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { shopProducts, WHATSAPP_NUMBER, RETAIL_QTY_SOFT_CAP } from '../data/shopProducts';
import type { FruitType } from '../types';
import type { TranslationDict } from '../i18n';

const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

const productNameKey: Record<FruitType, keyof TranslationDict> = {
  blackberry: 'productsKaraberryName',
  raspberry: 'productsAlberryName',
  blueberry: 'productsGokberryName',
};

const productDescKey: Record<FruitType, keyof TranslationDict> = {
  blackberry: 'productsKaraberryDesc',
  raspberry: 'productsAlberryDesc',
  blueberry: 'productsGokberryDesc',
};

export const Shop: React.FC = () => {
  const { t } = useTranslation();
  const { items, addToCart, removeFromCart, setQuantity } = useCart();
  const [pendingQty, setPendingQty] = useState<Record<FruitType, number>>({
    blackberry: 1,
    raspberry: 1,
    blueberry: 1,
  });

  const subtotal = items.reduce((sum, item) => {
    const product = shopProducts.find((p) => p.fruitType === item.fruitType);
    return sum + (product ? product.retailPriceTRY * item.quantity : 0);
  }, 0);

  const orderWhatsappUrl = (() => {
    const lines = items.map((item) => {
      const product = shopProducts.find((p) => p.fruitType === item.fruitType);
      if (!product) return '';
      const name = t[productNameKey[item.fruitType]];
      return `- ${name} (${product.packageSizeGrams}g) x${item.quantity} = ${product.retailPriceTRY * item.quantity}₺`;
    });
    const text = [
      "Merhaba, Sultanberry'den sipariş vermek istiyorum:",
      ...lines,
      `Ara Toplam: ${subtotal}₺`,
      'Not: Kargo ücrete dahil değildir.',
    ].join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  })();

  const wholesaleWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Merhaba, toptan sipariş hakkında bilgi almak istiyorum.'
  )}`;

  return (
    <section id="shop" className="scroll-section shop-section">
      <div className="shop-header">
        <span className="section-tag">{t.navShop}</span>
        <h2 className="section-title">{t.shopTitle}</h2>
        <p className="shop-sub">{t.shopSub}</p>
      </div>

      <div className="shop-product-grid">
        {shopProducts.map((product) => {
          const qty = pendingQty[product.fruitType];
          const name = t[productNameKey[product.fruitType]];

          return (
            <div
              key={product.fruitType}
              className={`shop-product-card ${product.available ? '' : 'unavailable'}`}
            >
              <div className="shop-product-img-wrap">
                <img src={getAssetPath(product.image)} alt={name} className="shop-product-img" />
                <div className="shop-product-badge-container">
                  <span className={`product-showcase-badge-item ${product.accentClass}`}>{name}</span>
                </div>
                {!product.available && <span className="tab-soon-badge">{t.varietiesSoon}</span>}
              </div>

              <div className="shop-product-body">
                <h3 className="shop-product-title">{name}</h3>
                <img
                  src={getAssetPath(product.wordmark)}
                  alt=""
                  aria-hidden="true"
                  className="product-showcase-brand-logo"
                />
                <p className="shop-product-desc">{t[productDescKey[product.fruitType]]}</p>

                {product.available ? (
                  <>
                    <div className="shop-product-package-note">{t.shopPackageLabel}</div>
                    <div className="shop-product-price-row">
                      <span className="shop-price-value">{product.retailPriceTRY}₺</span>
                      <span className="shop-price-unit">{t.shopPriceUnit}</span>
                      <span className="shop-shipping-note">{t.shopShippingNote}</span>
                    </div>
                    <div className="shop-product-actions">
                      <div className="shop-qty-stepper">
                        <button
                          type="button"
                          onClick={() =>
                            setPendingQty((prev) => ({
                              ...prev,
                              [product.fruitType]: Math.max(1, prev[product.fruitType] - 1),
                            }))
                          }
                          aria-label="-"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{qty}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setPendingQty((prev) => ({
                              ...prev,
                              [product.fruitType]: Math.min(RETAIL_QTY_SOFT_CAP, prev[product.fruitType] + 1),
                            }))
                          }
                          aria-label="+"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="btn-primary shop-add-to-cart-btn"
                        onClick={() => addToCart(product.fruitType, qty)}
                      >
                        <ShoppingCart size={16} />
                        {t.shopAddToCart}
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="shop-product-unavailable-note">{t.shopComingSoonNote}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="shop-panels-row">
        <div className="shop-cart-panel glass-panel-glow">
          <div className="shop-cart-header">
            <ShoppingCart size={18} />
            <h3>{t.shopCartTitle}</h3>
          </div>

          {items.length === 0 ? (
            <p className="shop-cart-empty">{t.shopCartEmpty}</p>
          ) : (
            <>
              <div className="shop-cart-items">
                {items.map((item) => {
                  const product = shopProducts.find((p) => p.fruitType === item.fruitType);
                  if (!product) return null;
                  return (
                    <div key={item.fruitType} className="shop-cart-line-item">
                      <span className="shop-cart-line-name">{t[productNameKey[item.fruitType]]}</span>
                      <div className="shop-qty-stepper">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.fruitType, item.quantity - 1)}
                          aria-label="-"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.fruitType, item.quantity + 1)}
                          aria-label="+"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="shop-cart-line-total">{product.retailPriceTRY * item.quantity}₺</span>
                      <button
                        type="button"
                        className="shop-cart-line-remove"
                        onClick={() => removeFromCart(item.fruitType)}
                        aria-label={t.shopCartRemoveLabel}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="shop-cart-subtotal-row">
                <span>{t.shopCartSubtotal}</span>
                <span>{subtotal}₺</span>
              </div>

              <p className="shop-cart-shipping-note">
                <Truck size={14} /> {t.shopShippingDisclaimer}
              </p>

              <a
                href={orderWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shop-cart-whatsapp-btn"
              >
                {t.shopOrderWhatsapp}
              </a>
            </>
          )}
        </div>

        <div className="shop-wholesale-callout glass-panel-glow">
          <h3 className="shop-wholesale-title">{t.shopWholesaleTitle}</h3>
          <p className="shop-wholesale-desc">{t.shopWholesaleDesc}</p>
          <a
            href={wholesaleWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline shop-wholesale-whatsapp-btn"
          >
            {t.shopWholesaleCta}
          </a>
        </div>
      </div>
    </section>
  );
};
