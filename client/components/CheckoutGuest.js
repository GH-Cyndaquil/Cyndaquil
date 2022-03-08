import React from "react";
import { useSelector } from "react-redux";

export const CheckoutGuest = () => {
  const user = useSelector((state) => {
    return state.user;
  });
  console.log(user);

  return (
    <div>
      <div className="checkoutCentered">
        <h2>Shipping Address</h2>
        <form style={{ display: "block" }}>
          <label htmlFor="address">Street Address:</label>
          <input size="50" type="text" id="address" name="address"></input>

          <label htmlFor="city">City:</label>
          <input size="50" type="text" id="city" name="city"></input>

          <label htmlFor="state">State:</label>
          <input size="50" type="text" id="state" name="state"></input>

          <label htmlFor="zip">Zipcode:</label>
          <input size="50" type="text" id="zip" name="zip"></input>
          <input type="submit" value="submit"></input>
          <br></br>
        </form>
      </div>

      <form className="checkoutCentered">
        <h2>Credit Card Information</h2>
        <label htmlFor="cardHolderName">Cardholder Name:</label>
        <input
          size="50"
          type="text"
          id="cardHolderName"
          name="cardHolderName"
        ></input>

        <label htmlFor="cardNumber">Card Number:</label>
        <input size="50" type="text" id="cardNumber" name="cardNumber"></input>

        <label htmlFor="expiration">Exp:</label>
        <input size="50" type="text" id="expiration" name="expiration"></input>

        <label htmlFor="cvv">CVV:</label>
        <input size="50" type="text" id="cvv" name="cvv"></input>
        <br></br>
        <br></br>
        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
};

export default CheckoutGuest;
