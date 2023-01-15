import React from "react";
import { useState } from "react";
import Axios from "axios";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setisLoggedIn] = React.useState(false);
    

  const LoginUser = async (e) => {
    e.preventDefault();
      try {
        const resp=await Axios.post("http://localhost:3001/api/user/login", {
          email: email,
          password: password,
        });
        
        if(resp.data){
          localStorage.setItem('token',resp.data)
          setisLoggedIn(true)
          alert('Login successful')
        }

        
      } catch (error) {
        if (error.response) {
          console.log("error")
        }
      }
      
    } 
    React.useEffect(() => {
      console.log(isLoggedIn)
      if (isLoggedIn) {
        window.location.href = '/';
      }
    }, [isLoggedIn]);
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
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
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              onClick={LoginUser}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="/">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
