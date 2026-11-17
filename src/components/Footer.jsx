import { profile } from '../data/profile';
import { navItems } from '../routes';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 px-5 py-12 text-sm text-neutral-500 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 {profile.name}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems
              .filter((item) => item.id !== 'home')
              .map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="transition hover:text-neutral-700">
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}