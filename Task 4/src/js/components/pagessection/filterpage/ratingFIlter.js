import { debouncedDataFetch, defaultPageNo } from './filterFeatures.js';

export function ratingFeatures(filter) {
    // for rating filter
    const ratingContainer = document.getElementById('filterRatingContainer');
    if (ratingContainer) {
        const ratingList = Array.from({ length: 5 }, (_, index) =>
            ratingStars(index + 1),
        )
            .reverse()
            .join('');
        ratingContainer.innerHTML = ratingList;
    }

    const ratingInputs = document.querySelectorAll("input[name='rating']");
    if (ratingInputs.length > 0) {
        ratingInputs.forEach((radio) => {
            radio.addEventListener('change', (e) => {
                const selectedRating = e.target.value;
                filter.rating = selectedRating;
                filter.pagination.currentPage = defaultPageNo(filter);
                debouncedDataFetch(filter);
            });
        });
    }

    // handleFilterShowBtn('showRatingBtn', 'filterRatingContainer');
}
// rating
export function stars(ratingCount) {
    const star =
        ratingCount &&
        `<i class="fa-solid fa-star text-[10px] text-(--warning-color)"></i>`.repeat(
            Math.floor(ratingCount),
        ) +
            `<i class="fa-solid fa-star text-[10px] text-gray-200"></i>`.repeat(
                5 - Math.floor(ratingCount),
            );
    return star;
}
export function ratingStars(rating) {
    return `
        <li class="flex items-center gap-2 py-2.5">
            <input type="radio" name="rating" id="rating-${rating}" value=${rating} class="w-4 h-4 accent-green-800 cursor-pointer">
            <label for="rating-${rating}" name="rating" class="text-sm font-medium leading-[150%]">
                <span id="rating-${rating}" class="">${stars(rating)}</span>
                <span class="text-gray-500">${Math.floor(rating)} ${Math.floor(rating) !== 5 ? '& up' : ''}</span>
            </label>
        </li>
    `;
}
