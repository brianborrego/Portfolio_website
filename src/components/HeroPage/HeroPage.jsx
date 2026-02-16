import { useState, useEffect } from 'react';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ColorBends from '../ColorBends/ColorBends';
import { TextRoll } from '../AnimatedMenu';
import styles from './HeroPage.module.css';

const STAGGER = 0.035;

// Write-in entry animation for "Brian Borrego" + TextRoll hover afterward
const NameReveal = ({ children, className }) => {
  const controls = useAnimation();
  const [entryDone, setEntryDone] = useState(false);
  const chars = children.split('');
  const midpoint = (chars.length - 1) / 2;

  useEffect(() => {
    controls.start('enter');
    // 0.1s delay + 12 chars x 0.055s stagger + 0.5s duration ~ 1.3s total
    const t = setTimeout(() => setEntryDone(true), 1400);
    return () => clearTimeout(t);
  }, [controls]);

  return (
    <motion.span
      initial="initial"
      animate={entryDone ? 'rest' : controls}
      whileHover="hovered"
      variants={{
        initial: {},
        enter: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
        rest: {},
        hovered: { transition: { staggerChildren: STAGGER } },
      }}
      className={className}
      style={{
        position: 'relative',
        display: 'block',
        overflow: 'hidden',
        lineHeight: 'inherit',
      }}
    >
      {/* Top layer — writes in on load, slides up on hover */}
      <div>
        {chars.map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 50, opacity: 0 },
              enter: { y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } },
              rest: { y: 0, opacity: 1, transition: { ease: 'easeInOut', duration: 0.35 } },
              hovered: {
                y: '-100%',
                transition: { ease: 'easeInOut', delay: STAGGER * Math.abs(i - midpoint) },
              },
            }}
            style={{ display: 'inline-block' }}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </div>

      {/* Bottom layer — slides in from below on hover */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {chars.map((l, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: '100%' },
              enter: { y: '100%', transition: { duration: 0 } },
              rest: { y: '100%', transition: { duration: 0 } },
              hovered: {
                y: 0,
                transition: { ease: 'easeInOut', delay: STAGGER * Math.abs(i - midpoint) },
              },
            }}
            style={{ display: 'inline-block' }}
          >
            {l === ' ' ? '\u00A0' : l}
          </motion.span>
        ))}
      </div>
    </motion.span>
  );
};

export const HeroPage = () => {
  const { scrollY } = useScroll();
  const [phase, setPhase] = useState('intro');

  const handleScroll = (e, href) => {
    e.preventDefault();
    document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Write-in completes ~1.4s + 0.4s pause before nav items expand
    const timer = setTimeout(() => setPhase('expand'), 1800);

    return () => {
      clearTimeout(timer);
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(preconnect1)) document.head.removeChild(preconnect1);
      if (document.head.contains(preconnect2)) document.head.removeChild(preconnect2);
    };
  }, []);

  const navItems = [
    { name: 'Experience', href: '#experience' },
    { name: 'Technical Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className={styles.hero}>
      <div className={styles.canvas}>
        <ColorBends
          colors={['#7a0a28', '#5a1a7a', '#0a3a5a', '#0a4a20', '#6a3000', '#6a1010']}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0.75}
          parallax={0.5}
          noise={0.15}
          transparent={false}
          autoRotate={0.5}
        />
      </div>
      <div className={styles.fade} />

      <motion.div style={{ y, opacity }} className={styles.menu}>
        <motion.ul layout className={styles.menuList}>

          {/* Brian Borrego — always visible; layout prop animates it upward when nav items appear */}
          <motion.li layout className={styles.menuItem}>
            <a href="#about" onClick={(e) => handleScroll(e, '#about')} className={styles.menuLink}>
              <NameReveal className={styles.menuText}>Brian Borrego</NameReveal>
            </a>
          </motion.li>

          {/* Nav items — clip-reveal downward after Brian Borrego writes in */}
          <AnimatePresence>
            {phase === 'expand' && navItems.map((item, i) => (
              <motion.li
                key={item.href}
                className={styles.menuItem}
                initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                transition={{ delay: i * 0.12, duration: 0.45, ease: 'easeOut' }}
              >
                <a href={item.href} onClick={(e) => handleScroll(e, item.href)} className={styles.menuLink}>
                  <TextRoll center className={styles.menuText}>
                    {item.name}
                  </TextRoll>
                </a>
              </motion.li>
            ))}
          </AnimatePresence>

        </motion.ul>
      </motion.div>
    </div>
  );
};

export default HeroPage;
