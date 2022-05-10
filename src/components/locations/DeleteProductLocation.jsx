import React from "react";
import { toast } from "react-toastify";
import { removeProductLocation } from "../../AJAXFunctions";
import { useProduct } from "../../context";

const DeleteProductLocation = ({ warehouse }) => {
  const { products, setProducts } = useProduct();

  async function handleClick() {
    try {
      const deleted = await removeProductLocation(warehouse.productLocationId);
      if (deleted.message === "Product successfully deleted from warehouse.") {
        let filteredProducts = products.map((product) => {
          if (product.id === deleted.productLocation.productId) {
            product.totalInventory =
              +product.totalInventory - +deleted.productLocation.quantity;
            let filteredStock = product.locations.filter((location) => {
              return location.productLocationId !== deleted.productLocation.id;
            });
            product.locations = filteredStock;
            return product;
          } else {
            return product;
          }
        });
        setProducts(filteredProducts);
        toast(deleted.message);
      } else {
        toast.error(deleted.message);
      }
    } catch (error) {
      throw error;
    }
  }

  return <button onClick={handleClick}>Delete Stock</button>;
};

export default DeleteProductLocation;
