import React, { useState } from "react";
import { useProduct } from "../../context";
import { addProductQuantity } from "../../AJAXFunctions";
import { toast } from "react-toastify";

const AddQuantity = ({ product, setClickedAdd }) => {
  const { products, setProducts, warehouses } = useProduct();

  const productWarehouses = new Set(
    product.locations.map((location) => {
      return location.warehouseId;
    })
  );

  const filteredWarehouses = warehouses.filter((warehouse) => {
    return !productWarehouses.has(warehouse.id);
  });

  const [locationId, setLocationId] = useState(filteredWarehouses[0].id);
  const [quantity, setQuantity] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newStock = await addProductQuantity({
        productId: +product.id,
        locationId: +locationId,
        quantity: +quantity,
      });
      if (newStock.message === "Successfully added inventory to warehouse!") {
        let updatedProducts = products.map((item) => {
          if (item.id === newStock.productLocation.productId) {
            item.totalInventory =
              +item.totalInventory + +newStock.productLocation.quantity;
            item.locations.push({
              productLocationId: newStock.productLocation.id,
              warehouseId: newStock.productLocation.locationId,
              warehouseName: newStock.productLocation.warehouseName,
              quantity: newStock.productLocation.quantity,
              productId: newStock.productLocation.productId,
            });
            return item;
          } else {
            return item;
          }
        });
        setProducts(updatedProducts);
        toast(newStock.message);
        setClickedAdd(false);
      } else {
        toast.error(newStock.message);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="warehouse"
        value={locationId}
        onChange={(e) => {
          setLocationId(e.target.value);
        }}
      >
        {filteredWarehouses.map((location, idx) => {
          return (
            <option key={`warehouse[${idx}]`} value={location.id}>
              {location.name}
            </option>
          );
        })}
      </select>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
      <button type="submit">Add Stock</button>
      <button onClick={() => setClickedAdd(false)}>Cancel</button>
    </form>
  );
};

export default AddQuantity;
