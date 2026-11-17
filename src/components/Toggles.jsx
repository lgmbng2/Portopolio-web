import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../theme';
import { useLang } from '../lang';

const IconToggle = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-100"
    aria-label={label}
    title={label}
  >
    {children}
  </button>
);

export default function Toggles() {
  const { theme, toggle } = useTheme();
  const { lang, toggle: toggleLang, t } = useLang();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={toggleLang}
        className="rounded-xl border border-neutral-200 bg-white px-3 text-xs font-bold uppercase text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-100"
        aria-label={t.lang}
        title={t.lang}
      >
        {lang}
      </button>
      <IconToggle label={t.theme} onClick={toggle}>
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </IconToggle>
    </div>
  );
}