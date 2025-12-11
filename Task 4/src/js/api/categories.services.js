import { BASE_URL } from '../utils/constants.js';
import { toastMessage } from '../utils/toast.js';

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch category data. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getAllCategories.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};

export const getCategoriesById = async (id) => {
    try {
        if (!id) {
            throw new Error('Category id is required.');
        }
        let url = `${BASE_URL}/categories/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch category data. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getCategoriesById.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};
