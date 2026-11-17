import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import OpeningSplash from './components/OpeningSplash';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import SkillKeyboard from './components/SkillKeyboard';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useHashRoute } from './routes';
import { LangProvider, useLang } from './lang';
import { profile } from './data/profile';

const AiMascotAssistant = lazy(() => import('./components/AiMascotAssistant'));

const SPLASH_KEY = 'porto-splash-seen';
const SPLASH_MS = 1400;

const pages = {
  home: Hero,
  about: About,
  skills: SkillKeyboard,
  projects: Projects,
  achievements: Achievements,
  contact: Contact,
};

function useIdleMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((callback) => window.setTimeout(callback, 1200));
    const handle = idle(() => setReady(true));

    return () => {
      if (window.cancelIdleCallback && typeof handle === 'number') {
        window.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    };
  }, []);

  return ready;
}

function Shell() {
  const [showSplash, setShowSplash] = useState(
    () => !window.sessionStorage.getItem(SPLASH_KEY),
  );
  const mascotReady = useIdleMount();
  const route = useHashRoute();
  const { t } = useLang();
  const Page = pages[route] ?? Hero;

  useEffect(() => {
    if (!showSplash) return undefined;

    window.sessionStorage.setItem(SPLASH_KEY, '1');
    const timer = window.setTimeout(() => setShowSplash(false), SPLASH_MS);
    return () => window.clearTimeout(timer);
  }, [showSplash]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const label = t.nav[route] ?? route;
    document.title = `${label} | ${profile.name}`;
  }, [route, t]);

  return (
    <MotionConfig reducedMotion="user">
      <Sidebar route={route} />
      <div className="lg:pl-64">
        <OpeningSplash visible={showSplash} />
        <main className="pt-16 lg:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Page />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        {mascotReady ? (
          <Suspense fallback={null}>
            <AiMascotAssistant />
          </Suspense>
        ) : null}
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <LangProvider>
      <Shell />
    </LangProvider>
  );
}