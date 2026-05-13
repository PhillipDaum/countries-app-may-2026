import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
// pages
import Home from "./pages/Home";
import SavedCountries from "./pages/SavedCountries";
import CountryDetail from "./pages/CountryDetail";
import localData from "../localData"; // local data
import "./App.css"; // styles

function App() {
  const [allCountries, setAllCountries] = useState(null);

  const getAllCountriesFromApi = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,population,region,currencies,borders,flags,cca3",
      );
      const data = await response.json();
      setAllCountries(
        data.sort((a, b) => a.name.common.localeCompare(b.name.common)),
      );
    } catch (error) {
      console.log("Error: " + error.message);
      setAllCountries(
        localData.sort((a, b) => a.name.common.localeCompare(b.name.common)),
      );
    }
  };

  useEffect(() => {
    getAllCountriesFromApi();
  }, []);

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
          <Route path="/" element={<Home allCountries={allCountries} />} />
          <Route path="/country-detail" element={<CountryDetail />} />
          <Route path="/saved-countries" element={<SavedCountries allCountries={allCountries} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
