import { filteredFeatures } from '../../../features/filterFeatures.js';
import { calculateDiscountedPrice } from '../../../utils/discountedPrice.js';
import { FetchAllProducts } from '../../../utils/fetchApi.js';
import { categoryFeatures } from './categoryFIlter.js';
import { clearFilter } from './clearFilter.js';
import { applyFiltersToUI, getFiltersFromURL } from './filterFeatures.js';
import { showFilterBtn } from './handleFilterUiShow.js';
import { ratingFeatures, stars } from './ratingFIlter.js';
import { sortByFeature } from './sortFilter.js';
import { tagsFeatures } from './tagsFilter.js';
import { updatePriceRange } from './updatePriceRange.js';

export const itemsPerPage = 5;

export let filter = {
    category: '',
    price: '',
    rating: '',
    tags: [],
    stock: '',
    sort: '',
    order: '',
    pagination: {
        currentPage: 1,
        itemsPerPage: itemsPerPage,
    },
};

export const renderfilterProductsPage = async () => {
    try {
        // default filter if we have query params
        filter = getFiltersFromURL(filter);

        await categoryFeatures(filter);

        // for rating filter
        ratingFeatures(filter);

        // for tags
        await tagsFeatures(filter);

        // for sortfeature
        sortByFeature(filter);

        // for price range filter
        updatePriceRange(filter);

        filteredFeatures(filter);

        // apply filterui update after all ui loads
        applyFiltersToUI(filter);

        // clear filter btn
        clearFilter(filter);

        // saleProductComponents
        saleProductComponents();

        showFilterBtn();
    } catch (error) {
        console.log('Error while rendering data : ', error);
    }
};

// sale product component
const saleProductComponents = async () => {
    const saleProductContainer = document.getElementById(
        'saleProductContainer',
    );
    const products = await FetchAllProducts('');
    const saleProductsData = await products.filter(
        (products) => Number(products.discount.replace('%', '')) > 40,
    );
    if (saleProductsData.length > 0) {
        const saleProductCards = await saleProductsData.slice(0, 3).map(
            (product) => `
        <div id="saleProductCard-${product.id}" class="w-full flex rounded-md border border-gray-100 cursor-pointer hover:border-(--success-dark) products-card-shadow transition-all duration-200 ease-in-out">
            <div class="max-w-28 w-full max-h-28 h-full aspect-square overflow-hidden p-1">
                <img src=${product.imgURL[0]} class="w-full h-full object-cover"/>
            </div>
            <div class="px-3 w-full flex flex-col justify-center">
                <p>${product.name}</p>
                <p class="text-base font-normal leading-[150%]">
                <span class="">$${calculateDiscountedPrice(product.baseprice, product.discount)}</span>
                <span class="line-through text-gray-400">$${product.baseprice}</span>
                </p>
                <span class="flex">
                    ${stars(product.rating)}
                </span>
            </div>
        </div>
        `,
        );
        saleProductContainer.innerHTML = await saleProductCards.join('');

        saleProductsData.slice(0, 3).map((product) => {
            const saleProductCard = document.getElementById(
                `saleProductCard-${product.id}`,
            );

            saleProductCard.addEventListener('click', () => {
                window.location.href = `productsdetail.html?id=${product.id}`;
            });
        });
    }
};
