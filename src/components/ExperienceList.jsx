import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import ImageFallback from './ImageFallback';
import { experiences } from '../data/experience';

export function ExperienceList() {
  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <>
      <div className="mt-6 space-y-4">
        {experiences.map((experience, index) => (
          <motion.article
            key={experience.title}
            className="rounded-2xl border border-neutral-200 bg-white p-5"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-4">
              <ImageFallback
                src={experience.logo}
                alt={experience.company}
                className="h-12 w-12 shrink-0 rounded-xl object-cover"
              >
                <div className="grid h-full w-full place-items-center rounded-xl bg-neutral-100 text-sm font-black text-neutral-500">
                  {experience.company.slice(0, 2).toUpperCase()}
                </div>
              </ImageFallback>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold leading-tight text-neutral-900">{experience.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{experience.company}</p>
              </div>

              <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                {experience.period}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-500">{experience.description}</p>

            {experience.docs.length ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {experience.docs.map((doc) => (
                  <button
                    key={`${doc.title}-${doc.image}`}
                    type="button"
                    onClick={() => setActiveDoc(doc)}
                    className="group/doc overflow-hidden rounded-xl border border-neutral-200 text-left transition hover:border-neutral-300"
                  >
                    <div className="relative">
                      <div className="aspect-[4/3] overflow-hidden">
                        <ImageFallback
                          src={doc.image}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/doc:scale-105"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/70 to-transparent" />
                    </div>
                    <span className="block px-3 py-2.5 text-xs font-medium leading-4 text-neutral-600">
                      {doc.title}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </motion.article>
        ))}
      </div>

      {activeDoc ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-neutral-950/40 p-4 backdrop-blur-sm dark:bg-black/60"
          onClick={() => setActiveDoc(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActiveDoc(null)}
            className="fixed right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-neutral-900 shadow-soft"
            aria-label="Tutup dokumentasi"
          >
            <FiX />
          </button>
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeDoc.image} alt={activeDoc.title} className="max-h-[70vh] w-full object-contain" />
            <div className="p-5">
              <h3 className="text-lg font-bold text-neutral-900">{activeDoc.title}</h3>
              {activeDoc.info ? <p className="mt-2 text-sm text-neutral-500">{activeDoc.info}</p> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}