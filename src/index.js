import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components";
import { ProductProvider } from "./context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <ProductProvider>
    <App />
  </ProductProvider>
);
