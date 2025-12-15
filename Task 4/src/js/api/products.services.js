import { BASE_URL } from '../utils/constants.js';
import { toastMessage } from '../utils/toast.js';

export const getAllProducts = async (filter) => {
    try {
        let url = `${BASE_URL}/products`;
        if (filter) {
            if (typeof filter !== 'string') {
                throw new Error('Filter is not in a string format.');
            }
            const trimmedFilter = filter.trim();

            if (trimmedFilter !== '') {
                url = `${url}?${trimmedFilter}`;
            }
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch products. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getAllProducts', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        if (!id) {
            throw new Error('Product id is required.');
        }
        let url = `${BASE_URL}/products/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch product. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getProductById.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};
