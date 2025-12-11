import { updateCartProduct } from '../../../api/productcart.services.js';
import { toastMessage } from '../../../utils/toast.js';
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

let updateHandler = null;

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
        const index = updatedCartProducts.findIndex(
            (item) => item.id === product.id,
        );
        updatedCartProducts[index] = {
            ...updatedCartProducts[index],
            quantity: currentquantity,
            updatedAt: new Date().toISOString(),
        };
    }

    // update cart products
    const updateCartProductsBtn = document.getElementById('updateCartBtn');
    if (updateCartProductsBtn) {
        if (updateHandler) {
            updateCartProductsBtn.removeEventListener('click', updateHandler);
        }
        updateHandler = async () => {
            if (updatedCartProducts.length === 0) {
                return;
            }

            for (const item of updatedCartProducts) {
                await updateCartProduct(item, item.id);
            }
            await shoppingCartContents();
            await productCart();

            toastMessage('Updated products successfully', 'success');
        };

        updateCartProductsBtn.addEventListener('click', updateHandler);
    }
}
