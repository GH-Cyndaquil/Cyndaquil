import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";

function AllProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products;
  });
  let [regionFilter, setRegionFilter] = useState("");
  let [ingredientFilter, setIngredientFilter] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //define addToCart function here

  return (
    <main id="all-products">
      <div id="filtering">
        <h2>Filter</h2>
        <h3>Region:</h3>
        <div onClick={(evt) => setRegionFilter(evt.target.value)}>
          United States
        </div>
        <div onClick={(evt) => setRegionFilter(evt.target.value)}>France</div>
        <div onClick={(evt) => setRegionFilter(evt.target.value)}>Sweden</div>
        <div onClick={(evt) => setRegionFilter(evt.target.value)}>Poland</div>
        <div onClick={(evt) => setRegionFilter(evt.target.value)}>Ukraine</div>
        <div onClick={(evt) => setRegionFilter(evt.target.value)}>Iceland</div>
        <div onClick={(evt) => setRegionFilter(evt.target.value)}>
          Netherlands
        </div>
        <h3>Main Ingredient</h3>
        <div onClick={(evt) => setIngredientFilter(evt.target.value)}>
          Wheat
        </div>
        <div onClick={(evt) => setIngredientFilter(evt.target.value)}>
          Potato
        </div>
        <div onClick={(evt) => setIngredientFilter(evt.target.value)}>
          Grape
        </div>
        <div onClick={(evt) => setIngredientFilter(evt.target.value)}>
          Sugar Cane
        </div>
        <div onClick={(evt) => setIngredientFilter(evt.target.value)}>
          Wheat and Barley
        </div>
        <div onClick={(evt) => setIngredientFilter(evt.target.value)}>Corn</div>
        <div onClick={(evt) => setIngredientFilter(evt.target.value)}>Rye</div>
        <div onClick={(evt) => setIngredientFilter(evt.target.value)}>
          Spelt Grain
        </div>
      </div>
      <div id="products">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <img src={product.imageUrl} />
              <h2>{product.name}</h2>
              <h3>{product.price}</h3>
              <button>Add to Cart</button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default AllProducts;
