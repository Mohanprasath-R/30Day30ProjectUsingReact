import React, { useEffect, useState, useCallback } from 'react';
import { fetchGifs } from '@/lib/giphy';
import toast from 'react-hot-toast';

interface Props {
  query: string;
}

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

const GifGrid: React.FC<Props> = ({ query }) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 25;

  const loadGifs = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      const data = await fetchGifs(query, reset ? 0 : offset, limit);
      if (data.length === 0) toast.error("No more GIFs found.");
      setGifs((prev) => reset ? data : [...prev, ...data]);
      setOffset((prev) => reset ? limit : prev + limit);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      toast.error("Failed to fetch GIFs.");
    }
    setLoading(false);
  }, [query, offset]);

  // Fetch on query change
  useEffect(() => {
    setOffset(0);
    loadGifs(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (atBottom && !loading) loadGifs();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadGifs, loading]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gifs.map((gif) => (
          <div key={gif.id}>
            <img
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="rounded shadow"
            />
          </div>
        ))}
      </div>
      {loading && <p className="text-white text-center mt-5">Loading...</p>}
    </>
  );
};

export default GifGrid;
