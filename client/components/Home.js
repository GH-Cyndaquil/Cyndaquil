import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div id="home-container">
      <div id="home-text-container">
        <p></p>
        <p></p>
        <p></p>
        <h1>Welcome to Nyet</h1>
        <h2>Premium vodkas, never from Russia.</h2>
        <Link to="/products?page=1">
          <button id="shop-now">Shop Now</button>
        </Link>
      </div>
      <div id="home-background"></div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.user.username,
  };
};

export default connect(mapState)(Home);
