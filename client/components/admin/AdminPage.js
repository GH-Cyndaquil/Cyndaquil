import React from "react";
import { Link } from "react-router-dom";

export const AdminPage = () => {
  return (
    <>
      <div className="adminblock">
        <h1 className="adminHeader">Administarative Tools</h1>
        <button>
          <Link to="/adminuser">Edit Users</Link>
        </button>
        <> </>
        <button>
          <Link to="/adminProduct">Edit Product</Link>
        </button>
        <> </>
        <button>
          <Link to="/addproduct">Add Products</Link>
        </button>
      </div>
    </>
  );
};

export default AdminPage;
