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
  const [startTime, setStartTime] = useState(new Date(date));
  const [elapsedTime, setElapsedTime] = useState(Date.now() - startTime.getTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(Date.now() - startTime.getTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [startTime]);

  function getTime() {
    const hours = Math.floor(elapsedTime / (60 * 60 * 1000));
    const minutes = Math.floor((elapsedTime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
    return { hours, minutes, seconds };
  }

  const { hours, minutes, seconds } = getTime();
  return (
    <div className="col-12 col-md-4 mb-4 ">
      <div className="card h-100 ">
        <div class="container ">
          <a href={ch}>
            <img src={image} width="150px" height="250px" className="card-img-top" alt="..."></img>
          </a>
          { timeLeft.days!==undefined  ?
          <div class="centered">
            <p>
              {String(timeLeft.days).padStart(2, "0")}D:{" "}
              {String(timeLeft.hours).padStart(2, "0")}H:{" "}
              {String(timeLeft.minutes).padStart(2, "0")}M:{" "}
              {String(timeLeft.seconds).padStart(2, "0")}S
            </p>
          </div>: <div class="centered heyh">  <p>
              {String(hours).padStart(2, "0")}H:{" "}
              {String(minutes).padStart(2, "0")}M:{" "}
              {String(seconds).padStart(2, "0")}S
            </p></div>
}
        </div>
        <div className="card-body ">
          <ul className="list-unstyled d-flex justify-content-between">
            <li>
            
            </li>
            <li className="text-muted text-right">{bidding_price}DT</li>
          </ul>
          <div className="right">
          <a href={ch} className="h2 text-decoration-none text-dark">
            {name}
          </a>
          <p className="card-text">{description}</p>
          <p className="card-text">Category : {categoryName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
