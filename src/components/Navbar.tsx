import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import type { Language } from '../i18n';

const BASE = import.meta.env.BASE_URL || '/';
const cizimImg = `${BASE.endsWith('/') ? BASE : BASE + '/'}images/çizim.png`;

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, setLanguage } = useTranslation();

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
    <nav className={`navbar-vintage ${isScrolled ? 'scrolled' : ''}`}>
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
          <div className="logo-vintage" onClick={() => { scrollToSection('home'); }}>
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

          {/* Premium Language Dropdown (Desktop Only) */}
          <div className="lang-selector-container desktop-only">
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

        {/* Mobile Language Selector Dropdown (Mobile Only, Far Right) */}
        <div className="lang-selector-container mobile-only">
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
    </nav>
  );
};
