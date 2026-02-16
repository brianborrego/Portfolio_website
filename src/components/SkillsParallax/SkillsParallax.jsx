import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import styles from './SkillsParallax.module.css';

export const SkillsParallax = ({ languages, technologies }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Calculate parallax transforms
  // Left column (languages) scrolls slower - moves less
  // Right column (technologies) scrolls faster - moves more
  // They align at the bottom
  const languagesY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const technologiesY = useTransform(scrollYProgress, [0, 1], [100, -150]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.columnsWrapper}>
        {/* Languages column - left */}
        <motion.div className={styles.column} style={{ y: languagesY }}>
          {languages.map((logo, idx) => (
            <div key={`lang-${idx}`} className={styles.iconWrapper}>
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className={styles.icon}
              />
            </div>
          ))}
        </motion.div>

        {/* Technologies column - right */}
        <motion.div className={styles.column} style={{ y: technologiesY }}>
          {technologies.map((logo, idx) => (
            <div key={`tech-${idx}`} className={styles.iconWrapper}>
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className={styles.icon}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsParallax;
