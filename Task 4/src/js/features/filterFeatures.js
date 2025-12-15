import { renderProductCards } from '../components/pagessection/filterpage/renderProductCards.js';
import { getAllProducts } from '../api/products.services.js';

export async function filteredFeatures(filterParams) {
    const queryParams = new URLSearchParams();

    if (!filterParams) {
        console.error('filterParams not found');
        return;
    }

    if (filterParams.category)
        queryParams.append('category', filterParams.category);
    if (filterParams.tags.length > 0)
        queryParams.append('tags_like', filterParams.tags.join(','));
    if (filterParams.price)
        queryParams.append('baseprice_gte', filterParams.price[0]);
    if (filterParams.price)
        queryParams.append('baseprice_lte', filterParams.price[1]);
    if (filterParams.rating)
        queryParams.append('rating_gte', filterParams.rating);
    if (filterParams.stock) queryParams.append('inStock', filterParams.stock);
    if (filterParams.sort) queryParams.append('_sort', filterParams.sort);
    if (filterParams.pagination) {
        queryParams.append('_page', filterParams.pagination.currentPage);
        queryParams.append('_per_page', filterParams.pagination.itemsPerPage);
    }

    try {
        const productData = await getAllProducts(queryParams.toString());
        await renderProductCards(productData, filterParams);
    } catch (error) {
        console.error(
            'Error while fetching filtered product data',
            error.message,
        );
        throw error;
    }
}
