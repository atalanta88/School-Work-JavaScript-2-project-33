import { baseUrl } from "./api/baseUrl.js";
import { displayMessage } from "./ui/displayMessage.js";
import { getExistingCart } from "./utils/cartFunctions.js";
import createMenu from "./ui/createMenu.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./ui/products/deleteButton.js";
import { getUserName } from "./utils/storage.js";

const username = getUserName();
if (!username) {
  document.location.href = "/";
}
console.log(username);

createMenu();

/*const favourites = getExistingCart();*/
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + "products/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const imageUrl = document.querySelector("#image-url");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const featuredInput = document.querySelector("#featured");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    title.value = details.title;
    price.value = details.price;
    imageUrl.value = details.image_url;
    description.value = details.description;
    idInput.value = details.id;
    featuredInput.value = details.featured;

    deleteButton(details.id);

    console.log(details.featured);

    console.log(details);
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", sumbitForm);

function sumbitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const imageUrlValue = imageUrl.value.trim();
  const descriptionValue = description.value.trim();
  const idValue = idInput.value;
  const featuredValue = featuredInput.value.trim();

  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    imageUrlValue.length === 0 ||
    featuredValue.length === 0 ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".message-container"
    );
  }
  updateProduct(
    titleValue,
    priceValue,
    descriptionValue,
    imageUrlValue,
    idValue,
    featuredValue
  );
}

async function updateProduct(
  title,
  price,
  description,
  imageUrl,
  id,
  featured
) {
  const url = baseUrl + "products/" + id;

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    image_url: imageUrl,
    id: id,
    featured: featured,
  });
  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.updated_at) {
      displayMessage("success", "Product updated", ".message-container");
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
