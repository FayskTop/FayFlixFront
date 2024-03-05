import React from 'react';
import styles from './VideoPopup.module.scss';

function VideoPopup({ videoUrl, closeVideoPopup }) {
    return (
        <div className={styles['video-overlay']}>
            <div className={styles['video-popup']}>
                <video className={styles['popup-video']} controls autoPlay src={videoUrl} />
                <span className={styles['close-btn']} onClick={closeVideoPopup}>X</span>
            </div>
        </div>
    );
}

export default VideoPopup;
