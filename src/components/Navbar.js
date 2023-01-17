import React from 'react'
import { FaSignInAlt } from "react-icons/fa";
import {FaSignOutAlt}  from "react-icons/fa";
import {FaHistory}  from "react-icons/fa";


export default function Navbar(props) {
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
                    {props.isAuthenticated===true ? <a  onClick={()=>console.log("tthht")}><FaHistory/></a> : <a></a>}
                
                  <a><FaSignOutAlt  />
                    
                    </a>
                </div>
            </div>

        </div>
    </nav>
    
      
   
  )
  }

