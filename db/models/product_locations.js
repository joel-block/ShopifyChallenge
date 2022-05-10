const client = require("../client");

async function addInventoryToWarehouse({ productId, locationId, quantity }) {
  try {
    const {
      rows: [product_location],
    } = await client.query(
      `INSERT INTO product_locations ("productId", "locationId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [productId, locationId, quantity]
    );

    const {
      rows: [productLocation],
    } = await client.query(
      `SELECT product_locations.*,
          locations.name AS "warehouseName"
        FROM product_locations
        LEFT JOIN locations
        ON product_locations."locationId"=locations.id
        WHERE product_locations.id=$1;
      `,
      [product_location.id]
    );
    return productLocation;
  } catch (error) {
    console.error("Problem adding product inventory to warehouse...", error);
  }
}

async function updateQuantityInWarehouse(fields = {}) {
  const { id } = fields;
  delete fields.id;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 2}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    await client.query(
      `
        UPDATE product_locations
        SET ${setString}
        WHERE id=$1;`,
      [id, ...Object.values(fields)]
    );

    const {
      rows: [productLocation],
    } = await client.query(
      `SELECT product_locations.*,
          locations.name AS "warehouseName"
        FROM product_locations
        LEFT JOIN locations
        ON product_locations."locationId"=locations.id
        WHERE product_locations.id=$1;
      `,
      [id]
    );
    return productLocation;
  } catch (error) {
    console.error("Problem updating product inventory in warehouse...", error);
  }
}

async function deleteProductFromWarehouse(id) {
  try {
    const {
      rows: [productLocation],
    } = await client.query(
      `
      DELETE FROM product_locations
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    return productLocation;
  } catch (error) {
    console.error("Problem deleting product location in database...", error);
  }
}

module.exports = {
  addInventoryToWarehouse,
  updateQuantityInWarehouse,
  deleteProductFromWarehouse,
};
