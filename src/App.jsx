import HeroPage from './components/HeroPage/HeroPage';
import SideNav from './components/SideNav/SideNav';
import About from './sections/About/About';
import Experience from './sections/Experience/Experience';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';
import Contact from './sections/Contact/Contact';
import './App.css';

function App() {
  return (
    <div className="app" id="home">
      <SideNav />
      <HeroPage />
      <About />
      <Experience />
      <Skills />
      <div className="contact-reveal-wrapper">
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;
