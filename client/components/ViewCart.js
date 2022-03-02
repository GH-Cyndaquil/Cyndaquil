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

//   return (
//     <main id="cart">
//       <table>

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
