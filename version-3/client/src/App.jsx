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
  const [savedCountries, setSavedCountries] = useState(null);

  const getAllCountriesFromApi = async () => {
    try {
      const response = await fetch(
        "https://countries.dev/countries?fields=name,capital,population,region,currencies,borders,flags,cca3",
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

  const getSavedCountries = async () => {
    try {
      const response = await fetch("/api/get-all-saved-countries", {
        method: "GET",
      });
      const data = await response.json();
      const fullCountriesArr = data.map((item) =>
        allCountries.find(
          (country) => item.country_name === country.name.common,
        ),
      );
      setSavedCountries(fullCountriesArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCountriesFromApi();
  }, []);

  useEffect(() => {
    if (allCountries) {
      getSavedCountries();
    }
  }, [allCountries]);


  console.log(savedCountries);

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
          <Route
            path="/country-detail/:countryName"
            element={
              <CountryDetail
                allCountries={allCountries}
                savedCountries={savedCountries}
              />
            }
          />
          <Route
            path="/saved-countries"
            element={
              <SavedCountries
                allCountries={allCountries}
                savedCountries={savedCountries}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
