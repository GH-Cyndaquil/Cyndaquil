import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/products';
import { NavLink } from 'react-router-dom';
import { fetchIngredients } from '../store/ingredients';
import { fetchRegions } from '../store/regions';

function AllProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products;
  });
  let [regionFilter, setRegionFilter] = useState(0);
  let [ingredientFilter, setIngredientFilter] = useState(0);
  const ingredients = useSelector((state) => {
    return state.ingredients;
  });
  const regions = useSelector((state) => {
    return state.regions;
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchIngredients());
    dispatch(fetchRegions());
  }, []);

  //define addToCart function here

  return (
    <main id="all-products">
      <div id="filtering">
        <h2>Filter</h2>
        <h3>Region:</h3>
        <select onChange={(evt) => setRegionFilter(Number(evt.target.value))}>
          <option value={0}>All</option>
          {regions.map((region) => {
            return <option value={region.id}>{region.name}</option>;
          })}
        </select>
        <h3>Main Ingredient</h3>
        <select
          onChange={(evt) => setIngredientFilter(Number(evt.target.value))}
        >
          <option value={0}>All</option>
          {ingredients.map((ingredient) => {
            return <option value={ingredient.id}>{ingredient.name}</option>;
          })}
        </select>
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
                <NavLink to={`/products/${product.id}`}>
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
