// thread all models functions through db/models/index.js to then get threaded through db/index.js as objects with attached methods
module.exports = {
  Products: require("./products"),
  Warehouses: require("./warehouses"),
  ProductLocations: require("./product_locations"),
};
