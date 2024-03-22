import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/home/home'; 
import Catalog from './pages/catalog/catalog';
import CatalogItem from './pages/catalogItem/catalogItem';
import WatchContent from './pages/watchContent/watchContent';
import ErrorPage from './components/Error/Error'; 

const RouterConfig = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:directory" element={<CatalogItem />} />
        <Route path="/watchContent" element={<WatchContent />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default RouterConfig;
