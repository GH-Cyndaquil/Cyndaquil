import React, { useEffect, useState } from "react";
import axios from "axios";

const SingleOrder = (props) => {
  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await axios.get(`/api/orders/${props.match.params.id}`);
      setOrder(data);
    };
    fetchOrder();
  }, []);
  function numberWithCommas(price) {
    if (price.toString().split(".")[1] !== undefined) {
      if (price.toString().split(".")[1].length === 1) {
        price = price.toString() + 0;
      }
    }
    return Number(price)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  console.log("single order", order);
  if (order.id && Object.keys(order).length > 0) {
    return (
      <div>
        <h1>Order #{order.id}</h1>
        <div>
          {order.id ? (
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
                {order.products.map((product) => {
                  return (
                    <tr>
                      <td>
                        <img className="img" src={product.imageUrl} />
                      </td>
                      <td>{product.name}</td>
                      <td>${product["order-details"].price}</td>
                      <td>{product["order-details"].quantityOrdered}</td>
                      <td>
                        $
                        {numberWithCommas(
                          product["order-details"].price *
                            product["order-details"].quantityOrdered
                        )}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th>Total</th>
                  <td>
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
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    );
  } else return <div>Loading...</div>;
};

export default SingleOrder;
