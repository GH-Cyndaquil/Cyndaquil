import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export class AllUsers extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = { users: [], isAdmin: false };
  }

  async componentDidMount() {
    const { data } = await axios.get("api/adminuser");
    this.setState({ users: data });
  }

  handleClick(id) {
    this.props.setUsers(id);
  }

  render() {
    const { users } = this.state;
    console.log(users);
    if (users.length === 0) {
      return <h3>Loading</h3>;
    } else {
      return (
        <div className="adminBackground">
          <div className="single-product-div">
            <h1>Admin Page</h1>
            <h2>All site Users</h2>
            {users.map((user) => (
              <div key={user.id}>
                <div>
                  <h3>{user.username}</h3>
                  <select
                    onChange={(e) => {
                      this.setState({ isAdmin: e.target.value });
                    }}
                  >
                    <option>Admin Status</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                  <button
                    onClick={async () => {
                      await axios.patch(`/api/adminuser/${user.id}`, {
                        isAdmin: this.state.isAdmin,
                        user: this.props.user,
                      });
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState, null)(AllUsers);
