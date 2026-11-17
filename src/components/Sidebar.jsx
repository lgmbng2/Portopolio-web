import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMail, FiMenu, FiX } from 'react-icons/fi';
import { profile } from '../data/profile';
import { navItems } from '../routes';
import { useLang } from '../lang';
import Toggles from './Toggles';
import GithubCard from './GithubCard';

export default function Sidebar({ route }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const links = (
    <ul className="space-y-1">
      {navItems.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={() => setMenuOpen(false)}
            aria-current={route === item.id ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
              route === item.id
                ? 'bg-neutral-200 text-neutral-900'
                : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition ${
                route === item.id ? 'bg-neutral-900' : 'bg-neutral-300'
              }`}
              aria-hidden="true"
            />
            {t.nav[item.id] ?? item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  const cta = (
    <a
      href={`mailto:${profile.email}`}
      onClick={() => setMenuOpen(false)}
      className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-800 active:translate-y-[1px]"
    >
      <FiMail />
      {t.cta}
    </a>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-neutral-200 bg-canvas px-5 py-8 lg:flex">
        <a href="#home" className="text-lg font-black tracking-tight text-neutral-900">
          {profile.name}
        </a>
        <p className="mt-1 text-sm text-neutral-500">{profile.role}</p>
        <nav className="mt-10 flex-1">{links}</nav>
        <GithubCard />
        <div className="mt-3 space-y-3">
          <Toggles />
          {cta}
        </div>
      </aside>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-neutral-200 bg-canvas/90 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <a href="#home" className="font-black text-neutral-900">
            {profile.name}
          </a>
          <div className="flex items-center gap-2">
            <Toggles />
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 text-neutral-700"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              className="border-t border-neutral-200 px-5 pb-5 pt-4"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <div className="mt-4">
                {links}
                {cta}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}