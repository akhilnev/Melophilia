import React, { useState, useEffect } from "react";
import items from "./data.json";
import hoodieImage from "./myotherimages/drakehoodie.png";
import tshirtImage from "./myotherimages/clbtshirt.png";
import capImage from "./myotherimages/owldrakecap.png";
import arianaHoodieImage from "./myotherimages/arianahoodie.png";
import arianaTshirtImage from "./myotherimages/arianatee.png";
import backpackImage from "./myotherimages/backpack.png";
import "./Shop.css";
// import "./10_3_61_script"


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
      : item.image === "./myotherimages/arianahoodie.png"
      ? arianaHoodieImage
      : item.image === "./myotherimages/arianatee.png"
      ? arianaTshirtImage
      : item.image === "./myotherimages/backpack.png"
      ? backpackImage
      : null,
}));

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const listItems = itemsArray.map((el) => (
    <div key={el.id} className="item">
      <img className="img-fluid" src={el.image} width="400" />
      <div className="item-info">
        <div className="item-name">{el.name}</div>
        <div className="item-description">{el.description}</div>
        <div className="item-price">${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}</div>
        <div className="item-price">{el.quantity}</div>
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

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
    }
  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += (cart[i].price *cart[i].quantity)  ;
    }
    totalVal+=(totalVal*0.1)
    setCartTotal(totalVal);
  };



const addToCart = (el) => {
    
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === el.id);
    if (itemIndex !== -1) {
      // Item already in cart, update quantity
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Item not in cart, add with quantity 1
      setCart([...cart, { ...el, image: el.image, quantity: 1 }]);
    }
  };





const removeFromCart = (el) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem.id === el.id);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity -= 1;
      if (updatedCart[itemIndex].quantity === 0) {
        // Remove item from cart if quantity is 0
        updatedCart.splice(itemIndex, 1);
      }
      setCart(updatedCart);
    }
  };



  const filteredItems = itemsArray.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });





const cartItems = cart.map((el) => (
    <div key={el.id} className="cart-item">
      <img
        src={el.image}
        width="3000" 
        // height = "400"
        alt={el.name}
        className="cart-item-image"
      />
      <div className="cart-item-info">
        <div className="cart-item-name">{el.title}</div>
        <div className="cart-item-price">${el.price}</div>
        <div className="cart-item-quantity">Quantity: {el.quantity}</div>
        <div className="cart-item-net-price">Net Price: ${(el.quantity * el.price).toFixed(2)}</div>
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



  const handleCheckout = () => {
    setIsCheckingOut(!isCheckingOut);
  };

// Trying to make a new form 

const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors(validate({ name, email, creditCard, zip }));
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    setErrors(validate({ name, email, creditCard, zip }));
  };

  const validate = (values) => {
    const errors = {};
    const { email, creditCard, zip } = values;

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!creditCard) {
      errors.creditCard = "Credit card number is required";
    } else if (!/^\d{16}$/.test(creditCard)) {
      errors.creditCard = "Credit card number is invalid";
    }

    if (!zip) {
      errors.zip = "Zip code is required";
    } else if (!/^\d{5}$/.test(zip)) {
      errors.zip = "Zip code is invalid";
    }

    return errors;
  };

  const shouldMarkError = (field) => {
    const hasError = errors[field];
    const shouldShow = touched[field];

    return hasError ? shouldShow : false;
  };




// im trying to add the js here

 // im trying to add the js here

// //Add your code under this line

// document.addEventListener('DOMContentLoaded', () => {

// //Add your code under this line
// const alertPlaceholder = document.getElementById('liveAlertPlaceholder') 
// console.log(alertPlaceholder);
// const form = document.getElementById('checkout-form')
// console.log(form);
// const inputCard = document.querySelector('#inputCard')
// console.log(inputCard);
// const alertTrigger = document.getElementById('submit-btn')
// console.log(alertTrigger);
// const summaryCard = document.querySelector('.card') 
// console.log(summaryCard);
// const summaryList = document.querySelector('.card > ul')
// console.log(summaryList);


// var order = { name: '',
// email: '',
// card: '' }

// const alert = (message, type) => {
//     const wrapper = document.createElement('div')
//     wrapper.innerHTML = [
//     `<div class="alert alert-${type} alert-dismissible" role="alert">`,
//     ` <div>${message}</div>`,
//     ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>', '</div>'
//     ].join('') 
//     alertPlaceholder.append(wrapper)
//     }

