import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { profile } from '../data/profile';

const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const sectionIds = ['home', ...navItems.map((item) => item.toLowerCase())];
    let animationFrame = null;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140;
      const currentSection = sectionIds.reduce((activeId, id) => {
        const section = document.getElementById(id);
        if (!section) return activeId;
        return section.offsetTop <= scrollPosition ? id : activeId;
      }, 'home');

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        updateActiveSection();
        animationFrame = null;
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-night/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#home"
          className={`text-sm font-bold uppercase tracking-[0.24em] transition ${
            activeSection === 'home' ? 'text-cyan-200' : 'text-white hover:text-cyan-200'
          }`}
        >
          Aditya
        </a>
        <div className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          {navItems.map((item) => {
            const sectionId = item.toLowerCase();
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item}
                href={`#${sectionId}`}
                className={`relative rounded-full px-3 py-2 transition ${
                  isActive ? 'bg-cyan-300/10 text-cyan-200' : 'hover:text-cyan-300'
                }`}
              >
                {item}
                {isActive ? (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-cyan-300/20"
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  />
                ) : null}
              </a>
            );
          })}
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="hidden items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20 sm:inline-flex"
        >
          <FiDownload />
          Contact
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="mx-4 mb-4 rounded-3xl border border-white/10 bg-[#0b1220]/95 p-3 shadow-glass backdrop-blur-xl">
              <div className="grid gap-1">
                {navItems.map((item) => {
                  const sectionId = item.toLowerCase();
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={item}
                      href={`#${sectionId}`}
                      onClick={closeMenu}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        isActive ? 'bg-cyan-300/10 text-cyan-200' : 'text-slate-200 hover:bg-white/[0.06] hover:text-cyan-200'
                      }`}
                    >
                      {item}
                    </a>
                  );
                })}
                <a
                  href={`mailto:${profile.email}`}
                  onClick={closeMenu}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950"
                >
                  <FiDownload />
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
