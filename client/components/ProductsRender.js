import React from 'react';
import { NavLink } from 'react-router-dom';

function RenderProducts(props) {
  return props.search === ''
    ? props.tenProducts
        .filter((product) => {
          if (props.regionFilter === 0) {
            return product;
          } else if (product.regionId === props.regionFilter) {
            return product;
          }
        })
        .filter((product) => {
          if (props.ingredientFilter === 0) {
            return product;
          } else if (product.ingredientId === props.ingredientFilter) {
            return product;
          }
        })
        .map((product) => {
          return (
            <div className="product" key={product.id}>
              <NavLink to={`/products/${product.id}`} className="product-links">
                <img
                  style={{ width: '100px' }}
                  className={'img'}
                  src={product.imageUrl}
                />
              </NavLink>
              <NavLink to={`/products/${product.id}`} className="product-links">
                <h2>{product.name}</h2>
              </NavLink>

              <h3>${product.price}</h3>
              <input
                type="number"
                min="1"
                max={product.quantity}
                onChange={(evt) =>
                  props.setProductQuantities({
                    ...props.productQuantities,
                    [product.id]: {
                      quantity: evt.target.value,
                      price: evt.target.value * product.price,
                      imageUrl: product.imageUrl,
                    },
                  })
                }
              ></input>
              <p>
                <button id={product.id} onClick={props.addToCart}>
                  Add to Cart
                </button>
              </p>

              <h5>
                Adding to cart: $
                {props.productQuantities[product.id]
                  ? props.numberWithCommas(
                      props.productQuantities[product.id].price.toFixed(2)
                    )
                  : 0}
              </h5>
            </div>
          );
        })
    : props.products
        .filter((product) =>
          product.name.toLowerCase().includes(props.search.toLowerCase())
        )
        .filter((product) => {
          if (props.regionFilter === 0) {
            return product;
          } else if (product.regionId === props.regionFilter) {
            return product;
          }
        })
        .filter((product) => {
          if (props.ingredientFilter === 0) {
            return product;
          } else if (product.ingredientId === props.ingredientFilter) {
            return product;
          }
        })
        .map((product) => {
          return (
            <div className="product" key={product.id}>
              <NavLink to={`/products/${product.id}`} className="product-links">
                <img
                  style={{ width: '100px' }}
                  className={'img'}
                  src={product.imageUrl}
                />
              </NavLink>
              <NavLink to={`/products/${product.id}`} className="product-links">
                <h2>{product.name}</h2>
              </NavLink>

              <h3>${product.price}</h3>
              <input
                type="number"
                min="1"
                max={product.quantity}
                onChange={(evt) =>
                  props.setProductQuantities({
                    ...props.productQuantities,
                    [product.id]: {
                      quantity: evt.target.value,
                      price: evt.target.value * product.price,
                      imageUrl: product.imageUrl,
                    },
                  })
                }
              ></input>
              <p>
                <button id={product.id} onClick={props.addToCart}>
                  Add to Cart
                </button>
              </p>

              <h5>
                Adding to cart: $
                {props.productQuantities[product.id]
                  ? props.numberWithCommas(
                      props.productQuantities[product.id].price.toFixed(2)
                    )
                  : 0}
              </h5>
            </div>
          );
        });
}

export default RenderProducts;