// function isNumeric (n) {
//         return !isNaN(parseFloat(n)) && isFinite(n)
//         }
//         inputCard.addEventListener('input', event => { 
//             if (!inputCard.value) {
//         return event.preventDefault() 
//         // stops modal from being shown 
//     } else {
//         inputCard.value = inputCard.value.replace(/-/g, '')
//         let newVal = ''
//         for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
//         if (nums != 0 && nums % 4 == 0) 
//         { 
//             newVal += '-'
//         }
//         newVal += inputCard.value[i]
//         if (isNumeric(inputCard.value[i])) {
//         nums++ }
//         }
//         inputCard.value = newVal }
//         })

// form.addEventListener('submit', event => {
//             //if (!form.checkValidity()) {
//             if (!validate()) {
//             alertPlaceholder.innerHTML = ''
//             alert('<i class="bi-exclamation-circle"></i> Something went wrong!','danger')
//             }
//             event.preventDefault()
//             event.stopPropagation()
//             //form.classList.add('was-validated')
//             }, false )



// let validate = function(){
//   let val = true;
//   let email = document.getElementById('inputEmail4')
//   console.log(email)
//   let name = document.getElementById('inputName')
//   console.log(name)
//   let card = document.getElementById('inputCard')
//   console.log(card)
//   if (!email.value.match(
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       )){
//     email.setAttribute("class", "form-control is-invalid");
//     val = false;
//   }
//   else{
//       email.setAttribute("class", "form-control is-valid");
//       order.email = email.value
//   }

//   if (name.value.length == 0)
//   {
//     name.setAttribute("class","form-control is-invalid")
//     val = false
//   }
//   else{
//     name.setAttribute("class", "form-control is-valid");
//     order.name = name.value
//   }

//   if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/))
//   {
//     card.setAttribute("class","form-control is-invalid")
//     val = false
//   }
//   else{
//     card.setAttribute("class", "form-control is-valid");
//     order.card = card.value
//   }

//   if (val){
//     form.classList.add("collapse")

//     for (const [key, value] of Object.entries(order)) {
//         summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` +'</li>'
//     }
//     summaryCard.classList.remove("collapse")
//     alertPlaceholder.innerHTML = ""
//     alert('<i class="bi-cart-check-fill"></i> You have made an order!', 'success')
//   }
//   return val;
// }

// })


return (
    <div>
      <div className="search-box">
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
      </div>
  
      <div className="items">
        {isCheckingOut ? (
          <div className="checkout">
            <h2>Items in your Cart:</h2>
            <div className="cart">{cartItems}</div>
          <h2>Payment Details</h2>
          <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onBlur={() => handleBlur("email")}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          {shouldMarkError("email") && (
            <div className="error-message">{errors.email}</div>
          )}
        </label>
        <br />
        <label>
          Credit Card:
          <input
            type="text"
            value={creditCard}
            onBlur={() => handleBlur("creditCard")}
            onChange={(e) => setCreditCard(e.target.value)}
            name="creditCard"
          />
          {shouldMarkError("creditCard") && (
            <div className="error-message">{errors.creditCard}</div>
          )}
        </label>
        <br />
        <label>
          Address1:
          <input
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            name="address1"
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            name="state"
          />
        </label>
        <br />
        <label>
          Zip:
          <input
            type="text"
            value={zip}
            onBlur={() => handleBlur("zip")}
            onChange={(e) => setZip(e.target.value)}
            name="zip"
          />
          {errors.zip && <div className="error-message">{errors.zip}</div>}
        </label>
        <br />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
      </div>
        </div>
        
        ) : (
          <div className="item-list">
            {filteredItems.length ? (
              filteredItems.map((item) => (
                <div key={item.id} className="item">
                  <img className="img-fluid" src={item.image} width="400" />
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
            ) : (
              <div className="no-items">No items found</div>
            )}
          </div>
        )}
      </div>
  
      <div className="cart-total">
        <div>Pre-Tax: ${(cartTotal*(10/11)).toFixed(2)}</div>
        <div>Tax Added: ${(cartTotal*(1/11)).toFixed(2)}</div>
        <div>Total: ${cartTotal.toFixed(2)}</div>
        <button className="checkout-btn" onClick={handleCheckout}>
          {isCheckingOut ? "Back to Items" : "Checkout"}
        </button>
      </div>
    </div>
  );
    };

    export default Shop;







