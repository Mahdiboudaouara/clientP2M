import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { formatedTimestamp } from "../utils/utils.ts";
import { calculateTimeLeft, calculateTimeIn } from "../utils/utils.ts";
import { MDBInput } from "mdb-react-ui-kit";
import NotAvailable from "./NotAvailable";
import ReactDOM from "react-dom/client";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PlaceBid(props) {
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [price, setPrice] = useState(0);
  const [timeLeft, setTimeLeft] = useState(Date());
  const [startBid, setStartBid] = useState(false);
  const [date, setDate] = useState(Date());
  const [error, setError] = useState(null);
  let { product_id } = useParams();



  // Get the category name for the product
  const getCategoryName = async (category_id) => {
    try {
      const res = await Axios.get(
        `http://localhost:3001/api/auction/getcategory/${category_id}`
      );
      setCategoryName(res.data.category);
    } catch (err) {
      console.log(err);
    }
  };
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

    // Fetch product information by product id
    const fetchProduct = async (product_id) => {
      try {
        const res = await Axios.get(
          `http://localhost:3001/api/auction/displayproduct/${product_id}`
        );
        if (res.data) {
          setProduct(res.data);
          setPrice(res.data.startingPrice);
          getCategoryName(res.data.category_id);
          await timer(new Date(res.data.date));
          setDate(new Date(res.data.date));
        } else {
          const root = ReactDOM.createRoot(document.getElementById("root"));
          return root.render(
            <>
              <Navbar isAuthenticated={props.isAuthenticated} />
              <NotAvailable />
              <Footer />
            </>
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    // Get last bid on the product
    const getLastBid = async (product_id) => {
      try {
        const res = await Axios.get(
          `http://localhost:3001/api/bid/${product_id}`
        );
        if (res.data.bidAmount) {
          setPrice(res.data.bidAmount);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct(product_id);
    getLastBid(product_id);
  }, []);

  // Update time left and bid status every second
  useEffect(() => {
    timer(date);
  }, [timeLeft]);

  // State for bid input
  const [inputPrice, setInputPrice] = React.useState();

  // Handle input changes
  const onChange = (e) => {
    console.log(e.target.value);
    setInputPrice(e.target.value)
  };

  // Add bid to the product
  async function addBid(e) {
    e.preventDefault();
    await Axios.post("http://localhost:3001/api/bid/create", {
      productId: product_id,
      userId: product.owner_id,
      bidAmount: inputPrice,
      date: formatedTimestamp(),
    }).then((res) =>setPrice(inputPrice)).catch((err) => setError(err));
  }

  return (
    <section class="bg-light">
      <div class="container pb-5">
        <div class="row">
          <div class="col-lg-5 mt-5">
            <div class="card mb-3">
              <img
                class="card-img img-fluid"
                src={product.productImage}
                alt=""
                id={product.id}
              />
            </div>
          </div>
          <div class="col-lg-7 mt-5">
            <div class="card">
              <div class="card-body">
                <h3>
                  {String(timeLeft.days).padStart(2, "0")}D:{" "}
                  {String(timeLeft.hours).padStart(2, "0")}H:{" "}
                  {String(timeLeft.minutes).padStart(2, "0")}M:{" "}
                  {String(timeLeft.seconds).padStart(2, "0")}S
                </h3>
                <h1 class="h2">{product.productName}</h1>
                <p class="h3 py-2">
                  Current Price Point : {price || product.startingPrice}DT
                </p>
                {startBid ? <p class="py-2">
                  <span class="list-inline-item text-dark">
                    Number of bids : 55
                  </span>
                </p>: <></>}
                <ul class="list-inline">
                  <li class="list-inline-item">
                    <h6>Category:</h6>
                  </li>
                  <li class="list-inline-item">
                    <p class="text-muted">
                      <strong>{categoryName}</strong>
                    </p>
                  </li>
                </ul>
                <h6>Description:</h6>
                <p>{product.productDescription}</p>
                <input type="hidden" name="product-title" value="Activewear" />
                {props.isAuthenticated === true ?  (
                  <div class="row">
                    <div class="col-auto">
                      { startBid ? <ul class="list-inline pb-3">
                        <MDBInput
                        placeholder={price+0.1}
                          name="price"
                          type="number"
                          step="0.1"
                          min={price+0.1}
                          onChange={onChange}
                          required
                          label="place a bid"
                        />
                      </ul>  : <></> }
                    </div>

                    <div class="row pb-3">
                      <div class="col d-grid">
                        {startBid ? (
                          <button
                            type="submit"
                            class="btn btn-success btn-lg"
                            name="submit"
                            value="addtocard"
                            onClick={addBid}
                          >
                            Place a Bid
                          </button>
                        ) : (
                          <button
                            type="text"
                            class="btn btn-warning btn-lg"
                            name="submit"
                          >
                            The bidding has not started yet!
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="color">
                    Please <a href="/signup">sign up</a> to place a bid
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
