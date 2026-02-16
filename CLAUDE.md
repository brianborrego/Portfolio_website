# Portfolio Website Implementation Plan

## Project Overview
Modern, mature personal portfolio website for Brian with smooth scroll animations, ColorBends background, and elegant navigation.

## Tech Stack
- **Framework**: React (Vite)
- **Styling**: CSS Modules + Vanilla CSS
- **Animation**: Framer Motion for scroll animations
- **3D Graphics**: Three.js (for ColorBends)
- **Deployment**: Vercel
- **Font**: Helvetica (system font fallback: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial)

## Project Structure
```
portfolio_website/
├── public/
├── src/
│   ├── components/
│   │   ├── ColorBends/
│   │   │   ├── ColorBends.jsx
│   │   │   └── ColorBends.css
│   │   ├── LandingSection/
│   │   │   ├── LandingSection.jsx
│   │   │   └── LandingSection.module.css
│   │   ├── SideNav/
│   │   │   ├── SideNav.jsx
│   │   │   └── SideNav.module.css
│   │   ├── Section/
│   │   │   ├── Section.jsx
│   │   │   └── Section.module.css
│   │   └── ScrollManager/
│   │       └── ScrollManager.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── vercel.json
```

## Implementation Phases

### Phase 1: Project Initialization
1. Initialize Vite React project
2. Install dependencies:
   - `three` (for ColorBends)
   - `framer-motion` (for scroll animations)
   - Development dependencies
3. Set up base CSS with Helvetica font family
4. Configure Vercel deployment (`vercel.json`)

### Phase 2: ColorBends Component
1. Create `ColorBends` component with provided code
2. Add `ColorBends.css` for container styling
3. Test rendering and performance
4. Configure colors for portfolio theme (professional palette)

### Phase 3: Landing Section
1. Create `LandingSection` component
2. Implement full viewport height (100vh)
3. Add centered text layout:
   - "Hello, I'm Brian" (large, bold)
   - "A passionate Software Developer" (smaller, elegant)
4. Integrate ColorBends as background
5. Style with Helvetica font

### Phase 4: Content Sections
1. Create reusable `Section` component with props:
   - `id`: section identifier
   - `title`: section heading
   - `children`: section content
2. Implement sections:
   - **About Me**: Placeholder biography text (2-3 paragraphs)
   - **Experience**: Placeholder timeline/list of positions
   - **Projects**: Placeholder project cards (3-4 projects)
   - **Contact**: Placeholder contact form or links
3. Black background for all content sections
4. Elegant typography with proper spacing

### Phase 5: Scroll Animation System
1. Implement scroll detection using Intersection Observer API
2. Create scroll progress tracking
3. Animate landing to content transition:
   - ColorBends background fade out (opacity 1 → 0)
   - Landing text fade out
   - Black background fade in
   - "About me" text fade in
   - Smooth transition (0.8-1.2s duration)
4. Use Framer Motion's `useScroll`, `useTransform`, and `motion` components
5. Optimize for 60fps performance

### Phase 6: Side Navigation
1. Create `SideNav` component (left-aligned, fixed position)
2. Navigation items: ["About me", "Experience", "Projects", "Contact"]
3. Implement visibility logic:
   - Hidden on landing section
   - Fade in when user scrolls past landing (trigger at ~80vh)
4. Implement active section highlighting:
   - Default: `color: #808080` (gray)
   - Active: `color: #ffffff` (white)
   - Smooth fade transition (0.3s)
5. Implement smooth scroll-to-section on click
6. Use Intersection Observer to detect active section

### Phase 7: Smooth Scrolling & Polish
1. Add smooth scroll behavior (CSS `scroll-behavior: smooth`)
2. Implement scroll snap for sections (optional)
3. Add subtle parallax effects (optional enhancement)
4. Optimize scroll performance:
   - Use `will-change` CSS property sparingly
   - Throttle scroll events
   - Use `transform` and `opacity` for animations (GPU-accelerated)

### Phase 8: Responsive Design
1. Mobile breakpoints:
   - Landing text sizing (viewport-relative units)
   - Side nav → hamburger menu or top nav on mobile
   - Section padding and typography adjustments
