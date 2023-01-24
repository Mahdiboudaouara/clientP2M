import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { formatedTimestamp } from "../utils/utils.ts";
import { MDBInput } from "mdb-react-ui-kit";

export default function Place_bid(props) {
  let isAuthenticated = props.isAuthenticated;

  const [product, setProduct] = useState(false);
  const [categoryName, setCategoryName] = useState([]);


  console.log(isAuthenticated);

  let { product_id } = useParams();
  console.log(product_id);
  const fetchProduct = async (product_id) => {
    try {
      const res = await Axios.get(
        `http://localhost:3001/api/auction/displayproduct/${product_id}`
      );
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct(product_id);
  }, []);
  const [price, setPrice] = useState(product.startingPrice);
  const onChange = (e) => {
    setPrice(e.target.value);
  };
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
  if(product){
    getCategoryName(product.category_id);
  }

  async function addBid(e) {
    e.preventDefault();
    await Axios.post("http://localhost:3001/api/bid/create", {
      productId: product_id,
      userId: product.owner_id,
      bidAmount: price,
      date: formatedTimestamp(),
    });
    console.log("kamalt");
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
            <div class="row">
              <div
                id="multi-item-example"
                class="col-10 carousel slide carousel-multi-item"
                data-bs-ride="carousel"
              >
                <div
                  class="carousel-inner product-links-wap"
                  role="listbox"
                ></div>
              </div>
            </div>
          </div>
          <div class="col-lg-7 mt-5">
            <div class="card">
              <div class="card-body">
                <h1 class="h2">{product.productName}</h1>
                <p class="h3 py-2">
                  Current Price Point : {price || product.startingPrice}DT
                </p>
                <p class="py-2">
                  <span class="list-inline-item text-dark">
                    Number of bids : 55
                  </span>
                </p>
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
                {props.isAuthenticated === true ? (
                  <div class="row">
                    <div class="col-auto">
                      <ul class="list-inline pb-3">
                        <MDBInput
                          value={price}
                          onChange={onChange}
                          name="price"
                          type="number"
                          step="0.01"
                          min={price}
                          required
                          label="place a bid"
                        />
                      </ul>
                    </div>
                    <div class="row pb-3">
                      <div class="col d-grid">
                        <button
                          type="submit"
                          class="btn btn-success btn-lg"
                          name="submit"
                          value="addtocard"
                          onClick={addBid}
                        >
                          Place a Bid
                        </button>
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
