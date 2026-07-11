import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';

const MotionSpotlightCard = motion(SpotlightCard);

export default function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="About"
          title="Muhammad Aditya."
          description="Saya adalah seorang software developer yang memiliki ketertarikan dalam pengembangan aplikasi berbasis web maupun mobile, saya memiliki pengalaman dalam pengembangan sistem yang efisien, terintegrasi, dan berskala besar."
        />
        <motion.div
          className="grid gap-5 md:grid-cols-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut', staggerChildren: 0.08 }}
        >
          {['Web Development', 'Mobile Development', 'Backend & API'].map((item) => (
            <MotionSpotlightCard
              key={item}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-glass sm:p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <h3 className="text-xl font-bold text-white">{item}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                Fokus membangun solusi yang rapi, mudah dipelihara, dan nyaman digunakan.
              </p>
            </MotionSpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
