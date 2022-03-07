import React from "react";

const EditProductForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input
          name="name"
          type="text"
          onChange={props.handleChange}
          value={props.name}
        />
        <p> </p>
        <label htmlFor="description"> Description: </label>
        <input
          name="description"
          type="text"
          onChange={props.handleChange}
          value={props.description}
        />
        <p> </p>
        <label htmlFor="price"> Price: </label>
        <input
          name="price"
          type="number"
          onChange={props.handleChange}
          value={props.price}
        />
        <p> </p>
        <label htmlFor="imageUrl"> Image Url: </label>
        <input
          name="imageUrl"
          type="text"
          onChange={props.handleChange}
          value={props.imageUrl}
        />
        <p> </p>
        <label htmlFor="quantity"> Quantity: </label>
        <input
          name="quantity"
          type="number"
          onChange={props.handleChange}
          value={props.quantity}
        />
        <p> </p>
        <div>
          <button type="submit"> Submit Changes </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
