import { baseUrl } from "./api/baseUrl.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./ui/createMenu.js";
import { getToken } from "./utils/storage.js";
import { getUserName } from "./utils/storage.js";

const username = getUserName();
if (!username) {
  document.location.href = "/";
}
console.log(username);

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const imageUrl = document.querySelector("#image-url");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const imageUrlValue = imageUrl.value.trim();
  const descriptionValue = description.value.trim();
  const featuredValue = featured.value.trim();

  console.log("priceValue", priceValue);

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
  addProduct(
    titleValue,
    priceValue,
    descriptionValue,
    imageUrlValue,
    featuredValue
  );
}

async function addProduct(title, price, description, imageUrl, featured) {
  const url = baseUrl + "products";

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    image_url: imageUrl,
    featured: featured,
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "Product created", ".message-container");
      form.reset();
    }

    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }

    console.log(json);
  } catch (error) {
    console.log(error);
    displayMessage("error", "An error occured", ".message-container");
  }
}
console.log(Object.keys(localStorage));
