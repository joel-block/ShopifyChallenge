import { config } from "./Constants";
const API_URL = config.url;

// These functions help us communicate between the frontend and backend.
// The order of functions is broken down in groups of components.
// 1. Products
// 2. Warehouses
// 3. ProductLocations

// ******** PRODUCTS ********/

export async function fetchAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addNewProduct({ name, description, price }) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(productId, updateObj) {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObj),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// ******** WAREHOUSES ********/

export async function fetchWarehouses() {
  try {
    const response = await fetch(`${API_URL}/warehouses`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addWarehouse({ name }) {
  try {
    const response = await fetch(`${API_URL}/warehouses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// ******** PRODUCT_LOCATIONS ******** /

export async function updateProductQuantity(id, updateObj) {
  try {
    const response = await fetch(`${API_URL}/product_locations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateObj),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addProductQuantity({ productId, locationId, quantity }) {
  try {
    const response = await fetch(`${API_URL}/product_locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, locationId, quantity }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeProductLocation(productLocationId) {
  try {
    const response = await fetch(
      `${API_URL}/product_locations/${productLocationId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
