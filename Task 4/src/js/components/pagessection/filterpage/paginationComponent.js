import { debouncedDataFetch } from './filterFeatures.js';
import { itemsPerPage } from './renderFilterProductPage.js';

export const paginationComponent = (totalItems, filter) => {
    if (!totalItems) {
        return;
    }

    const noOfPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = filter.pagination.currentPage;

    const pagenoBtns = Array.from({ length: noOfPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;
        return `
            <button 
                id="pageBtn-${pageNumber}"
                type="button" 
                class="pagebtn flex items-center justify-center cursor-pointer size-8 rounded-full ${isActive ? 'bg-(--light-green) hover:bg-green-600 text-white' : 'text-gray-600'} transition-all duration-200 ease-in-out group"
            >
                <span class="text-sm">${pageNumber}</span>
            </button>
        `;
    }).join('');
    const pagenoBtnContainer = document.getElementById(
        'paginationBtnsContainer',
    );
    if (pagenoBtnContainer) {
        pagenoBtnContainer.innerHTML = pagenoBtns;
        // event listeners
        const [prevBtn, nextBtn] = document.querySelectorAll('.paginationBtns');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (filter.pagination.currentPage > 1) {
                    filter.pagination.currentPage--;
                    debouncedDataFetch(filter);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (filter.pagination.currentPage < noOfPages) {
                    filter.pagination.currentPage++;
                    debouncedDataFetch(filter);
                }
            });
        }

        pagenoBtnContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.pagebtn');
            if (btn) {
                const pageNumber = btn.querySelector('span').textContent;
                const isActiveBtn =
                    filter.pagination.currentPage == Number(pageNumber);
                if (!isActiveBtn) {
                    filter.pagination.currentPage = Number(pageNumber);
                    debouncedDataFetch(filter);
                }
            }
        });
    }
};
