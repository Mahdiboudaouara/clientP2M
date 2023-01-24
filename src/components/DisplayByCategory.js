import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { useParams } from "react-router-dom";


export default function DisplayByCategory() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { category_id } = useParams();
  console.log("categoryid",category_id)
  const fetchProducts = async (category_id) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/auction/displaybycategory/${category_id}`
      );
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts(category_id);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="bg-light">
      <div className="container py-5">
        <div className="row">
          {products.map((product) => (
            <Card
              date={new Date(product.date)}
              name={product.productName}
              description={product.productDescription}
              bidding_price={product.startingPrice}
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