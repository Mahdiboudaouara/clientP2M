import React from 'react'
import { FaSignInAlt } from "react-icons/fa";
import {FaSignOutAlt}  from "react-icons/fa";
import {FaHistory}  from "react-icons/fa";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();
  
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log(token);
      const user = jwtDecode(token);
      if (user.exp < Date.now() / 1000){
        localStorage.removeItem("token");
        setIsAuthenticated(false)
      }
      console.log("user:", user);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setIsAuthenticated(!isAuthenticated);
      }
    }
  }, []);
  console.log(isAuthenticated)
if(isAuthenticated)
{

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
            <a className="navbar-brand text-success logo h1 align-self-center" href="index.html">
                Zay
            </a>
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                <div className="flex-fill">
                    <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="index.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="about.html">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="shop.html">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="">
                <button >

                    <FaSignOutAlt  />
                    </button>
                  <button>
                    <FaHistory/>
                    </button>
                </div>
            </div>

        </div>
    </nav>
    
      
   
  )
}
else{
    return(    <nav className="navbar navbar-expand-lg navbar-light shadow">
    <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand text-success logo h1 align-self-center" href="index.html">
            Zay
        </a>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
            <div className="flex-fill">
                <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="index.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="about.html">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="shop.html">Shop</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
            <div className="">
               
              
                <a  href="/login">
                <FaSignInAlt/>
                </a>
            </div>
        </div>

    </div>
</nav>)
}}
