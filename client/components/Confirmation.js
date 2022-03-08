import React from "react";

export const Confirmation = () => {
  console.log("confirmed");
  return (
    <div className="checkoutCentered">
      <h1>Thank you for your order!</h1>
      <h2>You'll receive a confirmation email shortly.</h2>
    </div>
  );
};

export default Confirmation;
