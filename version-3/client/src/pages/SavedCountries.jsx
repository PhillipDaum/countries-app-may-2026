import { useState, useEffect } from "react";
import CountryCard from "../components/CountryCard";

export default function SavedCountries({ savedCountries }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });
  const [newestUserData, setNewestUserData] = useState(null);

  // handleChange
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // store newest user
  const storeUserData = async (data) => {
    const response = await fetch("/api/add-one-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        country_name: data.country,
        email: data.email,
        bio: data.bio,
      }),
    });
    const result = await response.text();
  };

  // handleSubmit - reset form data
  const handleSubmit = (e) => {
    e.preventDefault();
    storeUserData(formData);
    setFormData({
      name: "",
      email: "",
      country: "",
      bio: "",
    });
  };

  // get newest user from API
  const getNewestUserData = async () => {
    try {
      const response = await fetch("/api/get-newest-user", {
        method: "GET",
      });
      const data = await response.json();
      const userData = data[0];
      setNewestUserData({
        fullName: userData.name,
        email: userData.email,
        country: userData.country_name,
        bio: userData.bio,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNewestUserData();
  }, []);

  return (
    <>
      {newestUserData && <h2>Welcome {newestUserData.fullName}</h2>}
      <h2>My Saved Countries</h2>
      <div className="saved-countries-container">
        {savedCountries &&
          savedCountries.map((country) => {
            return <CountryCard country={country} key={country.cca3} />;
            // getting a bug here when  is added
          })}
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>My Profile</legend>

          <label htmlFor="name" className="visually-hidden">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Full Name"
            required
          />

          <label htmlFor="email" className="visually-hidden">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            placeholder="Email"
            required
          />

          <label htmlFor="country" className="visually-hidden">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleFormChange}
            placeholder="Country"
          />

          <label htmlFor="bio" className="visually-hidden">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleFormChange}
            id="bio"
            rows="10"
            placeholder="Bio"
          ></textarea>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
