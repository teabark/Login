import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="Header">
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-end  py-3 mb-4 border-bottom">
          <div className="col-md-3 text-end">
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="btn btn-outline-primary me-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              type="button"
              className="btn btn-primary"
            >
              Sign-up
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
