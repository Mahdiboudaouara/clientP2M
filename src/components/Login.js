import React from "react";
import { useState } from "react";
import Axios from "axios";


import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
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
      console.log("hey")
      const resp = await Axios.post("http://localhost:3001/api/user/login", {
        email: formValue.email,
        password: formValue.password,
      });

      if (resp.data) {
        localStorage.setItem('token', resp.data)
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
  <section class="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://media.istockphoto.com/id/1281553891/vector/auction-hammer-with-sold-text-line-icon-finance-concept-hitting-wooden-gavel-in-auction-sign.jpg?s=612x612&w=0&k=20&c=dnaIP5TRgGm_CJEL8cZUuivbUEfVZ20ESILJsiWGcIg="
          className="img-fluid" style={{width:'80%'}} alt="Phone image" />
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>

        <MDBValidation className='row g-3' isValidated>
        <div class="form-outline mb-4">

        <MDBValidationItem className='col-md-12' feedback='Please provide an email' invalid>
        <MDBInput
          value={formValue.email}
          name='email'
          onChange={onChange}
          id='validationCustom01'
          required
          label='Email'
        />
      </MDBValidationItem>
      </div>

      <div class="form-outline mb-4">

      <MDBValidationItem className='col-md-12' feedback='Please provide a password.' invalid>
        <MDBInput
          value={formValue.password}
          name='password'
          onChange={onChange}
          type='password'
          required
          label='Password'
        />
      </MDBValidationItem>
   
      </div>

      
         
          



        <button type='submit' className="btn btn-primary" onClick={LoginUser} >Sign In</button>
    </MDBValidation>
   
        </form>
        <p class="small mb-5 pb-lg-2"><a class=" text-right" href="#!">Forgot password?</a></p>
            <p>Don't have an account? <a href="/register" class="link-info text-right">Register here</a></p>
      </div>
    </div>
    
  </div>

</section>


  )
}
