import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchContent } from '../../services/api';
import styles from './watchContent.module.scss';

const WatchContent = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get('videoId') || '';
  const videoRef = useRef(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const videosInDirectory = await fetchContent('Videos', '');
        setVideoList(videosInDirectory);
        const video = videosInDirectory.find(video => video.name === videoId);
        if (video) {
          setVideoUrl(video.fullPath);
        } else {
          console.error('Vídeo não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar vídeo:', error);
      }
    }

    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  useEffect(() => {
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.volume = 0.1; // Define o volume para 10%
    }
  }, [isVideoLoaded]);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const playNextVideo = () => {
    if (videoList.length === 0) return;
    const currentIndex = videoList.findIndex(video => video.name === videoId);
    const nextIndex = (currentIndex + 1) % videoList.length;
    const nextVideo = videoList[nextIndex];
    if (nextVideo) {
      setVideoUrl(nextVideo.fullPath);
    }
  };

  const playPreviousVideo = () => {
    if (videoList.length === 0) return;
    const currentIndex = videoList.findIndex(video => video.name === videoId);
    const previousIndex = (currentIndex - 1 + videoList.length) % videoList.length;
    const previousVideo = videoList[previousIndex];
    if (previousVideo) {
      setVideoUrl(previousVideo.fullPath);
    }
  };

  return (
    <div className={styles.watchContentContainer}>
      <h3>{videoId}</h3>
      <div className={styles.videoWrapper}>
        <video
          className={styles.videoPlayer}
          controls
          autoPlay
          ref={videoRef}
          onLoadedData={handleVideoLoaded}
        >
          <source src={videoUrl} />
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Botao de ir para o proximo ou anterior ainda não funciona, ele muda todo o conteudo porem nao altera o video do player, e nesse caso ele ainda ta listando todos conteudo,
      devemos corrigir para trazer somente os conteudos de acordo com o catalogo */}
      {/* <div className={styles.videoControls}>
        {videoList.length > 0 && (
          <>
            {videoList.findIndex(video => video.name === videoId) > 0 && (
              <Link to={`/watchContent?videoId=${encodeURIComponent(videoList[(videoList.findIndex(video => video.name === videoId)) - 1].name)}`}><button>Vídeo Anterior</button></Link>
            )}
            {videoList.findIndex(video => video.name === videoId) < videoList.length - 1 && (
              <Link to={`/watchContent?videoId=${encodeURIComponent(videoList[(videoList.findIndex(video => video.name === videoId)) + 1].name)}`}><button>Próximo Vídeo</button></Link>
            )}
          </>
        )}
      </div> */}
    </div>
  );
}

export default WatchContent;
