import React from "react";
import { useProduct } from "../../context";
import { deleteProduct } from "../../AJAXFunctions";
import { toast } from "react-toastify";

const DeleteProduct = ({ product }) => {
  const { products, setProducts } = useProduct();

  async function handleClick() {
    try {
      const deleted = await deleteProduct(product.id);
      if (
        deleted.message === "Product successfully deleted from the database."
      ) {
        const filteredProducts = products.filter((item) => {
          return item.id !== deleted.product.id;
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

  return <button onClick={handleClick}>Delete Product</button>;
};

export default DeleteProduct;
