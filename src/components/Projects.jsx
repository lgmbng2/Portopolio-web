import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiSmile, FiStar, FiX } from 'react-icons/fi';
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
  { key: 'love', icon: FaHeart, label: 'Love', color: 'text-neutral-500' },
  { key: 'fire', icon: FaFire, label: 'Fire', color: 'text-neutral-500' },
  { key: 'star', icon: FiStar, label: 'Star', color: 'text-neutral-700' },
  { key: 'wow', icon: FaRegLaughBeam, label: 'Wow', color: 'text-neutral-500' },
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
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Project yang pernah saya kembangkan."
          description="Kumpulan proyek yang mencerminkan pengalaman saya dalam membangun aplikasi, mengembangkan sistem, dan menerapkan berbagai teknologi modern."
        />
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <MotionSpotlightCard
              as="article"
              role="button"
              tabIndex={0}
              key={project.title}
              onClick={() => openProject(project)}
              onKeyDown={(event) => handleProjectKeyDown(event, project)}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left outline-none transition-colors hover:border-neutral-300 focus-visible:border-neutral-400"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              <motion.div layoutId={`project-image-${project.title}`} transition={smoothSpring}>
                <div className="relative">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <ImageFallback
                      src={project.image}
                      alt=""
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/60 to-transparent" />
                </div>
              </motion.div>
              <div className="flex flex-col p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  {project.tags[0]}
                </p>
                <h3 className="mt-2 text-lg font-black leading-tight text-neutral-900 sm:text-xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-500">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-600">
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 4 ? (
                    <span className="rounded-md bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-500">
                      +{project.skills.length - 4}
                    </span>
                  ) : null}
                </div>
                <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-6">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpenPicker((current) => (current === project.title ? null : project.title));
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:border-neutral-300"
                  >
                    <FiSmile className="text-neutral-500" />
                    React
                  </button>

                  {Object.entries(reactions[project.title]).map(([reactionKey, count]) => {
                    const reaction = reactionMap.find((item) => item.key === reactionKey);
                    if (!reaction || count === 0) return null;
                    const ChipIcon = reaction.icon;

                    return (
                      <motion.button
                        key={reactionKey}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          addReaction(project.title, reactionKey);
                        }}
                        aria-label={`Tambah reaksi ${reaction.label}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900"
                        initial={{ opacity: 0, scale: 0.75, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.24 }}
                      >
                        <ChipIcon className={reaction.color} aria-hidden="true" />
                        {count}
                      </motion.button>
                    );
                  })}

                  <AnimatePresence>
                    {openPicker === project.title ? (
                      <motion.div
                        className="absolute bottom-12 left-0 z-10 flex gap-2 rounded-2xl border border-neutral-200 bg-panel/95 p-2 shadow-soft backdrop-blur"
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
                              className="grid h-11 w-11 place-items-center rounded-xl border border-neutral-200 bg-neutral-100 text-lg transition hover:-translate-y-1 hover:bg-neutral-200"
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
            className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-neutral-100 px-3 py-4 backdrop-blur-xl sm:px-4 sm:py-6 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={closeProject}
          >
            <motion.div
              className="relative max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100vw-1.5rem)] overflow-y-auto overflow-x-hidden rounded-2xl border border-neutral-200 bg-panel sm:max-h-[calc(100dvh-3rem)] sm:max-w-[calc(100vw-2rem)] lg:max-w-6xl"
              initial={{ opacity: 0, y: 56, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 28, scale: 0.96, filter: 'blur(8px)' }}
              transition={smoothSpring}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeProject}
                className="fixed right-4 top-4 z-[70] grid h-11 w-11 place-items-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-900 shadow-soft backdrop-blur transition hover:bg-neutral-200 lg:absolute lg:right-4 lg:top-4"
                aria-label="Tutup detail project"
              >
                <FiX />
              </button>

              <div className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <motion.div
                  className="relative min-w-0 bg-canvas lg:pr-6"
                  layoutId={`project-image-${selectedProject.title}`}
                  transition={smoothSpring}
                >
                  <div className="relative min-w-0 p-3 sm:p-4 md:p-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={galleryImages[activeImage]}
                        className="relative min-h-[20rem] overflow-hidden rounded-2xl border border-neutral-200 bg-white bg-contain bg-center bg-no-repeat sm:min-h-[26rem] md:min-h-[31rem]"
                        style={{ backgroundImage: `url(${galleryImages[activeImage]})` }}
                        initial={{ opacity: 0, scale: 1.015, x: 18 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.985, x: -18 }}
                        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="sr-only">{`${selectedProject.title} ${activeImage + 1}`}</span>
                        {galleryImages.length > 1 ? (
                          <>
                            <button
                              type="button"
                              onClick={showPreviousImage}
                              className="absolute left-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-900 shadow-soft backdrop-blur transition hover:bg-neutral-200 sm:h-10 sm:w-10"
                              aria-label="Gambar sebelumnya"
                            >
                              <FiChevronLeft />
                            </button>
                            <button
                              type="button"
                              onClick={showNextImage}
                              className="absolute right-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-neutral-200 bg-neutral-100 text-neutral-900 shadow-soft backdrop-blur transition hover:bg-neutral-200 sm:h-10 sm:w-10"
                              aria-label="Gambar berikutnya"
                            >
                              <FiChevronRight />
                            </button>
                          </>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="flex max-w-full gap-3 overflow-x-auto border-t border-neutral-200 bg-canvas p-3 sm:p-4 lg:mr-6">
                    {galleryImages.map((image, imageIndex) => (
                      <button
                        key={`${image}-${imageIndex}`}
                        type="button"
                        onClick={() => setActiveImage(imageIndex)}
                        className={`h-14 w-24 shrink-0 overflow-hidden rounded-xl border bg-white p-1 transition sm:h-16 sm:w-28 ${
                          activeImage === imageIndex ? 'border-neutral-300 opacity-100' : 'border-neutral-200 opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`Lihat gambar ${imageIndex + 1}`}
                      >
                        <ImageFallback src={image} alt="" className="h-full w-full rounded-lg object-cover" />
                      </button>
                    ))}
                  </div>
                </motion.div>

                <div className="flex min-w-0 flex-col bg-panel p-5 pt-6 sm:p-6 md:p-8 lg:pt-20">
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-neutral-100/10 px-3 py-1 text-xs font-semibold text-neutral-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-5 break-words text-2xl font-black text-neutral-900 sm:text-3xl">{selectedProject.title}</h3>
                  <p className="mt-4 break-words leading-8 text-neutral-500">{selectedProject.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500">
                        {skill}
                      </span>
                    ))}
                  </div>
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
