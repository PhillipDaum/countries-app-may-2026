import { useParams } from "react-router-dom";

export default function CountryDetail({ allCountries }) {
    const countryName = useParams().countryName;
    console.log("countryName:", countryName)


  return (
    <>
      <h2>details</h2>
    </>
  );
}