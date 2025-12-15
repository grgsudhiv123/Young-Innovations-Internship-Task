import { filteredFeatures } from '../../../features/filterFeatures.js';
import { debounce } from '../../../utils/debounce.js';
import { filter } from './renderFilterProductPage.js';
import { updatePriceRange } from './updatePriceRange.js';

export let initialFilter;
let lastFilter = null;

// get filter params from search queries
export const getFiltersFromURL = (filter) => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = { ...filter };
    initialFilter = JSON.parse(JSON.stringify(urlFilter));

    const category = urlParams.get('category');
    if (category) urlFilter.category = category;

    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');
    if (minPrice && maxPrice) {
        urlFilter.price = [Number(minPrice), Number(maxPrice)];
    }

    const rating = urlParams.get('rating');
    if (rating) urlFilter.rating = rating;

    const tags = urlParams.get('tags');
    if (tags) {
        urlFilter.tags = tags.split(',').map((tag) => Number(tag));
    }

    const sort = urlParams.get('sort');
    if (sort) urlFilter.sort = sort;

    const page = urlParams.get('page');
    if (page) urlFilter.pagination.currentPage = Number(page);

    return urlFilter;
};

// update the search params
export const updateURL = (filterObj) => {
    const params = new URLSearchParams();

    if (filterObj.category) {
        params.set('category', filterObj.category);
    }

    if (filterObj.price && Array.isArray(filterObj.price)) {
        params.set('minPrice', filterObj.price[0]);
        params.set('maxPrice', filterObj.price[1]);
    }

    if (filterObj.rating) {
        params.set('rating', filterObj.rating);
    }

    if (filterObj.tags && filterObj.tags.length > 0) {
        params.set('tags', filterObj.tags.join(','));
    }

    if (filterObj.sort) {
        params.set('sort', filterObj.sort);
    }

    if (filterObj.pagination.currentPage > 1) {
        params.set('page', filterObj.pagination.currentPage);
    }

    const newURL = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

    window.history.pushState({}, '', newURL);
};

// apply default filter ui
export const applyFiltersToUI = (filterObj) => {
    if (filterObj.category) {
        const categoryInputs = document.querySelectorAll(
            "input[name='category']",
        );
        categoryInputs.forEach((radio) => {
            if (radio.value === filterObj.category) {
                radio.checked = true;
            }
        });
    }

    if (filterObj.rating) {
        const ratingInputs = document.querySelectorAll("input[name='rating']");
        ratingInputs.forEach((radio) => {
            if (radio.value === filterObj.rating) {
                radio.checked = true;
            }
        });
    }

    if (filterObj.tags && filterObj.tags.length > 0) {
        filterObj.tags.forEach((tagId) => {
            const tagBtn = document.getElementById(`tagsBtn-${tagId}`);

            if (tagBtn) {
                tagBtn.classList.add('active');
            }
        });
    }

    if (filterObj.price && Array.isArray(filterObj.price)) {
        const [minInput, maxInput] =
            document.querySelectorAll('.range-input input');
        if (minInput && maxInput) {
            minInput.value = filterObj.price[0];
            maxInput.value = filterObj.price[1];
            updatePriceRange();
        }
    }

    if (filterObj.sort) {
        const sortBtn = document.getElementById('sortBySelect');
        if (sortBtn) {
            sortBtn.value = filterObj.sort === 'baseprice' ? 'asc' : 'desc';
        }
    }
};

// debounce the filter
export const debouncedDataFetch = debounce((filter) => {
    filteredFeatures(filter);
    updateURL(filter);
}, 1000);

// check filter change
export const isFilterChanged = (currentFilter) => {
    const currentString = JSON.stringify(currentFilter);
    const lastString = lastFilter ? JSON.stringify(lastFilter) : null;
    const isUpdated = currentString !== lastString;

    // clear filter btn
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    if (isUpdated) {
        lastFilter = JSON.parse(currentString);
        const isSameDefaultFilterString =
            JSON.stringify(currentFilter) === JSON.stringify(initialFilter);
        if (clearFilterBtn && !isSameDefaultFilterString) {
            clearFilterBtn.classList.remove('bg-gray-400');
            clearFilterBtn.classList.add(
                'bg-(--light-green)',
                'hover:bg-(--success-dark)',
            );
        }
    }
    return isUpdated;
};

// default page
export const defaultPageNo = (currentfilter) => {
    const updatedPage = isFilterChanged(currentfilter)
        ? 1
        : filter.pagination.currentPage;
    return updatedPage;
};
