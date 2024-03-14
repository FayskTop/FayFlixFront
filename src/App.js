import React, { useState, useEffect } from 'react';
import Loading from './components/Loading/Loading';
import Error from './components/Error/Error';
import MainContent from './components/MainContent/MainContent';
import { fetchContent } from './utils/fileUtils';
import styles from './App.module.scss';

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
      {loading && <Loading />}
      {error && <Error message={error.message} />} {/* Exiba a mensagem de erro */}
      {!loading && !error && (
        <MainContent
          videos={videos}
          gifs={gifs}
          thumbnails={thumbnails}
          darkMode={darkMode}
          showVideoPopup={showVideoPopup}
          popupVideoUrl={popupVideoUrl}
          openVideoPopup={openVideoPopup}
          closeVideoPopup={closeVideoPopup}
          toggleDarkMode={toggleDarkMode}
        />
      )}
    </div>
  );
}

export default App;
