// CatalogItem.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchItemsInDirectory } from '../../services/api';
import styles from './catalogItem.module.scss';

const CatalogItem = () => {
  const { directory } = useParams();
  const [videos, setVideos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredThumbnail, setHoveredThumbnail] = useState(null);

  useEffect(() => {
    async function fetchAllItems() {
      try {
        const videosInDirectory = await fetchItemsInDirectory('Videos', directory);
        const thumbnailsInDirectory = await fetchItemsInDirectory('Thumbnails', directory);
        const gifsInDirectory = await fetchItemsInDirectory('Gifs', directory);
        setVideos(videosInDirectory);
        setThumbnails(thumbnailsInDirectory);
        setGifs(gifsInDirectory);
      } catch (error) {
        console.error('Erro ao buscar arquivos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoading) {
      fetchAllItems();
    }
  }, [directory, isLoading]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Combinar os itens de vídeo, thumbnails e gifs em uma única lista
  const combinedItems = videos.map(video => ({
    ...video,
    thumbnail: thumbnails.find(thumbnail => thumbnail.name === video.name),
    gif: gifs.find(gif => gif.name === video.name)
  }));

  return (
    <div className={styles.catalogItem}>
      <h1>{directory}</h1>
      <div className={styles.videoList}>
        {combinedItems.map((item, index) => {
          return (
            <Link key={index} to={`/watchContent?videoId=${encodeURIComponent(item.name)}`} className={styles.videoItem}>
              <div 
                className={styles.thumbnailContainer}
                onMouseEnter={() => setHoveredThumbnail(item.name)}
                onMouseLeave={() => setHoveredThumbnail(null)}
              >
                {hoveredThumbnail === item.name && item.gif ? (
                  <img src={item.gif.fullPath} alt={item.name} className={styles.videoThumbnail} />
                ) : (
                  <img src={item.thumbnail.fullPath} alt={item.name} className={styles.videoThumbnail} />
                )}
              </div>
              <div className={styles.videoInfo}>
                <p className={styles.videoTitle}>{item.name}</p>
                {/* <p className={styles.videoDescription}>Full Path: {item.fullPath}</p> */}
                {/* Outras informações do item do catálogo */}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
  
}

export default CatalogItem;
