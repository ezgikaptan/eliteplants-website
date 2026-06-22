import React, { useEffect, useState } from 'react';
import { Sprout, ShoppingBag, Award, Sparkles, Mail, Globe } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import type { Language } from '../i18n';

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
      ja: '日本語'
    };
    return labels[lang];
  };

  return (
    <nav className={`navbar-vintage ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-vintage-container">
        {/* Left Side Navigation Links */}
        <div className="nav-col nav-col-left">
          <a 
            onClick={() => scrollToSection('products')} 
            className={activeSection === 'products' ? 'active' : ''}
          >
            <ShoppingBag size={14} /> {t.navProducts}
          </a>
          <a 
            onClick={() => scrollToSection('varieties')} 
            className={activeSection === 'varieties' ? 'active' : ''}
          >
            <Award size={14} /> {t.navVarieties}
          </a>
        </div>

        {/* Centered Logo */}
        <div className="nav-col nav-col-center">
          <div className="logo-vintage" onClick={() => scrollToSection('home')}>
            <span className="logo-vintage-icon">
              <Sprout size={16} />
            </span>
            <span className="logo-vintage-text">
              ELİTE <span>plants</span>
            </span>
          </div>
        </div>

        {/* Right Side Navigation Links */}
        <div className="nav-col nav-col-right">
          <a 
            onClick={() => scrollToSection('about')} 
            className={activeSection === 'about' ? 'active' : ''}
          >
            <Sparkles size={14} /> {t.navAbout}
          </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className={activeSection === 'contact' ? 'active' : ''}
          >
            <Mail size={14} /> {t.navContact}
          </a>

          {/* Premium Language Dropdown */}
          <div className="lang-selector-container">
            <button className="lang-selector-btn">
              <Globe size={14} />
              <span>{language.toUpperCase()}</span>
            </button>
            <div className="lang-dropdown">
              {(['tr', 'en', 'es', 'fr', 'de', 'ru', 'zh', 'ja'] as Language[]).map((lang) => (
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
      </div>
    </nav>
  );
};
