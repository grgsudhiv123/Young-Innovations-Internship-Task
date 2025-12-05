import { bottomNavbar } from './components/common/bottomnavbar/bottomnavbar.js';
import footerComp from './components/common/footer.js';
import { footerTemplate } from './components/common/layoutcommon/footerLayout.js';
import { headerTemplate } from './components/common/layoutcommon/headerLayout.js';
import navbar from './components/common/topnavbar/topnavbar.js';
import { renderfilterProductsPage } from './components/pagessection/filterpage/renderFilterProductPage.js';
import {
    HandleSidebarCart,
    productCart,
} from './components/pagessection/homepage/productCartSidebar.js';

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('header').innerHTML = headerTemplate();
    document.getElementById('footer').innerHTML = footerTemplate();
    navbar();
    bottomNavbar();
    HandleSidebarCart();
    productCart();
    renderfilterProductsPage();
    footerComp();
});
