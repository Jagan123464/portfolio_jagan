import { useState } from 'react';

// Navigation links — update here to add/remove nav items
const navLinks = [
  { href: '#about',      label: 'About'      },
  { href: '#skills',     label: 'Skills'     },
  { href: '#projects',   label: 'Projects'   },
  { href: '#experience', label: 'Experience' },
  { href: '#education',  label: 'Education'  },
  { href: '#contact',    label: 'Contact'    },
];

/**
 * Navbar — fixed top navigation with active-section highlighting and mobile hamburger menu.
 * Props:
 *   activeSection — currently visible section id (tracked in App.jsx via scroll)
 */
export default function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <a href="#hero" className="nav-logo">
          <span className="nl-br">&lt;</span>
          <span className="nl-nm">Jagan</span>
          <span className="nl-dt"></span>
          <span className="nl-nm">M</span>
          <span className="nl-br">/&gt;</span>
        </a>

        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={activeSection === l.href.slice(1) ? 'active' : ''}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="mailto:Jagan123464@gmail.com" className="nav-hire">Hire Me →</a>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="menu"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