2. Tablet optimization
3. Test on various screen sizes

### Phase 9: Performance Optimization
1. Lazy load Three.js (ColorBends only on landing)
2. Code splitting for sections
3. Optimize bundle size
4. Add loading states
5. Test Core Web Vitals:
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

### Phase 10: Deployment
1. Configure Vercel project
2. Set up automatic deployments from git
3. Test production build
4. Configure custom domain (if applicable)
5. Set up analytics (optional)

## Key Technical Details

### Scroll Animation Strategy
```javascript
// Use Framer Motion's scroll-linked animations
const { scrollYProgress } = useScroll();
const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
const sectionOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
```

### Section Detection
```javascript
// Use Intersection Observer for active section tracking
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.5, rootMargin: '-100px 0px' }
  );
  // Observe all sections
}, []);
```

### ColorBends Configuration
```javascript
<ColorBends
  colors={["#1a1a2e", "#16213e", "#0f3460"]} // Professional dark blue palette
  rotation={0}
  speed={0.15}
  scale={1.2}
  frequency={0.8}
  warpStrength={1}
  mouseInfluence={0.8}
  parallax={0.3}
  noise={0.05}
  transparent={false}
  autoRotate={0.1}
/>
```

### Side Navigation Positioning
```css
.side-nav {
  position: fixed;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.nav-item {
  color: #808080;
  transition: color 0.3s ease;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.nav-item.active {
  color: #ffffff;
}
```

### Font System
```css
/* Base font setup in index.css */
body {
  font-family: "Helvetica Neue", Helvetica, -apple-system, BlinkMacSystemFont, Arial, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## Design Specifications

### Typography Scale
- **Landing Heading**: 4-6rem (responsive)
- **Landing Subheading**: 1.5-2rem
- **Section Headings**: 2.5-3rem
- **Body Text**: 1rem
- **Navigation**: 0.875rem

### Color Palette
- **Primary Background**: `#000000` (pure black)
- **Landing Background**: ColorBends (dark blue palette)
- **Primary Text**: `#ffffff` (white)
- **Secondary Text**: `#808080` (gray)
- **Accent**: `#0f3460` (dark blue, for subtle highlights)

### Spacing System
- **Section Padding**: 100px (vertical)
- **Content Max Width**: 1200px
- **Section Gap**: 80px
- **Navigation Gap**: 24px

### Animation Timings
- **Scroll Transitions**: 800ms ease-out
- **Navigation Fade**: 300ms ease
- **Section Reveal**: 600ms ease-out
- **Hover States**: 200ms ease

## Accessibility Considerations
1. Semantic HTML structure (`<header>`, `<main>`, `<section>`, `<nav>`)
2. Proper heading hierarchy (h1 → h2 → h3)
3. ARIA labels for navigation
4. Keyboard navigation support
5. Focus indicators
6. Reduced motion support (`prefers-reduced-motion`)
7. Color contrast ratios (WCAG AA minimum)

## Performance Targets
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 90+ (all categories)
- **Bundle Size**: < 200KB (gzipped)

## Future Enhancements (Post-MVP)
1. Dark/light mode toggle (optional, currently dark-only)
2. Cursor trail or custom cursor
3. Project filtering/search
4. Blog section
5. Animations on scroll for project cards
6. Loading screen with logo animation
7. Easter eggs or interactive elements
8. Multi-language support

## Testing Checklist
- [ ] ColorBends renders correctly
- [ ] Landing section is full viewport height
- [ ] Scroll animations are smooth (60fps)
- [ ] Side nav appears after scrolling
- [ ] Active section highlighting works
- [ ] All sections are accessible
- [ ] Responsive on mobile/tablet/desktop
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] No console errors
- [ ] Production build is optimized
- [ ] Deploys successfully to Vercel

## Development Commands
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

## Notes
- Prioritize smooth animations over complex features
- Keep design minimal and mature (no flashy effects)
- Ensure ColorBends doesn't impact scroll performance
- Test on various devices for consistency
- Consider adding a subtle grain texture overlay for sophistication
- Use placeholder content initially, replace with real content later
