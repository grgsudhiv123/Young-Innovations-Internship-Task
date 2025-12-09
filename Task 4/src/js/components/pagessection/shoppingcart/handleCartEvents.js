import { productCartFeatures } from '../../../features/cartFeatures.js';
import { productCart } from '../../common/sidebar/sidebar.js';
import {
    calculateSubTotal,
    shoppingCartContents,
} from './shoppingCartContents.js';
import { updateCart, updateCartTotal } from './shoppingCartFeatures.js';
export function handleCartEvents(product, updatedCartProducts) {
    const { deleteCartProduct } = productCartFeatures();
    let updatedQuantity = product.quantity;
    let updatedSubTotal = calculateSubTotal(product, updatedQuantity);

    // get elements
    const deductBtn = document.getElementById(
        `deductProductFromCart-${product.id}`,
    );

    const mobileDeductBtn = document.getElementById(
        `mobileDeductProductFromCart-${product.id}`,
    );

    const addBtn = document.getElementById(`addProductToCart-${product.id}`);

    const mobileAddBtn = document.getElementById(
        `mobileAddProductToCart-${product.id}`,
    );

    const removeBtn = document.getElementById(
        `removeCartProduct-${product.id}`,
    );

    const mobileremoveBtn = document.getElementById(
        `mobileRemoveCartProduct-${product.id}`,
    );

    const quantityEl = document.getElementById(`quantity-${product.id}`);

    const mobileQuantityEl = document.getElementById(
        `mobileQuantity-${product.id}`,
    );

    const subTotalEl = document.getElementById(`subtotal-${product.id}`);

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
        return;
    }

    // initialize quantity
    quantityEl.innerText = updatedQuantity;
    subTotalEl.innerText = updatedSubTotal;

    mobileQuantityEl.innerText = updatedQuantity;
    mobileSubTotalEl.innerText = updatedSubTotal;

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
            await deleteCartProduct(product.id);
            await shoppingCartContents();
            await productCart();
        });
    });
}
