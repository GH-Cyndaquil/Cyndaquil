import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div id="home-container">
      <div id="home-text-container">
        <h1>Welcome to Nyet</h1>
        <p>Premium vodkas, never from Russia.</p>
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
