// import React from "react";
// import { connect } from "react-redux";
// import { useSelector } from "react-redux";
// // import StripeCheckout from "react-stripe-checkout";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   StripeCardElement,
//   UseElement,
//   useStripe,
// } from "@stripe/stripe-js";
// import PaymentForm from "./PaymentForm";
// /**
//  * COMPONENT
//  */

// // export const CheckoutUser = (props) => {
// //   const { username } = props;

// //   const user = useSelector((state) => {
// //     return state.user;
// //   });

// const publicKey =
//   pk_test_51Ka8iVAc34Ww7kdgb4I6whU3wBlukLywBU3r7pdBhjjluvlLbM9iwANGkKFY0MBLbvIYG2lIcdm22FnbqcMWs2fi00ysi68RoY;

// const stripeTestPromise = loadStripe(publicKey);

// export default function StripeContainer() {
//   return (
//     <Elements stripe={stripeTestPromise}>
//       <PaymentForm />
//     </Elements>
//   );
// }

// //   function handleToken(token, addresses) {
// //     console.log({ token, addresses });
// //   }

// //   return (
// //     <>
// //       <Elements stripe={stripeTestPromise}></Elements>

// //       <div>
// //         <h1>ADDRESS</h1>
// //         <h2>
// //           {user.address}, {user.city}, {user.state}
// //         </h2>
// //         <h2>{user.postalCode}</h2>

// //         <label for="addressBox">Use Saved Address</label>

// //         <input type="checkbox" name="addressBox" checked={true}></input>
// //       </div>
// //       {/* <StripeCheckout
// //         stripeKey="pk_test_51Ka8iVAc34Ww7kdgb4I6whU3wBlukLywBU3r7pdBhjjluvlLbM9iwANGkKFY0MBLbvIYG2lIcdm22FnbqcMWs2fi00ysi68RoY"
// //         token={handleToken}
// //       ></StripeCheckout> */}
// //     </>
// //   );
// // };

// // const mapState = (state) => {
// //   return {
// //     username: state.user.username,
// //   };
// // };

// // export default CheckoutUser;
