import React from "react";

export default function Card() {
  return (
    <section className="bg-light">
    <div className="container py-5">
        <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
                <h1 className="h1">Featured Product</h1>
                <p>
                    Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident.
                </p>
            </div>
        </div>
      <div className="row">
        <div className="col-12 col-md-4 mb-4">
          <div className="card h-100">
            <a href="shop-single.html">
              <img
                src="https://loremflickr.com/640/480/abstract"
                className="card-img-top"
                alt="..."
              ></img>
            </a>
            <div className="card-body">
              <ul className="list-unstyled d-flex justify-content-between">
                <li>
                  <i className="text-warning fa fa-star"></i>
                  <i className="text-warning fa fa-star"></i>
                  <i className="text-warning fa fa-star"></i>
                  <i className="text-muted fa fa-star"></i>
                  <i className="text-muted fa fa-star"></i>
                </li>
                <li className="text-muted text-right">$480.00</li>
              </ul>
              <a
                href="shop-single.html"
                className="h2 text-decoration-none text-dark"
              >
                Cloud Nike Shoes
              </a>
              <p className="card-text">
                Aenean gravida dignissim finibus. Nullam ipsum diam, posuere
                vitae pharetra sed, commodo ullamcorper.
              </p>
              <p className="text-muted">Reviews (48)</p>
            </div>
          </div>
        </div>


      </div>
      </div>
      </section>
   
  );
}
