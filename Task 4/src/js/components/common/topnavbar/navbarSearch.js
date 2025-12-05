import { searchProducts } from '../searchFeature.js';

export async function navbarSearch() {
    const searchResultContainer = document.getElementById('navbarSearchResult');
    const searchContainer = document.getElementById('searchContainer');

    if (!searchContainer || !searchContainer) {
        console.log('Error, required elements not found.');
        return;
    }
    const inputField = document.querySelector(
        'input[name = "navbarSearchField"]',
    );

    inputField.addEventListener('click', () => {
        searchResultContainer.classList.remove('hidden');
        searchResultContainer.classList.add('block');
    });

    document.addEventListener('click', (e) => {
        if (searchResultContainer.classList.contains('hidden')) return;

        const isClickField = inputField.contains(e.target);
        const isClickSearchResult = searchResultContainer.contains(e.target);

        if (!isClickField && !isClickSearchResult) {
            searchResultContainer.classList.add('hidden');
            searchResultContainer.classList.remove('block');
            inputField.value = '';
        }
    });

    const onResultChange = (searchResult) => {
        if (searchResult && searchResult.length > 0) {
            const productCards = searchResult
                .map(
                    (product) => `
                    <div data-id=${product.id} tabindex="0" class="searchResultCard w-full p-2 rounded-lg border border-gray-200 flex gap-2 hover:bg-gray-50 cursor-pointer transform-all duration-100 ease-in-out">
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

            searchContainer.addEventListener('click', (e) => {
                const card = e.target.closest('.searchResultCard');
                if (card) {
                    const productId = card.dataset.id;
                    window.location.href = `productsdetail.html?id=${productId}`;
                }
            });

            searchContainer.addEventListener('keydown', (e) => {
                const card = e.target.closest('.searchResultCard');
                if (card && e.key === 'Enter') {
                    const productId = card.dataset.id;
                    window.location.href = `productsdetail.html?id=${productId}`;
                }
            });
        } else {
            searchResultContainer.innerHTML = `
                <div class="w-full h-40 flex justify-center items-center">
                    <p class="text-base text-gray-500 font-normal">No search results</p>
                </div>
            `;
        }
    };

    await searchProducts(inputField, onResultChange);
}
