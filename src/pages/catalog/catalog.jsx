import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchContent, fetchItemsInDirectory } from '../../services/api';
import styles from './catalog.module.scss';

const Catalog = () => {
  const [catalogItems, setCatalogItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalogItems() {
      try {
        const contentData = await fetchContent('Videos');
        const uniqueDirectories = new Set(); // Conjunto para armazenar diretórios únicos
        const uniqueItems = contentData.filter(item => {
          if (!uniqueDirectories.has(item.directory)) {
            uniqueDirectories.add(item.directory);
            return true; // Retorna true se o diretório ainda não foi adicionado
          }
          return false; // Retorna false se o diretório já foi adicionado
        });
        setCatalogItems(uniqueItems);
      } catch (error) {
        console.error('Erro ao buscar conteúdo do catálogo:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (catalogItems.length === 0) {
      fetchCatalogItems();
    }
  }, [catalogItems]);


  return (
    <div className={styles.catalogContainer}>
      <h1>Catalog Page</h1>
      <ul className={styles.catalogList}>
        {catalogItems.map((item, index) => {
          return (
            <li key={index} className={styles.catalogItem}>
              <Link to={`/catalog/${item.directory}`}>
                {item.thumbnail && <img src={item.thumbnail} alt={item.directory} className={styles.thumbnail} />}
                <p>{item.directory}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

}

export default Catalog;
