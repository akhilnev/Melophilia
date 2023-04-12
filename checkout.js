const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const encodedData = urlParams.get('data');
const data = JSON.parse(decodeURIComponent(encodedData));

const cart = JSON.parse(localStorage.getItem('cart')) || {};

// Calculate the total price of all items in the cart
let totalPrice = 0;
for (const itemId in cart) {
    const item = data[itemId];
    totalPrice += item.price * cart[itemId];
  }
// for (const itemId in cart) {
//   const quantity = cart[itemId];
//   const item = data[itemId];
//   totalPrice += item.price * quantity;
//   item.quantity = quantity;
// }

// Display the cart items and total price on the page
const cartContainer = document.getElementById('cart-container');
for (const itemId in cart) {
  const item = data[itemId];
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('cart-item-container');

  const itemName = document.createElement('span');
  itemName.innerText = item.name;
  itemName.classList.add('cart-item-name');
  itemContainer.appendChild(itemName);

//   const itemPrice = document.createElement('span');
//   itemPrice.innerText = `$${item.price * item.quantity}`;
//   itemPrice.classList.add('cart-item-price');
//   itemContainer.appendChild(itemPrice);

const itemPrice = document.createElement('span');
itemPrice.innerText = `$${item.price * item.quantity}`;
itemPrice.classList.add('cart-item-price');
itemContainer.appendChild(itemPrice);

  cartContainer.appendChild(itemContainer);
}

const totalContainer = document.createElement('div');
totalContainer.classList.add('cart-total-container');

const totalText = document.createElement('span');
totalText.innerText = 'Total: ';
totalText.classList.add('cart-total-text');
totalContainer.appendChild(totalText);

const totalPriceElement = document.createElement('span');
totalPriceElement.innerText = `$${totalPrice}`;
totalPriceElement.classList.add('cart-total-price');
totalContainer.appendChild(totalPriceElement);

cartContainer.appendChild(totalContainer);