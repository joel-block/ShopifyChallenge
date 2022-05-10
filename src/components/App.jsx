import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useProduct from "../useProduct";
import "react-toastify/dist/ReactToastify.css";
import "../style/App.css";
import { CreateProduct, SingleProduct, AddNewWarehouse } from "./";

const App = () => {
  const { products } = useProduct();
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
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
                  return (
                    <SingleProduct key={`products[${idx}]`} product={product} />
                  );
                })}
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
