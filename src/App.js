import "./App.css";

import { Route, Routes } from "react-router-dom";

// Screens
import Home from "./screens/home/home";
import SortedOldest from "./screens/tables/oldest";
import SortedUp from "./screens/tables/sortedUp";
import NotFound from "./screens/notFound/notFound";
import SortedDown from "./screens/tables/sortedDown";
import History from "./screens/tables/history";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="" element={<Home />} />
          <Route path="table/up" element={<SortedUp />} />
          <Route path="table/down" element={<SortedDown />} />
          <Route path="table/history" element={<History />} />
          <Route path="table/oldest" element={<SortedOldest />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
