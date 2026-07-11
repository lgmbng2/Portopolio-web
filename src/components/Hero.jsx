import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAward, FiMapPin, FiMousePointer, FiX } from 'react-icons/fi';
import ImageFallback from './ImageFallback';
import Ferrofluid from './Ferrofluid';
import SideRays from './SideRays';
import { profile } from '../data/profile';

export default function Hero() {
  const [unlocked, setUnlocked] = useState(false);
  const [photoRevealed, setPhotoRevealed] = useState(false);

  const closeUnlock = () => {
    setUnlocked(false);
    setPhotoRevealed(true);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#080B12] px-4 pb-16 pt-28 sm:px-5 md:px-8 md:pb-20 md:pt-40">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <motion.div
          className="relative isolate"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-cyan-200 sm:text-sm">
            {profile.role}
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            Halo, saya <span className="text-cyan-300">{profile.name}</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{profile.summary}</p>
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-400 sm:text-base">
            <FiMapPin className="text-cyan-300" />
            {profile.location}
          </div>
          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-2 md:mt-10">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-glass backdrop-blur">
                <p className="text-2xl font-black text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => setUnlocked(true)}
          className="group relative mx-auto aspect-[3/4] w-full max-w-[18rem] rounded-[1.75rem] border border-white/10 bg-slate-950 p-3 text-left shadow-glass outline-none sm:max-w-sm sm:p-4"
          initial={{ opacity: 0, rotateY: 18, y: 30 }}
          animate={{ opacity: 1, rotateY: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          whileHover={{ y: -8 }}
        >
          <div className="absolute inset-3 overflow-hidden rounded-[1.35rem] opacity-70">
            <SideRays
              speed={3.2}
              rayColor1="#EAB308"
              rayColor2="#96c8ff"
              intensity={1.35}
              spread={1.45}
              origin="top-right"
              tilt={-8}
              saturation={1.1}
              blend={0.65}
              falloff={1.5}
              opacity={0.55}
            />
          </div>
          <AnimatePresence mode="wait">
            {photoRevealed ? (
              <motion.div
                key="revealed"
                className="relative h-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-panel"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                <Ferrofluid color="#38bdf8" secondaryColor="#EAB308" intensity={1.1} speed={7} opacity={0.28} />
                <ImageFallback src="/profile.jpg" alt={`Foto ${profile.name}`} className="h-full w-full object-cover">
                  <div className="grid h-full w-full place-items-center bg-[#101624]">
                    <div className="text-center">
                      <div className="mx-auto grid h-28 w-28 place-items-center rounded-2xl border border-white/10 bg-night text-4xl font-black text-cyan-200">
                        MA
                      </div>
                      <p className="mt-4 text-sm text-slate-400">Letakkan foto di public/profile.jpg</p>
                    </div>
                  </div>
                </ImageFallback>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent p-6">
                  <p className="inline-flex items-center gap-2 rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-semibold text-emerald-200">
                    <FiAward /> Achievement Unlocked
                  </p>
                  <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">{profile.name}</h2>
                  <p className="mt-1 text-sm text-slate-300">{profile.role}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="locked"
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.35rem] border border-white/10 bg-panel"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                <Ferrofluid color="#38bdf8" secondaryColor="#EAB308" intensity={1.2} speed={6.5} opacity={0.36} />
                <SideRays
                  speed={3}
                  rayColor1="#EAB308"
                  rayColor2="#96c8ff"
                  intensity={1.4}
                  spread={1.25}
                  origin="top-right"
                  tilt={-10}
                  saturation={1.15}
                  blend={0.6}
                  falloff={1.45}
                  opacity={0.42}
                />
                <div className="grid flex-1 place-items-center bg-[linear-gradient(145deg,rgba(56,189,248,0.12),rgba(15,23,42,0.2))]">
                  <div className="grid h-28 w-28 place-items-center rounded-2xl border border-cyan-300/25 bg-night text-4xl font-black text-cyan-200 shadow-keyboard">
                    MA
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    <FiAward /> Achievement Locked
                  </div>
                  <h2 className="text-xl font-black text-white sm:text-2xl">Profile Card</h2>
                  <p className="mt-2 text-sm text-slate-400">Klik kartu untuk membuka achievement profile.</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-200">
                    <FiMousePointer /> Tap to unlock
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {unlocked ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/75 px-4 py-6 backdrop-blur-xl sm:px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeUnlock}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
            >
              <SideRays
                speed={2.5}
                rayColor1="#EAB308"
                rayColor2="#96c8ff"
                intensity={2}
                spread={2}
                origin="top-right"
                tilt={0}
                saturation={1.5}
                blend={0.75}
                falloff={1.6}
                opacity={0.75}
              />
            </motion.div>
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-[#101624] shadow-glass sm:rounded-[1.75rem]"
              initial={{ opacity: 0, scale: 0.72, rotateX: 18, y: 80 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, rotateX: -16, y: 60 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeUnlock}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-slate-950/60 p-3 text-white backdrop-blur transition hover:bg-white/10"
                aria-label="Tutup profile unlock"
              >
                <FiX />
              </button>
              <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[20rem] overflow-hidden sm:min-h-[28rem]">
                  <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(15,23,42,0.08),rgba(2,6,23,0.86))]" />
                  <Ferrofluid color="#38bdf8" secondaryColor="#EAB308" intensity={1} speed={7.5} opacity={0.24} />
                  <SideRays
                    speed={2.7}
                    rayColor1="#EAB308"
                    rayColor2="#96c8ff"
                    intensity={1.5}
                    spread={1.6}
                    origin="top-right"
                    tilt={-6}
                    saturation={1.25}
                    blend={0.65}
                    falloff={1.55}
                    opacity={0.42}
                  />
                  <ImageFallback src="/profile.jpg" alt={`Foto ${profile.name}`} className="relative h-full min-h-[20rem] w-full object-cover sm:min-h-[28rem]">
                    <div className="relative grid h-full min-h-[20rem] w-full place-items-center sm:min-h-[28rem]">
                      <div className="text-center">
                        <div className="mx-auto grid h-32 w-32 place-items-center rounded-3xl border border-white/15 bg-night text-5xl font-black text-cyan-200">
                          MA
                        </div>
                        <p className="mt-4 text-sm text-slate-400">Letakkan foto di public/profile.jpg</p>
                      </div>
                    </div>
                  </ImageFallback>
                </div>
                <div className="relative p-6 sm:p-8 md:p-10">
                  <motion.p
                    className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <FiAward /> Achievement Unlocked
                  </motion.p>
                  <motion.h3
                    className="text-3xl font-black text-white sm:text-4xl md:text-5xl"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    Profile Revealed
                  </motion.h3>
                  <motion.p
                    className="mt-4 text-xl font-semibold text-cyan-200"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    {profile.name}
                  </motion.p>
                  <motion.p
                    className="mt-5 leading-8 text-slate-300"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                  >
                    {profile.summary}
                  </motion.p>
                  <motion.button
                    type="button"
                    onClick={closeUnlock}
                    className="mt-8 rounded-full bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                  >
                    Claim Achievement
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
