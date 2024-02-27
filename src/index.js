import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// Se desejar iniciar a medição de desempenho em seu aplicativo, passe uma função
// para registrar os resultados (por exemplo: reportWebVitals (console.log))
// ou envie para um endpoint de análise. Saiba mais: https://bit.ly/CRA-vitals
reportWebVitals();
