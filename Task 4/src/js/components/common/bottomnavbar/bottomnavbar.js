import { PreventScroll } from '../../../utils/preventScroll.js';
import { general } from './renderGeneral.js';
import { home } from './renderHome.js';
import { search } from './renderSearch.js';

export const bottomNavbar = () => {
    const backdrop = document.getElementById('bottomNavbarbackdrop');
    const buttonsContainer = document.getElementById('bottomNavbarBtns');
    const buttons = buttonsContainer.querySelectorAll('button');
    const bottomNavbar = document.getElementById('bottomNavbarContainer');
    const container = bottomNavbar.querySelector('div');
    const closeBtn = bottomNavbar.querySelector('button');

    if (!buttons || !backdrop || !bottomNavbar) {
        console.log('Error, required elements not found.');
        return;
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (container) {
                bottomNavbar.classList.add('active');
                backdrop.classList.add('active');
                PreventScroll.preventScroll();
            }
            renderBottomNavbarContents(btn.dataset.btnfor, container);
        });
    });

    // close btn
    function closeBottomNav() {
        bottomNavbar.classList.remove('active');
        backdrop.classList.remove('active');
        PreventScroll.allowScroll();
        setTimeout(() => {
            container.innerHTML = ``;
        }, 500);
    }

    document.addEventListener('click', (e) => {
        const isbottomNavbar = bottomNavbar.contains(e.target);
        const isbottomNavbarActive = bottomNavbar.classList.contains('active');
        const isbuttonsContainer = buttonsContainer.contains(e.target);

        if (isbottomNavbarActive && !isbottomNavbar && !isbuttonsContainer) {
            closeBottomNav();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeBottomNav();
        });
    }
};

function renderBottomNavbarContents(key, container) {
    switch (key) {
        case 'home':
            window.location.href = 'index.html';
            break;

        case 'menu':
            home(container);
            break;

        case 'search':
            search(container);
            break;

        case 'general':
            general(container);
            break;

        default:
            container.innerHTML = ``;
            break;
    }
}
