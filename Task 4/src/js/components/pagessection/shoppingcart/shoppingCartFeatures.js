import { updateCartProducts } from '../../../utils/fetchApi.js';
import { productCart } from '../../common/sidebar/sidebar.js';
import { shoppingCartContents } from './shoppingCartContents.js';

// updates cart total cost
export const updateCartTotal = () => {
    const finalsubtotalEl = document.getElementById('cart-subtotal');
    const finaltotalEl = document.getElementById('cart-total');

    let totalCost = 0;

    const subtotalElements = document.querySelectorAll('.subtotalRow');

    subtotalElements.forEach((el) => {
        totalCost += Number(el.innerText);
    });

    if (finalsubtotalEl && finaltotalEl) {
        finalsubtotalEl.innerText = totalCost.toFixed(2);
        finaltotalEl.innerText = totalCost.toFixed(2);
    }
};

// updates cart local quantity and the backed quantity
export async function updateCart(
    product,
    currentquantity,
    updatedCartProducts,
) {
    const isProductInCart = updatedCartProducts.find(
        (item) => item.id === product.id,
    );
    if (!isProductInCart) {
        updatedCartProducts.push({
            id: product.id,
            quantity: currentquantity,
            updatedAt: new Date().toISOString(),
        });
    } else {
        updatedCartProducts = updatedCartProducts.map((item) => {
            if (item.id === product.id) {
                return {
                    ...item,
                    quantity: currentquantity,
                    updatedAt: new Date().toISOString(),
                };
            }
            return item;
        });
    }

    // update cart products
    const updateCartProductsBtn = document.getElementById('updateCartBtn');
    if (updateCartProductsBtn) {
        updateCartProductsBtn.addEventListener('click', async () => {
            if (updatedCartProducts.length === 0) {
                return;
            }

            for (const item of updatedCartProducts) {
                await updateCartProducts(item, item.id);
            }
            await shoppingCartContents();
            productCart();
        });
    }
}
