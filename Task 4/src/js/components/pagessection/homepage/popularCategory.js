import { getAllCategories } from '../../../api/categories.services.js';

const PopularCategory = async () => {
    const categoryContainer = document.getElementById('popularCategory');
    if (!categoryContainer) {
        console.error('categoryContainer element not found.');
        return;
    }
    try {
        const categoryData = await getAllCategories();

        if (!categoryData) {
            throw new Error('Error, while fetching data');
        }

        categoryContainer.innerHTML = categoryData
            .map(
                (element) => `
                <div data-cardid=${element.id} tabindex="0" class="col-span-4 sm:col-span-3 lg:col-span-2 pt-2 md:pt-4 pb-2 md:pb-4 lg:pb-6 flex flex-col gap-2 md:gap-4 px-1.5 rounded-[5px] border border-gray-200 cursor-pointer group transition-all duration-200 ease-in-out hover:border-(--success-dark) category-card-shadow categoryCards">
                    <div class=" aspect-190/130 overflow-hidden rounded-sm">
                    <img src=${element.img} alt="Product category image" class="w-full h-full object-cover object-center"/>
                    </div>
                    <p class="text-xs lg:text-sm xl:text-lg leading-[100%] xl:leading-[150%] font-medium text-center capitalize group-hover:text-(--success-dark) transition-all duration-200 ease-in-out">${element.name}</p>
                </div>`,
            )
            .join('');

        // redirection to all products page
        const categoryCards = document.querySelectorAll('.categoryCards');

        if (categoryCards.length > 0) {
            categoryCards.forEach((card) => {
                card.addEventListener('click', () => {
                    window.location.href = `./allproducts.html?category=${card.dataset.cardid}`;
                });
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        window.location.href = `./allproducts.html?category=${card.dataset.cardid}`;
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error in PopularCategory.', error.message);
        throw error;
    }
};

export default PopularCategory;
