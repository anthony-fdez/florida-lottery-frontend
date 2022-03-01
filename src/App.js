import logo from "./logo.svg";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import SortedUp from "./screens/sortedUp";
import SortedOldest from "./screens/oldest";
import Home from "./screens/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="sorted/up" element={<SortedUp />} />
        <Route path="sorted/oldest" element={<SortedOldest />} />
      </Routes>
    </div>
  );
}

export default App;
