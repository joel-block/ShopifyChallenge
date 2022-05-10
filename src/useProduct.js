import { useContext } from "react";
import ProductContext from "./ProductContext";

const useProduct = () => {
  const { products, setProducts, warehouses, setWarehouses } =
    useContext(ProductContext);

  return {
    products,
    setProducts,
    warehouses,
    setWarehouses,
  };
};

export default useProduct;
