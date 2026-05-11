import { useState } from 'react';
import CountryCard from "../components/CountryCard";

export default function Home({ allCountries }) {
  const [filters, setFilters] = useState({
    search: "",
    region: ""
  }); 
  
  const filteredCountries = allCountries.filter(country => {
    // match text search
    const matchSearch = filters.search === "" || new RegExp(filters.search, "i").test(country.name.common);

    // match region dropdown
    const matchRegion = filters.region === "" || country.region === filters.region;

    // returns those that match both conditions
    return matchSearch && matchRegion
  })

  const handleRegionChange = (e) => {
    setFilters({ ...filters, region: e.target.value})
  };
  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value})
  };
  return (
    <>
      <div className="filter-bar">
        <fieldset>
          <legend className="visually-hidden">Filter Countries</legend>
          <label htmlFor="search-country" className="visually-hidden">
            Search for a country
          </label>
          <input
            type="text"
            id="search-country"
            name="search"
            placeholder="Search for a country..."
            onChange={handleSearch}
          />
          <label htmlFor="region-filter" className="visually-hidden">
            Filter by Region
          </label>
          <select
            id="region-filter"
            name="region"
            onChange={handleRegionChange}
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Antarctic">Antarctic</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
          </select>
        </fieldset>
      </div>
      <div className="countries-grid">
        {/* better to use something other than the index like CCA3 */}
        {filteredCountries.map((country, index) => {
          return <CountryCard key={country.cca3} country={country} />;
        })}
      </div>
    </>
  );
}
