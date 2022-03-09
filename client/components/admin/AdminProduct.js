import axios from "axios";
import React from "react";
import { connect } from "react-redux";

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

  async componentDidMount() {
    const { data } = await axios.get(
      `/api/adminproduct/${this.props.match.params.id}`
    );
    this.setState({ ...data });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await axios.put(`/api/adminproduct/${this.props.match.params.id}`, {
      ...this.state,
      user: this.props.user,
    });
    this.props.history.push("/adminproducts");
  }

  render() {
    return (
      <div className="adminBackground">
        <div className="single-product-div">
          <h2>Edit Item</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name"> Name: </label>
            <input
              name="name"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
            />
            <p> </p>
            <label htmlFor="description"> Description: </label>
            <input
              name="description"
              type="text"
              onChange={this.handleChange}
              value={this.state.description}
            />
            <p> </p>
            <label htmlFor="price"> Price: </label>
            <input
              name="price"
              type="number"
              onChange={this.handleChange}
              value={this.state.price}
            />
            <p> </p>
            <label htmlFor="imageUrl"> Image Url: </label>
            <input
              name="imageUrl"
              type="text"
              onChange={this.handleChange}
              value={this.state.imageUrl}
            />
            <p> </p>
            <label htmlFor="quantity"> Quantity: </label>
            <input
              name="quantity"
              type="number"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
            <p> </p>
            <div>
              <button type="submit"> Submit Changes </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState, null)(EditProduct);
