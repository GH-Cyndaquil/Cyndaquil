import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers, deleteUser } from "../store/user";

export class AllUsers extends Component {
  constructor() {
    super();
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  deleteUser(id) {
    this.props.deleteUser(id);
  }
  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <h2>All site Users</h2>
        {this.props.users.map((user) => (
          <div key={user.id}>
            <Link to={`/user/${user.id}`}>
              <div>
                <h3>{user.name}</h3>
              </div>
            </Link>
            <button type="button" onClick={() => this.deleteUser(user.id)}>
              Delete this user
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.allUsers,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
