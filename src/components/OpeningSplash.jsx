import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { profile } from '../data/profile';

export default function OpeningSplash({ visible }) {
  const typedDomain = profile.domain;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-night px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-radial-grid" />
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">Welcome to portfolio</p>
            <h1 className="text-4xl font-black text-white md:text-7xl">{profile.name}</h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <FaInstagram className="text-pink-300" /> {profile.socials.instagram.username}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <FaGithub className="text-white" /> {profile.socials.github.username}
              </span>
            </div>
            <div className="mx-auto mt-8 w-fit border-r-2 border-cyan-300 pr-1 font-mono text-lg text-cyan-200 md:text-2xl">
              <span className="inline-block max-w-0 animate-type overflow-hidden whitespace-nowrap">
                {typedDomain}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
