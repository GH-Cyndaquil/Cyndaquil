import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export class AdminAllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      products: [],
      name: "",
      price: "",
      quantity: "",
      description: "",
      imageUrl: "",
    };
  }

  async componentDidMount() {
    const { data } = await axios.get("api/adminproduct");
    this.setState({ products: data });
  }

  render() {
    const { products } = this.state;
    console.log(products);
    console.log("admin products user  ---- ", this.props.user);

    if (!products || products.length === 0) {
      return <h3>Loading</h3>;
    } else {
      return (
        <div className="adminBackground">
          <div className="single-product-div">
            <h1>Admin Page</h1>
            <h2>All Products</h2>
            {products.map((product) => (
              <div key={product.id}>
                <div>
                  <h3>{product.name}</h3>
                  <Link to={`/editproduct/${product.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={async () => {
                      await axios.delete(`/api/adminproduct/${product.id}`, {
                        data: { user: this.props.user },
                      });
                      window.location.reload();
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState, null)(AdminAllProducts);
