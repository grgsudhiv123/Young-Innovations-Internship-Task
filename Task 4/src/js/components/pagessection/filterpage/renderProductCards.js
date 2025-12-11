import { ProductBtns } from '../../common/productscard/productCardFeatures.js';
import ProductCard from '../../common/productscard/prooductCardcomponent.js';
import { paginationComponent } from './paginationComponent.js';

// render product cards
export const renderProductCards = async (productData, filter) => {
    try {
        const productContainer = document.getElementById(
            'filteredProductContainer',
        );
        const newlyFetchedProducts = productData.data;
        const productCountEl = document.getElementById('filteredProductCount');

        if (newlyFetchedProducts.length > 0) {
            const productList = newlyFetchedProducts
                .map((product) => ProductCard(product, 'filteredProducts'))
                .join('');
            productContainer.innerHTML = productList;
            productCountEl.textContent = productData.items;
            paginationComponent(productData.items, filter);
            await ProductBtns(newlyFetchedProducts, 'filteredProducts');
        } else {
            productContainer.innerHTML = `
                <div class="col-span-12 lg:col-span-6 w-full h-[80vh] flex items-center justify-center">
                    <p class="text-center text-gray-500 text-sm font-normal leading-[150%]">No products found</p>
                </div>
            `;
            productCountEl.textContent = 0;
        }
    } catch (error) {
        console.log('Error while fetching the data : ', error);
        return error;
    }
};
