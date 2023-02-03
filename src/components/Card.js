import React, { useState, useEffect } from "react";
import axios from "axios";
import { calculateTimeLeft, calculateTimeIn } from "../utils/utils.ts";
import "../../src/index.css";

export default function Card(props) {
  let date = props.date;
  let name = props.name;
  let description = props.description;
  let image = props.image;
  let bidding_price = props.bidding_price;
  let category_id = props.category_id;
  let id = props.id;
  let shop = props.shop;
  let ch = `/bid/${id}`;
  const [categoryName, setCategoryName] = useState([]);
  const [startBid, setStartBid] = useState(false);
  const [price, setPrice] = useState(0);
  const [timeLeft, setTimeLeft] = useState(Date(date));
  const timer = async (date) => {
    if (date > Date.now()) {
      setTimeout(() => setTimeLeft(calculateTimeLeft(date), 1000));
      setStartBid(false);
    } else {
      setTimeout(() => setTimeLeft(calculateTimeIn(date), 1000));
      setStartBid(true);
    }
  };
  useEffect(() => {
    const getLastBid = async (product_id) => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/bid/${product_id}`
        );
        if (res.data.bidAmount) {
          setPrice(res.data.bidAmount);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLastBid(props.id)
  }, []);

  useEffect(() => {
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

    getCategoryName(category_id);
    timer(Date(date));
  }, [props]);

  useEffect(() => {
    setTimeout(
      () =>
        setTimeLeft(
          date > Date.now() ? calculateTimeLeft(date) : calculateTimeIn(date)
        ),
      1000
    );
    setStartBid(date > Date.now() ? false : true);
  }, [timeLeft, props]);
  return (
    <div className={`col-12 col-md-${shop ? 6 :4} mb-4 `}>
      <div className="card h-100 ">
        <div className="container ">
          <a href={ch}>
            <img
              src={image}
              width="150px"
              height="330px"
              className="card-img-top"
              alt="..."
            ></img>
          </a>
          <div
            className="centered"
            style={startBid ? { backgroundColor: "#32c36c" } : {}}
          >
            <p style={startBid ? { color: "white" } : {}}>
              {String(timeLeft.days).padStart(2, "0")}D:{" "}
              {String(timeLeft.hours).padStart(2, "0")}H:{" "}
              {String(timeLeft.minutes).padStart(2, "0")}M:{" "}
              {String(timeLeft.seconds).padStart(2, "0")}S
            </p>
          </div>
        </div>
        <div className="card-body ">
          <ul className="list-unstyled d-flex justify-content-between">
            <li></li>
            <li className="text-muted text-right">{price==bidding_price ?  `Starting Price ${bidding_price}`  :`Current Price ${price}`}DT</li>
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
