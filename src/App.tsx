import { Route } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Contacts from "./pages/contacts";
import Join from "./pages/join";
import Work from "./pages/work";
import About from "./pages/about";

import './styles/main.scss'

function App() {
  return (
    <>
      <Route path="/" exact render={() => <Home />} />
      <Route path='/contacts' exact render={() => <Contacts />} />
      <Route path="/join" exact render={() => <Join />} />
      <Route path="/work" exact render={() => <Work />} />
      <Route path="/about" exact render={() => <About />} />
      <Route path="*" render={() => <NotFound />} />
    </>
  );
}

export default App;
