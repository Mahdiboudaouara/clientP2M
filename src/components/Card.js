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
  let id = props.id;
  let ch = `/bid/${id}`;
  const [categoryName, setCategoryName] = useState([]);
  const [startBid, setStartBid] = useState(false);

  const [timeLeft, setTimeLeft] = useState(Date(date));
  const  timer=async(date)=> {
    if (date > Date.now()) {
      setTimeout(() => setTimeLeft(calculateTimeLeft(date), 1000));
      setStartBid(false);
    } else {
      setTimeout(() => setTimeLeft(calculateTimeIn(date), 1000));
      setStartBid(true);
    }
  }


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
    
    getCategoryName(category_id)
    timer(Date(date))

  }, [props]);


  useEffect(() => {
    setTimeout(() => setTimeLeft(date> Date.now() ? calculateTimeLeft(date) : calculateTimeIn(date) ), 1000);
    setStartBid(date> Date.now()  ? false : true)
  }, [timeLeft,props]);
  return (
    <div className="col-12 col-md-2 mb-2 " style={{width:"25%"}}>
      <div className="card h-100 ">
        <div className="containerr ">
          <a href={ch}>
            <img
              src={image}
              width="120px"
              height="250px"
              className="card-img-top "
              alt="..."
            ></img>
          </a>
          <div
            className="centered"
            style={startBid ? { backgroundColor: "orange" } : {backgroundColor: "white"}}
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
            <li className="text-muted text-right">{bidding_price}DT</li>
          </ul>
          <div className="right">
            <a href={ch} className="h2 text-decoration-none text-dark">
              {name}
            </a>
            <p className="card-text">{description}</p>

            <p className="card-text">category : {categoryName}</p>
          </div>
          
        </div>
       { !startBid ? <button class="button-77" style={{marginBottom:'10px',paddingBottom:'10px',width:"200px",paddingLeft:"10px",marginLeft:"10px"}} role="button">Start Bid Now</button>: <button disabled class="button-77" style={{marginBottom:'10px',paddingBottom:'10px',width:"200px",paddingLeft:"10px",marginLeft:"10px"}} role="button">Start Bid Now</button>}

      </div>
    </div>
  );
}
