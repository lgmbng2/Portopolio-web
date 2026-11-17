import { achievements } from './achievements';
import { education } from './education';
import { experiences } from './experience';
import { profile } from './profile';
import { projects } from './projects';
import { skills } from './skills';

const skillNames = skills.map((skill) => skill.name);

export const aiKnowledge = {
  profile,
  projects,
  experiences,
  education,
  achievements,
  skillNames,
  quickPrompts: [
    'Kenalan dong',
    'Project React apa saja?',
    'Hitung 12 * 8 + 5',
    'Apa yang bisa kamu bantu?',
  ],
};

const normalize = (value) => value.toLowerCase();

const hasAny = (text, words) => words.some((word) => text.includes(word));

const formatList = (items) => items.join(', ');

const casualReplies = [
  'Siap, aku bantu sebisaku.',
  'Boleh, kita bahas pelan-pelan.',
  'Gas, aku coba jawab singkat dan jelas.',
  'Oke, aku arahkan biar gampang dipahami.',
];

const getKeywords = (text) => text.split(/\s+/).filter((word) => word.length > 3);

const matchesProject = (project, text) => {
  const projectText = normalize(`${project.title} ${project.description} ${project.tags.join(' ')} ${project.skills.join(' ')}`);
  return getKeywords(text).some((word) => projectText.includes(word));
};

const getCasualPrefix = (text) => {
  if (hasAny(text, ['dong', 'nih', 'ya', 'bro', 'bang', 'kak'])) {
    return casualReplies[Math.floor(Math.random() * casualReplies.length)];
  }
  return null;
};

const parseMathExpression = (text) => {
  const mathText = text
    .replace(/berapa/gi, '')
    .replace(/hasil/gi, '')
    .replace(/hitung/gi, '')
    .replace(/kali/gi, '*')
    .replace(/x/gi, '*')
    .replace(/bagi/gi, '/')
    .replace(/tambah/gi, '+')
    .replace(/plus/gi, '+')
    .replace(/kurang/gi, '-')
    .replace(/minus/gi, '-')
    .replace(/,/g, '.')
    .trim();

  const expression = mathText.match(/[0-9+\-*/().\s]+/)?.[0]?.trim();
  if (!expression || !/[+\-*/]/.test(expression)) return null;
  if (!/^[0-9+\-*/().\s]+$/.test(expression)) return null;
  return expression;
};

const calculateSimpleMath = (expression) => {
  const tokens = expression.match(/\d+(?:\.\d+)?|[+\-*/()]/g);
  if (!tokens) return null;

  let index = 0;

  const parseFactor = () => {
    const token = tokens[index];
    if (token === '(') {
      index += 1;
      const value = parseExpression();
      if (tokens[index] !== ')') throw new Error('Invalid expression');
      index += 1;
      return value;
    }
    if (token === '-') {
      index += 1;
      return -parseFactor();
    }
    const value = Number(token);
    if (!Number.isFinite(value)) throw new Error('Invalid number');
    index += 1;
    return value;
  };

  const parseTerm = () => {
    let value = parseFactor();
    while (tokens[index] === '*' || tokens[index] === '/') {
      const operator = tokens[index];
      index += 1;
      const nextValue = parseFactor();
      value = operator === '*' ? value * nextValue : value / nextValue;
    }
    return value;
  };

  const parseExpression = () => {
    let value = parseTerm();
    while (tokens[index] === '+' || tokens[index] === '-') {
      const operator = tokens[index];
      index += 1;
      const nextValue = parseTerm();
      value = operator === '+' ? value + nextValue : value - nextValue;
    }
    return value;
  };

  try {
    const result = parseExpression();
    if (index !== tokens.length || !Number.isFinite(result)) return null;
    return Number.isInteger(result) ? String(result) : result.toFixed(4).replace(/\.?0+$/, '');
  } catch {
    return null;
  }
};

