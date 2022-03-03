import React from "react";

const AddForm = (props) => {
  const {
    handleSubmit,
    handleChange,
    name,
    price,
    imageUrl,
    quantity,
    description,
  } = props;
  return (
    <form
      className="UpdateProductForm"
      method="POST"
      action="/"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Product Name</label>
      <input
        className="ProductFormInput"
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <label htmlFor="imageUrl">Product Image</label>
      <input
        className="ProductFormInput"
        type="text"
        name="imageUrl"
        value={imageUrl}
        onChange={handleChange}
      />
      <label htmlFor="price">Product Price</label>
      <input
        className="ProductFormInput"
        type="number"
        min="1"
        step="any"
        name="price"
        value={price}
        onChange={handleChange}
      />
      <label htmlFor="quantity">Product Quantity</label>
      <input
        className="ProductFormInput"
        type="number"
        min="1"
        step="any"
        name="quantity"
        value={quantity}
        onChange={handleChange}
      />
      <label htmlFor="description">Product Description</label>
      <input
        className="ProductFormInput"
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
      />
      <button
        disabled={name === "" || price === 0 || imageUrl === ""}
        className="ButtonUpdateProduct ProductFormLabel"
        type="submit"
      >
        Update Product
      </button>
    </form>
  );
};

export default AddForm;
