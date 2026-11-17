import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
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
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Sertifikat dan pencapaian."
          description="Kumpulan sertifikat dan bukti keikutsertaan dari kegiatan akademik yang pernah saya ikuti."
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
              className="group cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left outline-none transition-colors hover:border-neutral-300 focus-visible:border-neutral-400"
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              <div className="relative">
                <div className="grid aspect-[16/10] w-full place-items-center overflow-hidden bg-neutral-100 p-5">
                  <ImageFallback src={achievement.image} alt="" className="h-full w-full object-contain" />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent" />
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Sertifikat</p>
                <h3 className="mt-2 text-lg font-black leading-tight text-neutral-900 sm:text-xl">
                  {achievement.name}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-500">{achievement.description}</p>

                <div className="mt-5 flex items-center gap-3">
                  <ImageFallback src={achievement.issuerLogo} alt="" className="h-9 w-9 rounded-lg object-cover">
                    <div className="grid h-full w-full place-items-center rounded-lg bg-neutral-100 text-[11px] font-black text-neutral-500">
                      OK
                    </div>
                  </ImageFallback>
                  <span className="text-sm text-neutral-500">Klik untuk melihat detail</span>
                </div>
              </div>
            </MotionSpotlightCard>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeAchievement ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-neutral-100 px-3 py-4 backdrop-blur-xl sm:px-4 sm:py-6 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onClick={closeAchievement}
          >
            <motion.div
              className="relative max-h-[calc(100dvh-2rem)] w-full max-w-6xl overflow-y-auto overflow-x-hidden rounded-2xl border border-neutral-200 bg-panel sm:max-h-[calc(100dvh-3rem)]"
              initial={{ opacity: 0, y: 42, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 22, scale: 0.97, filter: 'blur(6px)' }}
              transition={{ type: 'spring', stiffness: 170, damping: 24, mass: 0.9 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeAchievement}
                className="fixed right-4 top-4 z-[70] grid h-11 w-11 place-items-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-900 shadow-soft backdrop-blur transition hover:bg-neutral-200 lg:absolute lg:right-4 lg:top-4"
                aria-label="Tutup detail sertifikat"
              >
                <FiX />
              </button>

              <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="relative bg-canvas">
                  <div className="relative flex min-h-[30rem] items-center justify-center p-3 sm:min-h-[38rem] sm:p-4 md:min-h-[36rem] md:p-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={galleryImages[activeImage]}
                        className="absolute inset-3 grid place-items-center overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 sm:inset-4 md:inset-5 md:p-5"
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
                          className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-900 shadow-soft backdrop-blur transition hover:bg-neutral-200 md:left-8"
                          aria-label="Sertifikat sebelumnya"
                        >
                          <FiChevronLeft />
                        </button>
                        <button
                          type="button"
                          onClick={showNextImage}
                          className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-900 shadow-soft backdrop-blur transition hover:bg-neutral-200 md:right-8"
                          aria-label="Sertifikat berikutnya"
                        >
                          <FiChevronRight />
                        </button>
                      </>
                    ) : null}
                  </div>

                  <div className="flex gap-3 overflow-x-auto border-t border-neutral-200 bg-canvas p-3 sm:p-4">
                    {galleryImages.map((image, imageIndex) => (
                      <button
                        key={`${image}-${imageIndex}`}
                        type="button"
                        onClick={() => setActiveImage(imageIndex)}
                        className={`h-14 w-24 shrink-0 overflow-hidden rounded-xl border bg-white p-1 transition sm:h-16 sm:w-28 ${
                          activeImage === imageIndex ? 'border-neutral-300 opacity-100' : 'border-neutral-200 opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`Lihat sertifikat ${imageIndex + 1}`}
                      >
                        <ImageFallback src={image} alt="" className="h-full w-full rounded-lg object-contain" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative flex min-w-0 flex-col bg-surface p-5 pt-6 sm:p-6 md:p-8 lg:pt-20">
                  <ImageFallback src={activeAchievement.issuerLogo} alt="" className="h-16 w-16 rounded-xl object-cover">
                    <div className="grid h-full w-full place-items-center rounded-xl bg-white text-sm font-black text-neutral-500">
                      OK
                    </div>
                  </ImageFallback>
                  <h3 className="mt-5 text-2xl font-black text-neutral-900 sm:text-3xl">{activeAchievement.name}</h3>
                  <p className="mt-4 leading-8 text-neutral-500">{activeAchievement.description}</p>
                  <p className="mt-auto pt-8 text-sm text-neutral-500">
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
