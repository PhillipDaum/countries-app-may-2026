// --------------------------------------------------
// Boilerplate code
// --------------------------------------------------

import express from "express"; //external module for using express
import pg from "pg";
// import cors from "cors"; //external module for preventing CORS errors

// db stands for database
// this code connects our server to our PostgreSQL database
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL, // + "&uselibpqcompat=true",
  ssl: true, // use SSL encryption when connecting to the database
});

const app = express();
const port = 3000;

app.use(express.json());
// app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// ----------------------------------------------
// Get Newest User
// ----------------------------------------------

async function getNewestUser() {
  let result = await db.query(
    `SELECT * FROM users ORDER BY user_id DESC LIMIT 1`,
  );
  return result.rows;
}

app.get("/get-newest-user", async (req, res) => {
  try {
    let user = await getNewestUser();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting newest user.");
  }
});

// --------------------------------------------------
// Get All Users
// --------------------------------------------------

async function getAllUsers() {
  let result = await db.query(`SELECT * FROM users ORDER BY user_id`);
  return result.rows;
}

app.get("/get-all-users", async (req, res) => {
  try {
    let users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting all users.");
  }
});

// ----------------------------------------------
// Add User
// ----------------------------------------------

async function addOneUser(obj) {
  // insert the data into the database
  await db.query(
    `INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4);`,
    [obj.name, obj.country_name, obj.email, obj.bio],
  );
}

app.post("/add-one-user", async (req, res) => {
  const { name, country_name, email, bio } = req.body;

  // Check for missing or empty fields
  if (!name || !country_name || !email || !bio) {
    return res
      .status(400)
      .send("All fields (name, country_name, email, bio) are required.");
  }

  try {
    await addOneUser(req.body);
    res.send("Success! User has been added.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user.");
  }
});

// --------------------------------------------------
// Update One Country Count
// --------------------------------------------------

async function updateOneCountryCount(obj) {
  const result = await db.query(
    `INSERT INTO country_counts (country_name, count) 
    VALUES ($1, '1')
    ON CONFLICT (country_name) 
    DO UPDATE SET count = country_counts.count + 1
    RETURNING count`,
    [obj.country_name],
  );
  return result.rows[0];
}

app.post("/update-one-country-count", async (req, res) => {
  try {
    const newCount = await updateOneCountryCount(req.body);
    res.json(newCount);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating country count.");
  }
});

// --------------------------------------------------
// Get All Saved Countries
// --------------------------------------------------

async function getAllSavedCountries() {
  let result = await db.query(`SELECT country_name FROM saved_countries`);
  return result.rows;
}

app.get("/get-all-saved-countries", async (req, res) => {
  try {
    let savedCountries = await getAllSavedCountries();
    res.json(savedCountries);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting all saved countries.");
  }
});

// --------------------------------------------------
// Save One Country
// --------------------------------------------------

async function saveOneCountry(obj) {
  // check if the country name is a non-empty string
  if (typeof obj.country_name !== "string" || obj.country_name.trim() === "")
    return;

  // insert into DB
  await db.query(
    `INSERT INTO saved_countries (country_name) 
      VALUES ($1)
      ON CONFLICT (country_name)
      DO NOTHING;`,
    [obj.country_name],
  );
}

app.post("/save-one-country", async (req, res) => {
  try {
    await saveOneCountry(req.body);
    res.send(`Success! The country is saved. }`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the country.");
  }
});

// --------------------------------------------------
// Un-Save One Country
// --------------------------------------------------

async function unsaveOneCountry(obj) {
  // check if the country has already been saved
  let countryMatches = await db.query(
    `SELECT * FROM saved_countries
WHERE country_name = '${obj.country_name}'`,
  );
  let countrySaved = countryMatches.rows.length > 0;

  // if the country has not been saved before, save it
  if (countrySaved) {
    // remove the country from saved countries
    await db.query(`DELETE FROM saved_countries
WHERE country_name = '${obj.country_name}';
`);
  }
}

app.post("/unsave-one-country", async (req, res) => {
  try {
    await unsaveOneCountry(req.body);
    res.send("Success! The country is unsaved. }");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error unsaving the country.");
  }
});
