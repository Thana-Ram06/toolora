import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = 'toolora:favorites';
const RECENTS_KEY = 'toolora:recents';

function read(key: string): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function useToolPreferences() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(read(FAVORITES_KEY));
    setRecentSlugs(read(RECENTS_KEY));
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((current) => {
      const next = current.includes(slug) ? current.filter((item) => item !== slug) : [slug, ...current];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const rememberTool = useCallback((slug: string) => {
    setRecentSlugs((current) => {
      const next = [slug, ...current.filter((item) => item !== slug)].slice(0, 6);
      localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { favorites, recentSlugs, toggleFavorite, rememberTool };
}