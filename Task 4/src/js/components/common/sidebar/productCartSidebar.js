import { sidebarCard } from './sidebarComponents.js';

export const ProductCartSidebar = async (cartProducts) => {
    const cartContainer = document.getElementById('cartProduct-container');
    cartContainer.innerHTML =
        cartProducts.length !== 0
            ? cartProducts
                  .map((product) => sidebarCard(product, cartProducts))
                  .join('')
            : `<span class="text-base text-gray-400 leading-[150%]">Cart is empty</span>`;
};
