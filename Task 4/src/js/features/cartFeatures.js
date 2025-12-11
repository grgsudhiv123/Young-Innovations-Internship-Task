import {
    AddProducts,
    DeleteCartProduct,
    FetchCartProducts,
    updateCartProducts,
} from '../utils/fetchApi.js';
import { toastMessage } from '../utils/toast.js';

export const productCartFeatures = () => {
    let cartProduct = [];
    let repeatedCartProduct = false;

    const addCartProduct = async (product) => {
        cartProduct = await FetchCartProducts();
        const repeatedProduct = cartProduct.find(
            (cartProduct) => cartProduct.id === product.id,
        );
        if (!repeatedProduct) {
            repeatedCartProduct = false;
            await AddProducts({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString(),
            });
            toastMessage('Product added to cart', 'success');
        } else {
            repeatedCartProduct = false;
            await updateCartProducts(
                {
                    ...product,
                    quantity: repeatedProduct.quantity + 1,
                    updatedAt: new Date().toISOString(),
                },
                repeatedProduct.id,
            );
            toastMessage('Product added to cart', 'success');
        }
    };

    const deductCartProduct = async (product) => {
        cartProduct = await FetchCartProducts();
        const repeatedProduct = await cartProduct.find(
            (cartProduct) => cartProduct.id === product.id,
        );
        if (repeatedProduct && repeatedProduct.quantity > 1) {
            await updateCartProducts(
                {
                    ...product,
                    quantity: repeatedProduct.quantity - 1,
                    updatedAt: new Date().toISOString(),
                },
                repeatedProduct.id,
            );
            toastMessage('Product removed from cart', 'success');
        } else {
            await DeleteCartProduct(product.id);
            toastMessage(`${product.name} removed from cart`, 'success');
        }
    };

    const deleteCartProduct = async (id) => {
        try {
            await DeleteCartProduct(id);
            toastMessage('Product removed from cart', 'success');
        } catch (error) {
            console.error('error while removing the cart product', error);
            toastMessage(error, 'error');
        }
    };

    return {
        addCartProduct,
        deductCartProduct,
        deleteCartProduct,
    };
};
