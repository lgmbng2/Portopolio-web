import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiEye, FiSmile, FiStar, FiX } from 'react-icons/fi';
import { FaFire, FaHeart, FaRegLaughBeam } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import ImageFallback from './ImageFallback';
import SpotlightCard from './SpotlightCard';
import { projects } from '../data/projects';

const MotionSpotlightCard = motion(SpotlightCard);

const smoothSpring = {
  type: 'spring',
  stiffness: 170,
  damping: 24,
  mass: 0.9,
};

const reactionMap = [
  { key: 'love', icon: FaHeart, label: 'Love', emoji: '❤️', color: 'text-pink-300' },
  { key: 'fire', icon: FaFire, label: 'Fire', emoji: '🔥', color: 'text-orange-300' },
  { key: 'star', icon: FiStar, label: 'Star', emoji: '⭐', color: 'text-yellow-300' },
  { key: 'wow', icon: FaRegLaughBeam, label: 'Wow', emoji: '😄', color: 'text-emerald-300' },
];

export default function Projects() {
  const [reactions, setReactions] = useState(() =>
    Object.fromEntries(projects.map((project) => [project.title, {}])),
  );
  const [openPicker, setOpenPicker] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const galleryImages = useMemo(() => {
    if (!selectedProject) return [];
    return selectedProject.images?.length ? selectedProject.images : [selectedProject.image];
  }, [selectedProject]);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const openProject = (project) => {
    setSelectedProject(project);
    setActiveImage(0);
    setOpenPicker(null);
  };

  const handleProjectKeyDown = (event, project) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setActiveImage(0);
  };

  const showPreviousImage = () => {
    setActiveImage((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  };

  const showNextImage = () => {
    setActiveImage((current) => (current === galleryImages.length - 1 ? 0 : current + 1));
  };

  const addReaction = (projectTitle, reactionKey) => {
    setReactions((current) => ({
      ...current,
      [projectTitle]: {
        ...current[projectTitle],
        [reactionKey]: (current[projectTitle][reactionKey] ?? 0) + 1,
      },
    }));
    setOpenPicker(null);
  };

  return (
    <section id="projects" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Projects"
          title="Project yang pernah saya kembangkan."
          description="Kumpulan proyek yang mencerminkan pengalaman saya dalam membangun aplikasi, mengembangkan sistem, dan menerapkan berbagai teknologi modern."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <MotionSpotlightCard
              as="article"
              role="button"
              tabIndex={0}
              key={project.title}
              onClick={() => openProject(project)}
              onKeyDown={(event) => handleProjectKeyDown(event, project)}
              className="cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] text-left shadow-glass outline-none transition-colors hover:border-cyan-300/30 focus-visible:border-cyan-300/70"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              <motion.div
                className="relative"
                layoutId={`project-image-${project.title}`}
                transition={smoothSpring}
              >
                <ImageFallback src={project.image} alt={project.title} className="h-48 w-full object-cover sm:h-52" />
                <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/75 px-3 py-2 text-xs font-semibold text-slate-100 backdrop-blur">
                  <FiEye className="text-cyan-300" />
                  Detail
                </div>
              </motion.div>
              <div className="p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-black text-white sm:text-2xl">{project.title}</h3>
                <p className="mt-3 leading-7 text-slate-400 lg:min-h-24">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="relative mt-6 flex min-h-11 flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpenPicker((current) => (current === project.title ? null : project.title));
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/30"
                  >
                    <FiSmile className="text-cyan-300" />
                    React
                  </button>

                  {Object.entries(reactions[project.title]).map(([reactionKey, count]) => {
                    const reaction = reactionMap.find((item) => item.key === reactionKey);
                    if (!reaction || count === 0) return null;

                    return (
                      <motion.button
                        key={reactionKey}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          addReaction(project.title, reactionKey);
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-slate-100"
                        initial={{ opacity: 0, scale: 0.75, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.24 }}
                      >
                        <span aria-hidden="true">{reaction.emoji}</span>
                        {count}
                      </motion.button>
                    );
                  })}

                  <AnimatePresence>
                    {openPicker === project.title ? (
                      <motion.div
                        className="absolute bottom-12 left-0 z-10 flex gap-2 rounded-2xl border border-white/10 bg-[#111827]/95 p-2 shadow-soft backdrop-blur"
                        initial={{ opacity: 0, scale: 0.88, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 10 }}
                        transition={{ duration: 0.18 }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        {reactionMap.map((reaction) => {
                          const Icon = reaction.icon;
                          return (
                            <button
                              key={reaction.key}
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                addReaction(project.title, reaction.key);
                              }}
                              className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-slate-950/60 text-lg transition hover:-translate-y-1 hover:bg-white/10"
                              aria-label={`React ${reaction.label}`}
                            >
                              <Icon className={reaction.color} />
                            </button>
                          );
                        })}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </MotionSpotlightCard>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/90 px-3 py-4 backdrop-blur-xl sm:px-4 sm:py-6 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={closeProject}
          >
            <motion.div
              className="relative w-full max-w-6xl overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#101624] shadow-glass sm:rounded-[1.5rem]"
              initial={{ opacity: 0, y: 56, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 28, scale: 0.96, filter: 'blur(8px)' }}
              transition={smoothSpring}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeProject}
                className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-slate-950/80 text-white backdrop-blur transition hover:bg-white/10 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
                aria-label="Tutup detail project"
              >
                <FiX />
              </button>

              <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem]">
                <motion.div
                  className="relative bg-[#070b14]"
                  layoutId={`project-image-${selectedProject.title}`}
                  transition={smoothSpring}
                >
                  <div className="relative flex min-h-[22rem] items-center justify-center p-3 sm:min-h-[26rem] sm:p-4 md:min-h-[31rem] md:p-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={galleryImages[activeImage]}
                        className="absolute inset-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 sm:inset-4 md:inset-5"
                        initial={{ opacity: 0, scale: 1.015, x: 18 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.985, x: -18 }}
                        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ImageFallback
                          src={galleryImages[activeImage]}
                          alt={`${selectedProject.title} ${activeImage + 1}`}
                          className="h-full w-full bg-slate-950 object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {galleryImages.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={showPreviousImage}
                          className="absolute left-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-slate-950/75 text-white shadow-soft backdrop-blur transition hover:bg-white/10 md:left-8"
                          aria-label="Gambar sebelumnya"
                        >
                          <FiChevronLeft />
                        </button>
                        <button
                          type="button"
                          onClick={showNextImage}
                          className="absolute right-4 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-slate-950/75 text-white shadow-soft backdrop-blur transition hover:bg-white/10 md:right-8"
                          aria-label="Gambar berikutnya"
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
                        aria-label={`Lihat gambar ${imageIndex + 1}`}
                      >
                        <ImageFallback src={image} alt="" className="h-full w-full rounded-lg object-cover" />
                      </button>
                    ))}
                  </div>
                </motion.div>

                <div className="flex flex-col bg-[#101624] p-5 pt-6 sm:p-6 md:p-8 lg:pt-20">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-white sm:text-3xl">{selectedProject.title}</h3>
                  <p className="mt-4 leading-8 text-slate-300">{selectedProject.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
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
