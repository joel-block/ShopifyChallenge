import React, { useState } from "react";
import { SingleLocation } from "../locations";
import { UpdateProduct, AddQuantity, DeleteProduct } from "./";
import { useProduct } from "../../context";

const SingleProduct = ({ product }) => {
  const [clickedUpdate, setClickedUpdate] = useState(false);
  const [clickedAdd, setClickedAdd] = useState(false);
  const { warehouses } = useProduct();

  return (
    <span className="single-product">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <h4>
        Price:{" "}
        {(product.price / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </h4>
      {clickedUpdate ? (
        <UpdateProduct product={product} setClickedUpdate={setClickedUpdate} />
      ) : (
        <button onClick={() => setClickedUpdate(!clickedUpdate)}>
          Update Product Info
        </button>
      )}
      <DeleteProduct product={product} />
      <br />
      <small>{product.totalInventory} left in stock.</small>
      <br />
      {product.locations.length === warehouses.length ? (
        <p>All warehouses have stock.</p>
      ) : (
        <>
          {clickedAdd ? (
            <AddQuantity product={product} setClickedAdd={setClickedAdd} />
          ) : (
            <button onClick={() => setClickedAdd(!clickedAdd)}>
              Add Stock
            </button>
          )}
        </>
      )}
      {product.totalInventory ? (
        <ul>
          {product.locations.map((warehouse, idx) => {
            return (
              <SingleLocation
                key={`${product.name}-location[${idx}]`}
                warehouse={warehouse}
              />
            );
          })}
        </ul>
      ) : null}
    </span>
  );
};

export default SingleProduct;
