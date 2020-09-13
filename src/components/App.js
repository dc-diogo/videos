import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
const KEY = 'AIzaSyAx4nBTabfzgAZJH-GFZQDx_BRyCw69JsQ';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    onSearchTermSubmit('Resident Evil');
  }, []);

  const onSearchTermSubmit = async (searchTerm) => {
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
    setSelectedVideo(response.data.items[0]);
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="ui container">
      <SearchBar onSearchTermSubmit={onSearchTermSubmit} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList onVideoSelect={onVideoSelect} videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
