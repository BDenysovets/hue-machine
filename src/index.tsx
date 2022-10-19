import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {MenuProvider} from "./contexts/MenuContext";
import { HelmetProvider } from 'react-helmet-async';
import {Cover} from "./components/menu/Menu";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuProvider>
        <Cover type="app" />
          <HelmetProvider>
            <App/>
          </HelmetProvider>
      </MenuProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
