import { debouncedDataFetch, initialFilter } from './filterFeatures.js';
import { updatePriceRange } from './updatePriceRange.js';

export const clearFilter = (filter) => {
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', () => {
            filter = JSON.parse(JSON.stringify(initialFilter));

            clearFilterBtn.classList.remove(
                'bg-(--light-green)',
                'hover:bg-(--success-dark)',
            );
            clearFilterBtn.classList.add('bg-gray-400');
            window.history.pushState({}, '', window.location.pathname);

            debouncedDataFetch(filter);
            // clear category radio
            const categoryInputs = document.querySelectorAll(
                "input[name='category']",
            );
            if (categoryInputs.length > 0) {
                categoryInputs.forEach((radio) => {
                    radio.checked = false;
                });
            }

            // clear tags filter
            const tagsBtns = document.querySelectorAll('.tagsFilterChips');
            if (tagsBtns.length > 0) {
                tagsBtns.forEach((btn) => {
                    btn.classList.remove('active');
                });
            }

            // clearing rating radio inputs
            const ratingInputs = document.querySelectorAll(
                "input[name='rating']",
            );
            if (ratingInputs.length > 0) {
                ratingInputs.forEach((radio) => {
                    radio.checked = false;
                });
            }

            // clear price range
            const [minInput, maxInput] =
                document.querySelectorAll('.range-input input');
            if (minInput && maxInput) {
                minInput.value = 30;
                maxInput.value = 80;
                updatePriceRange();
            }
        });
    }
};
