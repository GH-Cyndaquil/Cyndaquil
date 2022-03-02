import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSelectedProduct,
  setSelectedProduct,
} from '../store/selectedProduct';
import axios from 'axios';

function SingleProduct(props) {
  let dispatch = useDispatch();
  let currentProduct = useSelector((state) => {
    return state.selectedProduct;
  });

  console.log(currentProduct);
  useEffect(() => {
    dispatch(fetchSelectedProduct(props.match.params.id));
  }, []);
  return (
    <main id="single-product">
      <div>
        <img src={currentProduct.imageUrl} />
      </div>
      <div id="product-info">
        <h1>{currentProduct.name}</h1>
        <h2>{currentProduct.price}</h2>
        <p>{currentProduct.description}</p>
        <div>{currentProduct.quantity}</div>
      </div>
    </main>
  );
}

export default SingleProduct;
