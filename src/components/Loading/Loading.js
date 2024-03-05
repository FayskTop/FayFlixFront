import React from 'react';
import styles from './Loading.module.scss';

function Loading() {
    return (
        <div>
            {/* Adicione a classe do módulo CSS */}
            <div className={styles.loading}>
                <p>Loading...</p>
            </div>
            {/* Adicione a animação de carregamento */}
            <div className="video-item loading">
                <div className="loading-animation"></div>
            </div>
        </div>
    );
}

export default Loading;
