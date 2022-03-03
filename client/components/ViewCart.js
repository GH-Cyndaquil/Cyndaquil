<<<<<<< HEAD
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { fetchCart } from "../store/orders";

function ViewCart() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);

  const curCart = useSelector((state) => {
    return state.orders.products;
  });

  //  let [regionFilter, setRegionFilter] = useState("");
  //  let [ingredientFilter, setIngredientFilter] = useState("");

  useEffect(() => {
    dispatch(fetchCart(2));
  }, []);

  if (curCart) {
    return (
      //need to check length of cart, if it's empty display one thing if not display the other

      <main id="cart">
        <h1>Your Cart</h1>

        {curCart.map((product) => (
          <div key={product.id}>
            <img src={product.imageUrl}></img>
            <h2>Qty.</h2>
            <h3>{product["order-details"].quantityOrdered}</h3>
            <h2>Price</h2>
            <h3>{product["order-details"].price}</h3>
            <h2>Subtotal</h2>
            <h3>
              {product["order-details"].price *
                product["order-details"].quantityOrdered}
            </h3>
          </div>
        ))}
        {console.log("this is the console log-------", curCart)}
      </main>
    );
  } else {
    return (
      <main id="cart">
        <h1>Your Cart is empty</h1>
      </main>
    );
  }
}
export default ViewCart;
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// // function AllProducts(props) {
// //   let [products, setProducts] = useState([]);

// // need axios call to get products from cart--------------

// // useEffect(() => {
// //   const fetchProduct = async () => {
// //     try {
// //       let { data } = await axios.get("/api/products");
// //       setProducts(data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };
// //   fetchProduct();
// // }, []);

// return (
//   <main id="cart">
//     <h1>Your Cart</h1>

//     {cart.map((item) => {
//       return (
//         <div key={item.id}>
//           <img src={product.imageUrl} />
//           {/* this will need to come from the product model not order details */}
//           <h3>Item</h3>
//           <h2>{regionId}</h2>
//           {/* this will need to come from the region table */}
//           <h2>{ingredientId}</h2>
//           {/* this will need to come from the ingredient table */}
//           <h3>QTY.</h3>
//           <h2>{orderDetails.price}</h2>
//           {/* from order details table */}
//           <h3>Subtotal</h3>
//           <h2></h2>
//         </div>
//       );
//     })}
//   </main>
// );

//         </table>

//       {cart.map((item) => {
//         return (
//           <div key={produc.id}>
//             <img src={product.imageUrl} />
//             <h2>{product.name}</h2>
//             <h3>{product.price}</h3>
//             <button>Add to Cart</button>
//           </div>
//         );
//       })}
//     </main>
//   );
// }

// export default ViewCart;
>>>>>>> main
