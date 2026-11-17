import { useEffect, useState } from 'react';

const CACHE_KEY = 'porto-gh';
const TTL = 60 * 60 * 1000;

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    return Date.now() - at < TTL ? data : null;
  } catch {
    return null;
  }
};

export function useGithubStats(username) {
  const [state, setState] = useState(() => readCache() ?? { status: 'idle', data: null });

  useEffect(() => {
    if (readCache()) return undefined;

    const controller = new AbortController();
    const opts = { signal: controller.signal };
    setState({ status: 'loading', data: null });

    (async () => {
      try {
        const user = await fetch(`https://api.github.com/users/${username}`, opts).then((r) => r.json());
        const repos = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          opts,
        ).then((r) => r.json());

        const counts = {};
        for (const repo of Array.isArray(repos) ? repos : []) {
          if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1;
        }

        const data = {
          followers: user.followers ?? 0,
          following: user.following ?? 0,
          repos: Array.isArray(repos) ? repos.length : 0,
          languages: Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4),
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
        setState({ status: 'ready', data });
      } catch (error) {
        if (error.name !== 'AbortError') setState({ status: 'error', data: null });
      }
    })();

    return () => controller.abort();
  }, [username]);

  return state;
}