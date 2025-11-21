import { FetchApi } from "../fetchApi.js";
import ProductCard from "./common/productCard.js";

export async function FeaturedProducts () {
    try {
        const featuredProductsContainer = document.getElementById("featuredProducts");
        const featuredData = await FetchApi("products","featured=true&_limit=5");
        featuredProductsContainer.innerHTML = featuredData.map((product)=>ProductCard(product)).join("");
        console.log(featuredData);
    } catch (error) {
        console.log(error);
    }
}

