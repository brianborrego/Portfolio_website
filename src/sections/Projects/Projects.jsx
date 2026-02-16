import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const projects = [
  {
    id: "upantry",
    name: "uPantry",
    description:
      "AI-powered food waste prevention iOS app with real-time pantry tracking, barcode scanning, and visual intelligence",
    tech: "SWIFT · SWIFTUI · IOS · VISION TOOLKIT · SUPABASE · EDAMAM API",
    image: "/img/Project_mocks/uPantry_mock.png",
    github: "https://github.com/brianborrego/uPantry",
  },
  {
    id: "website",
    name: "Personal Website",
    description:
      "Interactive portfolio website you are currently on — webception",
    tech: "REACT · THREE.JS · FRAMER MOTION · TAILWIND CSS",
    image: "/img/Project_mocks/Website_mock.png",
    github: "https://github.com/brianborrego/Portfolio_website",
  },
  {
    id: "fuelfinder",
    name: "Fuel Finder",
    description:
      "Route optimization tool using graph algorithms for fuel-efficient travel",
    tech: "C++ · REACT · NODE.JS · EXPRESS · GOOGLE MAPS API · MONGODB",
    image: "/img/Project_mocks/Fuel%20Finder_mock.png",
    github: "https://github.com/brianborrego/Fuel-Find",
  },
  {
    id: "gitfit",
    name: "GitFit",
    description:
      "Full-stack fitness analytics web app with workout tracking and data visualization",
    tech: "PYTHON · PANDAS · REACT · NODE.JS · EXPRESS · MONGODB",
    image: "/img/Project_mocks/GitFit.png",
    github: "https://github.com/brianborrego/GitFit",
  },
  {
    id: "minesweeper",
    name: "Minesweeper",
    description:
      "Customizable Minesweeper game with dynamic board dimensions, mine counts, and a local leaderboard system",
    tech: "C++ · SFML · GAME DEVELOPMENT",
    image: "/img/Project_mocks/Minesweeper.png",
    github: null,
  },
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imgVisible, setImgVisible] = useState(false);
  const imgRef = useRef(null);
  const rafRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const lerp = (a, b, t) => a + (b - a) * t;

  const animateImage = useCallback(() => {
    currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.15);
    currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.15);

    if (imgRef.current) {
      imgRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
    }

    rafRef.current = requestAnimationFrame(animateImage);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animateImage);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animateImage]);

  const handleMouseMove = (e) => {
    targetPos.current = {
      x: e.clientX - 40,
      y: e.clientY - 240,
    };

    if (!imgVisible) {
      currentPos.current = { ...targetPos.current };
      setImgVisible(true);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setImgVisible(false);
    setTimeout(() => setImgVisible(true), 0);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setImgVisible(false);
  };

  return (
    <>
    <section
      id="projects"
      data-theme="light"
      style={{
        position: "relative",
        zIndex: 2,
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        boxShadow: "0 40px 60px 10px rgba(0,0,0,0.5)",
        padding: "0 clamp(24px, 13vw, 250px)",
      }}
    >
      <style>{`
        .project-item {
          border-bottom: 1px solid #000;
          cursor: pointer;
          transition: background-color 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
                      padding 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
          padding: 28px 40px;
          position: relative;
          overflow: hidden;
        }

        .project-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          z-index: 0;
        }

        .project-item:hover::before {
          transform: scaleY(1);
        }

        .project-item:hover {
          padding: 32px 40px 36px 40px;
        }

        .project-name {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 28px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #000;
          transition: color 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
                      transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
          position: relative;
          z-index: 1;
          transform: translateX(0);
        }

        .project-item:hover .project-name {
          color: #fff;
          transform: translateX(16px);
        }

        .project-meta {
          position: relative;
          z-index: 1;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
                      opacity 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
                      transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
          transform: translateX(0) translateY(-4px);
        }

        .project-item:hover .project-meta {
          max-height: 80px;
          opacity: 1;
          transform: translateX(16px) translateY(0);
        }

        .project-description {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.7);
          margin-top: 8px;
          letter-spacing: 0.01em;
          line-height: 1.6;
        }

        .project-tech {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 10.5px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          margin-top: 6px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .cursor-image {
          position: fixed;
          top: 0;
          left: 0;
          width: 460px;
          height: 250px;
          pointer-events: none;
          z-index: 1000;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 8px 20px rgba(0,0,0,0.15);
          transition: opacity 0.25s ease;
        }

        .cursor-image-inner {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }

        .section-heading {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #fff;
          border-bottom: 1px solid #000;
          padding: 20px 0;
        }

        .heading-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(3rem, 7vw, 5rem);
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #000;
          line-height: 1;
          margin: 0;
        }

        .project-index {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(0,0,0,0.35);
          position: relative;
          z-index: 1;
          transition: color 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }

        .project-item:hover .project-index {
          color: rgba(255,255,255,0.35);
        }

        .project-image-thumb {
          display: none;
        }

        @media (max-width: 768px) {
          /* Reset all hover/animation behaviour */
          .project-item {
            padding: 20px 0;
            transition: none;
          }
          .project-item:hover {
            padding: 20px 0;
          }
          .project-item::before {
            display: none;
          }
          .project-item:hover .project-name {
            color: #000;
            transform: none;
          }
          .project-item:hover .project-index {
            color: rgba(0,0,0,0.35);
          }

          /* Always-visible single-column body */
          .project-mobile-row {
            display: flex;
            flex-direction: column;
            margin-top: 14px;
          }

          .project-image-thumb {
            display: block;
            width: 80%;
            aspect-ratio: 16 / 9;
            background-size: cover;
            background-position: center;
            border-radius: 4px;
            margin: 0 auto;
          }

          .project-meta {
            max-height: none !important;
            opacity: 1 !important;
            overflow: visible !important;
            transform: none !important;
            transition: none !important;
            margin-top: 12px;
            text-align: left;
          }

          .project-item:hover .project-meta {
            max-height: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .project-description {
            color: rgba(0,0,0,0.6) !important;
            margin-top: 0;
          }

          .project-tech {
            color: rgba(0,0,0,0.38) !important;
          }

          .section-heading {
            padding: 16px 0;
          }
          .cursor-image {
            display: none;
          }
        }
      `}</style>

      {/* Sticky heading */}
      <div className="section-heading">
        <h2 className="heading-text">Projects</h2>
      </div>

      {/* Projects list */}
      <div>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-item"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={() => project.github && window.open(project.github, "_blank", "noopener,noreferrer")}
            style={{
              ...(index === 0 ? { borderTop: "none" } : {}),
              cursor: project.github ? "pointer" : "default",
            }}
          >
            <div className="project-index">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="project-name">{project.name}</div>
            <div className="project-mobile-row">
              <div
                className="project-image-thumb"
                style={{ backgroundImage: `url('${project.image}')` }}
              />
              <div className="project-meta">
                <div className="project-description">{project.description}</div>
                <div className="project-tech">{project.tech}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>

    {createPortal(
      <div
        ref={imgRef}
        className="cursor-image"
        style={{
          opacity: hoveredIndex !== null && imgVisible ? 1 : 0,
        }}
      >
        {hoveredIndex !== null && (
          <div
            className="cursor-image-inner"
            style={{
              backgroundImage: `url('${projects[hoveredIndex].image}')`,
            }}
          />
        )}
      </div>,
      document.body
    )}
    </>
  );
}
