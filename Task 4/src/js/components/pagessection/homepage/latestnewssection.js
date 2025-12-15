import { getNews } from '../../../api/news.services.js';
import { toastMessage } from '../../../utils/toast.js';
import { NewsCard } from '../../common/newsCard.js';

export async function LatestNewsSection() {
    try {
        const newsData = await getNews('_limit=3');
        const latestNewsContainer = document.getElementById(
            'latest-news-container',
        );

        if (!latestNewsContainer) {
            throw new Error('latestNewsContainer not found');
        }

        latestNewsContainer.innerHTML = newsData
            .map((news) => NewsCard(news))
            .join('');
    } catch (error) {
        console.error('Error in LatestNewsSection.', error.message);
        toastMessage(error.message, 'error');
        throw error;
    }
}
