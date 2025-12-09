import { productCartFeatures } from '../../../features/cartFeatures.js';
import { calculateDiscountedPrice } from '../../../utils/discountedPrice.js';
import { FetchCartProducts } from '../../../utils/fetchApi.js';
import { productCart } from '../../common/sidebar/sidebar.js';
import { handleCartEvents } from './handleCartEvents.js';
import {
    shoppingCartTableRow,
    shoppingMobileCartProduct,
} from './renderCartProducts.js';
import { updateCartTotal } from './shoppingCartFeatures.js';

let updatedCartProducts = [];

export function calculateSubTotal(product, quantity) {
    const subtotal =
        calculateDiscountedPrice(product.baseprice, product.discount) *
        quantity;
    return subtotal.toFixed(2);
}

export const shoppingCartContents = async () => {
    try {
        if (!document.querySelector('.shoppingcartmain')) {
            return;
        }

        let cartProducts = [];

        cartProducts = await FetchCartProducts();

        updatedCartProducts = [...cartProducts];

        const shoppingCartContainer =
            document.getElementById('shoppingCartTabel');
        const mobileCartContainer = document.getElementById(
            'mobileCartContainer',
        );

        if (!shoppingCartContainer || !mobileCartContainer) {
            return;
        }

        if (cartProducts.length > 0) {
            const shoppingCartRow = cartProducts
                ? cartProducts.map((row) => shoppingCartTableRow(row)).join('')
                : `
            <tr>
                <td colspan="4" class="text-center py-12 text-red-500">
                    <i class="fas fa-exclamation-circle text-4xl mb-4"></i>
                    <p>Failed to load cart. Please refresh the page.</p>
                </td>
            </tr>
            `;

            const mobileCartProductCards = cartProducts
                ? cartProducts
                      .map((row) => shoppingMobileCartProduct(row))
                      .join('')
                : `
                <div>
                    <div colspan="4" class="text-center py-12 text-red-500">
                        <i class="fas fa-exclamation-circle text-4xl mb-4"></i>
                        <p>Failed to load cart. Please refresh the page.</p>
                    </div>
                </div>
                `;

            shoppingCartContainer.innerHTML = shoppingCartRow;
            mobileCartContainer.innerHTML = mobileCartProductCards;

            for (const product of cartProducts) {
                // for desktop
                handleCartEvents(product, updatedCartProducts);
            }

            // update cart total
            updateCartTotal();

            // return to shop btn
            const returnToShopBtn = document.getElementById('returnCartBtn');
            if (returnToShopBtn) {
                returnToShopBtn.addEventListener('click', () => {
                    window.location.href = '/allproducts.html';
                });
            }
        } else if (cartProducts.length === 0) {
            shoppingCartContainer.innerHTML = `
                <p class="text-base font-medium text-gray-700 p-5">No products in cart</p>
                `;
            mobileCartContainer.innerHTML = '';
        }
    } catch (error) {
        console.log('error in fetching cart product', error);
        return error;
    }
};
