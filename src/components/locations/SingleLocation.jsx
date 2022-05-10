import React, { useState } from "react";
import { UpdateQuantity, DeleteProductLocation } from "./";

const SingleLocation = ({ warehouse }) => {
  const [clickedEdit, setClickedEdit] = useState(false);

  return (
    <>
      <li>
        {warehouse.warehouseName}: {warehouse.quantity} in stock.
      </li>
      {clickedEdit ? (
        <UpdateQuantity warehouse={warehouse} setClickedEdit={setClickedEdit} />
      ) : (
        <button onClick={() => setClickedEdit(!clickedEdit)}>Edit Stock</button>
      )}
      <DeleteProductLocation warehouse={warehouse} />
    </>
  );
};

export default SingleLocation;
