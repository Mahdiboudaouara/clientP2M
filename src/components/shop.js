import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import CategoryCard from "./CategoryCard";
export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [ch, setch] = useState([]);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, isChecked: false },
    { id: 2, isChecked: false },
    { id: 3, isChecked: false },
    { id: 4, isChecked: false },
    { id: 5, isChecked: false },
    { id: 6, isChecked: false },
    { id: 7, isChecked: false },
    { id: 8, isChecked: false },
    { id: 9, isChecked: false },
    { id: 10, isChecked: false },
    { id: 11, isChecked: false },
    { id: 12, isChecked: false },
    { id: 13, isChecked: false },
    { id: 14, isChecked: false },
  ]);

  const [productCategory, setProductCategory] = React.useState("");
  React.useEffect(async () => {
    let d = 0;
    for (const elemnt of checkboxes) {
      if (elemnt.isChecked === true) {
        d = d + 1;
      }
    }

    console.log(d);
    await axios
      .get("http://localhost:3001/api/auction/display")
      .then((res) => {
        setProducts(res.data);
        if (d === 0) {
          setch(res.data);
          console.log(ch);
        }
      })
      .catch((err) => setError(err));

    await axios
      .get("http://localhost:3001/api/auction/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err));
  }, []);
  React.useEffect(() => {
    console.log(products);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const Filtre = (b) => {
    let c = 0;
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === b) {
        checkbox.isChecked = !checkbox.isChecked;
      }
      return checkbox;
    });
    setCheckboxes(updatedCheckboxes);
    setch([]);

    for (const element of checkboxes) {
      if (element.isChecked === true) {
        for (const i of products) {
          if (i.category_id === element.id) {
            setch((ch) => [...ch, i]);
          }
        }
      }
    }
    for (const elemnt of checkboxes) {
      if (elemnt.isChecked === true) {
        c = c + 1;
      }
    }
    if (c === 0) {
      setch(products);
    }
  };

  return (
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-3">
          <h1 class="h2 pb-4">Products</h1>
          <ul class="list-unstyled templatemo-accordion">
            <li class="pb-3">
              <label
                class="collapsed d-flex justify-content-between h3 text-decoration-none"
                href="#"
              >
                Show ended bids
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
              </label>
              <label
                class="collapsed d-flex justify-content-between h3 text-decoration-none"
                href="#"
              >
                Show featured bids
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
              </label>{" "}
              <label
                class="collapsed d-flex justify-content-between h3 text-decoration-none"
                href="#"
              >
                Show actual bids
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
              </label>
            </li>
          </ul>

          <h1 class="h2 pb-4">Categories</h1>

          <ul class="list-unstyled templatemo-accordion">
            <li class="pb-3">
              {categories.map((category) => (
                <label
                  class="collapsed d-flex justify-content-between h3 text-decoration-none"
                  href="#"
                >
                  {category.category}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value="option1"
                    checked={checkboxes[category.id - 1].isChecked}
                    onChange={() => Filtre(category.id)}
                  />
                </label>
              ))}
            </li>
          </ul>
        </div>
        <div class="col-lg-9">
          <div class="row">
            {ch.map((product) => (
              <Card
                date={new Date(product.date)}
                name={product.productName}
                description={product.productDescription}
                bidding_price={product.startingPrice}
                image={product.productImage}
                category_id={product.category_id}
                id={product.id}
              />
            ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
