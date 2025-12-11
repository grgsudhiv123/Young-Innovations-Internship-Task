import { renderBreadCrumb } from './components/common/breadcrumb.js';
import { shoppingCartContents } from './components/pagessection/shoppingcart/shoppingCartContents.js';

window.addEventListener('DOMContentLoaded', async () => {
    renderBreadCrumb('Shopping Cart');
    shoppingCartContents();
});
