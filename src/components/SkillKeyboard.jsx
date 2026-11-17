import { Suspense, lazy, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { skills } from '../data/skills';

const SkillKeyboardScene = lazy(() => import('./SkillKeyboardScene'));

function KeyboardFallback() {
  return (
    <div
      className="grid h-[360px] place-items-center rounded-2xl border border-neutral-200 bg-canvas sm:h-[500px] md:h-[640px]"
      aria-hidden="true"
    >
      <div className="grid grid-cols-6 gap-2 opacity-30">
        {skills.map((skill) => (
          <div key={skill.name} className="aspect-square rounded-lg bg-white" />
        ))}
      </div>
    </div>
  );
}

export default function SkillKeyboard() {
  const [activeSkill, setActiveSkill] = useState(skills[0]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3, margin: '-8% 0px -10% 0px' });
  const shouldMountScene = useInView(sectionRef, { margin: '600px 0px 600px 0px' });

  return (
    <section ref={sectionRef} id="skills" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Keahlian"
          title="Stack teknologi yang saya pakai."
          description="Klik tombolnya untuk melihat penjelasan tiap teknologi."
        />

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_320px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {shouldMountScene ? (
              <Suspense fallback={<KeyboardFallback />}>
                <SkillKeyboardScene skills={skills} onActivate={setActiveSkill} visible={isInView} />
              </Suspense>
            ) : (
              <KeyboardFallback />
            )}
          </motion.div>

          <motion.aside
            className="rounded-2xl border border-neutral-200 bg-panel p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            aria-live="polite"
          >
            <div
              className="grid h-20 w-20 place-items-center rounded-xl bg-surface"
              style={{ color: activeSkill.color }}
            >
              <activeSkill.icon className="text-4xl" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-2xl font-black text-neutral-900">{activeSkill.name}</h3>
            <p className="mt-3 leading-7 text-neutral-500">{activeSkill.description}</p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}