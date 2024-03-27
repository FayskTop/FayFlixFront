import styles from './Header.module.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    useEffect(() => {
        document.title = 'FayFlix';
    }, []);

    return (
        <header className={styles.header}>
            <Link to="/"><img rel="preload" src="https://storagefayflix.blob.core.windows.net/webpage/FayFlixLogo.webp" alt="FayFlix" /></Link>
        </header>
    );
};

export default Header;
