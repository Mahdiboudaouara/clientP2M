import React, { useState } from 'react';
import { calculateTimeLeft } from '../utils/utils.ts';
import '../../src/index.css'


export default function Card(props) {
  let date = props.date
  let name = props.name
  let description = props.description
  let bidding_price = props.bidding_price
  let id=props.id
  let ch=`/make_a_bid/${id}`

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));
  React.useEffect(() => {
    setTimeout(() => setTimeLeft(calculateTimeLeft(date)), 1000);
  }, [timeLeft]);
  return (
   
          <div className="col-12 col-md-4 mb-4">
            <div className="card h-100">
              <div class="container">
                <a href={ch}>
                  <img
                    src="https://loremflickr.com/640/480/abstract"
                    className="card-img-top"
                    alt="..."
                  ></img>
                </a>
                <div class="centered">
                  <p>
                  {String(timeLeft.days).padStart(2, '0')}D: {String(timeLeft.hours).padStart(2, '0')}H:  {String(timeLeft.minutes).padStart(2, '0')}M:  {String(timeLeft.seconds).padStart(2, '0')}S</p>
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
                  <li className="text-muted text-right">{bidding_price}</li>
                </ul>
                <a
                  href={ch}
                  className="h2 text-decoration-none text-dark"
                >
                  {name}
                </a>
                <p className="card-text">
                  {description}
                </p>
                <p className="text-muted">Reviews (48)</p>
              </div>
            </div>
          </div>


       

  );
}
