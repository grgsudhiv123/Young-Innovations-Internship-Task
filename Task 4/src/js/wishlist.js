import { renderBreadCrumb } from './components/common/breadcrumb.js';

import { WishListProductTable } from './components/pagessection/wishListPage/wishListTableContents.js';

window.addEventListener('DOMContentLoaded', async () => {
    renderBreadCrumb('Wishlist');
    WishListProductTable();
});
