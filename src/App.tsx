import {Route, Switch} from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Contacts from "./pages/contacts";
import Join from "./pages/join";
import Work from "./pages/work";
import About from "./pages/about";

import './styles/main.scss'
import Cursor from "./components/cursor/Cursor";

function App() {
  return (
    <>
      <Cursor
        turnOffOnPhone={true}
        hoverClasses={[
          { classNameOfTargetElement: 'cursorLink', classNameOfStyle: 'cursorHoveredLink' }
        ]}
      >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path='/contacts' exact component={Contacts} />
          <Route path="/join" exact component={Join} />
          <Route path="/work" exact component={Work} />
          <Route path="/about" exact component={About} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Cursor>
    </>
  );
}

export default App;
