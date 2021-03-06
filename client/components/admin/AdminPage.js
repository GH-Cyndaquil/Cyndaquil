import React from "react";
import { Link } from "react-router-dom";

export const AdminPage = () => {
  return (
    <>
      <div className="adminBackground">
        <div className="adminblock">
          <h1 className="adminHeader">Administrative Tools</h1>
          <button>
            <Link to="/adminalluser">Edit Users</Link>
          </button>
          <> </>
          <button>
            <Link to="/adminProducts">Edit Product</Link>
          </button>
          <> </>
          <button>
            <Link to="/addproduct">Add Products</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
