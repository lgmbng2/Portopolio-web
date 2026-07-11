import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCalendar, FiExternalLink, FiX } from 'react-icons/fi';
import SectionHeader from './SectionHeader';
import ImageFallback from './ImageFallback';
import SpotlightCard from './SpotlightCard';
import { experiences } from '../data/experience';

const MotionSpotlightCard = motion(SpotlightCard);

export default function Experience() {
  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <section id="experience" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Experience"
          title="Pengalaman dan dokumentasi kegiatan."
          description="Berbagai pengalaman akademik, magang, dan pengembangan proyek yang membantu saya berkembang sebagai seorang developer."
        />
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <MotionSpotlightCard
              as="article"
              key={experience.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 shadow-glass sm:rounded-[2rem] sm:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
            >
              <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
                <ImageFallback src={experience.logo} alt={experience.company} className="h-24 w-24 rounded-3xl object-cover sm:h-32 sm:w-32">
                  <div className="grid h-full w-full place-items-center rounded-3xl bg-cyan-300/10 text-2xl font-black text-cyan-200">
                    {experience.company.slice(0, 2).toUpperCase()}
                  </div>
                </ImageFallback>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-white sm:text-2xl">{experience.title}</h3>
                      <p className="mt-1 font-semibold text-cyan-200">{experience.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-slate-300">
                      <FiCalendar /> {experience.period}
                    </span>
                  </div>
                  <p className="mt-4 leading-7 text-slate-400">{experience.description}</p>
                  <ul className="mt-5 grid gap-3 text-slate-300 md:grid-cols-3">
                    {experience.points.map((point) => (
                      <li key={point} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                    {experience.docs.map((doc) => (
                      <button
                        key={doc.title}
                        type="button"
                        onClick={() => setActiveDoc(doc)}
                        className="min-w-52 rounded-2xl border border-white/10 bg-slate-950/50 p-3 text-left transition hover:border-cyan-300/40 sm:min-w-56"
                      >
                        <ImageFallback src={doc.image} alt={doc.title} className="h-28 w-full rounded-xl object-cover" />
                        <span className="mt-3 flex items-center gap-2 text-sm font-semibold text-white">
                          {doc.title} <FiExternalLink className="text-cyan-300" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </MotionSpotlightCard>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeDoc ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/75 px-4 py-6 backdrop-blur-xl sm:px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDoc(null)}
          >
            <motion.div
              className="w-full max-w-3xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-panel shadow-glass sm:rounded-[2rem]"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <ImageFallback src={activeDoc.image} alt={activeDoc.title} className="max-h-[70vh] min-h-72 w-full object-contain bg-slate-950 sm:h-80 sm:object-cover" />
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-xl font-black text-white sm:text-2xl">{activeDoc.title}</h3>
                    <p className="mt-3 text-slate-400">{activeDoc.info}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveDoc(null)}
                    className="rounded-full border border-white/10 p-3 text-slate-200 transition hover:bg-white/10"
                    aria-label="Tutup dokumentasi"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
