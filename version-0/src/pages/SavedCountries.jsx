export default function SavedCountries() {
  return (
    <>
      <h2>My Saved Countries</h2>
      <form>
        <fieldset>
          <legend>My Profile</legend>

          <label htmlFor="fullname" className="visually-hidden">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
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
            placeholder="Country"
          />

          <label htmlFor="bio" className="visually-hidden">
            Bio
          </label>
          <textarea
            name="bio"
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
