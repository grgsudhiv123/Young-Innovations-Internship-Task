import { getAllProducts } from '../../../api/products.services.js';
import { ProductBtns } from '../../common/productscard/productCardFeatures.js';
import ProductCard from '../../common/productscard/prooductCardcomponent.js';

export async function FeaturedProducts() {
    try {
        const featuredProductsContainer =
            document.getElementById('featuredProducts');

        if (!featuredProductsContainer) {
            throw new Error('FeaturedProductsContainer not found.');
        }

        const filter = 'featured=true&_limit=5';
        const featuredData = await getAllProducts(filter);
        featuredProductsContainer.innerHTML = featuredData
            .map((product) => ProductCard(product, 'featured'))
            .join('');

        ProductBtns(featuredData, 'featured');
    } catch (error) {
        console.error('Error in FeaturedProducts.', error.message);
        throw error;
    }
}
