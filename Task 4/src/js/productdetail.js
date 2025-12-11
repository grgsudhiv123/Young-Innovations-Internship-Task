import { productDetailComp } from './components/pagessection/productdetail/productDetailcomp.js';
import { relatedProducts } from './components/pagessection/productdetail/relatedProducts.js';
import { FetchProductsById } from './utils/fetchApi.js';

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const productDetail = await FetchProductsById(productId);
        if (productDetail) {
            productDetailComp(productDetail);
            relatedProducts(productDetail.category);
        }
    } catch (error) {
        console.log(
            'error occured while updating the product detail data',
            error,
        );
        return error;
    }
});
