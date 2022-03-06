import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

/**
 * COMPONENT
 */
export const CheckoutUser = (props) => {
  const { username } = props;

  const user = useSelector((state) => {
    return state.user;
  });

  console.log(user);

  function handleToken(token, addresses) {
    console.log({ token, addresses });
  }

  return (
    <>
      <div>
        <h1>ADDRESS</h1>
        <h2>
          {user.address}, {user.city}, {user.state}
        </h2>
        <h2>{user.postalCode}</h2>

        <label for="addressBox">Use Saved Address</label>

        <input type="checkbox" name="addressBox" checked={true}></input>
      </div>
      <StripeCheckout
        stripeKey="pk_test_51Ka8iVAc34Ww7kdgb4I6whU3wBlukLywBU3r7pdBhjjluvlLbM9iwANGkKFY0MBLbvIYG2lIcdm22FnbqcMWs2fi00ysi68RoY"
        token={handleToken}
      ></StripeCheckout>
    </>
  );
};

// const mapState = (state) => {
//   return {
//     username: state.user.username,
//   };
// };

export default CheckoutUser;
