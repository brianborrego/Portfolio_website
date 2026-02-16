# Portfolio Website

A modern, elegant personal portfolio website built with React, Three.js, and Framer Motion.

## Features

- **Animated Background**: ColorBends component with Three.js for dynamic, interactive 3D background
- **Smooth Scroll Animations**: Framer Motion for buttery-smooth scroll-linked animations
- **Side Navigation**: Fixed navigation with active section highlighting
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Typography**: Helvetica font family for clean, professional look
- **Accessibility**: WCAG AA compliant with keyboard navigation support

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics for ColorBends background
- **Framer Motion** - Animation library for scroll effects
- **CSS Modules** - Component-scoped styling

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel, and it will automatically build and deploy.

Alternatively, you can deploy manually:

```bash
npm install -g vercel
vercel --prod
```

## Project Structure

```
portfolio_website/
├── public/
│   └── img/              # Images (logos, icons, etc.)
├── src/
│   ├── components/
│   │   ├── ColorBends/   # Three.js animated background
│   │   ├── LandingSection/ # Hero section with intro text
│   │   ├── Section/      # Reusable content section component
│   │   └── SideNav/      # Fixed side navigation
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application-specific styles
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## Customization

### Update Personal Information

Edit [src/App.jsx](src/App.jsx) to update:
- Your name and tagline
- About section content
- Experience timeline
- Project showcases
- Contact links

### Change Colors

Update the ColorBends colors in [src/components/LandingSection/LandingSection.jsx](src/components/LandingSection/LandingSection.jsx):

```javascript
<ColorBends
  colors={["#1a1a2e", "#16213e", "#0f3460"]}
  // ... other props
/>
```

### Add Images

Place your images in the `public/img/` folder and reference them in your components:

```jsx
<img src="/img/your-image.png" alt="Description" />
```

## License

MIT

## Contact

For questions or feedback, reach out via the contact section on the website.
