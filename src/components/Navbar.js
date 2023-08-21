import React, { useEffect,useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  const isAuthenticated = !!localStorage.getItem("token");
  const [userDetails, setUserDetails] = useState({
    email: localStorage.getItem("email"),
    userName: localStorage.getItem("userName"),
  });  

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
        <span className="navbar-text">
        {isAuthenticated ? `Hello ${userDetails.userName}` : "Hello Guest"}
        
            </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            
            {!isAuthenticated ? (
              <form className="d-flex">
                <Link
                  className="btn btn-warning mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link className="btn btn-warning" to="/signup" role="button">
                  Signup
                </Link>
              </form>
            ) : (
              <button onClick={handleLogout} className="btn btn-warning">
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
