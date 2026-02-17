import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from 'framer-motion';
import LogoLoop from '../../components/LogoLoop/LogoLoop';
import SkillsParallax from '../../components/SkillsParallax/SkillsParallax';
import styles from './Skills.module.css';

// Programming Languages in order from folder
const languageLogos = [
  { src: '/img/Languages/Python.png', alt: 'Python', title: 'Python' },
  { src: '/img/Languages/C.png', alt: 'C', title: 'C' },
  { src: '/img/Languages/C++.png', alt: 'C++', title: 'C++' },
  { src: '/img/Languages/Go.png', alt: 'Go', title: 'Go' },
  { src: '/img/Languages/SQL.png', alt: 'SQL', title: 'SQL' },
  { src: '/img/Languages/JavaScript.png', alt: 'JavaScript', title: 'JavaScript' },
  { src: '/img/Languages/HTML.png', alt: 'HTML', title: 'HTML' },
  { src: '/img/Languages/CSS.png', alt: 'CSS', title: 'CSS' },
  { src: '/img/Languages/Swift.png', alt: 'Swift', title: 'Swift' },
  { src: '/img/Languages/Java.png', alt: 'Java', title: 'Java' },
];

// Technologies in order from folder
const technologyLogos = [
  { src: '/img/Technologies/NodeJs.png', alt: 'Node.js', title: 'Node.js' },
  { src: '/img/Technologies/Express.png', alt: 'Express', title: 'Express' },
  { src: '/img/Technologies/React.png', alt: 'React', title: 'React' },
  { src: '/img/Technologies/Postgresql.png', alt: 'PostgreSQL', title: 'PostgreSQL' },
  { src: '/img/Technologies/Docker.png', alt: 'Docker', title: 'Docker' },
  { src: '/img/Technologies/Kubernetes.png', alt: 'Kubernetes', title: 'Kubernetes' },
  { src: '/img/Technologies/Jira.png', alt: 'Jira', title: 'Jira' },
  { src: '/img/Technologies/BitBucket.png', alt: 'BitBucket', title: 'BitBucket' },
  { src: '/img/Technologies/Supabase.png', alt: 'Supabase', title: 'Supabase' },
  { src: '/img/Technologies/Git.png', alt: 'Git', title: 'Git' },
  { src: '/img/Technologies/MongoDB.png', alt: 'MongoDB', title: 'MongoDB' },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [isLight, setIsLight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Fades to off-white as section enters fully.
  // Only fades back when scrolling UP (progress decreasing below 0.2).
  // Does NOT fade out when scrolling down into Projects — stays light.
  // On mobile, the range is tighter so the fade completes faster.
  const lightProgress = useTransform(scrollYProgress, (v) => {
    const [start, end] = isMobileRef.current ? [0.2, 0.3] : [0.2, 0.45];
    return Math.min(Math.max((v - start) / (end - start), 0), 1);
  });

  useMotionValueEvent(lightProgress, 'change', (v) => {
    setIsLight(v > 0.5);
  });

  // Use the same color transform for both background and fade - ensures perfect sync
  const bgColor    = useTransform(lightProgress, [0, 1], ['#000000', '#ffffff']);
  const titleColor = useTransform(lightProgress, [0, 1], ['#ffffff', '#0f0f0f']);
  const fadeColor  = useTransform(lightProgress, [0, 1], ['#000000', '#ffffff']);

  return (
    <motion.section
      id="skills"
      ref={ref}
      className={styles.section}
      style={{
        backgroundColor: bgColor,
        '--skills-fade-color': fadeColor
      }}
      data-theme={isLight ? 'light' : 'dark'}
    >
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h2 className={styles.title} style={{ color: titleColor }}>
            {isMobile ? 'SKILLS' : 'TECHNICAL SKILLS'}
          </motion.h2>

          {isMobile ? (
            <SkillsParallax
              languages={languageLogos}
              technologies={technologyLogos}
            />
          ) : (
            <div className={styles.loopsContainer}>
              {/* Languages loop - scrolling left */}
              <div className={styles.loopWrapper}>
                <LogoLoop
                  logos={languageLogos}
                  speed={100}
                  direction="left"
                  logoHeight={80}
                  gap={80}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="var(--skills-fade-color)"
                  ariaLabel="Programming Languages"
                />
              </div>

              {/* Technologies loop - scrolling right */}
              <div className={styles.loopWrapper}>
                <LogoLoop
                  logos={technologyLogos}
                  speed={100}
                  direction="right"
                  logoHeight={80}
                  gap={80}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="var(--skills-fade-color)"
                  ariaLabel="Technologies"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
