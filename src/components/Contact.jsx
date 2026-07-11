import { useState } from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import SpotlightCard from './SpotlightCard';
import { profile } from '../data/profile';

const MotionSpotlightCard = motion(SpotlightCard);

const contactThemes = {
  email: {
    glow: 'rgba(56, 189, 248, 0.18)',
    border: 'rgba(103, 232, 249, 0.32)',
    background: 'rgba(56, 189, 248, 0.06)',
    button: 'bg-cyan-300 text-slate-950 shadow-cyan-300/20',
  },
  github: {
    glow: 'rgba(148, 163, 184, 0.2)',
    border: 'rgba(203, 213, 225, 0.28)',
    background: 'rgba(148, 163, 184, 0.08)',
    button: 'bg-slate-100 text-slate-950 shadow-slate-100/20',
  },
  instagram: {
    glow: 'rgba(244, 114, 182, 0.22)',
    border: 'rgba(244, 114, 182, 0.34)',
    background: 'rgba(244, 114, 182, 0.07)',
    button: 'bg-pink-300 text-slate-950 shadow-pink-300/20',
  },
};

export default function Contact() {
  const [activeTheme, setActiveTheme] = useState('email');
  const theme = contactThemes[activeTheme];

  return (
    <section id="contact" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <MotionSpotlightCard
        className="mx-auto max-w-4xl rounded-[1.5rem] border p-5 text-center shadow-glass transition-colors duration-300 sm:rounded-[2rem] sm:p-8 md:p-12"
        spotlightColor={theme.glow}
        style={{
          backgroundColor: theme.background,
          borderColor: theme.border,
        }}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <SectionHeader
          eyebrow="Contact"
          title="Mari terhubung dan bangun sesuatu yang berguna."
          description="Gunakan email atau social media berikut untuk menghubungi Muhammad Aditya."
        />
        <div className="grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
          <a
            href={`mailto:${profile.email}`}
            onMouseEnter={() => setActiveTheme('email')}
            onFocus={() => setActiveTheme('email')}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold shadow-lg transition hover:-translate-y-1 ${activeTheme === 'email' ? contactThemes.email.button : 'border border-white/10 text-white hover:bg-white/10'}`}
          >
            <FiMail /> Email
          </a>
          <a
            href={profile.socials.github.url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setActiveTheme('github')}
            onFocus={() => setActiveTheme('github')}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold shadow-lg transition hover:-translate-y-1 ${activeTheme === 'github' ? contactThemes.github.button : 'border border-white/10 text-white hover:bg-white/10'}`}
          >
            <FaGithub /> {profile.socials.github.username}
          </a>
          <a
            href={profile.socials.instagram.url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setActiveTheme('instagram')}
            onFocus={() => setActiveTheme('instagram')}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold shadow-lg transition hover:-translate-y-1 ${activeTheme === 'instagram' ? contactThemes.instagram.button : 'border border-white/10 text-white hover:bg-white/10'}`}
          >
            <FaInstagram /> {profile.socials.instagram.username}
          </a>
        </div>
      </MotionSpotlightCard>
    </section>
  );
}
