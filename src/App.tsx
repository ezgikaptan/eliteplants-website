import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import type { FruitType } from './types';
import { ContentOverlay } from './components/ContentOverlay';
import { Footer } from './components/Footer';
import { ArrowUp } from 'lucide-react';

function App() {
  const [activeFruit, setActiveFruit] = useState<FruitType>('blackberry');
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let lastSection = 'home';
    
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Show scroll-to-top button if scrolled down past 400px
      setShowScrollTop(scrollY > 400);
      
      // Active section calculation based on viewport intersection
      const sections = ['home', 'about', 'varieties', 'contact'];
      let currentSection = 'home';
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section occupies the center of the screen, mark it as active
          if (rect.top <= viewportHeight * 0.4 && rect.bottom >= viewportHeight * 0.4) {
            currentSection = section;
            break;
          }
        }
      }
      
      if (currentSection !== lastSection) {
        lastSection = currentSection;
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`app-container active-sec-${activeSection}`}>
      {/* Premium film grain texture */}
      <div className="noise-overlay" />

      {/* Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Floating Social Sidebar */}
      <div className="social-sidebar">
        <a href="https://www.facebook.com/huseyin.dogancukuru/?locale=tr_TR" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="https://www.instagram.com/hdogancukuru" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
      </div>

      {/* Primary Scrollable Content Sections */}
      <ContentOverlay
        activeFruit={activeFruit}
        setActiveFruit={setActiveFruit}
      />

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
