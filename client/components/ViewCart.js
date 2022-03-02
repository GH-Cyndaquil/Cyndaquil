import React, { useEffect, useState } from "react";
import axios from "axios";

// function AllProducts(props) {
//   let [products, setProducts] = useState([]);

// need axios call to get products from cart--------------

// useEffect(() => {
//   const fetchProduct = async () => {
//     try {
//       let { data } = await axios.get("/api/products");
//       setProducts(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   fetchProduct();
// }, []);

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
