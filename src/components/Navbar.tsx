import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Languages } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import type { Language } from '../i18n';
import { SHOP_ENABLED } from '../data/shopProducts';

const BASE = import.meta.env.BASE_URL;
const mascotImg = `${BASE}images/icons/blackberry-mascot-full.png`;

const homeTranslations: Record<string, string> = {
  tr: 'Ana Sayfa',
  en: 'Home',
  es: 'Inicio',
  fr: 'Accueil',
  de: 'Startseite',
  ru: 'Главная',
  zh: '首页',
  ja: 'ホーム',
  ar: 'الرئيسية'
};

const mobileMenuSubtitles: Record<string, Record<string, string>> = {
  home: {
    tr: 'Bahçemizin Girişi',
    en: 'Entrance of Our Garden',
    es: 'Entrada de Nuestro Jardín',
    fr: 'Entrée de Notre Jardin',
    de: 'Eingang Unseres Gartens',
    ru: 'Вход в наш сад',
    zh: '我们的花园入口',
    ja: 'ガーデンエントランス',
    ar: 'مدخل بستاننا'
  },
  about: {
    tr: 'Hikayemiz ve Değerlerimiz',
    en: 'Our Story & Values',
    es: 'Nuestra Historia y Valores',
    fr: 'Notre Histoire et Valeurs',
    de: 'Unsere Geschichte & Werte',
    ru: 'Наша история и ценности',
    zh: '我们的故事与价值',
    ja: 'ストーリー＆バリュー',
    ar: 'قصتنا وقيمنا'
  },
  varieties: {
    tr: 'Doğal Meyve Koleksiyonumuz',
    en: 'Our Natural Fruit Collection',
    es: 'Nuestra Colección de Frutas Naturales',
    fr: 'Notre Collection de Fruits Naturels',
    de: 'Unsere Natürliche Fruchtkollektion',
    ru: 'Наша коллекция naturalist meyveleri',
    zh: '我们的天然水果系列',
    ja: 'ナチュラルフルーツコレクション',
    ar: 'مجموعتنا من الفواكه الطبيعية'
  },
  contact: {
    tr: 'Bize Ulaşın ve İletişim',
    en: 'Get in Touch with Us',
    es: 'Póngase en Contacto con Nosotros',
    fr: 'Contactez-nous',
    de: 'Treffen Sie Uns',
    ru: 'Свяжитесь с нами',
    zh: '联系我们',
    ja: 'お問い合わせ',
    ar: 'اتصل بنا'
  },
  shop: {
    tr: 'Taze Meyvelerimizi Sipariş Verin',
    en: 'Order Our Fresh Berries',
    es: 'Pida Nuestras Moras Frescas',
    fr: 'Commandez Nos Fruits Frais',
    de: 'Bestellen Sie Unsere Frischen Beeren',
    ru: 'Закажите Наши Свежие Ягоды',
    zh: '订购我们的新鲜浆果',
    ja: '新鮮なベリーをご注文ください',
    ar: 'اطلب توتنا الطازج'
  }
};

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const homeT = homeTranslations[language] || homeTranslations['en'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lang-selector-container')) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const scrollToSection = (id: string) => {
    // From the Shop page (or any non-home route), navigate home first and
    // let App.tsx scroll to the target once the home page has mounted.
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for flat navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const goToShop = () => {
    navigate('/shop');
    window.scrollTo(0, 0);
  };

  const getLanguageLabel = (lang: Language) => {
    const labels: Record<Language, string> = {
      tr: 'Türkçe',
      en: 'English',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      ru: 'Русский',
      zh: '简体中文',
      ja: '日本語',
      ar: 'العربية'
    };
    return labels[lang];
  };

  return (
    <nav className={`navbar-vintage ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-vintage-container">
        {/* Mobile Hamburger Menu Toggle Trigger (CSS Animated, Left on Mobile) */}
        <button 
          className={`mobile-menu-trigger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </button>

        {/* Left Side Navigation Links (Desktop Only) */}
        <div className="nav-col nav-col-left desktop-only">
          <a
            onClick={() => scrollToSection('about')}
            className={activeSection === 'about' ? 'active' : ''}
          >
            {t.navAbout}
          </a>
          <a
            onClick={() => scrollToSection('varieties')}
            className={activeSection === 'varieties' ? 'active' : ''}
          >
            {t.navVarieties}
          </a>
        </div>

        {/* Centered Logo */}
        <div className="nav-col nav-col-center">
          <div
            className="logo-vintage"
            onClick={() => {
              if (isHome) {
                scrollToSection('home');
              } else {
                navigate('/');
              }
              setIsMenuOpen(false);
            }}
          >
            <span className="logo-vintage-text">
              SULTAN <span>berry</span>
            </span>
          </div>
        </div>

        {/* Right Side Navigation Links (Desktop Only) */}
        <div className="nav-col nav-col-right desktop-only">
          <a
            onClick={SHOP_ENABLED ? goToShop : undefined}
            className={`nav-shop-link ${activeSection === 'shop' ? 'active' : ''} ${!SHOP_ENABLED ? 'disabled' : ''}`}
          >
            {t.navShop}
            {SHOP_ENABLED && cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </a>
          <a
            onClick={() => scrollToSection('contact')}
            className={activeSection === 'contact' ? 'active' : ''}
          >
            {t.navContact}
          </a>

          {/* Premium Language Dropdown (Desktop Only) */}
          <div className={`lang-selector-container desktop-only ${isLangOpen ? 'open' : ''}`}>
            <button className="lang-selector-btn" onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); }}>
              <Languages size={14} />
              <span>{language.toUpperCase()}</span>
            </button>
            <div className="lang-dropdown">
              {(['tr', 'en', 'es', 'fr', 'de', 'ru', 'zh', 'ja', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                  className={`lang-option-btn ${language === lang ? 'active' : ''}`}
                >
                  <span className="lang-code-tag">{lang.toUpperCase()}</span>
                  <span className="lang-full-name">{getLanguageLabel(lang)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Language Selector Dropdown (Mobile Only, Far Right) */}
        <div className={`lang-selector-container mobile-only ${isLangOpen ? 'open' : ''}`}>
          <button className="lang-selector-btn" onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); }}>
            <Languages size={14} />
            <span>{language.toUpperCase()}</span>
          </button>
          <div className="lang-dropdown">
            {(['tr', 'en', 'es', 'fr', 'de', 'ru', 'zh', 'ja', 'ar'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                className={`lang-option-btn ${language === lang ? 'active' : ''}`}
              >
                <span className="lang-code-tag">{lang.toUpperCase()}</span>
                <span className="lang-full-name">{getLanguageLabel(lang)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Menu Panel */}
      <div className={`mobile-menu-panel ${isMenuOpen ? 'open' : ''}`}>
        <img src={mascotImg} alt="" aria-hidden="true" className="mobile-menu-mascot" />
        <div className="mobile-menu-links">
          <a
            onClick={() => {
              if (isHome) {
                scrollToSection('home');
              } else {
                navigate('/');
              }
              setIsMenuOpen(false);
            }}
            className={`mobile-menu-link-item ${activeSection === 'home' ? 'active' : ''}`}
          >
            <span className="menu-link-title">{homeT}</span>
            <span className="menu-link-subtitle">{mobileMenuSubtitles.home[language] || mobileMenuSubtitles.home['en']}</span>
          </a>
          <a 
            onClick={() => { scrollToSection('about'); setIsMenuOpen(false); }} 
            className={`mobile-menu-link-item ${activeSection === 'about' ? 'active' : ''}`}
          >
            <span className="menu-link-title">{t.navAbout}</span>
            <span className="menu-link-subtitle">{mobileMenuSubtitles.about[language] || mobileMenuSubtitles.about['en']}</span>
          </a>
          <a
            onClick={() => { scrollToSection('varieties'); setIsMenuOpen(false); }}
            className={`mobile-menu-link-item ${activeSection === 'varieties' ? 'active' : ''}`}
          >
            <span className="menu-link-title">{t.navVarieties}</span>
            <span className="menu-link-subtitle">{mobileMenuSubtitles.varieties[language] || mobileMenuSubtitles.varieties['en']}</span>
          </a>
          <a
            onClick={SHOP_ENABLED ? () => { goToShop(); setIsMenuOpen(false); } : undefined}
            className={`mobile-menu-link-item ${activeSection === 'shop' ? 'active' : ''} ${!SHOP_ENABLED ? 'disabled' : ''}`}
          >
            <span className="menu-link-title">
              {t.navShop}
              {SHOP_ENABLED && cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
            </span>
            <span className="menu-link-subtitle">{mobileMenuSubtitles.shop[language] || mobileMenuSubtitles.shop['en']}</span>
          </a>
          <a
            onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }}
            className={`mobile-menu-link-item ${activeSection === 'contact' ? 'active' : ''}`}
          >
            <span className="menu-link-title">{t.navContact}</span>
            <span className="menu-link-subtitle">{mobileMenuSubtitles.contact[language] || mobileMenuSubtitles.contact['en']}</span>
          </a>
        </div>
        <div className="mobile-menu-footer">
          <span className="mobile-menu-logo-text">SULTAN <span>berry</span></span>
        </div>
      </div>
    </nav>
  );
};
