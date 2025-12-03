import { renderBreadCrumb } from './components/common/breadcrumb.js';
import footerComp from './components/common/footer.js';
import { footerTemplate } from './components/common/layoutcommon/footerLayout.js';
import { headerTemplate } from './components/common/layoutcommon/headerLayout.js';
import navbar from './components/common/topnavbar.js';
import {
    HandleSidebarCart,
    productCart,
} from './components/pagessection/homepage/productCartSidebar.js';
import { shoppingCartContents } from './components/pagessection/shoppingcart/shoppingCartContents.js';

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('header').innerHTML = headerTemplate();
    document.getElementById('footer').innerHTML = footerTemplate();
    navbar();
    renderBreadCrumb('Shopping Cart');
    HandleSidebarCart();
    productCart();
    shoppingCartContents();
    footerComp();
});
