// fetch('data.json')
//   .then(response => response.json())
//   .then(data => {
//     for (const item in data) {
//       const product = data[item];
//       // Create HTML elements to display product info
//       const productName = document.createElement('h3');
//       productName.innerText = product.name;
//       productName.classList.add('product-name');

//       const productDescription = document.createElement('p');
//       productDescription.innerText = product.description;
//       productDescription.classList.add('product-description');

//       const productImage = document.createElement('img');
//       productImage.src = product.image;
//       productImage.alt = product.name;
//       productImage.classList.add('product-image');

//       const productPrice = document.createElement('p');
//       productPrice.innerText = `$${product.price}`;
//       productPrice.classList.add('product-price');

//       // Append product elements to a container element
//       const productContainer = document.createElement('div');
//       productContainer.classList.add('product-container');
//       productContainer.appendChild(productName);
//       productContainer.appendChild(productDescription);
//       productContainer.appendChild(productImage);
//       productContainer.appendChild(productPrice);

//       // Add the product container to the page
//       document.body.appendChild(productContainer);
//     }
//   });

  //---------------//
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const data = {};
// fetch('data.json')
//   .then(response => response.json())
//   .then(jsonData => {
//     Object.assign(data, jsonData);
//     let cart = {};

 

//     // function updateCart(item, quantity) {
//     //   if (quantity === 0) {
//     //     delete cart[item];
//     //   } else {
//     //     cart[item] = { quantity, price: data[item].price };
//     //   }
//     //   localStorage.setItem('cart', JSON.stringify(cart));
//     // }
    
//     loadCart();
//        function updateCart(item, quantity) {
//       if (quantity === 0) {
//         delete cart[item];
//       } else {
//         cart[item] = quantity;
//       }
//       localStorage.setItem('cart', JSON.stringify(cart));
//     }
//     // function updateCart(item, quantity) {
//     //   if (quantity === 0) {
//     //     delete cart[item];
//     //   } else {
//     //     cart[item] = { quantity, price: data[item].price };
//     //   }
//     //   localStorage.setItem('cart', JSON.stringify(cart));
//     // }

//     function loadCart() {
//       const savedCart = localStorage.getItem('cart');
//       if (savedCart) {
//         cart = JSON.parse(savedCart);
//       }
//     }

    

//     for (const item in data) {
//       const product = data[item];

//       // Create HTML elements to display product info
//       const productName = document.createElement('h3');
//       productName.innerText = product.name;
//       productName.classList.add('product-name');

//       const productDescription = document.createElement('p');
//       productDescription.innerText = product.description;
//       productDescription.classList.add('product-description');

//       const productImage = document.createElement('img');
//       productImage.src = product.image;
//       productImage.alt = product.name;
//       productImage.classList.add('product-image');

//       const productPrice = document.createElement('p');
//       productPrice.innerText = `$${product.price}`;
//       productPrice.classList.add('product-price');

//       const productSize = document.createElement('select');
//       for (const size of product.size) {
//         const option = document.createElement('option');
//         option.value = size;
//         option.text = size;
//         productSize.appendChild(option);
//       }

//       const quantityLabel = document.createElement('label');
//       quantityLabel.innerText = 'Quantity: ';

//       const quantityInput = document.createElement('input');
//       quantityInput.type = 'number';
//       quantityInput.min = 0;
//       quantityInput.value = cart[item] || 0;

//       quantityInput.addEventListener('change', event => {
//         updateCart(item, event.target.valueAsNumber);
//       });

//       const addToCartButton = document.createElement('button');
//       addToCartButton.innerText = 'Add to Cart';

//       addToCartButton.addEventListener('click', () => {
//         updateCart(item, (cart[item] || 0) + quantityInput.valueAsNumber);
//       });

//       const productContainer = document.createElement('div');
//       productContainer.classList.add('product-container');
//       productContainer.appendChild(productName);
//       productContainer.appendChild(productDescription);
//       productContainer.appendChild(productImage);
//       productContainer.appendChild(productPrice);
//       productContainer.appendChild(productSize);
//       productContainer.appendChild(quantityLabel);
//       productContainer.appendChild(quantityInput);
//       productContainer.appendChild(addToCartButton);

//       document.body.appendChild(productContainer);
//     }

//     // Create checkout button
//     const checkoutButton = document.createElement('button');
//     checkoutButton.innerText = 'Checkout';
//     checkoutButton.addEventListener('click', function() {
//       const encodedData = encodeURIComponent(JSON.stringify(data));
//       window.location.href = `checkout.html?data=${encodedData}`;
//     });

//     // Append button to page
//     document.body.appendChild(checkoutButton);
//   })
//   .catch(error => {
//     console.error(error);
//   });

//----------

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
}

const cart = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    for (const item in data) {
      const product = data[item];

      // Create HTML elements to display the product info
      const productName = document.createElement('h3');
      productName.innerText = product.name;
      productName.classList.add('product-name');

      const productDescription = document.createElement('p');
      productDescription.innerText = product.description;
      productDescription.classList.add('product-description');

      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.name;
      productImage.classList.add('product-image');

      const productPrice = document.createElement('p');
      productPrice.innerText = `$${product.price.toFixed(2)}`;
      productPrice.classList.add('product-price');

      const addToCartButton = document.createElement('button');
      addToCartButton.innerText = 'Add to cart';
      addToCartButton.addEventListener('click', () => addToCart(product));

      // Append product elements to a container element
      const productContainer = document.createElement('div');
      productContainer.classList.add('product-container');
      productContainer.appendChild(productName);
      productContainer.appendChild(productDescription);
      productContainer.appendChild(productImage);
      productContainer.appendChild(productPrice);
      productContainer.appendChild(addToCartButton);

      // Add the product container to the page
      document.body.appendChild(productContainer);
    }
  });

  function addToCart(product) {
    // Check if the item is already in the cart
    const itemIndex = cart.findIndex(item => item.product.name === product.name);
    
    if (itemIndex >= 0) {
      // If the item is already in the cart, increase the quantity by 1
      cart[itemIndex].quantity++;
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const cartItem = new CartItem(product, 1);
      cart.push(cartItem);
    }
    
    // Update the cart in local storage and on the page
    updateCart();
  }

function removeFromCart(product) {
  // Find the index of the item in the cart
  const itemIndex = cart.findIndex(item => item.product.name === product.name);

  if (itemIndex >= 0) {
    // Remove the item from the cart if the quantity is 1, otherwise decrease the quantity
    if (cart[itemIndex].quantity === 1) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity--;
    }

    // Update the cart display
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cartElement = document.getElementById('cart');
  cartElement.innerHTML = '';

  for (const item of cart) {
    const itemName = document.createElement('span');
    itemName.innerText = item.product.name;

    const itemPrice = document.createElement('span');
    itemPrice.innerText = `$${(item.product.price * item.quantity).toFixed(2)}`;

    const itemQuantity = document.createElement('span');
    itemQuantity.innerText = `x${item.quantity}`;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', () => removeFromCart(item.product));

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.appendChild(itemName);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(itemQuantity);
    cartItem.appendChild(removeButton);

    cartElement.appendChild(cartItem);
  }
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

function showCart() {
  // Get the cart element
  var cartElement = document.getElementById("cart");

  // Swap the contents of the cart element with the checkout form
  cartElement.innerHTML = `
    <h2>Checkout</h2>
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br><br>
      <button type="submit">Place Order</button>
    </form>
  `;
}




 