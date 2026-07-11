import { motion } from 'framer-motion';

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.35 }}
    >
      <motion.p variants={textVariants} className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm sm:tracking-[0.28em]">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={textVariants} className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </motion.h2>
      {description ? (
        <motion.p variants={textVariants} className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
