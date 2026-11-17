import { useEffect, useState } from 'react';

export const navItems = [
  { id: 'home', label: 'Beranda' },
  { id: 'about', label: 'Tentang' },
  { id: 'skills', label: 'Keahlian' },
  { id: 'projects', label: 'Proyek' },
  { id: 'achievements', label: 'Sertifikat' },
  { id: 'contact', label: 'Kontak' },
];

export function useHashRoute(defaultRoute = 'home') {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || defaultRoute);

  useEffect(() => {
    const onChange = () => setRoute(window.location.hash.slice(1) || defaultRoute);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, [defaultRoute]);

  return route;
}

export function goTo(id) {
  window.location.hash = id;
}