import React from 'react';
import RouterConfig from './Router';
import globalStyles from './styles/Global.module.scss';
import darkModeStyles from './styles/DarkMode.module.scss';
import lightModeStyles from './styles/LightMode.module.scss';

function App() {
  return (
    <div className="App">
      <RouterConfig />
    </div>
  );
}

export default App;
