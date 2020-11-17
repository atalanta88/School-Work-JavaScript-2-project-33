import { showProducts } from "./ui/products/showProducts.js";
import { searchFilterProducts } from "./ui/products/searchFilterProducts.js";
import { displayMessage } from "./ui/displayMessage.js";
import { baseUrl } from "./api/baseUrl.js";

const productsUrl = baseUrl + "products";

async function getProducts() {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();

    console.log(json);

    const products = json;

    showProducts(products);
    searchFilterProducts(products);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".row");
  }
}

getProducts();
