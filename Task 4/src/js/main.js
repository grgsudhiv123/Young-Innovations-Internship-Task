import navbar from "./components/navbar.js";

const API_URL = "http://localhost:8000";

async function fetchAndRenderProducts() {
  const endpoint = `${API_URL}/products`;
  const response = await fetch(endpoint);
  const products = await response.json();
  console.log(products);
}

fetchAndRenderProducts();

navbar();
