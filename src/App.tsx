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
