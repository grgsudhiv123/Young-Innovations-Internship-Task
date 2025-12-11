import { getAllCategories } from '../../../api/categories.services.js';
import { getAllProducts } from '../../../api/products.services.js';
import { debouncedDataFetch, defaultPageNo } from './filterFeatures.js';

export const categoryFeatures = async (filter) => {
    const categoryData = await getAllCategories();
    const categoryContainer = document.getElementById(
        'filterCategoryContainer',
    );
    if (categoryData.length > 0) {
        const categoryList = categoryData
            .map((category) => CategoryList(category))
            .join('');
        if (categoryList) {
            categoryContainer.innerHTML = categoryList;
        }
        updateCategoryQuantity(categoryData);
    }

    const categoryInputs = document.querySelectorAll("input[name='category']");
    if (categoryInputs.length > 0) {
        categoryInputs.forEach((radio) => {
            radio.addEventListener('change', (e) => {
                const selectedCategory = e.target.value;
                filter.category = selectedCategory;
                filter.pagination.currentPage = defaultPageNo(filter);
                debouncedDataFetch(filter);
            });
        });
    }
};

function CategoryList(category) {
    return `
        <li class="flex items-center gap-2 py-2.5">
            <input type="radio" name="category" value=${category.id} id="${category.name}-${category.id}" class="w-4 h-4 accent-green-800 cursor-pointer">
            <label for="${category.name}-${category.id}" name="category" class="text-sm font-medium leading-[150%] cursor-pointer">
                <span id="category-name-${category.id}" class="capitalize">${category.name}</span>
                <span class="text-gray-500">(<span id="category-quantity-${category.id}"></span>)</span>
            </label>
        </li>
    `;
}

const updateCategoryQuantity = async (categoryData) => {
    if (categoryData.length > 0) {
        const quantityPromises = await Promise.all(
            categoryData.map(async (category) => {
                try {
                    const categoryData = await getAllProducts(
                        `category=${category.id}`,
                    );
                    return { quantity: categoryData.length, id: category.id };
                } catch (error) {
                    console.log(
                        `Error while fetching category data of id ${category.id} : `,
                        error,
                    );
                    return error;
                }
            }),
        );
        quantityPromises.forEach((quantity) => {
            const categoryQuantityEl = document.getElementById(
                `category-quantity-${quantity.id}`,
            );
            if (categoryQuantityEl) {
                categoryQuantityEl.textContent = quantity.quantity;
            }
        });
    }
};
