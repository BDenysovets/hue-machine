import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {MenuProvider} from "./contexts/MenuContext";
import {Cover} from "./components/menu/Menu";

ReactDOM.render(
  <React.StrictMode>
    <MenuProvider>
      <Cover type="app" />
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
