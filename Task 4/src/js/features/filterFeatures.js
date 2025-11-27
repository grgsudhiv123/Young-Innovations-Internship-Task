import { FetchAllProducts } from "../utils/fetchApi.js";

export async function filteredFeatures(filter) {
    const filter = {
        category : filter.category,
        priceRange : filter.range,
        rating : filter.rating,
        discount : filter.discount,
        sort : filter.sortBy
    }
    const filterString = `category=${filter.category}&tags=${filter.priceRange}&${filter.rating}&${filter.discount}&${filter.sort}`; 
    try {
        const productData = await FetchAllProducts(filterString);
        
    } catch (error) {
        
    }
}