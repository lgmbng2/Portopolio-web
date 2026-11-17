import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiMail, FiX } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import ImageFallback from './ImageFallback';
import { profile } from '../data/profile';
import { useLang } from '../lang';

export default function Hero() {
  const [unlocked, setUnlocked] = useState(false);
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-canvas px-4 pb-14 pt-24 sm:px-5 md:px-8 md:pb-20 lg:pt-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <motion.div
          className="relative isolate"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-sm font-semibold text-neutral-500">{profile.role}</p>

          <h1 className="mt-4 max-w-[18ch] text-4xl font-black leading-[1.08] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Muhammad Aditya.
          </h1>

          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-neutral-500">
            Full Stack Developer yang berfokus pada pengembangan aplikasi berbasis website dan Associate Data Scientist yang siap mengolah hingga menyajikan data.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 active:translate-y-[1px]"
            >
              {t.hero.ctaProjects}
              <FiArrowUpRight />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-400 hover:bg-white active:translate-y-[1px]"
            >
              {t.hero.ctaContact}
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-neutral-200 pt-6">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-sm text-neutral-500">{stat.label}</dt>
                <dd className="text-2xl font-black text-neutral-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setUnlocked(true)}
          className="group relative mx-auto aspect-[4/5] w-full max-w-[19rem] overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left outline-none transition-colors hover:border-neutral-300 focus-visible:border-neutral-400 sm:max-w-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.99 }}
          aria-label={`Foto ${profile.name}`}
        >
          <div className="absolute inset-0">
            <ImageFallback
              src="/profile.jpg"
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
              <div className="grid h-full w-full place-items-center bg-surface">
                <span className="text-4xl font-black text-neutral-400">MA</span>
              </div>
            </ImageFallback>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </motion.button>
      </div>

      <AnimatePresence>
        {unlocked ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-neutral-100 px-4 py-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setUnlocked(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Profil ${profile.name}`}
          >
            <motion.div
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-200 bg-panel"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setUnlocked(false)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition hover:bg-neutral-100"
                aria-label="Tutup profil"
              >
                <FiX />
              </button>

              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative">
                  <ImageFallback
                    src="/profile.jpg"
                    alt={`Foto ${profile.name}`}
                    className="h-72 w-full object-cover md:h-full"
                  >
                    <div className="grid h-full w-full place-items-center bg-surface">
                      <span className="text-4xl font-black text-neutral-400">MA</span>
                    </div>
                  </ImageFallback>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-black text-neutral-900 sm:text-3xl">{profile.name}</h3>
                  <p className="mt-1 text-neutral-500">{profile.role}</p>
                  <p className="mt-5 leading-7 text-neutral-500">{profile.summary}</p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-800"
                    >
                      <FiMail /> Email
                    </a>
                    <a
                      href={profile.socials.github.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:border-neutral-400 hover:bg-white"
                    >
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}