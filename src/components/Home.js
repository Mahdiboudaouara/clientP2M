import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import CategoryCard from "./CategoryCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  React.useEffect( () => {
     axios
      .get("http://localhost:3001/api/auction/display")
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err));

       axios
      .get("http://localhost:3001/api/auction/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err));
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  


  return (
    <div>
      <section className="bg-light ">
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1>Featured Product</h1>
              <p>
                Reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
          </div>
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

      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Categories of The Month</h1>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="row">
        {categories.map((category) => (
          <CategoryCard categoryName={category.category} categoryImage={category.categoryImage} categoryId={category.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
