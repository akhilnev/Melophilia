fetch('arianaInventory.json')
  .then(response => response.json())
  .then(data => {
    for (const item in data) {
      const product = data[item];
      // Create HTML elements to display product info
      const productName = document.createElement('h3');
      productName.innerText = product.name;

      const productDescription = document.createElement('p');
      productDescription.innerText = product.description;

      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.alt = product.name;

      const productPrice = document.createElement('p');
      productPrice.innerText = `$${product.price}`;

      // Append product elements to a container element
      const productContainer = document.createElement('div');
      productContainer.appendChild(productName);
      productContainer.appendChild(productDescription);
      productContainer.appendChild(productImage);
      productContainer.appendChild(productPrice);

      // Add the product container to the page
      document.body.appendChild(productContainer);
    }
  });
