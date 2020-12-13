import { baseUrl } from "./api/baseUrl.js";
import { displayMessage } from "./ui/displayMessage.js";
import { getExistingCart } from "./utils/cartFunctions.js";

const cartProducts = getExistingCart();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + "products/" + id;
//console.log(productUrl);

async function getDetails() {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    const doesObjectExist = cartProducts.find(function (fav) {
      console.log(fav);

      return parseInt(fav.id) === details.id;
    });

    console.log(doesObjectExist);

    document.title = details.title;

    const container = document.querySelector(".row");

    container.innerHTML = `
    
   <div class="col image"><img
    src="${details.image_url}"
    class="img-fluid details"
    alt="Responsive image"/>
   </div>
   <form>
    <div class="Item-name-price-text">
    <h1 class="display-5">${details.title}</h1>
    <p class="lead">${details.price} $</p>
    <hr class="my-4" />
    </div>
    <div class="form-group row">
    <select class="custom-select">
      <option selected>Choose your lense color</option>
      <option value="1">Blue</option>
      <option value="2">Red</option>
      <option value="3">Bronze</option>
      <option value="4">Silver</option>
      <option value="5">Gold</option>
    </select>
    <div class="col-sm-10"></div>
   </div>
   <div class="description-text">
    <h4 class="display-5">Description</h4>
    <p>${details.description}</p>
   </div>
   <a href="#" class="btn btn-primary data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-image="${details.image_url} data-featured="${details.featured}">ADD TO CART</a>
   </form>
   `;

    //console.log(details);
  } catch (error) {
    displayMessage("error", error, ".row");
  }
  const favButtons = document.querySelectorAll(".btn");

  favButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });

  function handleClick(event) {
    event.target.classList.toggle("btn-outline-success");
    event.target.classList.toggle("btn-primary");

    //const idFav = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const image = this.dataset.image;
    const featured = this.dataset.featured;

    const currentFavs = getExistingCart();

    const productExists = currentFavs.find(function (fav) {
      //console.log(fav);
      return fav.id === id;
    });

    console.log("productExists", productExists);

    if (productExists === undefined) {
      const product = {
        id: id,
        title: title,
        price: price,
        image: image,
        featured: featured,
      };

      currentFavs.push(product);

      saveFavs(currentFavs);
    } else {
      const newFavs = currentFavs.filter((fav) => fav.id !== id);
      //console.log(currentFavs);
      saveFavs(newFavs);
    }
  }
}

function saveFavs(favs) {
  localStorage.setItem("cartProducts", JSON.stringify(favs));
}

getDetails();
