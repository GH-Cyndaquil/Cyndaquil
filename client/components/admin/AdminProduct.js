import React from "react";
import EditProductsForm from "./EditProductsForm";
import { connect } from "react-redux";
import { adminEditProduct } from "../../store/products";

export class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      quantity: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    try {
      //update the product with new values. call method from store. check API

      this.props.editProduct({ ...this.props.product, ...this.state });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="adminBackground">
        <div className="single-product-div">
          <h1> Edit Product: </h1>
          <EditProductsForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            title={this.state.name}
            description={this.state.description}
            price={this.state.price}
            imageUrl={this.state.imageUrl}
            quantity={this.state.quantity}
          />
        </div>
      </div>
    );
  }
}

/* const mapToState = state => ({
  product: state.product
}) */

const mapToDispatch = (dispatch) => ({
  adminEditProduct: (product) => dispatch(adminEditProduct(product)),
});

export default connect(null, mapToDispatch)(EditProduct);
