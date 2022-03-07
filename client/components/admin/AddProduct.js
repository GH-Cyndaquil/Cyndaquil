import React from "react";
import { connect } from "react-redux";
import createProduct from "../../store/products";
import AddForm from "./AddProductForm";

class CreateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: 0,
      imageUrl: "",
      quantity: 0,
      description: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    try {
      event.preventDefault();
      this.props.addProduct(this.state);
      const { name, price, imageUrl, quantity, description } = this.state;
      this.setState({
        name: name,
        price: price,
        imageUrl: imageUrl,
        quantity: quantity,
        description: description,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange(event) {
    try {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="adminBackground">
        <div className="single-product-div">
          <div>
            <h1 className="productHeader">ADD PRODUCT</h1>
            <AddForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              name={this.state.name}
              price={this.state.price}
              imageUrl={this.state.imageUrl}
              quantity={this.state.quantity}
              description={this.state.description}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(createProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
