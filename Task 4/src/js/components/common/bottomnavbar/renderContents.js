import { navbarConstants } from '../../../utils/constants.js';
import { searchProducts } from '../searchFeature.js';

export function home(container) {
    if (!container) {
        console.log('Error, bottom navbar container not found');
        return;
    }
    container.innerHTML = `
        <div class="h-full w-full">
            <h2 class="text-lg">Quick Access</h2>
            <div id="homeContainer" class="mt-5">
            </div>
        </div>
    `;

    const homeContent = document.getElementById('homeContainer');
    if (homeContent) {
        const contents = navbarConstants
            .map(
                (data, i) => `
                    <div>
                        <button data-dropdownBtn='${data.header}' type="button" class="p-2 w-full flex justify-between items-center">
                            <span class="text-base font-semibold leading-[150%]">${data.header}</span>
                            ${data.contents ? `<i class="fa-solid fa-plus text-xs text-gray-500 transition-all duration-500 ease-in-out"></i>` : ''}
                        </button>
                        ${
                            data.contents
                                ? `<ul
                                    id="${data.header}-content"
                                    class="max-h-0 w-full h-full overflow-hidden ml-4 border-l border-gray-500 transform-all duration-500 ease-in-out"
                                >
                                    ${data.contents
                                        .map(
                                            (content) => `
                                    <li class="pl-2 py-1">
                                        <a href="${content.link}" class="text-sm font-medium text-gray-600">${content.item}</a>
                                    </li>    
                                `,
                                        )
                                        .join('')}
                                </ul>`
                                : ''
                        }
                    </div>
                    ${i < navbarConstants.length - 1 ? `<div class="h-px w-full bg-gray-200 my-1"></div>` : ''}
                `,
            )
            .join('');

        homeContent.innerHTML = contents;
        handleDropDownBtn(homeContent);
    }
}

function handleDropDownBtn(homeContent) {
    if (!homeContent) {
        console.log('Error, required element not found.');
        return;
    }
    const dropdownBtns = homeContent.querySelectorAll('button');
    dropdownBtns.forEach((btn) => {
        const btnAttribute = btn.getAttribute('data-dropdownBtn');
        const listContainer = document.getElementById(
            `${btnAttribute}-content`,
        );
        btn.addEventListener('click', () => {
            const btnIcon = btn.querySelector('i');
            console.log('btnicon : ', btnIcon);
            if (listContainer) {
                if (listContainer.classList.contains('max-h-0')) {
                    listContainer.classList.remove('max-h-0');
                    listContainer.classList.add('max-h-[500px]');
                    btnIcon.classList.add('rotate-90');
                } else {
                    listContainer.classList.add('max-h-0');
                    listContainer.classList.remove('max-h-[500px]');
                    btnIcon.classList.remove('rotate-90');
                }
            }
        });

        window.addEventListener('click', (e) => {
            if (!listContainer) return;

            const isBtnClick = btn.contains(e.target);
            if (!isBtnClick && !listContainer.classList.contains('max-h-0')) {
                listContainer.classList.add('max-h-0');
                listContainer.classList.remove('max-h-[500px]');
            }
        });
    });
}

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
                    <div id="searchResultContainer" class="flex w-full flex-col gap-1 mt-5"></div>
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

            const searchResultCards =
                document.querySelectorAll('.searchResultCard');

            if (searchResultCards) {
                searchResultCards.forEach((card) =>
                    card.addEventListener('click', () => {
                        const productId = card.dataset.id;
                        toProductDetail(productId);
                    }),
                );
            }
        } else {
            searchResultContainer.innerHTML = '';
        }
    };

    await searchProducts(inputField, onResultChange);
}

export function setting(container) {
    console.log('setting page render');
    container.innerHTML = '<p>setting page render</p>';
}

export function profile(container) {
    console.log('profile page render');
    container.innerHTML = '<p>profile page render</p>';
}
