import { BASE_URL } from '../utils/constants.js';
import { toastMessage } from '../utils/toast.js';

// wishlist
export const getAllWishListProduct = async () => {
    try {
        const response = await fetch(`${BASE_URL}/wishlist`);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch wishlist data. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getAllWishListProduct.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};

export const addProductToWishlist = async (payload) => {
    try {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('Payload must be in object format.');
        }
        const response = await fetch(`${BASE_URL}/wishlist`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to add product to wishlist. Status : ${response.status}`,
            );
        }
        return response.json();
    } catch (error) {
        console.error('Error in addProductToWishlist', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};

export const deleteWishlistProductById = async (id) => {
    try {
        if (!id) {
            throw new Error('Product id is required.');
        }
        const response = await fetch(`${BASE_URL}/wishlist/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete pproduct from wishlist. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in deleteWishlistProductById.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};
