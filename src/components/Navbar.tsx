import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import type { Language } from '../i18n';

const BASE = import.meta.env.BASE_URL || '/';
const cizimImg = `${BASE.endsWith('/') ? BASE : BASE + '/'}images/çizim.png`;

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

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();
  const homeT = homeTranslations[language] || homeTranslations['en'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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
          <div className="logo-vintage" onClick={() => { scrollToSection('home'); setIsMenuOpen(false); }}>
            <span className="logo-vintage-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px' }}>
              <img src={cizimImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </span>
            <span className="logo-vintage-text">
              ELİTE <span>plants</span>
            </span>
          </div>
        </div>

        {/* Right Side Navigation Links (Desktop Only) */}
        <div className="nav-col nav-col-right desktop-only">
          <a 
            onClick={() => scrollToSection('contact')} 
            className={activeSection === 'contact' ? 'active' : ''}
          >
            {t.navContact}
          </a>

          {/* Premium Language Dropdown */}
          <div className="lang-selector-container">
            <button className="lang-selector-btn">
              <Globe size={14} />
              <span>{language.toUpperCase()}</span>
            </button>
            <div className="lang-dropdown">
              {(['tr', 'en', 'es', 'fr', 'de', 'ru', 'zh', 'ja', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`lang-option-btn ${language === lang ? 'active' : ''}`}
                >
                  <span className="lang-code-tag">{lang.toUpperCase()}</span>
                  <span className="lang-full-name">{getLanguageLabel(lang)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Menu Toggle Trigger (CSS Animated) */}
        <button 
          className={`mobile-menu-trigger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </button>
      </div>

      {/* Mobile Slide-Down Menu Panel */}
      <div className={`mobile-menu-panel ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <a 
            onClick={() => { scrollToSection('home'); setIsMenuOpen(false); }} 
            className={activeSection === 'home' ? 'active' : ''}
          >
            {homeT}
          </a>
          <a 
            onClick={() => { scrollToSection('about'); setIsMenuOpen(false); }} 
            className={activeSection === 'about' ? 'active' : ''}
          >
            {t.navAbout}
          </a>
          <a 
            onClick={() => { scrollToSection('varieties'); setIsMenuOpen(false); }} 
            className={activeSection === 'varieties' ? 'active' : ''}
          >
            {t.navVarieties}
          </a>
          <a 
            onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} 
            className={activeSection === 'contact' ? 'active' : ''}
          >
            {t.navContact}
          </a>
        </div>

        {/* Language Selection inside Drawer */}
        <div className="mobile-menu-languages">
          <span className="lang-section-title">
            {language === 'tr' ? 'Dil Seçimi' : 'Language'}
          </span>
          <div className="mobile-lang-grid">
            {(['tr', 'en', 'es', 'fr', 'de', 'ru', 'zh', 'ja', 'ar'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setIsMenuOpen(false); }}
                className={`mobile-lang-btn ${language === lang ? 'active' : ''}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
