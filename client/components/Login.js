import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../store";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticate(username, password, "login"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input
            name="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form-element">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
