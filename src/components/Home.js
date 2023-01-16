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
      
      <Card />
        <CategoryCard />
        <h1>Your quote: {quote || "No quote found"}</h1>
      
    </div>
  );
};

export default Home;
