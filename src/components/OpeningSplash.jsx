import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { profile } from '../data/profile';

export default function OpeningSplash({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 grid place-items-center overflow-hidden bg-canvas px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-radial-grid" />
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl font-black text-neutral-900 md:text-6xl">{profile.name}</h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-neutral-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm">
                <FaInstagram className="text-neutral-500" aria-hidden="true" /> {profile.socials.instagram.username}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm">
                <FaGithub className="text-neutral-900" aria-hidden="true" /> {profile.socials.github.username}
              </span>
            </div>
            <div className="mx-auto mt-7 w-fit border-r-2 border-neutral-300 pr-1 font-mono text-base text-neutral-500 md:text-xl">
              <span className="animate-type inline-block overflow-hidden whitespace-nowrap">
                {profile.domain}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}