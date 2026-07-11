import { FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import ImageFallback from './ImageFallback';
import SpotlightCard from './SpotlightCard';
import { education } from '../data/education';

const MotionSpotlightCard = motion(SpotlightCard);

export default function Education() {
  return (
    <section id="education" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Education" title="Riwayat pendidikan." />
        <div className="space-y-4">
          {education.map((item, index) => (
            <MotionSpotlightCard
              as="article"
              key={item.school}
              className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-glass sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
            >
              <ImageFallback src={item.logo} alt={item.school} className="h-20 w-20 rounded-2xl object-cover">
                <div className="grid h-full w-full place-items-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                  <FiBookOpen className="text-3xl" />
                </div>
              </ImageFallback>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white">{item.school}</h3>
                <p className="mt-1 text-slate-400">{item.grade}</p>
              </div>
              <p className="w-fit rounded-full border border-white/10 px-4 py-2 text-sm text-cyan-100">{item.year}</p>
            </MotionSpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
