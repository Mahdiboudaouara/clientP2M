import React, { useState } from "react";
import Card from "./Card";
import CategoryCard from './CategoryCard';

const Home = () => {
 
  const [quote, setQuote] = useState("");

  React.useEffect(async () => {
    console.log("dkhal lel populate");
    const req = await fetch("http://localhost:3001/api/products", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    console.log(data);
    if (data) {
      setQuote(["id :", data.id, " data:", data.iat]);
    } else {
      alert(data);
    }
  }, []);

  return (
    <div>
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
            <Card date={new Date()} name=" Cloud Nike Shoes" description=" Aenean gravida dignissim finibus. Nullam ipsum diam, posuere
                  vitae pharetra sed, commodo ullamcorper."  bidding_price="480" />
            <Card date={new Date()} name=" Cloud Nike Shoes" description=" Aenean gravida dignissim finibus. Nullam ipsum diam, posuere
                  vitae pharetra sed, commodo ullamcorper."  bidding_price="480" />
            <Card date={new Date()} name=" Cloud Nike Shoes" description=" Aenean gravida dignissim finibus. Nullam ipsum diam, posuere
                  vitae pharetra sed, commodo ullamcorper."  bidding_price="480" />
            <Card date={new Date()} name=" Cloud Nike Shoes" description=" Aenean gravida dignissim finibus. Nullam ipsum diam, posuere
                  vitae pharetra sed, commodo ullamcorper."  bidding_price="480" />
          </div>
        </div>
      </section>



      <section className="container py-5">
        <div className="row text-center pt-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Categories of The Month</h1>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="row">


          <CategoryCard name_category="Watches" link=""/>
          <CategoryCard name_category="Watches" link=""/>

          <CategoryCard name_category="Watches" link="" />

          <CategoryCard name_category="Watches" link="" />

        </div>


      </section>

      <h1>Your quote: {quote || "No quote found"}</h1>

    </div>
  );
};

export default Home;
