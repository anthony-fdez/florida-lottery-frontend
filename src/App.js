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
import NumberMeanings from "./screens/numberMeanings/numberMeanings";
import Stats from "./screens/stats/stats";
import Daily from "./screens/tables/daily";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXV-HamDIIs0rlqy08BqdXuyDzLDo8zB8",
  authDomain: "bolitacuba-caf00.firebaseapp.com",
  projectId: "bolitacuba-caf00",
  storageBucket: "bolitacuba-caf00.appspot.com",
  messagingSenderId: "627469489283",
  appId: "1:627469489283:web:0f5204617a64db633077b6",
  measurementId: "G-GT5CC7MEMX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
          <Route path="number/meanings" element={<NumberMeanings />} />
          <Route path="stats" element={<Stats />} />
          <Route path="table/daily" element={<Daily />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
