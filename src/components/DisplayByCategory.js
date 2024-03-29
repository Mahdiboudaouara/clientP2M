import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { useParams } from "react-router-dom";


export default function DisplayByCategory() {
  const bidServer = window._env_ && window._env_.REACT_APP_BID_SERVER ? window._env_.REACT_APP_BID_SERVER : process.env.REACT_APP_BID_SERVER;
  const auctionServer = window._env_ && window._env_.REACT_APP_AUCTION_SERVER ? window._env_.REACT_APP_AUCTION_SERVER : process.env.REACT_APP_AUCTION_SERVER;
  const userServer = window._env_ && window._env_.REACT_APP_USER_SERVER ? window._env_.REACT_APP_USER_SERVER : process.env.REACT_APP_USER_SERVER;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  const { category_id } = useParams();
  const fetchProducts = async (category_id) => {
    try {
      const res = await axios.get(
        `http://${auctionServer}/backend/auction/displaybycategory/${category_id}`
      );
      setProducts(res.data);
    } catch (err) {
      setError(err)
    }
  };

  useEffect(() => {
    fetchProducts(category_id);
  }, [category_id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="bg-light">
      <div className="container py-5">
        <div className="row">
          {   products.map((product) => (
            <Card
              key={product.id}
              date={new Date(product.date)}
              name={product.productName}
              description={product.productDescription}
              image={product.productImage}
              category_id={product.category_id}
              id={product.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
