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
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const data = {};
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    Object.assign(data, jsonData);
    let cart = {};

 

    // function updateCart(item, quantity) {
    //   if (quantity === 0) {
    //     delete cart[item];
    //   } else {
    //     cart[item] = { quantity, price: data[item].price };
    //   }
    //   localStorage.setItem('cart', JSON.stringify(cart));
    // }
    
    loadCart();
       function updateCart(item, quantity) {
      if (quantity === 0) {
        delete cart[item];
      } else {
        cart[item] = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    // function updateCart(item, quantity) {
    //   if (quantity === 0) {
    //     delete cart[item];
    //   } else {
    //     cart[item] = { quantity, price: data[item].price };
    //   }
    //   localStorage.setItem('cart', JSON.stringify(cart));
    // }

    function loadCart() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
    }

    

    for (const item in data) {
      const product = data[item];

      // Create HTML elements to display product info
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
      productPrice.innerText = `$${product.price}`;
      productPrice.classList.add('product-price');

      const productSize = document.createElement('select');
      for (const size of product.size) {
        const option = document.createElement('option');
        option.value = size;
        option.text = size;
        productSize.appendChild(option);
      }

      const quantityLabel = document.createElement('label');
      quantityLabel.innerText = 'Quantity: ';

      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.min = 0;
      quantityInput.value = cart[item] || 0;

      quantityInput.addEventListener('change', event => {
        updateCart(item, event.target.valueAsNumber);
      });

      const addToCartButton = document.createElement('button');
      addToCartButton.innerText = 'Add to Cart';

      addToCartButton.addEventListener('click', () => {
        updateCart(item, (cart[item] || 0) + quantityInput.valueAsNumber);
      });

      const productContainer = document.createElement('div');
      productContainer.classList.add('product-container');
      productContainer.appendChild(productName);
      productContainer.appendChild(productDescription);
      productContainer.appendChild(productImage);
      productContainer.appendChild(productPrice);
      productContainer.appendChild(productSize);
      productContainer.appendChild(quantityLabel);
      productContainer.appendChild(quantityInput);
      productContainer.appendChild(addToCartButton);

      document.body.appendChild(productContainer);
    }

    // Create checkout button
    const checkoutButton = document.createElement('button');
    checkoutButton.innerText = 'Checkout';
    checkoutButton.addEventListener('click', function() {
      const encodedData = encodeURIComponent(JSON.stringify(data));
      window.location.href = `checkout.html?data=${encodedData}`;
    });

    // Append button to page
    document.body.appendChild(checkoutButton);
  })
  .catch(error => {
    console.error(error);
  });


 