// import React, { useState, useEffect } from "react";
// import items from "./data.json";
// import hoodieImage from "./myotherimages/drakehoodie.png";
// import tshirtImage from "./myotherimages/clbtshirt.png";
// import capImage from "./myotherimages/owldrakecap.png";
// import "./Shop.css";


// const itemsArray = Object.values(items).map((item, index) => ({
//     ...item,
//     id: index + 1 ,
//     image:  item.image === "./myotherimages/drakehoodie.png" ? hoodieImage :
//             item.image === "./myotherimages/clbtshirt.png" ? tshirtImage :
//             item.image === "./myotherimages/owldrakecap.png" ? capImage : null
//   }));
// const Shop = () => {
// const [cart, setCart] = useState([]);
// const [query, setQuery] = useState('');
// const [cartTotal, setCartTotal] = useState(0);
// const listItems = itemsArray.map((el) => (
//     <div key={el.id}>
//     <img className="img-fluid" src={el.image} />
//     {el.name}
//     {el.description}
//     ${el.price}
//     <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
//     <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
//     </div>
//     ));

// useEffect(() => {
//       total();
// }, [cart]);
// const total = () => {
//         let totalVal = 0;
//         for (let i = 0; i < cart.length; i++) {
//         totalVal += cart[i].price;
//         }
//         setCartTotal(totalVal);
//         };
// // const addToCart = (el) => {
// //     setCart([...cart, el ]);
// //     };

//     const addToCart = (el) => {
//         setCart([...cart, { ...el, image: el.image }]);
//       };

// const removeFromCart = (el) => {
// let itemFound = false;
//          const updatedCart = cart.filter((cartItem) => {
//         if (cartItem.id === el.id && !itemFound) {
//         itemFound = true;
//         return false;
//          }
//     return true;
//      });
//      if (itemFound) {
//     setCart(updatedCart);
//     }
//     };

// const cartItems = cart.map((el) => (
//             <div key={el.id}>
//             <img class="img-fluid" src= {el.image} width={30} alt={el.name} />
//             {el.title}
//             ${el.price}
//             </div>
//             ));
//             // const cartItems = cart.map((el) => (
//             //     <div key={el.id}>
//             //       {el.image && (
//             //         <img className="img-fluid" src={el.image} width={30} alt={el.name} />
//             //       )}
//             //       {el.name}
//             //       ${el.price}
//             //     </div>
//             //   ));
// const handleChange = (e) => {
//                 setQuery(e.target.value);
//                 console.log("Step 6 : in handleChange, Target Value :",e.target.value," Query Value :",query);
//                 const results = [...cart].filter(eachProduct => {
//                 if (e.target.value === "") return [...cart];
//                 return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
//                 });
//                 setCart(results);
//                 }               
// return (
// <div>
// <div className="py-10">
// <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
// focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
// dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
// dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search" value={query} onChange={handleChange} />
// </div>
// <div> {listItems} </div>
// <div>Items in Cart :</div>
// <div>{cartItems}</div>
// <div>Order total to pay :{cartTotal}</div>

// </div>
// );

// }
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
    const results = [...cart].filter((eachProduct) => {
      if (e.target.value === "") return [...cart];
      return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setCart(results);
  };

  return (
    <div>
      <div className="search-box">
        <input
          className="search-input"
          type="search"
          placeholder="Search items"
          value={query}
          onChange={handleChange} />
          </div>
<div className="item-list">
{listItems}
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






