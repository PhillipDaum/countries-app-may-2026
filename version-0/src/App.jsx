import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
// pages
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";
import localData from "../localData"; // local data
import './App.css'; // styles

function App() {
  const [allCountries, setAllCountries] = useState(localData.sort((a, b) => a.name.common.localeCompare(b.name.common)));

  
  return (
    <div>
      <header className="nav-header">
        <nav>
          <ul>
            <li>
              <Link to="/" className="nav-home">
                Where in the world?
              </Link>
            </li>
            <li>
              <Link to="/saved-countries">Saved Countries</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                allCountries={allCountries}
              />
            }
          />
          <Route path="/country-detail" element={<CountryDetail />} />
          <Route path="/saved-countries" element={<SavedCountries />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
