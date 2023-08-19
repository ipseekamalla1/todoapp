import React from 'react'

const Navbar = () => {
  return (
    <div>
      {/* Navbar */}
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              
            </ul>
            
            <button className="btn btn-warning mx-2">
                Login
              </button>
              <button className="btn btn-warning mx-2">
                Signup
              </button>
        
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
