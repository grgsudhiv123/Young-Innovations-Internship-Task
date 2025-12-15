import { getAllProducts } from '../../../api/products.services.js';
import { ProductBtns } from '../../common/productscard/productCardFeatures.js';
import ProductCard from '../../common/productscard/prooductCardcomponent.js';

const PopularProducts = async () => {
    try {
        const popularProductContainer =
            document.getElementById('popularProducts');

        const productData = await getAllProducts();

        // filtered on the basis of rating and discount of the product
        const filteredData = await productData.filter(
            (data) => data.rating >= 4 && data.discount.replace('%', '') >= 10,
        );

        popularProductContainer.innerHTML = filteredData
            .slice(0, 9)
            .map((product) => ProductCard(product, 'popular'))
            .join('');

        //   after the card loads we access model view btn  else we face event delegation error
        // this function handles the product model and the product wishlist btn
        ProductBtns(filteredData, 'popular');
    } catch (error) {
        console.error('something went wrong ', error);
    }
};

export default PopularProducts;
