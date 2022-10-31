import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {MenuProvider} from "./contexts/MenuContext";
import {Cover} from "./components/menu/Menu";
import {Header} from "./components/layout/Header";
import Cursor from "./components/cursor/Cursor";
import {ScrollAnimation} from "./components/scrollAnimation/ScrollAnimation";

ReactDOM.render(
  <React.StrictMode>
    <MenuProvider>
      <Cover type="app" />
      <BrowserRouter>
        <ScrollAnimation>
          <Cursor>
            <>
              <Header theme={'dark'} />
              <App/>
            </>
          </Cursor>
        </ScrollAnimation>
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
