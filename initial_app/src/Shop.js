
import React, { useState, useEffect } from "react";
import items from "./data.json";
import hoodieImage from "./myotherimages/drakehoodie.png";
import tshirtImage from "./myotherimages/clbtshirt.png";
import capImage from "./myotherimages/owldrakecap.png";
import arianaHoodieImage from "./myotherimages/arianahoodie.png";
import arianaTshirtImage from "./myotherimages/arianatee.png";
import backpackImage from "./myotherimages/backpack.png";
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


// // im trying to add the js here

// //Add your code under this line

// const alertPlaceholder = document.getElementById('liveAlertPlaceholder') 
// const form = document.getElementById('checkout-form')
// const inputCard = document.querySelector('#inputCard')
// const alertTrigger = document.getElementById('submit-btn')
// const summaryCard = document.querySelector('.card') 
// const summaryList = document.querySelector('.card > ul')

// console.log(summaryList)

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
//   let name = document.getElementById('inputName')
//   let card = document.getElementById('inputCard')
  
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


// im trying to add the js here

 // im trying to add the js here

//Add your code under this line

document.addEventListener('DOMContentLoaded', () => {

//Add your code under this line
const alertPlaceholder = document.getElementById('liveAlertPlaceholder') 
console.log(alertPlaceholder);
const form = document.getElementById('checkout-form')
console.log(form);
const inputCard = document.querySelector('#inputCard')
console.log(inputCard);
const alertTrigger = document.getElementById('submit-btn')
console.log(alertTrigger);
const summaryCard = document.querySelector('.card') 
console.log(summaryCard);
const summaryList = document.querySelector('.card > ul')
console.log(summaryList);


var order = { name: '',
email: '',
card: '' }

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    ` <div>${message}</div>`,
    ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>', '</div>'
    ].join('') 
    alertPlaceholder.append(wrapper)
    }

function isNumeric (n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
        }
        inputCard.addEventListener('input', event => { 
            if (!inputCard.value) {
        return event.preventDefault() 
        // stops modal from being shown 
    } else {
        inputCard.value = inputCard.value.replace(/-/g, '')
        let newVal = ''
        for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
        if (nums != 0 && nums % 4 == 0) 
        { 
            newVal += '-'
        }
        newVal += inputCard.value[i]
        if (isNumeric(inputCard.value[i])) {
        nums++ }
        }
        inputCard.value = newVal }
        })

form.addEventListener('submit', event => {
            //if (!form.checkValidity()) {
            if (!validate()) {
            alertPlaceholder.innerHTML = ''
            alert('<i class="bi-exclamation-circle"></i> Something went wrong!','danger')
            }
            event.preventDefault()
            event.stopPropagation()
            //form.classList.add('was-validated')
            }, false )



let validate = function(){
  let val = true;
  let email = document.getElementById('inputEmail4')
  console.log(email)
  let name = document.getElementById('inputName')
  console.log(name)
  let card = document.getElementById('inputCard')
  console.log(card)
  if (!email.value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
    email.setAttribute("class", "form-control is-invalid");
    val = false;
  }
  else{
      email.setAttribute("class", "form-control is-valid");
      order.email = email.value
  }

  if (name.value.length == 0)
  {
    name.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    name.setAttribute("class", "form-control is-valid");
    order.name = name.value
  }

  if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/))
  {
    card.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    card.setAttribute("class", "form-control is-valid");
    order.card = card.value
  }

  if (val){
    form.classList.add("collapse")

    for (const [key, value] of Object.entries(order)) {
        summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` +'</li>'
    }
    summaryCard.classList.remove("collapse")
    alertPlaceholder.innerHTML = ""
    alert('<i class="bi-cart-check-fill"></i> You have made an order!', 'success')
  }
  return val;
}

})


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
          <div className="container">

  <div className="row">
    <div className="col-2"></div>
    <div className="col-8">
      <div id="liveAlertPlaceholder"></div>
      <form className="row g-3" id="checkout-form">
        {/* <!-- Full Name --> */}
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="inputName"/>
          <div className="valid-feedback">
            Looks good!
          </div>
          <div className="invalid-feedback">
            Must be like, "John Doe"
          </div>
        </div>
        {/* <!-- Email --> */}
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail4" />
          <div className="valid-feedback">
            Looks good!
          </div>
          <div className="invalid-feedback">
            Must be like, "abc@xyz.efg"
          </div>
        </div>
        {/* <!-- Credit Card --> */}
        <div className="col-12">
          <label htmlFor="inputCard" className="form-label">Card</label>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className="bi-credit-card-fill"></i></span>
            <input type="text" id="inputCard" className="form-control" placeholder="XXXX-XXXX-XXXX-XXXX" aria-label="Username" aria-describedby="basic-addon1"/>
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Must be like, "7777-7777-7777-7777"
            </div>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">City</label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">State</label>
          <select id="inputState" className="form-select">
            <option selected>Choose...</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">Zip</label>
          <input type="text" className="form-control" id="inputZip" />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success" >
            <i className="bi-bag-check" ></i> Order
          </button>
        </div>
      </form>
      <div className="card collapse" style={{width: "18rem"}}>
        <div className="card-body">
        <h5 className="card-title">Order summary</h5>
        <p className="card-text">Here is a summary of your order.</p>
        </div>
        <ul className="list-group list-group-flush">
        </ul>
        <a href="" onClick={() => window.location.reload()} className="btn btn-secondary">
        <i className="bi-arrow-left-circle"></i> Return
        </a>
        </div>
        <footer className="bd-footer py-4 py-md-5 mt-5 bg-light">
    <div className="container py-4 py-md-5 px-4 px-md-3">
      <div className="row">
        <div className="col-lg-12 mb-3">
          <b>Melophilia</b> Checkout page
        </div>
      </div>
    </div>
  </footer>

</div>

<div className="col-2"></div>
  </div>
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

//     // im trying to add the js here

// //Add your code under this line

// document.addEventListener('DOMContentLoaded', () => {

//     //Add your code under this line
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

// console.log(summaryList)

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
//   let name = document.getElementById('inputName')
//   let card = document.getElementById('inputCard')
  
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

    
    export default Shop;







