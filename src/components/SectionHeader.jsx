import { motion } from 'framer-motion';

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.08,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <motion.div
      className={`mb-10 max-w-2xl md:mb-14 ${centered ? 'mx-auto text-center' : ''}`}
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {eyebrow ? (
        <motion.p
          variants={textVariants}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={textVariants}
        className="text-3xl font-bold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={textVariants}
          className="mt-4 max-w-[62ch] text-sm leading-7 text-neutral-500 sm:text-base"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}