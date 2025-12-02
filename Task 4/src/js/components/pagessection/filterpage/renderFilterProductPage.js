import { filteredFeatures } from '../../../features/filterFeatures.js';
import { debounce } from '../../../utils/debounce.js';
import { FetchAllProducts, FetchApi } from '../../../utils/fetchApi.js';
import ProductCard, { ProductBtns } from '../../common/productCard.js';

const itemsPerPage = 15;

let filter = {
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

let initialFilter = JSON.parse(JSON.stringify(filter));
let lastFilter = null;

const debouncedDataFetch = debounce((filter) => {
    // if (isFilterChanged(filter)) {
    filteredFeatures(filter);
    // }
}, 1000);

const isFilterChanged = (currentFilter) => {
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

const defaultPageNo = (currentfilter) => {
    const updatedPage = isFilterChanged(currentfilter)
        ? 1
        : filter.pagination.currentPage;
    return updatedPage;
};

export const renderfilterProductsPage = async () => {
    try {
        // default filter if we have query params
        // for category
        const urlParams = new URLSearchParams(window.location.search);

        // for categories filter
        await categoryFeatures();
        if (urlParams) {
            const categoryId = urlParams.get('category_id');
            if (categoryId) {
                filter.category = categoryId;
                const categoryInputs = document.querySelectorAll(
                    "input[name='category']",
                );
                categoryInputs.forEach((radio) => {
                    if (radio.value === categoryId) {
                        radio.checked = true;
                    }
                });
            }
        }

        filteredFeatures(filter);

        // for rating filter
        ratingFeatures();

        // for tags
        tagsFeatures();

        // for sortfeature
        sortByFeature();

        // for price range filter
        updatePriceRange();

        // clear filter btn
        clearFilter();

        // saleProductComponents
        saleProductComponents();
    } catch (error) {
        console.log('Error while rendering data : ', error);
    }
};

// render product cards
export const renderProductCards = async (productData) => {
    try {
        const productContainer = document.getElementById(
            'filteredProductContainer',
        );
        const newlyFetchedProducts = productData.data;
        const productCountEl = document.getElementById('filteredProductCount');

        if (newlyFetchedProducts.length > 0) {
            const productList = newlyFetchedProducts
                .map((product) => ProductCard(product, 'filteredProducts'))
                .join('');
            productContainer.innerHTML = productList;
            productCountEl.textContent = productData.items;
            paginationComponent(productData.items);
            ProductBtns(newlyFetchedProducts, 'filteredProducts');
        } else {
            productContainer.innerHTML = `
                <div class="col-span-12 lg:col-span-6 w-full h-[80vh] flex items-center justify-center">
                    <p class="text-center text-gray-500 text-sm font-normal leading-[150%]">No products found</p>
                </div>
            `;
            productCountEl.textContent = 0;
        }
    } catch (error) {
        console.log('Error while fetching the data : ', error);
        return error;
    }
};

// price range
function updatePriceRange() {
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
    handleFilterShowBtn('showPriceRangeBtn', 'priceRangeContainer');
}

function ratingFeatures() {
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

    handleFilterShowBtn('showRatingBtn', 'filterRatingContainer');
}

// rating
function stars(ratingCount) {
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
function ratingStars(rating) {
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

const paginationComponent = (totalItems) => {
    if (!totalItems) {
        return;
    }

    const noOfPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = filter.pagination.currentPage;

    const pagenoBtns = Array.from({ length: noOfPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;
        return `
            <button 
                id="pageBtn-${pageNumber}"
                type="button" 
                class="pagebtn flex items-center justify-center cursor-pointer size-8 rounded-full ${isActive ? 'bg-(--light-green) hover:bg-green-600 text-white' : 'text-gray-600'} transition-all duration-200 ease-in-out group"
            >
                <span class="text-sm">${pageNumber}</span>
            </button>
        `;
    }).join('');
    const pagenoBtnContainer = document.getElementById(
        'paginationBtnsContainer',
    );
    if (pagenoBtnContainer) {
        pagenoBtnContainer.innerHTML = pagenoBtns;
        // event listeners
        const [prevBtn, nextBtn] = document.querySelectorAll('.paginationBtns');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (filter.pagination.currentPage > 1) {
                    filter.pagination.currentPage--;
                    debouncedDataFetch(filter);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (filter.pagination.currentPage < noOfPages) {
                    filter.pagination.currentPage++;
                    debouncedDataFetch(filter);
                }
            });
        }

        pagenoBtnContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.pagebtn');
            if (btn) {
                const pageNumber = btn.querySelector('span').textContent;
                const isActiveBtn =
                    filter.pagination.currentPage == Number(pageNumber);
                if (!isActiveBtn) {
                    filter.pagination.currentPage = Number(pageNumber);
                    debouncedDataFetch(filter);
                }
            }
        });
    }
};

