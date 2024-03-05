import React from 'react';
import styles from './DarkModeToggle.module.scss';

function DarkModeToggle({ darkMode, toggleDarkMode }) {
    return (
        <button
            id="dark-mode-toggle"
            className={`${styles['dark-mode-toggle']} ${darkMode ? styles['dark-mode'] : ''}`}
            onClick={toggleDarkMode}
            style={{ backgroundColor: darkMode ? '#fff' : '#26282B', color: darkMode ? '#26282B' : '#fff' }}
        >
            {darkMode ? '☀️' : '🌙'}
        </button>
    );
}

export default DarkModeToggle;
