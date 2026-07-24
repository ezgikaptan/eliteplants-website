import React, { useState } from 'react';
import { X } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './SocialIcons';

const BASE = import.meta.env.BASE_URL;
const mascotImg = `${BASE}images/icons/blackberry-mascot-avatar.png`;

const INSTAGRAM_URL = 'https://www.instagram.com/hdogancukuru/';
const FACEBOOK_URL = 'https://www.facebook.com/huseyin.dogancukuru?locale=tr_TR';
const WHATSAPP_URL = 'https://wa.me/905334166484';

export const SocialWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`social-widget ${open ? 'open' : ''}`}>
      <div className="social-widget-menu">
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-widget-item fb"
          aria-label="Facebook"
          tabIndex={open ? 0 : -1}
          style={{ transitionDelay: open ? '0.02s' : '0s' }}
        >
          <FacebookIcon />
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-widget-item ig"
          aria-label="Instagram"
          tabIndex={open ? 0 : -1}
          style={{ transitionDelay: open ? '0.08s' : '0s' }}
        >
          <InstagramIcon />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-widget-item wa"
          aria-label="WhatsApp'tan mesaj gönder"
          tabIndex={open ? 0 : -1}
          style={{ transitionDelay: open ? '0.14s' : '0s' }}
        >
          <WhatsAppIcon />
        </a>
      </div>

      <button
        type="button"
        className="social-widget-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Menüyü kapat' : 'Bize ulaşın'}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <img src={mascotImg} alt="" aria-hidden="true" />}
      </button>
    </div>
  );
};
