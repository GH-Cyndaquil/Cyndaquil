import React from "react";
import { useSelector } from "react-redux";

const SingleUser = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Hello, {user.username}</h1>
      <div>
        <h3>NAME</h3>
        <p>{`${user.firstName} ${user.lastName}`}</p>
        <h3>EMAIL</h3>
        <p>{user.email}</p>
        <h3>ADDRESS</h3>
        <p>
          {user.address
            ? `${user.address}, ${user.city}, ${user.state} ${user.postalCode}`
            : "No Address Saved"}
        </p>
        <button>Edit Account</button>
      </div>
      <h1>Order History</h1>
      <div>
        <h3>No orders to show...</h3>
      </div>
    </div>
  );
};

export default SingleUser;