import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const addUser = async (e) => {

    e.preventDefault();
    console.log(name)
    console.log(email)
    console.log(password)
    if (password === confirmPassword) {
      try {
        
        await Axios.post("http://localhost:3001/api/user/register", {
          name: name,
          email: email,
          password: password,
        });
        navigate("/login");
      } catch (error) {
        if (error.response) {
          console.log("asba")
          console.log(error.response.data.msg);
        }
      }
    } else {
      console.log("Passwords don't match!");
    }
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="form-group mt-3">
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="text"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                className="form-control mt-1"
                placeholder="Enter Name"
              />
            </div>
            <label>Email address</label>
            <input
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              className="form-control mt-1"
              placeholder="Confirm Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={addUser} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
