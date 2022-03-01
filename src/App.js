import logo from "./logo.svg";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import SortedUp from "./screens/sortedUp";
import SortedOldest from "./screens/oldest";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="sorted/up" element={<SortedUp />} />
        <Route path="sorted/oldest" element={<SortedOldest />} />
      </Routes>
    </div>
  );
}

export default App;
