import { displayMessage } from "./ui/displayMessage.js";
import { getExistingCart } from "./utils/cartFunctions.js";

const cart = getExistingCart();
const container = document.querySelector(".column");
const cartTotal = document.querySelector(".cart-total");
let totalPrice = null;
console.log(cart);

if (!cart.length) {
  console.log("empty this is");
  displayMessage("warning", "Empty cart", ".column");
}

async function productCart() {
  try {
    cart.forEach((cartProduct) => {
      container.innerHTML += `
   <div class="row row-cols-4 cart">
     <div class="col image"><img
     src="${cartProduct.image}"
     class="img-fluid"
     alt="Responsive image"/></div>
     <a href="details.html?id=${cartProduct.id}"><div class="col"><p class="font-weight-bold">${cartProduct.title}</p></div></a>
     <div class="col"></div>
     <div class="col"><p class="strong">${cartProduct.price} $</div>
     </div>
     
     `;

      totalPrice = totalPrice + parseFloat(cartProduct.price);

      cartTotal.innerHTML = `
      <hr class="my-4" />
      <p class="lead">Total ${totalPrice} $</p>
      <div class="checkout">
      <button class="btn btn-primary" type="submit">Check out</button>

    </div>
     `;
    });
  } catch (error) {
    displayMessage("error", error, ".column");
  }
}

productCart();
