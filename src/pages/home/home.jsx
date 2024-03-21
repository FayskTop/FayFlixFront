import styles from './home.module.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <h1><Link to="/catalog">Catalogo</Link></h1>
        </div>
    );
}

export default Home;
