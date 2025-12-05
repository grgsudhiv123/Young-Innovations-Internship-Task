import { searchProducts } from '../searchFeature.js';

export async function search(container) {
    if (!container) {
        console.log('Error, bottom navbar container not found');
        return;
    }
    container.innerHTML = `
        <div class="h-full w-full">
            <h2 class="text-lg">Search Product</h2>
            <div id="homeContainer" class="mt-5">
                    <div class="w-full flex items-center gap-2 py-1 px-4 rounded-lg border border-gray-200 focus-within:border-gray-400 group">
                        <i class="fa-solid fa-magnifying-glass text-gray-400 group-focus-within:text-gray-700"></i>
                        <input type="text" placeholder="Search" class="w-full p-2 outline-0"/>
                    </div>
                    <div id="searchResultContainer" class="flex w-full flex-col gap-1 mt-5 h-[74vh] overflow-y-auto">
                        <div class="w-full h-full flex items-center justify-center gap-2">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <p>"Search products"</p>
                        </div>
                    </div>
            </div>
        </div>
    `;

    const homeContent = document.getElementById('homeContainer');

    const inputField = homeContent.querySelector('input');

    const searchResultContainer = document.getElementById(
        'searchResultContainer',
    );

    function toProductDetail(id) {
        window.location.href = `productsdetail.html?id=${id}`;
    }

    const onResultChange = (searchResult) => {
        if (searchResult && searchResult.length > 0) {
            const productCards = searchResult
                .map(
                    (product) => `
                    <div data-id=${product.id} tabindex="0" class="searchResultCard w-full p-2 rounded-lg border border-gray-200 flex gap-2">
                        <div class="aspect-square size-14">
                            <img src=${product.imgURL[0]} alt="products img : ${product.name}" class="w-full h-full object-cover object-center"/>
                        </div>
                        <div class="flex flex-col gap-1">
                            <p class="text-base font-semibold leading-[150%]">${product.name}</p>
                            <p class="line-clamp-1 text-xs font-normal text-gray-500">${product.desc}</p>
                        </div>
                    </div>
                `,
                )
                .join('');

            searchResultContainer.innerHTML = productCards;

            if (productCards) {
                productCards.forEach((card) =>
                    card.addEventListener('click', () => {
                        const productId = card.dataset.id;
                        toProductDetail(productId);
                    }),
                );
            }
        } else {
            searchResultContainer.innerHTML = `
                <div class="w-full h-full flex items-center justify-center gap-2">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>"Search products"</p>
                </div>
            `;
        }
    };

    await searchProducts(inputField, onResultChange);
}
