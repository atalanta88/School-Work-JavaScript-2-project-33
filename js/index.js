import { displayMessage } from "./ui/displayMessage.js";
import { baseUrl } from "./api/baseUrl.js";

const homeUrl = baseUrl + "home";
const pictureUrl = "http://localhost:1337";

async function getHero() {
  try {
    const response = await fetch(homeUrl);
    const json = await response.json();

    const container = document.querySelector(".hero-container");

    container.innerHTML = `
    
   <div class="col image">
   <div class="container">
   <h1>Heroic sunglasses</h1>
<p class="lead">
   You are the hero of your own story.
   </p>
   </div>

   <img src="${pictureUrl}${json.hero_banner.url}"
    class="img-fluid details"
    alt="Responsive image"/>
    
   </div>
   `;

    //console.log(details);
  } catch (error) {
    displayMessage("error", error, ".message-container");
  }
}
getHero();

async function showFeatured() {
  const container = document.querySelector(".row");
  const productsUrl = baseUrl + "products";

  try {
    const response = await fetch(productsUrl);
    const json = await response.json();

    container.innerHTML = "";

    json.forEach(function (product) {
      if (product.featured === true) {
        container.innerHTML += `<div class="col  mb-4">
        <a class="product" href="details.html?id=${product.id}">
         <div class="card h-100">
           <img src="${product.image_url}" class="card-img-top" alt="..." />
           <div class="card-body">
             <h3 class="card-title">${product.title}</h3>
             <p class="card-text">${product.description}</p>
             <p class="lead">${product.price} $</p>
             <a href="edit.html?id=${product.id}" class="btn btn-primary">Edit</a>
           </div>
         </div>
        </div>
        </a>`;
      }
      console.log(product.featured === true);
    });
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".row");
  }
}
showFeatured();
