import { debouncedDataFetch, defaultPageNo } from './filterFeatures.js';

// sorting feature
export function sortByFeature(filter) {
    const sortBtn = document.getElementById('sortBySelect');
    if (sortBtn) {
        sortBtn.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            if (selectedValue && selectedValue === 'asc') {
                filter.sort = 'baseprice';
            } else {
                filter.sort = '-baseprice';
            }
            filter.pagination.currentPage = defaultPageNo(filter);
            debouncedDataFetch(filter);
        });
    }
}
