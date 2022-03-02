import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/products';

function AllProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products;
  });
  let [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  function onFilter(evt) {
    evt.preventDefault();
  }

  //define addToCart function here

  return (
    <main id="all-products">
      <div id="filtering">
        <h2>Filter</h2>
        <h3>Region:</h3>
        <div>United States</div>
        <div>France</div>
        <div>Sweden</div>
        <div>Poland</div>
        <div>Ukrain</div>
        <div>Iceland</div>
        <div>Netherlands</div>
        <h3>Main Ingredient</h3>
        <div>Wheat</div>
        <div>Potato</div>
        <div>Grape</div>
        <div>Sugar Cane</div>
        <div>Wheat and Barley</div>
        <div>Corn</div>
        <div>Rye</div>
        <div>Spelt Grain</div>
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
