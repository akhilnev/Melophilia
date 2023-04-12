import React, { useState, useEffect } from "react";
import items from "./data.json";
const itemsArray = Object.values(items);
const Shop = () => {
const [cart, setCart] = useState([]);
const [query, setQuery] = useState('');
const [cartTotal, setCartTotal] = useState(0);
const listItems = itemsArray.map((el) => (
    <div key={el.id}>
    <img class="img-fluid" src={el.image} />
    {el.name}
    {el.description}
    ${el.price}
    <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
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
    setCart([...cart, el]);
    };
const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
        }

const cartItems = cart.map((el) => (
            <div key={el.id}>
            <img class="img-fluid" src={el.image} width={30} />
            {el.title}
            ${el.price}
            </div>
            ));
const handleChange = (e) => {
                setQuery(e.target.value);
                console.log("Step 6 : in handleChange, Target Value :",e.target.value," Query Value :",query);
                const results = [...cart].filter(eachProduct => {
                if (e.target.value === "") return [...cart];
                return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
                });
                setCart(results);
                }               
return (
<div>
<div className="py-10">
<input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search" value={query} onChange={handleChange} />
</div>
<div> {listItems} </div>
<div>Items in Cart :</div>
<div>{cartItems}</div>
<div>Order total to pay :{cartTotal}</div>

</div>
);

}
export default Shop;

