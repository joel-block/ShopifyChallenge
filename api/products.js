const express = require("express");
const productsRouter = express.Router();
const { Products } = require("../db");

// Route that sends back product information from every product.
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Products.getProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  const { name, description, price } = req.body;
  if (!name || !price) {
    next({
      name: "RequiredFields",
      message: "Products must at least have a name and price.",
    });
  } else {
    try {
      const product = await Products.createProduct({
        name,
        description,
        price,
      });
      
      res.send({ message: "Successfully added product!", product });
    } catch (error) {
      next(error);
    }
  }
});

productsRouter.patch("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price } = req.body;

  // build update object
  const updateObj = { id: productId };
  if (name) {
    updateObj.name = name;
  }
  if (description) {
    updateObj.description = description;
  }
  if (typeof price === "number") {
    updateObj.price = price;
  }

  try {
    const product = await Products.updateProduct(updateObj);

    res.send({ message: "Successfully updated product!", product });
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Products.deleteProduct(productId);

    res.send({
      message: "Product successfully deleted from the database.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
