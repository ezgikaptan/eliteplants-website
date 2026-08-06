import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import type { FruitType } from './types';
import { ContentOverlay } from './components/ContentOverlay';
import { Shop } from './components/Shop';
import { Footer } from './components/Footer';
import { SHOP_ENABLED } from './data/shopProducts';
import { ArrowUp } from 'lucide-react';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [activeFruit, setActiveFruit] = useState<FruitType>('blackberry');
  const [scrollSection, setScrollSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // The Shop page has no scroll-tracked sections, so it's always its own
  // "section" for nav-highlighting purposes; the home page derives its
  // active section from scroll position (tracked below).
  const activeSection = isHome ? scrollSection : 'shop';

  // Scroll-to-top button visibility — applies on every page
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll position when switching pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isHome]);

  // Active-section tracking only makes sense on the single-scroll home page
  useEffect(() => {
    if (!isHome) return;

    let lastSection = 'home';

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const sections = ['home', 'about', 'varieties', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportHeight * 0.4 && rect.bottom >= viewportHeight * 0.4) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection !== lastSection) {
        lastSection = currentSection;
        setScrollSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // A cross-page nav link (e.g. clicking "Hakkımızda" from the Shop page) lands
  // here with the target anchor id in router state, once the home page mounts.
  useEffect(() => {
    if (!isHome) return;
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [isHome, location.state]);

  return (
    <div className={`app-container active-sec-${activeSection}`}>
      {/* Premium film grain texture */}
      <div className="noise-overlay" />

      {/* Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Page Content */}
      <Routes>
        <Route
          path="/"
          element={<ContentOverlay activeFruit={activeFruit} setActiveFruit={setActiveFruit} />}
        />
        <Route path="/shop" element={SHOP_ENABLED ? <Shop /> : <Navigate to="/" replace />} />
      </Routes>

      {/* Corporate Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

export default App;
