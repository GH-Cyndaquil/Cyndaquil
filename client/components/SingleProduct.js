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
  const [quantityPrice, setQuantityPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchSelectedProduct(props.match.params.id));
    dispatch(fetchRegions());
  }, []);

  function handleQuantityChange(evt) {
    //toFixed ensures we don't display prices like $19.99999999998
    let price = Number((evt.target.value * currentProduct.price).toFixed(2));
    if (price !== 0) {
      if (price.toString().split('.')[1].length === 1) {
        price = price.toString() + 0;
      }
    }

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    setQuantityPrice(numberWithCommas(price));
  }

  if (ingredients.length === 0) {
    return null;
  } else {
    return (
      <main id="single-product">
        <img src={currentProduct.imageUrl} />
        <div id="product-info">
          <h1>{currentProduct.name}</h1>
          <h2>${currentProduct.price}</h2>
          <div>In stock: {currentProduct.quantity}</div>
          <p>{currentProduct.description}</p>
          <h4>
            Main ingredient:{' '}
            {ingredients
              .filter(
                (ingredient) => ingredient.id === currentProduct.ingredientId
              )
              .map((ingredient) => ingredient.name)}
          </h4>
          <h4>
            Region:{' '}
            {regions
              .filter((region) => region.id === currentProduct.regionId)
              .map((region) => region.name)}
          </h4>
          <input
            type="number"
            min={0}
            max={currentProduct.quantity}
            onChange={(evt) => handleQuantityChange(evt)}
          ></input>
          <button>Add to Cart</button>
          <h5>Adding to cart: ${quantityPrice}</h5>
        </div>
      </main>
    );
  }
}

export default SingleProduct;
