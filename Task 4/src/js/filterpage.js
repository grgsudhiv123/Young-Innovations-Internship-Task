import { renderBreadCrumb } from './components/common/breadcrumb.js';
import { renderfilterProductsPage } from './components/pagessection/filterpage/renderFilterProductPage.js';

window.addEventListener('DOMContentLoaded', async () => {
    renderBreadCrumb('All Products');
    renderfilterProductsPage();
});
