import { debouncedDataFetch, defaultPageNo } from './filterFeatures.js';

// price range
export function updatePriceRange(filter) {
    const rangeInputs = document.querySelectorAll('.range-input input');
    const progress = document.getElementById('priceRangeProgressBar');
    const rangeGap = 10;
    let minRange = Number(rangeInputs[0].value);
    let maxRange = Number(rangeInputs[1].value);
    progress.style.left = (minRange / rangeInputs[0].max) * 100 + '%';
    progress.style.right = 100 - (maxRange / rangeInputs[0].max) * 100 + '%';

    const minPriceRange = document.getElementById('rangeForMinPrice');
    const maxPriceRange = document.getElementById('rangeForMaxPrice');
    minPriceRange.textContent = `$${minRange}`;
    maxPriceRange.textContent = `$${maxRange}`;

    rangeInputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            minRange = Number(rangeInputs[0].value);
            maxRange = Number(rangeInputs[1].value);

            if (maxRange - minRange < rangeGap) {
                if (input.classList.contains('range-min')) {
                    minRange = maxRange - rangeGap;
                    rangeInputs[0].value = minRange;
                } else {
                    maxRange = minRange + rangeGap;
                    rangeInputs[1].value = maxRange;
                }
            }

            progress.style.left = (minRange / rangeInputs[0].max) * 100 + '%';
            progress.style.right =
                100 - (maxRange / rangeInputs[0].max) * 100 + '%';

            minPriceRange.textContent = `$${minRange}`;
            maxPriceRange.textContent = `$${maxRange}`;
        });
    });

    // for price range filter
    const [minInput, maxInput] =
        document.querySelectorAll('.range-input input');
    if ([minInput, maxInput].length > 0) {
        [minInput, maxInput].forEach((rangeInput) => {
            rangeInput.addEventListener('change', () => {
                const minPrice = Number(minInput.value);
                const maxPrice = Number(maxInput.value);
                filter.price = [minPrice, maxPrice];
                filter.pagination.currentPage = defaultPageNo(filter);
                debouncedDataFetch(filter);
            });
        });
    }

    // handle chevron btn
    // handleFilterShowBtn('showPriceRangeBtn', 'priceRangeContainer');
}
