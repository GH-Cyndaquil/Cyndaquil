import React from "react";
import { Link } from "react-router-dom";

export const AdminPage = () => {
  return (
    <>
      <div className="adminblock">
        <h1>Admin Page</h1>
        <button>
          <Link to="/adminrights">Admin Rights</Link>
        </button>
        <button>
          <Link to="/addproduct">Add Product</Link>
        </button>
      </div>
    </>
  );
};

export default AdminPage;
