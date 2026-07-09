import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Leaf, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { certTranslations } from './ContentOverlay';

// Import certificate images
import cert1Img from '../assets/certificate/cert_1.jpg';
import cert2Img from '../assets/certificate/cert_2.jpg';

export const Footer: React.FC = () => {
  const { t, language } = useTranslation();
  const certT = certTranslations[language] || certTranslations['en'];
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [activeCertIndex, setActiveCertIndex] = useState(0);

  const certImages = [cert1Img, cert2Img];

  return (
    <footer id="contact" className={`footer ${isCertModalOpen ? 'cert-modal-open' : ''}`}>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo-vintage" style={{ cursor: 'default', marginBottom: '12px' }}>
            <span className="logo-vintage-text">SULTAN <span>berry</span></span>
          </div>
          <p className="footer-desc">
            {t.footerDesc}
          </p>
        </div>

        <div className="footer-links-col">
          <h4>{t.navAbout}</h4>
          <ul>
            <li><a href="#home">Sultanberry</a></li>
            <li><a href="#about">{t.navAbout}</a></li>
            <li>
              <a 
                style={{ cursor: 'pointer' }} 
                onClick={() => { setIsCertModalOpen(true); setActiveCertIndex(0); }}
              >
                {certT.navCertificates}
              </a>
            </li>
            <li><a href="#varieties">{t.navVarieties}</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>{t.navContact}</h4>
          <div className="footer-contact-item">
            <div className="footer-contact-icon-wrap">
              <MapPin size={18} />
            </div>
            <span className="footer-contact-text">
              Dereçine Kasabası, Organik Tarım Tesisleri,<br />
              Sultandağı / Afyonkarahisar, Türkiye
            </span>
          </div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon-wrap">
              <Phone size={18} />
            </div>
            <span className="footer-contact-text">+90 (533) 416 64 84</span>
          </div>
          <div className="footer-contact-item">
            <div className="footer-contact-icon-wrap">
              <Mail size={18} />
            </div>
            <span className="footer-contact-text">info@sultanberry.com</span>
          </div>
          <div 
            className="footer-contact-item" 
            onClick={() => { setIsCertModalOpen(true); setActiveCertIndex(0); }} 
            style={{ cursor: 'pointer', marginTop: '12px' }}
          >
            <div className="footer-contact-icon-wrap" style={{ background: 'var(--color-earth-sand)', color: 'var(--color-primary)' }}>
              <ShieldCheck size={18} />
            </div>
            <span className="footer-contact-text" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
              {certT.title}
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sultanberry. {t.footerRights}</p>
        <div className="footer-certifications">
          <span className="footer-cert-item">
            <ShieldCheck size={16} /> {t.footerCert}
          </span>
          <span className="footer-cert-item">
            <Leaf size={16} /> {t.footerCert2}
          </span>
        </div>
      </div>

      {/* Certificate Lightbox Slide-Show Modal */}
      {isCertModalOpen && (
        <div className="cert-lightbox-overlay" onClick={() => setIsCertModalOpen(false)}>
          <button className="cert-lightbox-close" onClick={() => setIsCertModalOpen(false)} aria-label="Close">
            <X size={24} />
          </button>
          
          <div className="cert-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="cert-lightbox-slide">
              <img src={certImages[activeCertIndex]} alt="Organic Certificate" />
            </div>

            <button 
              className="cert-slider-btn prev" 
              onClick={(e) => {
                e.stopPropagation();
                setActiveCertIndex((prev) => (prev === 0 ? certImages.length - 1 : prev - 1));
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="cert-slider-btn next" 
              onClick={(e) => {
                e.stopPropagation();
                setActiveCertIndex((prev) => (prev === certImages.length - 1 ? 0 : prev + 1));
              }}
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>

            <div className="cert-slider-info">
              <span className="cert-slider-title">
                {activeCertIndex === 0 ? certT.cert1 : certT.cert2}
              </span>
              <span className="cert-slider-counter">
                {activeCertIndex + 1} / {certImages.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
