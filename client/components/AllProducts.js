import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/products';

function AllProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  //define addToCart function here

  return (
    <main id="all-products">
      <div id="filtering">
        <h2>Filter</h2>
        <h3>Region:</h3>
        <div>Region 1</div>
        <div>Region 2</div>
        <div>Region 3</div>
        <h3>Main Ingredient</h3>
        <div>Ingredient 1</div>
        <div>Ingredient 2</div>
        <div>Ingredient 3</div>
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
