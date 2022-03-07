import React, { useState } from "react";
import { useSelector } from "react-redux";

export const CheckoutUser = (props) => {
  const user = useSelector((state) => {
    return state.user;
  });

  const [checked, setChecked] = useState(true);

  function changeChecked() {
    setChecked(!checked);
  }

  //   console.log(user);

  return (
    <div>
      <div id="savedAddress">
        <h3>
          {user.firstName} {user.lastName} <br></br>
          {user.address}, {user.city}, {user.state} <br></br>
          {user.postalCode}
        </h3>
        <label htmlFor="addressBox">Use Saved Address</label>
        <input
          type="checkbox"
          name="addressBox"
          defaultChecked={true}
          onChange={changeChecked}
          value={checked}
        ></input>
      </div>
      <div
        className="checkoutCentered"
        style={{ display: checked === false ? "block" : "none" }}
      >
        <h2>New Shipping Address</h2>
        <form

        //   style={{ display: "block" }}
        >
          <label htmlFor="address">Street Address:</label>
          <input size="50" type="text" id="address" name="address"></input>

          <label htmlFor="city">City:</label>
          <input size="50" type="text" id="city" name="city"></input>

          <label htmlFor="state">State:</label>
          <input size="50" type="text" id="state" name="state"></input>

          <label htmlFor="zip">Zipcode:</label>
          <input size="50" type="text" id="zip" name="zip"></input>
          {/* <input type="submit" value="submit"></input> */}
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

export default CheckoutUser;
