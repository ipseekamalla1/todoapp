import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();



  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
 const handleSubmitButton= async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:8848/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        navigate('/');
      }
      else{
        navigate('/login')
  
      }

 }

  return (
    <>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                  <form
                    method="POST"
                    className="needs-validation"
                    
                    autoComplete="off"
                    onSubmit={handleSubmitButton}
                  >
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        value={credentials.email}
                        required
                    
                        onChange={onChange}
                        
                      />
                      <div className="invalid-feedback">Email is invalid</div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">
                          Password
                        </label>
                        <a href="forgot.html" className="float-end">
                          Forgot Password?
                        </a>
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={credentials.password}
                        className="form-control"
                        name="password"
                        required
                        onChange={onChange}
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="remember"
                          id="remember"
                          className="form-check-input"
                        />
                        <label htmlFor="remember" className="form-check-label">
                          Remember Me
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary ms-auto">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-dark">
                      Create One
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
      </section>
    </>
  );
};

export default Login;
