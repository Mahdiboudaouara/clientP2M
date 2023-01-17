import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Register() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(5, "trop petit")
        .max(50, "trop long!")
        .required("Ce champ est obligatoire"),
    email: Yup.string()
        .email("email invalide")
        .required("l'email est obligatoire"),
    password: Yup.string()
        .required("Mot de passe est obligatoire")
        .min(8, "Mot de passe doit être plus grand que 8 caractères")
        .max(50, "Mot de passe doit être plus petit que 50 caractères"),
    confirmPassword: Yup.string()
        .required("Confirmation de mot de passe est obligatoire")
        .oneOf(
            [Yup.ref("password"), null],
            "Le mot de passe de confirmation ne correspond pas"
        ),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};
const handleSubmit = (values) => {
  console.log(initialValues)
  addUser(values)

};
  const navigate = useNavigate();


  const addUser = async (values) => {

 
      try {
        
        await Axios.post("http://localhost:3001/api/user/register", {
          name: values.firstName,
          email: values.email,
          password: values.password,
        });
        navigate("/login");
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      }
    
      console.log("Passwords don't match!");
    }
  
  return (
    <section class="vh-100">
    <div className="container py-5 h-100">
      <div className="row d-flex align-items-center justify-content-center h-100">
        <div className="col-md-8 col-lg-7 col-xl-6">
          <img src="https://media.istockphoto.com/id/1281553891/vector/auction-hammer-with-sold-text-line-icon-finance-concept-hitting-wooden-gavel-in-auction-sign.jpg?s=612x612&w=0&k=20&c=dnaIP5TRgGm_CJEL8cZUuivbUEfVZ20ESILJsiWGcIg="
            className="img-fluid" style={{width:'80%'}} alt="Phone image" />
        </div>
        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <h1>Register</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) =>handleSubmit(values)}
            >
                {({ resetForm }) => (
                    <Form>
                        <div className="form-group mb-3">
                        <label  htmlFor="loginName">
                                Prénoms:
                            </label>
                            <Field
                                type="text"
                                id="firstName"
                                name="firstName"
                                class="form-control"
                            />
                            
                            <ErrorMessage
                                name="firstName"
                                component="small"
                                className="text-danger"
                            />
                        </div>
                       
                        <div className="form-group mb-3">
                            <label htmlFor="email">
                                Email:
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                
                               
                            />
                            <ErrorMessage
                                name="email"
                                component="small"
                                className="text-danger"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">
                                Mot de passe:
                            </label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="password"
                                component="small"
                                className="text-danger"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="confirmPassword">
                                Confirmer le mot de
                                passe:
                            </label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="small"
                                className="text-danger"
                            />
                        </div>
                     
                        <div className="form-group d-flex justify-content-end gap-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                S'inscrire
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="btn btn-danger"
                            >
                                Annuler
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
      </div>
    </div>
    
  </div>

</section>

  );
}
