import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchItemsInDirectory } from '../../services/api';
import styles from './catalogItem.module.scss';
import Loading from '../../components/Loading/Loading';

const CatalogItem = () => {
  const { directory } = useParams();
  const [videos, setVideos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setIsLoading(false);
      } catch (error) {
        setError('Erro ao buscar arquivos: ' + error.message);
        setIsLoading(false);
      }
    }

    if (isLoading) {
      fetchAllItems();
    }
  }, [directory, isLoading]);

  if (isLoading) {
    return <Loading>Carregando...</Loading>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Combinar os itens de vídeo, thumbnails e gifs em uma única lista
  const combinedItems = videos.map(video => {
    const thumbnail = thumbnails.find(thumbnail => thumbnail.name === video.name);
    const gif = gifs.find(gif => gif.name === video.name);

    return { ...video, thumbnail, gif };
  });

  return (
    <div className={styles.catalogContainer}>
      <div className={styles.catalogItem}>
        <div className={styles.videoList}>
          {combinedItems.map((item, index) => {
            const thumbnailSrc = (item.thumbnail && item.thumbnail.fullPath) || 'https://storagefayflix.blob.core.windows.net/webpage/404.png';
            const gifSrc = (item.gif && item.gif.fullPath) || 'https://storagefayflix.blob.core.windows.net/webpage/404.gif';
            const imgSrc = hoveredThumbnail === item.name && item.gif ? gifSrc : thumbnailSrc;

            return (
              <Link key={index} to={`/watchContent?videoId=${encodeURIComponent(item.name)}`} className={styles.videoItem}>
                <div
                  className={styles.thumbnailContainer}
                  onMouseEnter={() => setHoveredThumbnail(item.name)}
                  onMouseLeave={() => setHoveredThumbnail(null)}
                >
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className={styles.videoThumbnail}
                  />
                </div>
                <div className={styles.videoInfo}>
                  <p className={styles.videoTitle}>{item.name}</p>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default CatalogItem;
