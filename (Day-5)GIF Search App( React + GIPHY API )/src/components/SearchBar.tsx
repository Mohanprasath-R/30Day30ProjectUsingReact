import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ query, setQuery }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => setQuery("");

  return (
    <div className="flex gap-2 w-full">
      <Input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a mood (e.g. happy)"
        className="flex-grow border rounded-md shadow-sm"
      />
      <Button onClick={clearSearch} variant="secondary">
        Clear
      </Button>
    </div>
  );
};

export default SearchBar;
