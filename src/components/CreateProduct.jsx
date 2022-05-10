import React, { useState } from "react";
import useProduct from "../useProduct";
import { toast } from "react-toastify";
import { addNewProduct } from "../AJAXFunctions";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const { products, setProducts } = useProduct();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newProduct = await addNewProduct({ name, description, price });
      if (newProduct.message === "Successfully added product!") {
        let newProducts = [newProduct.product, ...products];
        setProducts(newProducts);
        setName("");
        setDescription("");
        setPrice(0);
        toast(newProduct.message);
      } else {
        toast.error(newProduct.message);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <label>Description:</label>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <label>Price in cents:</label>
      <input
        type="number"
        placeholder="Price in cents"
        min="1"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default CreateProduct;
