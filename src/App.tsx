import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Contact from "./pages/contact";

import './styles/main.scss'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
