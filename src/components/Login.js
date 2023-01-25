import React from "react";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-hot-toast";



import {
  MDBInput
} from 'mdb-react-ui-kit';

export default function Login() {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  console.log(formValue)


  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };


  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const resp = await Axios.post("http://localhost:3001/api/user/login", {
        email: formValue.email,
        password: formValue.password,
      });

      if (resp.data) {
        localStorage.setItem('token', resp.data)
        setisLoggedIn(true)
        toast.success("Welcome back :)", {
          position: "bottom-center",
          duration: 5000,
        });
      }


    } catch (error) {
      if (error.response) {
        toast.error('Please enter a valid Email/Password');

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
  <section class="vh-100 a">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://media.istockphoto.com/id/1281553891/vector/auction-hammer-with-sold-text-line-icon-finance-concept-hitting-wooden-gavel-in-auction-sign.jpg?s=612x612&w=0&k=20&c=dnaIP5TRgGm_CJEL8cZUuivbUEfVZ20ESILJsiWGcIg="
          className="img-fluid" style={{width:'60%'}} alt="Phone image" />
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>

        <div class="form-outline mb-4">

        <MDBInput
          value={formValue.email}
          name='email'
          onChange={onChange}
          id='validationCustom01'
          required
          label='Email'
        />
      </div>

      <div class="form-outline mb-4">

        <MDBInput
          value={formValue.password}
          name='password'
          onChange={onChange}
          type='password'
          required
          label='Password'
        />
   
      </div>
      <div class="d-flex justify-content-around align-items-center mb-4">
            <div class="form-check">
              <input class="form-check-input b" type="checkbox" value="" id="form1Example3" checked />
              <label class="form-check-label" for="form1Example3"> Remember me </label>
            </div>
            <a href="#!">Forgot password?</a>
          </div>
        <button type='submit' className="btn btn-primary btn-block" onClick={LoginUser} >Sign In</button>
   
        </form>
        
        <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>
            <p> <a href="/register" class="link-info text-right">Register here</a></p>
      </div>
    </div>
    
  </div>


</section>


  )
}
