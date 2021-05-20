import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ProspectosProvider from './Firebase/ProspectosProvider';

ReactDOM.render(
  <BrowserRouter>
    <ProspectosProvider>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </ProspectosProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
