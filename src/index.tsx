import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {MenuProvider} from "./contexts/MenuContext";
import {Cover} from "./components/menu/Menu";
import {Header} from "./components/layout/Header";

ReactDOM.render(
  <React.StrictMode>
    <MenuProvider>
      <Cover type="app" />
      <BrowserRouter>
        <Header hasBurger={true} theme={'dark'} />
        <App/>
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
