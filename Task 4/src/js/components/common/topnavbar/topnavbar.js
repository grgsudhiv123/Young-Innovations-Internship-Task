import { getAllWishListProduct } from '../../../api/wishlist.services.js';
import { renderDropdown } from './dropdownMenu.js';
import { navbarSearch } from './navbarSearch.js';

async function navbar() {
    renderDropdown();
    navbarSlide();
    navbarSearch();
    navbarWishList();
    selectorDropdown();
}

export default navbar;

// navbar features
function navbarSlide() {
    const nav1 = document.getElementById('headernav1');
    const headerContainer = document.getElementById('header-container');

    const nav1Height = nav1.offsetHeight;

    window.addEventListener('scroll', () => {
        if (scrollY >= nav1Height) {
            headerContainer.classList.add(
                'fixed',
                'left-0',
                'right-0',
                'top-0',
            );
        } else {
            headerContainer.classList.remove(
                'fixed',
                'left-0',
                'right-0',
                'top-0',
            );
        }
    });
}

async function navbarWishList() {
    const navWishlistBtn = document.getElementById('navWishlistBtn');
    const wishlistBtnIcon = document.getElementById('navWishlistBtnIcon');

    const navWishlistCount = document.getElementById('navWishlistCount');
    navWishlistCount.classList.add('hidden');
    if (wishlistBtnIcon) {
        const wishlistData = await getAllWishListProduct();
        if (wishlistData.length > 0) {
            wishlistBtnIcon.classList.remove('fa-regular');
            wishlistBtnIcon.classList.add('fa-solid');
            navWishlistCount.innerText = wishlistData.length;
            navWishlistCount.classList.remove('hidden');
        }
    }
    if (navWishlistBtn) {
        navWishlistBtn.addEventListener('click', () => {
            window.location.href = '/public/wishlistpage.html';
        });
    }
}

function selectorDropdown() {
    const languageSelector = document.getElementById('languageSelector');
    const currencySelector = document.getElementById('currencySelector');

    const selectLangBtn = languageSelector.querySelector('button');
    const selectCurrencyBtn = currencySelector.querySelector('button');

    const languageChevron = selectLangBtn.querySelector('i');
    const currencyChevron = selectCurrencyBtn.querySelector('i');

    const languageContainer = languageSelector.querySelector('ul');
    const currencyContainer = currencySelector.querySelector('ul');

    selectLangBtn.addEventListener('click', () => {
        languageContainer.classList.toggle('hidden');
        languageChevron.classList.toggle('rotate-180');

        //close container
        currencyContainer.classList.add('hidden');
        currencyChevron.classList.remove('rotate-180');
    });

    selectCurrencyBtn.addEventListener('click', () => {
        currencyContainer.classList.toggle('hidden');
        currencyChevron.classList.toggle('rotate-180');
        // close language
        languageContainer.classList.add('hidden');
        languageChevron.classList.remove('rotate-180');
    });

    const langOptionBtns = languageContainer.querySelectorAll(
        'button[data-btnValue]',
    );
    const currencyOptionBtns = currencyContainer.querySelectorAll(
        'button[data-btnValue]',
    );

    langOptionBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectLangBtn.querySelector('span').innerText =
                btn.dataset.btnvalue;

            languageContainer.classList.add('hidden');
            languageChevron.classList.remove('rotate-180');
        });
    });

    currencyOptionBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectCurrencyBtn.querySelector('span').innerText =
                btn.dataset.btnvalue;
            currencyContainer.classList.add('hidden');
            currencyChevron.classList.remove('rotate-180');
        });
    });

    document.addEventListener('click', (e) => {
        if (
            !selectLangBtn.contains(e.target) &&
            !selectCurrencyBtn.contains(e.target)
        ) {
            languageContainer.classList.add('hidden');
            languageChevron.classList.remove('rotate-180');
            currencyContainer.classList.add('hidden');
            currencyChevron.classList.remove('rotate-180');
        }
    });
}
