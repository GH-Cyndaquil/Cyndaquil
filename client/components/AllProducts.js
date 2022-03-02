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
    </main>
  );
}

export default AllProducts;
