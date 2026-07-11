import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiX } from 'react-icons/fi';
import SectionHeader from './SectionHeader';
import ImageFallback from './ImageFallback';
import SpotlightCard from './SpotlightCard';
import { achievements } from '../data/achievements';

const MotionSpotlightCard = motion(SpotlightCard);

export default function Achievements() {
  const [activeAchievement, setActiveAchievement] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const galleryImages = useMemo(() => {
    if (!activeAchievement) return [];
    return activeAchievement.images?.length ? activeAchievement.images : [activeAchievement.image];
  }, [activeAchievement]);

  useEffect(() => {
    document.body.style.overflow = activeAchievement ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeAchievement]);

  const openAchievement = (achievement) => {
    setActiveAchievement(achievement);
    setActiveImage(0);
  };

  const closeAchievement = () => {
    setActiveAchievement(null);
    setActiveImage(0);
  };

  const handleCardKeyDown = (event, achievement) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openAchievement(achievement);
  };

  const showPreviousImage = () => {
    setActiveImage((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  };

  const showNextImage = () => {
    setActiveImage((current) => (current === galleryImages.length - 1 ? 0 : current + 1));
  };

  return (
    <section id="achievements" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Achievements"
          title="Sertifikat dan pencapaian."
          description="Area untuk menampilkan gambar sertifikat, keterangan, dan logo penerbit."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {achievements.map((achievement, index) => (
            <MotionSpotlightCard
              as="article"
              role="button"
              tabIndex={0}
              key={achievement.name}
              onClick={() => openAchievement(achievement)}
              onKeyDown={(event) => handleCardKeyDown(event, achievement)}
              className="cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] text-left shadow-glass outline-none transition-colors hover:border-cyan-300/30 focus-visible:border-cyan-300/70"
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              viewport={{ once: false, amount: 0.22 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              <div className="relative grid h-64 place-items-center overflow-hidden bg-slate-950/70 p-4 sm:h-72">
                <ImageFallback src={achievement.image} alt={achievement.name} className="h-full w-full rounded-2xl object-contain" />
                <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-3 py-2 text-xs font-semibold text-slate-100 backdrop-blur">
                  <FiExternalLink className="text-cyan-300" />
                  Detail
                </div>
              </div>
              <div className="relative z-10 flex gap-4 border-t border-white/10 bg-[#121722] p-5 sm:p-6">
                <ImageFallback src={achievement.issuerLogo} alt="" className="h-14 w-14 rounded-2xl object-cover">
                  <div className="grid h-full w-full place-items-center rounded-2xl bg-emerald-300/10 text-sm font-black text-emerald-200">
                    OK
                  </div>
                </ImageFallback>
                <div>
                  <h3 className="text-lg font-black text-white sm:text-xl">{achievement.name}</h3>
                  <p className="mt-2 text-slate-400">{achievement.description}</p>
                </div>
              </div>
            </MotionSpotlightCard>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeAchievement ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/90 px-3 py-4 backdrop-blur-xl sm:px-4 sm:py-6 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onClick={closeAchievement}
          >
            <motion.div
              className="relative w-full max-w-6xl overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#101624] shadow-glass sm:rounded-[1.5rem]"
              initial={{ opacity: 0, y: 42, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 22, scale: 0.97, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 170, damping: 24, mass: 0.9 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeAchievement}
                className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-slate-950/80 text-white backdrop-blur transition hover:bg-white/10 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
                aria-label="Tutup detail sertifikat"
              >
                <FiX />
              </button>

              <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="relative bg-[#070b14]">
                  <div className="relative flex min-h-[32rem] items-center justify-center p-3 sm:min-h-[38rem] sm:p-4 md:min-h-[36rem] md:p-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={galleryImages[activeImage]}
                        className="absolute inset-3 grid place-items-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-3 sm:inset-4 md:inset-5 md:p-5"
                        initial={{ opacity: 0, scale: 1.015, x: 18 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.985, x: -18 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="h-full max-w-full overflow-hidden">
                          <ImageFallback
                            src={galleryImages[activeImage]}
                            alt={`${activeAchievement.name} ${activeImage + 1}`}
                            className="h-full w-auto max-w-full object-contain"
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {galleryImages.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={showPreviousImage}
                          className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-slate-950/75 text-white shadow-soft backdrop-blur transition hover:bg-white/10 md:left-8"
                          aria-label="Sertifikat sebelumnya"
                        >
                          <FiChevronLeft />
                        </button>
                        <button
                          type="button"
                          onClick={showNextImage}
                          className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-slate-950/75 text-white shadow-soft backdrop-blur transition hover:bg-white/10 md:right-8"
                          aria-label="Sertifikat berikutnya"
                        >
                          <FiChevronRight />
                        </button>
                      </>
                    ) : null}
                  </div>

                  <div className="flex gap-3 overflow-x-auto border-t border-white/10 bg-[#080d19] p-3 sm:p-4">
                    {galleryImages.map((image, imageIndex) => (
                      <button
                        key={`${image}-${imageIndex}`}
                        type="button"
                        onClick={() => setActiveImage(imageIndex)}
                        className={`h-14 w-24 shrink-0 overflow-hidden rounded-xl border bg-slate-950 p-1 transition sm:h-16 sm:w-28 ${
                          activeImage === imageIndex ? 'border-cyan-300 opacity-100' : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`Lihat sertifikat ${imageIndex + 1}`}
                      >
                        <ImageFallback src={image} alt="" className="h-full w-full rounded-lg object-contain" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col bg-[#151c2a] p-5 pt-6 sm:p-6 md:p-8 lg:pt-20">
                  <ImageFallback src={activeAchievement.issuerLogo} alt="" className="h-16 w-16 rounded-2xl object-cover">
                    <div className="grid h-full w-full place-items-center rounded-2xl bg-emerald-300/10 text-sm font-black text-emerald-200">
                      OK
                    </div>
                  </ImageFallback>
                  <h3 className="mt-5 text-2xl font-black text-white sm:text-3xl">{activeAchievement.name}</h3>
                  <p className="mt-4 leading-8 text-slate-300">{activeAchievement.description}</p>
                  <p className="mt-auto pt-8 text-sm text-slate-500">
                    {activeImage + 1} / {galleryImages.length} gambar
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
