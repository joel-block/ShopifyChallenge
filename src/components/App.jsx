import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/App.css";
import { useProduct } from "../context";
import { CreateProduct, SingleProduct } from "./products";
import { AddNewWarehouse } from "./locations";

const App = () => {
  const { products } = useProduct();
  return (
    <div className="app-container">
      <ToastContainer />
      <h1>Shopify Developer Backend Challenge</h1>
      <div className="new-product">
        <h2>Add New Product:</h2>
        <CreateProduct />
      </div>
      <div className="new-warehouse">
        <h2>Add New Warehouse:</h2>
        <AddNewWarehouse />
      </div>
      <div className="products-container">
        <h2>Products:</h2>
        {products.map((product, idx) => {
          return <SingleProduct key={`products[${idx}]`} product={product} />;
        })}
      </div>
    </div>
  );
};

export default App;
