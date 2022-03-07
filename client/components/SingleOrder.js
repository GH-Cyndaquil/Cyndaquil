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

  return (
    <div>
      <h1>Order #{order.id}</h1>
      <div>
        {order.id ? (
          <div>
            {order.products.map((product) => {
              return (
                <div key={product.id}>
                  <h3>
                    {product.name} | ${product["order-details"].price}
                  </h3>
                  <p>Quantity: {product["order-details"].quantityOrdered}</p>
                </div>
              );
            })}
            <h3>
              Total: $
              {order.products
                .reduce((prev, curr) => {
                  return (
                    prev +
                    Number(curr["order-details"].price) *
                      curr["order-details"].quantityOrdered
                  );
                }, 0)
                .toFixed(2)}
            </h3>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </div>
  );
};

export default SingleOrder;
