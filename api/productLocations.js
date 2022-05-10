const express = require("express");
const productLocationsRouter = express.Router();
const { ProductLocations } = require("../db");

productLocationsRouter.post("/", async (req, res, next) => {
  const { productId, locationId, quantity } = req.body;
  try {
    const productLocation = await ProductLocations.addInventoryToWarehouse({
      productId,
      locationId,
      quantity,
    });
    if (productLocation.id) {
      res.send({
        message: "Successfully added inventory to warehouse!",
        productLocation,
      });
    } else {
      next({
        name: "AddQuantityError",
        message: "Problem adding quantity of product to warehouse.",
      });
    }
  } catch (error) {
    next(error);
  }
});

productLocationsRouter.patch("/:productLocationId", async (req, res, next) => {
  const { productLocationId } = req.params;
  const { locationId, quantity } = req.body;
  let updateObj = { id: productLocationId, locationId, quantity };

  try {
    const productLocation = await ProductLocations.updateQuantityInWarehouse(
      updateObj
    );
    if (productLocation.id) {
      res.send({
        message: "Successfully edited quantity in warehouse!",
        productLocation,
      });
    } else {
      next({
        name: "UpdateQuantityError",
        message: "Problem editing quantity of product in warehouse.",
      });
    }
  } catch (error) {
    next(error);
  }
});

productLocationsRouter.delete("/:productLocationId", async (req, res, next) => {
  const { productLocationId } = req.params;
  try {
    const productLocation = await ProductLocations.deleteProductFromWarehouse(
      productLocationId
    );
    if (productLocation.id) {
      res.send({
        message: "Product successfully deleted from warehouse.",
        productLocation,
      });
    } else {
      next({
        name: "ProductLocationError",
        message: "An error occurred deleting product from warehouse.",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = productLocationsRouter;
