import { Routes, Route } from "react-router-dom";

import { StoreProvider } from "./context/StoreContext";

import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StoreProvider>
  );
}

export default App;