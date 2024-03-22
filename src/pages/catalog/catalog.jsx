import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchContent } from '../../services/api';
import styles from './catalog.module.scss';
import Loading from '../../components/Loading/Loading';

const Catalog = () => {
  const [catalogItems, setCatalogItems] = useState([]);
  const [catalogsData, setCatalogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCatalogItems() {
      try {
        setIsLoading(true);

        const videosData = await fetchContent('Videos');
        const catalogsData = await fetchContent('catalogs');

        if (!videosData || !catalogsData) {
          throw new Error('Erro ao buscar conteúdo do catálogo. Os dados não foram recebidos corretamente.');
        }

        setCatalogsData(catalogsData);

        // Merging items from Videos and catalogs
        const mergedItems = [...videosData, ...catalogsData];

        // Remove duplicates by filtering unique directories
        const uniqueDirectories = new Set();
        const uniqueItems = mergedItems.filter(item => {
          if (!uniqueDirectories.has(item.directory)) {
            uniqueDirectories.add(item.directory);
            return true;
          }
          return false;
        });

        setCatalogItems(uniqueItems);
      } catch (error) {
        console.error('Erro ao buscar conteúdo do catálogo:', error);
        setError('Erro ao carregar o catálogo. Por favor, tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCatalogItems();
  }, []);

  if (isLoading) {
    return <Loading>Carregando...</Loading>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className={styles.catalogContainer}>
      <ul className={styles.catalogList}>
        {catalogItems
          .filter(item => item.directory !== null)
          .map((item, index) => {
            const correspondingCatalogData = catalogsData.find(catalogData => catalogData.name === item.directory);
            const imgSrc = (correspondingCatalogData && correspondingCatalogData.fullPath) || 'https://storagefayflix.blob.core.windows.net/webpage/404v.png';

            return (
              <li key={index} className={styles.catalogItem}>
                <Link to={`/catalog/${item.directory}`}>
                  <img src={imgSrc} alt={item.directory} />
                  <h3 className={styles.nomeConteudo}>{item.directory}</h3>
                </Link>
              </li>
            );
          })}

      </ul>
    </div>
  );
}

export default Catalog;
