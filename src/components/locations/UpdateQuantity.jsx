import React, { useState } from "react";
import { useProduct } from "../../context";
import { updateProductQuantity } from "../../AJAXFunctions";
import { toast } from "react-toastify";

const UpdateQuantity = ({ warehouse, setClickedEdit }) => {
  const [quantity, setQuantity] = useState(warehouse.quantity);
  const { products, setProducts } = useProduct();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedProductQuantity = await updateProductQuantity(
        warehouse.productLocationId,
        { locationId: warehouse.warehouseId, quantity }
      );
      if (
        updatedProductQuantity.message ===
        "Successfully edited quantity in warehouse!"
      ) {
        const updatedProducts = products.map((product) => {
          if (product.id === updatedProductQuantity.productLocation.productId) {
            product.totalInventory =
              +product.totalInventory -
              +warehouse.quantity +
              +updatedProductQuantity.productLocation.quantity;
            let newLocations = product.locations.map((location) => {
              if (
                location.productLocationId ===
                updatedProductQuantity.productLocation.id
              ) {
                location.warehouseId =
                  updatedProductQuantity.productLocation.locationId;
                location.warehouseName =
                  updatedProductQuantity.productLocation.warehouseName;
                location.quantity =
                  updatedProductQuantity.productLocation.quantity;
                return location;
              } else {
                return location;
              }
            });
            product.locations = newLocations;
            return product;
          } else {
            return product;
          }
        });
        setProducts(updatedProducts);
        toast(updatedProductQuantity.message);
        setClickedEdit(false);
      } else {
        toast.error(updatedProductQuantity.message);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
      <button onClick={() => setClickedEdit(false)}>Cancel</button>
    </form>
  );
};

export default UpdateQuantity;
