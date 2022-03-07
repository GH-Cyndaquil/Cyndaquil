import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSelectedProduct,
  setSelectedProduct,
} from '../store/selectedProduct';
import { fetchIngredients } from '../store/ingredients';
import { fetchRegions } from '../store/regions';
import { addItem, fetchCart } from '../store/orders';

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
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const userId = useSelector((state) => {
    return state.user.id;
  });
  const isLoggedIn = useSelector((state) => !!state.user.id);

  useEffect(() => {
    // dispatch(fetchCart(userId));
    dispatch(fetchIngredients());
    dispatch(fetchSelectedProduct(props.match.params.id));
    dispatch(fetchRegions());
  }, []);

  function handleQuantityChange(evt) {
    //toFixed ensures we don't display prices like $19.99999999998
    let newQuantity = evt.target.value;
    let price = Number((newQuantity * currentProduct.price).toFixed(2));
    if (price !== 0) {
      if (price.toString().split('.')[1].length === 1) {
        price = price.toString() + 0;
      }
    }

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    setQuantityPrice(numberWithCommas(price));
    setCurrentQuantity(newQuantity);
  }

  function addToCart(evt) {
    if (isLoggedIn) {
      dispatch(
        addItem({
          productId: currentProduct.id,
          price: quantityPrice,
          quantity: currentQuantity,
          userId: userId,
        })
      );
    } else {
      if (currentProduct.quantity > 0) {
        if (localStorage.cart) {
          let cart = JSON.parse(localStorage.getItem('cart'));
          let cartItem = cart[`${currentProduct.id}`];
          if (cartItem) {
            cartItem.quantity =
              Number(cartItem.quantity) + Number(currentQuantity);
            cartItem.price = (cartItem.quantity * currentProduct.price).toFixed(
              2
            );
          } else {
            cart[`${currentProduct.id}`] = {
              productId: currentProduct.id,
              price: quantityPrice,
              quantity: currentQuantity,
            };
          }
          localStorage.setItem('cart', JSON.stringify(cart));
        } else {
          let cart = {};
          cart[`${currentProduct.id}`] = {
            productId: currentProduct.id,
            price: quantityPrice,
            quantity: currentQuantity,
          };
          localStorage.setItem('cart', JSON.stringify(cart));
        }
      }
    }
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
          <button onClick={addToCart}>Add to Cart</button>
          <h5>Adding to cart: ${quantityPrice}</h5>
        </div>
      </main>
    );
  }
}

export default SingleProduct;
