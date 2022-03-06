import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/orders';
import { Link } from 'react-router-dom';

const ViewCart = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => {
    return state.user.id;
  });

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(fetchCart(userId));
    }
  }, [userId]);

  const curCart = useSelector((state) => {
    return state.orders;
  });

  function numberWithCommas(price) {
    if (price.toString().split('.')[1].length === 1) {
      price = price.toString() + 0;
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (curCart.id !== undefined) {
    return (
      <>
        <main id="cart">
          <div id="cartTable">
            <table>
              <caption>Your Cart</caption>
              <tbody>
                <tr>
                  <th></th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
                {curCart.products.map((product, i) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.imageUrl}></img>
                    </td>

                    <td>{curCart['order-details'][i].quantityOrdered}</td>
                    <td>
                      ${numberWithCommas(curCart['order-details'][i].price)}
                    </td>
                    <td>
                      $
                      {numberWithCommas(
                        curCart['order-details'][i].price *
                          curCart['order-details'][i].quantityOrdered
                      )}
                    </td>
                    <td>
                      <i
                        className="fa fa-trash-o"
                        style={{ fontSize: '24px' }}
                      ></i>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  {/* need to figure out how to do a total here */}
                  <td>43.70</td>
                  <td>
                    <Link to="/checkoutuser">
                      <button>Checkout</button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <main id="cart">
        <h1>Your Cart is Empty!</h1>
      </main>
    );
  }
};
export default ViewCart;
