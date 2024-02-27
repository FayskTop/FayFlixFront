import React, { useState, useEffect } from 'react';
import styles from './App.module.scss'; 

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

  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  }

  return (
    <div className={`${styles.App} ${darkMode ? styles['dark-mode'] : ''}`}>
      <div className={styles['video-container']}>
        {videos.map((video, index) => (
          <div className={`${styles['video-item']} ${darkMode ? styles['dark-mode'] : ''}`} key={index}>
            <img
              className={styles['video-thumbnail']}
              src={video.thumbnail}
              alt={video.name}
              onClick={() => openVideoPopup(video.path)}
              onMouseOver={(e) => e.target.src = video.gif}
              onMouseOut={(e) => e.target.src = video.thumbnail}
            />
            <div className={styles['video-info']}>
              <h2 className={styles['video-title']}>{video.name}</h2>
              <p className={styles['video-description']}>{video.description}</p>
            </div>
          </div>
        ))}
      </div>
  
      {showVideoPopup && (
        <div className={styles['video-overlay']} onClick={closeVideoPopup}>
          <div className={styles['video-popup']}>
            <video className={styles['popup-video']} controls autoPlay src={popupVideoUrl} />
            <h2 className={styles['video-name']}>{getVideoName(popupVideoUrl)}</h2>
            <span className={styles['close-btn']} onClick={closeVideoPopup}>X</span>
          </div>
        </div>
      )}
  
      <button 
          id="dark-mode-toggle" 
          className={`${styles['dark-mode-toggle']} ${darkMode ? styles['dark-mode'] : ''}`} 
          onClick={toggleDarkMode}
          style={{ backgroundColor: darkMode ? '#fff' : '#26282B', color: darkMode ? '#26282B' : '#fff' }}
      >
          {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );  
}

export default App;
