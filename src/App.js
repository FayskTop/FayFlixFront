import React, { useState, useEffect } from 'react';
import styles from './App.module.scss'; 

const defaultThumbnail = 'https://storagefayflix.blob.core.windows.net/webpage/404.jpeg';
const defaultGif = 'https://storagefayflix.blob.core.windows.net/webpage/404.gif';

function App() {
  const [videos, setVideos] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [popupVideoUrl, setPopupVideoUrl] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const videosResponse = await fetchContent('videos');
        const gifsResponse = await fetchContent('gifs');
        const thumbnailsResponse = await fetchContent('thumbnails');

        setVideos(videosResponse);
        setGifs(gifsResponse);
        setThumbnails(thumbnailsResponse);
        setLoading(false);
      } catch (error) {
        setError('Failed to load content. Please try again later.');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function fetchContent(containerName) {
    const response = await fetch(`https://apiserverfile.azurewebsites.net/${containerName}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${containerName}: ${response.statusText}`);
    }
    const contentData = await response.json();
    return contentData.map(item => ({
      name: item.name,
      fullPath: item.path
    }));
  }

  function findRelatedFile(videoName, fileList) {
    const relatedFile = fileList.find(file => file.name === videoName);
    return relatedFile ? relatedFile.fullPath : '';
  }

  function openVideoPopup(videoUrl) {
    setShowVideoPopup(true);
    setPopupVideoUrl(videoUrl);
  }

  function closeVideoPopup() {
    setShowVideoPopup(false);
    setPopupVideoUrl('');
  }

  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  }

  return (
    <div className={`${styles.app} ${darkMode ? styles['dark-mode'] : ''}`}>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <>
          <div className={styles['video-container']}>
            {videos.map((video, index) => (
              <div className={`${styles['video-item']} ${darkMode ? styles['dark-mode'] : ''}`} key={index}>
                <img
                  className={styles['video-thumbnail']}
                  src={findRelatedFile(video.name, thumbnails) || defaultThumbnail}
                  alt={`Thumbnail ${index}`}
                  onClick={() => openVideoPopup(video.fullPath)}
                  onMouseOver={(e) => e.target.src = findRelatedFile(video.name, gifs) || defaultGif}
                  onMouseOut={(e) => e.target.src = findRelatedFile(video.name, thumbnails) || defaultThumbnail}
                />
                <div className={styles['video-info']}>
                  <h2 className={styles['video-title']}>{video.name}</h2>
                  {/* Adicione descrição se disponível */}
                  {/* <p className={styles['video-description']}>{videos[index].description}</p> */}
                </div>
              </div>
            ))}
          </div>
        
          {showVideoPopup && (
            <div className={styles['video-overlay']} onClick={closeVideoPopup}>
              <div className={styles['video-popup']}>
                <video className={styles['popup-video']} controls autoPlay src={popupVideoUrl} />
                {/* <h2 className={styles['video-name']}>{getVideoName(popupVideoUrl)}</h2> */}
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
        </>
      )}
    </div>
  );  
}

export default App;
