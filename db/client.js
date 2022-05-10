// Connect to DB
const { Client } = require("pg");

const DB_NAME = "shopify-challenge";

// variable DB_URL based on node environment
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

let client = new Client(DB_URL);

module.exports = client;
