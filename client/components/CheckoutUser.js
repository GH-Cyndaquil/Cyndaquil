import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCart, fetchCart, gotCart } from '../store/orders';
import axios from 'axios';

export const CheckoutUser = (props) => {
  const isLoggedIn = useSelector((state) => !!state.user.id);
  const user = useSelector((state) => {
    return state.user;
  });

  let curCart = useSelector((state) => {
    return state.orders;
  });

  const [checked, setChecked] = useState(true);

  const [formState, setFormState] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
    address: user.address || '',
    city: user.city || '',
    state: user.state || '',
    zip: user.postalCode || '',
    email: user.email || '',
    order: curCart.products,
  });

  const dispatch = useDispatch();

  function changeChecked() {
    setChecked(!checked);
  }
  const handleChange = (evt) => {
    setFormState({ ...formState, [evt.target.name]: evt.target.value });
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();

    if (isLoggedIn) {
      await axios.put('api/orders/confirm', {
        orderId: curCart.id,
        shipAddress: formState.address,
        shipCity: formState.city,
        shipState: formState.state,
        shipPostalCode: formState.zip,
      });
      dispatch(fetchCart(curCart.userId));
    } else {
      localStorage.removeItem('cart');
      await axios.put('api/orders/confirmGuest', {
        orderId: curCart.id,
        shipAddress: formState.address,
        shipCity: formState.city,
        shipState: formState.state,
        shipPostalCode: formState.zip,
        email: formState.email,
        order: formState.order,
      });
      dispatch(gotCart({ products: [] }));
    }

    props.history.push('/confirmation');
  };

  const disableButton = (formState) => {
    for (let key in formState) {
      if (!formState[key]) return true;
    }
    return false;
  };

  return (
    <div>
      <div id="savedAddress" hidden={!user.id}>
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

      <form onSubmit={onSubmit} className="checkoutCentered">
        {user.id && checked ? (
          <div></div>
        ) : (
          <>
            <div>
              <h2>Email:</h2>
              <label htmlFor="email"></label>
              <input
                onChange={handleChange}
                value={formState.email}
                size="50"
                type="text"
                id="email"
                name="email"
              ></input>
            </div>
            <div>
              {user.id && !checked ? (
                <h2>New Shipping Address</h2>
              ) : (
                <h2>Shipping Address</h2>
              )}

              <label htmlFor="address">Street Address:</label>
              <input
                onChange={handleChange}
                value={formState.address}
                size="50"
                type="text"
                id="address"
                name="address"
              ></input>

              <label htmlFor="city">City:</label>
              <input
                onChange={handleChange}
                value={formState.city}
                size="50"
                type="text"
                id="city"
                name="city"
              ></input>

              <label htmlFor="state">State:</label>
              <input
                onChange={handleChange}
                value={formState.state}
                size="50"
                type="text"
                id="state"
                name="state"
              ></input>

              <label htmlFor="zip">Zipcode:</label>
              <input
                onChange={handleChange}
                value={formState.zip}
                size="50"
                type="text"
                id="zip"
                name="zip"
              ></input>
              <br></br>
            </div>
          </>
        )}

        {/* <form className="checkoutCentered"> */}
        <div>
          <h2>Credit Card Information</h2>
          <label htmlFor="cardHolderName">Cardholder Name:</label>
          <input
            onChange={handleChange}
            value={formState.cardHolderName}
            size="50"
            type="text"
            id="cardHolderName"
            name="cardHolderName"
          ></input>

          <label htmlFor="cardNumber">Card Number:</label>
          <input
            onChange={handleChange}
            value={formState.cardNumber}
            size="50"
            type="text"
            id="cardNumber"
            name="cardNumber"
          ></input>

          <label htmlFor="expiration">Exp:</label>
          <input
            onChange={handleChange}
            value={formState.expiration}
            size="50"
            type="text"
            id="expiration"
            name="expiration"
          ></input>

          <label htmlFor="cvv">CVV:</label>
          <input
            onChange={handleChange}
            value={formState.cvv}
            size="50"
            type="text"
            id="cvv"
            name="cvv"
          ></input>
          <br></br>
          <br></br>

          <button
            type="submit"
            value="submit"
            disabled={disableButton(formState)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutUser;