const categoryFeatures = async () => {
    const categoryData = await FetchApi('categories', '');
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
        // update category quantity
        updateCategoryQuantity(categoryData);
    }

    const categoryInputs = document.querySelectorAll("input[name='category']");
    if (categoryInputs.length > 0) {
        categoryInputs.forEach((radio) => {
            radio.addEventListener('change', (e) => {
                const selectedCategory = e.target.value;
                filter.category = selectedCategory;
                // set default page on filter change
                filter.pagination.currentPage = defaultPageNo(filter);
                debouncedDataFetch(filter);
            });
        });
    }

    handleFilterShowBtn('showCategoriesBtn', 'filterCategoryContainer');
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
                    const categoryData = await FetchApi(
                        'products',
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

// tags filter feature
const tagsFeatures = async () => {
    try {
        const tagsData = await FetchApi('tags', '');
        const tagsContainer = document.getElementById('filterTagsContainer');
        if (tagsData.length > 0) {
            const tagsList = tagsData
                .map((tags) => filterTagChips(tags))
                .join('');
            if (tagsList) {
                tagsContainer.innerHTML = tagsList;
            }
            tagsData.forEach((tagsData) => {
                const tagsBtns = document.getElementById(
                    `tagsBtn-${tagsData.id}`,
                );
                if (tagsBtns) {
                    tagsBtns.addEventListener('click', () => {
                        const tagsBtn = document.getElementById(
                            `tagsBtn-${tagsData.id}`,
                        );
                        if (tagsBtn) {
                            const isTagActive = filter.tags.find(
                                (tag) => tag === tagsData.id,
                            );
                            if (!isTagActive) {
                                filter.tags.push(Number(tagsData.id));
                                // set default page on filter change
                                filter.pagination.currentPage =
                                    defaultPageNo(filter);
                                tagsBtns.classList.add('active');
                            } else {
                                filter.tags = filter.tags.filter(
                                    (tag) => tag !== tagsData.id,
                                );
                                tagsBtns.classList.remove('active');
                            }
                            debouncedDataFetch(filter);
                        }
                    });
                }
            });
        }

        handleFilterShowBtn('showTagsBtn', 'filterTagsContainer');
    } catch (error) {
        console.log('Error while fetching the tags data : ', error);
        return error;
    }
};

function filterTagChips(tagsData) {
    return `
    <button type="button" id="tagsBtn-${tagsData.id}" class="w-fit px-4 py-1.5 rounded-full cursor-pointer transition-all duration-200 ease-in-out tagsFilterChips">
         <p class="text-sm font-normal leading-[150%] capitalize">${tagsData.name}</p>
    </button>
    `;
}

// sorting feature
function sortByFeature() {
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

// clear filter feature
const clearFilter = () => {
    const clearFilterBtn = document.getElementById('clearFilterBtn');
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', () => {
            filter = JSON.parse(JSON.stringify(initialFilter));

            clearFilterBtn.classList.remove(
                'bg-(--light-green)',
                'hover:bg-(--success-dark)',
            );
            clearFilterBtn.classList.add('bg-gray-400');

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

function calculateDiscountedPrice(baseprice, discount) {
    const discountedPrice =
        baseprice - baseprice * (discount.replace('%', '') / 100);
    return discountedPrice.toFixed(2);
}

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

const handleFilterShowBtn = (btnId, compId) => {
    const btn = document.getElementById(btnId);
    const icon = btn.querySelector('i');
    const comp = document.getElementById(compId);
    if (btn && comp) {
        btn.addEventListener('click', () => {
            icon.classList.toggle('rotate-180');
            comp.classList.toggle('active');
        });
    }
};
