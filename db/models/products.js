const client = require("../client");

function mapOverProducts(rows) {
  let products = {};

  for (let row of rows) {
    if (!products[row.id]) {
      products[row.id] = {
        id: row.id,
        name: row.name,
        description: row.description,
        price: row.price,
        totalInventory: row.totalInventory ? row.totalInventory : 0,
        locations: [],
      };
      if (row.productLocationId) {
        products[row.id].locations.push({
          productLocationId: row.productLocationId,
          warehouseId: row.locationId,
          warehouseName: row.locationName,
          quantity: row.quantity,
          productId: row.id,
        });
      }
    } else {
      products[row.id].locations.push({
        productLocationId: row.productLocationId,
        warehouseId: row.locationId,
        warehouseName: row.locationName,
        quantity: row.quantity,
        productId: row.id,
      });
    }
  }
  return Object.values(products);
}

async function getProducts() {
  try {
    const { rows } = await client.query(`
      SELECT products.*,
        (SELECT SUM(product_locations.quantity)
          FROM product_locations
          WHERE "productId"=products.id) AS "totalInventory",
        product_locations.id AS "productLocationId",
        locations.id AS "locationId",
        locations.name AS "locationName",
        product_locations.quantity
      FROM products
      LEFT JOIN product_locations
      ON products.id=product_locations."productId"
      LEFT JOIN locations
      ON product_locations."locationId"=locations.id
      ORDER BY products.id;
    `);

    return mapOverProducts(rows);
  } catch (error) {
    console.error("Problem getting products...", error);
  }
}

async function createProduct({ name, description, price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products (name, description, price)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [name, description, price]
    );
    product.totalInventory = 0;
    product.locations = [];

    return product;
  } catch (error) {
    console.error("Problem creating product entry...", error);
  }
}

async function updateProduct(fields = {}) {
  const { id } = fields;
  delete fields.id;

  // build update string for SQL query
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 2}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `
        UPDATE products
        SET ${setString}
        WHERE id=$1
        RETURNING *;
      `,
      [id, ...Object.values(fields)]
    );
    return product;
  } catch (error) {
    console.error("Problem updating product...", error);
  }
}

async function deleteProduct(id) {
  try {
    await client.query(
      `
      DELETE FROM product_locations
      WHERE "productId"=$1;
    `,
      [id]
    );

    const {
      rows: [product],
    } = await client.query(
      `
        DELETE FROM products
        WHERE id=$1
        RETURNING *;
    `,
      [id]
    );

    return product;
  } catch (error) {
    console.error("Problem deleting product...", error);
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
