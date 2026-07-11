import { Suspense, lazy, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';
import { skills } from '../data/skills';

const SkillKeyboardScene = lazy(() => import('./SkillKeyboardScene'));
const MotionSpotlightCard = motion(SpotlightCard);

export default function SkillKeyboard() {
  const [activeSkill, setActiveSkill] = useState(skills[0]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.35, margin: '-8% 0px -10% 0px' });

  return (
    <section ref={sectionRef} id="skills" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Skills"
          title="Stack Teknologi yang Saya Kuassai."
          description="Tekan tombol untuk menjelajahi keahlian saya."
        />
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_340px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Suspense
              fallback={
                <div className="grid h-[360px] place-items-center rounded-2xl border border-white/[0.08] bg-[#080B12] text-slate-400 sm:h-[500px] md:h-[640px]">
                  Loading 3D keyboard...
                </div>
              }
            >
              <SkillKeyboardScene skills={skills} onActivate={setActiveSkill} visible={isInView} />
            </Suspense>
          </motion.div>
          <MotionSpotlightCard
            as="aside"
            className="rounded-2xl border border-white/[0.08] bg-panel p-5 shadow-soft sm:p-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.55, ease: 'easeOut', staggerChildren: 0.08 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300"
            >
              Selected key
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.42, delay: 0.05 }}
              className="mt-8 grid h-24 w-24 place-items-center rounded-2xl border border-white/[0.08] bg-[#161F2E] shadow-keyboard"
              style={{ color: activeSkill.color }}
            >
              <activeSkill.icon className="text-5xl" style={{ color: activeSkill.color }} />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.42, delay: 0.1 }}
              className="mt-8 text-2xl font-black text-white sm:text-3xl"
            >
              {activeSkill.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.42, delay: 0.15 }}
              className="mt-4 leading-7 text-slate-400"
            >
              {activeSkill.description}
            </motion.p>
          </MotionSpotlightCard>
        </div>
      </div>
    </section>
  );
}
