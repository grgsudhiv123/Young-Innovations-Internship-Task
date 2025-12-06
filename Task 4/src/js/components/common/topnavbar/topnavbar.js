import { FetchApi } from '../../../utils/fetchApi.js';
import { renderDropdown } from './dropdownMenu.js';
import { navbarSearch } from './navbarSearch.js';

async function navbar() {
    renderDropdown();
    navbarSlide();
    navbarSearch();
    navbarWishList();
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
    if (wishlistBtnIcon) {
        const wishlistData = await FetchApi('wishlist', '');
        if (wishlistData.length > 0) {
            wishlistBtnIcon.classList.remove('fa-regular');
            wishlistBtnIcon.classList.add('fa-solid');
            navWishlistCount.innerText = wishlistData.length;
        }
    }
    if (navWishlistBtn) {
        navWishlistBtn.addEventListener('click', () => {
            window.location.href = '/public/wishlistpage.html';
        });
    }
}
