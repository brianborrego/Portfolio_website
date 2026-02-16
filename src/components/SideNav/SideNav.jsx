import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './SideNav.module.css';

const navItems = [
  { id: 'about',      label: 'About Me'   },
  { id: 'experience', label: 'Experience' },
  { id: 'skills',     label: 'Skills'     },
  { id: 'projects',   label: 'Projects'   },
  { id: 'contact',    label: 'Contact'    },
];

export default function SideNav() {
  const [activeSection, setActiveSection] = useState('about');
  const [isLightTheme, setIsLightTheme]   = useState(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // ── Functionality: active tab ─────────────────────────────────────────
  // The active section is the LAST one whose top has crossed 40% of the
  // viewport height. Sections become active as they enter the upper portion
  // of the screen, independent of section height.
  useEffect(() => {
    const getActive = () => {
      const threshold = window.innerHeight * 0.4;
      let active = navItems[0].id;

      navItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= threshold) active = id;
      });

      setActiveSection(active);
    };

    getActive();
    window.addEventListener('scroll', getActive, { passive: true });
    return () => window.removeEventListener('scroll', getActive);
  }, []);

  // ── Aesthetic: light vs dark nav colors ──────────────────────────────
  // Completely separate from active-tab logic.
  // Light-background sections: Skills, Projects.
  // Dark-background sections: About, Experience, Contact (ColorBends).
  // Check if the viewport midpoint sits inside a light section.
  useEffect(() => {
    const getTheme = () => {
      const vh  = window.innerHeight;
      const mid = vh / 2;

      const inLight = ['skills', 'projects'].some(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= mid && bottom >= mid;
      });

      setIsLightTheme(inLight);
    };

    getTheme();
    window.addEventListener('scroll', getTheme, { passive: true });
    return () => window.removeEventListener('scroll', getTheme);
  }, []);

  // ─────────────────────────────────────────────────────────────────────

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const isSticky = window.getComputedStyle(el).position === 'sticky';
    if (isSticky) {
      const prev = el.previousElementSibling;
      window.scrollTo({
        top: prev ? prev.getBoundingClientRect().bottom + window.scrollY : 0,
        behavior: 'smooth',
      });
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav className={styles.nav} style={{ opacity }}>
      <ul className={styles.list}>
        {navItems.map(item => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <motion.button
                onClick={() => scrollToSection(item.id)}
                className={styles.navItem}
                aria-current={isActive ? 'true' : 'false'}
                animate={{
                  color: isActive
                    ? (isLightTheme ? '#000000' : '#ffffff')
                    : (isLightTheme ? '#555555' : '#808080'),
                }}
                whileHover={{
                  color: isActive
                    ? (isLightTheme ? '#000000' : '#ffffff')
                    : (isLightTheme ? '#222222' : '#b0b0b0'),
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {item.label}
              </motion.button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