const answerSimpleChat = (text) => {
  if (hasAny(text, ['halo', 'hai', 'hello', 'hi', 'pagi', 'siang', 'sore', 'malam'])) {
    return {
      message: `Halo! Aku AditBot, asisten kecil di portfolio ${profile.name}. Mau tanya soal project, skill, pengalaman, atau sekalian hitung matematika simpel juga bisa.`,
      action: { label: 'Kembali ke atas', target: 'home' },
    };
  }

  if (hasAny(text, ['terima kasih', 'makasih', 'thanks', 'thank you'])) {
    return {
      message: 'Sama-sama. Senang bisa bantu. Kalau mau, tanya saja project, skill, pengalaman, atau cara kontak Aditya.',
      action: { label: 'Buka kontak', target: 'contact' },
    };
  }

  if (hasAny(text, ['bisa apa', 'fitur', 'bantu apa', 'help', 'tolong apa'])) {
    return {
      message: 'Aku bisa bantu jelaskan isi portfolio, mencarikan project yang relevan, merangkum skill/pengalaman, mengarahkan ke section halaman, menjawab obrolan simpel, dan menghitung matematika dasar seperti 12 * 8 + 5.',
      action: { label: 'Lihat proyek', target: 'projects' },
    };
  }

  if (hasAny(text, ['kabar', 'apa kabar'])) {
    return {
      message: 'Aku baik, lagi standby nemenin pengunjung portfolio. Kamu mau lihat bagian project, pengalaman, atau skill Aditya dulu?',
      action: { label: 'Lihat proyek', target: 'projects' },
    };
  }

  return null;
};

