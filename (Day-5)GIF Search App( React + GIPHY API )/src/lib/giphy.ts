// lib/giphy.ts
export const fetchGifs = async (query: string, offset = 0, limit = 25) => {
  const API_KEY = "QOOTlL9HG64YnCQrS5uQKwDr8BXq6NT1"; // Replace with your actual key
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&api_key=${API_KEY}&limit=${limit}&offset=${offset}`
  );
  const json = await response.json();
  return json.data;
};
