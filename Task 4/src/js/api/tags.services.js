import { BASE_URL } from '../utils/constants.js';
import { toastMessage } from '../utils/toast.js';

export const getAllTags = async () => {
    try {
        const response = await fetch(`${BASE_URL}/tags`);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch tags data. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getAllTags.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};

export const getTagsById = async (id) => {
    try {
        if (!id) {
            throw new Error('Tag id is required.');
        }
        let url = `${BASE_URL}/tags/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch tag data. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getTagsById.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};
