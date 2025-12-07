import { FetchApi } from '../../../utils/fetchApi.js';
import { ProductBtns } from '../../common/productscard/productCardFeatures.js';
import ProductCard from '../../common/productscard/prooductCardcomponent.js';

export async function FeaturedProducts() {
    try {
        const featuredProductsContainer =
            document.getElementById('featuredProducts');
        const featuredData = await FetchApi(
            'products',
            'featured=true&_limit=5',
        );
        featuredProductsContainer.innerHTML = featuredData
            .map((product) => ProductCard(product, 'featured'))
            .join('');

        ProductBtns(featuredData, 'featured');
    } catch (error) {
        console.log(error);
    }
}
