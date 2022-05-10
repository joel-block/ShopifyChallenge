const express = require("express");
const warehousesRouter = express.Router();
const { Warehouses } = require("../db");

warehousesRouter.get("/", async (req, res, next) => {
  try {
    const warehouses = await Warehouses.getLocations();
    res.send(warehouses);
  } catch (error) {
    next(error);
  }
});

warehousesRouter.post("/", async (req, res, next) => {
  const { name } = req.body;
  try {
    const _warehouse = await Warehouses.getLocationByName(name);
    if (!_warehouse) {
      const warehouse = await Warehouses.addLocation({ name });
      if (warehouse.id) {
        res.send({
          message: "Successfully added warehouse location!",
          warehouse,
        });
      } else {
        next({
          name: "WarehouseError",
          message: "Error adding new warehouse.",
        });
      }
    } else {
      next({
        name: "WarehouseNameTaken",
        message: "That warehouse name already exists.",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = warehousesRouter;
