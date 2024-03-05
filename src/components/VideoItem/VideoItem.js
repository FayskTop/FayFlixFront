import React from 'react';
import styles from './VideoItem.module.scss';

const defaultThumbnail = 'https://storagefayflix.blob.core.windows.net/webpage/404.jpeg';
const defaultGif = 'https://storagefayflix.blob.core.windows.net/webpage/404.gif';

function VideoItem({ video, thumbnails, gifs, darkMode, openVideoPopup, findRelatedFile }) {
    // Verificar se o vídeo possui um nome válido
    if (!video.name) {
        console.error('Video name is missing or invalid:', video);
        return null;
    }

    // Verificar se há thumbnails e gifs
    if (!thumbnails || !gifs) {
        console.error('Thumbnails or gifs data is missing:', thumbnails, gifs);
        return null;
    }

    // Encontrar o caminho da thumbnail correspondente
    const thumbnailSrc = findRelatedFile(video.name, thumbnails) || defaultThumbnail;

    // Encontrar o caminho do gif correspondente
    const gifSrc = findRelatedFile(video.name, gifs) || defaultGif;

    return (
        <div className={`${styles['video-item']} ${darkMode ? styles['dark-mode'] : ''}`}>
            <img
                className={styles['video-thumbnail']}
                src={thumbnailSrc}
                alt={`Thumbnail ${video.name}`}
                onClick={() => openVideoPopup(video.fullPath)}
                onMouseOver={(e) => e.target.src = gifSrc}
                onMouseOut={(e) => e.target.src = thumbnailSrc}
            />
            <div className={styles['video-info']}>
                <h2 className={styles['video-title']}>{video.name}</h2>
            </div>
        </div>
    );
}

export default VideoItem;
