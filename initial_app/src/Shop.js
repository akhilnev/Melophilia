// import React, { useState, useEffect } from "react";
// import items from "./data.json";
// import hoodieImage from "./myotherimages/drakehoodie.png";
// import tshirtImage from "./myotherimages/clbtshirt.png";
// import capImage from "./myotherimages/owldrakecap.png";
// import "./Shop.css";

// const itemsArray = Object.values(items).map((item, index) => ({
//   ...item,
//   id: index + 1,
//   image:
//     item.image === "./myotherimages/drakehoodie.png"
//       ? hoodieImage
//       : item.image === "./myotherimages/clbtshirt.png"
//       ? tshirtImage
//       : item.image === "./myotherimages/owldrakecap.png"
//       ? capImage
//       : null,
// }));

// const Shop = () => {
//   const [cart, setCart] = useState([]);
//   const [query, setQuery] = useState('');
//   const [cartTotal, setCartTotal] = useState(0);
//   const [searchResults, setSearchResults] = useState([]);

// //   const listItems = itemsArray.map((el) => (
// //     <div key={el.id} className="item">
// //       <img className="img-fluid" src={el.image} />
// //       <div className="item-info">
// //         <div className="item-name">{el.name}</div>
// //         <div className="item-description">{el.description}</div>
// //         <div className="item-price">${el.price}</div>
// //         <div className="item-actions">
// //           <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
// //           <button
// //             type="button"
// //             variant="light"
// //             onClick={() => addToCart(el)}
// //           >
// //             +
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   ));

//   const listItems = (searchResults.length > 0 ? searchResults : itemsArray).map((el) => (
//     // rest of the code remains the same
//     <div key={el.id} className="item">
//     <img className="img-fluid" src={el.image} />
//     <div className="item-info">
//       <div className="item-name">{el.name}</div>
//       <div className="item-description">{el.description}</div>
//       <div className="item-price">${el.price}</div>
//       <div className="item-actions">
//         <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
//         <button
//           type="button"
//           variant="light"
//           onClick={() => addToCart(el)}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   </div>
//   ));

//   useEffect(() => {
//     total();
//   }, [cart]);

//   const total = () => {
//     let totalVal = 0;
//     for (let i = 0; i < cart.length; i++) {
//       totalVal += cart[i].price;
//     }
//     setCartTotal(totalVal);
//   };

//   const addToCart = (el) => {
//     setCart([...cart, { ...el, image: el.image }]);
//   };

//   const removeFromCart = (el) => {
//     let itemFound = false;
//     const updatedCart = cart.filter((cartItem) => {
//       if (cartItem.id === el.id && !itemFound) {
//         itemFound = true;
//         return false;
//       }
//       return true;
//     });
//     if (itemFound) {
//       setCart(updatedCart);
//     }
//   };

//   const cartItems = cart.map((el) => (
//     <div key={el.id} className="cart-item">
//       <img
//         class="img-fluid"
//         src={el.image}
//         width={30}
//         alt={el.name}
//         className="cart-item-image"
//       />
//       <div className="cart-item-info">
//         <div className="cart-item-name">{el.title}</div>
//         <div className="cart-item-price">${el.price}</div>
//       </div>
//     </div>
//   ));

// //   const handleChange = (e) => {
// //     setQuery(e.target.value);
// //     const results = [...cart].filter((eachProduct) => {
// //       if (e.target.value === "") return [...cart];
// //       return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
// //     });
// //     setCart(results);
// //   };

// const handleChange = (e) => {
//     setQuery(e.target.value);
//     const results = itemsArray.filter((eachProduct) => {
//       if (e.target.value === "") return [];
//       return eachProduct.name.toLowerCase().includes(e.target.value.toLowerCase());
//     });
//     setSearchResults(results);
//   };

//   return (
//     <div>
//       <div className="search-box">
//         <input
//           className="search-input"
//           type="search"
//           placeholder="Search items"
//           value={query}
//           onChange={handleChange} />
//           </div>
// <div className="item-list">
// {listItems}
// </div>
// <div className="cart">
// <div className="cart-header">Items in Cart:</div>
// <div className="cart-items">{cartItems}</div>
// <div className="cart-total">Order total to pay: ${cartTotal}</div>
// </div>
// </div>
// );
// };

// export default Shop;

import React, { useState, useEffect } from "react";
import items from "./data.json";
import hoodieImage from "./myotherimages/drakehoodie.png";
import tshirtImage from "./myotherimages/clbtshirt.png";
import capImage from "./myotherimages/owldrakecap.png";
import "./Shop.css";

const itemsArray = Object.values(items).map((item, index) => ({
  ...item,
  id: index + 1,
  image:
    item.image === "./myotherimages/drakehoodie.png"
      ? hoodieImage
      : item.image === "./myotherimages/clbtshirt.png"
      ? tshirtImage
      : item.image === "./myotherimages/owldrakecap.png"
      ? capImage
      : null,
}));

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  
  const listItems = itemsArray.map((el) => (
    <div key={el.id} className="item">
      <img className="img-fluid" src={el.image} />
      <div className="item-info">
        <div className="item-name">{el.name}</div>
        <div className="item-description">{el.description}</div>
        <div className="item-price">${el.price}</div>
        <div className="item-actions">
          <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
          <button
            type="button"
            variant="light"
            onClick={() => addToCart(el)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (el) => {
    setCart([...cart, { ...el, image: el.image }]);
  };

  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
    }
  };

  const filteredItems = itemsArray.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  const cartItems = cart.map((el) => (
    <div key={el.id} className="cart-item">
      <img
        class="img-fluid"
        src={el.image}
        width={30}
        alt={el.name}
        className="cart-item-image"
      />
      <div className="cart-item-info">
        <div className="cart-item-name">{el.title}</div>
        <div className="cart-item-price">${el.price}</div>
      </div>
    </div>
  ));

  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = itemsArray.filter((item) => {
      if (e.target.value === "") return itemsArray;
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchResults(results);
  };

  return (
    <div>
    <div className="search-box">
    <input
           className="search-input"
           type="search"
           placeholder="Search items"
           value={query}
           onChange={handleChange}
         />
    </div>
<div className="item-list">
  {query === "" ? (
    listItems
  ) : (
    searchResults.map((item) => (
      <div key={item.id} className="item">
        <img className="img-fluid" src={item.image} alt={item.name} />
        <div className="item-info">
          <div className="item-name">{item.name}</div>
          <div className="item-description">{item.description}</div>
          <div className="item-price">${item.price}</div>
          <div className="item-actions">
            <button type="button" onClick={() => removeFromCart(item)}>
              -
            </button>{" "}
            <button
              type="button"
              variant="light"
              onClick={() => addToCart(item)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
    <div className="cart">
    <div className="cart-header">Items in Cart:</div>
    <div className="cart-items">{cartItems}</div>
    <div className="cart-total">Order total to pay: ${cartTotal}</div>
    </div>
    </div>
    );
    };
    
    export default Shop;







