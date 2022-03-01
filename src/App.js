import "./App.css";

import { Route, Routes } from "react-router-dom";

// Screens
import Home from "./screens/home/home";
import SortedOldest from "./screens/tables/oldest";
import SortedUp from "./screens/tables/sortedUp";
import NotFound from "./screens/notFound/notFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="" element={<Home />} />
        <Route path="table/up" element={<SortedUp />} />
        <Route path="table/oldest" element={<SortedOldest />} />
      </Routes>
    </div>
  );
}

export default App;
