import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import VideoPopup from '../VideoPopup/VideoPopup';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import styles from './MainContent.module.scss';
import { findRelatedFile } from '../../utils/fileUtils';

function MainContent({ videos, gifs, thumbnails, darkMode, showVideoPopup, popupVideoUrl, openVideoPopup, closeVideoPopup, toggleDarkMode }) {
  return (
    <>
      <div className={styles['video-container']}>
        {videos.map((video, index) => (
          <VideoItem
            key={index}
            video={video}
            thumbnails={thumbnails}
            gifs={gifs}
            darkMode={darkMode}
            openVideoPopup={openVideoPopup}
            findRelatedFile={findRelatedFile}
          />
        ))}
      </div>

      {showVideoPopup && (
        <VideoPopup
          videoUrl={popupVideoUrl}
          closeVideoPopup={closeVideoPopup}
        />
      )}

      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </>
  );
}

export default MainContent;
