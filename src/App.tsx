import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import Navbar from "./components/Navbar";
import { SaveAMovie } from "./SaveAMovie";
import Library from "./Library";
import "./App.css";
import { Explore } from "./Explore";
import Recommendations from "./Recommendations";

export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  description: string;
  poster: string;
}
function App() {
  return (
    <main className="">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/save_movie/:id" element={<SaveAMovie />} />
          <Route path="/library" element={<Library />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </Router>
    </main>
  );
}
export default App;
