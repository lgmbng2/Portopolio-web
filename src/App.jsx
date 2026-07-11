import { useEffect, useState } from 'react';
import OpeningSplash from './components/OpeningSplash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillKeyboard from './components/SkillKeyboard';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlobCursor from './components/BlobCursor';
import AiMascotAssistant from './components/AiMascotAssistant';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 3900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <BlobCursor color="#38bdf8" size={38} opacity={0.26} />
      <div className="relative z-10">
        <OpeningSplash visible={showSplash} />
        <Navbar />
        <main>
          <Hero />
          <About />
          <SkillKeyboard />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <Contact />
        </main>
        <Footer />
        <AiMascotAssistant />
      </div>
    </>
  );
}
