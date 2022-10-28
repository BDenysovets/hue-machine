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
      <ScrollAnimation>
        <Cover type="app" />
        <BrowserRouter>
          <Cursor>
            <>
              <Header theme={'dark'} />
              <App/>
            </>
          </Cursor>
        </BrowserRouter>
      </ScrollAnimation>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
