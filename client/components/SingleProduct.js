import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSelectedProduct,
  setSelectedProduct,
} from '../store/selectedProduct';
import { fetchIngredients } from '../store/ingredients';
import { fetchRegions } from '../store/regions';

function SingleProduct(props) {
  const dispatch = useDispatch();
  const currentProduct = useSelector((state) => {
    return state.selectedProduct;
  });
  const ingredients = useSelector((state) => {
    return state.ingredients;
  });
  const regions = useSelector((state) => {
    return state.regions;
  });

  useEffect(() => {
    dispatch(fetchSelectedProduct(props.match.params.id));
    dispatch(fetchIngredients());
    dispatch(fetchRegions());
  }, []);

  return regions.length > 0 ? (
    <main id="single-product">
      <div>
        <img src={currentProduct.imageUrl} />
      </div>
      <div id="product-info">
        <h1>{currentProduct.name}</h1>
        <h2>${currentProduct.price}</h2>
        <div>In stock: {currentProduct.quantity}</div>
        <p>{currentProduct.description}</p>
        <h4>
          Main ingredient:{' '}
          {
            ingredients.filter(
              (ingredient) => ingredient.id === currentProduct.ingredientId
            )[0].name
          }
        </h4>
        <h4>
          Region:{' '}
          {
            regions.filter((region) => region.id === currentProduct.regionId)[0]
              .name
          }
        </h4>
        <input type="number" min="0"></input>
        <button>Add to Cart</button>
      </div>
    </main>
  ) : null;
}

export default SingleProduct;
