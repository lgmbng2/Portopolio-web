import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const copy = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      skills: 'Keahlian',
      projects: 'Proyek',
      achievements: 'Sertifikat',
      contact: 'Kontak',
    },
    cta: 'Hubungi saya',
    theme: 'Tema',
    lang: 'Bahasa',
    hero: {
      ctaProjects: 'Lihat proyek',
      ctaContact: 'Hubungi saya',
      email: 'Email',
      github: 'GitHub',
    },
    about: {
      title: 'Tentang saya.',
      description:
        'Lulusan Teknik Informatika dari Politeknik Negeri Tanah Laut. Fokusnya di sisi teknis: membangun layanan, merancang basis data, lalu menyambungkannya jadi aplikasi yang benar-benar jalan.',
      experience: 'Pengalaman.',
      education: 'Pendidikan.',
      gpa: 'IPK',
    },
    skills: {
      eyebrow: 'Keahlian',
      title: 'Stack teknologi yang saya pakai.',
      description: 'Klik tombolnya untuk melihat penjelasan tiap teknologi.',
    },
    projects: {
      title: 'Project yang pernah saya kembangkan.',
      description:
        'Kumpulan proyek yang mencerminkan pengalaman saya dalam membangun aplikasi, mengembangkan sistem, dan menerapkan berbagai teknologi modern.',
      react: 'React',
      more: 'Lihat detail',
      close: 'Tutup detail project',
      prev: 'Gambar sebelumnya',
      next: 'Gambar berikutnya',
    },
    achievements: {
      title: 'Sertifikat dan pencapaian.',
      description: 'Kumpulan sertifikat dan bukti keikutsertaan dari kegiatan akademik yang pernah saya ikuti.',
      label: 'Sertifikat',
      more: 'Klik untuk melihat detail',
    },
    contact: {
      title: 'Mari terhubung.',
      description:
        'Paling cepat lewat email. GitHub dan Instagram juga aktif kalau mau lihat kode atau hasil terjemahan.',
      email: 'Email',
      github: 'GitHub',
      instagram: 'Instagram',
    },
    footer: 'Dibangun dengan React dan Tailwind CSS.',
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      achievements: 'Certificates',
      contact: 'Contact',
    },
    cta: 'Contact me',
    theme: 'Theme',
    lang: 'Language',
    hero: {
      ctaProjects: 'View projects',
      ctaContact: 'Contact me',
      email: 'Email',
      github: 'GitHub',
    },
    about: {
      title: 'About me.',
      description:
        'Information Technology graduate from Politeknik Negeri Tanah Laut. Focused on the technical side: building services, designing databases, and wiring them into applications that actually work.',
      experience: 'Experience.',
      education: 'Education.',
      gpa: 'GPA',
    },
    skills: {
      eyebrow: 'Skills',
      title: 'The stack I work with.',
      description: 'Click a key to see what each technology is used for.',
    },
    projects: {
      title: 'Projects I have built.',
      description:
        'A collection of work covering application development, system design, and applying a range of modern technologies.',
      react: 'React',
      more: 'View detail',
      close: 'Close project detail',
      prev: 'Previous image',
      next: 'Next image',
    },
    achievements: {
      title: 'Certificates and achievements.',
      description: 'Certificates and proof of participation from academic events I attended.',
      label: 'Certificate',
      more: 'Click to view detail',
    },
    contact: {
      title: "Let's connect.",
      description:
        'Email is the fastest way to reach me. GitHub and Instagram are active too if you want to see code or results.',
      email: 'Email',
      github: 'GitHub',
      instagram: 'Instagram',
    },
    footer: 'Built with React and Tailwind CSS.',
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => window.localStorage.getItem('porto-lang') ?? 'id');

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem('porto-lang', lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      toggle: () => setLang((current) => (current === 'id' ? 'en' : 'id')),
      t: copy[lang],
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}