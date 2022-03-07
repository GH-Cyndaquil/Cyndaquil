import React, { useState } from "React";
import { cardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segeo UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setsuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (evt) => {
    e.preventDefault();

    // This needs to make a call to redux store through orders.payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(cardElement),
    });
  };

  if (!error) {
    try {
      const { id } = paymentMethod;
      const response = await axios.post("http://localhost:8080/payment", {
        amount: 1000,
        id,
      });
      if (response.data.success) {
        console.log("successful payment");
        setsuccess(true);
      }
    } catch (error) {
      console.error("error", error);
    }
  } else {
    console.log(error.message);
  }

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h2>You just bought some sweet Vodka</h2>
        </div>
      )}
    </>
  );
}
