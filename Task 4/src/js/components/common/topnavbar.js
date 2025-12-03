import { FetchApi } from '../../utils/fetchApi.js';

async function navbar() {
    // navbar slide feature
    navbarSlide();

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

export default navbar;

function navbarSlide() {
    const nav1 = document.getElementById('headernav1');
    const nav2 = document.getElementById('headernav2');
    const nav3 = document.getElementById('headernav3');

    const nav1Height = nav1.offsetHeight;
    const nav2Height = nav2.offsetHeight;
    const header = document.getElementById('header');

    const headerHeight = header.offsetHeight;
    console.log(headerHeight);
    let prevScroll = 0;

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;

        if (scrollY >= nav1Height) {
            nav2.classList.add('fixed', 'left-0', 'right-0', 'top-0');
            nav3.style.marginTop = `${nav2Height}px`;
            nav2.classList.add('transition-all', 'duration-500', 'ease-in-out');
        } else {
            nav2.classList.remove('fixed', 'left-0', 'right-0', 'top-0');
            nav3.style.marginTop = '0';
        }

        if (scrollY > headerHeight) {
            if (scrollY > prevScroll) {
                nav2.classList.add('-translate-y-[100%]');
            } else {
                nav2.classList.remove('-translate-y-[100%]');
            }
        }

        prevScroll = scrollY;
    });
}
