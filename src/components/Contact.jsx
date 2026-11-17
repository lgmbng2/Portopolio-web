import { FaGithub, FaInstagram } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { profile } from '../data/profile';

const channels = [
  { key: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: FiMail },
  {
    key: 'github',
    label: 'GitHub',
    value: profile.socials.github.username,
    href: profile.socials.github.url,
    Icon: FaGithub,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    value: profile.socials.instagram.username,
    href: profile.socials.instagram.url,
    Icon: FaInstagram,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-16 sm:px-5 md:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          title="Mari terhubung."
          description="Paling cepat lewat email. GitHub dan Instagram juga aktif kalau mau lihat kode atau hasil terjemahan."
        />

        <ul className="grid gap-3 sm:grid-cols-3">
          {channels.map(({ key, label, value, href, Icon }, index) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
            >
              <a
                href={href}
                target={key === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-neutral-200 p-5 transition-colors hover:border-neutral-300 hover:bg-white"
              >
                <span className="flex items-center gap-2 text-sm text-neutral-500">
                  <Icon className="text-neutral-500" aria-hidden="true" />
                  {label}
                </span>
                <span className="break-all text-sm font-semibold text-neutral-900 group-hover:text-neutral-700">
                  {value}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}