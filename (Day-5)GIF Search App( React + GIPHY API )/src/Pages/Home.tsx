import React from 'react';
import GifGrid from '@/components/GifGrid';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';

const trendingKeywords = [
  "funny", "surprised", "excited", "dance", "fail", "omg", "party", "reaction", "love", "angry"
];

const Home = () => {
  const [query, setQuery] = React.useState("happy");

  const handleFeelingLucky = () => {
    const random = trendingKeywords[Math.floor(Math.random() * trendingKeywords.length)];
    setQuery(random);
    toast.success(`Feeling lucky with: ${random}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5">
      <h1 className="text-4xl text-center mb-6 font-bold">Gif Quest</h1>
      <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-3 mb-5">
        <SearchBar query={query} setQuery={setQuery} />
        <Button onClick={handleFeelingLucky}>Feeling Lucky</Button>
      </div>
      <GifGrid query={query} />
      <Toaster position="top-center" />
    </div>
  );
};

export default Home;
