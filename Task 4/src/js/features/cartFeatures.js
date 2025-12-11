import {
    addProductToCart,
    deleteCartProduct,
    getAllCartProducts,
    updateCartProduct,
} from '../api/productcart.services.js';
import { toastMessage } from '../utils/toast.js';

export const productCartFeatures = () => {
    let cartProduct = [];

    const addCartProduct = async (product) => {
        cartProduct = await getAllCartProducts();
        const repeatedProduct = cartProduct.find(
            (cartProduct) => cartProduct.id === product.id,
        );
        if (!repeatedProduct) {
            await addProductToCart({
                ...product,
                quantity: 1,
                addedAt: new Date().toISOString(),
            });
            toastMessage('Product added to cart', 'success');
        } else {
            await updateCartProduct(
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
        cartProduct = await getAllCartProducts();
        const repeatedProduct = await cartProduct.find(
            (cartProduct) => cartProduct.id === product.id,
        );
        if (repeatedProduct && repeatedProduct.quantity > 1) {
            await updateCartProduct(
                {
                    ...product,
                    quantity: repeatedProduct.quantity - 1,
                    updatedAt: new Date().toISOString(),
                },
                repeatedProduct.id,
            );
            toastMessage('Product removed from cart', 'success');
        } else {
            await deleteProductFromCart(product.id);
            toastMessage(`${product.name} removed from cart`, 'success');
        }
    };

    const deleteProductFromCart = async (id) => {
        try {
            await deleteCartProduct(id);
            toastMessage('Product removed from cart', 'success');
        } catch (error) {
            console.error('Error in deleteProductFromCart.', error.message);
            toastMessage(error.message, 'error');
        }
    };

    return {
        addCartProduct,
        deductCartProduct,
        deleteProductFromCart,
    };
};
