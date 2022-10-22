import {Route, Switch, useLocation} from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
// import { Cursor } from 'react-creative-cursor'

import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Contacts from "./pages/contacts";
import Join from "./pages/join";
import Work from "./pages/work";
import About from "./pages/about";

import './styles/main.scss'
import {useMenuContext} from "./contexts/MenuContext";

function App() {
  const { pathname } = useLocation();
  const { setCoverRunning } = useMenuContext();

  return (
    <>
      <TransitionGroup>
        <CSSTransition
          key={pathname}
          classNames="page"
          timeout={1400}
          onEnter={() => setCoverRunning()}
        >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path='/contacts' exact component={Contacts} />
            <Route path="/join" exact component={Join} />
            <Route path="/work" exact component={Work} />
            <Route path="/about" exact component={About} />
            <Route path="*" component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      {/*<Cursor isGelly={true} cursorSize={20} cursorBackgrounColor="#fff" exclusionBackgroundColor="#eee" />*/}
    </>
  );
}

export default App;
