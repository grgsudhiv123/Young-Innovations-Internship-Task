import { BASE_URL } from '../../../utils/constants.js';

const PopularCategory = async () => {
    const categoryContainer = document.getElementById('popularCategory');

    try {
        const response = await fetch(`${BASE_URL}/categories`);
        const data = await response.json();

        categoryContainer.innerHTML = data
            .map(
                (element) => `
        <div data-cardid=${element.id} class="col-span-4 sm:col-span-3 lg:col-span-2 pt-2 md:pt-4 pb-2 md:pb-4 lg:pb-6 flex flex-col gap-2 md:gap-4 px-1.5 rounded-[5px] border border-gray-200 cursor-pointer group transition-all duration-200 ease-in-out hover:border-(--success-dark) category-card-shadow categoryCards">
            <div class=" aspect-190/130 overflow-hidden rounded-sm">
              <img src=${element.img} class="w-full h-full object-cover object-center"/>
            </div>
            <p class="text-xs lg:text-sm xl:text-lg leading-[100%] xl:leading-[150%] font-medium text-center capitalize group-hover:text-(--success-dark) transition-all duration-200 ease-in-out">${element.name}</p>
        </div>
    `,
            )
            .join('');

        // redirection to all products page
        const categoryCards = document.querySelectorAll('.categoryCards');

        if (categoryCards.length > 0) {
            categoryCards.forEach((card) => {
                card.addEventListener('click', () => {
                    window.location.href = `./allproducts.html?category_id=${card.dataset.cardid}`;
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export default PopularCategory;
