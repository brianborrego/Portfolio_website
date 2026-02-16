import { useState, useEffect, useRef, useCallback } from 'react';
import Section from '../../components/Section/Section';
import styles from './Experience.module.css';

const EXPERIENCES = [
  {
    company: "CrowdStrike",
    role: "Software Engineer Intern",
    date: "May 2025 – Dec. 2025",
    location: "Remote",
    description: [
      "Built an internal AI agent and knowledge base system in Go and React, cutting SME response time by 60%",
      "Deployed via CI/CD (Jenkins + GoReleaser) with thread-safe data stores and scalable Kubernetes orchestration",
      "Exposed a RESTful API with real-time updates, intelligent caching, CRUD operations, and CORS support",
      "Automated document ingestion pipeline with RAG semantic search, reducing processing time by 90% and saving 10+ hrs/week",
    ],
    tags: ["Go", "React", "PostgreSQL", "Docker", "Kubernetes", "Jenkins", "REST API", "RAG", "AI"],
  },
  {
    company: "UF Machine Intelligence Laboratory",
    role: "Software Engineering Team Member",
    date: "Aug. 2024 – May 2025",
    location: "Gainesville, FL",
    description: [
      "Developed a database-driven alumni networking portal for the MIL website using React to boost long-term engagement",
      "Enhanced ROS2-based control modules and implemented parameterized speed control for the Subjugator 9 AUV (RoboSub 2025)",
    ],
    tags: ["React", "ROS2", "Python", "C++"],
  },
  {
    company: "National Auto Lenders",
    role: "Full Stack Development Intern",
    date: "May 2021 – Aug. 2021",
    location: "Miami, FL",
    description: [
      "Built a real-time dashboard for managing and displaying company server data, improving cross-team data access",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Git"],
  },
];

const TRACK_LEFT = 42;
const DOT_SIZE = 14;
const DOT_OFFSET_TOP = 32;
const FADE_MS = 500;
const STAGGER_MS = 350;

{/*
const AURORA_COLORS = [
  "#6d28d9", "#7c3aed", "#a855f7", "#c026d3",
  "#db2777", "#be185d", "#c026d3", "#9333ea",
  "#7c3aed", "#6d28d9",
];
*/}

// Metallic white with chrome aberration effect
const AURORA_COLORS = [
  "#FFFFFF", "#F8F8F8", "#E8E8E8", "#D3D3D3",
  "#C0C0C0", "#E0E0E0", "#CACACA", "#D8E8F0",
  "#B8B8B8", "#F0F0F0",
];

const AURORA_BG = {
  backgroundImage: `linear-gradient(135deg, ${AURORA_COLORS.join(", ")})`,
  backgroundSize: "400% 400%",
  backgroundAttachment: "fixed",
};
const AURORA_TEXT = {
  ...AURORA_BG,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function Experience() {
  const timelineRef = useRef(null);
  const entryRefs = useRef([]);
  const [lineTop, setLineTop] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [trackTop, setTrackTop] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const [dotYPositions, setDotYPositions] = useState([]);
  const [entryVisible, setEntryVisible] = useState(() => new Array(EXPERIENCES.length).fill(false));

  const [illuminated, setIlluminated] = useState(() => new Array(EXPERIENCES.length).fill(false));
  const [currentGlow, setCurrentGlow] = useState(-1);
  const [scrollActiveIdx, setScrollActiveIdx] = useState(-1);

  const queuedRef = useRef(new Set());
  const nextTimeRef = useRef(0);
  const timeoutsRef = useRef([]);

  const measure = useCallback(() => {
    if (!timelineRef.current || entryRefs.current.length === 0) return;
    const containerRect = timelineRef.current.getBoundingClientRect();
    const positions = entryRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.top - containerRect.top + DOT_OFFSET_TOP + DOT_SIZE / 2;
    });
    setDotYPositions(positions);
    if (positions.length >= 2) {
      setTrackTop(positions[0]);
      setTrackHeight(positions[positions.length - 1] - positions[0]);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const timer = setTimeout(measure, 300);
    return () => { window.removeEventListener("resize", measure); clearTimeout(timer); };
  }, [measure]);

  useEffect(() => {
    for (let idx = 0; idx <= scrollActiveIdx; idx++) {
      if (queuedRef.current.has(idx)) continue;
      queuedRef.current.add(idx);

      const now = Date.now();
      const scheduleAt = Math.max(now, nextTimeRef.current);
      nextTimeRef.current = scheduleAt + STAGGER_MS;

      const tid = setTimeout(() => {
        setIlluminated((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
        setCurrentGlow(idx);
      }, scheduleAt - now);
      timeoutsRef.current.push(tid);
    }

    for (let idx = scrollActiveIdx + 1; idx < EXPERIENCES.length; idx++) {
      if (queuedRef.current.has(idx)) {
        queuedRef.current.delete(idx);
      }
    }
    setIlluminated((prev) => {
      let changed = false;
      const next = prev.map((lit, i) => {
        if (i > scrollActiveIdx && lit) { changed = true; return false; }
        return lit;
      });
      return changed ? next : prev;
    });
  }, [scrollActiveIdx]);

  useEffect(() => {
    let highest = -1;
    for (let i = 0; i < illuminated.length; i++) {
      if (illuminated[i]) highest = i;
    }
    if (highest <= scrollActiveIdx) setCurrentGlow(highest);
  }, [illuminated, scrollActiveIdx]);

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    function onScroll() {
      if (!timelineRef.current || dotYPositions.length < 2) return;
      const containerRect = timelineRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const triggerY = viewH * 0.45 - containerRect.top;
      const firstDotY = dotYPositions[0];
      const lastDotY = dotYPositions[dotYPositions.length - 1];
      const clampedTrigger = Math.max(firstDotY, Math.min(lastDotY, triggerY));

      setLineTop(firstDotY);
      setLineHeight(Math.max(0, clampedTrigger - firstDotY));

      let best = -1;
      for (let i = 0; i < dotYPositions.length; i++) {
        if (clampedTrigger >= dotYPositions[i] - 2) best = i;
      }
      setScrollActiveIdx(best);

      entryRefs.current.forEach((el, i) => {
        if (!el) return;
        if (el.getBoundingClientRect().top < viewH * 0.78) {
          setEntryVisible((prev) => {
            if (prev[i]) return prev;
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dotYPositions]);

  useEffect(() => {
    const timer = setTimeout(measure, 700);
    return () => clearTimeout(timer);
  }, [entryVisible, measure]);


  return (
    <Section id="experience" title="Experience" className={styles.overlay} noAnimation={true}>
      <div ref={timelineRef} className={styles.timelineContainer}>
        {/* Background track */}
        <div
          className={styles.backgroundTrack}
          style={{
            position: "absolute",
            left: TRACK_LEFT,
            top: trackTop,
            height: trackHeight,
            width: 2,
            background: "rgba(113, 113, 122, 0.15)",
            borderRadius: 1,
            zIndex: 1,
          }}
        />

        {/* Aurora progress line */}
        <div
          className={`${styles.auroraLine} ${styles.progressLine}`}
          style={{
            position: "absolute",
            left: TRACK_LEFT,
            top: lineTop,
            width: 2,
            height: lineHeight,
            borderRadius: 1,
            ...AURORA_BG,
            transition: "height 0.08s linear",
            zIndex: 2,
          }}
        />
        <div
          className={`${styles.auroraLine} ${styles.progressLineGlow}`}
          style={{
            position: "absolute",
            left: TRACK_LEFT - 4,
            top: lineTop,
            width: 10,
            height: lineHeight,
            borderRadius: 5,
            ...AURORA_BG,
            opacity: 0.22,
            filter: "blur(6px)",
            transition: "height 0.08s linear",
            zIndex: 1,
          }}
        />

        {/* Entries */}
        {EXPERIENCES.map((exp, i) => {
          const isLit = illuminated[i];
          const isGlowing = currentGlow === i;
          const visible = entryVisible[i];
          const fd = `${FADE_MS}ms`;

          return (
            <div
              key={i}
              ref={(el) => (entryRefs.current[i] = el)}
              style={{
                position: "relative",
                paddingLeft: 36,
                marginBottom: i < EXPERIENCES.length - 1 ? 72 : 0,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(30px)",
                transition: "opacity 0.6s cubic-bezier(0.25,0.1,0.25,1), transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              {/* Dot */}
              <div
                className={isGlowing ? `${styles.auroraLine} ${styles.dotPulse}` : isLit ? styles.auroraLine : ''}
                style={{
                  position: "absolute",
                  left: -24,
                  top: DOT_OFFSET_TOP,
                  width: DOT_SIZE,
                  height: DOT_SIZE,
                  borderRadius: "50%",
                  zIndex: 10,
                  transition: `background ${fd} ease, border ${fd} ease, box-shadow ${fd} ease`,
                  ...(isLit ? AURORA_BG : {}),
                  // Old purple glow:
                  // ...(!isLit
                  //   ? { background: "rgba(39,39,42,0.9)", border: "2px solid rgba(113,113,122,0.3)" }
                  //   : { border: "none" }),
                  // boxShadow: isGlowing
                  //   ? "0 0 10px 3px rgba(147,51,234,0.5), 0 0 22px 6px rgba(192,38,211,0.3)"
                  //   : isLit
                  //   ? "0 0 6px 1px rgba(147,51,234,0.35)"
                  //   : "none",

                  // Metallic white glow with chrome tint
                  ...(!isLit
                    ? { background: "rgba(39,39,42,0.9)", border: "2px solid rgba(113,113,122,0.3)" }
                    : { border: "none" }),
                  boxShadow: isGlowing
                    ? "0 0 10px 4px rgba(255,255,255,0.9), 0 0 20px 8px rgba(220,220,220,0.7), 0 0 30px 12px rgba(200,210,220,0.5), 0 0 40px 16px rgba(192,192,192,0.3)"
                    : isLit
                    ? "0 0 6px 2px rgba(255,255,255,0.8), 0 0 12px 5px rgba(220,220,220,0.6), 0 0 20px 8px rgba(200,210,220,0.4)"
                    : "none",
                }}
              />

              {/* Connector */}
              <div
                className={isLit ? styles.auroraLine : ''}
                style={{
                  position: "absolute",
                  left: -10,
                  top: DOT_OFFSET_TOP + DOT_SIZE / 2 - 0.5,
                  width: 24,
                  height: 1,
                  ...(isLit ? AURORA_BG : {}),
                  opacity: isLit ? (isGlowing ? 0.4 : 0.15) : 0,
                  transition: `opacity ${fd} ease`,
                  maskImage: "linear-gradient(to right, white, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, white, transparent)",
                }}
              />

              {/* Date + Location */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span
                  className={isLit ? styles.auroraLine : ''}
                  style={{
                    fontSize: "0.8rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    transition: `color ${fd} ease`,
                    ...(isLit ? AURORA_TEXT : { color: "#52525b" }),
                  }}
                >
                  {exp.date}
                </span>
                <span style={{ fontSize: "0.72rem", color: "#52525b", fontWeight: 400 }}>•</span>
                <span style={{ fontSize: "0.75rem", color: "#52525b", fontWeight: 400 }}>
                  {exp.location}
                </span>
              </div>

              {/* Company */}
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  margin: "0 0 2px 0",
                  letterSpacing: "-0.02em",
                  fontFamily: '"Merriweather", serif',
                  color: isLit ? "#e4e4e7" : "#71717a",
                  transition: `color ${fd} ease`,
                }}
              >
                {exp.company}
              </h3>

              {/* Role */}
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  margin: "0 0 14px 0",
                  fontFamily: '"Merriweather", serif',
                  color: isLit ? "#a1a1aa" : "#52525b",
                  transition: `color ${fd} ease`,
                }}
              >
                {exp.role}
              </p>

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                  fontFamily: '"Merriweather", serif',
                  color: isLit ? "#a1a1aa" : "#52525b",
                  transition: `color ${fd} ease`,
                }}
              >
                {exp.description.map((line, j) => (
                  <span key={j}>
                    {j > 0 && (
                      <span
                        style={{
                          margin: "0 8px",
                          color: isLit ? "#52525b" : "#3f3f46",
                          transition: `color ${fd} ease`,
                        }}
                      >
                        •
                      </span>
                    )}
                    {line}
                  </span>
                ))}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                {exp.tags.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      padding: "4px 12px",
                      borderRadius: 20,
                      letterSpacing: "0.03em",
                      color: "#52525b",
                      background: "transparent",
                      border: "1px solid rgba(82,82,91,0.5)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
