import React, { useState, useEffect } from "react";
import axios from "axios";
import { calculateTimeLeft , calculateTimeIn } from "../utils/utils.ts";
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
  const [startBid, setStartBid] = useState(date> Date.now()  ? false : true);
   console.log(startBid)

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
  const [timeLeft, setTimeLeft] = useState(date> Date.now() ? calculateTimeLeft(date) : calculateTimeIn(date));

  React.useEffect(() => {
    getCategoryName(category_id)
    setTimeout(() => setTimeLeft(date> Date.now()  ? calculateTimeLeft(date) : calculateTimeIn(date) ), 1000);
    setStartBid(date> Date.now()  ? false : true)

  }, []);


  React.useEffect(() => {
    setTimeout(() => setTimeLeft(date> Date.now() ? calculateTimeLeft(date) : calculateTimeIn(date) ), 1000);
    setStartBid(date> Date.now()  ? false : true)
  }, [timeLeft]);
  return (
    <div className="col-12 col-md-4 mb-4 ">
      <div className="card h-100 ">
        <div class="container ">
          <a href={ch}>
            <img
              src={image}
              width="150px"
              height="250px"
              className="card-img-top"
              alt="..."
            ></img>
          </a>
          <div
            class="centered"
            style={startBid ? { backgroundColor: "#32c36c" } : {}}
          >
            <p style={startBid ? { color: "white" } : {}}>
              {String(timeLeft.days).padStart(2, "0")}D:{" "}
              {String(timeLeft.hours).padStart(2, "0")}H:{" "}
              {String(timeLeft.minutes).padStart(2, "0")}M:{" "}
              {String(timeLeft.seconds).padStart(2, "0")}S:{" "}
            </p>
          </div>
          
        </div>
        <div className="card-body ">
          <ul className="list-unstyled d-flex justify-content-between">
            <li></li>
            <li className="text-muted text-right">{bidding_price}DT</li>
          </ul>
          <div className="right">
            <a href={ch} className="h2 text-decoration-none text-dark">
              {name}
            </a>
            <p className="card-text">{description}</p>

            <p className="card-text">category : {categoryName}</p>
            <p className="text-muted">{startBid ? "Start Bidding Now" : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
