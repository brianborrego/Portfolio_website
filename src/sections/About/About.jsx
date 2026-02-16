import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';
import TextType from '../../components/TextType/TextType';

export default function About() {
  const ref = useRef(null);
  const svgPathRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [debug, setDebug] = useState({});
  const scrollCountRef = useRef(0);

  useEffect(() => {
    const path = svgPathRef.current;
    const section = ref.current;
    if (!path || !section) return;

    const pathLen = path.getTotalLength();
    console.log('[SVG] pathLen:', pathLen);

    // Temporarily skip hiding so we can confirm the SVG renders
    // path.setAttribute('stroke-dasharray', pathLen);
    // path.setAttribute('stroke-dashoffset', pathLen);

    const handleScroll = () => {
      scrollCountRef.current += 1;

      let sectionTop = 0;
      let el = section;
      while (el) {
        sectionTop += el.offsetTop;
        el = el.offsetParent;
      }

      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const animStart = 800;   // user-specified: start drawing here
      const animEnd   = 1000;   // user-specified: finish at bottom of section
      const progress = Math.max(0, Math.min(1, (scrollY - animStart) / (animEnd - animStart)));

      setDebug({ scrollEvents: scrollCountRef.current, pathLen: pathLen.toFixed(0), sectionTop, sectionHeight, scrollY: scrollY.toFixed(0), animStart, animEnd, progress: progress.toFixed(3) });

      if (pathLen > 0) {
        path.setAttribute('stroke-dasharray', pathLen);
        path.setAttribute('stroke-dashoffset', pathLen * (1 - progress));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" ref={ref} className={styles.section}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <img
              src="/img/aboutMepic.png"
              alt="Brian Borrego"
              className={styles.profileImage}
            />
            <div className={styles['line-container']}>
              <svg viewBox="0 0 497 372" fill="none" preserveAspectRatio="xMidYMax meet">
                <path
                  ref={svgPathRef}
                  className={styles.signaturePath}
                  d="M17.5 122.603C27.8333 104.27 65.7 60.8033 134.5 33.6033C203.3 6.40325 240.833 3.93659 251 6.10325C264.667 8.43659 289.2 20.1033 278 48.1033C266.8 76.1033 214 112.77 189 127.603C171.248 138.136 141.395 145.307 125.577 148.58C124.387 148.827 124.021 147.408 125.17 147.01C143.872 140.542 183.249 127.603 199 127.603C220 127.603 261 129.103 274 134.103C287 139.103 295.5 144.103 300 158.603C303.6 170.203 281.167 212.603 269.5 232.603M269.5 232.603C269.5 232.603 243 271.27 223.5 287.103C204 302.937 168 330.103 160.5 334.103C156.505 336.234 96.5 367.603 57 366.103C17.5 364.603 5.50001 354.603 5.5 343.103C5.49999 333.041 12 314.603 69.5 294.103C114.378 278.103 210.3 234.603 269.5 254.603M269.5 232.603C293.277 202.135 332.986 128.125 344.056 107.199C344.59 106.19 346.104 106.739 345.904 107.862C341.259 134.043 322.952 233.502 312.645 235.331C312.039 235.438 311.857 234.685 312.251 234.212C318.5 226.704 332.254 208.096 343 186.603C357 158.603 372 111.603 371.5 106.603C371.1 102.603 359.5 155.103 359.5 155.103M359.5 155.103C359.5 155.103 371.8 110.603 391 110.603M359.5 155.103C359.5 155.103 343.5 193.503 359.5 195.103C379.5 197.103 413.5 142.645 413.5 130.103C413.5 117.562 366.833 180.27 393.5 173.103C420.167 165.937 454.161 132.057 451.782 118.267C449.404 104.476 449.999 153.317 441.674 157.34C433.349 161.362 482.109 107.349 481.514 101.603C480.919 95.8573 457.134 174.003 491.028 176.301M148 73.1033L134.5 306.603M385.201 84.4938C383.99 79.4601 380.154 69.4347 374.5 69.6033"
                  stroke="#FFFFFF"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.content}>
            <TextType
              as="p"
              className={styles.nameHeading}
              text={["I'm Brian Borrego,"]}
              loop={false}
              showCursor={true}
              startOnVisible={true}
              variableSpeed={{ min: 60, max: 120 }}
            />
            <div className={styles.bodyText}>
              <p>a Computer Science student at the <strong>University of Florida</strong> with a passion for <strong>AI</strong> and <strong>software development</strong>.</p>
              <p>I recently completed an 8-month internship at <strong>CrowdStrike</strong>, where I built AI-powered internal tools and automated systems that saved teams hours of work every week. I also served on the software engineering team at the UF Machine Intelligence Laboratory, contributing to the Subjugator 9 autonomous underwater vehicle. Other ways I stay involved on campus include SHPE and Camp Kesem.</p>
              <p>When I'm not coding, you'll find me outdoors exploring nature, staying active, or planning my next travel adventure. I believe the best engineers are endlessly <strong>curious</strong>, and I bring that same curiosity to every problem I solve.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
