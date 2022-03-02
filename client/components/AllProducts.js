import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllProducts(props) {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
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
