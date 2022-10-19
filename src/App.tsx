import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Contacts from "./pages/contacts";
import Join from "./pages/join";
import Work from "./pages/work";
import About from "./pages/about";

import './styles/main.scss'

function App() {
  return (
    <Routes >
      <Route index element={<Home />} />
      <Route path='/contacts' element={<Contacts />} />
      <Route path="/join" element={<Join />} />
      <Route path="/work" element={<Work />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
