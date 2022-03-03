import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
        <Link to={`/users/${user.id}/edit`}>Edit Account</Link>
      </div>
      <h1>Order History</h1>
      <div>
        {user.orders.length ? (
          user.orders.map((order) => {
            return (
              <div key={order.id}>
                <h3>Order Number: {order.id}</h3>
                <p>Date Ordered: {order.orderDate.substring(0, 10)}</p>
                <p>
                  Order Total: $
                  {order.products.reduce((prev, curr) => {
                    return (
                      prev +
                      Number(curr["order-details"].price) *
                        curr["order-details"].quantityOrdered
                    );
                  }, 0)}
                </p>
              </div>
            );
          })
        ) : (
          <h3>No Orders Yet!</h3>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
