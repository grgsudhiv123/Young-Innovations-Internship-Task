import { getAllTags } from '../../../api/tags.services.js';
import { toastMessage } from '../../../utils/toast.js';
import { debouncedDataFetch, defaultPageNo } from './filterFeatures.js';

// tags filter feature

export const tagsFeatures = async (filter) => {
    try {
        const tagsData = await getAllTags();
        const tagsContainer = document.getElementById('filterTagsContainer');
        if (tagsData.length > 0) {
            const tagsList = tagsData
                .map((tags) => filterTagChips(tags))
                .join('');
            if (tagsList) {
                tagsContainer.innerHTML = tagsList;
            }

            tagsContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                const tagsBtn = e.target.closest('.tagsFilterChips');

                if (!tagsBtn) {
                    throw new Error('Tags button not found');
                }
                const tagId = tagsBtn.dataset.tagid;

                const isTagActive = filter.tags.find((tag) => tag === tagId);
                if (!isTagActive) {
                    filter.tags.push(tagId);
                    filter.pagination.currentPage = defaultPageNo(filter);
                    tagsBtn.classList.add('active');
                } else {
                    filter.tags = filter.tags.filter((tag) => tag !== tagId);
                    tagsBtn.classList.remove('active');
                }

                debouncedDataFetch(filter);
            });
        }
    } catch (error) {
        console.log('Error while fetching the tags data : ', error);
        toastMessage(error, 'error');
        return error;
    }
};

function filterTagChips(tagsData) {
    return `
    <button type="button" id="tagsBtn-${tagsData.id}" data-tagId=${tagsData.id} class="w-fit px-4 py-1.5 rounded-full cursor-pointer transition-all duration-200 ease-in-out tagsFilterChips">
         <p class="text-sm font-normal leading-[150%] capitalize">${tagsData.name}</p>
    </button>
    `;
}
