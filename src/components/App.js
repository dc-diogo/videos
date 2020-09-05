import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';

const KEY = 'AIzaSyAx4nBTabfzgAZJH-GFZQDx_BRyCw69JsQ';

class App extends React.Component {
  state = { videos: [] };

  onSearchTermSubmit = async (searchTerm) => {
    const response = await youtube.get('/search', {
      params: {
        q: searchTerm,
        type: 'video',
        part: 'snippet',
        maxResults: 5,
        key: KEY
      }
    });

    this.setState({ videos: response.data.items });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onSearchTermSubmit={this.onSearchTermSubmit} />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

export default App;
