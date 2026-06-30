import React, { useState, useEffect, useRef } from 'react';
import { Sprout, ChevronLeft, ChevronRight, Eye, X, BookOpen, MapPin, TrendingUp, Maximize, Utensils, Snowflake, CalendarDays, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { ProductShowcase } from './ProductShowcase';
import type { VarietyDetail, FruitType } from '../types';
import type { TranslationDict } from '../i18n';

const BASE = import.meta.env.BASE_URL;
const cizimImg = `${BASE}images/çizim.png`;

interface ContentOverlayProps {
  activeFruit: FruitType;
  setActiveFruit: (fruit: FruitType) => void;
}

// Import all garden images from assets
import farm1 from '../assets/images/farm_1.jpeg';
import farm2 from '../assets/images/farm_2.jpeg';
import farm3 from '../assets/images/farm_3.jpeg';
import farm4 from '../assets/images/farm_4.jpeg';
import farm5 from '../assets/images/farm_5.jpeg';
import farm6 from '../assets/images/farm_6.jpeg';
import farm7 from '../assets/images/farm_7.jpeg';
import farm8 from '../assets/images/farm_8.jpeg';
import farm9 from '../assets/images/farm_9.jpeg';
import farm10 from '../assets/images/farm_10.jpeg';
import farm11 from '../assets/images/farm_11.jpeg';
import farm12 from '../assets/images/farm_12.jpeg';
import farm13 from '../assets/images/farm_13.jpeg';
import farm14 from '../assets/images/farm_14.jpeg';
import farm15 from '../assets/images/farm_15.jpeg';



const gardenImages = [
  farm1, farm2, farm3, farm4, farm5,
  farm6, farm7, farm8, farm9, farm10,
  farm11, farm12, farm13, farm14, farm15
];

const getAssetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const certTranslations: Record<string, {
  navCertificates: string;
  title: string;
  sub: string;
  cert1: string;
  cert2: string;
  zoom: string;
}> = {
  tr: {
    navCertificates: 'Sertifikalarımız',
    title: 'Organik Tarım Sertifikalarımız',
    sub: 'Tesislerimizde yetiştirilen tüm fidan ve meyvelerimiz, yetkilendirilmiş kuruluşlar tarafından denetlenerek T.C. Organik Tarım Sertifikası ile belgelendirilmiştir.',
    cert1: 'Organik Ürün Sertifikası',
    cert2: 'Müteşebbis Sertifikası',
    zoom: 'Büyütmek için tıklayın'
  },
  en: {
    navCertificates: 'Certificates',
    title: 'Our Organic Agriculture Certificates',
    sub: 'All saplings and fruits grown in our facilities are audited by authorized bodies and certified with the Official Organic Agriculture Certificate.',
    cert1: 'Organic Product Certificate',
    cert2: 'Organic Operator Certificate (Elite Plants Facilities)',
    zoom: 'Click to enlarge'
  },
  es: {
    navCertificates: 'Certificados',
    title: 'Nuestros Certificados de Agricultura Orgánica',
    sub: 'Todos los plantones y frutos cultivados en nuestras instalaciones están auditados y certificados por organismos oficiales.',
    cert1: 'Certificado de Producto Orgánico',
    cert2: 'Certificado de Operador Orgánico',
    zoom: 'Haga clic para ampliar'
  },
  fr: {
    navCertificates: 'Certificats',
    title: 'Nos Certificats d\'Agriculture Biologique',
    sub: 'Tous les plants et fruits cultivés dans nos installations sont contrôlés et certifiés par des organismes officiels.',
    cert1: 'Certificat de Produit Biologique',
    cert2: 'Certificat d\'Opérateur Biologique',
    zoom: 'Cliquez pour agrandir'
  },
  de: {
    navCertificates: 'Zertifikate',
    title: 'Unsere Bio-Zertifikate',
    sub: 'Alle in unseren Betrieben angebauten Setzlinge und Früchte sind von offiziellen Stellen geprüft und bio-zertifiziert.',
    cert1: 'Bio-Produktzertifikat',
    cert2: 'Bio-Betriebszertifikat',
    zoom: 'Klicken zum Vergrößern'
  },
  ru: {
    navCertificates: 'Сертификаты',
    title: 'Наши органические сертификаты',
    sub: 'Все саженцы и плоды, выращенные в наших питомниках, проверены и сертифицированы официальными органами.',
    cert1: 'Органический товарный сертификат',
    cert2: 'Органический эксплуатационный сертификат',
    zoom: 'Нажмите для увеличения'
  },
  zh: {
    navCertificates: '认证证书',
    title: '我们的有机农业认证',
    sub: '我们设施中种植的所有幼苗和水果均经过授权机构审核，并获得官方有机农业认证。',
    cert1: '有机产品认证',
    cert2: '有机运营商认证',
    zoom: '点击放大'
  },
  ja: {
    navCertificates: '証明書',
    title: '有機農業認定証',
    sub: '当施設のすべての苗木および果実は、認可機関による監査を受け、公式の有機農業認定を受けています。',
    cert1: '有機製品認定証',
    cert2: '有機事業者認定証',
    zoom: 'クリックして拡大'
  },
  ar: {
    navCertificates: 'شهاداتنا',
    title: 'شهادات الزراعة العضوية لدينا',
    sub: 'جميع الشتلات والفواكه المزروعة في مرافقنا تخضع لتدقيق الجهات المعتمدة ومرخصة بشهادة الزراعة العضوية الرسمية.',
    cert1: 'شهادة المنتج العضوية',
    cert2: 'شهادة المشغل العضوية',
    zoom: 'انقر للتكبير'
  }
};

export const ContentOverlay: React.FC<ContentOverlayProps> = ({ activeFruit, setActiveFruit }) => {
  const { t } = useTranslation();
  const [gardenIndex, setGardenIndex] = useState(0);
  const [expandedVarietyId, setExpandedVarietyId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [aboutTab, setAboutTab] = useState<'story' | 'organic' | 'terroir'>('story');
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Autoplay slideshow effect
  useEffect(() => {
    if (!isAutoplay || gardenImages.length === 0) return;
    
    const interval = setInterval(() => {
      setGardenIndex((prev) => (prev + 1) % gardenImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, gardenImages.length]);

  const getTranslated = (
    id: string,
    field: 'tag' | 'desc' | 'origin' | 'growth' | 'size' | 'taste' | 'chill' | 'harvest' | 'shelf',
    fallback: string
  ): string => {
    const key = `${id}_${field}` as keyof TranslationDict;
    return t[key] || fallback;
  };

  const varietyData: Record<string, VarietyDetail[]> = {
    blackberry: [
      {
        id: 'caddo',
        name: 'Caddo® Karaberry',
        type: 'blackberry',
        tag: t.caddo_tag,
        description: t.caddo_desc,
        image: '/images/caddo_blackberry.jpg',
        origin: t.caddo_origin,
        growth: t.caddo_growth,
        fruitSize: t.caddo_size,
        taste: t.caddo_taste,
        chillHours: t.caddo_chill,
        harvest: t.caddo_harvest,
        shelfLife: t.caddo_shelf
      },
      {
        id: 'a2526t',
        name: 'A-2526T Karaberry',
        type: 'blackberry',
        tag: t.a2526t_tag,
        description: t.a2526t_desc,
        image: '/images/a2526t.png',
        origin: t.a2526t_origin,
        growth: t.a2526t_growth,
        fruitSize: t.a2526t_size,
        taste: t.a2526t_taste,
        chillHours: t.a2526t_chill,
        harvest: t.a2526t_harvest,
        shelfLife: t.a2526t_shelf
      },
      {
        id: 'traveler',
        name: 'Traveler™ Karaberry',
        type: 'blackberry',
        tag: t.traveler_tag,
        description: t.traveler_desc,
        image: '/images/traveler_blackberry.jpg',
        origin: t.traveler_origin,
        growth: t.traveler_growth,
        fruitSize: t.traveler_size,
        taste: t.traveler_taste,
        chillHours: t.traveler_chill,
        harvest: t.traveler_harvest,
        shelfLife: t.traveler_shelf
      }
    ],
    raspberry: [
      {
        id: 'kokanee',
        name: 'Kokanee cv. Alberry',
        type: 'raspberry',
        tag: t.kokanee_tag,
        description: t.kokanee_desc,
        image: '/images/farm_14.jpeg',
        origin: t.kokanee_origin,
        growth: t.kokanee_growth,
        fruitSize: t.kokanee_size,
        taste: t.kokanee_taste,
        chillHours: t.kokanee_chill,
        harvest: t.kokanee_harvest,
        shelfLife: t.kokanee_shelf
      }
    ],
    blueberry: [
      {
        id: 'cupla',
        name: 'Cupla Gökberry',
        type: 'blueberry',
        tag: t.cupla_tag,
        description: t.cupla_desc,
        image: '/images/cupla_blueberry.jpg',
        origin: t.cupla_origin,
        growth: t.cupla_growth,
        fruitSize: t.cupla_size,
        taste: t.cupla_taste,
        chillHours: t.cupla_chill,
        harvest: t.cupla_harvest,
        shelfLife: t.cupla_shelf
      }
    ]
  };

  const thumbnailBarRef = useRef<HTMLDivElement>(null);

  // Reset expanded variety when changing fruit category
  useEffect(() => {
    setExpandedVarietyId(varietyData[activeFruit] && varietyData[activeFruit][0] ? varietyData[activeFruit][0].id : null);
  }, [activeFruit]);


  // Scroll active thumbnail into view smoothly without jumping the window
  useEffect(() => {
    if (thumbnailBarRef.current) {
      const activeEl = thumbnailBarRef.current.querySelector('.garden-thumb-item.active') as HTMLElement;
      if (activeEl) {
        const container = thumbnailBarRef.current;
        const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [gardenIndex]);

  const currentVarieties = varietyData[activeFruit] || [];
  const activeVariety = currentVarieties.find(v => v.id === expandedVarietyId) || currentVarieties[0];





  const renderBackgroundBerries = () => {
    const color = 'var(--color-primary)';
    
    const berryStyles = [
      { top: '10%', right: '8%', transform: 'rotate(15deg) scale(1.8)' },
      { bottom: '12%', left: '5%', transform: 'rotate(-25deg) scale(1.3)' },
      { top: '15%', left: '42%', transform: 'rotate(45deg) scale(0.9)' },
      { bottom: '8%', right: '35%', transform: 'rotate(-10deg) scale(1.4)' },
      { top: '45%', right: '2%', transform: 'rotate(70deg) scale(1.1)' }
    ];

    return (
      <div className="tab-bg-fruits" style={{ color }}>
        {berryStyles.map((style, idx) => (
          <div key={idx} className="bg-fruit-item" style={{ ...style, position: 'absolute', opacity: 0.06, pointerEvents: 'none', transition: 'all 0.5s ease' }}>
            {activeFruit === 'blackberry' && (
              <svg width="24" height="28" viewBox="0 0 24 28" fill="currentColor">
                <circle cx="12" cy="8" r="4.5" />
                <circle cx="8" cy="12" r="4.5" />
                <circle cx="16" cy="12" r="4.5" />
                <circle cx="12" cy="16" r="4.5" />
                <circle cx="8" cy="20" r="4.5" />
                <circle cx="16" cy="20" r="4.5" />
                <circle cx="12" cy="24" r="4" />
                <path d="M12,4 L11,1 M12,4 L13,1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            {activeFruit === 'raspberry' && (
              <svg width="24" height="26" viewBox="0 0 24 26" fill="currentColor">
                <circle cx="12" cy="8" r="4.5" />
                <circle cx="8" cy="12" r="4.5" />
                <circle cx="16" cy="12" r="4.5" />
                <circle cx="12" cy="16" r="4.5" />
                <circle cx="9" cy="19" r="4" />
                <circle cx="15" cy="19" r="4" />
                <circle cx="12" cy="22" r="3.5" />
                <path d="M12,4 L11,1 M12,4 L13,1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            {activeFruit === 'blueberry' && (
              <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor">
                <circle cx="13" cy="14" r="10" />
                <path d="M9,5 L11,7 L13,4 L15,7 L17,5 L16,8 L10,8 Z" fill="currentColor" />
              </svg>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      {/* 1. Hero Section - Full-bleed Photo */}
      <section id="home" className="hero-vintage-section">
        <img src={farm14} alt="" aria-hidden="true" className="hero-bg-image" />
        <div className="hero-bg-overlay" />

        <div className="hero-vintage-content">
          <h1 className="hero-vintage-title">
            {t.heroTitlePrefix}<span>{t.heroCursive}</span><br />{t.heroTitleSuffix}
          </h1>
          
          <p className="hero-vintage-desc">
            {t.heroDesc}
          </p>
          
          <button 
            className="btn-vintage-outline"
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t.heroExplore}
          </button>
        </div>
      </section>

      {/* 2. Signature Varieties Product Showcase */}
      <ProductShowcase
        activeFruit={activeFruit}
        setActiveFruit={setActiveFruit}
        images={{
          blackberry: varietyData.blackberry[0].image,
          raspberry: varietyData.raspberry[0].image,
          blueberry: varietyData.blueberry[0].image,
        }}
        badges={{
          blackberry: varietyData.blackberry[0].tag,
          raspberry: varietyData.raspberry[0].tag,
          blueberry: varietyData.blueberry[0].tag,
        }}
      />

      {/* 3. About/Farm Section */}
      <section
        id="about"
        className="scroll-section about-scroll-section"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* çizim.jpeg side decorations - blue tinted */}
        <div className="section-side-drawing left cizim-float">
          <img src={cizimImg} alt="" aria-hidden="true" style={{ width: 170, height: 'auto', opacity: 0.22, mixBlendMode: 'multiply', filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.1)' }} />
        </div>
        <div className="section-side-drawing right cizim-float-r">
          <img src={cizimImg} alt="" aria-hidden="true" style={{ width: 170, height: 'auto', opacity: 0.22, mixBlendMode: 'multiply', filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.1)', transform: 'scaleX(-1)' }} />
        </div>

        {/* About section inner content */}
        <div className="about-section">
          {/* Left Column: Text & Tabs & Stats */}
          <div className="about-text-col">
            <span className="section-tag">{t.navAbout}</span>
            <h2 className="section-title">{t.aboutTitle}</h2>
          
          <div className="about-tabs-nav">
            <button 
              className={`about-tab-btn ${aboutTab === 'story' ? 'active' : ''}`}
              onClick={() => setAboutTab('story')}
            >
              <BookOpen size={15} /> {t.aboutStoryTab}
            </button>
            <button 
              className={`about-tab-btn ${aboutTab === 'organic' ? 'active' : ''}`}
              onClick={() => setAboutTab('organic')}
            >
              <Sprout size={15} /> {t.aboutOrganicTab}
            </button>
          </div>

          <div className="about-tab-content">
            {renderBackgroundBerries()}
            {aboutTab === 'story' && (
              <div className="about-tab-pane">
                <h3 className="about-pane-title">{t.aboutStoryTitle}</h3>
                <p className="about-desc">
                  {t.aboutDesc1}
                </p>
              </div>
            )}
            {aboutTab === 'organic' && (
              <div className="about-tab-pane">
                <h3 className="about-pane-title">{t.aboutOrganicTitle}</h3>
                <p className="about-desc">
                  {t.aboutOrganicDesc}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column: Premium Photo Showcase Gallery */}
        <div className="about-media-col">
          <div className="gallery-showcase-container">
            {/* Main Preview Container */}
            <div className="gallery-main-viewport">
              <img
                src={gardenImages[gardenIndex]}
                alt={`Dereçine Organik Bahçemiz - Fotoğraf ${gardenIndex + 1}`}
                className="gallery-main-slide"
                onClick={() => setLightboxImage(gardenImages[gardenIndex])}
              />
              
              {/* Overlaid Navigation Arrows */}
              <button 
                className="gallery-side-arrow prev"
                onClick={() => {
                  setGardenIndex((prev) => (prev - 1 + gardenImages.length) % gardenImages.length);
                  setIsAutoplay(false);
                }}
                aria-label="Önceki"
              >
                <ChevronLeft size={20} />
              </button>

              <button 
                className="gallery-side-arrow next"
                onClick={() => {
                  setGardenIndex((prev) => (prev + 1) % gardenImages.length);
                  setIsAutoplay(false);
                }}
                aria-label="Sonraki"
              >
                <ChevronRight size={20} />
              </button>

              {/* Floating Page Chip */}
              <div className="gallery-page-chip">
                {gardenIndex + 1} / {gardenImages.length}
              </div>

              {/* Action Info overlay */}
              <div className="gallery-action-info" onClick={() => setShowAllPhotos(true)}>
                <span>{t.galleryViewAll} ({gardenImages.length})</span>
                <Eye size={14} />
              </div>
            </div>

            {/* Aligned Scrollable Thumbnail Strip */}
            <div className="gallery-thumbnails-strip" ref={thumbnailBarRef}>
              {gardenImages.map((src, idx) => (
                <button
                  key={src}
                  className={`gallery-thumb-btn garden-thumb-item ${idx === gardenIndex ? 'active' : ''}`}
                  onClick={() => {
                    setGardenIndex(idx);
                    setIsAutoplay(false);
                  }}
                >
                  <img src={src} alt={`Küçük Görsel ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
          
          {/* Progress bar centered under Showcase */}
          {isAutoplay && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '14px', width: '100%' }}>
              <div className="slideshow-progress-bar" style={{ position: 'relative', width: '160px', height: '3px', borderRadius: '2px', background: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
                <div key={gardenIndex} className="slideshow-progress-line" style={{ background: 'var(--color-primary)' }} />
              </div>
            </div>
          )}

        </div>
        </div>{/* end about-section inner */}
      </section>



      {/* 4. Varieties Section - Category Tabs + Accordion */}
      <section id="varieties" className="scroll-section varieties-section" style={{ width: '100%' }}>
        {/* çizim.jpeg side decorations for varieties */}
        <div className="section-side-drawing left cizim-float" style={{ opacity: 0.15 }}>
          <img src={cizimImg} alt="" aria-hidden="true" style={{ width: 155, height: 'auto', filter: 'saturate(1.3) brightness(0.95)' }} />
        </div>
        <div className="section-side-drawing right cizim-float-r" style={{ opacity: 0.15 }}>
          <img src={cizimImg} alt="" aria-hidden="true" style={{ width: 155, height: 'auto', filter: 'saturate(1.3) brightness(0.95)', transform: 'scaleX(-1)' }} />
        </div>

        <div className="varieties-header">
          <span className="section-tag">{t.navVarieties}</span>
          <h2 className="section-title">{t.varietiesTitle}</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 30px' }}>
            {t.varietiesSub}
          </p>
        </div>

        <div className="varieties-category-tabs">
          <button 
            className={`tab-btn blackberry ${activeFruit === 'blackberry' ? 'active' : ''}`}
            onClick={() => setActiveFruit('blackberry')}
          >
            Karaberry
          </button>
          <button 
            className={`tab-btn raspberry ${activeFruit === 'raspberry' ? 'active' : ''}`}
            onClick={() => setActiveFruit('raspberry')}
          >
            Alberry
          </button>
          <button 
            className={`tab-btn blueberry ${activeFruit === 'blueberry' ? 'active' : ''}`}
            onClick={() => setActiveFruit('blueberry')}
          >
            Gökberry
            <span className="tab-soon-badge">{t.varietiesSoon}</span>
          </button>
        </div>

        {currentVarieties.length > 0 && (
          <div className="varieties-split-layout">
            
            {/* Left Side: Photo Showcase (Sticky) */}
            <div className="varieties-left-column">
              <div className={`variety-sticky-3d variety-photo-panel--${activeFruit}`}>
                {activeVariety && (
                  <div className="variety-image-container">
                    {/* Accent bar — top edge color stripe */}
                    <div className="variety-photo-accent-bar" />

                    <img 
                      key={activeVariety.image}
                      src={getAssetPath(activeVariety.image)} 
                      alt={activeVariety.name} 
                      className="variety-showcase-img"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                    />
                    <div className="variety-image-overlay" />

                    {/* HUD — bottom info */}
                    <div className="variety-photo-hud">
                      <div className="variety-photo-hud-inner">
                        <span className="variety-photo-tag">{activeVariety.tag}</span>
                        <h3 className="variety-photo-name">{activeVariety.name}</h3>
                        <div className="variety-photo-divider" />
                        <div className="variety-photo-meta">
                          <span>🌿 {activeVariety.origin?.split('/')[0]?.trim()}</span>
                          <span>📅 {activeVariety.harvest?.split(':')[1]?.trim() || activeVariety.harvest}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Accordion Bento Cards */}
            <div className="varieties-right-column">
              {currentVarieties.map((variety) => {
                const isExpanded = expandedVarietyId === variety.id;
                
                return (
                  <div 
                    key={variety.id} 
                    className={`variety-bento-card glass-panel-glow ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => setExpandedVarietyId(isExpanded ? null : variety.id)}
                  >
                    <div className="variety-bento-header">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span className="variety-compact-tag">{variety.tag}</span>
                        {/* Chevron icon indicating expand/collapse */}
                        <div className={`bento-chevron ${isExpanded ? 'rotated' : ''}`}>
                          <ChevronRight size={20} />
                        </div>
                      </div>
                      <h3 className="modal-title" style={{ fontSize: '1.9rem', marginBottom: '12px' }}>
                        {variety.name}
                      </h3>
                      {isExpanded && (
                        <p className="variety-compact-desc" style={{ 
                           fontSize: '0.92rem', 
                           color: 'var(--text-secondary)', 
                           lineHeight: '1.6', 
                           marginBottom: '24px',
                           marginTop: '8px',
                           transition: 'all 0.4s ease'
                        }}>
                          {getTranslated(variety.id, 'desc', variety.description)}
                        </p>
                      )}
                    </div>

                    {/* Expandable Content Area */}
                    <div className="variety-bento-content" style={{
                      maxHeight: isExpanded ? '1000px' : '0',
                      opacity: isExpanded ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '0.05em', marginBottom: '15px' }}>
                        {t.modalFeatures}
                      </h4>

                      <div className="bento-grid">
                        <div className="bento-item">
                          <div className="bento-item-header">
                            <MapPin size={14} className="bento-item-icon" />
                            <span className="spec-name">{t.modalOrigin}</span>
                          </div>
                          <span className="spec-value">{getTranslated(variety.id, 'origin', variety.origin)}</span>
                        </div>
                        <div className="bento-item">
                          <div className="bento-item-header">
                            <TrendingUp size={14} className="bento-item-icon" />
                            <span className="spec-name">{t.modalGrowth}</span>
                          </div>
                          <span className="spec-value">{getTranslated(variety.id, 'growth', variety.growth)}</span>
                        </div>
                        <div className="bento-item">
                          <div className="bento-item-header">
                            <Maximize size={14} className="bento-item-icon" />
                            <span className="spec-name">{t.modalFruitSize}</span>
                          </div>
                          <span className="spec-value">{getTranslated(variety.id, 'size', variety.fruitSize)}</span>
                        </div>
                        <div className="bento-item">
                          <div className="bento-item-header">
                            <Utensils size={14} className="bento-item-icon" />
                            <span className="spec-name">{t.modalTaste}</span>
                          </div>
                          <span className="spec-value">{getTranslated(variety.id, 'taste', variety.taste)}</span>
                        </div>
                        <div className="bento-item">
                          <div className="bento-item-header">
                            <Snowflake size={14} className="bento-item-icon" />
                            <span className="spec-name">{t.modalChill}</span>
                          </div>
                          <span className="spec-value">{getTranslated(variety.id, 'chill', variety.chillHours)}</span>
                        </div>
                        <div className="bento-item">
                          <div className="bento-item-header">
                            <CalendarDays size={14} className="bento-item-icon" />
                            <span className="spec-name">{t.modalHarvest}</span>
                          </div>
                          <span className="spec-value">{getTranslated(variety.id, 'harvest', variety.harvest)}</span>
                        </div>
                        {getTranslated(variety.id, 'shelf', variety.shelfLife) && (
                          <div className="bento-item full-width">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <div className="bento-item-header">
                                <ShieldCheck size={14} className="bento-item-icon" />
                                <span className="spec-name">{t.modalShelfLife}</span>
                              </div>
                              <span className="spec-value">{getTranslated(variety.id, 'shelf', variety.shelfLife)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>
        )}
      </section>

      {/* Garden Lightbox Modal */}
      <div className={`lightbox-overlay ${lightboxImage ? 'open' : ''}`} onClick={() => setLightboxImage(null)}>
        {lightboxImage && (
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
              <X size={20} />
            </button>
            <img src={lightboxImage} alt="Bahçemizden Büyük Görsel" />
          </div>
        )}
      </div>

      {/* Grid Gallery Modal to view ALL garden photos */}
      <div className={`modal-overlay ${showAllPhotos ? 'open' : ''}`} onClick={() => setShowAllPhotos(false)}>
        <div 
          className="modal-content glass-panel-glow" 
          style={{ 
            maxWidth: '1100px', 
            maxHeight: '90vh', 
            padding: '30px', 
            borderRadius: '28px',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={() => setShowAllPhotos(false)}>
            <X size={20} />
          </button>
          
          <div style={{ marginBottom: '24px' }}>
            <span className="section-tag">{t.galleryTitle}</span>
            <h3 className="modal-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{t.gallerySub}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
              {t.galleryDesc.replace('{count}', String(gardenImages.length))}
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '12px',
            paddingTop: '10px'
          }}>
            {gardenImages.map((src, idx) => (
              <div 
                key={src}
                onClick={() => {
                  setLightboxImage(src);
                }}
                style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  height: '140px', 
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.05)',
                  position: 'relative'
                }}
                className="glass-panel"
              >
                <img 
                  src={src} 
                  alt={`Bahçe Fotoğrafı ${idx + 1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.3s ease' }}
                  className="gallery-grid-img"
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.2)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
                className="gallery-grid-overlay"
                >
                  <Eye size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
