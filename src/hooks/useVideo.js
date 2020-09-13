import { useState, useEffect } from 'react';
import youtube from '../apis/youtube';
const KEY = 'AIzaSyAx4nBTabfzgAZJH-GFZQDx_BRyCw69JsQ';

const useVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async (searchTerm) => {
    const response = await youtube.get('/search', {
      params: {
        q: searchTerm,
        type: 'video',
        part: 'snippet',
        maxResults: 5,
        key: KEY
      }
    });

    setVideos(response.data.items);
  };

  return [videos, search];
};

export default useVideos;
