import { useState, useEffect } from "react";
import { fetchAllProducts, fetchWarehouses } from "./AJAXFunctions";
import ProductContext from "./ProductContext";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function getInfo() {
      try {
        const [allProducts, allWarehouses] = await Promise.all([
          fetchAllProducts(),
          fetchWarehouses(),
        ]);
        setProducts(allProducts);
        setWarehouses(allWarehouses);
      } catch (error) {
        throw error;
      }
    }
    getInfo();
  }, [setProducts, setWarehouses]);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        warehouses,
        setWarehouses,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
