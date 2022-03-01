import React, { useEffect } from "react";

function AllProducts(props) {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    //grab all products from DB
  });

  //define addToCart function here

  return (
    <main>
      {products.map((product) => {
        <div>
          <img src={product.imageUrl} />
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
          <input type="number" value="1"></input>
          <button className="addToCart" onClick={(evt) => addToCart(evt)}>
            Add to Cart
          </button>
        </div>;
      })}
    </main>
  );
}

export default AllProducts;
