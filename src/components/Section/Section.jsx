import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Section.module.css';

export default function Section({ id, title, children, className = '', noAnimation = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section id={id} ref={ref} className={`${styles.section} ${className}`}>
      <div className={styles.container}>
        <motion.div
          initial={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={noAnimation ? { opacity: 1, y: 0 } : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.content}>
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
