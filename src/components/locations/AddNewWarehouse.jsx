import React, { useState } from "react";
import { useProduct } from "../../context";
import { addWarehouse } from "../../AJAXFunctions";
import { toast } from "react-toastify";

const AddNewWarehouse = () => {
  const [name, setName] = useState("");
  const { warehouses, setWarehouses } = useProduct();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newWarehouse = await addWarehouse({ name });
      if (newWarehouse.message === "Successfully added warehouse location!") {
        setWarehouses([...warehouses, newWarehouse.warehouse]);
        toast(newWarehouse.message);
        setName("");
      } else {
        toast.error(newWarehouse.message);
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
      <button type="submit">Add Warehouse</button>
    </form>
  );
};

export default AddNewWarehouse;
