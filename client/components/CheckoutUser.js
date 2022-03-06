import React from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
export const CheckoutUser = (props) => {
  const { username } = props;

  const user = useSelector((state) => {
    return state.user;
  });

  console.log(user);

  return (
    <div>
      <h1>ADDRESS</h1>
      <h2>
        {user.address}, {user.city}, {user.state}
      </h2>
      <h2>{user.postalCode}</h2>
    </div>
  );
};

// const mapState = (state) => {
//   return {
//     username: state.user.username,
//   };
// };

export default CheckoutUser;
