import { BASE_URL } from '../utils/constants.js';
import { toastMessage } from '../utils/toast.js';

export const getNews = async (filter) => {
    try {
        let url;
        if (filter) {
            if (typeof filter !== 'string') {
                throw new Error('Filter is not in a string format.');
            }
            const trimmedFilter = filter.trim();

            if (trimmedFilter !== '') {
                url = `${BASE_URL}/news?${trimmedFilter}`;
            }
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch news data. Status : ${response.status}`,
            );
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getNews.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
};
