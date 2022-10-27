import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {MenuProvider} from "./contexts/MenuContext";
import {Cover} from "./components/menu/Menu";
import {Header} from "./components/layout/Header";
import Cursor from "./components/cursor/Cursor";

ReactDOM.render(
  <React.StrictMode>
    <MenuProvider>
      <Cover type="app" />
      <BrowserRouter>
        <Cursor>
          <>
            <Header theme={'dark'} />
            <App/>
          </>
        </Cursor>
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
