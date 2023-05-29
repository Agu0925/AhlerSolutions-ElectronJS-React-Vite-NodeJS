import { Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SumLogin } from "./Components";

export const Login = () => {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center text-white">
      <div className="col-md-4 p-5 shadow-sm border rounded-5 border-white">
        <h2 className="text-center mb-4 text-border-white">Login Form</h2>
        <Form id="loginForm" onSubmit={SumLogin}>
          <div className="mb-3">
            <label htmlFor="LoginEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control bg-info bg-opacity-10 border border-white text-white"
              id="LoginEmail"
              pattern="^\S*$"
              required
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="LoginPass" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-info bg-opacity-10 border border-white text-white"
              id="LoginPass"
              pattern="^\S*$"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="text-center">
            <label
              className="text-danger"
              id="errorLogin"
              htmlFor="loginForm"
            ></label>
          </div>
          <p className="small">
            <Link className="text-border-white" to="forget-password.html">
              Forgot password?
            </Link>
          </p>
          <div className="d-grid">
            <button id="btnLogin" className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
        <div className="mt-3">
          <p className="mb-0 text-center">
            Don't have an account?
            <Link to="/SignUp" className="text-border-white fw-bold ms-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = "http://localhost:3000/";
    let objeto = {
      name: name,
      email: email.toLowerCase(),
      pass: password,
      pass2: password2,
    };
    fetch(url + "signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objeto), // data can be `string` or {object}!
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          document.getElementById("errorSignup").innerHTML = "";
          location.href = "/Login";
        } else {
          document.getElementById("errorSignup").innerHTML = data.res;
        }
      });
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center text-white">
      <div className="col-md-4 p-5 shadow-sm border rounded-5 border-white">
        <h2 className="text-center mb-4 text-border-white">SignUp Form</h2>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input
                type="text"
                id="name"
                className="form-control bg-dark text-white"
                maxLength="20"
                pattern="^\S*$"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label className="form-label" htmlFor="name">
                Your Name
              </label>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input
                type="email"
                id="email"
                className="form-control bg-dark text-white"
                minLength="5"
                maxLength="100"
                pattern="^\S*$"
                required
                value={email}
                autoComplete="new-username"
                onChange={(event) => setEmail(event.target.value)}
              />
              <label className="form-label" htmlFor="email">
                Your Email
              </label>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input
                type="password"
                id="pass"
                className="form-control bg-dark text-white"
                minLength="6"
                maxLength="20"
                pattern="^\S*$"
                required
                value={password}
                autoComplete="new-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <label className="form-label" htmlFor="pass">
                Password
              </label>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-2">
            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input
                type="password"
                id="pass2"
                className="form-control bg-dark text-white"
                minLength="6"
                maxLength="20"
                pattern="^\S*$"
                required
                value={password2}
                autoComplete="new-password"
                onChange={(event) => setPassword2(event.target.value)}
              />
              <label className="form-label" htmlFor="pass2">
                Repeat your password
              </label>
            </div>
          </div>

          <div className="text-center">
            <label
              className="text-danger mb-4"
              id="errorSignup"
              htmlFor="signupForm"
            ></label>
          </div>
          <div className="form-check d-flex justify-content-center mb-3">
            <input
              className="form-check-input me-2 bg-dark text-white border-white"
              type="checkbox"
              value=""
              id="checkSignUp"
              required
            />
            <label className="form-check-label" htmlFor="form2Example3">
              I agree all statements in {""}
              <Link to="#!">Terms of service</Link>
            </label>
          </div>
          <div className="d-flex justify-content-center mx-4 mb-3">
            <button
              id="register"
              type="submit"
              className="btn btn-primary btn-lg"
            >
              Register
            </button>
          </div>
          <div>
            <p className="mb-0 text-center">
              You have an account? {""}
              <Link to="/Login" className="text-border-white fw-bold">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};