export function answerPortfolioQuestion(question) {
  const text = normalize(question);
  const casualPrefix = getCasualPrefix(text);
  const mathExpression = parseMathExpression(question);

  if (mathExpression) {
    const result = calculateSimpleMath(mathExpression);
    if (result !== null) {
      return {
        message: `${casualPrefix ? `${casualPrefix} ` : ''}Hasil dari ${mathExpression} adalah ${result}.`,
      };
    }
  }

  const simpleChat = answerSimpleChat(text);
  if (simpleChat) return simpleChat;

  if (hasAny(text, ['kontak', 'contact', 'email', 'hubungi', 'instagram', 'github'])) {
    return {
      message: `${casualPrefix ? `${casualPrefix} ` : ''}Kamu bisa menghubungi ${profile.name} melalui email ${profile.email}, GitHub ${profile.socials.github.username}, atau Instagram ${profile.socials.instagram.username}.`,
      action: { label: 'Buka kontak', target: 'contact' },
    };
  }

  if (hasAny(text, ['profil', 'profile', 'tentang', 'siapa', 'aditya'])) {
    return {
      message: `${casualPrefix ? `${casualPrefix} ` : ''}${profile.name} adalah ${profile.role} dari ${profile.location}. Fokus utamanya adalah pengembangan aplikasi website responsive dan mobile. Saat ini portfolio ini menampilkan ${profile.stats[0].value} proyek dan lulus ${profile.stats[1].label.toLowerCase()}.`,
      action: { label: 'Lihat tentang', target: 'about' },
    };
  }

  if (hasAny(text, ['skill', 'kemampuan', 'tech stack', 'teknologi', 'react', 'backend', 'frontend', 'mobile'])) {
    const backendSkills = skillNames.filter((skill) => ['Golang', 'CI4', 'Laravel', 'Java', 'Firebase', 'Data Mining'].includes(skill));
    const frontendSkills = skillNames.filter((skill) => ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind', 'Figma'].includes(skill));
    const mobileSkills = skillNames.filter((skill) => ['Kotlin', 'Firebase'].includes(skill));

    if (hasAny(text, ['backend', 'api', 'server'])) {
      return {
        message: `${casualPrefix ? `${casualPrefix} ` : ''}Untuk backend, Aditya punya pengalaman dengan ${formatList(backendSkills)} serta integrasi API seperti WhatsApp API dan Google Calendar API pada beberapa project.`,
        action: { label: 'Lihat keahlian', target: 'skills' },
      };
    }

    if (hasAny(text, ['frontend', 'ui', 'react', 'tailwind'])) {
      return {
        message: `${casualPrefix ? `${casualPrefix} ` : ''}Untuk frontend, skill yang paling relevan adalah ${formatList(frontendSkills)}. Beberapa project di portfolio ini juga memakai React untuk membangun antarmuka interaktif.`,
        action: { label: 'Lihat proyek', target: 'projects' },
      };
    }

    if (hasAny(text, ['mobile', 'android', 'kotlin'])) {
      return {
        message: `${casualPrefix ? `${casualPrefix} ` : ''}Untuk mobile, Aditya memiliki pengalaman dengan ${formatList(mobileSkills)}, terutama pada project Prototype dan Monitoring Sistem IOT berbasis aplikasi Android.`,
        action: { label: 'Lihat proyek', target: 'projects' },
      };
    }

    return {
      message: `${casualPrefix ? `${casualPrefix} ` : ''}Skill utama Aditya meliputi ${formatList(skillNames.slice(0, 9))}, dan beberapa teknologi lain seperti ${formatList(skillNames.slice(9, 18))}.`,
      action: { label: 'Lihat keahlian', target: 'skills' },
    };
  }

  if (hasAny(text, ['project', 'proyek', 'portfolio', 'portofolio', 'persuratan', 'psikologi', 'iot', 'chicken'])) {
    const matchedProject = projects.find((project) => matchesProject(project, text));

    if (matchedProject) {
      return {
        message: `${casualPrefix ? `${casualPrefix} ` : ''}${matchedProject.title} adalah ${matchedProject.description} Teknologi yang digunakan: ${formatList(matchedProject.skills)}.`,
        action: { label: 'Lihat proyek', target: 'projects' },
      };
    }

    const projectSummary = projects.map((project) => project.title).join(', ');
    return {
      message: `${casualPrefix ? `${casualPrefix} ` : ''}Project yang ditampilkan adalah ${projectSummary}. Yang paling menonjol untuk sistem web adalah Smart Persuratan dan Smart Psikologi karena melibatkan RBAC, React, Go, serta integrasi layanan eksternal.`,
      action: { label: 'Lihat proyek', target: 'projects' },
    };
  }

  if (hasAny(text, ['pengalaman', 'experience', 'magang', 'kerja', 'smart campus', 'politala', 'lpm', 'digma'])) {
    const mainExperience = experiences[0];
    return {
      message: `${casualPrefix ? `${casualPrefix} ` : ''}Pengalaman utama Aditya adalah ${mainExperience.title} di ${mainExperience.company} pada periode ${mainExperience.period}. Fokusnya membangun Smart Persuratan, Smart Psikologi, base architecture system, RBAC, serta integrasi WhatsApp dan Google Calendar.`,
      action: { label: 'Lihat tentang', target: 'about' },
    };
  }

  if (hasAny(text, ['pendidikan', 'education', 'kuliah', 'sekolah', 'kampus'])) {
    return {
      message: `${casualPrefix ? `${casualPrefix} ` : ''}Pendidikan Aditya: ${education.map((item) => `${item.school} (${item.grade}, ${item.year})`).join(' dan ')}.`,
      action: { label: 'Lihat tentang', target: 'about' },
    };
  }

  if (hasAny(text, ['sertifikat', 'achievement', 'prestasi', 'pencapaian'])) {
    return {
      message: `${casualPrefix ? `${casualPrefix} ` : ''}Pencapaian yang ditampilkan meliputi ${achievements.map((item) => item.name).join(' dan ')}.`,
      action: { label: 'Lihat sertifikat', target: 'achievements' },
    };
  }

  return {
    message: 'Aku bisa jawab obrolan ringan dan hitung matematika dasar, tapi tetap paling kuat untuk konteks portfolio Aditya. Coba tanya: "Project React apa saja?", "Hitung 12 * 8 + 5", atau "Skill backend Aditya apa?"',
    action: { label: 'Kembali ke atas', target: 'home' },
  };
}
