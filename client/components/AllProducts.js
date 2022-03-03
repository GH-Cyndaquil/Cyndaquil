import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/products';
import { NavLink } from 'react-router-dom';

function AllProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products;
  });
  let [regionFilter, setRegionFilter] = useState(0);
  let [ingredientFilter, setIngredientFilter] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //define addToCart function here

  console.log(regionFilter);
  return (
    <main id="all-products">
      <ul id="filtering">
        <h2>Filter</h2>
        <h3>Region:</h3>
        <li value={1} onClick={(evt) => setRegionFilter(evt.target.value)}>
          United States
        </li>
        <li value={2} onClick={(evt) => setRegionFilter(evt.target.value)}>
          France
        </li>
        <li value={3} onClick={(evt) => setRegionFilter(evt.target.value)}>
          Sweden
        </li>
        <li value={4} onClick={(evt) => setRegionFilter(evt.target.value)}>
          Poland
        </li>
        <li value={5} onClick={(evt) => setRegionFilter(evt.target.value)}>
          Ukrain
        </li>
        <li value={6} onClick={(evt) => setRegionFilter(evt.target.value)}>
          Iceland
        </li>
        <li value={7} onClick={(evt) => setRegionFilter(evt.target.value)}>
          Netherlands
        </li>
        <h3>Main Ingredient</h3>
        <li onClick={(evt) => setIngredientFilter(evt.target.value)}>Wheat</li>
        <li onClick={(evt) => setIngredientFilter(evt.target.value)}>Potato</li>
        <li onClick={(evt) => setIngredientFilter(evt.target.value)}>Grape</li>
        <li onClick={(evt) => setIngredientFilter(evt.target.value)}>
          Sugar Cane
        </li>
        <li onClick={(evt) => setIngredientFilter(evt.target.value)}>
          Wheat and Barley
        </li>
        <li onClick={(evt) => setIngredientFilter(evt.target.value)}>Corn</li>
        <li onClick={(evt) => setIngredientFilter(evt.target.value)}>Rye</li>
        <li onClick={(evt) => setIngredientFilter(evt.target.value)}>
          Spelt Grain
        </li>
      </ul>
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
                <NavLink to={`/product/${product.id}`}>
                  <img
                    style={{ width: '100px' }}
                    className={'img'}
                    src={product.imageUrl}
                  />
                </NavLink>
                <h2>{product.name}</h2>
                <h3>${product.price}</h3>
                <input type="number" min="0"></input>
                <button>Add to Cart</button>
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default AllProducts;
