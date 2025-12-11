import { BASE_URL } from '../utils/constants.js';
import { toastMessage } from '../utils/toast.js';

export const getAllCartProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/cartProducts`);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch cart products. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error;
        ('Error in getAllCartProducts', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};

export const addProductToCart = async (payload) => {
    try {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error('Payload must be a valid object.');
        }

        const response = await fetch(`${BASE_URL}/cartProducts`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(
                `Failed to add product. Status : ${response.status}`,
            );
        }

        return response.json();
    } catch (error) {
        console.error('Error in addProductToCart ', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};

export const updateCartProduct = async (payload, id) => {
    try {
        if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
            throw new Error(`Product must be a valid object.`);
        }

        if (!id) {
            throw new Error('Product id is required.');
        }

        const response = await fetch(`${BASE_URL}/cartProducts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to update product. Status : ${response.status}`,
            );
        }
        return response.json();
    } catch (error) {
        console.error('Error in updateCartProduct.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};

export const deleteCartProduct = async (id) => {
    try {
        if (!id) {
            throw new Error('Product id is requied.');
        }

        const response = await fetch(`${BASE_URL}/cartProducts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(
                `Failed to delete product. Status: ${response.status}`,
            );
        }
        return response.json();
    } catch (error) {
        console.error('Error in deleteCartProduct ', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};
