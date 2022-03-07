import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/user";
import axios from "axios";

const AdminUser = (props) => {
  const [user, setUser] = useState({});
  console.log(user);
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    isAdmin: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `/api/AdminUser/${props.match.params.id}`
      );
      setNewUser(data);
    };
    fetchUser();
  }, []);
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user.id, newUser));
    props.history.push(`/users/${user.id}`);
  };

  return (
    <div className="adminBackground">
      <div>
        <div className="single-product-div">
          <form onSubmit={handleSubmit}>
            <div className="form-element">
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input
                name="firstName"
                type="text"
                onChange={handleChange}
                value={newUser.firstName}
              />
            </div>
            <div className="form-element">
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input
                name="lastName"
                type="text"
                onChange={handleChange}
                value={newUser.lastName}
              />
            </div>
            <div className="form-element">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                name="email"
                type="text"
                onChange={handleChange}
                value={newUser.email}
              />
            </div>
            <div className="form-element">
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input
                name="username"
                type="text"
                onChange={handleChange}
                value={newUser.username}
              />
            </div>
            <div className="form-element">
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <input
                name="address"
                type="text"
                onChange={handleChange}
                value={newUser.address}
              />
            </div>
            <div className="form-element">
              <label htmlFor="city">
                <small>City</small>
              </label>
              <input
                name="city"
                type="text"
                onChange={handleChange}
                value={newUser.city}
              />
            </div>
            <div className="form-element">
              <label htmlFor="state">
                <small>State</small>
              </label>
              <input
                name="state"
                type="text"
                onChange={handleChange}
                value={newUser.state}
              />
            </div>
            <div className="form-element">
              <label htmlFor="postalCode">
                <small>Postal Code</small>
              </label>
              <input
                name="postalCode"
                type="text"
                onChange={handleChange}
                value={newUser.postalCode}
              />
            </div>
            <div className="form-element">
              <label htmlFor="isAdmin">
                <small>Admin Rights</small>
              </label>
              <input
                name="isAdmin"
                type="boolean"
                onChange={handleChange}
                value={newUser.isAdmin}
              />
            </div>
            <button type="submit">Submit Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
