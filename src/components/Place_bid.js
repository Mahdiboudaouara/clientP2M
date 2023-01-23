import React from 'react'
import { useParams } from "react-router-dom";
import { useState } from "react";


import {
    MDBInput
} from 'mdb-react-ui-kit';

export default function Place_bid(props) {
    let isAuthenticated = props.isAuthenticated
    const [formValue, setFormValue] = useState({
        price: 5,
        intial_price:5,
      });
      console.log(isAuthenticated)
 
      const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
      };
    let { productid } = useParams();
    console.log(productid)

    return (
        <section class="bg-light">
            <div class="container pb-5">
                <div class="row">
                    <div class="col-lg-5 mt-5">
                        <div class="card mb-3">
                            <img class="card-img img-fluid" src="https://i.ytimg.com/vi/1EW0ssU9eF0/maxresdefault.jpg" alt="Card image cap" id="product-detail" />
                        </div>
                        <div class="row">
                          
                            <div id="multi-item-example" class="col-10 carousel slide carousel-multi-item" data-bs-ride="carousel">
                                <div class="carousel-inner product-links-wap" role="listbox">





                                </div>
                            </div>
                          
                        </div>
                    </div>
                    <div class="col-lg-7 mt-5">
                        <div class="card">
                            <div class="card-body">
                                <h1 class="h2">Active Wear</h1>
                                <p class="h3 py-2">$25.00</p>
                                <p class="py-2">

                                    <span class="list-inline-item text-dark">36 bid</span>
                                </p>
                                <ul class="list-inline">
                                    <li class="list-inline-item">
                                        <h6>Brand:</h6>
                                    </li>
                                    <li class="list-inline-item">
                                        <p class="text-muted"><strong>Easy Wear</strong></p>
                                    </li>
                                </ul>

                                <h6>Description:</h6>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse. Donec condimentum elementum convallis. Nunc sed orci a diam ultrices aliquet interdum quis nulla.</p>




                                <input type="hidden" name="product-title" value="Activewear" />
                                {props.isAuthenticated === true ? 
                                <div class="row">

                                    <div class="col-auto">
                                        <ul class="list-inline pb-3">
                                                <MDBInput
                                                    value={formValue.price}
                                                    onChange={onChange}
                                                    name='price'
                                                    type='number'
                                                    min={formValue.intial_price}
                                                    required
                                                    label='place a bid'
                                                />
                                                
                                        </ul>
                                    </div>
                                    <div class="row pb-3">
                                    <div class="col d-grid">
                                        <button type="submit" class="btn btn-success btn-lg" name="submit" value="addtocard">Place a Bid</button>
                                    </div>
                                </div></div> : <div className='color'>Please <a href='/signup'>sign up</a> to place a bid</div>}

                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
