import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Contacts from "./pages/contacts";

import './styles/main.scss'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/contacts' element={<Contacts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
