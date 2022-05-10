const { client, Products, Warehouses, ProductLocations } = require("./");

async function buildTables() {
  try {
    client.connect();

    await client.query(`
    DROP TABLE IF EXISTS product_locations;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS locations;
    
    CREATE TABLE locations(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255),
      price INTEGER NOT NULL
    );

    CREATE TABLE product_locations(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id) NOT NULL,
      "locationId" INTEGER REFERENCES locations(id) NOT NULL,
      quantity INTEGER NOT NULL,
      CONSTRAINT product_location UNIQUE ("productId", "locationId")
    );

    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  console.log("Seeding database...");
  try {
    console.log("Seeding warehouses...");
    const locationsToCreate = [
      { name: "Glendale" },
      { name: "Elmwood" },
      { name: "Covington" },
      { name: "Charlotte" },
      { name: "Seattle" },
      { name: "Riverplace" },
      { name: "Albequerque" },
      { name: "North Cairo" },
      { name: "South Cairo" },
      { name: "Bellevue" },
    ];

    const locations = await Promise.all(
      locationsToCreate.map(Warehouses.addLocation)
    );
    console.log("Seeded warehouses!");

    console.log("Seeding products...");
    const productsToCreate = [
      {
        name: "Bulbasaur",
        description:
          "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
        price: 1000,
      },
      {
        name: "Ivysaur",
        description:
          "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
        price: 1000,
      },
      {
        name: "Venusaur",
        description:
          "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
        price: 1000,
      },
      {
        name: "Charmander",
        description:
          "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
        price: 1000,
      },
      {
        name: "Charmeleon",
        description:
          "When it swings its burning tail, it elevates the temperature to unbearably high levels.",
        price: 1000,
      },
      {
        name: "Charizard",
        description:
          "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.",
        price: 1000,
      },
      {
        name: "Squirtle",
        description:
          "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.",
        price: 1000,
      },
      {
        name: "Wartortle",
        description:
          "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.",
        price: 1000,
      },
      {
        name: "Blastoise",
        description:
          "A brutal POKéMON with pressurized water jets on its shell. They are used for high speed tackles.",
        price: 1000,
      },
      {
        name: "Caterpie",
        description:
          "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.",
        price: 1000,
      },
      {
        name: "Metapod",
        description:
          "This POKéMON is vulnerable to attack while its shell is soft, exposing its weak and tender body.",
        price: 1000,
      },
      {
        name: "Butterfree",
        description:
          "In battle, it flaps its wings at high speed to release highly toxic dust into the air.",
        price: 1000,
      },
      {
        name: "Weedle",
        description:
          "Often found in forests, eating leaves. It has a sharp venomous stinger on its head.",
        price: 1000,
      },
      {
        name: "Kakuna",
        description:
          "Almost incapable of moving, this POKéMON can only harden its shell to protect itself from predators.",
        price: 1000,
      },
      {
        name: "Beedrill",
        description:
          "It has three poisonous stingers on its forelegs and its tail. They are used to jab its enemy repeatedly.",
        price: 1000,
      },
      {
        name: "Pidgey",
        description:
          "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand.",
        price: 1000,
      },
      {
        name: "Pidgeotto",
        description:
          "Very protective of its sprawling territorial area, this POKéMON will fiercely peck at any intruder.",
        price: 1000,
      },
      {
        name: "Pidgeot",
        description:
          "When hunting, it skims the surface of water at high speed to pick off unwary prey such as MAGIKARP.",
        price: 1000,
      },
      {
        name: "Rattata",
        description:
          "Bites anything when it attacks. Small and very quick, it is a common sight in many places.",
        price: 1000,
      },
      {
        name: "Raticate",
        description:
          "It uses its whiskers to maintain its balance. It apparently slows down if they are cut off.",
        price: 1000,
      },
    ];

    const products = await Promise.all(
      productsToCreate.map(Products.createProduct)
    );
    console.log("Seeded products!");

    console.log("Seeding product locations...");
    const productLocationsToCreate = [
      { productId: 1, locationId: 1, quantity: 10 },
      { productId: 1, locationId: 2, quantity: 5 },
      { productId: 2, locationId: 3, quantity: 10 },
      { productId: 3, locationId: 4, quantity: 5 },
      { productId: 4, locationId: 5, quantity: 10 },
      { productId: 5, locationId: 6, quantity: 10 },
      { productId: 6, locationId: 7, quantity: 10 },
      { productId: 7, locationId: 8, quantity: 10 },
      { productId: 8, locationId: 9, quantity: 10 },
      { productId: 9, locationId: 10, quantity: 10 },
      { productId: 10, locationId: 1, quantity: 10 },
      { productId: 11, locationId: 2, quantity: 10 },
      { productId: 12, locationId: 3, quantity: 10 },
      { productId: 13, locationId: 4, quantity: 10 },
      { productId: 14, locationId: 5, quantity: 10 },
      { productId: 15, locationId: 6, quantity: 10 },
      { productId: 16, locationId: 7, quantity: 10 },
      { productId: 17, locationId: 8, quantity: 10 },
      { productId: 18, locationId: 9, quantity: 10 },
      { productId: 19, locationId: 10, quantity: 10 },
    ];

    const productLocations = await Promise.all(
      productLocationsToCreate.map(ProductLocations.addInventoryToWarehouse)
    );
    console.log("Product locations seeded!");

    console.log("Finished seeding database!");
  } catch (error) {
    console.error("Problem seeding database...", error);
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
