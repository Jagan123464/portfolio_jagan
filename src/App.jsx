import { useState, useEffect } from 'react';
import './App.css';

// Common components
import Navbar       from './components/common/Navbar/Navbar';
import ScrollToTop  from './components/common/ScrollToTop/ScrollToTop';

// Section components
import Hero          from './sections/Hero/Hero';
import About         from './sections/About/About';
import Skills        from './sections/Skills/Skills';
import Projects      from './sections/Projects/Projects';
import Experience    from './sections/Experience/Experience';
import Education     from './sections/Education/Education';
import Certifications from './sections/Certifications/Certifications';
import Contact       from './sections/Contact/Contact';

// Section IDs for scroll-spy (order matters)
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'certs', 'contact'];

/**
 * App — root component.
 * Handles global scroll tracking and passes derived state to Navbar & ScrollToTop.
 * All section-specific state lives inside the individual section components.
 */
export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showBtt, setShowBtt]             = useState(false);

  // Scroll-spy: track active section + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      setShowBtt(window.scrollY > 400);

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 100 && r.bottom > 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Animated background */}
      <div className="bg-mesh">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>
      <div className="bg-grid" />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <footer>
        <p>
          Designed &amp; Built by <strong>Jagan M</strong> ·{' '}
          <span className="fc">Java Full Stack Developer</span> ·{' '}
          {new Date().getFullYear()}
        </p>
      </footer>

      {/* Back to top */}
      <ScrollToTop show={showBtt} />
    </>
  );
}
