require("dotenv").config();
const path = require("path");

module.exports = {
  config: path.resolve("src/db/config/config.js"),
  "models-path": path.resolve("src/db/models"),
  "seeders-path": path.resolve("src/db/seeders"),
  "migrations-path": path.resolve("src/db/migrations"),
};
