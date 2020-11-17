import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";

const productsUrl = baseUrl + "home";
const container = document.querySelector(".jumbo-background");

(async function () {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();
    console.log(json);

    container.innerHTML = "";

    json.forEach(function (product) {
      container.innerHTML += ` 
      <img src="${product.hero_banner.url}" class="card-img-top" alt="..." />

 `;
    });
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".jumbo-background");
  }
})();
