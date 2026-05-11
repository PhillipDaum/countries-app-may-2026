import '../App.css'

export default function CountryCard({ country }) {
    
    return (
      <div className="country-card">
        <img src={country.flags.png} alt={country.flags.alt} />
        <div className="country-card-contents">
          <h3>{country.name.common}</h3>
          <p>
            <span className="bold">Population:</span>
            {` ${country.population.toLocaleString()}`}
          </p>
          <p>
            <span className="bold">Region:</span>
            {` ${country.region}`}
          </p>
          <p>
            <span className="bold">Capital:</span>
            {` ${country.capital?.[0]}`} {/* picks the first item for that one country with two capitals */}
          </p>
        </div>
      </div>
    );
}