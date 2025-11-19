import { BASE_URL } from "../constants.js";
import productCard from "./common/productCard.js";

const PopularProducts = async () => {
  try {
    const popularProductContainer = document.getElementById("popularProducts");
    const productRes = await fetch(`${BASE_URL}/products`);
    const data = await productRes.json();

    // filtered on the basis of rating and discount of the product
    const filteredData = await data.filter(
      (data) => data.rating >= 4 && data.discount.replace("%", "") >= 10
    );

    console.log("filtered data : ", filteredData);

    popularProductContainer.innerHTML = filteredData
      .slice(0, 9)
      .map((product) => productCard(product))
      .join("");
  } catch (error) {
    console.log("something went wrong ", error);
  }
};

export default PopularProducts;
