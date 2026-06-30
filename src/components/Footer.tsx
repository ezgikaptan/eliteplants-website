import { Phone, Mail, MapPin, ShieldCheck, Leaf } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const BASE = import.meta.env.BASE_URL || '/';
const cizimImg = `${BASE.endsWith('/') ? BASE : BASE + '/'}images/çizim.png`;

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo-vintage" style={{ cursor: 'default', marginBottom: '12px' }}>
            <span className="logo-vintage-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px' }}>
              <img src={cizimImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </span>
            <span className="logo-vintage-text">ELİTE <span>plants</span></span>
          </div>
          <p className="footer-desc">
            {t.footerDesc}
          </p>
        </div>

        <div className="footer-links-col">
          <h4>{t.navAbout}</h4>
          <ul>
            <li><a href="#home">ELİTE plants</a></li>
            <li><a href="#varieties">{t.navVarieties}</a></li>
            <li><a href="#about">{t.navAbout}</a></li>
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
            <span className="footer-contact-text">info@eliteplants.com.tr</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Elite Plants. {t.footerRights}</p>
        <div className="footer-certifications">
          <span className="footer-cert-item">
            <ShieldCheck size={16} /> {t.footerCert}
          </span>
          <span className="footer-cert-item">
            <Leaf size={16} /> {t.footerCert2}
          </span>
        </div>
      </div>
    </footer>
  );
};
