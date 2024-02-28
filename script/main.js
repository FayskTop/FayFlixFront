import React, { useState, useEffect } from 'react';
import './styles/main.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [popupVideoUrl, setPopupVideoUrl] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      const response = await fetch('https://apiserverfile.azurewebsites.net/videos');
      const videosData = await response.json();
      setVideos(videosData);
    } catch (error) {
      console.error('Error loading videos:', error);
    }
  }

  function openVideoPopup(videoUrl) {
    const videoName = getVideoName(videoUrl);
    setShowVideoPopup(true);
    setPopupVideoUrl(videoUrl);
    alert(`Opening video popup for ${videoName}`);
  }

  function closeVideoPopup() {
    setShowVideoPopup(false);
    setPopupVideoUrl('');
  }

  function getVideoName(videoUrl) {
    const videoId = videoUrl.split('/').pop();
    const video = videos.find(video => video.path.includes(videoId));
    return video ? video.name : 'Unknown';
  }

  function openNextVideo() {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      const nextVideoUrl = videos[currentVideoIndex + 1].path;
      openVideoPopup(nextVideoUrl);
    }
  }

  function openPreviousVideo() {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      const previousVideoUrl = videos[currentVideoIndex - 1].path;
      openVideoPopup(previousVideoUrl);
    }
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className={darkMode ? 'App dark-mode' : 'App'}>
      <header>
        <h1>FayFlix</h1>
      </header>
      <div className="video-container">
        {videos.map((video, index) => (
          <div className="video-item" key={index}>
            <img
              className="video-thumbnail"
              src={video.thumbnail}
              alt={video.name}
              onClick={() => openVideoPopup(video.path)}
              onMouseOver={(e) => e.target.src = video.gif}
              onMouseOut={(e) => e.target.src = video.thumbnail}
            />
            <div className="video-info">
              <h2 className="video-title">{video.name}</h2>
              <p className="video-description">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showVideoPopup && (
        <div className="video-overlay" onClick={closeVideoPopup}>
          <div className="video-popup">
            <video className="popup-video" controls autoPlay src={popupVideoUrl} />
            <h2 className="video-name">{getVideoName(popupVideoUrl)}</h2>
            <span className="close-btn" onClick={closeVideoPopup}>X</span>
          </div>
        </div>
      )}

      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        Toggle Dark Mode
      </button>
    </div>
  );
}

export default App;
