import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateProduct } from "../AJAXFunctions";
import useProduct from "../useProduct";

const UpdateProduct = ({ product, setClickedUpdate }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const { products, setProducts } = useProduct();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(product.id, {
        name,
        description,
        price: +price,
      });
      if (updatedProduct.message === "Successfully updated product!") {
        let updatedProducts = products.map((product) => {
          if (product.id === updatedProduct.product.id) {
            product.name = updatedProduct.product.name;
            product.description = updatedProduct.product.description;
            product.price = updatedProduct.product.price;
            return product;
          } else {
            return product;
          }
        });
        setProducts(updatedProducts);
        toast(updatedProduct.message);
        setClickedUpdate(false);
      } else {
        toast.error(updatedProduct.message);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Price in cents"
        min="1"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <button type="submit">Update Product</button>
      <button onClick={() => setClickedUpdate(false)}>Cancel</button>
    </form>
  );
};

export default UpdateProduct;
