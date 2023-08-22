import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // New state for loading status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    userName: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const userName = localStorage.getItem("userName");

    setIsAuthenticated(!!token);
    setUserDetails({
      email: email || "",
      userName: userName || "",
    });

    setIsLoading(false); // Set loading state to false once data is fetched
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setUserDetails({
      email: "",
      userName: "",
    });
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <h2 className="navbar-text">
            {isAuthenticated
              ? `Welcome to your app ${userDetails.userName || ""}`
              : "Hello Guest"}
          </h2>

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
