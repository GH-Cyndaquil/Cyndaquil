import React from "react";
import { useSelector } from "react-redux";

const SingleUser = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="adminblock">
      <h1>{user.username}</h1>
      <div>
        <h3>Admin Rights</h3>
        <p>{user.isAdmin}</p>
        <button>Edit Account</button>
      </div>
    </div>
  );
};

export default SingleUser;
