import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useGithubStats } from '../github';
import { useLang } from '../lang';
import { profile } from '../data/profile';

export default function GithubCard() {
  const { status, data } = useGithubStats(profile.socials.github.username);
  const { lang } = useLang();

  const labels = {
    id: { title: 'GitHub', followers: 'Pengikut', following: 'Mengikuti', repos: 'Repositori' },
    en: { title: 'GitHub', followers: 'Followers', following: 'Following', repos: 'Repositories' },
  }[lang];

  const tiles = data
    ? [
        { value: data.followers, label: labels.followers },
        { value: data.following, label: labels.following },
        { value: data.repos, label: labels.repos },
      ]
    : [];

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-neutral-900">
          <FiGithub className="mr-1.5 inline align-[-2px]" aria-hidden="true" />
          {labels.title}
        </h2>
        <a
          href={profile.socials.github.url}
          target="_blank"
          rel="noreferrer"
          aria-label="Buka GitHub"
          className="text-neutral-400 transition hover:text-neutral-700"
        >
          <FiExternalLink aria-hidden="true" />
        </a>
      </div>

      {status === 'loading' ? (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((key) => (
            <div key={key} className="h-14 animate-pulse rounded-lg bg-neutral-100" />
          ))}
        </div>
      ) : null}

      {status === 'error' ? (
        <p className="mt-3 text-xs text-neutral-500">GitHub tidak bisa dihubungi saat ini.</p>
      ) : null}

      {status === 'ready' ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {tiles.map((tile) => (
              <div key={tile.label} className="rounded-lg border border-neutral-200 px-3 py-2.5">
                <p className="text-lg font-black leading-none text-neutral-900">{tile.value}</p>
                <p className="mt-1 text-[11px] leading-tight text-neutral-500">{tile.label}</p>
              </div>
            ))}
          </div>

          {data.languages.length ? (
            <ul className="mt-4 space-y-2">
              {data.languages.map(([name, count]) => (
                <li key={name} className="flex items-center gap-2 text-xs text-neutral-600">
                  <span className="w-20 shrink-0 truncate">{name}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                    <span
                      className="block h-full rounded-full bg-neutral-800"
                      style={{ width: `${(count / data.languages[0][1]) * 100}%` }}
                    />
                  </span>
                  <span className="w-6 shrink-0 text-right text-neutral-400">{count}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
    </section>
  );
}