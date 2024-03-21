import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchContent } from '../../services/api';

const Catalog = () => {
  const [catalogItems, setCatalogItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalogItems() {
      try {
        const contentData = await fetchContent('Videos');
        const uniqueDirectories = new Set(); // Conjunto para armazenar diretórios únicos
        const uniqueItems = contentData.filter(item => {
          if (uniqueDirectories.has(item.directory)) {
            return false; // Retorna false se o diretório já foi adicionado
          } else {
            uniqueDirectories.add(item.directory);
            return true; // Retorna true se o diretório ainda não foi adicionado
          }
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

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Catalog Page</h1>
      <ul>
        {catalogItems.map((item, index) => (
          <li key={index}>
            <Link to={`/catalog/${item.directory}`}>{item.directory}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catalog;