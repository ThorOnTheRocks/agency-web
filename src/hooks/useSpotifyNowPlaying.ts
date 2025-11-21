import { useState, useEffect } from 'react';

export const useSpotifyNowPlaying = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/now-playing').then((res) => res.json()),
      new Promise((resolve) => setTimeout(resolve, 2000)), // Minimum loading time
    ]).then(([data]) => {
      setResult(data);
      setLoading(false);
    });
  }, []);

  return { loading, result };
};
