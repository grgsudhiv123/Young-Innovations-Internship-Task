let btnHandlers;
const handleFilterShowBtn = (btnId, compId) => {
    const btn = document.getElementById(btnId);
    const icon = btn.querySelector('i');
    const comp = document.getElementById(compId);
    if (btn && comp) {
        if (btnHandlers) {
            btn.removeEventListener('click', btnHandlers);
        }
        btnHandlers = (e) => {
            e.stopPropagation();
            icon.classList.toggle('rotate-180');
            comp.classList.toggle('active');
        };
        btn.addEventListener('click', btnHandlers);
    }
};

export const showFilterBtn = () => {
    handleFilterShowBtn('showCategoriesBtn', 'filterCategoryContainer');
    handleFilterShowBtn('showRatingBtn', 'filterRatingContainer');
    handleFilterShowBtn('showTagsBtn', 'filterTagsContainer');
    handleFilterShowBtn('showPriceRangeBtn', 'priceRangeContainer');
};
