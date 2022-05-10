const client = require("../client");

async function addLocation({ name }) {
  try {
    const {
      rows: [location],
    } = await client.query(
      `
        INSERT INTO locations (name)
        VALUES ($1)
        RETURNING *;
      `,
      [name]
    );
    return location;
  } catch (error) {
    console.error("Problem adding location", error);
  }
}

async function getLocations() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM locations;
    `);
    return rows;
  } catch (error) {
    console.error("Problem getting warehouse locations...", error);
  }
}

async function getLocationByName(name) {
  try {
    const {
      rows: [location],
    } = await client.query(
      `
      SELECT * FROM locations
      WHERE name=$1;
    `,
      [name]
    );
    return location;
  } catch (error) {
    console.error("Problem getting warehouse location by name...", error);
  }
}

module.exports = { addLocation, getLocations, getLocationByName };
