import SideRays from './SideRays';
import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080B12] px-5 py-16 text-center text-sm text-slate-500 md:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_50%_118%,rgba(56,189,248,0.32),transparent_38%),radial-gradient(circle_at_74%_112%,rgba(234,179,8,0.16),transparent_30%),linear-gradient(180deg,transparent_0%,rgba(8,11,18,0.2)_38%,#080B12_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />
        <SideRays
          speed={4.5}
          rayColor1="#38bdf8"
          rayColor2="#EAB308"
          intensity={1.2}
          spread={1.8}
          origin="bottom-right"
          tilt={10}
          saturation={1.1}
          blend={0.58}
          falloff={1.85}
          opacity={0.2}
        />
      </div>
      <p className="relative text-slate-400">
        &copy; 2026 {profile.name}. Built with React, Tailwind CSS, Framer Motion, and React Icons.
      </p>
    </footer>
  );
}
