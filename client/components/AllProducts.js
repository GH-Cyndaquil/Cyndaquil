import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/products';
import { NavLink } from 'react-router-dom';
import { fetchIngredients } from '../store/ingredients';
import orders from './admin';
import { fetchRegions } from '../store/regions';
import { addItem } from '../store/orders';

function AllProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products;
  });
  let [regionFilter, setRegionFilter] = useState(0);
  let [ingredientFilter, setIngredientFilter] = useState(0);
  let [productQuantities, setProductQuantities] = useState({});
  let [currentPage, setCurrentPage] = useState('');
  const pages = Array(Number(props.location.search.split('=')[1])).fill('');
  const ingredients = useSelector((state) => {
    return state.ingredients;
  });
  const regions = useSelector((state) => {
    return state.regions;
  });

  const userId = useSelector((state) => {
    return state.user.id;
  });

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchRegions());
    let currentPageQuery = props.location.search.split('=')[1];
    if (props.location.search === '' || currentPageQuery == 0) {
      props.history.push('/products?page=1');
      setCurrentPage('/products?page=1');
    }
  }, []);

  useEffect(() => {
    dispatch(fetchProducts(props.location));
  }, [props.location.search]);

  function addToCart(evt) {
    dispatch(
      addItem({
        productId: evt.target.id,
        price: Number(productQuantities[evt.target.id].price).toFixed(2),
        quantity: Number(productQuantities[evt.target.id].quantity),
        userId: userId,
      })
    );
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (products.length > 0) {
    return (
      <div id="all-products-page">
        <main id="all-products">
          <div id="filtering">
            <h2>Filter by:</h2>
            <h3>Region:</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="region-filter"
                  onChange={(evt) => {
                    if (evt.target.checked) {
                      setRegionFilter(0);
                    }
                  }}
                />
                {'All'}
              </label>
              {regions.map((region) => {
                return (
                  <label key={region.id}>
                    <input
                      type="radio"
                      name="region-filter"
                      value={region.id}
                      onChange={(evt) => {
                        if (evt.target.checked) {
                          setRegionFilter(Number(evt.target.value));
                        }
                      }}
                    />
                    {region.name}
                  </label>
                );
              })}
            </div>
            <h3>Main Ingredient:</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="ingredient-filter"
                  onChange={(evt) => {
                    if (evt.target.checked) {
                      setIngredientFilter(0);
                    }
                  }}
                />
                {'All'}
              </label>
              {ingredients.map((ingredient) => {
                return (
                  <label key={ingredient.id}>
                    <input
                      type="radio"
                      name="ingredient-filter"
                      value={ingredient.id}
                      onChange={(evt) => {
                        if (evt.target.checked) {
                          setIngredientFilter(Number(evt.target.value));
                        }
                      }}
                    />
                    {ingredient.name}
                  </label>
                );
              })}
            </div>
          </div>
          <div id="products">
            {products
              .filter((product) => {
                if (regionFilter === 0) {
                  return product;
                } else if (product.regionId === regionFilter) {
                  return product;
                }
              })
              .filter((product) => {
                if (ingredientFilter === 0) {
                  return product;
                } else if (product.ingredientId === ingredientFilter) {
                  return product;
                }
              })
              .map((product) => {
                return (
                  <div className="product" key={product.id}>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="product-links"
                    >
                      <img
                        style={{ width: '100px' }}
                        className={'img'}
                        src={product.imageUrl}
                      />
                    </NavLink>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="product-links"
                    >
                      <h2>{product.name}</h2>
                    </NavLink>

                    <h3>${product.price}</h3>
                    <input
                      type="number"
                      min="0"
                      max={product.quantity}
                      onChange={(evt) =>
                        setProductQuantities({
                          ...productQuantities,
                          [product.id]: {
                            quantity: evt.target.value,
                            price: evt.target.value * product.price,
                          },
                        })
                      }
                    ></input>
                    <p>
                      <button id={product.id} onClick={addToCart}>
                        Add to Cart
                      </button>
                    </p>

                    <h5>
                      Adding to cart: $
                      {productQuantities[product.id]
                        ? numberWithCommas(
                            productQuantities[product.id].price.toFixed(2)
                          )
                        : 0}
                    </h5>
                  </div>
                );
              })}
          </div>
        </main>
        <div id="pagination-buttons">
          {props.location.search.split('=')[1] - 1 === 0 ? null : (
            <button
              onClick={() =>
                props.history.push(
                  `/products?page=${
                    Number(props.location.search.split('=')[1]) - 1
                  }`
                )
              }
            >
              Previous
            </button>
          )}
          {pages.map((page, i) => {
            return (
              <button
                key={i}
                onClick={() => props.history.push(`/products?page=${i + 1}`)}
              >
                {i + 1}
              </button>
            );
          })}
          <button
            onClick={() =>
              props.history.push(
                `/products?page=${
                  Number(props.location.search.split('=')[1]) + 1
                }`
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div id="no-vodka-left">
        <p>No vodka here</p>
        <img
          id="weirdge"
          src="https://cdn.discordapp.com/emojis/808088165985550337.webp?size=96&quality=lossless"
        />
        <div id="pagination-buttons">
          {props.location.search.split('=')[1] - 1 === 0 ? null : (
            <button
              onClick={() =>
                props.history.push(
                  `/products?page=${
                    Number(props.location.search.split('=')[1]) - 1
                  }`
                )
              }
            >
              Previous
            </button>
          )}
          {pages.map((page, i) => {
            return (
              <button
                key={i}
                onClick={() => props.history.push(`/products?page=${i + 1}`)}
              >
                {i + 1}
              </button>
            );
          })}
          <button
            onClick={() =>
              props.history.push(
                `/products?page=${
                  Number(props.location.search.split('=')[1]) + 1
                }`
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default AllProducts;
