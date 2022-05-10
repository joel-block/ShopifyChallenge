import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { App } from "./components";
import ProductProvider from "./ProductProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Router>
    <ProductProvider>
      <App />
    </ProductProvider>
  </Router>
);
