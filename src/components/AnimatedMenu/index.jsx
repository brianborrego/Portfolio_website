import { motion } from 'framer-motion';

const STAGGER = 0.035;

export const TextRoll = ({ children, className = '', center = false }) => {
  const chars = children.split('');
  const midpoint = (chars.length - 1) / 2;

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={className}
      style={{
        position: 'relative',
        display: 'block',
        overflow: 'hidden',
        lineHeight: 'inherit',
      }}
    >
      {/* Top text — slides up on hover */}
      <div>
        {chars.map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - midpoint) : STAGGER * i;
          return (
            <motion.span
              key={i}
              variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
              transition={{ ease: 'easeInOut', delay }}
              style={{ display: 'inline-block' }}
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          );
        })}
      </div>

      {/* Bottom text — slides in from below on hover */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {chars.map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - midpoint) : STAGGER * i;
          return (
            <motion.span
              key={i}
              variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
              transition={{ ease: 'easeInOut', delay }}
              style={{ display: 'inline-block' }}
            >
              {l === ' ' ? '\u00A0' : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};
