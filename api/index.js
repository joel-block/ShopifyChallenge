const apiRouter = require("express").Router();

const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

const warehousesRouter = require("./warehouses");
apiRouter.use("/warehouses", warehousesRouter);

const productLocationsRouter = require("./productLocations");
apiRouter.use("/product_locations", productLocationsRouter);

module.exports = apiRouter;
