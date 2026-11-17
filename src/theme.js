import { useEffect, useState } from 'react';

const KEY = 'porto-theme';

const query = () => window.matchMedia?.('(prefers-color-scheme: dark)');

const preferred = () => (query()?.matches ? 'dark' : 'light');

const stored = () => {
  const value = window.localStorage.getItem(KEY);
  return value === 'dark' || value === 'light' ? value : null;
};

export function useTheme() {
  const [theme, setTheme] = useState(() => stored() ?? preferred());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const media = query();
    if (!media || stored()) return undefined;

    const onChange = () => setTheme(preferred());
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () =>
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem(KEY, next);
      return next;
    });

  return { theme, toggle };
}

export function useThemeMode() {
  const [mode, setMode] = useState(() => document.documentElement.dataset.theme ?? preferred());

  useEffect(() => {
    const root = document.documentElement;
    const observer = new window.MutationObserver(() => setMode(root.dataset.theme ?? preferred()));
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return mode;
}
