import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import DarkVeil from '../../components/DarkVeil/DarkVeil';
import { TextRoll } from '../../components/AnimatedMenu';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;

    const body = `${message}\n\n—\n${name}\n${email}`;
    window.location.href = `mailto:brianborrego2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" ref={ref} className={styles.section}>
      <div className={styles.canvas}>
        <DarkVeil
          hueShift={30}
          noiseIntensity={0.08}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Left: Form */}
        <div className={styles.formSide}>
          <h2 className={styles.title}>CONTACT ME</h2>
          <p className={styles.intro}>
            Feel free to reach out for collaborations, opportunities, or just a friendly hello!
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={styles.input}
              autoComplete="name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              autoComplete="email"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className={styles.input}
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              className={styles.textarea}
            />
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>

        {/* Right: Link menu */}
        <div className={styles.menuSide}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="mailto:brianborrego2004@gmail.com" className={styles.menuLink}>
                <TextRoll center className={styles.menuText}>Email</TextRoll>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="https://github.com/brianborrego" target="_blank" rel="noopener noreferrer" className={styles.menuLink}>
                <TextRoll center className={styles.menuText}>Github</TextRoll>
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="https://linkedin.com/in/borregobrian/" target="_blank" rel="noopener noreferrer" className={styles.menuLink}>
                <TextRoll center className={styles.menuText}>LinkedIn</TextRoll>
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      <p className={styles.copyright}>© 2026 Brian Borrego</p>
    </section>
  );
}
