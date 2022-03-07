import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleUser = () => {
  const user = useSelector((state) => state.user);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  console.log(user);

  return (
    <div id="single-user">
      <h1>Hello, {user.username}</h1>
      <div id="user-info">
        <div className="user-info-element">
          <h3>NAME</h3>
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </div>
        <div className="user-info-element">
          <h3>EMAIL</h3>
          <p>{user.email}</p>
        </div>
        <div className="user-info-element">
          <h3>ADDRESS</h3>
          <p>
            {user.address
              ? `${user.address}, ${user.city}, ${user.state} ${user.postalCode}`
              : "No Address Saved"}
          </p>
        </div>

        <Link to={`/users/${user.id}/edit`}>Edit Account</Link>
      </div>
      <h1>Order History</h1>
      <div>
        {user.orders.length ? (
          user.orders.map((order) => {
            return (
              <div key={order.id} className="order-tile">
                <div className="order-details-header">
                  <div className="order-details-element">
                    <p>Order placed:</p>
                    <p>{order.orderDate.substring(0, 10)}</p>
                  </div>
                  <div className="order-details-element">
                    <p>Total</p>
                    <p>
                      $
                      {numberWithCommas(
                        order.products
                          .reduce((prev, curr) => {
                            return (
                              prev +
                              Number(curr["order-details"].price) *
                                curr["order-details"].quantityOrdered
                            );
                          }, 0)
                          .toFixed(2)
                      )}
                    </p>
                  </div>
                  <div className="order-details-element">
                    <p>Order # </p>
                    <p>{order.id}</p>
                  </div>
                </div>
                <div className="order-content">
                  <img src={order.products[0].imageUrl} />
                  <div className="order-details-element">
                    <Link to={`/products/${order.products[0].id}`}>
                      {order.products[0].name}
                    </Link>
                    <p>
                      {order.products.length > 1
                        ? `and ${order.products.length - 1} other item(s)`
                        : ""}
                    </p>
                  </div>
                  <Link to={`/orders/${order.id}`}>
                    <button>View Order</button>
                  </Link>
                </div>
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

/*
<div key={order.id} className="order-tile">
                <div className="order-details-header">
                  <div className="order-details-element">
                    <p>Order # </p>
                    <p>{order.id}</p>
                  </div>
                  <div className="order-details-element">
                    <p>Order placed:</p>
                    <p>{order.orderDate.substring(0, 10)}</p>
                  </div>
                  <div className="order-details-element">
                    <p>Total</p>
                    <p>
                    {numberWithCommas(
                    order.products
                      .reduce((prev, curr) => {
                        return (
                          prev +
                          Number(curr["order-details"].price) *
                            curr["order-details"].quantityOrdered
                        );
                      }, 0)
                      .toFixed(2)
                  )}
                    </p>
                  </div>
                <div>
              </div>




*/
