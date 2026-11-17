import { FiBookOpen } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import ImageFallback from './ImageFallback';
import { ExperienceList } from './ExperienceList';
import { profile } from '../data/profile';
import { education } from '../data/education';

const focusAreas = [
  {
    title: 'Web Development',
    body: 'Antarmuka yang ringan, cepat dimuat, dan tetap rapi di layar kecil maupun desktop.',
  },
  {
    title: 'Mobile Development',
    body: 'Aplikasi Android dengan alur yang singkat dan data yang tersimpan aman di perangkat.',
  },
  {
    title: 'Backend dan API',
    body: 'Layanan, basis data, dan integrasi pihak ketiga seperti WhatsApp dan Google Calendar.',
  },
];

export default function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Tentang saya."
          description="Saya adalah Fresh Graduate D3 Teknologi Informasi Politeknik Negeri Tanah Laut yang memiliki minat besar dalam pengembangan aplikasi berbasis website responsif, sistem pengolahan data, juga terbuka untuk selalu belajar hal baru. Saya terbiasa mengembangkan sistem dengan pendekatan fullstack developer."
        />

        <div className="mt-4 grid gap-x-12 gap-y-8 md:grid-cols-3">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              className="border-t border-neutral-200 pt-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
            >
              <h3 className="text-base font-bold text-neutral-900">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-500">{area.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">Pengalaman.</h2>
          <ExperienceList />
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">Pendidikan.</h2>
          <ul className="mt-6 border-t border-neutral-200">
            {education.map((item, index) => (
              <motion.li
                key={item.school}
                className="flex flex-col gap-4 border-b border-neutral-200 py-6 sm:flex-row sm:items-center sm:gap-6"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              >
                <ImageFallback src={item.logo} alt={item.school} className="h-16 w-16 shrink-0 rounded-xl object-cover">
                  <div className="grid h-full w-full place-items-center rounded-xl bg-white text-neutral-500">
                    <FiBookOpen className="text-2xl" />
                  </div>
                </ImageFallback>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neutral-900">{item.school}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{item.grade}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {item.GPA ? (
                    <span className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-xs font-semibold text-neutral-600">
                      IPK {item.GPA}
                    </span>
                  ) : null}
                  <span className="font-mono text-sm text-neutral-500">{item.year}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.p
          className="mt-12 max-w-[62ch] border-t border-neutral-200 pt-6 text-sm leading-7 text-neutral-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          Proyek di halaman ini dikerjakan sendiri, mulai dari requirement sampai deployment.{' '}
          <a
            href={`mailto:${profile.email}`}
            className="font-semibold text-neutral-500 underline underline-offset-4 transition hover:text-neutral-700"
          >
            Kalau ada yang mau dibahas, kirim saja email.
          </a>
        </motion.p>
      </div>
    </section>
  );
}