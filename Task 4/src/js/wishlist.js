import { bottomNavbar } from './components/common/bottomnavbar/bottomnavbar.js';
import { renderBreadCrumb } from './components/common/breadcrumb.js';
import footerComp from './components/common/footer.js';
import { footerTemplate } from './components/common/layoutcommon/footerLayout.js';
import { headerTemplate } from './components/common/layoutcommon/headerLayout.js';
import {
    HandleSidebarCart,
    productCart,
} from './components/common/sidebar/sidebar.js';
import navbar from './components/common/topnavbar/topnavbar.js';

import { WishListProductTable } from './components/pagessection/wishListPage/wishListTableContents.js';

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('header').innerHTML = headerTemplate();
    document.getElementById('footer').innerHTML = footerTemplate();
    navbar();
    bottomNavbar();
    renderBreadCrumb('Wishlist');
    HandleSidebarCart();
    productCart();
    WishListProductTable();
    footerComp();
});
