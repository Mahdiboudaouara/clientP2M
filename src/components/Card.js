import React, { useState, useEffect } from "react";
import axios from "axios";
import { calculateTimeLeft } from "../utils/utils.ts";
import "../../src/index.css";

export default function Card(props) {
  let date = props.date;
  let name = props.name;
  let description = props.description;
  let image = props.image;
  let bidding_price = props.bidding_price;
  let category_id=props.category_id;
  console.log('category_id',category_id)
  let id = props.id;
  let ch = `/bid/${id}`;
  const [categoryName, setCategoryName] = useState([]);

  const getCategoryName = async (category_id) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/auction/getcategory/${category_id}`
      );
      setCategoryName(res.data.category);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getCategoryName(category_id)
  }, []);


  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));
  React.useEffect(() => {
    setTimeout(() => setTimeLeft(calculateTimeLeft(date)), 1000);
  }, [timeLeft]);
  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card h-100">
        <div class="container">
          <a href={ch}>
            <img src={image} width="300px" height="430px" className="card-img-top" alt="..."></img>
          </a>
          <div class="centered">
            <p>
              {String(timeLeft.days).padStart(2, "0")}D:{" "}
              {String(timeLeft.hours).padStart(2, "0")}H:{" "}
              {String(timeLeft.minutes).padStart(2, "0")}M:{" "}
              {String(timeLeft.seconds).padStart(2, "0")}S
            </p>
          </div>
        </div>
        <div className="card-body">
          <ul className="list-unstyled d-flex justify-content-between">
            <li>
              <i className="text-warning fa fa-star"></i>
              <i className="text-warning fa fa-star"></i>
              <i className="text-warning fa fa-star"></i>
              <i className="text-muted fa fa-star"></i>
              <i className="text-muted fa fa-star"></i>
            </li>
            <li className="text-muted text-right">{bidding_price}DT</li>
          </ul>
          <a href={ch} className="h2 text-decoration-none text-dark">
            {name}
          </a>
          <p className="card-text">{description}</p>
          <p className="card-text">category : {categoryName}</p>
          <p className="text-muted">Reviews (48)</p>
        </div>
      </div>
    </div>
  );
}
