import React from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../store/user";
import axios from "axios";
import { Link } from "react-router-dom";

export class AllUsers extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = { users: [] };
  }

  async componentDidMount() {
    const { data } = await axios.get("api/users");
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
                <Link to={`/user/${user.id}`}>
                  <div>
                    <h3>{user.username}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => ({
  users: state.user.allUsers,
});

const mapDispatch = (dispatch) => ({
  setAllUsers: () => dispatch(getAllUsers()),
});

export default connect(mapState, mapDispatch)(AllUsers);
