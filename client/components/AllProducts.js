import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/products';
import { fetchIngredients } from '../store/ingredients';
import orders from './admin';
import { fetchRegions } from '../store/regions';
import { addItem, gotCart } from '../store/orders';
import axios from 'axios';
import RegionMap from './RegionFilters';
import IngredientsMap from './IngredientsFilters';
import RenderProducts from './ProductsRender';

function AllProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products;
  });
  const [tenProducts, setTenProducts] = useState([]);

  let [regionFilter, setRegionFilter] = useState(0);
  let [ingredientFilter, setIngredientFilter] = useState(0);
  let [productQuantities, setProductQuantities] = useState({});
  let [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const ingredients = useSelector((state) => {
    return state.ingredients;
  });
  const regions = useSelector((state) => {
    return state.regions;
  });

  const userId = useSelector((state) => {
    return state.user.id;
  });

  useEffect(() => {
    let currentPageQuery = props.location.search.split('=')[1];
    if (props.location.search === '' || currentPageQuery == 0) {
      props.history.push('/products?page=1');
    }
  }, []);

  useEffect(() => {
    if (products.length < 10) {
      let productsArr = [];
      for (let i = 0; i < products.length; i++) {
        productsArr.push(products[i]);
      }
      setTenProducts(productsArr);
    } else {
      let productsArr = [];
      for (let i = 0; i < 10; i++) {
        productsArr.push(products[i]);
      }
      setTenProducts(productsArr);
    }
  }, [products]);

  //mapped over to create individual page buttons
  let pagesArr = [];
  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i);
  }

  useEffect(() => {
    if (props.location.search.split('=')[1] == 1) {
      setIngredientFilter(0);
      setRegionFilter(0);
      setSearch('');
    }
    dispatch(fetchProducts(props.location));
    dispatch(fetchIngredients());
    dispatch(fetchRegions());
    window.scroll(0, 0);
  }, [props.location.search]);

  useEffect(() => {
    if (search !== '') {
      props.history.push('/products');
    }
  }, [search]);

  useEffect(() => {
    async function filtering() {
      if (!(props.location.search === '' && search !== '')) {
        props.history.push('/products?page=1');
      }
      dispatch(
        fetchProducts(props.location, { regionFilter, ingredientFilter })
      );
      await axios
        .get('/api/products', {
          headers: { regionFilter, ingredientFilter },
        })
        .then((response) => setPages(Math.ceil(response.data.length / 10)));
    }
    filtering();
  }, [regionFilter, ingredientFilter]);

  function addToCart(evt) {
    if (userId) {
      dispatch(
        addItem({
          productId: evt.target.id,
          price: Number(productQuantities[evt.target.id].price).toFixed(2),
          quantity: Number(productQuantities[evt.target.id].quantity),
          userId: userId,
        })
      );
    } else {
      if (productQuantities[evt.target.id].price > 0) {
        if (localStorage.cart) {
          let cart = JSON.parse(localStorage.getItem('cart'));
          let cartItem = cart[`${evt.target.id}`];
          if (cartItem) {
            cartItem.quantityOrdered =
              Number(cartItem.quantityOrdered) +
              Number(productQuantities[evt.target.id].quantity);
            cartItem.price = (
              cartItem.quantityOrdered *
              Number(productQuantities[evt.target.id].price)
            ).toFixed(2);
            cartItem.imageUrl = productQuantities[evt.target.id].imageUrl;
          } else {
            cart[`${evt.target.id}`] = {
              id: +evt.target.id,
              price: Number(productQuantities[evt.target.id].price).toFixed(2),
              quantityOrdered: Number(
                productQuantities[evt.target.id].quantity
              ),
              imageUrl: productQuantities[evt.target.id].imageUrl,
            };
          }
          let products = [];
          for (let key in cart) {
            products.push(cart[key]);
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          dispatch(gotCart({ products: products }));
        } else {
          let cart = {};
          cart[`${evt.target.id}`] = {
            id: +evt.target.id,
            price: Number(productQuantities[evt.target.id].price).toFixed(2),
            quantityOrdered: Number(productQuantities[evt.target.id].quantity),
            imageUrl: productQuantities[evt.target.id].imageUrl,
          };
          //make sure localStorage object has a products array
          let products = [];
          for (let key in cart) {
            products.push(cart[key]);
          }
          localStorage.setItem('cart', JSON.stringify(cart));
          dispatch(gotCart({ products: products }));
        }
      }
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (products.length > 0) {
    return (
      <div id="all-products-page">
        <main id="all-products">
          <div id="filtering">
            <h2>Filter by:</h2>
            <h3>Region:</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="region-filter"
                  defaultChecked
                  onChange={(evt) => {
                    if (evt.target.checked) {
                      setRegionFilter(0);
                    }
                  }}
                />
                {'All'}
              </label>
              <RegionMap
                regions={regions}
                regionFilter={regionFilter}
                setRegionFilter={setRegionFilter}
              />
            </div>
            <h3>Main Ingredient:</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="ingredient-filter"
                  defaultChecked
                  onChange={(evt) => {
                    if (evt.target.checked) {
                      setIngredientFilter(0);
                    }
                  }}
                />
                {'All'}
              </label>
              <IngredientsMap
                ingredients={ingredients}
                ingredientFilter={ingredientFilter}
                setIngredientFilter={setIngredientFilter}
              />
            </div>
            <p>
              <label
                htmlFor="search"
                style={{ fontWeight: 'bold', fontSize: '20px' }}
              >
                Search
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="What are you craving?"
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
              ></input>
            </p>
          </div>
          <div id="products">
            <RenderProducts
              search={search}
              regionFilter={regionFilter}
              ingredientFilter={ingredientFilter}
              tenProducts={tenProducts}
              products={products}
              setProductQuantities={setProductQuantities}
              addToCart={addToCart}
              productQuantities={productQuantities}
              numberWithCommas={numberWithCommas}
            />
          </div>
        </main>
        <div id="pagination-buttons">
          {search === ''
            ? pagesArr.map((page, i) => {
                return (
                  <button
                    className={
                      Number(props.location.search.split('=')[1]) === i + 1
                        ? 'current-page'
                        : ''
                    }
                    key={i}
                    onClick={() =>
                      props.history.push(`/products?page=${i + 1}`)
                    }
                  >
                    {i + 1}
                  </button>
                );
              })
            : null}
        </div>
      </div>
    );
  } else {
    return (
      <div id="all-products-page">
        <main id="all-products">
          <div id="filtering">
            <h2>Filter by:</h2>
            <h3>Region:</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="region-filter"
                  defaultChecked
                  onChange={(evt) => {
                    if (evt.target.checked) {
                      setRegionFilter(0);
                    }
                  }}
                />
                {'All'}
              </label>
              <RegionMap
                regions={regions}
                regionFilter={regionFilter}
                setRegionFilter={setRegionFilter}
              />
            </div>
            <h3>Main Ingredient:</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="ingredient-filter"
                  defaultChecked
                  onChange={(evt) => {
                    if (evt.target.checked) {
                      setIngredientFilter(0);
                    }
                  }}
                />
                {'All'}
              </label>
              <IngredientsMap
                ingredients={ingredients}
                ingredientFilter={ingredientFilter}
                setIngredientFilter={setIngredientFilter}
              />
            </div>
            <p>
              <label
                htmlFor="search"
                style={{ fontWeight: 'bold', fontSize: '20px' }}
              >
                Search
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="What are you craving?"
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
              ></input>
            </p>
          </div>
          <div id="products">
            <div id="no-vodka-left">
              <p>No vodka here</p>
              <img
                id="weirdge"
                src="https://cdn.discordapp.com/emojis/808088165985550337.webp?size=96&quality=lossless"
              />
            </div>
          </div>
        </main>
        <div id="pagination-buttons"></div>
      </div>
    );
  }
}

export default AllProducts;
