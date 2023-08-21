import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
    gender: "",
  });
  const [phoneNumberError, setPhoneNumberError] = useState(""); // State for phone number error message
  const [passwordMatchError, setPasswordMatchError] = useState(""); // State for password match error message

  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      phoneNumber,
      gender,
    } = credentials;
    const response = await fetch(`http://localhost:8848/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        userName,
        email,
        password,
        phoneNumber,
        gender,
      }),
    });

    if (credentials.phoneNumber.length !== 10) {
      setPhoneNumberError("Phone number should be 10 digits");
      return;
    } else {
      setPhoneNumberError(""); // Clear the error message if the phone number is valid
    }
    
    if (credentials.password !== credentials.cpassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    } else {
      setPasswordMatchError(""); // Clear the error message if passwords match
    }

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token',json.authtoken);
      navigate("/login");
      props.showAlert("Account created Successfully","success")
    } else {
      props.showAlert("Invalid Credentials","danger")
    }
  };

  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmitButton} className="needs-validation">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      onChange={onChange}
                      name="firstName"
                      
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    onChange={onChange}
                    minLength={8}
                    required={true}
                    
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${passwordMatchError ? "is-invalid" : ""}`}
                    id="cpassword"
                    name="cpassword"
                    onChange={onChange}
                    required
                  />
                  {passwordMatchError && (
                  <div className="invalid-feedback">{passwordMatchError}</div>
                )}
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                       type="text" // Change the input type to "text"
                       className={`form-control ${phoneNumberError ? "is-invalid" : ""}`}
                      id="phoneNumber"
                      name="phoneNumber"
                      onChange={onChange}
                      title="Enter 10 digits phone number"
                     
                      required
                    />
                    {phoneNumberError && (
                <div className="invalid-feedback">{phoneNumberError}</div>
              )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <select
                      className="form-select"
                      id="gender"
                      name="gender"
                      onChange={onChange}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary ms-auto">
                  Create Your Account
                </button>
              </form>
            </div>
            <div className="card-footer py-3 border-0">
              <div className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-dark">
                  Login Here
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-5 text-muted">
            Copyright &copy; 2023 &mdash; To Do App
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
