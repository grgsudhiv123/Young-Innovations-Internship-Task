import { FetchApi } from "../../../utils/fetchApi.js";
import ProductCard from "../../common/productCard.js";

export const relatedProducts = async (categoryId) => {
    try {
        const relatedProducts  = await FetchApi("products", `categoryId=${categoryId}&_limit=5`);
        const relatedProductContainer = document.getElementById("relatedProducts");
        if(relatedProducts){
            relatedProductContainer.innerHTML = relatedProducts.map(product => ProductCard(product, "relatedProducts")).join("");
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}