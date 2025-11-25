import { BASE_URL } from "../../../utils/constants.js";
import ProductCard, { ProductBtns } from "../../common/productCard.js";

const PopularProducts = async () => {
  try {
    localStorage.setItem("productAdded",JSON.stringify([]));
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
      .map((product) => ProductCard(product,"popular"))
      .join("");

    //   after the card loads we access model view btn  else we face event delegation error
    // this function handles the product model and the product wishlist btn
    ProductBtns(filteredData,"popular");
  } catch (error) {
    console.log("something went wrong ", error);
  }
};

export default PopularProducts;
