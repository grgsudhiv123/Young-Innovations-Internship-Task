import { bottomNavbar } from './components/common/bottomnavbar/bottomnavbar.js';
import footerComp from './components/common/footer.js';
import { footerTemplate } from './components/common/layoutcommon/footerLayout.js';
import { headerTemplate } from './components/common/layoutcommon/headerLayout.js';
import navbar from './components/common/topnavbar.js';
import {
    HandleSidebarCart,
    productCart,
} from './components/pagessection/homepage/productCartSidebar.js';
import { productDetailComp } from './components/pagessection/productdetail/productDetailcomp.js';
import { relatedProducts } from './components/pagessection/productdetail/relatedProducts.js';
import { FetchProductsById } from './utils/fetchApi.js';

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('header').innerHTML = headerTemplate();
    document.getElementById('footer').innerHTML = footerTemplate();
    navbar();
    bottomNavbar();
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
    HandleSidebarCart();
    productCart();
    footerComp();
});
