import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchContent } from '../../services/api';
import styles from './catalog.module.scss';

const Catalog = () => {
  const [catalogItems, setCatalogItems] = useState([]);
  const [catalogsData, setCatalogsData] = useState([]); // Adicione esta linha
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalogItems() {
      try {
        const videosData = await fetchContent('Videos');
        const catalogsData = await fetchContent('catalogs');

        setCatalogsData(catalogsData); // Adicione esta linha

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
      } finally {
        setIsLoading(false);
      }
    }

    fetchCatalogItems();
  }, []);

  return (
    <div className={styles.catalogContainer}>
      {/* <h1><Link to="/">Home</Link></h1> */}
      <ul className={styles.catalogList}>
        {catalogItems
          .filter(item => item.directory !== null)
          .map((item, index) => {
            const correspondingCatalogData = catalogsData.find(catalogData => catalogData.name === item.directory);

            return (
              <li key={index} className={styles.catalogItem}>
                <Link to={`/catalog/${item.directory}`}>
                  {correspondingCatalogData && <img src={correspondingCatalogData.fullPath} alt={item.directory} />}
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
