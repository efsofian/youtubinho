import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Searchbar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
import Logo from './components/logo';

const api_key = 'AIzaSyDnUmpyAFQh8BL1zNaFxcPaw1901fZcjJo';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null,
      term: '',

     };
     this.videoSearch('');
  }

  videoSearch(term) {
    YTSearch({key: api_key, term: term}, (videos) => { this.setState({
      videos,
      selectedVideo: videos[0],
     }) });    // es6 videos: videos
  }

  render() {
    const videoSearchbounce = _.debounce((term) => this.videoSearch(term), 300);
    return(
      <div>
      <Logo />
        <Searchbar
        onSearchTermChange={(term) => videoSearchbounce(term)} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
        onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
        videos={this.state.videos}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
