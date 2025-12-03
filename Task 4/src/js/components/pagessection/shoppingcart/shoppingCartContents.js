import { productCartFeatures } from '../../../features/cartFeatures.js';
import {
    DeleteCartProduct,
    FetchCartProducts,
} from '../../../utils/fetchApi.js';
import {
    shoppingCartTableRow,
    shoppingMobileCartProduct,
} from './renderCartProducts.js';
import { updateCart, updateCartTotal } from './shoppingCartFeatures.js';

let updatedCartProducts;

export function calculateDiscountedPrice(baseprice, discount) {
    const discountedPrice =
        baseprice - baseprice * (discount.replace('%', '') / 100);
    return discountedPrice.toFixed(2);
}

function calculateSubTotal(product, quantity) {
    const subtotal =
        calculateDiscountedPrice(product.baseprice, product.discount) *
        quantity;
    return subtotal.toFixed(2);
}

export const shoppingCartContents = async () => {
    try {
        let cartProducts = [];
        updatedCartProducts = [];
        cartProducts = await FetchCartProducts();

        const shoppingCartContainer =
            document.getElementById('shoppingCartTabel');
        const mobileCartContainer = document.getElementById(
            'mobileCartContainer',
        );
        const { deleteCartProduct } = productCartFeatures();
        if (cartProducts) {
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
                let updatedQuantity = product.quantity;
                let updatedSubTotal = calculateSubTotal(
                    product,
                    updatedQuantity,
                );

                // get elements
                const deductBtn = document.getElementById(
                    `deductProductFromCart-${product.id}`,
                );

                const mobileDeductBtn = document.getElementById(
                    `mobileDeductProductFromCart-${product.id}`,
                );

                const addBtn = document.getElementById(
                    `addProductToCart-${product.id}`,
                );

                const mobileAddBtn = document.getElementById(
                    `mobileAddProductToCart-${product.id}`,
                );

                const removeBtn = document.getElementById(
                    `removeCartProduct-${product.id}`,
                );

                const mobileremoveBtn = document.getElementById(
                    `mobileRemoveCartProduct-${product.id}`,
                );

                const quantityEl = document.getElementById(
                    `quantity-${product.id}`,
                );

                const mobileQuantityEl = document.getElementById(
                    `mobileQuantity-${product.id}`,
                );

                const subTotalEl = document.getElementById(
                    `subtotal-${product.id}`,
                );

                const mobileSubTotalEl = document.getElementById(
                    `mobilesubtotal-${product.id}`,
                );

                // check if elements exist
                if (
                    !deductBtn ||
                    !addBtn ||
                    !quantityEl ||
                    !subTotalEl ||
                    !removeBtn ||
                    !mobileDeductBtn ||
                    !mobileAddBtn ||
                    !mobileQuantityEl ||
                    !mobileSubTotalEl
                ) {
                    console.error(`Missing elements for product ${product.id}`);
                    continue;
                }

                // initialize quantity
                quantityEl.innerText = updatedQuantity;
                subTotalEl.innerText = updatedSubTotal;

                mobileQuantityEl.innerText = updatedQuantity;
                mobileSubTotalEl.innerText = updatedSubTotal;

                // for desktop
                handleCartEvents(
                    deductBtn,
                    mobileDeductBtn,
                    addBtn,
                    mobileAddBtn,
                    removeBtn,
                    mobileremoveBtn,
                    quantityEl,
                    mobileQuantityEl,
                    subTotalEl,
                    mobileSubTotalEl,
                    updatedQuantity,
                    product,
                );
            }

            // update cart total
            updateCartTotal();

            // return to shop btn
            const returnToShopBtn = document.getElementById('returnCartBtn');
            if (returnToShopBtn) {
                returnToShopBtn.addEventListener('click', () => {
                    window.location.href = '/public/allproducts.html';
                });
            }
        }
    } catch (error) {
        console.log('error in fetching cart product', error);
        return error;
    }
};

function handleCartEvents(
    deductBtn,
    mobileDeductBtn,
    addBtn,
    mobileAddBtn,
    removeBtn,
    mobileremoveBtn,
    quantityEl,
    mobileQuantityEl,
    subTotalEl,
    mobileSubTotalEl,
    updatedQuantity,
    product,
) {
    // update quantity and subtotal
    function updateProductQuantity(newQuantity) {
        quantityEl.innerText = newQuantity;
        mobileQuantityEl.innerText = newQuantity;
        const newSubtotal = calculateSubTotal(product, newQuantity);
        subTotalEl.innerText = newSubtotal;
        mobileSubTotalEl.innerText = newSubtotal;
        updateCart(product, newQuantity, updatedCartProducts);
        updateCartTotal();
    }

    [deductBtn, mobileDeductBtn].forEach((el) => {
        el.addEventListener('click', () => {
            if (updatedQuantity > 1) {
                updatedQuantity--;
                updateProductQuantity(updatedQuantity);
            }
        });
    });

    [addBtn, mobileAddBtn].forEach((el) => {
        el.addEventListener('click', () => {
            updatedQuantity++;
            updateProductQuantity(updatedQuantity);
        });
    });

    [removeBtn, mobileremoveBtn].forEach((el) => {
        el.addEventListener('click', async () => {
            updatedCartProducts = updatedCartProducts.filter(
                (item) => item.id !== product.id,
            );
            await DeleteCartProduct(product.id);
            await shoppingCartContents();
        });
    });
}
